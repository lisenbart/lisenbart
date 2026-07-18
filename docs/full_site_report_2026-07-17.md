# Full site report — lisenbart.com

**Дата зрізу:** 2026-07-17  
**Кодова база:** `/Users/dmytrolisenbart/Desktop/Lisenbart Film/site`  
**Гілка:** `main` (tracking `origin/main`)  
**Призначення:** фактичний виклад поточного стану після сесій змін. Без оцінки якості чи рекомендацій.

---

## 1. Повна структура сайту

### 1.1 Роутинг

Роутинг: pathname-парсинг у `src/lib/routes.ts` + `App.tsx` (без React Router).

| Шлях | Компонент / поведінка |
|---|---|
| `/` | `HomePage` |
| `/film` | `FilmPage` |
| `/commercial` | `CommercialPage` |
| `/work/commercial` | `WorkRouter` → `WorkNav` + `WorkCategoryPage` |
| `/work/gaming` | те саме |
| `/work/film` | те саме |
| `/work/social` | те саме |
| `/work` | редірект на `/work/commercial` |
| неканонічні hub/work URL | canonical redirects у `App.tsx` |

**Prerender (build):** `/`, `/work/commercial`, `/work/gaming`, `/work/film`, `/work/social`, `/film`, `/commercial` (`vite.config.ts`).

**Спільна оболонка (усі сторінки):** `Header` → main → `Footer` → `MobileEstimateCTA`.

### 1.2 Порядок секцій по сторінках

#### Home `/`
1. `PersonalHeroSection`
2. `ShowreelSection` (+ `HeroShowreel`)
3. `ExplorePathsSection`
4. `PersonalAboutSection`
5. `ContactForm`

*Немає на Home:* `TrustedBySection`, Experience grid, GLOWL-блок, End-to-End / Beyond the tool / How we work.

#### `/film`
1. Hub header (`hub-page-header`: Film | lead)
2. `film-cases` → 4× `WorkCaseBlock` (media left)
3. Contact CTA section

Порядок кейсів (`site.filmPage.caseIds`): unnecessary-things → the-last-kozak → pershosvit → scoopy-cap.

#### `/commercial`
1. Hub header (`hub-page-header`: Commercial | lead)
2. `film-cases` → 3× `ReelBlock` (AI Powered → Advertising → Games)
3. `TrustedBySection`
4. `TestimonialsSection`
5. Contact CTA section

#### Legacy `/work/*`
1. `WorkNav`
2. `WorkCategoryPage` (кейси категорії + CTA)

### 1.3 Узгоджений план vs реалізація

Джерела плану: `site/docs/BRAND-IA-STRATEGY.md`, `docs/claude_handoff_*.md` (у батьківському `Lisenbart Film/docs/`, untracked).

| Елемент плану / handoff | Статус зараз |
|---|---|
| Home Hero (портрет + I-voice) | **реалізовано** |
| Home Showreel | **реалізовано** |
| Home Explore FILM/Commercial картки | **реалізовано** |
| Home About | **реалізовано** |
| Home Contact | **реалізовано** |
| Home Trusted by | **знято з Home** (перенесено на `/commercial`) |
| Home Experience 4-картки | **не на Home** (компоненти видалені) |
| Home GLOWL блок | **не реалізовано** (свідомо) |
| `/film` hub | **реалізовано** |
| `/commercial` hub | **реалізовано** |
| Commercial Capabilities / client lists | **замінено** на reel-блоки |
| Commercial reel blocks (3) | **реалізовано** (лейбл першого блоку: **AI Powered**, не «New Formats») |
| Legacy `/work/*` | **залишаються** |

---

## 2. Повний копірайт (дослівно)

### 2.1 Спільний chrome

#### Header — `Header.tsx` + `site.ts`
| Тип | Текст | Джерело |
|---|---|---|
| alt logo | `LISENBART` | `BrandLogo` / `site.brand` |
| tagline | `Film · Commercial` | `site.tagline.line1` (`line2` порожній) |
| мікрокопі nav | `Film` | hardcoded `hubLinks` |
| мікрокопі nav | `Commercial` | hardcoded `hubLinks` |
| мікрокопі CTA (lg+) | `Discuss a project` | `site.ctaLabel` |
| aria theme | `Switch to light/dark mode` | hardcoded |
| connect menu | Open/Close connect menu | `HeaderConnectMenu` |

