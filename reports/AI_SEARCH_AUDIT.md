# LISENBART FILM — AI Search / crawlability audit

**Date:** 2026-11-09  
**Production origin:** https://lisenbart.com/  
**Repo stack:** Vite + React + TypeScript, `vite-prerender-plugin`, Netlify (`site/netlify.toml`)  
**Branch inspected:** `home-b2b-v1` (local) + live production HTTP  
**Scope:** ChatGPT Search (OAI-SearchBot), Google AI Mode/Overviews, Bing/Copilot, classical crawlers  
**Constraint:** Read-only positioning; no redesign. GPTBot policy left unchanged.

Verdict key: **PASS** / **FAIL** / **UNKNOWN**

---

## Executive summary

The production site is largely crawlable: prerendered HTML includes titles, descriptions, canonicals, H1s and body copy; `robots.txt` allows all user-agents including OAI-SearchBot; sitemap lists the main hubs. Highest-impact gaps: **SPA soft-404** (`/*` → `index.html` 200), **`/contact/` soft-serves the homepage**, **Movie JSON-LD exists in repo but is not emitted**, **duplicate `og:image`**, empty **Google site verification** string, and homepage **path-card order** (AI before Client Work) vs stated commercial priority.

---

## 1. Public URL status, redirects, canonicals

| URL | Status | Final URL | Canonical (in HTML) | Result |
|-----|--------|-----------|---------------------|--------|
| `/` | 200 | `https://lisenbart.com/` | `https://lisenbart.com/` | **PASS** |
| `/games/` | 200 | `…/games/` | `…/games/` | **PASS** |
| `/ai/` | 200 | `…/ai/` | `…/ai/` | **PASS** |
| `/studio/` | 200 | `…/studio/` | `…/studio/` | **PASS** |
| `/client-work/` | 200 | `…/client-work/` | `…/client-work/` | **PASS** |
| `/originals/` | 200 | `…/originals/` | `…/originals/` | **PASS** |
| `/originals/unnecessary-things/` | 200 | matching | matching | **PASS** |
| `/about/` | 200 | matching | matching | **PASS** |
| `/games` (no slash) | 301 → `/games/` | — | — | **PASS** (same for `/ai`, `/studio`, `/client-work`) |
| `/contact/` | **200** | `…/contact/` | **`https://lisenbart.com/`** (homepage) | **FAIL** — no contact route; SPA fallback serves home HTML with home canonical |
| `/this-page-should-not-exist-xyz/` | **200** | same path | home canonical | **FAIL** — soft-404 |

**Evidence**

- Live `curl -L` 2026-11-09 (Googlebot UA): hubs 200 + unique titles/canonicals.
- SPA catch-all: `site/netlify.toml` lines 265–268:

```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

- Contact is an on-page section (`sectionIds.contact`), not a hub route (`site/src/lib/routes.ts`).

---

## 2. robots.txt and sitemap.xml

| Check | Result | Evidence |
|-------|--------|----------|
| `https://lisenbart.com/robots.txt` 200 | **PASS** | `User-agent: *` / `Allow: /` / `Sitemap: https://lisenbart.com/sitemap.xml` — matches `site/public/robots.txt` |
| OAI-SearchBot allowed | **PASS** | No `Disallow` for OAI-SearchBot; covered by `User-agent: *` |
| Googlebot / Bingbot allowed | **PASS** | Same |
| GPTBot | **PASS (do not change)** | Not blocked; leave as-is per brief |
| Sitemap 200 + XML | **PASS** | Live `application/xml`, 11 URLs, `https://lisenbart.com` origin |
| Sitemap completeness vs indexable pages | **PASS** (minor stale) | Includes `/`, hubs, UT project, `/studio/`, `/about/`, legal. Omits `/playables/` intentionally. `lastmod` frozen at `2026-10-25` |
| Playables indexing blocked | **PASS** | `netlify.toml` `/playables/*` → `X-Robots-Tag: noindex, nofollow` (confirmed live header) |

---

## 3. Meta robots, canonical, OG/Twitter, titles, headings

| Check | Result | Evidence |
|-------|--------|----------|
| Production `noindex` meta | **PASS** | Home HTML: no `name=robots`. Preview contexts set `VITE_SITE_NOINDEX` (`SEO.tsx` 27–36; `netlify.toml` 16–32) |
| Production `X-Robots-Tag` on hubs | **PASS** | Absent on `/` (curl headers) |
| Unique titles per hub | **PASS** | e.g. Games `Game Ads — Trailers…`, AI `AI & Hybrid…`, Studio `Studio — Independent…` |
| Unique descriptions | **PASS** | Distinct `meta name=description` per hub; UT matches approved Sheckley copy |
| `rel=canonical` | **PASS** on real hubs; **FAIL** on soft-404/`/contact/` | Helmet via `SEO.tsx` 35; soft routes inherit home prerender tags |
| Open Graph / Twitter | **PASS** with caveat | Helmet sets og/twitter title/description/url/image. **Duplicate `og:image`**: static tags in `site/index.html` 19–27 **plus** Helmet → home shows **2× `og:image`** |
| H1 present | **PASS** | Home combined H1; hubs single H1 (`GAME ADS`, `CLIENT WORK`, etc.) |
| H2 structure (Games) | **PASS** | Live: `What we make`, `How we work`, `Selected clients`, `Let's fly together` |
| Accessible text vs JS-only | **PASS** (partial) | Essential copy in prerendered HTML. Video posters often `alt=""` with visible captions (`GamesVideoCards.tsx`) |

