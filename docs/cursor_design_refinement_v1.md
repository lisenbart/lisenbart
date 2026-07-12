# LISENBART.COM — Design Refinement v1
Typography, colour, and business-feel upgrade.
No structural or layout changes — CSS and font tokens only.

---

## GOAL

The site must read as a professional production business — not a designer's portfolio.
Signals of "business": authoritative typography, decisive CTAs, clear price lists,
restrained decoration, confident hierarchy. Every element should say
"we deliver commercial work" not "look how creative we are."

---

## 1. FONTS — REPLACE INTER WITH TWO-FONT SYSTEM

### Replace the @import at the top of style.css:

**BEFORE:**
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700;900&display=swap');
```

**AFTER:**
```css
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300;1,9..40,400&display=swap');
```

### Add two font variables to :root:

```css
--font-heading: 'Syne', system-ui, sans-serif;
--font-body:    'DM Sans', system-ui, sans-serif;
```

### Apply heading font — add this rule to style.css:

```css
h1, h2, h3, h4,
.section__title,
.about-grid__headline,
.door-card__label,
.work-card__title,
.ip-card__title,
.pricing-col__title,
.logo {
  font-family: var(--font-heading);
}
```

### Apply body font — update body selector:

```css
body {
  font-family: var(--font-body);
  /* keep all other body rules unchanged */
}
```

---

## 2. CSS TOKENS — REPLACE :root ENTIRELY

Find the `:root { ... }` block. Replace it with:

```css
:root {
  /* Colours */
  --color-bg:        #0e0d0c;
  --color-bg-card:   #141312;
  --color-bg-light:  #f5f4f0;
  --color-text:      #ede9e3;
  --color-text-dark: #111111;
  --color-muted:     rgba(237, 233, 227, 0.58);
  --color-muted-dark: rgba(17, 17, 17, 0.55);
  --color-accent:    #ff4d00;
  --color-border:    rgba(237, 233, 227, 0.1);

  /* Fonts */
  --font-heading: 'Syne', system-ui, sans-serif;
  --font-body:    'DM Sans', system-ui, sans-serif;
  --font:         var(--font-body); /* legacy alias — keep for compatibility */

  /* Type scale */
  --text-hero:  clamp(56px, 8vw, 108px);
  --text-h2:    clamp(32px, 4.5vw, 64px);
  --text-h3:    clamp(22px, 2.5vw, 36px);
  --text-body:  17px;
  --text-label: 11px;

  /* Layout */
  --nav-height:   64px;
  --section-pad:  clamp(56px, 9vw, 128px);
  --side-pad:     clamp(16px, 4vw, 48px);
  --ease:         0.2s ease;
}
```

---

## 3. HEADING STYLE — TIGHTER, HEAVIER, MORE AUTHORITATIVE

Add these rules (or update if they exist):

```css
.section__title {
  font-size: var(--text-h2);
  font-weight: 800;
  line-height: 1.05;
  letter-spacing: -0.02em;
  margin: 0;
}

.about-grid__headline {
  font-size: var(--text-h2);
  font-weight: 800;
  line-height: 1.05;
  letter-spacing: -0.02em;
  margin: 0 0 1.5rem;
}

h1 {
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.05;
}

h2 {
  font-weight: 700;
  letter-spacing: -0.01em;
}

h3 {
  font-weight: 700;
}
```

Negative letter-spacing on large headings is a key signal of professional editorial design.
It tightens the word shapes and makes headings look intentional, not default.

---

## 4. BODY TEXT — WEIGHT AND READABILITY

Update body:
```css
body {
  font-weight: 400;
  line-height: 1.7;
  /* rest unchanged */
}
```

Find every instance of `font-weight: 300` in style.css and replace with `font-weight: 400`.
Thin weight (300) is invisible on dark backgrounds.

Update `.section__sub`:
```css
.section__sub {
  font-size: clamp(16px, 1.8vw, 19px);
  font-weight: 400;
  color: var(--color-muted);
  line-height: 1.7;
  max-width: 52ch;
  margin: 1rem 0 0;
}
```

---

## 5. CTA BUTTONS — MORE DECISIVE (business signal)

Ghost buttons (transparent with border) read as "portfolio aesthetic."
A production business uses solid CTAs.

**Update `.btn-primary`:**
```css
.btn-primary {
  display: inline-block;
  margin-top: 1.5rem;
  padding: 0.9rem 2rem;
  background: var(--color-accent);
  border: 1px solid var(--color-accent);
  color: #fff;
  font-family: var(--font-heading);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-decoration: none;
  transition: background var(--ease), border-color var(--ease), color var(--ease);
}

