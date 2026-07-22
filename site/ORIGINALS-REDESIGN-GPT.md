# LISENBART site audit + ORIGINALS redesign brief (for GPT)

**Purpose:** Hand this file to GPT (or another agent) as the single context pack before redesigning the **Originals** page (`/film/`).  
**Site:** https://lisenbart.com · repo root contains `site/` (Vite + React).  
**Owner intent:** Client Work is in good shape; **Originals is a mess** and is the next design focus. Do **not** invent marketing copy — flag content decisions. Prefer matching Client Work clarity (width, hierarchy, less clutter) without blindly cloning reel slideshows.

**Live deploy:** Netlify from `main`. Local: `cd site && npm run dev`.

---

## 0. What “done” looks like for Originals redesign

After redesign, `/film/` should feel as clear and intentional as `/commercial/`:

- One width system aligned with footer + contact form (**920px** preferred unless a deliberate exception is documented).
- Each project reads as one unit: media + short copy, not a dump of legacy fields.
- Festival films, features-in-development, and YouTube IP can share a shell but not the same overloaded chrome.
- No full-bleed one-off ink bands that break page rhythm (current Last Kozak).
- Mobile: obvious which text belongs to which project.
- Keep shared chrome: Header, Footer, ContactForm, brand names.

---

## 1. Site map & routes

| Route | Page | Nav |
|-------|------|-----|
| `/` | Home | Brand |
| `/film/` | Originals (`FilmPage`) | Originals |
| `/commercial/` | Client Work (`CommercialPage`) | Client Work |

- **About** is `#about` on home (not a route).
- Header CTA: **Discuss a Project** (desktop label; mobile = white message icon in black circle).
- Redirects: `/work` → commercial; `/work/film` → `/film/`.

### Home section order
1. `PersonalHeroSection` — CTA “View Directions” → `#explore`
2. `ExplorePathsSection` — “One Practice. / Two Directions.” → Originals + Client Work panels
3. `PersonalAboutSection`
4. `ContactForm` — “Start a Conversation”

**Not on home:** showreel section (component exists unused), Trusted By, testimonials.

### Originals `/film/` order
1. Hub header — **LISENBART ORIGINALS** + lead
2. Four `WorkCaseBlock` cases (see §4)
3. `ContactForm` — “Project Enquiries”

### Client Work `/commercial/` order
1. Hub header — **CLIENT WORK** + lead
2. `TrustedBySection`
3. Three `ReelBlock`s: AI Production (WIP) → Gaming → Advertising
4. `ContactForm` — “Have a Brief?”

---

## 2. Design system snapshot

### Stack
- Vite + React, Tailwind v4, Framer Motion, Lucide.
- Styles: `src/styles/fonts.css` → `archive-design.css` → `index.css` → `theme-light.css`.
- **Dual CSS systems:** legacy `index.css` work-block world + newer `archive-design.css` “Living Film Archive”. Commercial mostly escaped the mess via `.film-cases--reels`; Originals did not.

### Tokens / widths
| Token / surface | Width / note |
|-----------------|--------------|
| `--page-max` | **1440px** |
| Footer inner | **920px** |
| Contact form | **920px** |
| Client Work reels | **920px** |
| Originals `.film-cases` (archive) | **page-max 1440** ← mismatch |
| Paper / ink | `#f1efe8` / `#111114` |
| Fonts | Montserrat (display), DM Sans (body), IBM Plex Mono (meta) |

### Keep consistent
- Header: logo · Originals / Client Work / About · Discuss CTA
- Footer: logo · Navigate · Connect (Email, LinkedIn, YouTube, IMDb) · locations · ©
- Hub header pattern (name + lead) shared by film + commercial

---

## 3. Client Work — reference pattern (good)

**Files:**
- `src/pages/CommercialPage.tsx`
- `src/components/ReelBlock.tsx`
- `src/components/ReelSlideshow.tsx`
- `src/components/HeroShowreel.tsx`
- `src/styles/archive-design.css` (`.film-cases--reels` block)
- Preview stills: `public/images/reels/{ai,games,advertising}/*.webp`

