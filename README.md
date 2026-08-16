# markets // course

A self-paced course to build genuine market literacy from zero, for people with
a strong quantitative background (math, stats, coding) and no finance
background. It explains how markets actually work at the mechanical level:
order books, spreads, adverse selection, settlement plumbing, and how the major
trading firms make money.

The lessons are written as a single, self-contained, offline HTML reader with a
terminal-style dark theme. No build step, no dependencies, no network: just open
the file.

## Read it on the web

The course now lives at **<https://samwhiskers.com/reading/markets/>** —
a phone-friendly reader with progress tracking. The files below remain
the offline edition.

## Contents

| File | What it is |
|------|-----------|
| `course.html` | The reader. Open it in any browser. Interactive sidebar, all written lessons. |
| `course-mobile.html` | A static, no-JavaScript build of the same lessons, for mobile/preview contexts that block scripts (e.g. cloud-drive previews). |
| `build-mobile.js` | Generator that produces `course-mobile.html` from `course.html`. |
| `ROADMAP.md` | The full curriculum: what's written and what's planned (modules M0–M6). |

## Reading the course

Open `course.html` in a browser by double-clicking it. Everything is inlined, so
it works offline and needs nothing installed.

On a phone, or anywhere JavaScript is blocked (some cloud-drive file previews
render HTML but refuse to run scripts), use `course-mobile.html`, which bakes
every lesson into static markup.

## Status

**The course is complete — 43 lessons across all seven modules:**
**M0 — How markets actually work** (8), **M1 — Market microstructure** (7),
**M2 — Quantitative finance fundamentals** (7), **M3 — Statistics of
returns** (7), **M4 — Macro & rates** (6), **M5 — The industry & the
firms** (5) and **M6 — Reading the news** (3).

**M6 is a habit, not a body of knowledge.** Its three lessons set up a
practice to continue indefinitely — a headline-to-mechanism decoder, the
consolidated reading list, and how to interrogate a claim of edge.

M3 works throughout from real S&P 500 daily data (FRED, 2016–2026)
rather than illustration — every figure in it is reproducible from a
single CSV download.

M0 favours intuition first; M1 and M2 go further and derive their central
results (Glosten–Milgrom's spread, Kyle's λ, Black–Scholes by replication,
the delta-hedged volatility P&L) rather than only describing them.

## Regenerating the mobile build

`course.html` is the single source of truth: lesson data lives in a `LESSONS`
array inside it. After editing lessons, regenerate the static mobile build with:

```bash
node build-mobile.js
```

This reads `course.html` and writes `course-mobile.html`. No dependencies, just
Node.

## Approach

Each lesson favours intuition first, then names the canonical source (a chapter,
paper, or primer) for optional depth. Every lesson ends with a "pub test": can
you explain the idea clearly to a stranger? The primary text throughout M0–M1 is
Larry Harris, *Trading and Exchanges*.
