# Final polish check — lisenbart.com

**Date:** 2026-07-18  
**Scope:** Verification of last copywriting polish prompt + factual inventory for external editorial review (client / partner / investor lenses).  
**Method:** Code inspection of working tree + comparison to last deployed commit on `origin/main` / live HTML.  
**No tone evaluation** — facts and verbatim strings only.

---

## 1. Перевірка впровадження останнього промта

Expected strings = last polish prompt (9 items listed; prompt header said “7”).  
**Source of truth for “current”:** working tree under `site/` (not yet committed / not on live domain — see §4).

| # | Item | Expected (prompt) | Current in code | Status |
|---|------|-------------------|-----------------|--------|
| 1 | Social coming-soon modal body | `This one's still being built. Until it's live, drop me a line — I read everything myself.` | Same — `site/src/data/site.ts` → `site.socialComingSoon.body` | ✅ впроваджено точно |
| 2 | Contact error fallback | `Could not send your message. Please try again or email me directly.` | Same — `site/src/lib/contactSubmit.ts` (`parseErrorResponse` return) | ✅ впроваджено точно |
| 3 | Contact success message | `Got it — thank you. I'll read it properly and get back to you soon.` | Same in `ContactForm.tsx` (success UI) and `contactSubmit.ts` (dev mock + success return) | ✅ впроваджено точно |
| 4 | `EstimateCTA.tsx` | Delete file if unused | File **absent** (`Glob **/EstimateCTA.tsx` → 0). `MobileEstimateCTA.tsx` remains (different component, still used in `App.tsx`) | ✅ впроваджено точно |
| 5 | Explore Paths H2 | `Two roads, one direction.` | Same — `site.explorePaths.title` | ✅ впроваджено точно |
| 6 | Showreel caption | `Some of it I was asked to make. Some of it I just wanted to. None of it made alone.` | Same — `site.showreelSection.caption` | ✅ впроваджено точно |
| 7 | IMDb profile modal body | `My director page on IMDb — everything I've made, for anyone who wants the paper trail.` | Same — `ImdbProfileModal.tsx`. Technical “new tab” via `target="_blank"` + `aria-label="Open on IMDb (opens in a new tab)"` (not in visible body) | ✅ впроваджено точно |
| 8 | About bio (team sentence) | Prior bio unchanged + append: `None of it happens alone — every project here was shaped by writers, designers and animators I'm lucky to work with.` | Full bio in `site.personalAbout.bio` ends with that sentence after Karpenko-Kary University | ✅ впроваджено точно |
| 9 | `/commercial` contact lead | `Tell me about your project — I'll get back to you within 24 hours.` | Same — `site.commercialPage.contactLead` | ✅ впроваджено точно |

**Summary §1:** 9/9 ✅ in working tree. Live domain still serves pre-polish copy (see §4).

---

## 2. Повний поточний текст — секції, змінені за останні сесії

Дослівно з working tree (`site/src/…`).

### Hero (`site.hero` + `PersonalHeroSection.tsx`)

| Type | Text | Source |
|------|------|--------|
| eyebrow / role | Animation Director & Producer | `site.hero.personalRole` |
| H1 | Dmytro Lisenbart | `site.hero.personalName` |
| body | I direct animation and film — for festivals, for brands, and for myself. | `site.hero.personalPositioning` |
| факт-чіп / proof | 35 years in animation · 20 years producing · 1000+ projects delivered | `site.hero.personalProof` |
| мікрокопі кнопки | IMDb ↗ | hardcoded `PersonalHeroSection.tsx` |
| alt | Portrait of Dmytro Lisenbart | `site.hero.personalPortraitAlt` |

### Showreel (`site.showreelSection`)

| Type | Text | Source |
|------|------|--------|
| H2 | Showreel | `site.showreelSection.title` |
| caption | Some of it I was asked to make. Some of it I just wanted to. None of it made alone. | `site.showreelSection.caption` |

### Explore Paths (`site.explorePaths`)

| Type | Text | Source |
|------|------|--------|
| H2 | Two roads, one direction. | `site.explorePaths.title` |
| path label | Film | `explorePaths.film.label` |
| H3 | Authored cinema & personal IP | `explorePaths.film.title` |
| body | Original shorts, an animated feature in development, and two IP universes. | `explorePaths.film.text` |
| path label | Commercial | `explorePaths.commercial.label` |
| H3 | Brands & game studios | `explorePaths.commercial.title` |
| body | Campaign films, trailers and animation for brands and game studios. | `explorePaths.commercial.text` |

### About (`site.personalAbout`)

