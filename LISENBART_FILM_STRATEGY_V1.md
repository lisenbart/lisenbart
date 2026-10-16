# LISENBART FILM — Brand, Marketing & Site Strategy

**Version:** 1.0  
**Date:** 2026-10-16  
**Status:** Approved strategic direction; page-level copy and implementation require review.  
**Source:** Decisions made in the LISENBART FILM site-planning discussion.  
**Code:** `lisenbart/lisenbart`, draft branch `film-studio-home`. **Do not change production `main` without explicit approval.**

## 1. Business purpose

The website exists to achieve three connected objectives:

1. **Sell services** — generate qualified production enquiries from brands, advertising agencies, production companies and other studios.
2. **Find partners** — generate relevant enquiries regarding original films, IP, co-production, distribution and creative partnerships.
3. **Prove professionalism** — substantiate trust through verifiable work, process, experience, people and professional history. This supports the first two objectives rather than functioning as a standalone sales destination.

The site is **not** primarily a personal portfolio, an exhaustive studio archive, or a generic corporate brochure.

## 2. Brand architecture

- **LISENBART FILM** is the lead, client-facing animation studio brand: creative development, direction, animation production, original films and IP.
- **Client Work** and **Originals** are the two primary activity areas.
- **Specialized Divisions:** **GAMES** (established, approved specialist website at https://lisenbart.games) and **AI** (currently a capability / developing specialist direction; AI and hybrid production). Represent them together in a compact section but do not pretend both have the same organizational maturity.
- **GLOWL** is excluded from the FILM site for now. After FILM is completed and published, reconsider and restructure glowl.direct within the approved brand system.
- **Dmytro Lisenbart** is the founder, a source of experience and creative leadership, **not** the hero or repeated sales argument of the FILM site. The personal page stays accessible at `/about/` but is absent from the main navigation and Home content. On **Studio**, a single restrained reference/link to the founder may appear in historical context. In **Originals**, cite the relevant author/director only when accurate to the individual project.

## 3. Audience and conversion

| Audience | Need | Destination / action |
|---|---|---|
| Advertising agency producer | Reliable capacity and clear delivery | Client Work → send brief |
| Creative director / brand team | Creative concept, direction, production | Client Work → discuss project |
| Production company / partner studio | Flexible outsourced stages or full execution | Client Work / Studio → discuss production |
| Film co-producer, distributor or IP partner | Project status, materials, rights/opportunity | Originals → project-specific partnership enquiry |
| Game marketing / UA team | Game ad creatives and playable ads | GAMES → lisenbart.games |
| AI-content buyer | AI/hybrid visual production | AI → relevant Client Work evidence and enquiry |

**Fast start:** Visitors with a ready brief can immediately contact the studio; others can go directly to the relevant service/project evidence. Avoid forcing a large homepage showreel or long introductory reading.

## 4. Site map

**Main navigation:** `Client Work · Originals · Studio · Contact` (brand logo leads Home).  
**Pages:** `/`, `/client-work/`, `/originals/`, `/studio/` (new), `/about/` (preserved personal page, unlisted from main navigation).  
**Contact:** shared functional enquiry component, reached by menu/CTA; no mandatory new `/contact/` page.  
**Legacy redirects and SEO:** preserve existing routes/canonicals and avoid breaking inbound links.

## 5. Home — minimal conversion-oriented hub

Only four substantive sections, in this order:

1. **Hero:** identity, positioning, clear short benefit, direct `Discuss a Project` CTA. Studio history facts may be brief if verified. **No personalized founder promo or biography on Home.** Brand line `Endless stories. Different worlds. One language.` is a retained approved brand expression; pair it with explicit category/service information. Avoid redundant claims.
2. **What We Do:** two primary paths, **Client Work** and **Originals**, with a precise one-line value proposition and obvious link for each.
3. **Specialized Divisions:** immediately below What We Do, two compact paths: **GAMES** to approved external site, **AI** to relevant existing Client Work proof (`/client-work/#ai-powered-reel`, validate anchor). No GLOWL link.
4. **Contact:** immediate enquiry form/fast route, minimal friction.

**Do not put on Home:** full showreel, Selected Clients strip, Why LISENBART, duplicate proof/biography, service catalogue, extensive process explanation, generic claims or extra sections. Evidence belongs on the appropriate destination pages.

## 6. Client Work — primary sales destination

**Goal:** convert a producer, agency or brand manager into a qualified enquiry.

Information requirements, not mandatory separate sections:

1. **Commercial proposition:** whom we work for, what we produce, and why engaging the studio is useful. Not a generic list of media techniques.
2. **Buying/engagement models:** buyer can bring a brief and existing assets; procure a specific production stage, creative/direction, or end-to-end production. Examples: `Production Partner`, `Creative & Direction`, `Full Production`. These are explanatory pathways, **not invented fixed-price packages**.
3. **Proof:** actual advertising/showreel(s), appropriate work examples and **Selected Clients** here (not on Home). Use only genuine supported credits; no fabricated outcomes or numbers.
4. **Production confidence:** concise factual explanation of scope, ownership, communication, workflow, timelines and integration into a client's existing pipeline; do not promise unverifiable turnaround or capacity.
5. **Conversion:** direct `Send a Brief` or `Discuss a Project` action linked to a context-aware enquiry.

AI and hybrid reel can remain as a supplementary production capability; commercial work leads. GAMES bridge is acceptable as a small contextual route, not a duplicated homepage grid.

## 7. Originals — partnership destination

**Goal:** make specific IP partnership opportunities understandable, not merely show an archive.

Retain existing film/IP projects and their assets: **Unnecessary Things**, **The Last Kozak**, **Pershosvit**, **Scoopy Cap**. For each relevant project, communicate accurate format/genre, status, available materials and—**only when confirmed**—what partnership is being sought. Do not imply financing, rights availability, distribution or open co-production without approval. Use relevant project-specific `Discuss Partnership` enquiry; user should know which project the message concerns.

## 8. Studio — trust in the company

New `/studio/` page. **About the studio and its working capacity, not a rebranded founder biography.** Answer: who the studio is; actual team/production model; expertise; how it works with clients; verified history and credits; who is accountable. Distinguish company history since **2006** from the founder's longer individual experience. Never fabricate permanent headcount, offices, geographic presence or scale. Include **one** brief contextual mention of founder Dmytro Lisenbart, with optional link to `/about/`. A focused cooperation CTA should end the page.

## 9. Personal About page — background, not site focus

Preserve existing `/about/`, professional personal narrative, portrait and IMDb as justified. Remove from main navigation. It may be reached contextually from Studio, and from individual project credits where accurate. Avoid repeated links and repeated founder mentions across Home and Client Work. Do not redirect `/about/` to `/studio/` or break the existing URL.

## 10. Conversion and contact logic

A single working contact component can serve multiple contexts, without forcing visitors through long forms. Preserve backend/Netlify integration, validation and anti-spam functionality. Consider source-sensitive prefills:

- `Send a Brief` / commercial → business enquiry / relevant project category.
- AI → AI Production.
- Originals project CTA → Originals Partnership plus relevant project name/subject, without inventing user-entered details.
- Studio → general commercial/partnership enquiry.

Audit link destinations, deep-link anchors and submission states in real preview. Do not pretend the contact form was tested without running it.

## 11. Copy strategy (not final approved text)

**Tone:** contemporary, direct, senior, production-literate, precise. Minimal text with high informational density. English for public-facing copy. Avoid claims of 'world class', generic 'bringing ideas to life', unverifiable ROI, fabricated capacity, blanket AI speed/cost advantages.

**Core commercial proposition — draft, not final copy:** an independent animation studio providing creative development, direction and production, from work on existing briefs/assets to full delivery.

**Brand expression (retained):** `Endless stories. Different worlds. One language.`

Copy must express three layers: (1) buyer task / value; (2) actual offer and engagement model; (3) proof and next action. Do not repeat company facts across pages without purpose.

## 12. Implementation stages and gates

**Gate 1 — Strategy (this document):** confirmed business goals, audiences, brand roles, page jobs and content allocation.

**Gate 2 — Information architecture and copy:** prepare complete page-specific English copy and CTA/link matrix, identify verification requirements, and resolve any unknown business claims. Seek approval before implementation where copy introduces new promises.

**Gate 3 — Cursor implementation on draft branch:** exact content/navigation and functional routing only; minimal necessary styles; preserve functionality, assets and production safety. Validate build, routes and contact behavior. No deploy or merge.

**Gate 4 — Figma design:** visual system and section composition **after** strategy, structure and copy are accepted. No premature layout polishing by Cursor.

**Gate 5 — Prelaunch verification and publication:** only after explicit approval; check mobile/desktop, metadata, SEO/canonical, form delivery, redirects, analytics and brand consistency.

## 13. Immediate corrections identified in current draft

- Remove `CompactStudioProofSection` from Home entirely: it duplicates generic studio positioning and repeats Selected Clients already present on Client Work.
- Home render should be `StudioHeroSection → StudioDirectionsSection → SpecializedDivisionsSection → ContactForm` (four substantive sections).
- Main navigation should support `Client Work · Originals · Studio · Contact` and exclude personal `/about/`.
- Add `/studio/` without overwriting `/about/`; keep personal page contextual.
- Review Client Work around engagement models, proof and qualified enquiries; review Originals around genuine project-specific partnership opportunities.
- Treat all public-facing copy beyond approved brand expression as reviewable; DO NOT invent unsupported client/partner claims.

## 14. Guardrails

- GitHub repo `lisenbart/lisenbart`, draft branch `film-studio-home` only.
- Never edit/merge/deploy production `main` without explicit authorization.
- Do not touch `lisenbart.games` or `glowl.direct`.
- Preserve portfolio/reel assets, current Originals, deep links and existing component functionality.
- No premature Figma/design work, no extra homepage marketing blocks, no arbitrary restructuring for visual neatness.
- If the relationship of a project, credit, offer or partner opportunity is not verified, flag it for approval rather than claim it.

## 15. Success criteria

A qualified visitor can quickly determine (a) what they can commission, (b) how to start, (c) why to trust the team, or (d) which original project might fit a partnership. Home stays short. Professional proof sits with relevant offers. Founder identity supports Studio only where meaningful. The site behaves as one coherent selling and partnership system.
