# TBT “regression” check after 4431e88 — 2026-07-18

**Question:** Did WebP / `fetchpriority` / lazy cause TBT 0→2030 ms and Perf 0.58→0.35?  
**Verdict:** **No — claim not supported.** Likely Lighthouse noise + misreading of TBT.

---

## 1. What 4431e88 actually changed

Only:
- WebP assets (+ delete multi‑MB PNGs)
- `work.ts` paths → `.webp`
- `WorkCaseBlock` / `FilmPage` loading + `fetchPriority` wiring
- `WorkYouTubeChannelPreview` native `loading="lazy"`

**No** new packages, routers, observers, or bundle entrypoints. No JS runtime work beyond a few HTML attributes.

---

## 2. Live Lighthouse re-runs (`/film`, ×3)

| Run | Perf | LCP | TBT |
|-----|------|-----|-----|
| 1 | 0.73 | 4.7 s | **0 ms** |
| 2 | 0.72 | 4.8 s | **0 ms** |
| 3 | 0.67 | 5.0 s | **230 ms** |
| Home (control) | 0.73 | 4.3 s | **217 ms** |

**TBT ≈ 2030 ms not reproduced.** Score is **better** than the single post-fix run that reported 0.35.

Main-thread work on `/film` is still ~2.3–2.9 s (style/layout + script) even when TBT reads 0 — that is normal for this SPA.

---

## 3. `decoding`

- LCP poster (Unnecessary Things): `decoding="sync"` (intentional with `fetchPriority="high"`)
- Other posters / stills / YouTube thumbs: `decoding="async"`
- Not a plausible cause of ~2 s TBT

---

## 4. Lazy loading

Native `loading="lazy"` only (stills + YouTube preview).  
**No** custom `IntersectionObserver` on those images.

---

## Why “TBT was 0 before” is misleading

TBT counts long-task excess **only between FCP and TTI**.

With old multi‑MB PNGs, LCP was ~35 s (network-bound). JS long tasks often finished **before FCP**, so TBT could read **0** even with ~2 s of main-thread work later/earlier. That is **not** “zero JS,” and a later TBT=2030 on one run is not proof that WebP added 2 s of main-thread cost.

---

## Bottom line

| Claude claim | Assessment |
|--------------|------------|
| 4431e88 caused TBT 0→2030 | **Unsupported** |
| WebP/lazy should be “fixed” for TBT | **Wrong target** |
| Real outcome of 4431e88 | **LCP improved** (multi‑MB PNG → ~50–60 KB WebP) |

No code change recommended from this check.
