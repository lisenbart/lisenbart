# Copy audit report — lisenbart.com (user-facing)

**Дата зрізу:** 2026-07-17  
**Кодова база:** `/Users/dmytrolisenbart/Desktop/Lisenbart Film/site` (гілка `main`)  
**Призначення:** дослівний виклад усього user-facing копірайту для аналізу тону. Без оцінки якості.

---

## 0. Статус узгодженої нової структури

| Елемент узгодженого плану | Статус у коді зараз |
|---|---|
| Home Hero (портрет + ім’я + позиціонування + факти + CTA Watch reel) | **реалізовано** |
| Home Showreel + підпис | **реалізовано** |
| Home Trusted by (trust-strip) | **реалізовано** |
| Home FILM / COMMERCIAL картки-навігатори | **реалізовано** |
| Home About / Recognition | **реалізовано** |
| Home Contact (форма) | **реалізовано** |
| Home Experience (4 картки) | **видалено з Home** (компонент `AboutSection.tsx` лишився в репо, не підключений до `HomePage`) |
| Home блок Studio: GLOWL | **не реалізовано** (свідомо не додається на цьому етапі; `GlowlStudioSection` видалено) |
| Сторінка `/film` | **реалізовано** |
| Сторінка `/commercial` | **реалізовано** |
| Legacy `/work/*` категорії | **реалізовано** (старі work-роути лишаються; не частина нової IA-головної) |

---

## 1. Спільний chrome (усі сторінки)

### 1.1 Header — `src/components/Header.tsx` + `src/data/site.ts`

| Тип | Текст | Джерело |
|---|---|---|
| alt (logo light) | `LISENBART` | `BrandLogo.tsx` ← `site.brand` (`site.ts`) |
| alt (logo dark) | *(порожній alt, aria-hidden)* | `BrandLogo.tsx` |
| підпис / tagline line 1 | `Commercial · film` | `site.tagline.line1` |
| підпис / tagline line 2 | `Gaming · social` | `site.tagline.line2` |
| aria-label (home) | `LISENBART home` | hardcoded template + `site.brand` |
| aria-label (theme) | `Switch to light mode` / `Switch to dark mode` | hardcoded |
| aria-label (email) | `Email info@lisenbart.com` | template + `site.email` |
| мікрокопі кнопки CTA | `Discuss a project` | `site.ctaLabel` |
| aria-label (connect menu) | `Open connect menu` / `Close connect menu` | `HeaderConnectMenu.tsx` hardcoded |
| aria-label (connect panel) | `Connect with LISENBART` | `HeaderConnectMenu.tsx` hardcoded |

### 1.2 Footer — `src/components/Footer.tsx` + `site.ts`

| Тип | Текст | Джерело |
|---|---|---|
| aria-label (home) | `LISENBART home` | template + `site.name` |
| підпис / tagline line 1 | `Commercial · film` | `site.tagline.line1` |
| підпис / tagline line 2 | `Gaming · social` | `site.tagline.line2` |
| body-параграф (md+) | `I direct animation and film — for festivals, for brands, and for myself. Festival work, children’s IP, and commercial craft.` | `site.meta.description` |
| мікрокопі кнопки | `Discuss a project` | `site.ctaLabel` |
| label секції | `Navigate` | hardcoded |
| мікрокопі посилання | `Showreel` | hardcoded navLinks |
| мікрокопі посилання | `Explore` | hardcoded |
| мікрокопі посилання | `About` | hardcoded |
| мікрокопі посилання | `Contact` | hardcoded |
| мікрокопі посилання | `Film` | hardcoded |
| мікрокопі посилання | `Commercial` | hardcoded |
| label секції | `Connect` | hardcoded |
| мікрокопі посилання | `Email` | hardcoded |
| мікрокопі посилання | `WhatsApp` | hardcoded |
| мікрокопі посилання | `LinkedIn` | hardcoded |
| мікрокопі посилання | `Facebook` | hardcoded |
| мікрокопі посилання | `YouTube` | hardcoded |
| підпис / locations | `Ukraine · Canada · Poland · Remote worldwide` | `site.locations` |
| підпис / copyright | `© 2026 LISENBART` | template + `site.name` (рік динамічний) |

