# Pre-launch check — lisenbart.com

**Дата:** 2026-07-17  
**Кодова база:** `/Users/dmytrolisenbart/Desktop/Lisenbart Film/site`  
**Гілка:** `main` (локально ≠ remote — див. §7)  
**Мета:** технічна й фактична готовність до деплою на домен. Без оцінки копірайту чи тону.

**Легенда:** 🔴 блокер деплою · 🟡 варто виправити (не блокує) · 🟢 ок

---

## 1. Консистентність даних і цифр

### 1.1 Стаж / досвід (35 / 20)

| Місце | Формулювання | Статус |
|---|---|---|
| Hero (`site.hero.personalProof`) | `35 years in animation · 20 years producing · 1000+ projects delivered` | 🟢 |
| About bio | немає змішаного «X years» рядка; команди UA/CA/PL в тексті | 🟢 |
| Meta title/description | без цифр стажу | 🟢 |
| JSON-LD | без цифр стажу; founder = Dmytro Lisenbart | 🟢 |
| Footer | без рядка стажу | 🟢 |

**Висновок:** змішаного старого варіанту («35 years producing» тощо) на живих поверхнях немає. 🟢

### 1.2 Числа (1000+ / 15 / 45 / 8.0)

| Число | Де з’являється | Статус |
|---|---|---|
| `1000+ projects` | лише Hero proof | 🟢 однакова (єдине місце) |
| `15 awards` / `45 selections` / `8.0 IMDb` | laurels кейсу *Unnecessary Things* у `work.ts` | 🟢 не дублюються з іншими формулюваннями |

### 1.3 Локації команди

| Місце | Текст | Статус |
|---|---|---|
| About (`personalAbout.locations`) | `Canada · Ukraine · Poland — creative & production teams` | 🟡 |
| Footer (`site.locations`) | `Ukraine · Canada · Poland · Remote worldwide` | 🟡 інший **порядок** (UA→CA vs CA→UA) і суфікс |
| Bio (проза) | `Ukraine, Canada and Poland` | 🟡 третій порядок |
| JSON-LD `areaServed` | `["Ukraine", "Worldwide"]` | 🟡 немає Canada/Poland; не відображає footer/about |

**Висновок:** факти (три країни) збігаються; порядок і schema — неузгоджені. Не блокер, але варто вирівняти перед публікацією.

---

## 2. Побиті або мертві посилання / якорі

### 2.1 Внутрішні лінки (жива IA)

| Джерело | Ціль | Статус |
|---|---|---|
| Header Film / Commercial | `/film`, `/commercial` | 🟢 роути існують, prerender є |
| Header logo | `/` або `#top` | 🟢 |
| Header / Footer / Mobile CTA → Contact | `#contact` / `/#contact` | 🟢 секція на Home |
| Footer Showreel / About / Contact | `#showreel`, `#about`, `#contact` | 🟢 на Home; з hub — `/#…` |
| Footer Film / Commercial | `/film`, `/commercial` | 🟢 |
| Explore cards | `/film`, `/commercial` | 🟢 |
| `/film` і `/commercial` CTA | `/#contact` | 🟢 |
| Work case CTA | `/#contact` | 🟢 |

Мертвих CTA на `#trusted` / `#services` у Header/Footer/Explore **немає**. 🟢

### 2.2 `sectionIds` у `site.ts`

| id | Використання | Статус |
|---|---|---|
| `showreel`, `about`, `explore`, `contact` | живі секції / навігація | 🟢 |
| `trusted` | `TrustedBySection` на `/commercial` | 🟢 не в nav, але секція є |
| `services` | лише `MobileEstimateCTA` observer + мертвий `ServicesSection.tsx` (не в дереві сторінок) | 🟡 |

**MobileEstimateCTA:** шукає `#services`, якого немає на новій IA → `servicesVisible` лишається `false`. Бар усе одно з’являється після проходження intro на Home (`aria-label="Introduction"`). На `/film` і `/commercial` intro-секції немає — логіка видимості може відрізнятися від задуму (бар через DOM/scroll heuristics). Це не зламане посилання, а legacy observer. 🟡

### 2.3 Build / assets для маршрутів

