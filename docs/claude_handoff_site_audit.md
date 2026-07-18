# LISENBART — site audit handoff (homepage full state)

**Updated:** 2026-07-15 (end of day, local uncommitted)  
**Live site:** https://lisenbart.com (may lag behind local — see Git status)  
**Repo:** `git@github.com:lisenbart/lisenbart.git` · branch `main`  
**Last pushed commit:** `2c86345` — Fix work category routes resolving to the homepage layout.

---

## Purpose

Full snapshot of the **homepage as rendered from current local code** — section order, all user-facing copy verbatim, Hero layout, protected strings, Jul 15 handoff checklist, capabilities, Git state. For Claude audit / next refinement pass.

**User language:** Ukrainian in chat · **site copy:** English.

---

## 1. Exact section order (`site/src/pages/HomePage.tsx`)

| # | Component | `aria-label` / role |
|---|-----------|---------------------|
| 1 | `HeroSection` | Introduction |
| 2 | `AboutSection` | Experience |
| 3 | `ServicesSection` | Production capabilities |
| 4 | `EndToEndProductionSection` | End to end production |
| 5 | `BeyondTheToolSection` | Beyond the tool |
| 6 | `HowWeWorkSection` | How we work |
| 7 | `FounderQuoteSection` | Founder note |
| 8 | `TestimonialsSection` → `TestimonialsBlock` | Client testimonials |
| 9 | `ContactForm` | Contact |

**Global chrome (via `App.tsx`, not in `HomePage`):** `Header`, `Footer`, `MobileEstimateCTA` (mobile sticky bar).

---

## 2. Hero section — current layout (not full-screen poster)

**Structure:** One centered **ios-card** block (`max-width: 920px`), **not** full-viewport video with text overlay.

| Breakpoint | Layout |
|------------|--------|
| **Desktop (≥768px)** | Single card: **text + CTA left** · **showreel right** (2-column grid) |
| **Mobile (<768px)** | Same card: **showreel on top** · **text + CTA below** |

**Showreel:** `HeroShowreel` default variant (`interactive`) — play/pause, mute/unmute, fullscreen, share. Vimeo ID `849899875`. iframe title: `LISENBART showreel`.

**CTA:** scrolls to `#services` (Production capabilities). Label: `See our work`.

**Page H1:** only in Hero (poster headline). Protected end-to-end line is **H2** in section 4.

---

## 3. Protected copy (do not change without explicit user permission)

| String | Where rendered | Tag |
|--------|----------------|-----|
| `The right team. ` + `End to end` + `.` | `EndToEndProductionSection` | **H2** (emerald accent on “End to end”) |
| `From brief to screen — animation, film and AI content, produced end to end.` | `EndToEndProductionSection` lead; also meta/JSON-LD/footer | **p** / meta |

**Also treated as protected from earlier sessions (content, not layout):**

- Experience stats: `1000+`, `15 awards`, `45 selections`, `8.0 on IMDb`, `20 years`, `Canada • Ukraine • Poland`, popover copy in `site.ts` modals
- Testimonials quotes/companies in `testimonials.ts` (moderation flow unchanged)

---

## 4. Jul 15 handoff — done vs not done

| Item | Status |
|------|--------|
| Section spacing reduced (`--section-spacing`, `--block-stack-gap`) | ✅ Done |
| `BeyondTheToolSection` separate, **before** `HowWeWorkSection` | ✅ Done |
| `HowWeWorkSection` — two model cards only (Project / Embedded) | ✅ Done |
| `EndToEndProductionSection` — process flow (Brief → Proposal → Production) | ✅ Done |
| Protected H2 + lead in End to End | ✅ Done |
| Testimonials moved to `TestimonialsSection` wrapper | ✅ Done |
| OG image → `lisenbart-showreel-preview.jpg` (was GLOWL `header_01.png`) | ✅ Done (local) |
| TheyDirect-inspired work model badges/chips | ✅ Done |
| Hero poster **full-screen** with text overlay | ❌ **Reverted** — now split card layout |
| Hero kicker / “Powered by AI. Directed by us.” | ❌ **Not added** |
| Remove personal text from `AboutSection` (Dmytro identity lines) | ❌ **Not done** — still present |
| Hero CTA → Production capabilities | ✅ Done (`#services`) |
| Single H1 on page (poster headline in Hero; end-to-end is H2) | ✅ Done |

---

## 5. Full user-facing copy by section

