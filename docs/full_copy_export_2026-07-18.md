# Full copy export — lisenbart.com

**Date:** 2026-07-18  
**Commit:** `3a22ff3`  
**Scope:** User-facing copy on Home (`/`), `/film`, `/commercial`, plus shared chrome (Header, Footer, mobile CTA) and global meta/JSON-LD.  
**Method:** Extracted verbatim from the codebase as of this date. No tone evaluation.

---

## Global: Meta & structured data

### Home meta (`SEO` via `HomePage`)

| Element | Text | Source |
|---------|------|--------|
| `<title>` | Dmytro Lisenbart — Animation Director & Producer | `src/data/site.ts` → `site.meta.title` |
| `meta description` | I direct animation and film — for festivals, for brands, and for myself. Festival work, children’s IP, and commercial craft. | `src/data/site.ts` → `site.meta.description` |
| `og:title` / `twitter:title` | same as `<title>` | `src/components/SEO.tsx` |
| `og:description` / `twitter:description` | same as description | `src/components/SEO.tsx` |
| `og:url` / canonical | https://www.lisenbart.com | `site.canonical` |
| `og:image` / `twitter:image` | https://www.lisenbart.com/images/work/lisenbart-showreel-preview.jpg | `site.meta.ogImage` via `publicAsset` |
| `og:type` | website | hardcoded `SEO.tsx` |
| `twitter:card` | summary_large_image | hardcoded `SEO.tsx` |

### `/film` meta

| Element | Text | Source |
|---------|------|--------|
| `<title>` | Film — LISENBART | template `` `Film — ${site.brand}` `` in `FilmPage.tsx` |
| description / OG / Twitter description | Original stories, directed for the screen — not the client. | `site.filmPage.title` |
| canonical / `og:url` | https://www.lisenbart.com/film | `site.canonical` + `routes.film` |

### `/commercial` meta

| Element | Text | Source |
|---------|------|--------|
| `<title>` | Commercial — LISENBART | template `` `Commercial — ${site.brand}` `` in `CommercialPage.tsx` |
| description / OG / Twitter description | Production leadership for brands, agencies and game studios. | `site.commercialPage.title` |
| canonical / `og:url` | https://www.lisenbart.com/commercial | `site.canonical` + `routes.commercial` |

