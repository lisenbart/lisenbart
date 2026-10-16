# LISENBART FILM — Marketing & Copy Specification V1

**Status:** PROPOSED copy for owner review (Gate 2).  
**Strategy source:** `LISENBART_FILM_STRATEGY_V1.md` (approved).  
**Branch:** `film-studio-home`  
**Date:** 2026-10-17  

**Legend**

- **APPROVED** — locked by strategy / existing brand expression / already live verified claim.
- **PROPOSED** — draft English copy; do not treat as owner-signed until reviewed.
- **NEEDS OWNER** — business fact missing or ambiguous; do not publish as a claim.

---

## 1. Commercial audit (current draft)

| Page | Target visitor | Objective | Current proposition | Evidence today | Gaps / objections | Desired conversion | Issues |
|---|---|---|---|---|---|---|---|
| Home | First-time agency/brand/producer + partner scout | Route fast | Brand line + studio lead + directions | Since 2006, 1,000+ projects (site claim) | Founder promo on Home; proof strip duplicated Client Work | Discuss project / pick Client Work or Originals | Compact proof + founder link on Home conflict with strategy |
| Client Work | Agency producer, brand, production partner | Sell services | Creative development / direction / production + reels | Advertising reel `849899875`, AI reel `1212613379`, Selected Clients, capabilities strip | Engagement models not explicit; “how we work with your pipeline” light | Send a Brief | AI secondary OK; Games bridge OK; no wholesale rewrite until copy approved |
| Originals | Co-producer, distributor, IP partner | Partnerships | Films + IP catalogue | Project records in `work.ts` | Partnership ask per project mostly undocumented | Discuss Partnership (project-aware) | Do not invent rights/funding; see §5 |
| About | People researching founder | Background | Personal voice, career, IMDb | Portrait, bio, IMDb | Still in primary nav (strategy: remove) | Contextual only | Keep page; unlist from nav |
| Studio | Missing | Company trust | — | — | Page does not exist | Production / partnership enquiry | Add with verified facts only |
| Contact | All | Conversion | Shared `ContactForm` | Prefill events, Netlify/php path | Context labels uneven | Context-aware brief | Preserve mechanism |

**Duplicate / remove from Home (APPROVED by strategy §13)**

- Remove `CompactStudioProofSection` (Selected Clients + proof).
- Remove founder biography / “Founded by…” promo from Home hero.
- No showreel, no Why LISENBART, no service catalogue on Home.

---

## 2. Site architecture (APPROVED)

**Primary nav:** Client Work · Originals · Studio · Contact  
**Logo →** Home `/`  
**Pages:** `/`, `/client-work/`, `/originals/`, `/studio/` (new), `/about/` (personal, not in primary nav)  
**Contact:** `#contact` on current page via shared form — no new `/contact/` page.

---

## 3. CTA & link matrix (PROPOSED labels / APPROVED targets)

| Context | CTA label (PROPOSED) | Target | Prefill (PROPOSED) |
|---|---|---|---|
| Home hero | Discuss a Project (APPROVED existing) | `#contact` | none / commercial default |
| What We Do → Client Work | (panel) | `/client-work/` | — |
| What We Do → Originals | (panel) | `/originals/` | — |
| Divisions → Games | Visit Lisenbart Games | https://lisenbart.games | — |
| Divisions → AI | See AI work | `/client-work/#ai-powered-reel` | optional AI Production |
| Client Work contact | Send a Brief (PROPOSED; current “Have a Brief?”) | `#contact` | Brand Film or Campaign |
| Originals contact | Discuss a Partnership (PROPOSED) | `#contact` | Originals Partnership + project name when from card |
| Studio contact | Discuss a Project (PROPOSED) | `#contact` | general commercial / partnership |
| Studio → founder | About Dmytro Lisenbart | `/about/` | — |
| Header Contact | Contact | `#contact` via `goToContact()` | — |

---

## 4. Proposed English copy by page

### 4.1 Home — APPROVED structure + mixed copy

**Purpose:** Fast entry into commercial offer or partnership path.  
**Target:** First visit from agency / brand / partner.