### SEO & document meta

| Field | Text |
|-------|------|
| `<title>` / `og:title` | `LISENBART — Film, Animation & AI Content` |
| `meta description` / `og:description` | `From brief to screen — animation, film and AI content, produced end to end.` 🔒 |
| `og:image` | `https://www.lisenbart.com/images/work/lisenbart-showreel-preview.jpg` |
| JSON-LD Organization `description` | `From brief to screen — animation, film and AI content, produced end to end.` 🔒 |

---

### Header (`Header.tsx`)

| Element | Text |
|---------|------|
| Logo tagline line 1 | `Commercial · film` |
| Logo tagline line 2 | `Gaming · social` |
| Theme toggle | `Switch to light mode` / `Switch to dark mode` |
| Email button | `Email info@lisenbart.com` |
| Primary CTA | `Discuss a project` |

*(Connect menu / social labels from `HeaderConnectMenu`, `SocialIconLinks` — not expanded here.)*

---

### 1. HeroSection

| Element | Text |
|---------|------|
| **H1** line 1 | `Animation and AI-assisted production` |
| **H1** line 2 | `for brands, agencies and gaming studios.` |
| CTA button | `See our work` → `#services` |
| Showreel controls | `Play showreel` · `Pause showreel` · `Unmute showreel` / `Mute showreel` · `Fullscreen showreel` / `Exit fullscreen` · `Share showreel` |

---

### 2. AboutSection (Experience)

| Element | Text |
|---------|------|
| **H2** | `Experience` |
| Identity | `Dmytro Lisenbart — producer, named lead and the trusted point of contact for clients across three continents.` |
| Lead | `Proven production experience, built across commercial and cinematic work.` |

**Stat cards:**

| Card | Visible text | Hint |
|------|--------------|------|
| Projects | `1000+` · `projects delivered` | `View clients` |
| Awards | `15 awards` · `45 selections` · `8.0 on IMDb` | `Festival recognition` |
| Timeline | `20 years` · `in animation since 2006` | `About the studio` |
| Teams | `Canada • Ukraine • Poland` · `creative & production teams` | `Global team` |

**Popover copy** (on stat click, from `site.ts`):

- **Clients:** title `Clients` · subtitle `1000+ projects delivered` · CTA `Our cases` · list = 42 client names in `data/clients.ts` (888 Holdings … Wowcher)
- **Studio:** title `Lisenbart Production` · subtitle `In animation since 2006` · intro/body/highlights as in `site.studioModal`
- **Awards:** title `Unnecessary Things` · subtitle `15 awards · 45 selections · 8.0 on IMDb` · intro/body/highlights as in `site.awardsModal`
- **Team:** title `Global production network` · subtitle `Canada · Ukraine · Poland · Remote worldwide` · intro/body/highlights as in `site.teamModal`

All popovers: close `Close` · CTAs `Discuss a project` or `View film case` / `Our cases` as defined in `site.ts`.

---

### 3. ServicesSection (Production capabilities)

| Element | Text |
|---------|------|
| **H2** | `Production capabilities` |
| Support line | `Film, animation, game and AI content — scoped and delivered end to end.` |
| AI note | `AI-assisted production means faster iteration and broader creative range — always directed and supervised by our team.` |

**Capability cards** (`data/capabilities.ts` — all render on homepage):

#### Commercial
- **Title:** `Commercial`
- **Image alt:** `` (empty string in `CapabilityCard`)
- **Link:** `Our cases →` → `/work/commercial`
- **Description:** `Brand films, commercials and product visuals — from concept through final delivery.`
- **Format tags:** `TV & digital ads` · `brand films` · `product animation` · `explainer videos`

#### Gaming
- **Title:** `Gaming`
- **Link:** `Our cases →` → `/work/gaming`
- **Description:** `Trailers, cinematics and in-game animation — built for the pace and scale of game production.`
- **Format tags:** `playable ads` · `marketing video` · `game trailers` · `CGI cinematics`

#### Film & Entertainment
- **Title:** `Film & Entertainment`
- **Link:** `Our cases →` → `/work/film`
- **Description:** `Animated series, short films and feature development — across 2D, 3D and mixed media.`
- **Format tags:** `animated series` · `short films` · `co-productions` · `festival projects`

#### Social Media
- **Title:** `Social Media`
- **Link:** `Our cases →` → `/work/social`
- **Description:** `YouTube channels and social content — animated songs, stories and learning series for young audiences.`
- **Format tags:** `social content` · `event visuals` · `motion design` · `reels & shorts`