#### Footer — `Footer.tsx`
| Тип | Текст | Джерело |
|---|---|---|
| tagline | `Film · Commercial` | `site.tagline.line1` |
| body (md+) | `I direct animation and film — for festivals, for brands, and for myself. Festival work, children’s IP, and commercial craft.` | `site.meta.description` |
| CTA | `Discuss a project` | `site.ctaLabel` |
| Navigate | `Showreel`, `About`, `Contact`, `Film`, `Commercial` | hardcoded |
| Connect | `Email`, `WhatsApp`, `LinkedIn`, `Facebook`, `YouTube` | hardcoded labels |
| locations | `Ukraine · Canada · Poland · Remote worldwide` | `site.locations` |
| copyright | `© {year} LISENBART` | template + `site.name` |

#### MobileEstimateCTA
| Тип | Текст | Джерело |
|---|---|---|
| кнопка | `Discuss a project` | `site.ctaLabel` |

### 2.2 Home `/` — SEO
| Поле | Текст | Джерело |
|---|---|---|
| title / OG / Twitter | `Dmytro Lisenbart — Animation Director & Producer` | `site.meta.title` |
| description / OG / Twitter | `I direct animation and film — for festivals, for brands, and for myself. Festival work, children’s IP, and commercial craft.` | `site.meta.description` |
| og:image | showreel preview path via `publicAsset` | `site.meta.ogImage` |
| canonical | `https://www.lisenbart.com` | `site.canonical` |

### 2.3 Home — PersonalHeroSection
| Тип | Текст | Джерело |
|---|---|---|
| підпис role | `Animation Director & Producer` | `site.hero.personalRole` |
| H1 | `Dmytro Lisenbart` | `site.hero.personalName` (CSS uppercase) |
| body | `I direct animation and film — for festivals, for brands, and for myself.` | `site.hero.personalPositioning` |
| підпис proof | `35 years in animation · 20 years producing · 1000+ projects delivered` | `site.hero.personalProof` |
| alt | `Portrait of Dmytro Lisenbart` | `site.hero.personalPortraitAlt` |
| CTA «Watch reel ↓» | **не рендериться** (рядок лишився в `site.hero.personalCta`) | — |

### 2.4 Home — ShowreelSection
| Тип | Текст | Джерело |
|---|---|---|
| eyebrow | `Showreel` | `site.showreelSection.eyebrow` |
| caption | `Creative & animation showreel — commercials, brand films and mixed media.` | `site.showreelSection.caption` |
| iframe title / share | default via `HeroShowreel` (`Showreel` aria) | component |
| Vimeo ID | `849899875` (default у `HeroShowreel`) | hardcoded default |

### 2.5 Home — ExplorePathsSection
| Тип | Текст | Джерело |
|---|---|---|
| eyebrow | `Explore` | `site.explorePaths.eyebrow` |
| H2 | `Two sides of the work.` | `site.explorePaths.title` |
| label | `Film` | `explorePaths.film.label` |
| H3 | `Authored cinema & personal IP` | `film.title` |
| body | `Original shorts, an animated feature in development, and two IP universes.` | `film.text` |
| CTA | `Explore →` | `film.cta` + ` →` |
| label | `Commercial` | `commercial.label` |
| H3 | `Brands & game studios` | `commercial.title` |
| body | `Campaign films, trailers and animation for brands and game studios.` | `commercial.text` |
| CTA | `Explore →` | `commercial.cta` + ` →` |

### 2.6 Home — PersonalAboutSection
| Тип | Текст | Джерело |
|---|---|---|
| eyebrow | `About` | `personalAbout.eyebrow` |
| H2 | `About` | `personalAbout.title` |
| body | `Born in Lviv in 1975. Studied painting, then animation film directing at Kyiv’s Karpenko-Kary University. I founded my production practice after Mental dRive, leading creative and production teams across Ukraine, Canada and Poland to deliver commercial work across Europe and North America. I headed Ukranimafilm from 2017 to 2019 and co-founded UANIMA, the Ukrainian Animation Association.` | `personalAbout.bio` |
| підпис | `UANIMA · Head of Ukranimafilm, 2017–2019` | `recognition` |
| підпис | `Canada · Ukraine · Poland — creative & production teams` | `locations` |

