# LISENBART.com — звіт для ChatGPT: стратегія та копірайтинг

**Мета цього файлу:** дати ChatGPT повний контекст сайту, щоб він працював над **маркетинговою стратегією**, **позиціонуванням** та **текстами** (EN → потім PL/UA).  
**Не про код:** верстка вже зібрана; копірайт потрапляє в `www/lang/en.json` (і дзеркально `pl.json`, `ua.json`).

**Домен:** lisenbart.com  
**Бренд:** LISENBART (без «Production»)  
**Контакт:** info@lisenbart.com

---

## 1. Що просимо від ChatGPT (завдання)

1. **Стратегія:** чітке позиціонування для 3 аудиторій (Film/Brand, Mobile Games, Original IP).
2. **Копірайт:** переписати/посилити тексти під B2B-продаж у Європі (PL/EN ринки + UA для ідентичності).
3. **Hero:** запропонувати headline + subline для головної (зараз лише «Animation Studio» + гео).
4. **IP:** однопараграфні пітчі для 5 проєктів (зараз PLACEHOLDER).
5. **Кейси:** one-liners для Film і Games (+ майбутні кейси).
6. **Єдиний голос:** студія **«we»**, не особистий блог режисера.
7. **Факти:** не вигадувати цифри — див. розділ «Канон фактів».
8. **Формат відповіді:** таблиці або JSON-подібні блоки по ключах `lang/en.json`, щоб розробник міг вставити 1:1.

**Не просимо зараз:** змінювати структуру сторінок, додавати нові секції, ціни в €, технічний SEO-код.

---

## 2. Бізнес-контекст

| Параметр | Значення |
|----------|----------|
| Що продаємо | B2B анімація: агенції, бренди, mobile game studios; окремо — копродукція IP |
| Ринок | Польща + ЄС (пріоритет), міжнародні клієнти |
| Диференціатор | Людська режисура + AI-прискорення продакшену (швидше без втрати якості) |
| Довірча база | 30+ років досвіду режисера, студія з 2006, 1000+ комерційних проєктів, нагороджений короткометр |
| Команда | Розподілена: Україна, Польща, Канада |
| Мови сайту | English (default), Polish, Ukrainian — **без російської** |

**Засновник у тексті:** Dmytro Lisenbart — animation director/producer, згадується в About як засновник, але **голос бренду = студія**, не «я-режисер» у заголовках.

---

## 3. Аудиторії та сторінки

| Сторінка | URL | Хто читає | Що має зрозуміти за 10 сек |
|----------|-----|-----------|----------------------------|
| Головна | `index.html` | Усі | Хто ви, 3 напрямки, чому вам довіряти, як написати |
| Film & Brand | `film.html` | Рекламні агенції, бренди, broadcast | Ви робите brand/explainer/social, швидко і якісно |
| Mobile Games | `games.html` | Mobile game studios, publishers | Ви робите cinematics/trailers, знаєте Playtika/SuperPlay |
| Original IP | `ip.html` | Копродюсери, broadcast, інвестори | У вас є IP у розробці, відкриті до партнерства |

**Воронка:** Hero/showreel → 3 «двері» → (clients) → About → Contact.  
На Film/Games/IP: value prop → services → work → pricing → contact (та сама форма, різний слоган над нею).

---

## 4. Карта сайту (структура — НЕ змінювати без узгодження)

```
index.html
  hero (Vimeo showreel, мінімальний текст)
  #doors — 3 картки → film / games / ip
  #clients — логотипи (placeholder)
  #about — історія студії + 4 stats
  #contact — форма

film.html — hero, services tags, approach, work grid (film only), pricing, contact
games.html — те саме для games
ip.html — 5 IP cards, contact
404.html
```

**Видалено назавжди:** `work.html` (загальний портфоліо). Кейси лише на «своїй» вертикалі.

**Форма:** однакові поля на всіх сторінках; персоналізація **тільки** `contact.headline` + `contact.subline` (або `contact.film.*` тощо).

---

## 5. Канон фактів (не суперечити)

| Факт | Формулювання для копірайту |
|------|----------------------------|
| Нагороди фільму | **11** міжнародних нагород (A-class festivals) |
| Фестивалі | **45** international selections |
| Студія заснована | **2006** |
| Досвід режисера | з **1991** |
| Проєкти | **1,000+** commercial animation projects |
| Короткометр | *Unnecessary Things* — назва проєкту = «клієнт» у кейсі, **не** вигадувати інший client name у публічному копі |
| Game clients | Playtika, SuperPlay (можна згадувати) |
| Локація | **Canada · Ukraine · Poland** (не Warsaw у hero — свідоме рішення) |
| Відповідь на заявку | within **24 hours** |
| AI | human creative direction, AI-accelerated production — ключовий меседж |

