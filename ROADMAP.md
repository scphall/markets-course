# Course roadmap

The full curriculum: what's written, what's designed, and what each module
covers. Lessons marked **written** live in `course.html`. Everything else is
planned and sequenced but not yet drafted.

## What this course is

A structured, self-paced course to build genuine market literacy from zero,
aimed at someone with a strong quantitative background (math, stats, coding)
and no finance background. The goal is to understand how markets actually
function and what the major trading firms actually do, well enough to follow
and hold an informed conversation.

It is **not** a CFA/MBA finance curriculum (DCFs, accounting, capital
structure), a "how to get rich trading" course, or a substitute for becoming a
practitioner. It makes you *literate*, which is the prerequisite for everything
else.

## How to use it

- Roughly 2 hours per week. Pick a fixed slot and defend it.
- Modules are sequenced, but the news-reading habit (M6) starts in week 1 and
  runs forever.
- Each module has materials, exercises, and a self-assessment: "can you explain
  X to a stranger in a pub?"
- Total budget is about 50 hours over ~6 months.

## Progress at a glance

| Module | Title | Status |
|--------|-------|--------|
| M0 | How markets actually work | ✅ written (8/8) |
| M1 | Market microstructure | ✅ written (7/7) |
| M2 | Quant finance fundamentals | ✅ written (7/7) |
| M3 | Statistics of returns | ✅ written (7/7) |
| M4 | Macro & rates | ▢ planned |
| M5 | The industry & the firms | ▢ planned |
| M6 | Reading the news (habit) | ▢ ongoing |

---

## M0 — How markets actually work (foundations) · written

**Goal:** understand the mechanics of trading at the level a thoughtful retail
investor *should* but rarely does.

Lessons (all written, in `course.html`):

- **M0.1 — What a market is:** two sides (makers vs. takers), price discovery.
- **M0.2 — The limit order book:** bids, asks, depth, how orders match, price-time priority.
- **M0.3 — Order types; click → settlement:** market vs. limit; stop/IOC/FOK/iceberg; the full path from click to broker, routing/PFOF, venue fill, CCP clearing and netting, T+1 settlement.
- **M0.4 — The bid-ask spread:** why it exists, who earns it, its three-part decomposition (order-processing, inventory, adverse selection), with a worked numeric example.
- **M0.5 — Asset classes:** equities, bonds, FX, derivatives, and how each trades differently across five axes (exchange vs. OTC, order- vs. quote-driven, transparent vs. opaque, standardized vs. bespoke, concentrated vs. fragmented liquidity).
- **M0.6 — Venues & plumbing:** exchanges, brokers, clearing, settlement, Reg NMS/NBBO.
- **M0.7 — Derivatives:** forwards, futures, swaps; a forward built from the farmer/miller risk pair, then standardization, novation to a CCP, margin and daily mark-to-market as fixes for its two flaws; leverage as arithmetic.
- **M0.8 — Options:** right vs. obligation, why the asymmetry is what the premium buys, breakeven at strike ± premium, the four positions, and volatility as a price input (pricing deferred to M2–M3).

**Materials:** Larry Harris, *Trading and Exchanges* (ch. 1–7); NYU Stern market
microstructure lectures (Yakov Amihud, YouTube); SEC market-structure primers
(sec.gov/marketstructure).

**Self-assessment:** explain makers vs. takers, the role of the limit-order
book, and why spreads exist; walk a market order from click to settlement; name
three asset classes and what differs about how each trades.

**Stretch:** read the original Reg NMS SEC release for a sense of how the rules
shape the game.

---

## M1 — Market microstructure · written

**Goal:** understand *why* markets behave as they do at the order-book level.
This is the layer most HFT firms actually live in.

Lessons (all written, in `course.html`):

