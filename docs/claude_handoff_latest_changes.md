# LISENBART — handoff for Claude (homepage refactor session)

**Updated:** 2026-07-15  
**Live site:** https://lisenbart.com  
**Repo:** `git@github.com:lisenbart/lisenbart.git` · branch `main`  
**Working tree:** uncommitted local changes (see § Git status below)

---

## Purpose of this document

Handoff for the **next analysis and refinement pass** on the marketing homepage. Describes what changed in the Jul 15 session, current section order, copy sources, design references, constraints, and suggested review areas.

**User language:** Ukrainian in chat; **all site copy in English**.

---

## Project layout

```
Lisenbart Film/
├── docs/          ← strategy briefs + this handoff
└── site/          ← Vite + React app (Netlify publish dir: site/dist)
```

---

## Stack & deploy

| Item | Value |
|------|--------|
| Stack | React 18, TypeScript, Vite 6, Tailwind 4, Framer Motion |
| Hosting | Netlify — base **`site/`**, publish **`dist/`** |
| Build | `cd site && npm install && npm run build` |
| Dev | `cd site && npm run dev` → http://localhost:5173 |
| Functions | Netlify Functions + Blobs for testimonial moderation |

**Do not commit/push/deploy** unless the user explicitly asks.

---

## Current homepage section order

```
1. HeroSection              — showreel video only (no standalone intro text)
2. EndToEndProductionSection — hero headline + subline + 3-step process (merged)
3. AboutSection             — Experience stats (1000+, awards, 20 years, team)
4. FounderQuoteSection      — founder quote
5. ServicesSection          — Production capabilities
6. HowWeWorkSection         — Two ways to work + Beyond the tool copy below
7. TestimonialsSection      — client testimonials carousel
8. ContactForm              — contact
```

Source: `site/src/pages/HomePage.tsx`

---

## Session changes (2026-07-15)

### 1. Section spacing tightened

In `site/src/styles/index.css`:

| Token | Before | After |
|-------|--------|-------|
| `--section-spacing` | `clamp(4.5rem, 8vw, 7.5rem)` | `clamp(2.25rem, 4vw, 3.5rem)` |
| `--block-stack-gap` | `1rem` / `1.25rem` (md+) | `0.75rem` / `1rem` (md+) |

Applied via `pb-[var(--section-spacing)]` on sections and `.site-main-stack { gap: var(--block-stack-gap) }`.

### 2. Hero + End to End merged

**Before:** Showreel → separate centered intro (`The right team. End to end.` + paragraph) → End to End card with its own title/lead.

**After:**
- `HeroSection.tsx` — **only** showreel card
- `EndToEndProductionSection.tsx` — emerald `how-ios-card` containing:
  - **H1:** `The right team. End to end.` (from `site.hero`, emerald accent on “End to end”)
  - **Lead:** `From brief to screen — animation, film and AI content, produced end to end.`
  - **Process flow:** Brief → Proposal → Production (animated, GLOWL-inspired, compact)

Copy source: `site.hero` + `site.endToEndProduction.steps` (title/lead removed from `endToEndProduction` object).

### 3. Beyond the tool + How we work merged

**Before:** Two separate sections (`BeyondTheToolSection`, `TwoWaysToWorkSection`); briefly had interactive headline card + popover (like Experience stats).

**After:** Single `HowWeWorkSection.tsx` — **no outer ios-card**, **no popover**:

1. H2: `Two ways to work with us.`
2. Two model cards (TheyDirect-inspired):
   - **Model 01 / Project** — chips: One-time · Fixed scope · Producer-led
   - **Model 02 / Embedded team** — chips: Monthly retainer · Embedded team · Scales with you
3. Below cards (plain text block):
   - H3: `Anyone can learn AI. Not everyone can turn it into a product that works.`
   - Body: AI/human craft paragraph from `site.beyondTheTool.body`

Copy source: `site.workModels` + `site.beyondTheTool`.