| Element | Status | Copy |
|---|---|---|
| Brand | APPROVED | LISENBART FILM |
| H1 / brand statement | APPROVED | Endless stories. Different worlds. One language. |
| Lead | APPROVED (current) | Independent animation studio creating commercials, original films and story-driven content. From creative development and direction to complete production. |
| Proof chips | APPROVED existing claims | Since 2006 · 1,000+ projects delivered |
| Primary CTA | APPROVED | Discuss a Project → Contact |
| What We Do H2 | APPROVED pattern | What we do. |
| Client Work blurb | APPROVED (current) | Creative development, direction and animation production for brands, agencies and production partners. |
| Originals blurb | APPROVED (current) | Original animated films, stories and worlds developed from the first idea onward. |
| Specialized Divisions | APPROVED section | GAMES / AI compact cards (existing short descriptions OK) |
| Contact H2 | APPROVED | Tell us about the project. |

**Remove from Home:** founder line, Selected Clients, CompactStudioProofSection, Explore Our Work, showreel.

**SEO (PROPOSED refinement)**  
- Title: `LISENBART FILM — Independent Animation Studio` (current OK)  
- Description (PROPOSED): `Independent animation studio for commercials, original films and story-driven content. Creative development, direction and production.`

---

### 4.2 Client Work — PROPOSED (do not wholesale-implement until approved)

**Purpose:** Primary sales destination.  
**Target:** Agency producer, brand creative lead, production partner.

| Element | Status | Copy |
|---|---|---|
| Name | APPROVED current | CLIENT WORK |
| H1 lead | APPROVED current direction | From first concept to final frame. Creative development, direction and animation production for brands, agencies and production partners. |
| Engagement models H2 | PROPOSED | Ways to work with us |
| Production Partner | PROPOSED | Bring an existing brief, boards or assets. We execute selected animation and production stages inside your workflow. |
| Creative & Direction | PROPOSED | Concepts, scripts, visual development and direction — with or without full production. |
| Full Production | PROPOSED | End-to-end delivery from development through final frames, with one clear production lead. |
| Note | PROPOSED | Pathways, not fixed packages. |
| Proof | APPROVED assets | Advertising reel first; AI reel secondary; Selected Clients |
| Production confidence | PROPOSED | Scope and ownership agreed up front. Clear points of contact. We integrate with agency and in-house teams. Timelines depend on the brief — we confirm after review. |
| Contact H2 | PROPOSED | Send a Brief |
| Contact lead | PROPOSED | Share the brief, timeline and current materials. We’ll reply with the next step. |
| SEO title | PROPOSED | Client Work — Animation for Brands & Agencies \| LISENBART FILM |
| SEO description | PROPOSED | Commission creative development, direction and animation production. Full projects or selected stages. |

**Evidence used:** existing reels, preview frames, Selected Clients list, capabilities copy, Games bridge.  
**NEEDS OWNER:** any guaranteed turnaround, capacity, pricing, “always AI faster/cheaper” (forbidden).

---

### 4.3 Originals — PROPOSED partnership framing (project facts from `work.ts`)

**Purpose:** Partnership destination.  
**Page intro (PROPOSED):** Original films and story IP developed by the studio. For co-production, distribution, licensing or creative partnership, tell us which project you mean.

| Project | Format / type (from records) | Status (from records) | Evidence | Partnership opportunity | Enquiry |
|---|---|---|---|---|---|
| Unnecessary Things | Animated short · 14 min | Completed (2021); festival awards/selections documented | Vimeo, stills, IMDb, festival links | **NEEDS OWNER** — what is currently sought (sales, further festivals, rights)? | Discuss Partnership → mention Unnecessary Things |
| The Last Kozak | Animated feature · 80 min · In Development | Script, treatment, pitch complete; English teaser | Vimeo teaser | Record states “financing and co-production conversations” — **confirm** still accurate before stronger CTA | Discuss Partnership → The Last Kozak |
| Pershosvit | Original preschool IP · Ukrainian | Live multi-platform audience (metrics in record) | YouTube / TikTok / Instagram | Record positions further series/broadcast/education — **NEEDS OWNER** for exact ask | Discuss Partnership → Pershosvit |
| Scoopy Cap | Original preschool IP · English | Live multi-platform | Social links | Record: growth, distribution, licensing foundation — **NEEDS OWNER** for open deals | Discuss Partnership → Scoopy Cap |

**SEO (PROPOSED):** keep current originals SEO unless owner wants partnership emphasis.

**Do not publish** invented financing asks, rights availability, or open co-pro status beyond verified record language.

---

### 4.4 Studio — PROPOSED page copy (implementation uses only verified subset)

**Purpose:** Company credibility and working model.  
**Target:** Production partners and clients evaluating the studio as a company.