.btn-primary:hover {
  background: transparent;
  border-color: var(--color-accent);
  color: var(--color-accent);
}
```

**Update `.btn-nav` (top-right "Let's talk →"):**
```css
.btn-nav {
  display: inline-flex;
  align-items: center;
  padding: 0.55rem 1.1rem;
  font-family: var(--font-heading);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  border: 1px solid var(--color-accent);
  background: transparent;
  color: var(--color-accent);
  white-space: nowrap;
  transition: background var(--ease), color var(--ease);
}

.btn-nav:hover {
  background: var(--color-accent);
  color: #fff;
}
```

**Update `.btn-submit` (contact form):**
```css
.btn-submit {
  width: 100%;
  margin-top: 0.5rem;
  padding: 1rem 1.5rem;
  background: var(--color-accent);
  color: #fff;
  border: none;
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 13px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
  transition: background var(--ease);
}

.btn-submit:hover {
  background: #e04400;
}
```

---

## 6. PRICING LIST — INVOICE STYLE (business signal)

Pricing should look like a real price list, not decorative cards.
Add separating borders between items:

```css
.pricing-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0;
  border-top: 1px solid var(--color-border);
}

.pricing-list__item {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: baseline;
  gap: 0.5rem 1.5rem;
  padding: 1rem 0;
  border-bottom: 1px solid var(--color-border);
}

.pricing-list__name {
  font-size: 16px;
  font-weight: 400;
  color: var(--color-text);
  flex: 1 1 12rem;
}

.pricing-list__from {
  font-size: 15px;
  font-weight: 600;
  font-family: var(--font-heading);
  color: var(--color-accent);
  white-space: nowrap;
}
```

---

## 7. SECTION LABEL — MORE PRECISE

```css
.section-label {
  font-size: var(--text-label);
  font-family: var(--font-heading);
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--color-accent);
  margin: 0 0 1.25rem;
}
```

Changing section label color from muted → accent makes the section structure immediately clear.
It signals "this is organised, this is a business, each section has a purpose."

---

## 8. LOGO — HEADING FONT

Logo already inherits font-heading from the h1/h2 rule above.
Verify it looks good — Syne at 14px uppercase. If needed, adjust:

```css
.logo {
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}
```

---

## 9. NAV PRIMARY LINKS — HEADING FONT

```css
.site-nav__primary a {
  font-family: var(--font-heading);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  /* rest unchanged */
}
```

---

## 10. CARD BACKGROUNDS — USE NEW TOKEN

```css
.door-card__media { background: var(--color-bg-card); }
.ip-card__media   { background: var(--color-bg-card); }
.work-card        { background: var(--color-bg-card); }
```

---

## 11. HERO + SCROLLED HEADER — UPDATE RGB VALUES

`.hero__gradient`:
```css
background: linear-gradient(
  to top,
  rgba(14, 13, 12, 0.88) 0%,
  rgba(14, 13, 12, 0.2)  45%,
  rgba(14, 13, 12, 0.38) 100%
);
```

`.site-header.is-scrolled`:
```css
background: rgba(14, 13, 12, 0.96);
```

`.mobile-nav`:
```css
background: #0e0d0c;
```

---

## 12. TRANSITIONS — SNAPPIER (business signal)

Portfolios use slow, soft transitions to look elegant.
Business sites use fast, functional transitions that don't waste the user's time.

Find `--ease: 0.2s ease;` — it's already fast, keep it.

Update `.reveal` transition (currently 0.5s — a bit slow):
```css
.reveal {
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.35s ease-out, transform 0.35s ease-out;
}
```

---

## WHAT NOT TO CHANGE

- Accent colour `#ff4d00` — do not touch
- Any HTML structure — do not touch
- Any JS files — do not touch
- Grid layouts, section order — do not touch
- Light section variables (`--color-bg-light`, `--color-text-dark`) — do not touch
- `lang/` files — do not touch

---

## SUMMARY

| Change | Before | After | Signal |
|---|---|---|---|
| Heading font | Inter (UI font) | Syne (editorial) | Creative + authoritative |
| Body font | Inter | DM Sans | Warmer, more human |
| Text colour | `#ffffff` cold white | `#ede9e3` warm cream | Less eye strain |
| Muted opacity | 45% | 58% | More readable |
| Heading weight | 700 | 800 | More authority |
| Heading tracking | 0 | -0.02em | Editorial, professional |
| Section label colour | muted (grey) | accent (orange) | Clear structure |
| btn-primary style | ghost outline | solid accent | Decisive CTA |
| btn-nav style | white outline | accent outline | Clear action |
| Pricing list | cards | bordered rows | Invoice / price list feel |
| Reveal transition | 0.5s | 0.35s | Less decorative |
| Body weight 300 | 300 | 400 | Readable on dark bg |
| Body line-height | 1.6 | 1.7 | More air |

---

*Design Refinement v1 — updated May 2026*