### 1.3 MobileEstimateCTA — `src/components/MobileEstimateCTA.tsx`

| Тип | Текст | Джерело |
|---|---|---|
| мікрокопі кнопки | `Discuss a project` | `site.ctaLabel` |

### 1.4 HeroShowreel controls (на Home Showreel) — `src/components/HeroShowreel.tsx`

| Тип | Текст | Джерело |
|---|---|---|
| iframe title | `LISENBART showreel` | hardcoded |
| share text | `LISENBART showreel` | hardcoded |
| aria-label | `Play showreel` | hardcoded |
| aria-label | `Pause showreel` | hardcoded |
| aria-label | `Unmute showreel` / `Mute showreel` | hardcoded |
| aria-label | `Fullscreen showreel` / `Exit fullscreen showreel` | hardcoded |
| aria-label | `Share showreel` | hardcoded |

---

## 2. Головна `/`

### 2.1 Meta / SEO — `HomePage.tsx` → `SEO.tsx` + `site.meta`

| Поле | Текст | Джерело |
|---|---|---|
| `<title>` / `og:title` / `twitter:title` | `Dmytro Lisenbart — Animation Director & Producer` | `site.meta.title` |
| `meta description` / `og:description` / `twitter:description` | `I direct animation and film — for festivals, for brands, and for myself. Festival work, children’s IP, and commercial craft.` | `site.meta.description` |
| `og:url` / canonical | `https://www.lisenbart.com` | `site.canonical` |
| `og:image` / `twitter:image` | `https://www.lisenbart.com/images/work/lisenbart-showreel-preview.jpg` | `site.meta.ogImage` + canonical |
| `og:type` | `website` | `SEO.tsx` hardcoded |

### 2.2 JSON-LD Organization — `index.html` (статичний, може розходитися з React meta)

| Поле | Текст | Джерело |
|---|---|---|
| name | `LISENBART` | `index.html` hardcoded |
| description | `From brief to screen — animation, film and AI content, produced end to end.` | `index.html` hardcoded |
| founder.name | `Dmytro Lisenbart` | `index.html` hardcoded |
| email | `info@lisenbart.com` | `index.html` hardcoded |
| contactType | `Business Inquiries` | `index.html` hardcoded |
| knowsAbout[] | `Film Production`, `Animation`, `Game Content`, `AI-assisted Production` | `index.html` hardcoded |

### 2.3 PersonalHeroSection

| Тип | Текст | Джерело |
|---|---|---|
| підпис / role | `Animation Director & Producer` | `site.hero.personalRole` |
| **H1** | `Dmytro Lisenbart` | `site.hero.personalName` *(у CSS `text-transform: uppercase` → візуально DMYTRO LISENBART)* |
| body-параграф | `I direct animation and film — for festivals, for brands, and for myself.` | `site.hero.personalPositioning` |
| підпис / proof | `20 years in animation · 1000+ projects delivered` | `site.hero.personalProof` |
| мікрокопі кнопки CTA | `Watch reel ↓` | `site.hero.personalCta` |
| alt-текст | `Portrait of Dmytro Lisenbart` | `site.hero.personalPortraitAlt` |

### 2.4 ShowreelSection

| Тип | Текст | Джерело |
|---|---|---|
| підпис / caption | `Creative & animation showreel — commercials, brand films and mixed media.` | `site.showreelSection.caption` |
| eyebrow у data (не рендериться в UI) | `Showreel` | `site.showreelSection.eyebrow` — **не виводиться** в поточному `ShowreelSection.tsx` |

### 2.5 TrustedBySection

| Тип | Текст | Джерело |
|---|---|---|
| підпис / label | `Trusted by` | `site.trustedBy.label` |
| підпис / brand | `Samsung` | `site.trustedBy.brands` |
| підпис / brand | `McDonald's` | `site.trustedBy.brands` |
| підпис / brand | `Nestlé` | `site.trustedBy.brands` |
| підпис / brand | `MasterCard` | `site.trustedBy.brands` |
| підпис / brand | `Playtika` | `site.trustedBy.brands` |
| підпис / brand | `Plarium` | `site.trustedBy.brands` |

