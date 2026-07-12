# LISENBART.COM — Architecture Rebuild v1
Full site restructure. Four HTML pages + updated navigation + new lang keys.
All content is placeholders — real media, copy, and client logos added later.

---

## OVERVIEW — WHAT WE'RE BUILDING

Replace the current single-page structure with a four-page site:

| File | Status | Purpose |
|---|---|---|
| `index.html` | REBUILD | Hero showreel → three doors (Film / Games / IP) → About → Contact |
| `film.html` | NEW | Film & Brand Animation — cases, services, pricing |
| `games.html` | NEW | Mobile Game Cinematics — cases, services, pricing |
| `ip.html` | NEW | Original IP projects — for co-producers and B2B credibility |
| `work.html` | KEEP as-is | Full portfolio archive — no nav link, linked from film/games |
| `404.html` | KEEP as-is | — |

**Do not delete or break any existing CSS variables, font setup, or JS files.**
Extend — do not replace.

---

## NAVIGATION — ALL PAGES

All four pages share the same nav component. Copy it exactly on each page.

### Desktop nav layout

```
[ LISENBART  FILM  GAMES  IP ]————————[ About  Contact  Let's talk →  Lang ]
```

Logo and primary nav items (FILM, GAMES, IP) are grouped together on the LEFT.
Secondary items (About, Contact) and CTA button are grouped on the RIGHT.
Language select sits at the far right.

**Visual rules:**
- FILM, GAMES, IP: `font-weight: 600`, `letter-spacing: 0.06em`, `text-transform: uppercase`
- About, Contact: `font-weight: 400`, `color: var(--color-muted)`, no uppercase
- Active page: matching nav link gets `color: var(--color-accent)` + 2px bottom border in accent color
- On `index.html` no nav link is active — all three primary links are in "neutral" state
- CTA button `.btn-nav` — existing style, links to `index.html#contact`

### HTML structure for nav (use on ALL pages):

```html
<header class="site-header" id="site-header">
  <div class="site-header__inner">

    <div class="site-header__left">
      <a href="index.html" class="logo">LISENBART</a>
      <nav class="site-nav__primary" aria-label="Main">
        <a href="film.html" data-i18n="nav.film" data-nav="film">Film</a>
        <a href="games.html" data-i18n="nav.games" data-nav="games">Games</a>
        <a href="ip.html" data-i18n="nav.ip" data-nav="ip">IP</a>
      </nav>
    </div>

    <div class="site-header__right">
      <nav class="site-nav__secondary" aria-label="Secondary">
        <a href="index.html#about" data-i18n="nav.about">About</a>
        <a href="index.html#contact" data-i18n="nav.contact">Contact</a>
      </nav>
      <select class="lang-select" aria-label="Language">
        <option value="en">EN</option>
        <option value="pl">PL</option>
        <option value="ua">UA</option>
      </select>
      <a href="index.html#contact" class="btn-nav" data-i18n="nav.cta">Let's talk →</a>
      <button type="button" class="nav-toggle" aria-label="Open menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    </div>

  </div>
</header>
```

### Mobile nav (hamburger menu — use on ALL pages):

```html
<div class="mobile-nav" aria-hidden="true">
  <button type="button" class="mobile-nav__close" data-i18n="nav.close">Close</button>
  <div class="mobile-nav__primary">
    <a href="film.html" data-i18n="nav.film" data-nav="film">Film</a>
    <a href="games.html" data-i18n="nav.games" data-nav="games">Games</a>
    <a href="ip.html" data-i18n="nav.ip" data-nav="ip">IP</a>
  </div>
  <div class="mobile-nav__secondary">
    <a href="index.html#about" data-i18n="nav.about">About</a>
    <a href="index.html#contact" data-i18n="nav.contact">Contact</a>
  </div>
  <select class="lang-select lang-select--mobile" aria-label="Language">
    <option value="en">EN</option>
    <option value="pl">PL</option>
    <option value="ua">UA</option>
  </select>
</div>
```

**Mobile nav visual rules:**
- `.mobile-nav__primary` links: font-size 2.5rem, font-weight 700, uppercase — big, full-width
- `.mobile-nav__secondary` links: font-size 1rem, font-weight 400, muted color — smaller, below a separator
- Active page link gets accent color

### Active nav JS (update in main.js):