| Element | Status | Copy |
|---|---|---|
| H1 name | PROPOSED | STUDIO |
| Lead | PROPOSED | Independent animation studio. Creative development, direction and production for client commissions and original films. |
| Who we are | PROPOSED / grounded | LISENBART FILM has operated since 2006. We develop and produce animation for brands, agencies and production partners, and we develop original films and story IP. |
| Expertise | PROPOSED / grounded | Creative development, direction and animation production — as selected stages or complete delivery. |
| Working model | PROPOSED (no headcount) | One clear creative and production lead per project. We work from existing briefs and assets, or from early concept through delivery. Communication stays direct; scope is agreed before production expands. |
| Specialized | APPROVED structure | Game advertising via Lisenbart Games. AI & hybrid production as a directed capability within Client Work. |
| Founder (one mention) | APPROVED constraint | Founded by Dmytro Lisenbart, animation director and producer. → `/about/` |
| Clients | APPROVED list location | Selected Clients (reuse existing list; shown on Studio and/or Client Work — **not** Home) |
| CTA | PROPOSED | Discuss a Project |
| SEO title | PROPOSED | Studio — LISENBART FILM |
| SEO description | PROPOSED | Independent animation studio since 2006. Creative development, direction and production for brands, agencies and original films. |

**NEEDS OWNER:** permanent staff size, office claims, geographic “capacity”, awards lists beyond existing project records. Footer already shows `Ukraine · Canada · Poland` — do not expand into capacity claims without confirmation.

---

### 4.5 Personal About — retain (no wholesale rewrite)

**Purpose:** Founder background.  
**Nav:** not in primary navigation (APPROVED).  
**Copy:** keep personal voice; only fix factual errors if found.  
**Link from:** Studio (one contextual link).

---

## 5. Evidence inventory

| Evidence | Source | Where it may appear |
|---|---|---|
| Brand statement | Strategy + current Home | Home |
| Since 2006 | Strategy + site | Home, Studio |
| 1,000+ projects delivered | Existing site claim | Home (chips); avoid stacking elsewhere without need |
| Selected Clients list | `site.trustedBy` | Client Work (required by strategy); Studio optional for company proof |
| Advertising reel | Vimeo `849899875` | Client Work |
| AI reel | Vimeo `1212613379` | Client Work `#ai-powered-reel` |
| Originals projects | `site/src/data/work.ts` | Originals only |
| Founder / IMDb | About + existing links | About; one Studio mention |

---

## 6. Claims requiring verification (NEEDS OWNER)

1. Exact partnership ask for Unnecessary Things (rights, sales, festivals?).  
2. Whether The Last Kozak is still open for financing / co-production as stated.  
3. Commercial terms sought for Pershosvit and Scoopy Cap (licensing, distribution, brand partners?).  
4. Whether “1,000+ projects delivered” remains the preferred public metric.  
5. Any production turnaround, team size, or capacity wording.  
6. Preferred Contact CTA labels: “Send a Brief” vs current “Have a Brief?”.  
7. Whether Selected Clients should appear on Studio as well as Client Work (strategy allows company credits on Studio; Home forbidden).

---

## 7. Implementation gate (this sprint)

### Implement now (structural / APPROVED)

- Home: four sections only; remove CompactStudioProofSection; remove founder promo from Home.  
- Nav: Client Work · Originals · Studio · Contact; About out of primary nav.  
- New `/studio/` with **verified-only** factual copy (conservative subset of §4.4).  
- Preserve `/about/`, reels, project data, forms, Client Work Selected Clients.  
- Footer: Studio instead of About in Navigate; Games external retained.

### Propose only (wait for owner review of this document)

- Full Client Work engagement-model rewrite.  
- Originals partnership CTAs per project with invented asks.  
- SEO description refinements beyond current.  
- Contact heading renames (“Send a Brief”) if owner prefers.

---

## 8. Separation summary

| Item | APPROVED strategic decision | PROPOSED copy |
|---|---|---|
| Four-section Home | Yes | Brand line already approved; lead kept |
| No Home clients / reel / Why / founder promo | Yes | — |
| Nav includes Studio, excludes About | Yes | — |
| `/studio/` exists | Yes | Studio body text proposed; implement conservative verified subset |
| Client Work engagement models | Intent approved | Exact wording proposed — not auto-published |
| Originals partnership CTAs | Intent approved | Project-specific asks need owner |

---

*End of Marketing Copy V1. Owner review unlocks Gate 3 editorial rewrites.*