### 2.6 ExplorePathsSection

| Тип | Текст | Джерело |
|---|---|---|
| підпис / eyebrow | `Explore` | `site.explorePaths.eyebrow` |
| **H2** | `Two sides of the work.` | `site.explorePaths.title` |
| підпис / card label | `Film` | `site.explorePaths.film.label` |
| **H3** | `Authored cinema & personal IP` | `site.explorePaths.film.title` |
| body-параграф | `Unnecessary Things · Last Kozak · Pershosvit · Scoopy Cap` | `site.explorePaths.film.text` |
| мікрокопі CTA | `Explore →` | `site.explorePaths.film.cta` + hardcoded ` →` у JSX |
| підпис / card label | `Commercial` | `site.explorePaths.commercial.label` |
| **H3** | `Brands & game studios` | `site.explorePaths.commercial.title` |
| body-параграф | `Campaign films, trailers and animation for brands and game studios.` | `site.explorePaths.commercial.text` |
| мікрокопі CTA | `Explore →` | `site.explorePaths.commercial.cta` + hardcoded ` →` |

### 2.7 PersonalAboutSection

| Тип | Текст | Джерело |
|---|---|---|
| підпис / eyebrow | `About` | `site.personalAbout.eyebrow` |
| **H2** | `About` | `site.personalAbout.title` |
| body-параграф | `Born in Lviv in 1975. Studied painting, then animation film directing at Kyiv’s Karpenko-Kary University. I founded my production practice after Mental dRive and have delivered commercial work across Ukraine, Europe and North America. I headed Ukranimafilm from 2017 to 2019 and co-founded UANIMA, the Ukrainian Animation Association.` | `site.personalAbout.bio` |
| підпис / recognition | `UANIMA · Head of Ukranimafilm, 2017–2019` | `site.personalAbout.recognition` |
| підпис / locations | `Canada · Ukraine · Poland — creative & production teams` | `site.personalAbout.locations` |

### 2.8 ContactForm

| Тип | Текст | Джерело |
|---|---|---|
| **H2** | `Contact` | hardcoded `ContactForm.tsx` |
| body-параграф | `Tell us about your project — you'll hear back within 24 hours.` | hardcoded |
| підпис (dev only) | `Dev: form mocks locally. On Netlify it uses Netlify Forms.` | hardcoded |
| body (success) | `Thank you. We've received your message and you'll hear back shortly.` | hardcoded |
| мікрокопі кнопки | `Send another message` | hardcoded |
| label поля | `Email` | hardcoded |
| підпис / required | `*` | hardcoded |
| placeholder | `you@company.com` | hardcoded |
| validation | `Email is required` | `contactSubmit.ts` |
| validation | `Enter a valid email` | `contactSubmit.ts` |
| label поля | `Name` | hardcoded |
| підпис / optional | `optional` | hardcoded |
| label поля | `Project type` | hardcoded |
| підпис / optional | `optional` | hardcoded |
| placeholder select | `Select type` | hardcoded |
| option | `Campaign & Brand Film` | `data/services.ts` `projectTypes` |
| option | `Game Trailer or Cinematic` | `projectTypes` |
| option | `Animation & Motion` | `projectTypes` |
| option | `AI-Assisted Production` | `projectTypes` |
| option | `Other` | `projectTypes` |
| підпис / helper (умовно) | `AI speeds up the work — the craft stays ours.` | hardcoded (якщо обрано AI-Assisted Production) |
| label поля | `Message` | hardcoded |
| підпис / optional | `optional` | hardcoded |
| placeholder | `Brief, timeline, references...` | hardcoded |
| мікрокопі кнопки submit | `Send message` | `site.contactSubmitLabel` |
| мікрокопі кнопки loading | `Sending...` | hardcoded |
| error fallback | `Could not send your message. Please try again or email us directly.` | `contactSubmit.ts` |

---

## 3. Сторінка `/film`

### 3.1 Meta / SEO — `FilmPage.tsx`