- `npm run build` — успіх; prerender: `/`, `/film`, `/commercial`, `/work/*`. 🟢  
- Catch-all у `netlify.toml` (`/*` → `/index.html` 200) після static files — стандартний SPA fallback; prerendered hub HTML у `dist/film`, `dist/commercial` присутні. 🟢

---

## 3. Мета / SEO / Schema

### 3.1 Title / description по сторінках

| Сторінка | Title | Description | Статус |
|---|---|---|---|
| `/` | `Dmytro Lisenbart — Animation Director & Producer` | персональний meta description | 🟢 |
| `/film` | `Film — LISENBART` | = `filmPage.title` (lead) | 🟢 відрізняється від Home |
| `/commercial` | `Commercial — LISENBART` | = `commercialPage.title` (lead) | 🟢 відрізняється від Home і Film |

Дублікатів title між трьома hub-сторінками немає. Hub description = короткий lead (не повний marketing paragraph) — свідомий вибір, не суперечність. 🟢

### 3.2 og:image

- Шлях: `publicAsset("/images/work/lisenbart-showreel-preview.jpg")`  
- Файл існує: `public/images/work/lisenbart-showreel-preview.jpg` (~79 KB). 🟢  
- Portrait для hero: `public/images/portrait.png` — є. 🟢

### 3.3 JSON-LD (`index.html`) vs React meta

| Поле | JSON-LD | React meta | Статус |
|---|---|---|---|
| Voice / description | I-voice, без AI-pitch | узгоджено (meta довша на 1 речення) | 🟢 / 🟡 дрібна різниця довжини |
| founder | Dmytro Lisenbart | — | 🟢 |
| knowsAbout | Film Production, Animation, Game Content | без AI-мови | 🟢 |
| sameAs | LinkedIn, YouTube, Facebook | збігається з `site.social` | 🟢 |
| AI / studio pitch | відсутній | відсутній у Home meta | 🟢 |

---

## 4. Візуальна цілісність (за кодом / CSS, без скріншотів)

Перевірка: розмітка Home, `/film`, `/commercial` + стилі `index.css` / `theme-light.css` (desktop + mobile breakpoints ~768px / компактні hero rules). Живий браузерний прогін 375px у цій сесії не виконувався.

### 4.1 Home

- Порядок: Hero → Showreel → Explore → About → Contact. Trusted by **немає**. 🟢  
- Hero: фото зліва (коло), текст справа; `personalCta` у даних не рендериться — зайвого CTA немає. 🟢  
- Mobile: окремі розміри для proof/name/media; `overflow-x: clip` на shell. Ознак обрізання proof-рядка в CSS немає; довгий proof на ~375px варто швидко глянути очима після деплою preview. 🟡 (лише smoke, не доказ бага)

### 4.2 `/film`

- Hub header один рядок `NAME | lead`; кейси в `.film-cases` з media-left / title-first на вузьких екранах. 🟢  
- CTA внизу → contact. 🟢

### 4.3 `/commercial`

- Порядок: hub header → **Trusted by** → 3× `ReelBlock` (AI Powered → Advertising → Games) → Testimonials → CTA. 🟢  
- Shared `ReelBlock`, media left / copy right. 🟢

### 4.4 Coming Soon (AI Powered)

- `vimeoId: null` + `comingSoonEndsAt: 2026-07-27T18:00:00+02:00`  
- UI: COMING SOON + progressbar + `N days left` / `Available soon`; окремий media-блок без плеєра. 🟢  
- На дату звіту (2026-07-17) countdown у вікні 10 днів — коректний стан «без відео». 🟢

### 4.5 Light / dark theme

- Токени `--text-*` для обох тем; toggle у Header; early script у `index.html` ставить `data-theme`. 🟢  
- Light overrides для coming-soon progress є в `theme-light.css`. Критичних hardcoded contrast breaks у нових секціях (personal-hero, explore, hub, film-cases) за CSS-оглядом не видно. 🟢  
- Рекомендація після деплою: швидкий smoke toggle на трьох URL (не блокер).

---

## 5. Форма контакту — робочий стан

### 5.1 Netlify Forms