Replace the current active-link detection with:
```javascript
const path = window.location.pathname;
document.querySelectorAll('[data-nav]').forEach((link) => {
  const nav = link.getAttribute('data-nav');
  const isActive =
    (nav === 'film'  && path.includes('film'))  ||
    (nav === 'games' && path.includes('games')) ||
    (nav === 'ip'    && path.includes('ip'));
  link.classList.toggle('is-active', isActive);
});
```

---

## PAGE: index.html — REBUILD

Keep: existing CSS/JS links, existing footer, existing contact section.
Remove: current work cards grid, current services section, current pricing section.
These move to film.html and games.html.

### New section order:
1. `<header>` — nav (new, as above)
2. `#hero` — existing video hero (keep exactly, no changes)
3. `#doors` — NEW: three equal cards Film / Games / IP
4. `#about` — keep existing about section with stats
5. `#contact` — keep existing contact section
6. `<footer>` — keep existing footer

### #doors section HTML:

```html
<section id="doors" class="doors section">
  <div class="doors__grid">

    <a href="film.html" class="door-card reveal" data-door="film">
      <div class="door-card__media">
        <div class="media-placeholder">PLACEHOLDER: Film cover — still or short loop (16:9, ≤3MB)</div>
      </div>
      <div class="door-card__body">
        <span class="door-card__label" data-i18n="doors.film.label">Film & Brand</span>
        <p class="door-card__desc" data-i18n="doors.film.desc">Animation for agencies, brands, and broadcasters.</p>
        <span class="door-card__cta" data-i18n="doors.film.cta">Enter →</span>
      </div>
    </a>

    <a href="games.html" class="door-card reveal" data-door="games">
      <div class="door-card__media">
        <div class="media-placeholder">PLACEHOLDER: Games cover — cinematic still or short loop (16:9, ≤3MB)</div>
      </div>
      <div class="door-card__body">
        <span class="door-card__label" data-i18n="doors.games.label">Mobile Games</span>
        <p class="door-card__desc" data-i18n="doors.games.desc">Cinematics and animation for mobile game studios.</p>
        <span class="door-card__cta" data-i18n="doors.games.cta">Enter →</span>
      </div>
    </a>

    <a href="ip.html" class="door-card reveal" data-door="ip">
      <div class="door-card__media">
        <div class="media-placeholder">PLACEHOLDER: IP cover — key art still or short loop (16:9, ≤3MB)</div>
      </div>
      <div class="door-card__body">
        <span class="door-card__label" data-i18n="doors.ip.label">Original IP</span>
        <p class="door-card__desc" data-i18n="doors.ip.desc">Original animated projects in development. Open to co-production.</p>
        <span class="door-card__cta" data-i18n="doors.ip.cta">Enter →</span>
      </div>
    </a>

  </div>
</section>
```

### #doors CSS:

```css
/* ── Doors section ─────────────────────────────────── */
.doors {
  padding: var(--section-pad) var(--side-pad);
}

.doors__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.door-card {
  display: block;
  text-decoration: none;
  color: var(--color-text);
  border: 1px solid var(--color-border);
  overflow: hidden;
  transition: border-color 0.3s ease;
  position: relative;
}

.door-card:hover {
  border-color: var(--color-accent);
}

.door-card__media {
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: #111;
}

.door-card__media .media-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: rgba(255,255,255,0.2);
  text-align: center;
  padding: 1rem;
}

.door-card__body {
  padding: 1.75rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.door-card__label {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-accent);
}

.door-card__desc {
  font-size: 1.1rem;
  font-weight: 400;
  color: var(--color-muted);
  line-height: 1.5;
  margin: 0;
}

.door-card__cta {
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--color-text);
  margin-top: 0.5rem;
  transition: color 0.2s ease;
}

.door-card:hover .door-card__cta {
  color: var(--color-accent);
}

/* Responsive */
@media (max-width: 900px) {
  .doors__grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 600px) {
  .doors__grid {
    grid-template-columns: 1fr;
  }
}
```

### Nav CSS additions:

