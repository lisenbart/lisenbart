# LISENBART FILM — Final Website Structure & Positioning

**Status:** Approved structure / positioning handoff — **awaiting Figma** before visual implementation.  
**Date:** 2026-10-19  
**Branch:** `film-studio-home`  
**Site:** `site/` · Production: `https://lisenbart.com` (do not deploy from this doc alone)  
**Layout concept reference (not production art):** `LISENBART_FILM_LAYOUT_CONCEPT_REF.jpg`  
**Related docs:** `LISENBART_FILM_STRATEGY_V1.md`, `LISENBART_FILM_EDITORIAL_COPY_V2.md`  

**Precedence:** Where this document conflicts with older strategy/editorial docs, **this structure takes precedence**.

---

## ROLE (implementation when Figma arrives)

Senior website architect, B2B creative-industry strategist, UX specialist and React/TypeScript developer.

Align the existing site with approved business positioning and final IA.

**Structural and content-alignment task — NOT a visual redesign.**  
Final art direction comes from Figma separately.

Do not invent a new visual identity, replace the design system, or add decorative elements from the concept collage.

---

## 1. PROJECT & SAFETY

Repository: `https://github.com/lisenbart/lisenbart`  
Working branch: `film-studio-home`  
App: `/site`

Before changing anything:

1. Inspect branch, architecture, routes, components, content data, docs.
2. Review strategy and editorial docs if present.
3. Compare implementation with the approved structure below.
4. Preserve what already matches.
5. Modify only what is necessary.

**Restrictions:**

- Do not merge into `main`.
- Do not deploy or change production.
- Do not change Netlify configuration.
- Do not modify LISENBART GAMES or GLOWL sites.
- Do not replace existing films, reels, project assets or client credentials.
- Do not introduce new visual design from the collage alone.
- Do not fabricate projects, clients, awards, team, offices or capabilities.

---

## 2. APPROVED BUSINESS POSITIONING

LISENBART FILM is an independent, **director-led creative production company** established in **2006**.

**Product:** an experienced creative and producing team that leads the creative process, organizes production and takes responsibility for the agreed result — not merely animation execution or post.

**Operating model:**

- Creative leadership
- Directing and storytelling
- Producing and production management
- Building appropriate production teams
- Coordinating internal capabilities and external specialists
- Creative supervision and quality control
- Delivery of the agreed result

Traditional animation, CGI, AI and hybrid workflows are **methods**, not the central value proposition.

### Central brand principle

**CREATIVE FREEDOM. PRODUCTION CONTROL.**

Unexpected creative results from a deliberate, professionally managed process.  
Sell imagination + execution discipline.  
Do not sell unpredictability or uncontrolled experimentation as a client benefit.

### Two commercial audiences (one site)

**A.** Advertising agencies and brands — creative development, directing, complete production.  
**B.** Independent production companies / partners — directing, animation expertise, specialist capabilities, collaborative execution.

One coherent studio identity. No twin websites or duplicated sales pitches.

---

## 3. WEBSITE CORE PRINCIPLE

**EMOTION → UNDERSTANDING → PROOF → TRUST → CONTACT**

Concise, confident, evidence-led. Minimum text. Maximum relevant proof.

Reference *communication principles* of Blinkink, Hornet, Giant Ant, BUCK — not visual imitation.

Avoid: agency brochure, long service lists, repeated promises, founder portfolio-as-home, AI-company homepage, showreel-only landing.

Every section has one purpose. Remove duplication.

---

## 4. GLOBAL INFORMATION ARCHITECTURE

| Destination | Path |
|---|---|
| HOME | `/` |
| CLIENT WORK | `/client-work/` |
| ORIGINALS | `/originals/` |
| STUDIO | `/studio/` |

CONTACT accessible from main nav (existing route/anchor). Logo → Home.

Preserve `/about/` — **not** in primary nav or on Home; contextual from Studio only.

Keep routes, deep links, integrations intact.