**Deleted components:**
- `BeyondTheToolSection.tsx`
- `TwoWaysToWorkSection.tsx`
- `BeyondTheToolPopover.tsx`

### 4. Work model card badges

Badges (`Model 01`, `Model 02`) sit **above** card top edge (not clipped). CSS: `.work-model-card { overflow: visible }`, grid padding-top, badge `z-index: 2`.

### 5. Testimonials moved out of About

`TestimonialsBlock` extracted to `TestimonialsSection.tsx` wrapper; removed from `AboutSection.tsx`. **Content unchanged** (logos, quotes, carousel behaviour).

### 6. Design references used

| Reference | Location | What was borrowed |
|-----------|----------|-------------------|
| **TheyDirect** | GitHub `lisenbart/they-direct` — `PartnershipModels.tsx`, `productionModels.ts` | Two-card layout, model numbers, chip pills |
| **GLOWL** | Local `/Users/dmytrolisenbart/Desktop/Glowl` — `HowWeWorkSection.tsx` | End-to-end 3-step process flow (made more compact on Lisenbart) |

**Note:** `gh auth login` was **not** configured; TheyDirect was read via public GitHub API. Local `/Users/dmytrolisenbart/Desktop/TheyDirect` folder may be absent.

---

## Copy map (`site/src/data/site.ts`)

| Key | Used in | Content |
|-----|---------|---------|
| `hero.headlineLine2BeforeAccent` + `headlineAccent` | EndToEndProductionSection H1 | The right team. **End to end**. |
| `hero.paragraph` | EndToEndProductionSection lead | From brief to screen… |
| `endToEndProduction.steps` | Process flow cards | Brief / Proposal / Production |
| `workModels.title` | HowWeWorkSection H2 | Two ways to work with us. |
| `workModels.cards` | Two model cards | Project + Embedded team |
| `beyondTheTool.title` + `body` | Below model cards | AI positioning statement |
| `capabilitiesLine` | ServicesSection | unchanged |
| Experience stats | Hardcoded in `AboutSection.tsx` | 1000+, 15 awards / 45 selections / 8.0 IMDb, 20 years, global team |

---

## User constraints (do NOT change without explicit ask)

- Hero message text: **“The right team. End to end.”** and subline **“From brief to screen…”** — may move between sections but wording stays
- Experience stats block content and interactive popovers (clients, awards, studio, team)
- Client testimonials block — real logos/quotes; moderation flow
- No new pages, no “media products” section, no stack changes
- Minimal diffs; match existing ios-card / cyan-emerald design language

---

## Key files (homepage)

| Area | Files |
|------|--------|
| Page order | `src/pages/HomePage.tsx` |
| Hero showreel | `src/components/HeroSection.tsx`, `HeroShowreel.tsx` |
| End to end | `src/components/EndToEndProductionSection.tsx` |
| Experience | `src/components/AboutSection.tsx`, `*Popover.tsx` |
| Capabilities | `src/components/ServicesSection.tsx`, `CapabilityCard.tsx` |
| How we work | `src/components/HowWeWorkSection.tsx` |
| Testimonials | `src/components/TestimonialsSection.tsx`, `TestimonialsBlock.tsx` |
| Copy | `src/data/site.ts` |
| Styles | `src/styles/index.css`, `src/styles/theme-light.css` |

---

## CSS patterns to preserve

- `.how-ios-card`, `.how-ios-card-emerald`, `.how-ios-card-cyan` — section cards
- `.hero-headline`, `.accent-emerald` — hero typography inside End to End card
- `.work-model-card`, `.work-model-badge`, `.work-model-chips` — partnership cards
- `.how-work-beyond-*` — text block under model cards
- `.how-process`, `.end-to-end-process` — 3-step flow
- `.modal-panel`, popover classes — Experience / testimonials modals (must keep solid backgrounds)

Spacing tokens: `--section-spacing`, `--block-stack-gap`, `--page-padding`.

---

## Git status (as of 2026-07-15)