```css
/* ── Header inner layout ───────────────────────────── */
.site-header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--nav-height);
  padding: 0 var(--side-pad);
}

.site-header__left {
  display: flex;
  align-items: center;
  gap: 2.5rem;
}

.site-header__right {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

/* ── Nav primary (FILM · GAMES · IP) ───────────────── */
.site-nav__primary {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.site-nav__primary a {
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-text);
  text-decoration: none;
  padding-bottom: 2px;
  border-bottom: 2px solid transparent;
  transition: color 0.2s ease, border-color 0.2s ease;
}

.site-nav__primary a:hover,
.site-nav__primary a.is-active {
  color: var(--color-accent);
  border-bottom-color: var(--color-accent);
}

/* ── Nav secondary (About · Contact) ───────────────── */
.site-nav__secondary {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.site-nav__secondary a {
  font-size: 13px;
  font-weight: 400;
  color: var(--color-muted);
  text-decoration: none;
  transition: color 0.2s ease;
}

.site-nav__secondary a:hover {
  color: var(--color-text);
}

/* Mobile nav primary / secondary */
.mobile-nav__primary {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.mobile-nav__primary a {
  font-size: clamp(2rem, 8vw, 3rem);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--color-text);
  text-decoration: none;
  transition: color 0.2s ease;
}

.mobile-nav__primary a:hover,
.mobile-nav__primary a.is-active {
  color: var(--color-accent);
}

.mobile-nav__secondary {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--color-border);
}

.mobile-nav__secondary a {
  font-size: 1rem;
  font-weight: 400;
  color: var(--color-muted);
  text-decoration: none;
  transition: color 0.2s ease;
}

.mobile-nav__secondary a:hover {
  color: var(--color-text);
}

/* Hide desktop nav on mobile */
@media (max-width: 768px) {
  .site-nav__primary,
  .site-nav__secondary,
  .site-header__right > .lang-select,
  .site-header__right > .btn-nav {
    display: none;
  }
  .nav-toggle {
    display: block;
  }
}
```

---

## PAGE: film.html — NEW

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Film & Brand Animation — LISENBART">
  <title>Film & Brand — LISENBART</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="css/style.css">
  <link rel="stylesheet" href="css/responsive.css">
</head>
<body data-title-key="film.pageTitle">
  <div class="cursor-dot" aria-hidden="true"></div>

  <!-- NAV — paste full nav from above, data-nav="film" on Film link gets is-active via JS -->
  [FULL NAV HERE]
  [FULL MOBILE NAV HERE]

  <main>

    <!-- PAGE HERO -->
    <section class="page-hero section reveal">
      <p class="section-label" data-i18n="film.label">Film & Brand</p>
      <h1 class="section__title" data-i18n="film.headline">Animation for agencies and brands.</h1>
      <p class="section__sub" data-i18n="film.subline">Explainers, brand films, social content — human creative direction, AI-accelerated production.</p>
    </section>

    <!-- WHAT WE DO -->
    <section class="section reveal">
      <p class="section-label" data-i18n="film.servicesLabel">What we do</p>
      <p class="services-tags" data-i18n="film.tags">2D Animation · 3D Animation · Motion Design · Brand Films · Explainer Video · Social Animation · Pitch Video · Live Action Combo</p>

      <div class="about-grid" style="margin-top: 3rem;">
        <div>
          <h2 class="section__title" style="font-size: clamp(1.4rem,3vw,2rem);" data-i18n="film.approachTitle">Human direction. AI speed.</h2>
          <p class="section__sub" data-i18n="film.approachBody">Every project starts with a director — not a prompt. We use AI tools to accelerate production: concept iteration, style testing, asset generation. The creative vision and final decisions stay human. The result is agency-quality animation at a faster turnaround.</p>
        </div>
      </div>
    </section>

    <!-- SELECTED WORK -->
    <section class="section">
      <p class="section-label" data-i18n="work.label">Selected work</p>
      <div class="work-grid">

        <article class="work-card reveal">
          <div class="work-card__media">
            <div class="media-placeholder" data-i18n="work.mediaPlaceholder">PLACEHOLDER: 16:9 thumbnail</div>
          </div>
          <div class="work-card__body">
            <span class="work-card__category" data-i18n="work.case1.category">Animation Film</span>
            <h3 class="work-card__title" data-i18n="work.case1.title">Unnecessary Things</h3>
            <p class="work-card__desc" data-i18n="work.case1.desc">Award-winning animated short. 11 international awards. 45 festival selections.</p>
          </div>
        </article>

        <article class="work-card reveal">
          <div class="work-card__media">
            <div class="media-placeholder" data-i18n="film.placeholderCase">PLACEHOLDER: Brand / agency project</div>
          </div>
          <div class="work-card__body">
            <span class="work-card__category">Brand Animation</span>
            <h3 class="work-card__title">PLACEHOLDER: Project title</h3>
            <p class="work-card__desc">PLACEHOLDER: One-line description.</p>
          </div>
        </article>

      </div>
    </section>

    <!-- PRICING -->
    <section class="section">
      <p class="section-label" data-i18n="pricing.label">Investment</p>
      <div class="pricing-grid">
        <div class="pricing-col">
          <h3 class="pricing-col__title" data-i18n="pricing.filmTitle">Film & Brand</h3>
          <ul class="pricing-list">
            <li class="pricing-list__item reveal">
              <span class="pricing-list__name" data-i18n="pricing.film1.name">Agency White-Label</span>
              <span class="pricing-list__from" data-i18n="pricing.film1.from">from €500/day</span>
            </li>
            <li class="pricing-list__item reveal">
              <span class="pricing-list__name" data-i18n="pricing.film2.name">Brand Explainer</span>
              <span class="pricing-list__from" data-i18n="pricing.film2.from">from €2,500</span>
            </li>
            <li class="pricing-list__item reveal">
              <span class="pricing-list__name" data-i18n="pricing.film3.name">Social Animation Pack</span>
              <span class="pricing-list__from" data-i18n="pricing.film3.from">from €2,000</span>
            </li>
            <li class="pricing-list__item reveal">
              <span class="pricing-list__name" data-i18n="pricing.film4.name">Pitch / Investor Video</span>
              <span class="pricing-list__from" data-i18n="pricing.film4.from">from €2,500</span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section section--cta reveal" style="text-align:center; padding-top: 0;">
      <h2 data-i18n="film.ctaTitle">Ready to start?</h2>
      <a href="index.html#contact" class="btn-primary" data-i18n="film.ctaBtn">Let's talk →</a>
    </section>

  </main>

  <!-- FOOTER — same as index.html footer -->
  [FULL FOOTER HERE — copy from index.html]

  <script src="lang/bundle.js"></script>
  <script src="js/lang.js" defer></script>
  <script src="js/main.js" defer></script>
