#!/usr/bin/env node
/* Generate a static, NO-JAVASCRIPT, mobile-first reader from course.html.
   Why: Google Drive's in-app preview (Android) renders HTML+CSS but does NOT
   run scripts, so the JS-driven course.html shows an empty shell. This emits
   course-mobile.html with every lesson baked into the HTML, so it renders
   anywhere — including straight in the Drive preview, no "open in Chrome".

   Single source of truth: lesson data lives in course.html. Run this after
   editing it:  node search/prep/build-mobile.js
*/
const fs = require("fs");
const path = require("path");

const dir = __dirname;
const src = fs.readFileSync(path.join(dir, "course.html"), "utf8");

// --- pull the data declarations (MODULES, LESSONS, SKELETON) out of course.html ---
const startIdx = src.indexOf("const MODULES");
const endMarker = "\n};"; // SKELETON is the only block closing with }; in the data region
const endIdx = src.indexOf(endMarker, src.indexOf("const SKELETON"));
if (startIdx < 0 || endIdx < 0) { console.error("Could not locate data block in course.html"); process.exit(1); }
const dataCode = src.slice(startIdx, endIdx + endMarker.length);
const { MODULES, LESSONS, SKELETON } =
  new Function(dataCode + "\nreturn {MODULES, LESSONS, SKELETON};")();

