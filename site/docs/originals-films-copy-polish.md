# Films copy polish brief — Unnecessary Things & The Last Kozak

Date: 2026-07-25  
Page: `/originals` → section **Films**  
Source file: `src/data/work.ts`  
Components:
- Unnecessary Things → `src/components/originals/FilmFeatureCase.tsx`
- The Last Kozak → `src/components/originals/DevelopmentFilmCase.tsx`

Use this file to rewrite / polish the on-page text. Keep English for the site.

---

## Layout constraint

Both cases use the same originals rhythm: **media left · copy right**.

Copy lives in a narrow right column (`max-width: ~28rem`). Keep synopsis tight enough that the column doesn’t feel endless beside a 16:9 video.

Order on the page today: **Unnecessary Things**, then **The Last Kozak**.

---

## Field → on-page mapping

### Unnecessary Things (`FilmFeatureCase`)

| Field | On page | Notes |
|---|---|---|
| `title` | Heading | |
| `filmCategory` | Meta under title | Small uppercase mono |
| `description` | Synopsis paragraph | Main story blurb |
| `result` | Recognition line | Bold/primary weight — awards summary |
| `selectionLinks` (first 3) | Festival link list | Labels are visible copy |
| `winnerLink` | Winner line | Label is visible copy |
| `quote.text` | Quote | Shown in quotes |
| `quote.attribution` | Quote attribution | Link label if `href` set |
| `credits` | Credits disclosure body | Collapsed by default |
| CTA | “View on IMDb” | Fixed UI string (not in data) |

### The Last Kozak (`DevelopmentFilmCase`)

| Field | On page | Notes |
|---|---|---|
| `title` | Heading | |
| `filmCategory` | Meta under title | “In Development” is stripped from meta and shown separately |
| status | “In Development” | Hardcoded in component |
| `description` | Synopsis paragraph | Main story blurb |
| `result` | Dev checklist | Split into list items on sentence boundaries (`. `) |
| CTA | “Request the Pitch” | Fixed UI string + contact prefill |

Important for Last Kozak `result`: each sentence becomes its own bullet.  
Current: `Script, treatment and pitch complete. English teaser available.` → **2 bullets**.

---

## 1. Unnecessary Things — current site copy

**File id:** `unnecessary-things`  
**IMDb:** https://www.imdb.com/title/tt14760808/  
**Vimeo:** `823618245`

### Now on the site

```
title:        Unnecessary Things
filmCategory: Animated Short · 14 min

description:
A robot buys a human from a store of unwanted things, beginning a friendship that ends where it began.

result:
15 awards · 45 festival selections

selectionLinks:
- Vancouver International Film Festival
- Short Shorts Film Festival & Asia (Tokyo)
- St. Louis International Film Festival

winnerLink:
Winner, Prague Film Awards

quote.text:
Pair this with Blade Runner 2049 — a lovely story about sentience and friendship.

quote.attribution:
Review on Letterboxd

credits:
Written and directed by Dmytro Lisenbart, based on a story by Robert Sheckley. Co-written with Andriy Rushkovskyi; production design by Dmytro Krivonos. Produced by Lisenbart Animation Studio and Marcus Film (Vitalii Khalo), with support from Derzhkino.
```

### Polish workspace — Unnecessary Things

```
title:
Unnecessary Things

filmCategory:
Animated Short · 14 min

description (synopsis):


result (awards line):


selectionLinks labels (optional polish):
1.
2.
3.

winnerLink label:


quote.text:


quote.attribution:


credits:

```

---

## 2. The Last Kozak — current site copy

**File id:** `the-last-kozak`  
**Vimeo teaser:** `699197721`

### Now on the site

```
title:        The Last Kozak
filmCategory: Animated Feature · 80 min · In Development
              → shown as: Animated Feature · 80 min
              + separate status: In Development

description:
He has no name — everyone calls him the Last Kozak. Trapped in a time loop, he must defeat evil again and again. A stylized action-fantasy with comic-book editing, psychological depth, and a cossack who rides the Iron Dog through worlds that meet at the Last Khreshchatyk.

result:
Script, treatment and pitch complete. English teaser available.
→ rendered as list:
  • Script, treatment and pitch complete.
  • English teaser available.
```

### Polish workspace — The Last Kozak

```
title:
The Last Kozak

filmCategory:
Animated Feature · 80 min · In Development

description (synopsis):


result (each sentence = one bullet):

```

---

## Voice / consistency notes

1. Site language is **English**.
2. Unnecessary Things synopsis is currently one sentence — strong and short; polish can deepen tone without becoming a plot dump.
3. Last Kozak synopsis is denser (loop + tone + world). Polish can clarify hook vs world-building; keep Iron Dog / Last Khreshchatyk only if you want those proper nouns on the page.
4. Awards numbers (`15 awards · 45 festival selections`) should stay factual if kept.
5. Festival / winner / quote labels are public-facing — polish wording carefully; URLs can stay as-is unless you also want link changes.
6. Credits are behind a disclosure — can be slightly longer than the synopsis.
7. Don’t invent festivals, awards, partners, or development status.

---

## Suggested length targets (optional)

| Block | Unnecessary Things | The Last Kozak |
|---|---|---|
| Synopsis | ≤ 180 characters / ~1–2 sentences | ≤ 280 characters / ~2–3 sentences |
| Result / status | ≤ 60 characters | 1–3 short sentences (each → bullet) |
| Quote | ≤ 120 characters | — |

---

## After polish

Paste final lines into `src/data/work.ts` for:

- `id: "unnecessary-things"`
- `id: "the-last-kozak"`

Or send the filled “Polish workspace” blocks back and they can be applied on the site.