</body>
</html>
```

---

## PAGE: games.html — NEW

Same structure as film.html, with these differences:

- `data-title-key="games.pageTitle"`
- `<title>Mobile Games — LISENBART</title>`
- `<meta name="description" content="Mobile Game Cinematics — LISENBART">`
- Hero: `games.label`, `games.headline`, `games.subline`
- Services: `games.tags`, `games.approachTitle`, `games.approachBody`
- Work cards: case2 (Playtika/SuperPlay) + 1 placeholder
- Pricing: game packages only (pricing.gamesTitle + game1/game2/game3/game4)
- CTA: `games.ctaTitle`, `games.ctaBtn`

---

## PAGE: ip.html — NEW

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Original IP Projects — LISENBART">
  <title>IP Projects — LISENBART</title>
  <link rel="stylesheet" href="css/style.css">
  <link rel="stylesheet" href="css/responsive.css">
</head>
<body data-title-key="ip.pageTitle">
  <div class="cursor-dot" aria-hidden="true"></div>

  [FULL NAV]
  [FULL MOBILE NAV]

  <main>

    <!-- PAGE HERO -->
    <section class="page-hero section reveal">
      <p class="section-label" data-i18n="ip.label">Original IP</p>
      <h1 class="section__title" data-i18n="ip.headline">Stories we are building.</h1>
      <p class="section__sub" data-i18n="ip.subline">Original animation projects in development. Open to co-production, licensing, and broadcast partnerships.</p>
    </section>

    <!-- PROJECTS GRID -->
    <section class="section">
      <div class="ip-grid">

        <article class="ip-card reveal">
          <div class="ip-card__media">
            <div class="media-placeholder">PLACEHOLDER: SmartBabies key art</div>
          </div>
          <div class="ip-card__body">
            <div class="ip-card__meta">
              <span class="ip-card__status" data-i18n="ip.statusDev">In Development</span>
              <span class="ip-card__format" data-i18n="ip.formatTbc">PLACEHOLDER: Format</span>
            </div>
            <h2 class="ip-card__title" data-i18n="ip.smartBabiesTitle">SmartBabies</h2>
            <p class="ip-card__desc" data-i18n="ip.pitchTbc">PLACEHOLDER: One-paragraph pitch.</p>
          </div>
        </article>

        <article class="ip-card reveal">
          <div class="ip-card__media">
            <div class="media-placeholder">PLACEHOLDER: BibiBoo key art</div>
          </div>
          <div class="ip-card__body">
            <div class="ip-card__meta">
              <span class="ip-card__status" data-i18n="ip.statusDev">In Development</span>
              <span class="ip-card__format" data-i18n="ip.formatTbc">PLACEHOLDER: Format</span>
            </div>
            <h2 class="ip-card__title" data-i18n="ip.bibiBooTitle">BibiBoo</h2>
            <p class="ip-card__desc" data-i18n="ip.pitchTbc">PLACEHOLDER: One-paragraph pitch.</p>
          </div>
        </article>

        <article class="ip-card reveal">
          <div class="ip-card__media">
            <div class="media-placeholder">PLACEHOLDER: Pershosvit key art</div>
          </div>
          <div class="ip-card__body">
            <div class="ip-card__meta">
              <span class="ip-card__status ip-card__status--seeking" data-i18n="ip.statusSeeking">Seeking Co-Production</span>
              <span class="ip-card__format" data-i18n="ip.formatTbc">PLACEHOLDER: Format</span>
            </div>
            <h2 class="ip-card__title" data-i18n="ip.pershosvitTitle">Pershosvit</h2>
            <p class="ip-card__desc" data-i18n="ip.pitchTbc">PLACEHOLDER: One-paragraph pitch.</p>
          </div>
        </article>

        <article class="ip-card reveal">
          <div class="ip-card__media">
            <div class="media-placeholder">PLACEHOLDER: The Last Cossack key art</div>
          </div>
          <div class="ip-card__body">
            <div class="ip-card__meta">
              <span class="ip-card__status ip-card__status--seeking" data-i18n="ip.statusSeeking">Seeking Co-Production</span>
              <span class="ip-card__format" data-i18n="ip.formatTbc">PLACEHOLDER: Format</span>
            </div>
            <h2 class="ip-card__title" data-i18n="ip.lastCossackTitle">The Last Cossack</h2>
            <p class="ip-card__desc" data-i18n="ip.pitchTbc">PLACEHOLDER: One-paragraph pitch.</p>
          </div>
        </article>

        <article class="ip-card reveal">
          <div class="ip-card__media">
            <div class="media-placeholder">PLACEHOLDER: Boy from City B key art</div>
          </div>
          <div class="ip-card__body">
            <div class="ip-card__meta">
              <span class="ip-card__status ip-card__status--seeking" data-i18n="ip.statusSeeking">Seeking Co-Production</span>
              <span class="ip-card__format" data-i18n="ip.formatTbc">PLACEHOLDER: Format</span>
            </div>
            <h2 class="ip-card__title" data-i18n="ip.boyFromCityBTitle">Boy from City B. (Tears of God)</h2>
            <p class="ip-card__desc" data-i18n="ip.pitchTbc">PLACEHOLDER: One-paragraph pitch.</p>
          </div>
        </article>

      </div>
    </section>

    <!-- CO-PRODUCTION CTA -->
    <section class="section section--cta reveal" style="text-align:center;">
      <h2 data-i18n="ip.ctaTitle">Interested in co-production?</h2>
      <p style="color:var(--color-muted); max-width:48ch; margin: 1rem auto;" data-i18n="ip.ctaBody">We are open to co-production partnerships, broadcast licensing, and development funding. Let's talk.</p>
      <a href="index.html#contact" class="btn-primary" data-i18n="ip.ctaBtn">Get in touch →</a>
    </section>

  </main>

  [FULL FOOTER]

  <script src="lang/bundle.js"></script>
  <script src="js/lang.js" defer></script>
  <script src="js/main.js" defer></script>
</body>
</html>
```