### 2.7 Home — ContactForm
| Тип | Текст | Джерело |
|---|---|---|
| H2 | `Contact` | hardcoded |
| body | `Tell us about your project — you'll hear back within 24 hours.` | hardcoded |
| labels | `Email` *, `Name` optional, `Project type` optional, `Message` optional | hardcoded |
| placeholder email | `you@company.com` | hardcoded |
| select | `Select type` + `Campaign & Brand Film`, `Game Trailer or Cinematic`, `Animation & Motion`, `AI-Assisted Production`, `Other` | hardcoded + `services.ts` |
| helper (AI type) | `AI speeds up the work — the craft stays ours.` | hardcoded |
| placeholder message | `Brief, timeline, references...` | hardcoded |
| submit | `Send message` / `Sending...` | `site.contactSubmitLabel` / hardcoded |
| success | `Thank you. We've received your message and you'll hear back shortly.` | hardcoded |
| success CTA | `Send another message` | hardcoded |

### 2.8 `/film` — SEO + hero
| Поле | Текст | Джерело |
|---|---|---|
| title | `Film — LISENBART` | template |
| description | `Original stories, directed for the screen — not the client.` | `filmPage.title` |
| H1 name | `Film` | hardcoded |
| H1 lead | `Original stories, directed for the screen — not the client.` | `filmPage.title` |

### 2.9 `/film` — кейси (`work.ts` + `filmCategory` на /film)

**Unnecessary Things**
- meta: `Lisenbart Animation Studio · Film & Entertainment · Short Film · 2021`
- H2: `Unnecessary Things`
- laurels: `15 awards`, `45 selections`, `8.0 IMDb`
- body: `Award-winning 14-minute animated short — World Premiere at Shanghai, Best Animated Short Film at Curtas. A robot buys a human from a store of unwanted things; a friendship that ends where it began.`
- Result: `Festival winner across Europe and Asia — from Linoleum and ZIFF to Vancouver, Huesca and Odessa. Full 2D production: script, design, animation and festival delivery.`
- alt: `Unnecessary Things — trailer preview frame`
- vimeo: `823618245`

**The Last Kozak**
- meta: `… · Animated Feature · In development`
- H2: `The Last Kozak`
- badge: `Feature film in development`
- body: `80-minute animated feature · Drama · Action · Fantasy · 12+` + story paragraph
- Result: `Currently in development — script, treatment and pitch complete. English teaser available.`
- alt: `The Last Kozak — teaser preview frame`
- vimeo: `699197721`

**Pershosvit · Kapitan Świetlik** (на `/film` category = `Original IP · YouTube Channel`)
- lead/body/result/alt як у `work.ts` (Pershosvit)
- на `/work/social` category лишається `Social Media · YouTube Channel`

**Scoopy Cap** (на `/film` category = `Original IP · YouTube Channel`)
- аналогічно з `work.ts`

**Film contact CTA**
- lead: `For festival inquiries, co-productions or press — get in touch.` (`filmPage.contactLead`)
- кнопка: `Get in touch` (`filmPage.contactCtaLabel`)

### 2.10 `/commercial` — SEO + hero
| Поле | Текст | Джерело |
|---|---|---|
| title | `Commercial — LISENBART` | template |
| description | `Production leadership for brands, agencies and game studios.` | `commercialPage.title` |
| H1 name | `Commercial` | hardcoded |
| H1 lead | `Production leadership for brands, agencies and game studios.` | `commercialPage.title` |

### 2.11 `/commercial` — reel blocks + Trusted by + Testimonials + CTA

Див. §3 для reel-блоків.

**TrustedBySection**
- label: `Trusted by`
- brands: `Samsung`, `McDonald's`, `Nestlé`, `MasterCard`, `Playtika`, `Plarium`
- джерело: `site.trustedBy`