- **M1.1 — The microstructure lens:** order- vs. quote-driven recap, informed vs. uninformed flow, what "the book is a belief" means.
- **M1.2 — Adverse selection, formally (Glosten–Milgrom):** quotes as conditional expectations; how the book *learns* from order flow.
- **M1.3 — Inventory models (Ho–Stoll / Amihud–Mendelson):** the maker as a risk-averse inventory manager; quote skewing.
- **M1.4 — The Kyle (1985) model:** informed trader plus noise traders, market depth λ, why price impact is linear.
- **M1.5 — Price impact in practice:** permanent vs. temporary, the square-root law, why big orders are sliced.
- **M1.6 — Latency & the HFT layer:** why speed matters (queue position, picking off stale quotes) and where it genuinely doesn't.
- **M1.7 — Flow toxicity & maker-taker economics:** VPIN, managing adverse selection, rebates and fees, what HFT firms actually optimise.

**Materials:** Maureen O'Hara, *Market Microstructure Theory* (or stay in Harris
and go deeper); Irene Aldridge, *High-Frequency Trading* (2nd ed.); Kyle (1985),
"Continuous Auctions and Insider Trading"; the Jane Street tech blog (ongoing).

**Exercise:** pull a few minutes of NASDAQ ITCH order-book data (public samples
exist) and reconstruct the book at a given moment, to feel what "depth" actually
means.

**Self-assessment:** define adverse selection in market-making terms; explain
why latency matters and where it doesn't; sketch how a maker prices the spread
(inventory plus adverse-selection components).

**Stretch:** Michael Lewis, *Flash Boys*, read *after* the academic material so
you can see what's overdrawn and what's accurate.

---

## M2 — Quantitative finance fundamentals · written

**Goal:** build the basic toolkit. Much of the math is straightforward for a
quantitative reader; the value is the *vocabulary* and the *culture*.

Lessons (all written, in `course.html`):

- **M2.1 — The quant pipeline:** signal → sizing → execution → risk; alpha vs. beta; the Sharpe ratio and the standard error (≈√(252/n)) that makes short backtests uninformative.
- **M2.2 — Black-Scholes as replication:** the one-period binomial, delta as the hedge ratio, why the real probability cancels, and the risk-neutral measure as a computational device.
- **M2.3 — The greeks, operationally:** delta/gamma/theta/vega, and the delta-hedged P&L ≈ ½ΓS²(σ_realized² − σ_implied²)dt that makes an option a bet on volatility rather than direction.
- **M2.4 — Implied volatility & the surface:** inverting the formula, why Black-Scholes is a quoting language, and reading skew and smile as a map of the model's errors.
- **M2.5 — Correlation vs. cointegration:** the spurious-regression trap, stationarity, Engle-Granger and Johansen, and the half-life that sets the holding period.
- **M2.6 — A pairs trade, end to end:** the full pipeline on one strategy, with a runnable dependency-free backtest — Sharpe 1.39 gross, 0.17 after costs.
- **M2.7 — Why backtests lie:** lookahead, survivorship, multiple testing (best-of-1000 on zero edge scores ~1.4), capacity, and regime change.

**Materials:** Ernie Chan, *Quantitative Trading* (start here); Mark Joshi,
*The Concepts and Practice of Mathematical Finance* (pick chapters that aren't
already obvious: option-pricing intuition, martingale measures); Wilmott
magazine archives (selective); quant.stackexchange.com (top-voted threads for
ambient culture).

**Exercise:** implement a simple mean-reversion backtest in Python. Pick a pair
of correlated equities (e.g. same-sector ETFs), compute the spread, signal when
it exceeds N standard deviations, backtest. The aim is to feel the gap between
"looks profitable on paper" and "is actually profitable after costs."

**Self-assessment:** walk a pairs trade from signal to execution to risk
management; explain cointegration vs. correlation in a trading context; sketch
Black-Scholes intuition without the equation; name the option Greeks and what
each means operationally.

---

## M3 — Statistics of returns · written

**Goal:** returns are *not* Gaussian. The heavy-tailed, clustered distributions
here have more in common with statistical physics than with textbook finance,
which is where a physics or stats background gives the largest edge.

Lessons (all written, in `course.html`; every figure computed from real S&P 500 daily data, FRED 2016–2026):