> **Note:** Pershosvit and Scoopy Cap are **not** on the homepage Social card. They appear as case studies on `/work/social` in `data/work.ts` (Scoopy Cap channel, Pershosvit · Kapitan Świetlik).

**In-section CTA block:**

| Element | Text |
|---------|------|
| **H3** | `Have a project in mind?` |
| Body | `Send your brief, references or even an early idea. A producer will review your brief and propose the most effective approach.` |
| Button | `Discuss a project` → `#contact` |
| Secondary link | `Email Directly` → `mailto:info@lisenbart.com` |

---

### 4. EndToEndProductionSection

| Element | Text |
|---------|------|
| **H2** 🔒 | `The right team. ` **`End to end`** `.` |
| Lead 🔒 | `From brief to screen — animation, film and AI content, produced end to end.` |
| Process aria | `From brief to final delivery` |

**Steps:**

| # | Title | Body |
|---|-------|------|
| 01 | `Brief` | `We align on goals, references and deliverables.` |
| 02 | `Proposal` | `We shape the approach, timeline and production estimate.` |
| 03 | `Production` | `We manage the full process and deliver final assets ready to launch.` |

---

### 5. BeyondTheToolSection

| Element | Text |
|---------|------|
| **H2** | `Anyone can learn AI. Not everyone can turn it into a product that works.` |
| Body | `AI accelerates execution — but it does not replace brand understanding, dramaturgy, taste, or the final call. That always stays human. We use AI where it saves time and expands range; we bring experience where the work has to land.` |

*(Eyebrow `Beyond the tool` exists in `site.beyondTheTool.eyebrow` but is **not rendered** in current component.)*

---

### 6. HowWeWorkSection

| Element | Text |
|---------|------|
| **H2** | `Two ways to work with us.` |

**Model 01 — Project**

| Field | Text |
|-------|------|
| Badge | `Model 01` |
| Name | `Project` |
| Chips | `One-time` · `Fixed scope` · `Producer-led` |
| Summary | `One campaign, trailer, or film — scoped, produced, and delivered end to end.` |

**Model 02 — Embedded team**

| Field | Text |
|-------|------|
| Badge | `Model 02` |
| Name | `Embedded team` |
| Chips | `Monthly retainer` · `Embedded team` · `Scales with you` |
| Summary | `Ongoing production capacity that works like your own in-house studio — remotely, without the overhead of building one.` |

---

### 7. FounderQuoteSection

| Element | Text |
|---------|------|
| Quote | `The AI era — guided by a professional eye.` |
| Author | `— Dmytro Lisenbart` |

---

### 8. TestimonialsSection → TestimonialsBlock

| Element | Text |
|---------|------|
| **H3** | `What clients say` |
| Add button aria | `Leave a review` |

**Carousel items** (`data/testimonials.ts` — only `confirmed: true` is sharp; others blurred):

| Company | Quote | Name | Confirmed |
|---------|-------|------|-----------|
| Playtika | `A reliable production partner for over 6 years. We keep coming back — and we're never disappointed.` | Lena Feldman | ✅ |
| Plarium | `Fast, reliable, and always on brief — even when timelines shift.` | Maya Cohen | ❌ |
| Moon Active | `Clear communication from kickoff to final delivery.` | David Weiss | ❌ |
| Product Madness | `Consistent quality across every campaign we run together.` | Rachel Ortiz | ❌ |
| Voodoo | `They handle complexity so we can focus on launch.` | Antoine Dubois | ❌ |
| HelloFresh | `Smooth production, strong creative, zero drama.` | Tom Becker | ❌ |
| Samsung | `Flexible team, sharp execution — a real partner.` | Jin Park | ❌ |
| McDonald's | `Our go-to studio for animation under tight deadlines.` | Sarah Mitchell | ❌ |
| Nestlé | `Trusted for years — they always deliver on time.` | Elena Rossi | ❌ |
| MasterCard | `One point of contact, end-to-end — exactly what we need.` | James Carter | ❌ |

**Submit modal** (`site.testimonialsBlock.submitModal`): title `Leave a review` · subtitle `Sent for moderation before publishing` · fields `Your review`, `Your name`, `Company`, `Rating`, `No rating` · submit `Send review` / `Sending...` · success `Review submitted and will be added as soon as possible.`

**Dots aria:** `Testimonial slides` · `Slide N of 10`