| Поле | Текст | Джерело |
|---|---|---|
| `<title>` / OG / Twitter title | `Film — LISENBART` | template ``Film — ${site.brand}`` |
| description / OG / Twitter | `Original stories, directed for the screen — not the client.` | `site.filmPage.title` |
| canonical / og:url | `https://www.lisenbart.com/film` | `site.canonical` + `routes.film` |
| og:image | same as site default showreel preview | `site.meta.ogImage` |

### 3.2 Film page Hero

| Тип | Текст | Джерело |
|---|---|---|
| підпис / eyebrow | `Film` | hardcoded `FilmPage.tsx` |
| **H1** | `Original stories, directed for the screen — not the client.` | `site.filmPage.title` |

### 3.3 WorkCaseBlock — Unnecessary Things (`data/work.ts`)

| Тип | Текст | Джерело |
|---|---|---|
| підпис / meta | `Lisenbart Animation Studio · Film & Entertainment · Short Film · 2021` | `client` / `category` / `year` |
| **H2** | `Unnecessary Things` | `title` |
| підпис / laurel | `15 awards` | `laurels[]` |
| підпис / laurel | `45 selections` | `laurels[]` |
| підпис / laurel | `8.0 IMDb` | `laurels[]` |
| body-параграф | `Award-winning 14-minute animated short — World Premiere at Shanghai, Best Animated Short Film at Curtas. A robot buys a human from a store of unwanted things; a friendship that ends where it began.` | `description` |
| label | `Result` | hardcoded `WorkCaseBlock.tsx` |
| body-параграф | `Festival winner across Europe and Asia — from Linoleum and ZIFF to Vancouver, Huesca and Odessa. Full 2D production: script, design, animation and festival delivery.` | `result` |
| alt-текст | `Unnecessary Things — trailer preview frame` | `mediaImageAlt` |
| aria-label play | `Play Unnecessary Things video` | template |

*(IMDb rating widget також рендерить динамічний рейтинг з API — не фіксований рядок у копі.)*

### 3.4 WorkCaseBlock — The Last Kozak

| Тип | Текст | Джерело |
|---|---|---|
| підпис / meta | `Lisenbart Animation Studio · Film & Entertainment · Animated Feature · In development` | work.ts |
| **H2** | `The Last Kozak` | `title` |
| підпис / status badge | `Feature film in development` | `statusBadge` |
| body lead | `80-minute animated feature · Drama · Action · Fantasy · 12+` | `description` line 1 |
| body | `He has no name — everyone calls him the Last Kozak. Trapped in a time loop, he must defeat evil again and again. A stylized action-fantasy with comic-book editing, psychological depth and a cossack who rides the Iron Dog through worlds that intersect at the Last Khreshchatyk.` | `description` rest |
| label | `Result` | hardcoded |
| body | `Currently in development — script, treatment and pitch complete. English teaser available.` | `result` |
| alt-текст | `The Last Kozak — teaser preview frame` | `mediaImageAlt` |

### 3.5 WorkCaseBlock — Scoopy Cap

| Тип | Текст | Джерело |
|---|---|---|
| підпис / meta | `Scoopy Cap · Social Media · YouTube Channel · 2024` | work.ts |
| **H2** | `Scoopy Cap` | `title` |
| body lead | `225 videos · 10.4K subscribers · weekly hits that kids replay` | `description` line 1 |
| body | `Full English preschool channel — nursery rhymes, ABC, colours and numbers built around Scoopy Cap, a friendly space explorer designed for calm watch-time and repeat views.` | `description` rest |
| label | `Result` | hardcoded |
| body | `Finger Family became the channel's top-performing video. New full songs every Saturday, Shorts through the week — a content engine built to grow.` | `result` |
| alt-текст | `Scoopy Cap YouTube channel` | `mediaImageAlt` |

### 3.6 WorkCaseBlock — Pershosvit