- **M3.1 — The stylised facts:** kurtosis 19.7, six days beyond ±6σ, and the split that matters — returns unforecastable, |returns| correlated past 20 lags.
- **M3.2 — Fat tails and the tail index:** power-law decay, Hill estimation, the inverse cubic law, and why moments above α do not exist.
- **M3.3 — Volatility clustering & GARCH:** ARCH → GARCH(1,1), fitted persistence 0.975 and a 27-day volatility half-life; why clustering generates fat tails but not all of them.
- **M3.4 — VaR & expected shortfall:** the two measures, coherence and subadditivity, and why Basel moved to ES.
- **M3.5 — Correlation breakdown & tail dependence:** correlations rising in stress, copulas, and the Gaussian copula's zero tail dependence.
- **M3.6 — Position sizing under fat tails:** Kelly at 3.87x leverage and an 86.8% drawdown, fractional Kelly, vol targeting, and ergodicity.
- **M3.7 — Statistical vs. practical significance:** fat tails do *not* break the t-test; estimator instability and effect-size-versus-cost are the real constraints.

**Materials:** Benoît Mandelbrot, *The (Mis)behavior of Markets* (required);
Rama Cont, "Empirical properties of asset returns: stylized facts and
statistical issues" (2001); Eric Falkenstein, *The Missing Risk Premium*;
Bouchaud's econophysics work (stretch).

**Exercise:** pull 5 years of daily returns for a major equity index. Test
empirically whether returns are normal (they aren't), fit a Student-t, and
compare autocorrelation in returns vs. in *squared* returns. This is the
"stylised facts" exercise.

**Self-assessment:** explain why returns are fat-tailed and what that means for
risk management and position sizing; define VaR vs. expected shortfall and when
each misleads; describe volatility clustering and why GARCH-family models exist;
articulate statistical vs. practical significance when finding a "signal."

---

## M4 — Macro & rates · planned

**Goal:** know enough macro to follow conversations about what's moving markets
and *why*. Don't drown in it, but don't skip it.

**Materials:** Matt Levine's *Money Stuff* (Bloomberg, free, start now); Howard
Marks, *Mastering the Market Cycle*; a primer on monetary-policy mechanics;
Bloomberg Terminal screenshots from FX/rates desks when you encounter them.

**Self-assessment:** explain how a Fed funds rate decision propagates through
equity prices; sketch an inverted yield curve and why anyone cares; define the
carry trade in two sentences.

---

## M5 — The industry & the firms · planned

**Goal:** know what each major firm actually does, well enough to ask
intelligent questions and tell the business models apart.

**Materials:** *Odd Lots* (Bloomberg) and *Flirting with Models* (Corey
Hoffstein) podcasts; selected *Invest Like the Best* episodes; the Jane Street
tech blog (re-read for firm culture), Two Sigma research notes, Citadel
Securities releases.

**Self-assessment:** explain the difference between a market-making business
(e.g. Jane Street, Citadel Securities) and a multi-strategy "pod shop";
distinguish pod-shop vs. single-strategy vs. market-making firms with an example
of each; sketch a typical comp structure (base, sign-on, deferred, profit share)
and why deferred comp matters; for each major firm, name one thing it's publicly
known for.

---

## M6 — Reading the news fluently · ongoing, from week 1

This module never ends. It's the slow accretion of context that makes you sound
like someone who's been paying attention.

- **Daily (~10 min):** Matt Levine's *Money Stuff*.
- **Weekly (~30 min):** the *Financial Times* or *The Economist* (one, not both).
- **Books for colour (over 6+ months):** Michael Lewis, *Liar's Poker*; Roger
  Lowenstein, *When Genius Failed* (LTCM); Sebastian Mallaby, *More Money Than
  God*; Scott Patterson, *The Quants*; Gregory Zuckerman, *The Man Who Solved
  the Market* (RenTec).

**Avoid:** books titled "How to Trade [Anything]" (mostly garbage), finance
Twitter/X, and trading YouTube (high noise, no signal).

---

## Suggested tempo

Aim to finish M0–M5 in about four months, then sustain M6 indefinitely. If time
is tight, M0–M2 plus M5 are the minimum viable foundation; the rest can deepen
as you go. Re-read this roadmap quarterly and prune materials that didn't land.
