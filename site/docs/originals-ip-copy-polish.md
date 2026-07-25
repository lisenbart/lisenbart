# Original IP cards — copy polish brief

Date: 2026-07-25  
Page: `/originals` → section **Original IP**  
Source file: `src/data/work.ts`  
Component: `src/components/originals/OriginalIpCard.tsx`

Use this file to rewrite / polish the on-page text. Keep English for the site.

---

## How the card text is structured

Each IP card reads fields from `work.ts` like this:

| Field | On page | Notes |
|---|---|---|
| `title` | Large heading | Brand name only |
| `filmCategory` | Meta line under title | Small uppercase mono |
| `description` line 1 | Stats line | Split on first `\n` → shown as uppercase status |
| `description` line 2+ | Main blurb | Body copy in the right column |
| `result` | Second body paragraph | Supporting note (hits / schedule / series) |

Hard constraint: copy sits in a **narrow right column** next to three phone frames. Aim for:

- Stats: 1 short line  
- Blurb: ~1–2 sentences (about 25–45 words)  
- Result: ~1 sentence (about 12–25 words)

Do not turn this into a full channel About page.

Order on the page today: **Pershosvit**, then **Scoopy Cap** (`site.ts` → `filmPage.ipIds`).

---

## 1. Pershosvit — current site copy

**File id:** `pershosvit`  
**Links:**  
- YouTube: https://www.youtube.com/@pershosvit  
- TikTok: https://www.tiktok.com/@pershosvit  
- Instagram: https://www.instagram.com/pershosvit/

### Now on the site

```
title:        Pershosvit
filmCategory: Original Preschool IP · Ukrainian

description:
147K subscribers · 274 videos
Songs, fairy tales and learning with Captain Firefly — a robot hero for young audiences and the parents who watch with them.

result:
Alphabet, bedtime and learning series across Ukraine. Baby Shark UA is among the channel’s strongest videos.
```

### Live YouTube About (source for polish)

**Channel title:** Першосвіт — Українські мультики та пісні для малят

**About (Ukrainian, live):**

```
🎵 Першосвіт — українські мультики та пісні для дітей 0-6 років!
Дитячі пісні українською, навчальні мультфільми для малюків та
розвиваючі відео — все в одному місці. 💛

🚀 Головний герой — Капітан Світлячок ✨ — веселий друг, який
мандрує між планетами, співає, навчає кольорів, чисел, форм та емоцій.

👶 Канал для дітей 0-6 років і турботливих батьків, які хочуть, щоб
дитина розвивалася через гру, музику й радість.

🎨 На вас чекають:
• українські мультики та дитячі пісні
• абетка й навчальні відео для малюків
• казки про дружбу й доброту
• спокійні відео для вечора
• тематичні збірники 30+ хвилин

📅 Нові відео щосуботи + Shorts щосереди та четверга!
```

**Live stats seen on channel UI (Jul 2025/2026 scrape):** ~149K subscribers · 274 videos · ~196M views  
(Site still shows **147K** — decide whether to update.)

### Polish workspace — Pershosvit

```
title:
Pershosvit

filmCategory:
Original Preschool IP · Ukrainian

description (line 1 — stats):


description (line 2+ — blurb):


result:

```

---

## 2. Scoopy Cap — current site copy

**File id:** `scoopy-cap`  
**Links:**  
- YouTube: https://www.youtube.com/@ScoopyCap  
- TikTok: https://www.tiktok.com/@scoopycap  
- Instagram: https://www.instagram.com/scoopycap/

### Now on the site

```
title:        Scoopy Cap
filmCategory: Original Preschool IP · English

description:
10.4K subscribers · 225 videos
Nursery rhymes, ABC, colours and numbers built around Scoopy Cap — a space explorer designed for calm viewing and repeat plays.

result:
Finger Family is the channel’s top-performing video. Full songs each Saturday; Shorts through the week.
```

### Live YouTube About (source for polish)

**Channel title:** Scoopy Cap — Nursery Rhymes & Kids Songs

**About (English, live):**

```
🎵 Nursery rhymes, kids songs, and ABC learning for babies and toddlers (0–5)!

Scoopy Cap brings gentle learning videos for toddlers through sing-alongs,
first letters, colors, numbers, and animal friends — in Short clips, full songs,
and longer compilations for quiet time together. 💛

🛸 Your little guide is Scoopy Cap — a friendly explorer who makes learning feel like play!

🎶 What's here:
• Nursery rhymes & toddler songs
• ABC song for kids & letter learning
• Colors, numbers & shapes
• Baby Shark, Wheels on the Bus & more
• Calm bedtime songs & longer compilations

Parents love the clear English, gentle pacing, and easy routines —
perfect for playtime, mealtime, or winding down.

📅 New videos every Saturday + Shorts midweek!
```

**Live stats seen on channel UI:** ~10.5K subscribers · 225 videos · ~8.2M views  
(Site still shows **10.4K** — decide whether to update.)

### Polish workspace — Scoopy Cap

```
title:
Scoopy Cap

filmCategory:
Original Preschool IP · English

description (line 1 — stats):


description (line 2+ — blurb):


result:

```

---

## Voice / consistency notes (for polish)

1. Site language is **English**, including Pershosvit (hero name on site: **Captain Firefly**, not Капітан Світлячок).
2. Keep British/site spelling consistent if you use it (**colours** is already on Scoopy Cap).
3. Stats line format today: `X subscribers · Y videos`
4. Blurb should answer: audience age + language + hero + what the content is.
5. Result line should answer: schedule and/or a concrete proof point (hit video / series).
6. Avoid emoji, hashtags, and bullet lists on the site cards — those belong on YouTube About, not in this layout.
7. Don’t invent awards, partnerships, or numbers that aren’t on the channel.

---

## Suggested length targets (optional)

| Block | Target |
|---|---|
| Stats | ≤ 40 characters |
| Blurb | ≤ 220 characters |
| Result | ≤ 140 characters |

---

## After polish

Paste final lines into `src/data/work.ts` for:

- `id: "pershosvit"` → `description`, `result` (and stats if updated)
- `id: "scoopy-cap"` → `description`, `result` (and stats if updated)

Or send the filled “Polish workspace” blocks back and they can be applied on the site.