**Modified (uncommitted):**
- `site/src/components/AboutSection.tsx`
- `site/src/components/HeroSection.tsx`
- `site/src/data/site.ts`
- `site/src/pages/HomePage.tsx`
- `site/src/styles/index.css`
- `site/src/styles/theme-light.css`

**New (untracked):**
- `site/src/components/EndToEndProductionSection.tsx`
- `site/src/components/HowWeWorkSection.tsx`
- `site/src/components/TestimonialsSection.tsx`
- `docs/claude_handoff_latest_changes.md` (this file)

**Last pushed commit:** `2c86345` — Fix work category routes resolving to the homepage layout.

Build verified locally: `npm run build` ✓

---

## Suggested next steps for Claude (analysis & refinement)

### A. Content & narrative flow
1. Read homepage top-to-bottom — does the story arc work?
   - Showreel → promise (End to end) → proof (Experience) → capabilities → partnership models → AI stance → social proof → contact
2. Check for **redundancy**: hero subline vs capabilities line vs end-to-end steps — tighten if repetitive.
3. Review `beyondTheTool` placement **below** partnership cards — intentional inversion (models first, philosophy second). Confirm with user intent or propose moving above cards.

### B. Visual polish
1. **End to End card:** hero H1 inside emerald card — verify scale/balance on mobile (left-aligned) vs desktop (centered).
2. **HowWeWorkSection:** no ios-card wrapper — compare visual weight vs neighbouring sections; may need subtle separator or spacing tweak.
3. **Work model cards:** badge overflow, chip wrapping on narrow screens, embedded vs project accent colours (cyan / emerald).
4. **Process flow animation:** test `prefers-reduced-motion`; verify timing doesn’t distract on mobile.

### C. TheyDirect parity (optional)
- TheyDirect has expandable chips, gradient top bars, CTA buttons on cards, third “Ask us anything” card — **intentionally omitted** on Lisenbart.
- If user wants closer parity: compare live TheyDirect vs Lisenbart cards side by side.

### D. Technical / SEO
1. Single H1 on page — now inside `EndToEndProductionSection` (good). Confirm no duplicate H1 elsewhere.
2. `aria-label="Introduction"` on End to End section — still accurate?
3. Prerender output in `dist/index.html` — verify meta/structure after deploy.

### E. Existing backlog (from earlier handoffs)
1. OG image may still show legacy GLOWL branding
2. Work case studies in `work.ts` — placeholders
3. Testimonial moderation via Netlify Functions — working; some entries still mock/blurred
4. `gh auth login` — needed for CLI access to `lisenbart/they-direct`

### F. Light / dark theme
- Run through both themes: work model badges, end-to-end card, how-work-beyond text contrast (`theme-light.css` overrides).

---

## Local verification checklist

```bash
cd site
npm install
npm run dev
```

Check:
- [ ] Showreel plays; no duplicate hero text below video
- [ ] End to End: headline, subline, 3 steps animate
- [ ] Experience stats popovers (solid background)
- [ ] Capabilities grid
- [ ] Two ways cards + Beyond the tool text below
- [ ] Testimonials carousel + submit flow
- [ ] Light/dark theme toggle
- [ ] Mobile 375px width

```bash
npm run build
```

---

## Related docs in `docs/`

| File | Use |
|------|-----|
| `lisenbart_website_brief.md` | Original EN/PL/UA copy brief (partially superseded by current homepage) |
| `cursor_design_prompt.md` | Visual system tokens |
| `cursor_architecture_v1.md` | Architecture notes |
| `gpt_strategy_copy_brief.md` | Copy strategy |

**Rule:** Current **implemented** homepage structure in this file takes precedence over older brief section order.

---

## Conventions

- Minimal diffs; reuse existing components and CSS variables
- English for all user-facing copy
- Do not re-add deleted cruft (old Glowl sections, duplicate hero intro)
- After modal CSS edits, confirm `.modal-panel { background: var(--modal-bg) }` exists

---

*End of handoff — update this file when homepage structure or deploy state changes materially.*