### IP page CSS additions:

```css
/* ── IP Projects grid ──────────────────────────────── */
.ip-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
}

.ip-card {
  border: 1px solid var(--color-border);
  overflow: hidden;
  transition: border-color 0.3s ease;
}

.ip-card:hover {
  border-color: var(--color-accent);
}

.ip-card__media {
  aspect-ratio: 16 / 9;
  background: #111;
  overflow: hidden;
}

.ip-card__body {
  padding: 1.5rem 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.ip-card__meta {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.ip-card__status {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  background: rgba(255,255,255,0.08);
  color: var(--color-muted);
  padding: 3px 8px;
  border-radius: 2px;
}

.ip-card__status--seeking {
  background: rgba(255, 77, 0, 0.15);
  color: var(--color-accent);
}

.ip-card__format {
  font-size: 11px;
  color: var(--color-muted);
}

.ip-card__title {
  font-size: clamp(1.2rem, 2.5vw, 1.6rem);
  font-weight: 600;
  color: var(--color-text);
  margin: 0;
}

.ip-card__desc {
  font-size: 0.9rem;
  color: var(--color-muted);
  line-height: 1.6;
  margin: 0;
}

@media (max-width: 768px) {
  .ip-grid {
    grid-template-columns: 1fr;
  }
}
```