**Pattern:**
1. Preview slideshow of optimized stills.
2. Centered play (white circle, black triangle) → mounts Vimeo showreel (`autoPlay`).
3. Copy column: **title + one paragraph only**.
4. Desktop ≥900px: split media | copy; mobile: media then copy; dividers between units.
5. AI: slideshow + WIP / Coming soon (no play; `vimeoId: null`).

**Why it works:** one media model, two text fields, same width as form/footer, no credits/quotes/stills dump.

---

## 4. Originals — deep audit (priority)

### 4.1 Page shell
`src/pages/FilmPage.tsx`
- `work-page work-page--film archive-hub`
- Maps `site.filmPage.caseIds` → `getWorkCasesByIds`
- Overrides: if `filmCategory`, sets `category = filmCategory`, clears `client` + `year`
- Always `mediaSide="left"` (no alternating)
- First case `mediaPriority="lcp"`
- JSON-LD: Unnecessary Things + The Last Kozak only (`src/data/filmJsonLd.ts`)

### 4.2 Cases on the live page (order)

From `site.filmPage.caseIds`:

| # | id | Title | Media | Dense fields on page |
|---|-----|-------|-------|----------------------|
| 1 | `unnecessary-things` | Unnecessary Things | Vimeo `823618245` + poster + **4 stills** | filmCategory, description, result, imdbId, selectionLinks×3, winnerLink, credits, quote |
| 2 | `the-last-kozak` | The Last Kozak | Vimeo `699197721` + poster | filmCategory, long description, result — **CSS full-bleed ink band** |
| 3 | `pershosvit` | Pershosvit · Kapitan Świetlik | YouTube channel preview UI → embed | filmCategory, multi-line description + stats, result, youtube CTA |
| 4 | `scoopy-cap` | Scoopy Cap | Same YouTube channel pattern | same as Pershosvit |

**Meta shown:** only `filmCategory` strings after FilmPage override:
- `Animated Short · 14 min`
- `Animated Feature · 80 min · In Development`
- `Original Preschool IP · Ukrainian` / `· English`

### 4.3 In data but NOT on `/film/`
In `work.ts` film/social catalogs, unused by `caseIds`:
- `song-departure`, `song-mishka`
- `film-coming-soon`, `film-your-project`
- social coming-soon / your-project placeholders

`laurels[]` / `statusBadge` exist on the type; **no live originals case uses them**.

### 4.4 `WorkCaseBlock` — overloaded single component
`src/components/WorkCaseBlock.tsx` handles:
- Playables grid
- YouTube channel chrome
- Poster → play → Vimeo/YT
- Static image / placeholder / coming-soon progress

**Copy stack (dense):** meta · title (+ IMDb) · status · laurels · selection/winner notes · description · credits · quote · **Result** · YouTube CTA.

Mobile (`index.css` ≤767): `display: contents` reorders title → meta → media → rest.

### 4.5 CSS conflicts causing the mess
1. `index.css` `.film-cases .work-block` → max-width **920px**
2. `archive-design.css` `.work-page.archive-hub .film-cases` → **1440px**, `max-width: none !important`
3. Per-id hacks in `archive-design.css`:
   - `#unnecessary-things` — oversized title
   - `#the-last-kozak` — **100vw ink background**, inverted text (breaks paper rhythm)
   - `#pershosvit` / `#scoopy-cap` — redundant title color resets
4. Aspect ratios: posters ~16/10, video forced 16/9, YouTube preview is a mini-UI inside that frame
5. Leftover: work-nav, work-shell, gradient titles, media drop-shadows (partially overridden)

### 4.6 Why it feels like “повний бардак”
1. Four unlike products forced through one legacy template
2. Unnecessary Things density (stills + festivals + winner + credits + Letterboxd + Result + IMDb)
3. Width mismatch vs Client Work / footer / form
4. Last Kozak ink takeover
5. “Result” sounds commercial KPI on festival/IP work
6. YouTube faux-channel UI vs clean poster+play language on films
7. Hub title + enlarged first-case title compete
8. Dual CSS systems + mobile reorder complexity

### 4.7 Contrast vs Client Work & Explore

| | Explore | Client Work | Originals |
|--|---------|-------------|-----------|
| Model | title + text | label + text | full WorkCaseStudy |
| Layout | archive-panel overlay | split 16:9 + copy | 2-col work-block + extras |
| Width | page-max | **920** | **1440** |
| Coming soon | n/a | WIP badge | unused on page |