**TestimonialsSection**
- H2: `What clients say` (`testimonialsBlock.title`)
- кнопка: `Leave a review`
- 10 quotes у `src/data/testimonials.ts` (без змін у цій ітерації)
- modal copy з `site.testimonialsBlock.submitModal` / `readModal`

**Commercial contact CTA**
- lead: `Tell me about your project.`
- кнопка: `Discuss a project` (`site.ctaLabel`)

### 2.12 JSON-LD — `index.html`
| Поле | Текст |
|---|---|
| name | `LISENBART` |
| description | `I direct animation and film — for festivals, for brands, and for myself.` |
| founder | `Dmytro Lisenbart` |
| email | `info@lisenbart.com` |
| contactType | `Business Inquiries` |
| knowsAbout | `Film Production`, `Animation`, `Game Content` |
| sameAs | LinkedIn, YouTube, Facebook URLs |

### 2.13 Зведений список CTA / кнопок (видимі на поточній IA)

1. `Film` / `Commercial` — Header hub nav  
2. `Discuss a project` — Header (lg+), Footer, MobileEstimateCTA, `/commercial` CTA  
3. `Explore →` — Home Explore cards (×2)  
4. `Send message` / `Sending...` / `Send another message` — ContactForm  
5. `Get in touch` — `/film` CTA  
6. `Leave a review` / `Send review` / `Close` — Testimonials  
7. Showreel controls (aria): Play / Pause / Mute / Fullscreen / Share  
8. `Watch on YouTube` — на YouTube-кейсах (`WorkCaseBlock`)  
9. Theme / Connect / Email icon controls (aria labels)

---

## 3. Reel-блоки на `/commercial`

Компонент: **один shared** `ReelBlock` (`src/components/ReelBlock.tsx`) з props `id`, `label`, `text`, `videoId`, `comingSoonEndsAt?`.  
Внутрішньо: layout як film case (`work-block` media left + copy right); плеєр = `HeroShowreel` (або Coming Soon UI).  
Дані: `site.commercialPage.reels` у `site.ts`.  
Сторінка мапить масив → `<ReelBlock … />` — **не три окремі копії розмітки**.

| # | id | Label | Текст | Vimeo | Примітка |
|---|---|---|---|---|---|
| 1 | `ai-powered-reel` | `AI Powered` | `Concept exploration and rapid visual development — accelerated with AI-assisted tools, always finished by hand.` | `null` | `comingSoonEndsAt: 2026-07-27T18:00:00+02:00` — UI: COMING SOON + progress + countdown (`N days left`) |
| 2 | `advertising-reel` | `Advertising` | `Brand campaigns and commercial films for Samsung, McDonald's, Nestlé and MasterCard — from first concept to final delivery.` | `849899875` | підключено |
| 3 | `games-reel` | `Games` | `Trailers and cinematics for Playtika, Plarium and Moon Active — built to sell the moment before the click.` | `944158555` | підключено |

**Примітка до плану «New Formats»:** у коді лейбл першого блоку — **`AI Powered`**, не `New Formats`.

---

## 4. Trusted by — перевірка перенесення

| Очікування з промпту переносу | Факт у коді зараз |
|---|---|
| Видалено з Home | **Так** — немає в `HomePage.tsx` |
| Додано на `/commercial` | **Так** — `TrustedBySection` імпортовано |
| Розміщення: одразу після Hero, перед reel-блоками | **Ні** — зараз порядок: Hero → **reel-блоки** → **`TrustedBySection`** → Testimonials → Contact |

Дані `site.trustedBy` без змін.

---

## 5. Візуальний стан (текстовий опис)

### Home Hero
- **Desktop / tablet (≥768px):** горизонтальний split — кругле фото зліва (`border-radius: 50%`, `aspect-ratio: 1/1`, max ~14rem), текст справа (role, H1, positioning, proof). CTA Watch reel відсутній.
- **Mobile:** той самий горизонтальний split, компактніше фото (~6.75rem коло), менші шрифти.

### Home Showreel → Explore
- Trusted by між ними **немає**; секції йдуть через `site-main-stack` gap.

### Explore cards
- Дві картки Film / Commercial; лейбли з category-градієнтами як на hub-сторінках; збільшені розміри лейблів/заголовків.