---

## 4. Server-rendered / static crawlability

| Check | Result | Evidence |
|-------|--------|----------|
| Prerender plugin | **PASS** | `site/vite.config.ts` `additionalPrerenderRoutes` for hubs + UT + legal |
| Essential copy in production HTML | **PASS** | Home HTML contains “Every idea”, path CTAs; Games HTML contains trailers / UA / playables wording without relying on client-only fetch |
| Framework | Vite SPA + prerender | Crawl bots receive static HTML shells |

---

## 5. Structured data

| Check | Result | Evidence |
|-------|--------|----------|
| Organization JSON-LD | **PASS** | `site/index.html` 36–74; present on all prerendered pages (2 ld+json blocks) |
| Person (founder) JSON-LD | **PASS** | `index.html` 75–93 |
| `@id` / graph linking | **FAIL** (gap) | No `@id` on Organization/Person; no `@graph` linking |
| WebSite JSON-LD | **FAIL** (missing) | Not present |
| BreadcrumbList | **FAIL** (missing) | Not present (would help UT / hubs) |
| Movie / CreativeWork for Unnecessary Things | **FAIL** | `site/src/data/filmJsonLd.ts` defines Movie for UT **but is never imported**; live UT page only has Organization + Person |
| Fake ratings / offers | **PASS** | No AggregateRating / fake offers found |
| Organization `logo` URL | **PASS** | `https://lisenbart.com/images/black_logo.png` → 200 |
| `sameAs` | **PASS** (verify accuracy) | LinkedIn, YouTube, Vimeo showreel; Person also IMDb |

---

## 6. Images, portfolio, internal links, mobile

| Check | Result | Evidence |
|-------|--------|----------|
| Path / portfolio `imageAlt` in data | **PASS** | e.g. `homePaths` alts in `site.ts` |
| Games video card `alt=""` | **PASS** with note | Decorative; title/client in caption; aria-label on button |
| Internal linking | **PASS** | Nav + path cards + studio teams → hubs |
| Soft-404 pollution | **FAIL** | Unknown URLs indexable as home duplicates |
| Mobile performance | **UNKNOWN** | Not lab-measured this session (Lighthouse/CWV) |

---

## 7. CDN / WAF / bot IP blocking

| Check | Result | Evidence |
|-------|--------|----------|
| Host | Netlify | `server: Netlify` on responses |
| WAF bot blocks | **UNKNOWN** | No Cloudflare/WAF config in repo; cannot verify OAI/Bing IP allowlists without Netlify dashboard |
| Security headers (sample `/`) | Partial **PASS** | HSTS, `x-frame-options`, `x-content-type-options`, `referrer-policy`, `permissions-policy` present |

**Owner test steps:** Netlify → site → logs / bot traffic; request indexing from GSC & Bing; confirm OAI-SearchBot fetches in server logs.

---

## 8. Measurement

| Check | Result | Evidence |
|-------|--------|----------|
| GA4 ID in code | **PASS** (configured) | `G-ZB7KBQMZ6T` in `analyticsConsent.ts` — loads only after consent |
| GSC HTML verification meta | **FAIL** / empty | `site.meta.googleSiteVerification: ""` (`site.ts` ~1059) |
| GSC / Bing property ownership | **UNKNOWN** | Needs owner login |
| Conversion / form events | **UNKNOWN** | Netlify Forms present; GA event wiring not fully audited |
| AI referral tracking | **UNKNOWN** | Needs analytics UI / UTM convention |

---

## Positioning note (commercial)

Homepage collaboration **path cards** (`site.homePaths.items`) order is currently:

1. AI & Hybrid  
2. Client Work (Brands & Agencies)  
3. Games  
4. Originals  

Brief requires **Client Work → AI → Games → Originals**. Treat as **FAIL vs positioning rule** for content/order proposal (do not silent-reorder without approval).

---

## NEEDS_OWNER_ACCESS

1. Google Search Console — property verify, coverage, AI features / indexing  
2. Bing Webmaster Tools — sitemap submit, AI Performance  
3. GA4 — confirm property `G-ZB7KBQMZ6T`, ChatGPT/Bing referral views, form conversions  
4. Netlify — production env (ensure `VITE_SITE_NOINDEX` unset), bot logs, edge/WAF  
5. Confirm public `sameAs` profiles still authoritative  
6. Confirm whether `/contact/` should 301 to `/#contact` or a dedicated page  

---

## Appendix — live title samples (2026-11-09)

| Path | `<title>` |
|------|-----------|
| `/` | LISENBART FILM — Animation Studio for Brands, Games & Film |
| `/games/` | Game Ads — Trailers, UA Creatives & Playables \| LISENBART FILM |
| `/ai/` | AI & Hybrid — AI Video Production \| LISENBART FILM |
| `/client-work/` | Client Work — Brand Animation & Commercials \| LISENBART FILM |
| `/originals/unnecessary-things/` | Unnecessary Things — Animated Short \| LISENBART FILM |
