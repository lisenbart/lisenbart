# LISENBART.COM — Website Brief
**New site. Full rebuild. B2B animation studio for Polish/European market.**
Version 1.2 | May 2026

---

## OVERVIEW

| Parameter | Value |
|---|---|
| Domain | lisenbart.com |
| Platform | Pure HTML/CSS/JS, deployed via Vercel |
| Languages | English (default) / Polish / Ukrainian |
| Target audience | Advertising agencies, game studios, brands & startups |
| Market focus | Poland + European Union |
| Tone | Professional, direct, confident — no fluff |
| Remove | Russian language, Kyiv address, Ukrainian phone numbers |
| Brand name | LISENBART (drop "Production") |

### Document set (brief + design prompt)

| File | Use it for |
|---|---|
| **`cursor_design_prompt.md`** | Visual system: dark-first layout, **video hero**, Inter scale, **accent / background tokens**, card grid, nav behavior, micro-interactions, performance budget, and the **v1.1 section structure** (About + stats, tag-style “What we do”, light contact band). |
| **This brief** | **EN / PL / UA copy**, **form fields & backend options**, **anchors** and `/work`, brand/legal removals, deployment notes, launch checklist. |

**Rule of thumb:** If something conflicts on **layout, colors, or hero treatment**, follow **`cursor_design_prompt.md`**. Keep this brief as the source for **translations and the contact form**; wire those strings into the DOM the design prompt describes (including short PL/UA strings for the **minimal hero overlay**).

**Known differences (reconcile when building)**

- **Hero:** Design prompt = full-viewport **muted reel**, minimal overlay (no big headline or hero CTAs in the first screen). Section 1 in this brief (headline / subline / two buttons) is still valid as **meta / SEO** or a **below-the-fold** line if you want that message on the page.
- **Tokens:** Production CSS variables are in the design prompt (`#0A0A0A`, `#F5F4F0`, accent `#FF4D00`). The “Design guidelines” subsection later in this file is **legacy** — prefer the design prompt unless you explicitly standardize on one palette.
- **Services / Why Lisenbart:** Design prompt folds story + credibility into **About + stats** and moves capabilities to a **single tag row**. You can still mine this brief’s two-column agency vs game **copy** for JSON or secondary UI if needed.
- **Nav / CTA labels:** Design prompt: `Work · About · Contact · [Let's talk →]`. This brief used `Services` and `Start a project`. Optional: add **Services** → `#services`; pick one CTA phrase for launch and mirror it in all languages.

---

## SITE ARCHITECTURE

### Pages
- `/` — Main landing page (one-page scroll with anchor nav)
- `/work` — Full portfolio page
- `404.html` — Custom not-found page. On Vercel the platform maps missing routes to this file automatically; a separate clean URL `/404` is **not required** unless you add an explicit rewrite for it.

### Navigation (sticky header)
```
[LISENBART logo]    Work | Services | About | Contact    [EN | PL | UA]    [Start a project →]
```

### Nav link destinations (no `/about` page)
Single-page anchors on `index.html`; **About** uses the «Why Lisenbart» block as the studio story.

| Link / CTA | Destination |
|---|---|
| Logo | `/` → scroll top |
| Work | `/work` |
| Services | `#services` |
| About | `#about` (Section 5 — Why Lisenbart) |
| Contact | `#contact` |
| Start a project (header) | `#contact` |
| Hero · See our work | `#selected-work` |

### Main page sections (in order)
Use these `id`s on section wrappers for anchors above.

1. Hero (`#top` optional; logo targets document top)
2. Selected Work — `#selected-work` (3–4 featured cases)
3. Services — `#services`
4. Clients — `#clients`
5. Why Lisenbart — `#about` (nav label «About»)
6. Contact — `#contact`

---

## SECTION 1 — HERO

### Content

**EN**
> Headline: `Animation for brands, agencies & games.`
> Subline: `Award-winning studio based in Warsaw. 30 years of experience. AI-accelerated production.`
> CTA buttons: `[Start a project]` `[See our work]`

**PL**
> Headline: `Animacja dla marek, agencji i studiów gier.`
> Subline: `Wielokrotnie nagradzane studio z siedzibą w Warszawie. 30 lat doświadczenia. Produkcja wspierana przez AI.`
> CTA buttons: `[Zacznijmy projekt]` `[Zobacz nasze prace]`