---

## 5. Copy / voice (do not rewrite unless asked)

| Surface | Copy |
|---------|------|
| Brand directions | **LISENBART ORIGINALS** · **CLIENT WORK** |
| Nav | **Originals** · **Client Work** · **About** |
| Film hub lead | “Original films and story worlds developed from first idea through production.” |
| Film contact | “Project Enquiries” / co-pro, distribution, festivals, press |
| Explore film | “Independent films, stories, and IP developed from the first idea onward.” |

Voice: first-person on home; institutional brand names on hubs; commercial = brief-oriented; film = festival/press-oriented.

---

## 6. Files to edit for Originals redesign

### Primary
- `site/src/pages/FilmPage.tsx`
- `site/src/components/WorkCaseBlock.tsx` **or replace** with a film-specific component (recommended: parallel to `ReelBlock`)
- `site/src/data/work.ts` (film/social case fields)
- `site/src/data/site.ts` (`filmPage`)
- `site/src/styles/archive-design.css` (hub + `#the-last-kozak` + film-cases)
- `site/src/styles/index.css` (`.work-block*`, `.film-cases*`, YouTube preview)

### Likely
- `site/src/components/WorkYouTubeChannelPreview.tsx`
- `site/src/components/ImdbTitleRating.tsx`
- `site/src/data/filmJsonLd.ts` if case set/order changes
- Optional new: `site/src/components/FilmCaseBlock.tsx` (or similar)

### Leave alone for Originals-only pass
- `Header.tsx`, `Footer.tsx`, `ContactForm.tsx`
- `CommercialPage.tsx`, `ReelBlock.tsx`, `ReelSlideshow.tsx` (unless aligning tokens)

---

## 7. Recommended redesign approach (plan — implement only when asked)

### Fix list
1. Lock Originals content width to **920px** (match commercial/footer/form) unless owner chooses otherwise.
2. Remove or systematize per-id CSS (especially Kozak full-bleed).
3. Define 2–3 presentation modes: **festival film** · **feature in development** · **channel IP**.
4. Cap default density: title, one meta line, short synopsis, optional recognition, one CTA. Credits / quote / stills / festival link lists → secondary or progressive disclosure.
5. Media: prefer **16:9** poster → play (like reels). For YouTube IP: simpler card + “Watch on YouTube” instead of heavy channel chrome (content/UX decision).
6. Revisit universal **“Result”** label for originals (content decision — do not invent replacement without owner).
7. Replace dual-layout chaos with one owned layout (split desktop / stack mobile + clear unit separators like commercial).
8. Keep hub header + contact pattern.

### Content decisions needed from owner (do not invent)
- [ ] Keep all 4 cases or drop/reorder channels vs films?
- [ ] Add unused cases (`song-*`, coming soon)?
- [ ] What is visible by default vs “more” (credits, Letterboxd, festival links, stills)?
- [ ] Keep / rename / remove “Result”?
- [ ] Keep IMDb live rating on Unnecessary Things?
- [ ] Kozak: keep ink treatment or same shell as others?
- [ ] Width: confirm **920** lock?

### Suggested structure per case (wireframe-level)
```
[ Media 16:9 — poster / play / or channel still ]
[ Title ]
[ Meta line — filmCategory ]
[ Short synopsis ]
[ Optional: compact recognition / one CTA ]
```
Desktop: media left, copy right (or reverse for rhythm). Mobile: media, then tightly coupled copy, large gap between cases.

---

## 8. Bottom line

**Client Work** = tight 920px split-reel system with slideshow → play → showreel.  
**Originals** = legacy `WorkCaseBlock` catalog UI on a wider archive rail, ID-specific overrides, and four unlike products in one template.

That mismatch is the core of the mess. Redesign Originals toward Client Work **clarity and width**, not necessarily Client Work **slideshow mechanics**.

---

## 9. Quick commands

```bash
cd site
npm install
npm run dev          # local
npm run build        # must pass before deploy
```

Deploy: commit + push `main` → Netlify.

---

*Generated for GPT handoff. Prefer editing this brief if scope changes before coding.*
