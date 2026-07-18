# /film LCP diagnostic — 2026-07-18

Facts only. **No LCP code fix applied yet** (awaiting go-ahead after this report).

## Measurements

| Condition | LCP |
|-----------|-----|
| Lighthouse simulated Slow 4G | ~30–35 s |
| Observed (lab, unthrottled) | ~2.5 s |

**LCP element:** `img.work-block-media__image`  
**LCP URL:** `/images/work/unnecessary-things-preview.png` (~**2.0 MB**, 2048×1152 PNG)

## Checks from the brief

### IMDb / agregarr (`tt14760808`)
- Fetched in `useEffect` via `https://api.agregarr.org/api/ratings?id=…` (~300 ms).
- **Does not block SSR / first paint** — not in prerender HTML; client-only after hydration.
- Already has visible fallback (`…` → rating or `—`).
- **Not the LCP bottleneck.**

### Vimeo players
- Cases with `mediaImage` show **poster + play button**; iframe mounts **only after click** (`playing` state).
- Initial `/film` HTML: **0** `player.vimeo.com` iframes.
- **Not eager-loaded. Not the LCP bottleneck.**

### Stills (Unnecessary Things)
- 4 JPGs, ~**620 KB** total.
- Already `loading="lazy"` + `decoding="async"`.
- **Not the primary LCP bottleneck.**

## Actual bottleneck

Eager download of oversized **PNG posters**:

| File | Size | Loading |
|------|------|---------|
| `unnecessary-things-preview.png` | ~2.0 MB | eager (no `loading`, LCP) |
| `the-last-kozak-preview.png` | ~2.8 MB | eager (competes on Slow 4G) |
| + YouTube preview assets / logos | smaller JPGs | mostly eager |

On Slow 4G (~1.5 Mbps), ~5 MB of competing PNGs alone models to ~25–30 s — matches the simulated LCP.

## Fix direction (not applied)

1. Re-encode posters → WebP/AVIF at display size; keep PNG fallback if needed.
2. `fetchpriority="high"` on first-case poster only; `loading="lazy"` on below-fold case media.
3. Optional: defer Pershosvit/Scoopy thumbs until near viewport.