| Type | Text | Source |
|------|------|--------|
| H2 | About | `personalAbout.title` |
| body | I've been directing animation for 35 years and producing commercial work for 20 — leading creative and production teams across Ukraine, Canada and Poland for clients across Europe and North America. I headed Ukranimafilm from 2017 to 2019 and co-founded UANIMA, the Ukrainian Animation Association. My background is in painting and film directing, trained at Kyiv's Karpenko-Kary University. None of it happens alone — every project here was shaped by writers, designers and animators I'm lucky to work with. | `personalAbout.bio` |
| факт-чіп | UANIMA · Head of Ukranimafilm, 2017–2019 | `personalAbout.recognition` |
| факт-чіп | Ukraine · Canada · Poland | `personalAbout.locations` |

### Contact — three lead variants

| Page | Lead text | Source |
|------|-----------|--------|
| Home | Tell me about your project — I'll get back to you within 24 hours. | default prop `ContactForm.tsx` |
| `/film` | For festival inquiries, co-productions or press — get in touch. | `site.filmPage.contactLead` |
| `/commercial` | Tell me about your project — I'll get back to you within 24 hours. | `site.commercialPage.contactLead` |

Shared Contact UI (all three pages):

| Type | Text | Source |
|------|------|--------|
| H2 | Contact | hardcoded `ContactForm.tsx` |
| label | Email | hardcoded |
| placeholder | you@company.com | hardcoded |
| label | Name | hardcoded |
| label helper | optional | hardcoded |
| label | Project type | hardcoded |
| select empty | Select type | hardcoded |
| options | Campaign & Brand Film; Game Trailer or Cinematic; Animation & Motion; AI-Assisted Production; Other | `services.ts` → `projectTypes` |
| helper (AI option) | AI speeds up the work — the craft stays mine. | hardcoded `ContactForm.tsx` |
| label | Message | hardcoded |
| placeholder | Brief, timeline, references... | hardcoded |
| submit | Send message | `site.contactSubmitLabel` |
| loading | Sending... | hardcoded |
| success | Got it — thank you. I'll read it properly and get back to you soon. | `ContactForm.tsx` / `contactSubmit.ts` |
| post-success link | Send another message | hardcoded |
| error fallback | Could not send your message. Please try again or email me directly. | `contactSubmit.ts` |
| validation | Email is required / Enter a valid email | `contactSubmit.ts` |

### Social coming-soon modal (`site.socialComingSoon`)

| Type | Text | Source |
|------|------|--------|
| H2 | Almost there | `title` |
| body | This one's still being built. Until it's live, drop me a line — I read everything myself. | `body` |
| CTA | Email Me | `cta` |
| close | Close | `closeLabel` |

### IMDb profile modal (`ImdbProfileModal.tsx`)

| Type | Text | Source |
|------|------|--------|
| H2 | IMDb profile | hardcoded |
| preview name | Dmytro Lisenbart | `site.hero.personalName` |
| preview role | Animation Director & Producer | `site.hero.personalRole` |
| preview credits line | Filmography · Festival credits | hardcoded |
| body | My director page on IMDb — everything I've made, for anyone who wants the paper trail. | hardcoded |
| CTA | Open on IMDb | hardcoded |
| aria-label (link) | Open on IMDb (opens in a new tab) | hardcoded |
| close | Close | hardcoded |

### Meta (unchanged this polish, still current)

| Page | title | description |
|------|-------|-------------|
| Home | Dmytro Lisenbart — Animation Director & Producer | I direct animation and film — for festivals, for brands, and for myself. Festival work, children’s IP, and commercial craft. |
| `/film` | Film — LISENBART | Original stories, directed for the screen — not the client. |
| `/commercial` | Commercial — LISENBART | Production leadership for brands, agencies and game studios. |

---

## 3. VOICE CONSISTENCY — фінальна перевірка we/us/our

**Scope scanned:** user-facing strings on Home, `/film`, `/commercial` (data + components + contact/testimonial submit helpers used by those pages).  
**Excluded by brief:** testimonial **quotes** (client voice).  
**Not in scope for this scan:** legacy `/work/*` archive case copy in `work.ts` (commercial/gaming archive blocks still contain many “we/us/our” strings; those pages are not Home/Film/Commercial hubs).

### Hits (site voice, not client quotes)

| Location | Exact string | File |
|----------|--------------|------|
| Testimonial submit success (dev mock + live success return) | `Your review has been sent. We appreciate your feedback — thank you.` | `site/src/lib/testimonialSubmit.ts` (lines ~74 and ~97) |

Appears on `/commercial` after “Leave a review” succeeds (and in local mock mode).

### Explicitly excluded (client quotes in `testimonials.ts`)

| Quote contains | Author / company |
|----------------|------------------|
| We keep coming back — and we're never disappointed. | Lena Feldman / Playtika |
| …every campaign we run together. | Rachel Ortiz / Product Madness |
| …so we can focus on launch. | Antoine Dubois / Voodoo |
| Our go-to studio… | Sarah Mitchell / McDonald's |
| …exactly what we need. | James Carter / MasterCard |

### Clean on scanned hub surfaces

