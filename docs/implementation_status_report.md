# Implementation status report — lisenbart.com

**Дата зрізу:** 2026-07-17  
**Кодова база:** `/Users/dmytrolisenbart/Desktop/Lisenbart Film/site` (гілка `main`)  
**Призначення:** фактичний стан того, що впроваджено в коді й як це працює на сайті зараз. Без оцінки копірайту.

---

## 1. Позиціонування (що зараз є)

Сайт **lisenbart.com** зібраний як **персональний сайт Dmytro Lisenbart** (Animation Director & Producer), голос «I».

- **Не на головній / hub-сторінках:** студійний пітч GLOWL, AI-era messaging як головний меседж, Project/Embedded models, Beyond the tool.
- **Окремий бренд GLOWL** (студія advertising + AI) — свідомо **не** реалізований на цьому сайті на цьому етапі.

---

## 2. Роутинг і оболонка

| Шлях | Що рендериться | Як |
|---|---|---|
| `/` | `HomePage` | pathname-роутинг у `App.tsx` + `lib/routes.ts` (без React Router) |
| `/film` | `FilmPage` | hub-сторінка |
| `/commercial` | `CommercialPage` | hub-сторінка |
| `/work/commercial`, `/work/gaming`, `/work/film`, `/work/social` | legacy work-категорії + `WorkNav` | лишаються; не є основною IA головної |
| `/work` | редірект на `/work/commercial` | canonical redirect |

**Спільна оболонка на всіх сторінках:** `Header` → main → `Footer` → `MobileEstimateCTA`.

**Prerender (build):** `/`, `/film`, `/commercial`, плюс legacy `/work/*`.

---

## 3. Головна `/` — секції зверху вниз

| # | Секція / компонент | Що показує | Джерело даних |
|---|---|---|---|
| 1 | `PersonalHeroSection` | Портрет **зліва** (зменшений), текст справа: role, ім’я, positioning, proof, CTA «Watch reel ↓» → скрол до showreel | `site.hero.personal*` |
| 2 | `ShowreelSection` | Eyebrow «Showreel», Vimeo-плеєр (`HeroShowreel`, ID `849899875`), caption під відео | `site.showreelSection` + hardcoded Vimeo ID у `HeroShowreel.tsx` |
| 3 | `TrustedBySection` | Quiet trust-strip: Trusted by + бренди | `site.trustedBy` |
| 4 | `ExplorePathsSection` | Дві картки-навігатори: Film → `/film`, Commercial → `/commercial` | `site.explorePaths` |
| 5 | `PersonalAboutSection` | About: bio, recognition, locations | `site.personalAbout` |
| 6 | `ContactForm` | Форма inquiry (email обов’язковий) | частина hardcoded у компоненті + `site.contactSubmitLabel` + `projectTypes` з `data/services.ts` |

**Немає на головній (свідомо):** Experience 4-картки, GLOWL-блок, End-to-End / Beyond the tool / How we work.

---

## 4. Сторінка `/film`

| Блок | Як працює |
|---|---|
| Hero | Eyebrow «Film» + H1 з `site.filmPage.title` |
| Кейси | `getWorkCasesByIds(filmPage.caseIds)` → `WorkCaseBlock` |
| Порядок кейсів | 1) Unnecessary Things 2) The Last Kozak 3) Pershosvit 4) Scoopy Cap |
| Категорія IP-кейсів | На `/film` для Pershosvit і Scoopy Cap показується `filmCategory`: **Original IP · YouTube Channel**; на legacy `/work/social` лишається **Social Media · YouTube Channel** |
| Contact CTA | Lead з `filmPage.contactLead`; кнопка **Get in touch** (`filmPage.contactCtaLabel`) → `/#contact` |

---

## 5. Сторінка `/commercial`

| Блок | Як працює |
|---|---|
| Hero | Eyebrow «Commercial» + H1 з `site.commercialPage.title` |
| Capabilities | Список з `commercialPage.capabilities` |
| Selected clients | Сітка з `commercialPage.featuredClients` |
| Testimonials | Повний `TestimonialsSection` (дані в `testimonials.ts` — не чіпались) |
| Contact CTA | Lead «Tell me about your project.»; кнопка **Discuss a project** (`site.ctaLabel`) → `/#contact` |

---

## 6. Header / Footer / CTA

### Tagline
- **Зараз:** один рядок `Film · Commercial` (`site.tagline.line1`; `line2` порожній і не рендериться).

### Footer Navigate
- Showreel · About · Contact · **Film** · **Commercial**
- Лінк **Explore** прибрано (навігація покрита Film/Commercial).

