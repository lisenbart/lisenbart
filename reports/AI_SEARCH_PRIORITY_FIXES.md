# AI Search — priority fixes

**Date:** 2026-11-09  
**Source:** `reports/AI_SEARCH_AUDIT.md`  
**Rules:** Prefer reversible technical fixes; no layout redesign; no silent marketing/identity copy changes; **do not deploy without explicit owner OK**.

Impact: H = high crawl/AI visibility · M = medium · L = low  
Effort: S = small · M = medium · L = large  
Certainty: high / medium / low

---

## P0 — do next (technical, high certainty)

| # | Issue | Impact | Effort | Certainty | Dependencies | Proposed fix |
|---|--------|--------|--------|-----------|--------------|--------------|
| 1 | Soft-404: `/*` → `/index.html` 200 | H | S | high | Need real `404` page or Netlify 404 | Replace SPA catch-all with **404** for unknown paths; keep prerendered static hubs. Add `[[redirects]]` for `/contact` → `/#contact` (301) **before** catch-all |
| 2 | `/contact/` serves homepage + home canonical | H | S | high | Owner confirms target | Same as #1 |
| 3 | UT Movie JSON-LD unused (`filmJsonLd.ts`) | M–H | S | high | Content already approved on page | Emit UT `Movie` JSON-LD only on `/originals/unnecessary-things/` via Helmet |
| 4 | Duplicate `og:image` (shell + Helmet) | M | S | high | None | Remove static `og:image` / `twitter:image` from `index.html`; keep Helmet/`SEO.tsx` as single source |

## P1 — soon

| # | Issue | Impact | Effort | Certainty | Dependencies | Proposed fix |
|---|--------|--------|--------|-----------|--------------|--------------|
| 5 | No `WebSite` JSON-LD | M | S | high | No SearchAction (no on-site search) | Add minimal WebSite pointing at Organization `@id` |
| 6 | No `@id` on Organization/Person | M | S | high | Stable IDs | Add `@id`: `https://lisenbart.com/#organization`, `…/about/#person` |
| 7 | No BreadcrumbList on UT / hubs | M | S | high | Matching visible nav | Add BreadcrumbList for UT and optionally hubs |
| 8 | Sitemap `lastmod` stale (2026-10-25) | L–M | S | high | None | Bump `lastmod` on change or generate at build |
| 9 | Empty `googleSiteVerification` | M | S | high | **Owner GSC token** | Paste verification content into `site.meta.googleSiteVerification` |
| 10 | Homepage path order AI → Client Work | H (commercial) | S | high | **Owner approval** | Reorder `homePaths.items` to Client Work → AI → Games → Originals |

## P2 — backlog

| # | Issue | Impact | Effort | Certainty | Notes |
|---|--------|--------|--------|-----------|-------|
| 11 | Games/AI intent copy depth | H | M | medium | See content proposals — enhance existing pages first |
| 12 | Case studies with permissions | H | L | medium | Templates only until client OK |
| 13 | GA4 AI-referral / form conversion events | M | M | low | Needs analytics access |
| 14 | CWV / mobile lab | M | M | low | Run Lighthouse on prod |
| 15 | Bot allowlists / WAF | M | S | unknown | Netlify dashboard |
| 16 | Last Kozak Movie in `filmJsonLd` uses hash URL | L | S | high | Do not emit until real URL or omit |

---

## Applied on `home-b2b-v1` (preview only — not merged to `main`)

| Change | Tested (local `npm run build`) | Result |
|--------|--------------------------------|--------|
| UT Movie JSON-LD in body | `dist/.../unnecessary-things/index.html` contains `"@type":"Movie"` | PASS |
| Dedupe `og:image` | home dist: 1× `og:image` | PASS |
| Remove SPA soft-404 catch-all + `/contact` → `/#contact` | Config in `netlify.toml` (live verify after deploy) | PENDING prod |
| Sitemap `lastmod` → 2026-11-09 | `site/public/sitemap.xml` | PASS |

## Suggested remaining commit sequence (when authorized)

1. `fix(seo): emit Unnecessary Things Movie JSON-LD`  
2. `fix(seo): dedupe og:image shell tags`  
3. `fix(seo): 404 unknown paths; redirect /contact` *(owner OK)*  
4. `chore(seo): refresh sitemap lastmod`  
5. `feat(seo): Organization @id + WebSite` *(owner OK if touching identity graph)*  
6. `content(home): reorder path cards Client Work first` *(owner OK)*  

---

## Rollout / rollback

| Step | Action |
|------|--------|
| Preview | Push to `home-b2b-v1` Deploy Preview; check view-source titles/canonical/JSON-LD |
| Soft-404 test | `curl -I` unknown path → **404**; hubs still **200** |
| Contact test | `/contact` → 301 → `/` or `/#contact`; form still works |
| Prod | Only after owner “ship to prod” |
| Rollback | Revert commit(s); Netlify redeploy previous `main` |

### Risks

- Removing SPA `200` fallback: client-only deep links to non-prerendered paths 404 (acceptable if all public routes are prerendered).  
- `/contact` 301: bookmarks/emails expecting `/contact/` must land on contact section.  
- Schema: only assert facts already on page / IMDb.