**Застаріло в старому brief:** 15 нагород, Warsaw-only, one-page з Work у nav — **ігнорувати**.

---

## 6. Тон і стиль

- **Professional, direct, confident** — без води та креативного жаргону заради жаргону.
- **B2B**, не mass consumer.
- Короткі речення; заголовки — конкретна вигода.
- Уникати: «world-class», «cutting-edge», «passion», «synergy» без доказу.
- **Mobile Game Cinematics** — завжди «mobile», не просто «game animation».
- CTA: «Let's talk →», «Enter →», «Send →» — можна уточнити, але тон дружній-діловий.

---

## 7. Поточні тексти (EN) — повний інвентар з сайту

Джерело: `www/lang/en.json` (стан на травень 2026).

### Meta
- **title:** LISENBART — Animation Studio
- **description:** Award-winning animation studio. B2B for agencies, brands, and game studios across Europe.

### Hero (index) — СЛАБЕ МІСЦЕ
- studio: Animation Studio
- city: Canada · Ukraine · Poland
- scroll: ↓ Explore  
- *(немає headline/subline з value proposition)*

### Doors (index)
| Door | Label | Description |
|------|-------|-------------|
| Film | Film & Brand | Animation for agencies, brands, and broadcasters. |
| Games | Mobile Games | Cinematics and animation for mobile game studios. |
| IP | Original IP | Original animated projects in development. Open to co-production. |

### Clients (index)
- label: Trusted by  
- logos: PLACEHOLDER (Playtika, SuperPlay, +1)

### About (index)
- **headline:** Award-winning animation studio. Directing since 1991.
- **body:** Lisenbart Film is an animation studio founded in 2006 by Dmytro Lisenbart — animation director with over 30 years of experience. The studio's short film 'Unnecessary Things' won 11 prizes at A-class festivals across 45 international selections. To date, the studio has delivered 1,000+ commercial animation projects for agencies and brands across Europe. Creative direction stays human. Production is AI-accelerated. Our distributed team works across Ukraine, Poland, and Canada.
- **stats:** Since 2006 | 1,000+ projects | 11 awards | Since 1991 director exp.

### Contact slogans
| Контекст | Headline | Subline |
|----------|----------|---------|
| General (index) | Imagine the impossible — and we'll make it move. | Tell us about your project. We respond within 24 hours. |
| Film | Ready to start your film or brand project? | Agencies and brands — tell us what you are building… |
| Games | Let's build your next mobile cinematic. | Game studios — share your timeline and platform… |
| IP | Interested in co-production or licensing? | Broadcasters and partners — tell us about your project… |

**Form fields (усі сторінки):** Name, Company, Email, What do you need? (brand / game cinematic / explainer / motion / other), Message.

### Film page
- **headline:** Animation for agencies and brands.
- **subline:** Explainers, brand films, social content — human creative direction, AI-accelerated production.
- **tags:** 2D Animation · 3D Animation · Motion Design · Brand Films · Explainer Video · Social Animation · Pitch Video · Live Action Combo
- **approach:** Human direction. AI speed. + body (director not prompt, AI for iteration…)
- **work:** Unnecessary Things (11 awards, 45 selections) + PLACEHOLDER brand case
- **pricing:** Agency White-Label from €500/day · Brand Explainer €2,500 · Social Pack €2,000 · Pitch Video €2,500

### Games page
- **headline:** Cinematics for mobile game studios.
- **subline:** Trailers, in-game cutscenes, marketing packs — built for the pace of mobile production.
- **approach:** Studio-quality. Mobile-speed. + Playtika/SuperPlay proof
- **work:** Playtika / SuperPlay + PLACEHOLDER
- **pricing:** Marketing Pack €2,000 · Trailer €1,800 · Pitch Package €4,000 · Retainer €2,500/mo

### IP page (потрібні пітчі!)
| Project | Status |
|---------|--------|
| SmartBabies | In Development |
| BibiBoo | In Development |
| Pershosvit | Seeking Co-Production |
| The Last Cossack | Seeking Co-Production |
| Boy from City B. (Tears of God) | Seeking Co-Production |

Усі: format TBC, pitch = PLACEHOLDER one paragraph.

---

## 8. Сильні та слабкі сторони поточного копі (для стратега)

### Працює
- Чітке розділення 3 B2B-напрямків.
- «Human direction. AI speed.» — зрозумілий диференціатор.
- Social proof: Playtika/SuperPlay, 1000+, 11 awards.
- Прозорі ціни «from €» — рідкість, добре для агенцій.
- Персоналізовані contact headlines по вертикалях.