| Перевірка | Факт | Статус |
|---|---|---|
| Handler за замовчуванням | `netlify` (`contactConfig.ts`) | 🟢 |
| Live submit | `PROD` → реальний POST; dev → mock | 🟢 |
| Build-time detection | прихований `<form name="contact" data-netlify="true">` в `index.html` | 🟢 |
| Runtime submit | `fetch` + `application/x-www-form-urlencoded` + `form-name=contact` | 🟢 |
| Success UI | «Thank you. We've received…» + «Send another message» | 🟢 |
| Validation | email required / invalid email messages у `validateContact` | 🟢 |

React-форма **не** дублює `data-netlify` на собі — це очікуваний патерн (static hook + JS POST). 🟢

### 5.2 Project type «AI-Assisted Production»

- Опція в `services.ts` присутня. 🟢  
- Helper: `AI speeds up the work — the craft stays ours.`  
- Секція AI Powered: *accelerated with AI-assisted tools, always finished by hand.*  

Змісту helper **не суперечить** секції (обидва: AI прискорює / craft залишається). 🟢  
🟡 Нюанс: у формі лейбл опції «AI-Assisted Production», на сторінці — «AI Powered» — різні назви однієї ідеї (не зламаний UI).

---

## 6. Порівняння з `full_site_report_2026-07-17.md`

| Відкритий пункт попереднього звіту | Статус зараз |
|---|---|
| Trusted by: було **після** reels | **Закрито** — зараз одразу після hub header, перед reels 🟢 |
| Reel order AI → Advertising → Games | Без змін, коректно 🟢 |
| Shared `ReelBlock` | Без змін 🟢 |
| Trusted by знято з Home | Без змін 🟢 |
| Legacy поля в `site.ts` (`paragraph` AI one-liner, `personalCta`, `capabilitiesLine`) | Досі є, не рендеряться на новій IA 🟡 |
| `ServicesSection` не на Home | Досі так 🟢 |
| Локації About vs Footer | Досі розходяться 🟡 (було й раніше) |
| Git: uncommitted personal IA | **Досі** — HEAD remote `8592fc8`, зміни локальні 🔴 *для git-деплою* |

**Нові розбіжності після правок:** критичних нових broken links / missing assets не виявлено. Єдине «нове» відносно очікування попереднього звіту — **виправлена** позиція Trusted by (тепер відповідає задуму).

---

## 7. Загальний вердикт готовності

### Критичні блокери коду / збірки

| Пункт | Статус |
|---|---|
| Помилка збірки | немає — build OK 🟢 |
| Відсутній og:image / portrait | немає 🟢 |
| Зламані внутрішні лінки на живу IA | немає 🟢 |
| Форма без Netlify hook | ні — hook є 🟢 |

### Процес деплою (окремо від якості коду)

| Пункт | Статус |
|---|---|
| Поточна персональна IA **не закомічена і не на `origin/main`** | 🔴 якщо Netlify тягне з Git — на домен піде **стара** версія, не ця |
| Потрібен commit + push (або manual deploy `dist`) перед публікацією цієї IA | 🔴 процес |

### Некритичні зауваження (можна після launch або в тому ж PR)

1. 🟡 Вирівняти порядок локацій (About / Footer / bio) + оновити JSON-LD `areaServed`.  
2. 🟡 Прибрати або підчистити unused `sectionIds.services` / observer у `MobileEstimateCTA`.  
3. 🟡 Прибрати мертві legacy strings у `site.hero` (`paragraph` з AI, `personalCta`).  
4. 🟡 Узгодити naming AI option у формі vs «AI Powered» (опційно).  
5. 🟡 Smoke UI на 375px + theme toggle після preview URL.

---

## Вердикт

**Код поточної робочої копії технічно готовий до публікації:** збірка проходить, маршрути prerender’яться, лінки живі, мета/og/JSON-LD узгоджені з персональною IA, форма налаштована на Netlify Forms, Trusted by і reel-порядок відповідають задуму.

**Блокер для деплою «цієї» версії на домен через Git:** зміни ще не в remote. Без commit/push (або окремого upload `dist`) домен не отримає поточний сайт.

**Після потрапляння білду на хостинг:** блокуючих дефектів контенту/роутів не залишилось; лишаються лише жовті consistency/cleanup пункти вище.