**UA**
> Headline: `Анімація для брендів, агентств та ігрових студій.`
> Subline: `Студія з нагородами, Варшава. 30 років досвіду. Виробництво з підтримкою AI.`
> CTA buttons: `[Розпочати проект]` `[Переглянути роботи]`

### Design notes
- Full viewport height
- Background: dark (near-black) with subtle motion — either muted video loop or animated gradient
- Headline in large display type, white
- CTA: primary button (white/accent) + ghost button

---

## SECTION 2 — SELECTED WORK

### Layout
3–4 featured cases in a grid. Each case card shows:
- Thumbnail / video preview (autoplay on hover, muted)
- Client or project name
- Category tag (e.g. "2D Animation · Game Cinematic")
- One-line description
- [View case →] link

### Cases to feature (update when client list received)

**Case 1:**
- Project: *Непотрібні речі / Unnecessary Things*
- Client: Sunship (international co-production)
- Category: Animation Film
- EN: `Award-winning animated short. 15 international awards.`
- PL: `Nagradzany film animowany. 15 nagród międzynarodowych.`
- UA: `Анімаційний фільм. 15 міжнародних нагород.`

**Case 2:**
- Client: Playtika / SuperPlay
- Category: Game Animation
- EN: `Animation and cinematics for mobile gaming industry leaders.`
- PL: `Animacja i przerywniki filmowe dla liderów gier mobilnych.`
- UA: `Анімація та кінематики для лідерів мобільних ігор.`

**Cases 3–4:** → To be added after Dmytro shares full client list.

### "See all work" CTA
- EN: `View all projects →`
- PL: `Zobacz wszystkie projekty →`
- UA: `Всі проекти →`

---

## SECTION 3 — SERVICES

### Layout
Two columns: left = for agencies, right = for game studios.
Below: techniques/methods row.

---

**Column A: For Advertising Agencies**

EN:
> We deliver animation that performs — on time, on brief, on budget.
> - Brand & product animation
> - Explainer videos
> - Motion graphics & social content
> - TV & digital commercials

PL:
> Animacja, która działa — na czas, zgodnie z briefem, w budżecie.
> - Animacja marki i produktu
> - Filmy wyjaśniające (explainer)
> - Motion graphics i treści social media
> - Reklamy TV i digital

UA:
> Анімація, яка працює — вчасно, по брифу, у бюджеті.
> - Брендова та продуктова анімація
> - Explainer-відео
> - Моушн-графіка та контент для соцмереж
> - ТВ та digital-реклама

---

**Column B: For Game Studios**

EN:
> We know games. We know what players feel. We deliver cinematics that elevate your IP.
> - Game trailers & cinematics
> - Character animation
> - In-game cutscenes
> - UI/UX animation

PL:
> Znamy gry. Wiemy, co czują gracze. Tworzymy przerywniki, które budują świat gry.
> - Trailery i przerywniki filmowe
> - Animacja postaci
> - Cutsceny w grze
> - Animacja UI/UX

UA:
> Ми розуміємо ігри. Знаємо, що відчувають гравці. Створюємо кінематики, що посилюють ваш IP.
> - Трейлери та кінематики
> - Анімація персонажів
> - Внутрішньоігрові катсцени
> - UI/UX анімація

---

**Techniques row (below both columns)**

EN: `2D Frame-by-frame · 3D Animation · Motion Design · Character Design · Stop Motion · Combined (Live Action + Animation)`
PL: `Animacja poklatkowa 2D · Animacja 3D · Motion design · Projektowanie postaci · Stop motion · Animacja łączona`
UA: `2D покадрова · 3D анімація · Моушн-дизайн · Дизайн персонажів · Стоп-моушн · Комбінована анімація`

---

## SECTION 4 — CLIENTS

### Layout
Clean logo wall, 2 rows, greyscale logos (color on hover).
No descriptions — logos speak for themselves.

### Current confirmed clients
- Playtika
- SuperPlay
- *(full list to be added by Dmytro)*

### Header text

EN: `Trusted by`
PL: `Zaufali nam`
UA: `Нам довіряють`

---

## SECTION 5 — WHY LISENBART

### Layout
4 blocks in a row (or 2×2 on mobile). Icon + headline + 1–2 sentences.

---

**Block 1: Experience**
Icon: clock / timeline
EN: `30+ years in animation. We've seen every challenge. We know what works.`
PL: `Ponad 30 lat w animacji. Znamy każde wyzwanie. Wiemy, co działa.`
UA: `30+ років в анімації. Ми бачили всі виклики. Знаємо, що працює.`