**Nav labels (current code may still say Client Work · Originals · Studio · Contact):**  
Concept collage shows WORK · ORIGINALS · STUDIO · CONTACT — finalize label (“WORK” vs “CLIENT WORK”) with Figma / owner; do not rename routes without approval.

---

## 5. HOME — EMOTIONAL BRAND EXPERIENCE

Exactly **four** content sections:

### 01 — HERO

Memorable emotional first impression. Brand creative identity.  
No requirement for commercial reel, showreel, or competency list in hero.  
Hero independent of any fixed headline — slogans/visuals replaceable without rebuilding IA.  
No mandatory headline carousel.

Strategic principle: **Creative Freedom. Production Control.** (foundation; not necessarily final H1.)

### 02 — WHAT WE DO

Orient to two destinations:

- **CLIENT WORK** — commissioned creative production → `/client-work/`
- **ORIGINALS** — original films & IP → `/originals/`

Clear navigation, not long copy.

### 03 — SPECIALIZED DIVISIONS

Compact, secondary:

- **GAMES** — games advertising & playables → `https://www.lisenbart.games` (prefer www as specified here)
- **AI** — AI & hybrid → existing Client Work AI section (`#ai-powered-reel` if current)

GLOWL = associated capability inside LISENBART FILM model — **not** equal primary brand on Home. Visible labels: GAMES and AI only.

### 04 — CONTACT

Short invitation + clear contact action.

### Home exclusions

No large showreel, selected clients, service catalogue, workflow explanations, founder bio/portrait, Ways to Work, Why Us, or duplicated Studio/Client Work content.

---

## 6. CLIENT WORK — COMMERCIAL PROOF

Priority: actual work.

### Structure

1. **INTRODUCTION** — concise commercial offer (not manifesto).
2. **CREATIVE / DIRECTION / PRODUCTION** — three competence areas (not three products); no long tech task lists.
3. **SELECTED COMMERCIAL WORK** — central; preserve advertising/animation showreel; verified cases only; roles only when known (Creative Development / Direction / Producing / Animation Production).
4. **SELECTED CLIENTS** — verified list **here only** (not Home/Studio).
5. **AI & HYBRID PRODUCTION** — secondary; preserve AI reel; keep `#ai-powered-reel` if used; not an AI-company repositioning.
6. **GAMES** — compact secondary bridge → `https://www.lisenbart.games`; no third large showreel.
7. **SEND A BRIEF** — discuss / brief / bid / collaboration; simple.

**Do not place Ways to Work With Us on Client Work** — that belongs on Studio.

Lead with evidence; do not force long explanation before work.

---

## 7. ORIGINALS — FILMS & IP

1. **INTRODUCTION** — short authorship / development framing.
2. **UNNECESSARY THINGS** — completed short; **11 awards · 45 festival selections** (not 15); preserve media/facts.
3. **THE LAST KOZAK** — feature in development; no completed production or secured financing claims.
4. **PERSHOSVIT / SCOOPY CAP** — original children’s IP; not automatic licensing offers; no invented metrics/rights/availability.
5. **PARTNERSHIPS** — concise invitation (co-pro / development); no blanket “all IP for sale”.

Not a second commercial-services page.

---

## 8. STUDIO — TRUST & OPERATING MODEL

1. **WHO WE ARE** — independent creative production company since 2006.
2. **HOW WE WORK** — creative + producing leadership; team around the project; managed through delivery; supervision/QC; core leadership accountable without claiming they personally execute every task; no large permanent workforce claims; external specialists are normal, not a weakness.
3. **WAYS TO WORK WITH US**
   - **Production Partner** — join existing workflow; required capabilities.
   - **Creative & Direction** — concept, scripts, boards, visual/directorial expertise.
   - **Full Production** — lead creative, directing, coordinated production to delivery by agreed scope.  
   Integrate with How We Work; do not duplicate two consecutive essays. Flexibility of engagement, not three brands.