---

### 9. ContactForm

| Element | Text |
|---------|------|
| **H2** | `Contact` |
| Subhead | `Tell us about your project — you'll hear back within 24 hours.` |
| Email label | `Email` * |
| Name label | `Name` optional |
| Project type label | `Project type` optional |
| Select placeholder | `Select type` |
| Project types | `Campaign & Brand Film` · `Game Trailer or Cinematic` · `Animation & Motion` · `AI-Assisted Production` · `Other` |
| AI helper (if AI type selected) | `We use AI as a production tool, not a replacement for craft.` |
| Message label | `Message` optional |
| Message placeholder | `Brief, timeline, references...` |
| Submit | `Send message` / `Sending...` |
| Success | `Thank you. We've received your message and you'll hear back shortly.` · `Send another message` |
| Validation | `Email is required` · `Enter a valid email` |

---

### Footer (`Footer.tsx`)

| Element | Text |
|---------|------|
| Tagline | `Commercial · film` / `Gaming · social` |
| One-liner (md+) 🔒 | `From brief to screen — animation, film and AI content, produced end to end.` |
| CTA | `Discuss a project` |
| Nav | `Services` · `Experience` · `Contact` · `Work` |
| Connect | `Email` · `WhatsApp` · `LinkedIn` · `Facebook` · `YouTube` |
| Locations | `Ukraine · Canada · Poland · Remote worldwide` |
| Copyright | `© {year} LISENBART` |

---

### MobileEstimateCTA (mobile only, after scrolling past intro)

| Element | Text |
|---------|------|
| Button | `Discuss a project` → `#contact` |

---

## 6. Key files map

| Area | Files |
|------|--------|
| Page order | `src/pages/HomePage.tsx` |
| Copy hub | `src/data/site.ts` |
| Capabilities | `src/data/capabilities.ts`, `ServicesSection.tsx`, `CapabilityCard.tsx` |
| Hero | `HeroSection.tsx`, `HeroShowreel.tsx` |
| Experience | `AboutSection.tsx`, `*Popover.tsx`, `data/clients.ts` |
| End to end | `EndToEndProductionSection.tsx` |
| Beyond / How we work | `BeyondTheToolSection.tsx`, `HowWeWorkSection.tsx` |
| Testimonials | `TestimonialsSection.tsx`, `TestimonialsBlock.tsx`, `data/testimonials.ts` |
| Styles | `src/styles/index.css`, `theme-light.css` |
| SEO | `components/SEO.tsx`, `index.html` |

---

## 7. Git status (local, 2026-07-15)

**Branch:** `main...origin/main` (ahead with uncommitted work)

**Modified:**
- `site/src/components/AboutSection.tsx`
- `site/src/components/HeroSection.tsx`
- `site/src/components/HeroShowreel.tsx`
- `site/src/components/SEO.tsx`
- `site/src/data/site.ts`
- `site/src/pages/HomePage.tsx`
- `site/src/styles/index.css`
- `site/src/styles/theme-light.css`

**New (untracked):**
- `docs/claude_handoff_latest_changes.md`
- `docs/claude_handoff_site_audit.md` (this file)
- `site/src/components/BeyondTheToolSection.tsx`
- `site/src/components/EndToEndProductionSection.tsx`
- `site/src/components/HowWeWorkSection.tsx`
- `site/src/components/TestimonialsSection.tsx`

**Not committed / not pushed.** Live production still at `2c86345` until user deploys.

---

## 8. Suggested audit focus for Claude

1. **Hero split card** — copy size, mobile order (reel → text), CTA centrering vs headline alignment
2. **Narrative flow** — Experience before Capabilities before End-to-end promise — intentional?
3. **AboutSection personal copy** — user may want removed (flagged not done)
4. **Beyond the tool** — no eyebrow rendered; standalone vs merged with How we work
5. **Social capability card** vs `/work/social` cases (Pershosvit, Scoopy Cap) — cross-link gap?
6. **Protected strings** 🔒 — any audit copy must preserve exact wording
7. **Deploy** — large local diff not on lisenbart.com yet

---

## Conventions

- Minimal diffs; match ios-card / cyan-emerald patterns
- Do not commit/push/deploy unless user asks
- English for site copy; Ukrainian for user chat

---

*End of audit handoff — supersede `claude_handoff_latest_changes.md` for homepage structure/copy; that file is partially outdated (Hero poster, section order).*
