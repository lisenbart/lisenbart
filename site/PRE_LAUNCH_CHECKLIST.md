# LISENBART FILM — Pre-launch checklist

Branch: `film-studio-home` · App: `/site` · Production: https://lisenbart.com

Last updated: 2026-10-20

---

## BLOCKERS

| Item | Why | Owner action |
|------|-----|--------------|
| Legal review of Privacy / Cookie drafts | `policiesPublished` is still `false` | Counsel/owner review `PrivacyPage` / `CookiePolicyPage`, resolve `REVIEW REQUIRED` markers, then set `policiesPublished: true` in `src/data/legal.ts` |
| Netlify Forms notifications | Delivery not verified in this session | Netlify → Site → Forms → `contact` → confirm notification email to `info@lisenbart.com` |
| Confirm GA4 property ownership | Consent gates G-ZB7KBQMZ6T | Confirm this measurement ID is the intended production property |
| Explicit deploy approval | Policy: no prod deploy without owner OK | Approve merge to `main` / production publish |

---

## VERIFIED (automated / code)

| Check | Result |
|-------|--------|
| Production Vite build + prerender (13 routes) | Pass when `npm run build` succeeds |
| Netlify static form hook in `index.html` (`name=contact`, honeypot `website`) | Present |
| Contact submit network try/catch (no stuck Sending) | Implemented in `contactSubmit.ts` + `FilmContactSection` |
| Duplicate-submit guard | Implemented |
| Prefill CTA → contact | `goToContactWithPrefill` + sessionStorage |
| GA4 not loaded until Accept | Implemented (`analyticsConsent.ts` + consent UI) |
| Reject analytics disables GA | Implemented |
| Cookie preferences reopen | Footer + Cookie Policy button |
| Preview/branch `noindex` via `VITE_LEGAL_PREVIEW` | SEO component |
| Studio-first Organization JSON-LD | Updated in `index.html` |
| Legacy WP/hack paths → 410 | `netlify.toml` |
| Hub redirects `/film`, `/commercial`, `/work/*` | `netlify.toml` |
| Kozak duration 26 min | Confirmed (do not change) |
| Canada / Ukraine legal footer data | Confirmed verified |

---

## MANUAL ACTIONS

1. **Netlify Forms**
   - Open deploy preview → submit test enquiry with subject clearly marked `TEST — discard`.
   - Confirm submission appears under Forms and email arrives.
2. **Consent smoke test**
   - Incognito → banner shows → Reject → Network tab: no `googletagmanager.com/gtag`.
   - Clear site data → Accept → gtag loads once.
   - Footer → Cookie preferences → change choice.
3. **Social preview**
   - [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/) and Facebook Sharing Debugger on `https://lisenbart.com/` after production deploy (prerendered OG tags in HTML).
4. **Device pass**
   - iPhone Safari + desktop Chrome: menu circle, contact form, one Originals page, reel open/close.
5. **After policy approval**
   - Set `legalConfig.policiesPublished = true`.
   - Rebuild & deploy.
   - Confirm footer Privacy / Cookie links on production (not only preview).

---

## POST-LAUNCH

| Item | Notes |
|------|-------|
| CSP fine-tuning | Conservative headers shipped; full CSP needs careful Vimeo/Fonts allowlists |
| Search Console verification | Paste token into `site.meta.googleSiteVerification` when ready |
| Monitor Netlify form spam | Honeypot present; review submissions weekly initially |
| Vimeo privacy settings | Align embed privacy with studio preference |
| Performance pass with Lighthouse on production CDN | Local synthetic scores differ from edge |

---

## Deploy rule

Do **not** merge to `main` or publish production until BLOCKERS are cleared and the owner explicitly approves.