### `/film` і `/commercial` hub headers
- Один рядок: **NAME | lead** (менший шрифт назви ~½ від попереднього hero-розміру), вертикальний sep, lead поруч.
- Картки кейсів/reeлів у контейнері `.film-cases`: окремі glass-картки, посилені border/shadow/gap.

### `/commercial` reel blocks
- Вертикальний стек із трьох однакових карток.
- Усередині кожної (md+): **ріл/медіа зліва**, **назва + опис справа** (`work-block--media-left`).
- Блок 1 (AI Powered): замість відео — COMING SOON + progress bar + countdown.
- Блоки 2–3: `HeroShowreel` з Vimeo.

### Spacing / overflow
- Після посилення карток (товстіший border, щільніший фон) блоки візуально відділені від фону `#f3f2ed`.
- Фіксований header: hub pages мають `padding-top` через `.work-page`.
- Mobile header: hub-лінки Film/Commercial; tagline ховається на дуже вузьких екранах.

---

## 6. Legacy / непідключений код

### Cleanup виконано (фізично видалено з репо / `site.ts`)
- `beyondTheTool`, `workModels`, `oneLiner`, `endToEndProduction`
- `hero.posterHeadlineLine1/Line2`, `founderQuote`
- Experience modals: `clientsModal`, `studioModal`, `awardsModal`, `teamModal`
- Компоненти: `AboutSection`, `*Popover` (Clients/Studio/Awards/Team), `BeyondTheToolSection`, `HowWeWorkSection`, `FounderQuoteSection`, `HeroSection` (старий), `EndToEndProductionSection`

### Ще існує в `site.ts`, але не рендериться на новій Home/hub IA
| Поле | Примітка |
|---|---|
| `hero.posterCtaLabel`, `headlineLine2BeforeAccent`, `headlineAccent`, `paragraph` | legacy AI/studio рядки |
| `hero.personalCta` (`Watch reel ↓`) | не рендериться в `PersonalHeroSection` |
| `capabilitiesLine` | лише якщо підключити `ServicesSection` (файл ще є) |
| `socialComingSoon`, `capabilityShowreelModal` | для інших UI-шляхів |
| `sectionIds.services`, `trusted` | ids лишаються; trusted секція на `/commercial` |

### Інше legacy
- `ServicesSection.tsx` — не на Home
- Повний `work.ts` + `/work/*` роути — активні за URL, не частина нової Home IA
- Testimonials data — активні на `/commercial`

---

## 7. Git-стан

**Гілка:** `main` ↔ `origin/main`  
**Останній commit на HEAD (і на remote, локально не ahead):**  
`8592fc8` — `Center Experience and Capabilities headers like End to end.` (2026-07-15)

**Uncommitted / untracked (робоче дерево після сесій):**

Modified (серед іншого):
- `site/index.html`, `site/src/App.tsx`, `site/src/data/site.ts`, `site/src/data/work.ts`
- `site/src/lib/routes.ts`, `site/src/pages/HomePage.tsx`, `site/vite.config.ts`
- `site/src/styles/index.css`, `site/src/styles/theme-light.css`
- `site/src/components/Header.tsx`, `Footer.tsx`, `HeroShowreel.tsx`, `WorkCaseBlock.tsx`
- Deleted legacy sections/popovers (AboutSection, HeroSection, BeyondTheTool, тощо)

Untracked (нові):
- `site/src/pages/FilmPage.tsx`, `CommercialPage.tsx`
- `site/src/components/PersonalHeroSection.tsx`, `ShowreelSection.tsx`, `ExplorePathsSection.tsx`, `PersonalAboutSection.tsx`, `TrustedBySection.tsx`, `ReelBlock.tsx`
- `site/public/images/portrait.png`
- `site/docs/` (strategy, copy audit, implementation status, цей звіт)
- `docs/claude_handoff_*.md`, `docs/copy_audit_report.md` (батьківський `Lisenbart Film/docs/`)

**Push:** зміни персональної IA **не закомічені й не запушені**; remote `origin/main` на старому commit `8592fc8`.

---

*Кінець звіту. Тільки фактичний виклад станом на 2026-07-17.*
