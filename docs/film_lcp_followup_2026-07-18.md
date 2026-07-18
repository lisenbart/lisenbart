# /film LCP follow-up — 2026-07-18

Deploy: `4431e88` — WebP posters, `fetchpriority="high"` on first case, lazy below-fold media.

## Before → after

| Metric | Before (diagnostic / SEO audit) | After (this run) |
|--------|----------------------------------|------------------|
| LCP (Lighthouse Slow 4G) | ~30–35 s (audit: **35.2 s**) | **8.2 s** (8206 ms) |
| LCP (lab observed) | ~2.5 s | — (not re-measured unthrottled) |
| Performance score | 0.58 (`/film`) | **0.35** |
| CLS | ~0 | **0.01** |
| TBT | 0 ms (audit) | **2,030 ms** |
| LCP URL | `/images/work/unnecessary-things-preview.png` (~2.0 MB PNG) | `/images/work/unnecessary-things-preview.webp` |

**LCP element (after):** `img.work-block-media__image` with `loading="eager"` `fetchpriority="high"` → `unnecessary-things-preview.webp`.

## Live checks (post-deploy)

- `GET /images/work/unnecessary-things-preview.webp` → **200**, `content-type: image/webp`
- `/film/` HTML includes `unnecessary-things-preview.webp`, `fetchPriority="high"`, and multiple `loading="lazy"`

## Takeaway

Simulated Slow 4G LCP dropped from ~35 s to **~8 s** after cutting PNG poster weight and prioritizing the first case image. Remaining score pressure is mainly **TBT** (~2 s), not LCP resource size (resource load ~95 ms in LCP breakdown).