### JSON-LD (`index.html`, verbatim)

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "LISENBART",
  "url": "https://www.lisenbart.com",
  "email": "info@lisenbart.com",
  "description": "I direct animation and film — for festivals, for brands, and for myself.",
  "founder": {
    "@type": "Person",
    "name": "Dmytro Lisenbart"
  },
  "logo": {
    "@type": "ImageObject",
    "url": "https://www.lisenbart.com/images/logo_white.png"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "email": "info@lisenbart.com",
    "contactType": "Business Inquiries"
  },
  "sameAs": [
    "https://www.linkedin.com/in/lisenbart/",
    "https://www.youtube.com/@lisenbartProduction",
    "https://www.facebook.com/dmytro.linsenbarth"
  ],
  "areaServed": ["Ukraine", "Canada", "Poland", "Worldwide"],
  "knowsAbout": ["Film Production", "Animation", "Game Content"]
}
```

---

## Shared chrome (all pages)

### Header — `Header.tsx` + `BrandLogo.tsx` + `HeaderConnectMenu.tsx`

| Type | Text | Source |
|------|------|--------|
| alt-текст (logo, light) | LISENBART | `site.brand` via `BrandLogo` |
| aria-label (logo link) | LISENBART home | template with `site.brand` |
| мікрокопі / nav link | Film | hardcoded `hubLinks` in `Header.tsx` |
| мікрокопі / nav link | Commercial | hardcoded `hubLinks` in `Header.tsx` |
| мікрокопі кнопки | Discuss a project | `site.ctaLabel` (`site.ts`) |
| aria-label (theme) | Switch to light mode / Switch to dark mode | hardcoded `Header.tsx` |
| aria-label (email icon) | Email info@lisenbart.com | template with `site.email` |
| aria-label (connect menu) | Open connect menu / Close connect menu | hardcoded |
| eyebrow / panel label | Connect | hardcoded `HeaderConnectMenu.tsx` |
| мікрокопі / menu item title | Email | hardcoded |
| body / menu item sub | info@lisenbart.com | `site.email` |
| aria-label (panel) | Connect with LISENBART | hardcoded |
| соціальні лейбли | WhatsApp, LinkedIn, Facebook, YouTube | `src/data/socials.ts` → `socialNetworks[].label` |

### Footer — `Footer.tsx`

| Type | Text | Source |
|------|------|--------|
| alt-текст (logo) | LISENBART | `site.brand` |
| caption / tagline | Film · Commercial | `site.tagline.line1` |
| body-параграф (desktop) | I direct animation and film — for festivals, for brands, and for myself. Festival work, children’s IP, and commercial craft. | `site.meta.description` |
| мікрокопі кнопки | Discuss a project | `site.ctaLabel` |
| eyebrow / section label | Navigate | hardcoded |
| мікрокопі / nav | Showreel | hardcoded `navLinks` |
| мікрокопі / nav | About | hardcoded `navLinks` |
| мікрокопі / nav | Contact | hardcoded `navLinks` |
| мікрокопі / nav | Film | hardcoded |
| мікрокопі / nav | Commercial | hardcoded |
| eyebrow / section label | Connect | hardcoded |
| мікрокопі / social | Email | hardcoded |
| мікрокопі / social | WhatsApp | hardcoded |
| мікрокопі / social | LinkedIn | hardcoded |
| мікрокопі / social | Facebook | hardcoded |
| мікрокопі / social | YouTube | hardcoded |
| caption / locations | Ukraine · Canada · Poland · Remote worldwide | `site.locations` |
| caption / copyright | © 2026 LISENBART | year = `new Date().getFullYear()`; name = `site.name` |

### Mobile sticky CTA — `MobileEstimateCTA.tsx`

| Type | Text | Source |
|------|------|--------|
| мікрокопі кнопки | Discuss a project | `site.ctaLabel` |

### Social coming-soon modal (inactive channels) — `SocialComingSoonModal.tsx`

| Type | Text | Source |
|------|------|--------|
| eyebrow | {channelLabel} | passed from social network label |
| H2 | Almost there | `site.socialComingSoon.title` |
| body-параграф | This channel is still in the works. For now, drop us a line and you'll hear back. | `site.socialComingSoon.body` |
| мікрокопі кнопки | Email Me | `site.socialComingSoon.cta` |
| мікрокопі кнопки | Close | `site.socialComingSoon.closeLabel` |

---

## Page: Home (`/`)

**Stack:** `PersonalHeroSection` → `ShowreelSection` → `ExplorePathsSection` → `PersonalAboutSection` → `ContactForm`  
**File:** `src/pages/HomePage.tsx`

### 1. Personal Hero — `PersonalHeroSection.tsx`

| Type | Text | Source |
|------|------|--------|
| aria-label (section) | Introduction | hardcoded |
| alt-текст | Portrait of Dmytro Lisenbart | `site.hero.personalPortraitAlt` |
| eyebrow / role line | Animation Director & Producer | `site.hero.personalRole` |
| H1 | Dmytro Lisenbart | `site.hero.personalName` |
| body-параграф | I direct animation and film — for festivals, for brands, and for myself. | `site.hero.personalPositioning` |
| факт-чіп / proof line | 35 years in animation · 20 years producing · 1000+ projects delivered | `site.hero.personalProof` |
| мікрокопі кнопки (inline) | IMDb ↗ | hardcoded in `PersonalHeroSection.tsx` |

#### IMDb profile modal — `ImdbProfileModal.tsx`

| Type | Text | Source |
|------|------|--------|
| H2 | IMDb profile | hardcoded |
| caption (preview chrome URL) | www.imdb.com/name/nm11412621 | derived from href |
| body (preview name) | Dmytro Lisenbart | `site.hero.personalName` |
| body (preview role) | Animation Director & Producer | `site.hero.personalRole` |
| caption (preview credits) | Filmography · Festival credits | hardcoded |
| body-параграф | My director page on IMDb — filmography and festival credits. Opens in a new tab. | hardcoded |
| мікрокопі кнопки | Open on IMDb | hardcoded |
| мікрокопі кнопки | Close | hardcoded |
| aria-label (close) | Close | hardcoded |

### 2. Showreel — `ShowreelSection.tsx` + `HeroShowreel.tsx`

| Type | Text | Source |
|------|------|--------|
| aria-label | Showreel | default prop / hardcoded |
| H2 | Showreel | `site.showreelSection.title` |
| caption | A mix of commissioned and personal work, cut together. | `site.showreelSection.caption` |
| iframe title / aria | Showreel | passed as `title` / `ariaLabel` |
| aria-label (play) | Play Showreel | template in `HeroShowreel` |
| aria-label (pause / mute / share / fullscreen) | Pause Showreel / Unmute Showreel / Mute Showreel / Share Showreel / Fullscreen Showreel / Exit fullscreen Showreel | templates in `HeroShowreel.tsx` |

### 3. Explore paths — `ExplorePathsSection.tsx`

| Type | Text | Source |
|------|------|--------|
| aria-label (section) | Explore work | hardcoded |
| H2 | Two sides of the work. | `site.explorePaths.title` |
| eyebrow / path label | Film | `site.explorePaths.film.label` |
| H3 | Authored cinema & personal IP | `site.explorePaths.film.title` |
| body-параграф | Original shorts, an animated feature in development, and two IP universes. | `site.explorePaths.film.text` |
| eyebrow / path label | Commercial | `site.explorePaths.commercial.label` |
| H3 | Brands & game studios | `site.explorePaths.commercial.title` |
| body-параграф | Campaign films, trailers and animation for brands and game studios. | `site.explorePaths.commercial.text` |

Note: `site.explorePaths.film.cta` / `commercial.cta` (`Explore`) and `explorePaths.eyebrow` (`Explore`) exist in `site.ts` but are **not rendered** (chevron icon only).

### 4. About — `PersonalAboutSection.tsx`

| Type | Text | Source |
|------|------|--------|
| aria-label | About | hardcoded |
| H2 | About | `site.personalAbout.title` |
| body-параграф | I've been directing animation for 35 years and producing commercial work for 20 — leading creative and production teams across Ukraine, Canada and Poland for clients across Europe and North America. I headed Ukranimafilm from 2017 to 2019 and co-founded UANIMA, the Ukrainian Animation Association. My background is in painting and film directing, trained at Kyiv's Karpenko-Kary University. | `site.personalAbout.bio` |
| факт-чіп / recognition | UANIMA · Head of Ukranimafilm, 2017–2019 | `site.personalAbout.recognition` |
| факт-чіп / locations | Ukraine · Canada · Poland | `site.personalAbout.locations` |

### 5. Contact — `ContactForm.tsx` (Home default lead)

| Type | Text | Source |
|------|------|--------|
| H2 | Contact | hardcoded |
| body-параграф (lead) | Tell me about your project — I'll get back to you within 24 hours. | default prop in `ContactForm.tsx` |
| label поля | Email | hardcoded |
| label helper | * (required marker) | hardcoded class `inquiry-required` |
| placeholder | you@company.com | hardcoded |
| validation | Email is required | `src/lib/contactSubmit.ts` |
| validation | Enter a valid email | `src/lib/contactSubmit.ts` |
| label поля | Name | hardcoded |
| label helper | optional | hardcoded |
| label поля | Project type | hardcoded |
| label helper | optional | hardcoded |
| select placeholder option | Select type | hardcoded |
| select options | Campaign & Brand Film | `src/data/services.ts` → `projectTypes` |
| select options | Game Trailer or Cinematic | `projectTypes` |
| select options | Animation & Motion | `projectTypes` |
| select options | AI-Assisted Production | `projectTypes` |
| select options | Other | `projectTypes` |
| caption / helper (when AI selected) | AI speeds up the work — the craft stays mine. | hardcoded `ContactForm.tsx` |
| label поля | Message | hardcoded |
| label helper | optional | hardcoded |
| placeholder | Brief, timeline, references... | hardcoded |
| мікрокопі кнопки (submit) | Send message | `site.contactSubmitLabel` |
| мікрокопі кнопки (loading) | Sending... | hardcoded |
| success body | Thank you. I've received your message and you'll hear back shortly. | hardcoded `ContactForm.tsx` / `contactSubmit.ts` |
| мікрокопі кнопки | Send another message | hardcoded |
| error fallback | Could not send your message. Please try again or email us directly. | `contactSubmit.ts` |

---

## Page: `/film`

**Stack:** hub header → case blocks → `ContactForm`  
**File:** `src/pages/FilmPage.tsx`  
**Case order:** `site.filmPage.caseIds` → `unnecessary-things`, `the-last-kozak`, `pershosvit`, `scoopy-cap` from `src/data/work.ts`

### Hub header

| Type | Text | Source |
|------|------|--------|
| H1 (name part) | Film | hardcoded `FilmPage.tsx` |
| H1 (lead part) | Original stories, directed for the screen — not the client. | `site.filmPage.title` |

### Case 1: Unnecessary Things — `WorkCaseBlock` + `work.ts`

| Type | Text | Source |
|------|------|--------|
| caption / meta | Lisenbart Animation Studio · Film & Entertainment · Short Film · 2021 | `client` · `category` · `year` |
| H2 | Unnecessary Things | `title` |
| факт-чіп / laurel | 15 awards | `laurels[]` |
| факт-чіп / laurel | 45 selections | `laurels[]` |
| факт-чіп / laurel | 7.9 IMDb | `laurels[]` |
| caption / selections prefix | Selected: | hardcoded `WorkCaseBlock.tsx` |
| link label | Vancouver International Film Festival | `selectionLinks[0].label` |
| link URL | https://www.youtube.com/watch?v=9I_So6Tq0rU | `selectionLinks[0].href` |
| link label | Short Shorts Film Festival & Asia (Tokyo) | `selectionLinks[1].label` |
| link URL | https://shortshorts.org/2022/en/program/anime/anime-2/unnecessary-things/ | `selectionLinks[1].href` |
| link label | St. Louis International Film Festival | `selectionLinks[2].label` |
| link URL | https://watch.eventive.org/2021sliff/play/615f8c7b6152f10045ca60bf/615cc215038537025765c6a0 | `selectionLinks[2].href` |
| link label | Winner, Prague Film Awards | `winnerLink.label` |
| link URL | https://odessa-journal.com/dmytro-lisenbarts-animated-short-unnecessary-things-won-an-award-at-the-prague-film-awards/ | `winnerLink.href` |
| body-параграф (description) | Award-winning 14-minute animated short — World Premiere at Shanghai, Best Animated Short Film at Curtas. A robot buys a human from a store of unwanted things; a friendship that ends where it began. | `description` |
| body / credits | Written and directed by Dmytro Lisenbart, based on a story by Robert Sheckley. Co-written with Andriy Rushkovskyi; production design by Dmytro Krivonos. Produced by Lisenbart Animation Studio and Marcus Film (Vitalii Khalo), with support from Derzhkino. | `credits` |
| quote body | Pair this with Blade Runner 2049 — a lovely story about sentience and friendship. | `quote.text` |
| quote attribution | Review on Letterboxd | `quote.attribution` |
| quote URL | https://letterboxd.com/film/unnecessary-things/ | `quote.href` |
| label | Result | hardcoded `WorkCaseBlock.tsx` |
| body (result) | Festival winner across Europe and Asia — from Linoleum and ZIFF to Vancouver, Huesca and Odessa. Full 2D production: script, design, animation and festival delivery. | `result` |
| alt-текст (poster) | Unnecessary Things — robot eyes close-up preview | `mediaImageAlt` |
| alt (stills) | (empty `alt=""`) | hardcoded; decorative |
| aria-label (stills list) | Unnecessary Things stills | template |
| IMDb badge title | View on IMDb | hardcoded `ImdbTitleRating.tsx` |
| IMDb badge dynamic | rating `/10` + vote count from API for `tt14760808` | live; fallback `…` / `—` |
| aria-label (play) | Play Unnecessary Things video | template |

### Case 2: The Last Kozak — `work.ts`

| Type | Text | Source |
|------|------|--------|
| caption / meta | Lisenbart Animation Studio · Film & Entertainment · Animated Feature · In development | `client` · `category` · `year` |
| H2 | The Last Kozak | `title` |
| факт-чіп / status | Feature film in development | `statusBadge` |
| body lead (line 1 of description) | 80-minute animated feature · Drama · Action · Fantasy · 12+ | `description` (before `\n`) |
| body (line 2+) | He has no name — everyone calls him the Last Kozak. Trapped in a time loop, he must defeat evil again and again. A stylized action-fantasy with comic-book editing, psychological depth and a cossack who rides the Iron Dog through worlds that intersect at the Last Khreshchatyk. | `description` (after `\n`) |
| label | Result | hardcoded |
| body (result) | Currently in development — script, treatment and pitch complete. English teaser available. | `result` |
| alt-текст | The Last Kozak — teaser preview frame | `mediaImageAlt` |

### Case 3: Pershosvit · Kapitan Świetlik — `work.ts` (shown with `filmCategory`)

| Type | Text | Source |
|------|------|--------|
| caption / meta | Pershosvit · Original IP · YouTube Channel · 2024 | `client` · `filmCategory` (overrides `category` on `/film`) · `year` |
| H2 | Pershosvit · Kapitan Świetlik | `title` |
| body lead | 147K subscribers · 274 videos · breakout hits in Ukrainian | first line of `description` |
| body | The country's leading preschool channel — songs, fairy tales and learning with Kapitan Świetlik, a robot hero parents trust and kids watch on repeat. | rest of `description` |
| label | Result | hardcoded |
| body (result) | Baby Shark UA became a channel phenomenon. Alphabet, bedtime and learning series driving daily growth across Ukraine. | `result` |
| caption (YouTube preview) | YouTube channel | hardcoded `WorkYouTubeChannelPreview.tsx` |
| preview title | Pershosvit · Kapitan Świetlik | `title` |
| alt-текст (avatar/media) | Pershosvit YouTube channel | `mediaImageAlt` |
| мікрокопі кнопки | Watch on YouTube | hardcoded `WorkCaseBlock.tsx` |
| мікрокопі кнопки | Discuss a project | `site.ctaLabel` |
| link | https://www.youtube.com/@pershosvit | `youtubeUrl` |

### Case 4: Scoopy Cap — `work.ts` (shown with `filmCategory`)

| Type | Text | Source |
|------|------|--------|
| caption / meta | Scoopy Cap · Original IP · YouTube Channel · 2024 | `client` · `filmCategory` · `year` |
| H2 | Scoopy Cap | `title` |
| body lead | 225 videos · 10.4K subscribers · weekly hits that kids replay | first line of `description` |
| body | Full English preschool channel — nursery rhymes, ABC, colours and numbers built around Scoopy Cap, a friendly space explorer designed for calm watch-time and repeat views. | rest of `description` |
| label | Result | hardcoded |
| body (result) | Finger Family became the channel's top-performing video. New full songs every Saturday, Shorts through the week — a content engine built to grow. | `result` |
| caption (YouTube preview) | YouTube channel | hardcoded |
| alt-текст | Scoopy Cap YouTube channel | `mediaImageAlt` |
| мікрокопі кнопки | Watch on YouTube | hardcoded |
| мікрокопі кнопки | Discuss a project | `site.ctaLabel` |
| link | https://www.youtube.com/@ScoopyCap | `youtubeUrl` |

### Contact on `/film`

| Type | Text | Source |
|------|------|--------|
| H2 | Contact | hardcoded `ContactForm.tsx` |
| body-параграф (lead) | For festival inquiries, co-productions or press — get in touch. | `site.filmPage.contactLead` |
| (остальні поля/кнопки — як на Home) | — | same as Home Contact |

Note: `site.filmPage.contactCtaLabel` (`Get in touch`) exists in data but is **not used** by `ContactForm` (submit uses `site.contactSubmitLabel`).

---

## Page: `/commercial`

**Stack:** hub header → `TrustedBySection` → reel blocks → `TestimonialsSection` → `ContactForm`  
**File:** `src/pages/CommercialPage.tsx`

### Hub header

| Type | Text | Source |
|------|------|--------|
| H1 (name part) | Commercial | hardcoded |
| H1 (lead part) | Production leadership for brands, agencies and game studios. | `site.commercialPage.title` |

### Trusted by — `TrustedBySection.tsx`

| Type | Text | Source |
|------|------|--------|
| eyebrow / label | Trusted by | `site.trustedBy.label` |
| факт-чіп | Samsung | `site.trustedBy.brands` |
| факт-чіп | McDonald's | `site.trustedBy.brands` |
| факт-чіп | Nestlé | `site.trustedBy.brands` |
| факт-чіп | MasterCard | `site.trustedBy.brands` |
| факт-чіп | Playtika | `site.trustedBy.brands` |
| факт-чіп | Plarium | `site.trustedBy.brands` |

### Reel 1: AI Powered — `ReelBlock` + `site.commercialPage.reels[0]`

| Type | Text | Source |
|------|------|--------|
| H2 | AI Powered | `label` |
| body-параграф | Concept exploration and rapid visual development — accelerated with AI-assisted tools, always finished by hand. | `text` |
| факт-чіп / media | COMING SOON | hardcoded `ReelBlock.tsx` |
| caption / countdown | `{N} days left` / `1 day left` / `Available soon` | computed from `comingSoonEndsAt`: `2026-07-27T18:00:00+02:00` |

### Reel 2: Advertising — `site.commercialPage.reels[1]`

| Type | Text | Source |
|------|------|--------|
| H2 | Advertising | `label` |
| body-параграф | Brand campaigns and commercial films for Samsung, McDonald's, Nestlé and MasterCard — from first concept to final delivery. | `text` |
| aria-label (player) | Advertising reel | template `` `${label} reel` `` |

### Reel 3: Games — `site.commercialPage.reels[2]`

| Type | Text | Source |
|------|------|--------|
| H2 | Games | `label` |
| body-параграф | Trailers and cinematics for Playtika, Plarium and Moon Active — built to sell the moment before the click. | `text` |
| aria-label (player) | Games reel | template |

### Testimonials — `TestimonialsBlock.tsx` + `data/testimonials.ts`

| Type | Text | Source |
|------|------|--------|
| H3 | What clients say | `site.testimonialsBlock.title` |
| aria-label (add) | Leave a review | `site.testimonialsBlock.addLabel` |
| caption (clamped card) | Tap to read full review | hardcoded `TestimonialCard.tsx` |
| aria (pending card) | Review pending approval | hardcoded |

#### Seed testimonials (all visible; only `confirmed: true` is fully readable without blur)

| Quote | Name | Company | Rating | confirmed | Source |
|-------|------|---------|--------|-----------|--------|
| A reliable production partner for over 6 years. We keep coming back — and we're never disappointed. | Lena Feldman | Playtika | 5 | true | `testimonials.ts` |
| Fast, reliable, and always on brief — even when timelines shift. | Maya Cohen | Plarium | 5 | false | `testimonials.ts` |
| Clear communication from kickoff to final delivery. | David Weiss | Moon Active | 5 | false | `testimonials.ts` |
| Consistent quality across every campaign we run together. | Rachel Ortiz | Product Madness | 5 | false | `testimonials.ts` |
| They handle complexity so we can focus on launch. | Antoine Dubois | Voodoo | 5 | false | `testimonials.ts` |
| Smooth production, strong creative, zero drama. | Tom Becker | HelloFresh | 5 | false | `testimonials.ts` |
| Flexible team, sharp execution — a real partner. | Jin Park | Samsung | 5 | false | `testimonials.ts` |
| Our go-to studio for animation under tight deadlines. | Sarah Mitchell | McDonald's | 5 | false | `testimonials.ts` |
| Trusted for years — they always deliver on time. | Elena Rossi | Nestlé | 5 | false | `testimonials.ts` |
| One point of contact, end-to-end — exactly what we need. | James Carter | MasterCard | 5 | false | `testimonials.ts` |

#### Leave a review modal — `TestimonialSubmitPopover.tsx`

| Type | Text | Source |
|------|------|--------|
| H2 | Leave a review | `site.testimonialsBlock.submitModal.title` |
| caption / subtitle | Sent for moderation before publishing | `submitModal.subtitle` |
| label поля | Your review | `submitModal.quoteLabel` |
| caption | Up to 500 characters | hardcoded + `TESTIMONIAL_MAX_LENGTH` |
| caption | {N} left | hardcoded template |
| label поля | Your name | `submitModal.nameLabel` |
| label поля | Company | `submitModal.companyLabel` |
| label | Rating | `submitModal.ratingLabel` |
| мікрокопі кнопки | No rating | `submitModal.ratingSkip` |
| мікрокопі кнопки | Send review | `submitModal.submitLabel` |
| мікрокопі (loading) | Sending... | `submitModal.sendingLabel` |
| success body | Review submitted and will be added as soon as possible. | `submitModal.successBody` |
| validation summary | Please check the highlighted fields. | `submitModal.validationSummary` |
| validation | Name is required | `testimonialSubmit.ts` |
| validation | Company is required | `testimonialSubmit.ts` |
| validation | Review text is required | `testimonialSubmit.ts` |
| validation | Maximum 500 characters | `testimonialSubmit.ts` |
| success CTA | Discuss a project | `site.ctaLabel` |
| close | Close | `submitModal.closeLabel` |

### Contact on `/commercial`

| Type | Text | Source |
|------|------|--------|
| H2 | Contact | hardcoded |
| body-параграф (lead) | Tell me about your project. | `site.commercialPage.contactLead` |
| (поля/кнопки — як на Home) | — | same as Home Contact |

---

## CTA / button consistency table

| Visible text | Where used |
|--------------|------------|
| Discuss a project | Header (desktop); Footer (sm+); Mobile sticky bar; YouTube case CTA row (`WorkCaseBlock`); Testimonial success modal CTA |
| Send message | Contact form submit (`site.contactSubmitLabel`) |
| Sending... | Contact form loading; Testimonial form loading (`sendingLabel`) |
| Send another message | Contact success state |
| Watch on YouTube | Pershosvit & Scoopy Cap cases |
| IMDb ↗ | Home hero proof line |
| Open on IMDb | IMDb profile modal |
| Close | IMDb modal; Social coming-soon modal; Testimonial submit modal (aria + button) |
| Email Me | Social coming-soon modal CTA |
| Leave a review | Testimonials add button (aria-label); also modal H2 |
| Send review | Testimonial form submit |
| No rating | Testimonial rating skip |
| Film | Header hub; Footer nav; Explore path label; `/film` H1 name |
| Commercial | Header hub; Footer nav; Explore path label; `/commercial` H1 name |
| Showreel | Footer nav; Showreel H2 |
| About | Footer nav; About H2 |
| Contact | Footer nav; Contact H2 |
| Email | Footer Connect; Header connect menu item title |
| WhatsApp / LinkedIn / Facebook / YouTube | Footer Connect list; social icon aria-labels via `socials.ts` |
| Select type | Contact project-type empty option |
| Tap to read full review | Testimonial card hint (when clamped) |

### Contact lead variants (not buttons, but CTA-adjacent)

| Text | Where |
|------|--------|
| Tell me about your project — I'll get back to you within 24 hours. | Home Contact (default) |
| For festival inquiries, co-productions or press — get in touch. | `/film` Contact |
| Tell me about your project. | `/commercial` Contact |

---

## Appendix A — Data present in `site.ts` but not rendered on Home / Film / Commercial

| Key | Value | Notes |
|-----|-------|-------|
| `hero.personalCta` | Watch reel ↓ | not used by `PersonalHeroSection` |
| `hero.posterCtaLabel` | See our work | legacy |
| `hero.headlineLine2BeforeAccent` / `headlineAccent` / `paragraph` | The right team. / End to end / From brief to screen… | legacy |
| `explorePaths.eyebrow` | Explore | not rendered |
| `explorePaths.film.cta` / `commercial.cta` | Explore | not rendered (chevron only) |
| `personalAbout.eyebrow` | About | not rendered (H2 uses `title`) |
| `filmPage.contactCtaLabel` | Get in touch | unused |
| `capabilitiesLine` | Film, animation, game and AI content — scoped and delivered end to end. | unused on these pages |
| `capabilityShowreelModal.*` | Showreel coming soon / Close | legacy capability UI |

## Appendix B — Component with copy not mounted on current IA

`EstimateCTA.tsx` (not in `App.tsx` stack):

| Type | Text |
|------|------|
| H2 | Have a project in mind? |
| body | Send us your brief, references or even an early idea. We'll review it and propose the most effective production approach. |
| button | Get a Project Estimate |
| link | Email Us Directly |

## Appendix C — Legacy `/work/*` categories

Still in `src/data/work.ts` and routable, but **outside** the primary Home / Film / Commercial IA. Case titles and descriptions for commercial/gaming/film/social archive pages remain in that file if needed for a separate export.

---

*End of export.*