---

## LANG FILES — NEW KEYS TO ADD

Keys already present in lang files: `nav.film`, `nav.games`, `nav.ip`, `doors.film.*`, `doors.games.*`, `film.*`, `games.*`, `ip.*`

**Only key missing across all three lang files: `doors.ip.*`**

Add to **en.json**:
```json
"doors": {
  "film": { ... existing ... },
  "games": { ... existing ... },
  "ip": {
    "label": "Original IP",
    "desc": "Original animated projects in development. Open to co-production.",
    "cta": "Enter →",
    "media": "PLACEHOLDER: IP cover — key art still or short loop (16:9, ≤3MB)"
  }
}
```

Add to **pl.json**:
```json
"doors": {
  "ip": {
    "label": "Oryginalne IP",
    "desc": "Oryginalne projekty animowane w fazie rozwoju. Otwarci na koprodukcję.",
    "cta": "Wejdź →",
    "media": "PLACEHOLDER: Okładka IP — kadr lub pętla (16:9, ≤3 MB)"
  }
}
```

Add to **ua.json**:
```json
"doors": {
  "ip": {
    "label": "Оригінальні IP",
    "desc": "Оригінальні анімаційні проекти в розробці. Відкриті до копродукції.",
    "cta": "Увійти →",
    "media": "PLACEHOLDER: Обкладинка IP — кадр або петля (16:9, ≤3 МБ)"
  }
}
```

After editing lang files — run: `node js/rebuild-lang-bundle.js`

---

## RULES — DO NOT BREAK

1. **No Russian language anywhere.** EN / PL / UA only.
2. **"Unnecessary Things"** — no external client name. The film's client IS the title.
3. **"Mobile Game Cinematics"** — always "mobile", never just "game".
4. **Location strings** — already correct in lang files. Do not change.
5. **Social links** — already in footer of index.html (from corrections v2). Copy the exact footer div to film.html, games.html, ip.html.
6. **lang/bundle.js** — rebuild after any JSON change. Never edit manually.
7. **CSS** — add to style.css and responsive.css. Do not replace existing rules.
8. **JS** — add to main.js. Do not remove existing functionality.
9. **work.html** — keep as-is. Remove it from nav. It is a secondary archive page.

---

## SUMMARY OF FILES TO CHANGE

| File | Action | What changes |
|---|---|---|
| `index.html` | REBUILD | Remove work/services/pricing. Add #doors (3 cards). Update nav with left/right grouping. |
| `film.html` | CREATE | New page — full content as spec'd above |
| `games.html` | CREATE | New page — mirror of film.html with games content |
| `ip.html` | CREATE | New page — 5 IP project cards + co-production CTA |
| `css/style.css` | ADD | .site-header__left/right, .site-nav__primary/secondary, .doors (3-col), .door-card, .ip-grid, .ip-card, mobile nav |
| `css/responsive.css` | ADD | Mobile rules for .doors__grid (1fr 1fr → 1fr), .ip-grid |
| `lang/en.json` | ADD | `doors.ip.*` |
| `lang/pl.json` | ADD | `doors.ip.*` |
| `lang/ua.json` | ADD | `doors.ip.*` |
| `lang/bundle.js` | REBUILD | Run node js/rebuild-lang-bundle.js after JSON edits |
| `js/main.js` | UPDATE | Replace active nav link detection with new logic |
| `work.html` | KEEP | No changes — remove from nav only |

---

*Architecture v1 | Updated May 2026*