// --- markdown -> html (same controlled subset as course.html) ---
function esc(s){return s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");}
function inline(s){
  return esc(s)
    .replace(/`([^`]+)`/g,"<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g,"<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g,"<em>$1</em>");
}
function mdToHtml(md){
  const lines = md.replace(/\r/g,"").replace(/^\n+/,"").split("\n");
  let out=[], para=[], list=[], quote=[], pre=null;
  const flushP=()=>{ if(para.length){ out.push("<p>"+inline(para.join(" "))+"</p>"); para=[]; } };
  const flushL=()=>{ if(list.length){ out.push("<ul>"+list.map(li=>"<li>"+inline(li)+"</li>").join("")+"</ul>"); list=[]; } };
  const flushQ=()=>{ if(quote.length){ out.push("<blockquote>"+mdToHtml(quote.join("\n"))+"</blockquote>"); quote=[]; } };
  const flushAll=()=>{flushP();flushL();flushQ();};
  for(let raw of lines){
    if(pre!==null){
      if(raw.trim().startsWith("```")){ out.push('<pre class="diagram">'+esc(pre.join("\n"))+"</pre>"); pre=null; }
      else pre.push(raw);
      continue;
    }
    if(raw.trim().startsWith("```")){ flushAll(); pre=[]; continue; }
    const t=raw.trim();
    if(t===""){ flushAll(); continue; }
    let m;
    if(m=t.match(/^(#{1,4})\s+(.*)$/)){ flushAll(); const n=m[1].length; out.push(`<h${n}>`+inline(m[2])+`</h${n}>`); continue; }
    if(/^---+$/.test(t)){ flushAll(); out.push("<hr>"); continue; }
    if(m=t.match(/^>\s?(.*)$/)){ flushP(); flushL(); quote.push(m[1]); continue; }
    if(m=t.match(/^[-*]\s+(.*)$/)){ flushP(); flushQ(); list.push(m[1]); continue; }
    flushL(); flushQ(); para.push(t);
  }
  if(pre!==null){ out.push('<pre class="diagram">'+esc(pre.join("\n"))+"</pre>"); }
  flushAll();
  return out.join("\n");
}

const byId = {}; LESSONS.forEach(l => byId[l.id] = l);
const anchor = id => "L_" + id.replace(/[^A-Za-z0-9]/g, "_");

// --- table of contents ---
let toc = "";
MODULES.forEach(mod => {
  const rows = SKELETON[mod.id];
  toc += `<div class="toc-mod"><div class="toc-h">${mod.id} · ${mod.title}</div>`;
  if (rows) rows.forEach(([id, title, isGate]) => {
    const taught = byId[id] && byId[id].done;
    if (taught) toc += `<a class="toc-i done" href="#${anchor(id)}">✓ ${id} — ${title}</a>`;
    else toc += `<div class="toc-i ${isGate?'gate':'todo'}">${isGate?'▢':'·'} ${id} — ${title}</div>`;
  });
  toc += `</div>`;
});

// --- lesson sections ---
let body = "";
LESSONS.filter(l => l.done).forEach(l => {
  body += `<section id="${anchor(l.id)}"><div class="kicker">${l.module} · ${l.id}</div>`;
  body += mdToHtml(l.body);
  if (l.source) body += `<div class="source"><b>↳ go deeper:</b> ${inline(l.source)}</div>`;
  body += `<a class="top" href="#top">↑ contents</a></section>`;
});

const doneCount = LESSONS.filter(l => l.done).length;

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>markets // course (mobile)</title>
<style>
  :root{
    --bg:#1a1d23; --panel:#20242c; --panel2:#252a33; --line:#2e333d;
    --text:#d6dae0; --bright:#f2f4f8; --dim:#6b7280; --dim2:#878e9a;
    --cyan:#56b6c2; --green:#98c379; --amber:#e5c07b; --code:#2a2f38;
  }
  *{box-sizing:border-box}
  body{
    margin:0; background:var(--bg); color:var(--text);
    font-family:"SF Mono",ui-monospace,Menlo,Consolas,monospace;
    font-size:16px; line-height:1.65; -webkit-text-size-adjust:100%;
  }
  .wrap{max-width:760px; margin:0 auto; padding:20px 16px 80px}
  h1.site{font-size:14px; letter-spacing:.12em; text-transform:uppercase; color:var(--cyan); margin:0 0 2px}
  .sub{font-size:12px; color:var(--dim); margin-bottom:18px}
  /* table of contents */
  .toc{background:var(--panel); border:1px solid var(--line); border-radius:10px; padding:12px 14px; margin-bottom:28px}
  .toc-mod{margin:8px 0}
  .toc-h{font-size:11px; letter-spacing:.08em; text-transform:uppercase; color:var(--dim2); margin:10px 0 4px}
  .toc-i{display:block; font-size:14px; padding:3px 0; color:var(--text); text-decoration:none}
  a.toc-i.done{color:var(--green)}
  .toc-i.todo, .toc-i.gate{color:var(--dim)}
  .toc-i.gate{color:var(--amber)}
  /* lesson sections */
  section{border-top:1px solid var(--line); padding-top:8px; margin-top:34px}
  .kicker{font-size:11px; letter-spacing:.1em; text-transform:uppercase; color:var(--dim2); margin-bottom:2px}
  h1{font-size:23px; color:var(--bright); margin:.1em 0 .3em; line-height:1.25}
  h2{font-size:18px; color:var(--bright); margin:1.4em 0 .3em; border-bottom:1px solid var(--line); padding-bottom:5px}
  h3{font-size:15.5px; color:var(--cyan); margin:1.3em 0 .2em}
  h4{font-size:14px; color:var(--amber); margin:1.1em 0 .2em}
  p{margin:.7em 0}
  strong{color:var(--bright); font-weight:600}
  em{color:var(--amber); font-style:normal}
  code{background:var(--code); padding:1px 6px; border-radius:4px; font-size:.92em; color:var(--cyan)}
  ul{margin:.6em 0; padding-left:0; list-style:none}
  li{margin:.35em 0; padding-left:1.4em; position:relative}
  li:before{content:"▸"; color:var(--cyan); position:absolute; left:.2em}
  hr{border:none; border-top:1px solid var(--line); margin:1.6em 0}
  pre.diagram{
    background:var(--panel); border:1px solid var(--line); border-left:3px solid var(--cyan);
    border-radius:8px; padding:12px; overflow-x:auto; line-height:1.4; font-size:11px;
    color:var(--dim2); margin:1.2em 0; white-space:pre; -webkit-overflow-scrolling:touch;
  }
  blockquote{margin:1.2em 0; padding:12px 16px; background:var(--panel2); border-left:3px solid var(--green); border-radius:6px}
  blockquote p{margin:.3em 0}
  .source{margin:1.6em 0 0; padding:12px 16px; background:var(--panel); border:1px dashed var(--line); border-radius:8px; font-size:13.5px; color:var(--dim2)}
  .source b{color:var(--amber)}
  a.top{display:inline-block; margin-top:18px; font-size:12px; color:var(--cyan); text-decoration:none}
  @media (max-width:430px){ pre.diagram{font-size:9.5px; padding:10px} body{font-size:15px} }
</style>
</head>
<body>
<a id="top"></a>
<div class="wrap">
  <h1 class="site">markets // course</h1>
  <div class="sub">mobile reader · ${doneCount} lessons taught · static (no-JS) build</div>
  <div class="toc">${toc}</div>
  ${body}
</div>
</body>
</html>
`;

fs.writeFileSync(path.join(dir, "course-mobile.html"), html);
console.log("wrote course-mobile.html (" + Buffer.byteLength(html) + " bytes, " + doneCount + " lessons)");