**Block 2: Awards**
Icon: award / star
EN: `15 international awards. Including best animated film recognition on global festival circuit.`
PL: `15 nagród międzynarodowych. W tym nagrody za najlepszy film animowany na światowych festiwalach.`
UA: `15 міжнародних нагород. Включно з визнанням найкращого анімаційного фільму на світових фестивалях.`

**Block 3: AI-accelerated production**
Icon: lightning bolt / AI
EN: `Human-directed. AI-accelerated. Every creative decision is made by people. AI helps us deliver faster without cutting quality.`
PL: `Kierowane przez ludzi. Wspierane przez AI. Każda decyzja kreatywna należy do nas. AI pomaga nam pracować szybciej bez utraty jakości.`
UA: `Людська режисура. AI-прискорення. Кожне творче рішення приймають люди. AI допомагає нам працювати швидше без втрати якості.`

**Block 4: Warsaw-based**
Icon: location pin
EN: `Based in Warsaw. Working across Europe. European timezone, Polish market understanding, international mindset.`
PL: `Siedziba w Warszawie. Realizujemy projekty w całej Europie. Europejska strefa czasowa, znajomość rynku polskiego, międzynarodowe podejście.`
UA: `Варшава. Проекти по всій Європі. Європейський часовий пояс, розуміння польського ринку, міжнародне мислення.`

---

## SECTION 6 — CONTACT

### Header text

EN: `Let's make something great.`
PL: `Stwórzmy coś wyjątkowego.`
UA: `Створімо щось варте уваги.`

### Subtext

EN: `Tell us about your project. We respond within 24 hours.`
PL: `Opowiedz nam o swoim projekcie. Odpowiadamy w ciągu 24 godzin.`
UA: `Розкажіть про свій проект. Відповідаємо протягом 24 годин.`

### Form fields (EN labels, translated via lang switcher)

- Name / Imię i nazwisko / Ім'я
- Company / Firma / Компанія
- Email
- **I need…** (dropdown) — options per language (same meaning, localized labels):

| EN | PL | UA |
|---|---|---|
| Brand animation | Animacja marki | Брендова анімація |
| Game cinematic | Kinematyka do gier | Ігрова кінематика |
| Explainer video | Film wyjaśniający | Explainer-відео |
| Motion graphics | Motion graphics | Моушн-графіка |
| Other | Inne | Інше |

- Dropdown field label: EN `I need…` / PL `Potrzebuję…` / UA `Мені потрібно…`
- Message / Wiadomość / Повідомлення
- [Send / Wyślij / Надіслати]

### Form submission (backend)

Pure static HTML cannot send email by itself. Pick **one**:

1. **Vercel Serverless Function** — e.g. `POST /api/contact` — validate payload, send mail via **Resend** / **SendGrid** / SMTP (secrets in Vercel env vars; never in client JS).
2. **Form backend SaaS** — **Formspree**, **Getform**, **Basin**, etc. — form `action`/`fetch` URL from dashboard; quickest if you avoid maintaining email API keys.

Requirements either way: success/error message for the user; basic spam honeypot or rate-limit if exposed publicly.

### Contact details

- Email: `info@lisenbart.com`
- Location: `Warsaw, Poland`
- (No phone number on site — email-first approach)

---

## FOOTER

```
LISENBART                          info@lisenbart.com
Animation Studio                   Warsaw, Poland

Work | Services | About            © 2026 Lisenbart Film
                                   EN | PL | UA
```

No social media links until profiles are built out properly.

---

## DESIGN GUIDELINES FOR CURSOR

**Authoritative tokens and layout (hero, dark-first, section order, motion):** use **`cursor_design_prompt.md`**. The bullets below are a shorter legacy summary; if anything disagrees with that file, the design prompt wins.

### Visual direction
- **Aesthetic:** Premium, minimal, editorial — think agency portfolio, not cartoon studio
- **Background (legacy note):** Design prompt uses near-black `#0A0A0A` for most of the page and **light `#F5F4F0` only on contact** (not a light “body” band across all sections).
- **Accent (legacy note):** Design prompt uses **`#FF4D00`** in three roles only (card hover / primary CTA / active nav). Older value `#E84B1A` here is superseded unless you standardize back.
- **Typography:**
  - Display/headlines: `Inter` (700, 900 weight) or `DM Sans` — both available on Google Fonts
  - Body: `Inter` (400, 500 weight)
  - Fallback: `system-ui, sans-serif`