### Слабко / backlog
- **Hero без оферу** — відвідувач не бачить «для кого + результат» до scroll.
- **Загальний contact headline** (*Imagine the impossible*) — поетичний, менш B2B-конкретний ніж вертикалі.
- **About headline** можна посилити під «studio for agencies & game studios».
- **IP** — нуль storytelling; не продає копродукцію.
- **Кейси** — один рядок, без outcome для клієнта (що змінилось після ролика).
- **Doors** — описи короткі, можна додати micro-proof.
- **Clients** — порожньо (текстів немає, лише placeholder logos).
- Старий brief пропонував Warsaw / 15 awards — **не використовувати**.

---

## 9. Відкриті стратегічні питання (для обговорення з ChatGPT)

1. **Hero:** один заголовок для всіх vs ротація? Чи лишати мінімалістичний hero + сильний блок під відео?
2. **Позиціонування бренду:** «award-winning studio» vs «production partner for agencies» — що перше?
3. **AI у копі:** наскільки явно продавати AI (деякі агенції бояться) vs «faster turnaround»?
4. **IP сторінка:** окрема аудиторія — чи потрібен інший тон (більш editorial / story-first)?
5. **Pricing на сайті:** лишати публічні «from €» чи замінити на «Get a quote»?
6. **PL primary vs EN primary** для польського ринку — що в lead headline?
7. **Unnecessary Things** — скільки розкривати festival/awards story на Film vs About?

---

## 10. Технічні обмеження для копірайту

| Обмеження | Деталі |
|-----------|--------|
| Довжина hero headline | ~8–12 слів (mobile), max ~2 рядки desktop |
| Door desc | ~1–2 речення |
| Case desc | 1 рядок (~120 chars) |
| IP pitch | 1 абзац (~60–90 слів) |
| Approach body | ~80–120 слів |
| i18n keys | Тексти в `www/lang/en.json`; PL/UA — переклад після затвердження EN |
| PLACEHOLDER рядки | Позначати `[NEEDS CLIENT INPUT]` якщо бракує фактів |

### Ключові префікси JSON (для структури відповіді ChatGPT)

```
meta.*
hero.*
doors.film|games|ip.*
clients.*
about.*
contact.* | contact.film.* | contact.games.* | contact.ip.*
film.*
games.*
ip.*
work.case1|case2.*  (film використовує case1, games — case2)
pricing.*
nav.* (лише film, games, ip, about, contact, cta)
```

---

## 11. Приклад формату відповіді, який зручно розробнику

```json
{
  "hero": {
    "headline": "...",
    "subline": "..."
  },
  "doors": {
    "film": { "desc": "..." }
  },
  "strategy_notes": "Чому саме так — 3–5 bullet points"
}
```

Або таблиця: `key | current EN | proposed EN | rationale`.

---

## 12. Референси в репозиторії

| Файл | Для чого |
|------|----------|
| `www/lang/en.json` | Актуальні тексти EN |
| `www/lang/pl.json`, `ua.json` | Переклади (оновлювати після EN) |
| `lisenbart_website_brief.md` | Старий copy-brief — **частково застарілий** |
| `cursor_architecture_v1.md` | IA (work.html вже видалено) |
| `cursor_design_refinement_v1.md` | Візуальна система |

---

## 13. Промпт-стартер для ChatGPT (копіюй разом із цим файлом)

```
Ти стратег і B2B-копірайтер для lisenbart.com — анімаційна студія LISENBART.
Прочитай вкладений файл gpt_strategy_copy_brief.md повністю.

Завдання:
1) Запропонуй позиціонування в 1 реченні + 3 окремі value props для Film / Games / IP.
2) Запропонуй hero headline + subline (EN) для головної.
3) Перепиши слабкі блоки: about.headline+body, contact.headline (general), doors.*.desc.
4) Напиши 5 IP pitches (EN, 60–90 слів кожен) для SmartBabies, BibiBoo, Pershosvit, The Last Cossack, Boy from City B.
5) Покращи work.case1.desc та work.case2.desc (outcome-oriented, 1 line).

Дотримуйся канону: 11 awards, 45 selections, studio voice (we), 1000+ projects, since 2006/1991, Canada·Ukraine·Poland.
Не змінюй структуру сайту і не вигадуй ціни. Відповідь — таблиця key | proposed EN | rationale.
```

---

*Документ згенеровано для handoff ChatGPT · травень 2026 · після збірки architecture v1*