| Тип | Текст | Джерело |
|---|---|---|
| підпис / meta | `Pershosvit · Social Media · YouTube Channel · 2024` | work.ts |
| **H2** | `Pershosvit · Kapitan Świetlik` | `title` |
| body lead | `147K subscribers · 274 videos · breakout hits in Ukrainian` | `description` line 1 |
| body | `The country's leading preschool channel — songs, fairy tales and learning with Kapitan Świetlik, a robot hero parents trust and kids watch on repeat.` | `description` rest |
| label | `Result` | hardcoded |
| body | `Baby Shark UA became a channel phenomenon. Alphabet, bedtime and learning series driving daily growth across Ukraine.` | `result` |
| alt-текст | `Pershosvit YouTube channel` | `mediaImageAlt` |

### 3.7 Film Contact CTA

| Тип | Текст | Джерело |
|---|---|---|
| body-параграф | `For festival inquiries, co-productions or press — get in touch.` | `site.filmPage.contactLead` |
| мікрокопі кнопки | `Discuss a project` | `site.ctaLabel` |

---

## 4. Сторінка `/commercial`

### 4.1 Meta / SEO — `CommercialPage.tsx`

| Поле | Текст | Джерело |
|---|---|---|
| `<title>` / OG / Twitter title | `Commercial — LISENBART` | template ``Commercial — ${site.brand}`` |
| description / OG / Twitter | `Production leadership for brands, agencies and game studios.` | `site.commercialPage.title` |
| canonical / og:url | `https://www.lisenbart.com/commercial` | canonical + route |
| og:image | default showreel preview | `site.meta.ogImage` |

### 4.2 Commercial Hero

| Тип | Текст | Джерело |
|---|---|---|
| підпис / eyebrow | `Commercial` | hardcoded |
| **H1** | `Production leadership for brands, agencies and game studios.` | `site.commercialPage.title` |

### 4.3 Capabilities

| Тип | Текст | Джерело |
|---|---|---|
| підпис / eyebrow | `Capabilities` | hardcoded |
| body / list item | `Game trailers & cinematics` | `site.commercialPage.capabilities` |
| body / list item | `Brand campaigns` | `capabilities` |
| body / list item | `Social & IP content` | `capabilities` |

### 4.4 Case highlights

| Тип | Текст | Джерело |
|---|---|---|
| підпис / eyebrow | `Case highlights` | hardcoded |
| **H2** | `Selected clients` | hardcoded |
| підпис / client | `Playtika` | `featuredClients` |
| підпис / client | `Plarium` | `featuredClients` |
| підпис / client | `Moon Active` | `featuredClients` |
| підпис / client | `Voodoo` | `featuredClients` |
| підпис / client | `HelloFresh` | `featuredClients` |
| підпис / client | `Samsung` | `featuredClients` |
| підпис / client | `McDonald's` | `featuredClients` |
| підпис / client | `Nestlé` | `featuredClients` |
| підпис / client | `MasterCard` | `featuredClients` |

### 4.5 TestimonialsSection / TestimonialsBlock

| Тип | Текст | Джерело |
|---|---|---|
| **H2** (блоку) | `What clients say` | `site.testimonialsBlock.title` |
| мікрокопі кнопки | `Leave a review` | `site.testimonialsBlock.addLabel` |
| aria-label | `Client testimonials` | hardcoded `TestimonialsSection` / block |
| aria-label | `Testimonial slides` | hardcoded |
| aria-label | `Slide N of M` | template |

**Кожна картка** (`src/data/testimonials.ts`) — quote / name / company:

1. `"A reliable production partner for over 6 years. We keep coming back — and we're never disappointed."` — Lena Feldman — Playtika  
2. `"Fast, reliable, and always on brief — even when timelines shift."` — Maya Cohen — Plarium  
3. `"Clear communication from kickoff to final delivery."` — David Weiss — Moon Active  
4. `"Consistent quality across every campaign we run together."` — Rachel Ortiz — Product Madness  
5. `"They handle complexity so we can focus on launch."` — Antoine Dubois — Voodoo  
6. `"Smooth production, strong creative, zero drama."` — Tom Becker — HelloFresh  
7. `"Flexible team, sharp execution — a real partner."` — Jin Park — Samsung  
8. `"Our go-to studio for animation under tight deadlines."` — Sarah Mitchell — McDonald's  
9. `"Trusted for years — they always deliver on time."` — Elena Rossi — Nestlé  
10. `"One point of contact, end-to-end — exactly what we need."` — James Carter — MasterCard  

