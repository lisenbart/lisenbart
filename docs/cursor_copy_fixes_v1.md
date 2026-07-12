# Copy & Form Fixes — v1

Three targeted fixes for index.html based on marketing review.
Do NOT touch any other files. Do NOT change CSS unless explicitly noted.

---

## Fix 1 — Hero subline: shorten

**File:** `www/index.html`

The hero subline (`.hero__subline`, `data-i18n="hero.subline"`) is too long and repeats what the headline already communicates.

Replace the inline fallback text only. The `data-i18n` key stays as-is (lang/bundle.js handles the copy):

```html
<!-- BEFORE -->
<p class="hero__subline" data-i18n="hero.subline">LISENBART creates original animated films and IP, and brings the same language of movement, rhythm and visual craft to commercial animation for brands, agencies and mobile games.</p>

<!-- AFTER -->
<p class="hero__subline" data-i18n="hero.subline">We develop original animated worlds inside the studio — and bring that same craft to brands, agencies and mobile games.</p>
```

> Note: the JSON lang files (en/pl/ua) will be updated separately. The HTML fallback text here just needs to match the EN version.

---

## Fix 2 — About coreLine: remove

**File:** `www/index.html`

The coreLine element appears immediately after the about body text. Both end with a variation of "one language" — they cancel each other out.

**Remove this line entirely:**

```html
<!-- REMOVE this element -->
<p class="about-grid__body about-grid__body--multiline" data-i18n="about.coreLine">One language, shaped for many worlds.</p>
```

Do not replace it with anything. The about body already closes strongly.

---

## Fix 3 — Contact form: add Co-production option

**File:** `www/index.html`

The contact form `<select id="need">` only has commercial options. Co-production and original IP prospects have no matching option.

Add one new `<option>` as the **first item** in the select (before "Brand animation"):

```html
<select id="need" name="need" required>
  <!-- ADD this option first -->
  <option value="coproduction" data-i18n="contact.needOptions.coproduction">Co-production / Original IP</option>

  <option value="brand" data-i18n="contact.needOptions.brand">Brand animation</option>
  <option value="game" data-i18n="contact.needOptions.game">Mobile game cinematics</option>
  <option value="explainer" data-i18n="contact.needOptions.explainer">Explainer video</option>
  <option value="motion" data-i18n="contact.needOptions.motion">Motion design</option>
  <option value="other" data-i18n="contact.needOptions.other">Other</option>
</select>
```

> Note: the `contact.needOptions.coproduction` key will be added to lang/bundle.js separately. The inline fallback text "Co-production / Original IP" will display until the bundle loads.

---

## Summary of changes

| # | Element | Action |
|---|---------|--------|
| 1 | `.hero__subline` fallback text | Shorten inline text |
| 2 | `.about-grid__body--multiline` (coreLine) | Remove element |
| 3 | `select#need` | Add coproduction option as first item |

No CSS changes. No other files.