- **Spacing:** Generous. Minimum 80px vertical padding between sections on desktop.
- **Borders/lines:** Minimal. 1px `#E0E0E0` dividers only where necessary.

### Animation & interaction
- Smooth scroll between sections
- Fade-in on scroll for content blocks (IntersectionObserver, no library needed)
- Portfolio thumbnails: video preview on hover (muted, autoplay)
- Language switcher: instant swap via JS, no page reload
- CTA button: subtle hover lift effect

### Language switcher
- Position: top-right in nav, always visible
- Format: `EN | PL | UA` — clicking switches all text on page
- Default: detect browser language, fallback to EN
- Store choice in `localStorage`
- Implementation: JSON files per language (`en.json`, `pl.json`, `ua.json`), swap via `data-i18n` attributes
- Note: BCP‑47 code for Ukrainian is often `uk`; file names **`ua.json`** stay as-is to match UI labels (`UA`), or rename to **`uk.json`** if you integrate `hreflang`/locale APIs — choose one convention and keep it everywhere.

### Responsive breakpoints
- Mobile: < 768px (single column, hamburger menu)
- Tablet: 768–1024px
- Desktop: > 1024px (full layout)

### File structure
```
www/
├── index.html
├── work.html
├── 404.html
├── css/
│   ├── style.css
│   └── responsive.css
├── js/
│   ├── main.js
│   └── lang.js
├── lang/
│   ├── en.json
│   ├── pl.json
│   └── ua.json
└── assets/
    ├── images/
    ├── videos/
    └── logos/
```

### Deployment
- Host on Vercel (free tier is sufficient)
- Connect to GitHub repo
- Custom domain: lisenbart.com → point to Vercel via DNS

---

## CURSOR PROMPT TO START

Use this prompt together with **`cursor_design_prompt.md`** (layout, hero video, palette, interactions). This brief supplies **copy (EN/PL/UA)** and **form spec**.

```
Build LISENBART.COM — see cursor_design_prompt.md for visual system:
- Dark-first (#0A0A0A), accent #FF4D00, Inter, sharp corners, portfolio-led UI
- Hero: full-viewport muted showreel, minimal overlay (no giant headline / hero CTAs in first screen)
- Sections in order: Video hero → Selected Work (#selected-work) → About + stats (#about) → Clients (#clients) → What we do tag row (#services) → Contact (#F5F4F0) (#contact)

Tech: Pure HTML5, CSS3 custom properties, vanilla JavaScript. No frameworks.

Pages (in `www/`): index.html (main) + work.html + 404.html.

Language switcher EN | PL | UA:
- /lang/en.json, pl.json, ua.json — data-i18n, localStorage, browser-lang fallback

Nav (align with design prompt; optionally add Services → #services per brief):
- Work → /work; About → #about; Contact → #contact; primary CTA e.g. "Let's talk →" → #contact
- Transparent → blurred nav after scroll per design prompt

Contact form: Vercel serverless + email API OR Formspree-class; success/error UX. Full field labels + dropdown options (all languages): lisenbart_website_brief.md.

All multilingual copy & business rules: lisenbart_website_brief.md

Responsive: mobile-first, hamburger. Smooth scroll + IntersectionObserver fades. Performance: targets in cursor_design_prompt.md.
No jQuery, no Bootstrap.
```

---

## WHAT'S MISSING (to complete before launch)

- [ ] Choose contact form backend (Vercel function + email vs Formspree-class) → env vars / dashboard keys
- [ ] **Hero showreel** (muted loop, MP4 + WebM, ≤15MB — see `cursor_design_prompt.md`) or temporary gradient fallback
- [ ] Full client list from Dmytro → populate clients section + portfolio page
- [ ] Portfolio visuals: thumbnails/video previews for each case
- [ ] Logo files for client section
- [ ] "Непотрібні речі" trailer/clip for hero case
- [ ] Dmytro's headshot (optional — for About section if added later)
- [ ] Polish translation review by native speaker before launch
- [ ] Domain DNS: point lisenbart.com to Vercel after deployment

---

*Document prepared: May 2026*
*Next step: Use **`cursor_design_prompt.md`** + this brief in Cursor; starter prompt is under “CURSOR PROMPT TO START” above.*