4. **PEOPLE & LEADERSHIP** — project-based teams; no invented headcount; brief founder mention + link to `/about/`; not a founder biography page.
5. **CONTACT** — concise collaborate CTA.

### Studio exclusions

No duplicated advertising showreel, client ticker, services catalogue, or heavy founder promo blocks.

---

## 9. CONTACT

Accessible from nav and page endings. Support agency, brand, production EP, and film/IP partner inquiries. Low friction.

Preserve working contact implementation.  
Do not invent phone/addresses.  
No extra mandatory fields.  
No CRM/scheduling/paid third-party without approval.

---

## 10. BRAND ARCHITECTURE

| Brand | Role |
|---|---|
| **LISENBART FILM** | Primary creative, producing, commercial brand |
| **GAMES** | Specialist games ads/playables · `https://www.lisenbart.games` |
| **AI / GLOWL** | AI & hybrid capabilities supporting FILM projects; no invented subsidiary/legal-group claims |

LISENBART FILM remains primary throughout.

---

## 11. CONTENT & EDITORIAL RULES

**Character on entry. Evidence in the work. Trust in Studio.**

Concise, professional, clear, confident English for international B2B creative production.

Avoid empty promises, dramatic corporate filler, repeated competence copy, AI hype, long tech lists, unsupported success guarantees, “we do absolutely anything”.

Separate:

1. Creative identity — emotion, surprise, storytelling  
2. Commercial evidence — work, credits, clients, experience  
3. Operational trust — producer-led workflow, supervision, accountability  

Editorial content must stay editable independently of structure and Figma visuals.

---

## 12. DESIGN HANDOFF — FIGMA LATER

Do **not** redesign from the collage or this doc alone.

When Figma arrives:

- Preserve functional styling until art direction lands.
- Keep components modular / responsive.
- Preserve assets.
- No speculative motion, placeholder hero imagery, or AI-generated fake portfolio.
- Structure must support visual update without another IA rebuild.

**Concept collage** (`LISENBART_FILM_LAYOUT_CONCEPT_REF.jpg`) is mood / Figma-process reference only — not a mandate to implement its copy, fake clients (Nike, Netflix, etc.), phone numbers, or hero teddy art into production code.

---

## 13. IMPLEMENTATION WORKFLOW (after Figma)

**A — Audit** · **B — Implement on `film-studio-home`** · **C — Validate** · **D — Report**

Prefer minimal targeted changes. No deploy.

---

## FINAL ACCEPTANCE CRITERIA

Communicate: **LISENBART FILM — DIRECTOR-LED CREATIVE PRODUCTION COMPANY.**

Journey: **EMOTION → UNDERSTANDING → PROOF → TRUST → CONTACT.**

| Page | Sections |
|---|---|
| **HOME** | Hero → What We Do → Specialized Divisions → Contact |
| **CLIENT WORK** | Introduction → Creative/Direction/Production → Selected Commercial Work → Selected Clients → AI & Hybrid → GAMES → Send a Brief |
| **ORIGINALS** | Introduction → Unnecessary Things → The Last Kozak → Pershosvit / Scoopy Cap → Partnerships |
| **STUDIO** | Who We Are → How We Work → Ways to Work With Us → People & Leadership → Contact |
| **CONTACT** | Low-friction professional inquiry |
| **`/about/`** | Available, secondary |

Smallest clear implementation that shows the business model, real work, and easy collaboration.

---

## PARKING LOT / NEXT

- [ ] Receive approved Figma file / nodes.
- [ ] Diff Figma vs current `film-studio-home` implementation.
- [ ] Align Games URL consistently (`lisenbart.games` vs `www.lisenbart.games`).
- [ ] Confirm nav label WORK vs CLIENT WORK.
- [ ] Implement structural deltas only; visual pass from Figma.
- [ ] Do not merge/deploy until owner approval.

**Saved 2026-10-19 — waiting on Figma.**
