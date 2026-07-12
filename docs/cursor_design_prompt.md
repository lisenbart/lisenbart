# LISENBART.COM — Design Prompt for Cursor
**Revised after analysis of buck.co, hellohornet.com, awwwards animation category.**
Version 1.1 | May 2026

**Companion brief:** `lisenbart_website_brief.md` — повний **EN / PL / UA** копі, **поля форми та бекенд**, сторінка **`/work`**, **якорі** для навігації, чекліст запуску та заборонений контент (RU, старі контакти тощо). Цей файл керує **пікселями та структурою**; бриф керує **текстами та бізнес-вимогами**.

---

## CORE DESIGN DIRECTION

**Reference sites (study these before building):**
- [buck.co](https://buck.co) — ultra-minimal, work-first, almost no color
- [hellohornet.com](https://www.hellohornet.com) — dark, video-hero, work as the protagonist
- [awwwards.com/websites/animation](https://www.awwwards.com/websites/animation) — current industry standard

**Rule #1: The work IS the design.**
Animation studios don't sell with text. They sell with motion. Every design decision must serve the portfolio, not compete with it.

**Mood:** Cinematic, confident, restrained. Premium without decoration.
**What to avoid:** Two-column "services" tables, corporate bullet lists, multiple accent colors, stock-icon blocks.

---

## COLOR PALETTE (revised — more restrained)

```css
:root {
  --color-bg:        #0A0A0A;    /* near-black — PRIMARY background */
  --color-bg-light:  #F5F4F0;    /* warm off-white — used sparingly (contact, about) */
  --color-text:      #FFFFFF;    /* primary text on dark bg */
  --color-text-dark: #111111;    /* text on light sections */
  --color-muted:     rgba(255,255,255,0.45); /* secondary text, captions */
  --color-accent:    #FF4D00;    /* ONE accent only — orange. Used for: hover states, active nav, CTA button */
  --color-border:    rgba(255,255,255,0.1);  /* subtle dividers */
}
```

**Color usage rules:**
- Dark background is DEFAULT (not just the hero). Most of the site is dark.
- Off-white `#F5F4F0` used ONLY for contact section — creates visual rest before CTA.
- Orange `#FF4D00` appears in 3 places only: hover on portfolio cards, CTA button, active nav item.
- No blue accent. Removed entirely.
- Portfolio thumbnails bring all the color — don't add competing colors to the UI.

---

## TYPOGRAPHY

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700;900&display=swap');

:root {
  --font: 'Inter', system-ui, sans-serif;

  --text-hero:   clamp(52px, 7vw, 96px);   /* reel overlay headline, if used */
  --text-h2:     clamp(28px, 4vw, 56px);   /* section titles */
  --text-h3:     clamp(18px, 2vw, 24px);   /* card titles */
  --text-body:   16px;
  --text-label:  11px;                     /* uppercase tags, 0.15em tracking */
}
```

**Typography rules:**
- Section labels: 11px, uppercase, letter-spacing 0.15em, color `--color-muted` — used above section titles only
- Headlines: weight 700–900, tight line-height (1.0–1.1)
- Body: weight 300–400, generous line-height (1.6)
- No serif. No decorative fonts.

---

## PAGE STRUCTURE

**Section anchors (узгоджено з брифом):** `#selected-work` (grid), `#about`, `#clients`, `#services`, `#contact`. На hero за потреби — `id` для скролу нагору (наприклад `#top`).

### Hero — VIDEO REEL (not text)

```
This is the most important change from v1.
The hero is a FULL-SCREEN MUTED VIDEO LOOP — a 30–60 second showreel of the best work.
Text overlay is minimal: studio name + one line.

Layout:
  Background: full-viewport video, object-fit: cover
  Overlay: dark gradient (bottom 40%) for text legibility
  
  Top-left: LISENBART wordmark (white, 16px, letter-spacing 0.1em, uppercase)
  Bottom-left: 
    Line 1: "Animation Studio" — label style, muted
    Line 2: "Warsaw" — label style, muted
  Bottom-right: 
    [↓ See work] or [↓ Scroll] — ghost style, white, small

No big headline. No subline paragraph. No CTA buttons in the hero.
The video IS the message.

Video specs:
  Format: MP4 (H.264) for compatibility + WebM for modern browsers
  Max size: 15MB (compress with HandBrake or ffmpeg)
  Aspect: 16:9, cover the viewport
  No audio track
  Loop: true, autoplay: true, muted: true, playsinline: true
  
Fallback (if no reel yet): dark gradient background + centered wordmark only.
```

### Navigation (sticky, minimal)

```
Position: fixed, top-0, full width, z-index 100
Default: transparent background (video shows through)
After 100px scroll: rgba(10,10,10,0.95) + backdrop-filter: blur(8px)

Height: 64px

Left:   LISENBART — Inter 700, 14px, letter-spacing 0.08em, uppercase, white
Right:  Work · About · Contact · [Let's talk →]
        (Опційно додай **Services** → `#services`, якщо тримаєш пункт з брифу.)

[Let's talk →] button:
  Default: border 1px solid rgba(255,255,255,0.3), transparent bg, white text
  Hover:   background #FF4D00, border-color #FF4D00, white text
  No border-radius (sharp)

Mobile: hamburger → full-screen overlay, links centered, 32px, white
```

### Section 2 — SELECTED WORK

```
Background: #0A0A0A (continues dark from hero — no visual break)
This section is the heart of the site.

Layout: Full-width grid, 2 columns on desktop
  - Cards have NO margin on sides — go edge to edge or near-edge
  - Gap between cards: 2px (tight grid, like a film strip)
  - Each card: 16:9 ratio

Card anatomy:
  [ VIDEO/IMAGE — fills card completely ]
  [ Info bar below the image, NOT overlaid ]
    Left: Client / Project name — Inter 700, 18px, white
    Right: Category tag — 11px, uppercase, letter-spacing 0.12em, --color-muted

Card hover:
  1. If video: starts playing (muted, loop)
  2. Thin orange line appears on top edge of card (3px, #FF4D00)
  3. Info bar: client name color → #FF4D00
  4. Cursor: pointer
  Transition: all 0.2s ease

Below the grid:
  Centered: "View all work →" — Inter 500, 14px, white, letter-spacing 0.05em
  On hover: color #FF4D00
```

### Section 3 — ABOUT (replaces "Services" + "Why Lisenbart")

```
Background: #0A0A0A
This replaces the two-column services layout.
Animation studios don't sell services — they sell capability and taste.

Layout: Two blocks, side by side

Left block (60% width):
  Label: "ABOUT"
  Headline: "30 years making animation that moves people."
  Body (2–3 sentences max):
    "We're a Warsaw-based studio working with advertising agencies, 
     brands, and game studios across Europe. 
     Human creative direction, AI-accelerated production."

Right block (40% width, offset down by ~80px for visual rhythm):
  4 stats, stacked:
  
  [30+]        Years of production
  [15]         International awards
  [2]          Continents, one timezone
  [AI+Human]   How we work

  Stats style: number in Inter 900, 48px, white / label in 12px, --color-muted

No bullet lists. No "Block 1, Block 2, Block 3, Block 4" grid.
```

### Section 4 — CLIENTS

```
Background: rgba(255,255,255,0.03) — barely visible tint, still dark
Label: "TRUSTED BY" — 11px, uppercase, muted, centered

Logo strip: horizontal flex, centered, wrap
  - Logos: white SVG (monochrome) — clients provide logos, convert to white
  - Opacity: 0.5 default → 1.0 on hover
  - Size: max 140px wide
  - Gap: 48px horizontal, 32px vertical
  - No grid lines, no boxes around logos
```

### Section 5 — SERVICES (minimal, not a table)

```
Background: #0A0A0A
Label: "WHAT WE DO"

Instead of two-column table, use a horizontal tag-style list.
One line of techniques, full width, centered:

"2D Animation · 3D Animation · Motion Design · Character Design · 
 Stop Motion · Game Cinematics · Explainer Video · Live Action Combo"

Each item: Inter 400, 18px, white
Separator ·: color #FF4D00

On mobile: stack into 2 items per row max
```

### Section 6 — CONTACT

```
Background: #F5F4F0 — the ONLY light section. Contrast after full dark site.
Text: #111111

Layout: Two columns

Left (55%):
  Headline: "Let's make something together."
  Subline: "Tell us about your project. We respond within 24 hours."
  
  Below:
  info@lisenbart.com — large, 24px, Inter 500, link
  Warsaw, Poland — 14px, muted

Right (45%):
  Form fields (minimal — bottom border only, no boxes):
    - Name
    - Company
    - Email
    - What do you need? (dropdown: Brand animation / Game cinematic / Explainer / Motion graphics / Other)
    - Message
    [Send →] button: full-width, #0A0A0A bg, white text, hover → #FF4D00
```

### Footer

```
Background: #0A0A0A
Height: 80px
Layout: flex, space-between, align-center

Left:   LISENBART © 2026
Center: info@lisenbart.com
Right:  EN | PL | UA

No social links until profiles are built.
No decorative elements.
```

---

## LANGUAGE SWITCHER

```javascript
// Implementation:
// 1. All translatable text: <span data-i18n="hero.title">Animation for brands...</span>
// 2. JSON files: /lang/en.json, /lang/pl.json, /lang/ua.json
// 3. On switch: fetch lang file, replace all [data-i18n] innerHTML
// 4. Store in localStorage('lang')
// 5. On load: check localStorage, detect browser lang as fallback, default EN

// Switcher UI: top-right in nav
// "EN | PL | UA" — Inter 400, 13px, white/muted
// Active lang: white, others: muted
// Separator |: rgba(255,255,255,0.2)
```

---

## MICRO-INTERACTIONS (minimal, fast)

```javascript
// 1. Smooth scroll — CSS only:
//    html { scroll-behavior: smooth; }

// 2. Scroll fade-in (IntersectionObserver):
//    Elements start: opacity 0, transform: translateY(20px)
//    On 15% visible: opacity 1, transform: translateY(0), transition 0.5s ease-out
//    Stagger children: 0.08s delay each

// 3. Nav on scroll:
//    After 100px: add class .scrolled → backdrop-filter + background

// 4. Portfolio hover:
//    video.play() on mouseenter, video.pause() on mouseleave
//    Orange top border: transition 0.15s

// 5. Custom cursor (optional, adds premium feel):
//    Small circle follows mouse (16px, rgba(255,77,0,0.6))
//    On hover over cards: expands to 48px
//    Implementation: mousemove event, translate(x,y) via transform
//    Skip on mobile (touch devices)
```

---

## PERFORMANCE (non-negotiable)

```
Target: Lighthouse ≥ 90 on mobile

Images:
  - Format: WebP + JPEG fallback (<picture> tag)
  - Lazy load: loading="lazy" on all below-fold images
  - Max image: 200KB per thumbnail

Video:
  - Hero reel: ≤ 15MB (compress with: ffmpeg -crf 28 -preset slow)
  - Card previews: ≤ 3MB each
  - Use <source> with WebM first, MP4 fallback

Fonts:
  - Preconnect: <link rel="preconnect" href="https://fonts.googleapis.com">
  - display=swap in Google Fonts URL

CSS:
  - No Bootstrap, no Tailwind CDN
  - Single style.css + responsive.css
  - Critical CSS inline in <head> for first paint

JavaScript:
  - No jQuery, no frameworks
  - Defer non-critical scripts: <script defer>
  - Total JS: aim for < 30KB
```

---

## FILE STRUCTURE

```
www/
├── index.html
├── work.html
├── 404.html
├── css/
│   ├── style.css        # all styles
│   └── responsive.css   # media queries only
├── js/
│   ├── main.js          # scroll animations, nav, cursor
│   └── lang.js          # i18n switcher
├── lang/
│   ├── en.json
│   ├── pl.json
│   └── ua.json
└── assets/
    ├── video/
    │   ├── reel.mp4        # hero showreel
    │   └── reel.webm
    ├── images/             # WebP thumbnails
    └── logos/              # white SVG client logos
```

---

## FULL CURSOR PROMPT

```
Build the LISENBART.COM website — a premium B2B animation studio based in Warsaw.

Design references: buck.co, hellohornet.com. Study their structure before building.

DESIGN RULES:
- Dark-first: primary background #0A0A0A. Most of the site is dark.
- One accent color only: #FF4D00 (orange). Used only for: hover on cards, CTA button, active nav.
- Font: Inter (Google Fonts) — weights 300, 400, 700, 900. Nothing else.
- Sharp edges everywhere. No border-radius on buttons or cards.
- The work is the star. UI is the frame.

HERO:
- Full viewport, muted video loop (file: /assets/video/reel.mp4)
- Minimal text overlay: wordmark top-left, "Animation Studio · Warsaw" bottom-left
- NO big headline, NO paragraph subline, NO CTA buttons in hero
- If no video yet: dark gradient fallback, centered wordmark only

SECTIONS (in order):
1. Hero — video reel
2. Selected Work — 2-column card grid, edge-to-edge, 2px gaps, hover video + orange top border
3. About — two-column: left=text (headline + 2-3 sentences), right=4 stats (30+ / 15 / 2 / AI+Human)
4. Clients — logo strip, white monochrome SVGs, 0.5 opacity default, 1.0 on hover
5. Services — single-line tag list: "2D · 3D · Motion Design · Character Design · ..." separators in orange
6. Contact — light section (#F5F4F0), two columns: left=info, right=minimal form

NAVIGATION:
- Fixed, transparent → blurred dark on scroll
- Right: Work · About · Contact · [Let's talk →] button
- Language switcher: EN | PL | UA (localStorage, data-i18n attributes, /lang/*.json)

ANIMATIONS:
- IntersectionObserver fade-in (opacity + translateY, 0.5s ease-out, 0.08s stagger)
- Custom cursor: small orange circle, expands on card hover (desktop only)
- Video preview on card hover

PERFORMANCE:
- WebP images, lazy load, no jQuery, no Bootstrap
- Hero video ≤ 15MB, card previews ≤ 3MB
- Lighthouse target: ≥ 90 mobile

Content is in: lisenbart_website_brief.md (all languages, form copy, /work). Design/visuals: this file (cursor_design_prompt.md).
```

---

## WHAT CHANGED FROM v1 (and why)

| v1 | v1.1 | Reason |
|---|---|---|
| Text hero with big headline | Video reel hero | Industry standard: animation studios lead with motion |
| White/off-white as primary bg | Dark (#0A0A0A) as primary | Buck, Hornet, all top studios are dark-dominant |
| Two accent colors (orange + blue) | One accent only (orange) | Two accents = cluttered; portfolio brings color |
| Services: two-column table | Single-line tag list | Columns look like corporate SaaS, not a creative studio |
| "Why Lisenbart" 4-icon blocks | Integrated into About as 4 stats | Stats are more credible than icon blocks |
| "Start a project" in nav | "Let's talk →" | Warmer, more appropriate for creative studio |

---

*Design prompt v1.1 | May 2026 | Based on analysis of buck.co + hellohornet.com*