**Submit modal** (`site.testimonialsBlock.submitModal`):

| Тип | Текст |
|---|---|
| title | `Leave a review` |
| subtitle | `Sent for moderation before publishing` |
| label | `Your review` |
| label | `Your name` |
| label | `Company` |
| label | `Rating` |
| мікрокопі | `No rating` |
| submit | `Send review` |
| loading | `Sending...` |
| close | `Close` |
| success | `Review submitted and will be added as soon as possible.` |
| validation | `Please check the highlighted fields.` |

**Read modal close:** `Close`

Коментар у `testimonials.ts`: `Temporary client quotes for layout preview — replace with real testimonials (max 10).`

### 4.6 Commercial Contact CTA

| Тип | Текст | Джерело |
|---|---|---|
| body-параграф | `Tell me about your project.` | `site.commercialPage.contactLead` |
| мікрокопі кнопки | `Discuss a project` | `site.ctaLabel` |

---

## 5. Зведений список усіх CTA / кнопок (видимі на поточній IA)

1. `Watch reel ↓` — Home Hero  
2. `Explore →` — Home FILM card  
3. `Explore →` — Home COMMERCIAL card  
4. `Discuss a project` — Header  
5. `Discuss a project` — Footer  
6. `Discuss a project` — MobileEstimateCTA  
7. `Discuss a project` — `/film` contact CTA  
8. `Discuss a project` — `/commercial` contact CTA  
9. `Send message` — Contact form submit  
10. `Sending...` — ContactForm loading  
11. `Send another message` — ContactForm success  
12. `Leave a review` — Testimonials  
13. `Send review` / `Sending...` / `Close` — Testimonials modals  
14. Showreel controls (aria): `Play showreel`, `Pause showreel`, `Mute`/`Unmute`, `Fullscreen`/`Exit`, `Share showreel`

---

## 6. Текст, позначений у handoff як «не можна змінювати без дозволу»

Джерела: `docs/claude_handoff_site_audit.md` §3, `docs/claude_handoff_latest_changes.md` §User constraints.

| Захищений рядок (з handoff) | Де був / є зараз | Примітка |
|---|---|---|
| `The right team. ` + `End to end` | було в EndToEnd / hero accent | **не на новій Home**; рядок лишився в `site.hero.headlineLine2BeforeAccent` / `headlineAccent` (legacy data) |
| `From brief to screen — animation, film and AI content, produced end to end.` | EndToEnd lead / meta / footer | **не на новій Home React meta**; досі в `site.oneLiner`, `site.hero.paragraph`, і **дослівно в `index.html` JSON-LD description** |
| Experience stats: `1000+`, `15 awards`, `45 selections`, `8.0 on IMDb`, `20 years`, `Canada • Ukraine • Poland` | Experience block | частково **перенесено**: proof-рядок на Home Hero; locations у About; awards laurels на `/film`; Experience-сітка з Home знята |
| Testimonials quotes/companies | `testimonials.ts` | **активні** на `/commercial`; handoff каже не чіпати без дозволу; файл сам маркує як temporary/test |
| Popover modal copy (clients/studio/awards/team) | `site.ts` modals | **не на новій Home** (Experience popovers не підключені), дані в `site.ts` лишилися |

---

## 7. Legacy / не на новій IA (але ще в репо)

Не рендериться на Home / `/film` / `/commercial` через поточний `HomePage`, але текст існує в коді:

- `site.beyondTheTool.*`, `site.workModels.*`, `site.endToEndProduction.*`
- `site.hero.posterHeadlineLine1` = `Powered by AI. Directed by us.` (legacy)
- `site.hero.posterHeadlineLine2` = `Moving image for brands, agencies and game studios.`
- `site.founderQuote` = `The AI era — guided by a professional eye.` / `Dmytro Lisenbart`
- Повні `AboutSection` Experience cards + modals (`studioModal`, `awardsModal`, `teamModal`, `clientsModal`)
- Legacy `/work/*` case studies поза `filmPage.caseIds`

---

*Кінець звіту. Тільки фактичний виклад з коду станом на дату зрізу.*