No `we` / `us` / `our` matches in:

- `site/src/data/site.ts`
- `ContactForm.tsx`, `contactSubmit.ts`
- `PersonalHeroSection.tsx`, `ImdbProfileModal.tsx`, `SocialComingSoonModal.tsx`
- `Header.tsx`, `Footer.tsx`
- `/film` cases rendered via `filmPage.caseIds` (`unnecessary-things`, `the-last-kozak`, `pershosvit`, `scoopy-cap`) — no we/us/our in those four case strings
- `/commercial` reel texts in `site.commercialPage.reels`
- `index.html` JSON-LD description (I-voice)

---

## 4. GIT / DEPLOY СТАН

| Fact | Value |
|------|--------|
| Local / `origin/main` HEAD (committed) | `3a22ff3` — *Fix tab favicon: serve bear icon.ico instead of SPA HTML fallback.* |
| Commit timestamp | 2026-07-18 14:00:41 +0200 |
| Branch sync | `main` = `origin/main` (0 ahead / 0 behind) for **committed** history |
| Working tree | **Uncommitted** polish + cleanup changes present (dozens of paths: modified/deleted/untracked). Polish strings exist in working tree only. |
| Live domain | `https://lisenbart.com/` |
| Live HTML sample (2026-07-18, Netlify Edge) | Still shows pre-polish: H2 `Two sides of the work.`; showreel caption `A mix of commissioned and personal work, cut together.`; About bio ends at Karpenko-Kary University (no team sentence); `/commercial` contact lead `Tell me about your project.` (no 24h clause) |
| Live JS asset seen | `assets/index-Dk2tUeEs.js` |
| Netlify response headers (sample) | `date: Sat, 18 Jul 2026 12:30:19–12:30:50 GMT`; `age: ~1745–1776`; `cache-status: "Netlify Edge"; hit`; `cache-control: no-cache`; `server: Netlify` |
| Deploy conclusion | **Live site matches last pushed commit (`3a22ff3`), not the uncommitted polish.** Code ↔ live **diverge** until commit + push + Netlify build. |

---

## 5. Inventory for external lenses (facts only — no scoring)

Material an external editor can use for client / partner / investor reads. Verbatim signals currently in **working tree** (will match live only after deploy).

### Signals a potential client would encounter

- Positioning line: `I direct animation and film — for festivals, for brands, and for myself.`
- Proof line: `35 years in animation · 20 years producing · 1000+ projects delivered` + `IMDb ↗`
- Trusted-by brands (Commercial): Samsung, McDonald's, Nestlé, MasterCard, Playtika, Plarium
- Commercial reels labels/text: AI Powered / Advertising / Games (see `site.commercialPage.reels`)
- Primary CTA button text sitewide: `Discuss a project`
- Contact leads: Home & Commercial = 24h promise; Film = festival/co-pro/press lead
- Form submit: `Send message` → success `Got it — thank you. I'll read it properly and get back to you soon.`
- Testimonials H3: `What clients say` (+ seed quotes; only Playtika marked `confirmed: true` in data)

### Signals a potential partner / co-founder would encounter

- Explore H2: `Two roads, one direction.`
- Film path: `Authored cinema & personal IP` / `Original shorts, an animated feature in development, and two IP universes.`
- Commercial path: `Brands & game studios` / `Campaign films, trailers and animation for brands and game studios.`
- About bio (full paragraph including team sentence — §2)
- Recognition line: `UANIMA · Head of Ukranimafilm, 2017–2019`
- Locations (About): `Ukraine · Canada · Poland`
- Footer locations: `Ukraine · Canada · Poland · Remote worldwide`
- Film hub H1 lead: `Original stories, directed for the screen — not the client.`
- Showreel caption acknowledging collaboration: `…None of it made alone.`

### Signals an investor would encounter

- Meta title: `Dmytro Lisenbart — Animation Director & Producer`
- Meta / OG description: `I direct animation and film — for festivals, for brands, and for myself. Festival work, children’s IP, and commercial craft.`
- JSON-LD (`index.html`): Organization `LISENBART`; founder `Dmytro Lisenbart`; `areaServed`: Ukraine, Canada, Poland, Worldwide; `knowsAbout`: Film Production, Animation, Game Content; sameAs LinkedIn / YouTube / Facebook
- Commercial hub H1 lead: `Production leadership for brands, agencies and game studios.`
- Film cases on `/film` with awards/selections/IMDb/credits (Unnecessary Things laurels `15 awards`, `45 selections`, `7.9 IMDb`; status badge on Last Kozak `Feature film in development`; YouTube IP channels Pershosvit / Scoopy Cap with subscriber/video stats in copy)
- Sitemap (`public/sitemap.xml` in working tree): `/`, `/film`, `/commercial`, plus legacy `/work/*` at lower priority

---

*End of check. External editor to supply tone/style analysis separately.*