### CTA-формулювання
| Місце | Текст |
|---|---|
| Header, Footer, Mobile bar, `/commercial` CTA | `Discuss a project` |
| Home Hero | `Watch reel ↓` |
| Explore-картки | `Explore →` |
| Contact form | `Send message` |
| `/film` contact | `Get in touch` |

---

## 7. SEO / schema (поточний стан)

| Місце | Стан |
|---|---|
| React `SEO` на Home | title/description з `site.meta` (персональний, без AI-пітчу) |
| `/film`, `/commercial` | title `Film/Commercial — LISENBART`; description = hero H1 сторінки |
| `index.html` JSON-LD | `description` узгоджено з персональним позиціонуванням; з `knowsAbout` прибрано `AI-assisted Production` |

---

## 8. Що впроваджено в цій ітерації (чеклист змін)

| Зміна | Статус |
|---|---|
| Tagline → `Film · Commercial` | ✅ |
| FILM-картка text → shorts / feature / IP universes | ✅ |
| `/film` CTA окремо: Get in touch | ✅ |
| JSON-LD без AI-мови | ✅ |
| Видалено з `site.ts`: `beyondTheTool`, `workModels`, `posterHeadline*`, `founderQuote` | ✅ |
| Видалені мертві секції-компоненти, що їх рендерили | ✅ |
| Pershosvit/Scoopy Cap на `/film` → Original IP (через `filmCategory`) | ✅ |
| Showreel eyebrow рендериться | ✅ |
| Footer без Explore | ✅ |
| Hero: фото зліва, текст справа | ✅ |
| Hero: фото зменшено | ✅ |
| Showreel Vimeo | ✅ працює (було через неоплачений акаунт Vimeo, не через код) |

---

## 9. Узгоджена IA vs код

| Елемент плану | Статус |
|---|---|
| Home Hero (портрет + I-voice + Watch reel) | **реалізовано** |
| Showreel + caption (+ eyebrow) | **реалізовано** |
| Trusted by strip | **реалізовано** |
| FILM / COMMERCIAL картки | **реалізовано** |
| About | **реалізовано** |
| Contact | **реалізовано** |
| `/film` hub | **реалізовано** |
| `/commercial` hub | **реалізовано** |
| GLOWL / studio блок на персональному сайті | **не реалізовано** (свідомо) |
| Experience 4-картки на Home | **знято** з Home |

---

## 10. Де живе контент (для подальших правок)

| Що міняти | Файл |
|---|---|
| Більшість home / film / commercial копі | `src/data/site.ts` |
| Кейси, laurels, media IDs | `src/data/work.ts` |
| Testimonials | `src/data/testimonials.ts` (захищені / test — не чіпати без дозволу) |
| Типи проєкту у формі | `src/data/services.ts` |
| Showreel Vimeo ID / плеєр | `src/components/HeroShowreel.tsx` (+ `site.vimeo` для share) |
| JSON-LD Organization | `index.html` |
| Роути | `src/lib/routes.ts`, `App.tsx` |

---

## 11. Legacy / ще в репо, але не на новій IA

- Legacy `/work/*` категорії з `WorkNav` — доступні за прямими URL.
- У `site.ts` ще лишаються непідключені AI-era рядки в `hero.paragraph` / `capabilitiesLine` (не рендеряться на новій Home).
- Experience grid + popovers **видалені** з репо (2026-07-17 cleanup).

---

## 12. Tenure copy (2026-07-17)

| Правило | Значення |
|---|---|
| Загальний стаж в анімації | **35 years in animation** |
| Продюсерський / production leadership | **20 years producing** |
| Обсяг робіт | **1000+ projects delivered** |

**Live зараз:**
- Hero proof: `35 years in animation · 20 years producing · 1000+ projects delivered`
- About bio: команда UA/CA/PL інтегрована в розповідь; цифр стажу в bio немає
- meta / JSON-LD / footer: років стажу **немає** (лише позиціонування)

**Видалено з live-шляху (було змішано / двозначно):**
- Experience card «20 years / in animation since 2006» (`AboutSection` + `studioModal`) — видалено разом із непідключеними popovers
- `oneLiner`, `endToEndProduction`, `clientsModal` / `studioModal` / `awardsModal` / `teamModal`

**Не чіпали (неоднозначно або захищено):**
- Testimonials quotes з «years» — не tenure бренду
- Legacy `/work` showreel copy «we have been doing this for a long time» — без числа
- `capabilitiesLine` / `hero.paragraph` (AI-era legacy strings) — не рендеряться на новій Home; не згадують 20/35

*Кінець звіту.*

