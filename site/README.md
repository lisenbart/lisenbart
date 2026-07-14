# LISENBART

One-page site for **LISENBART** — general producer for film, animation and AI content.

## Local development

**Do not double-click `index.html`** — it will show a blank page. This is a Vite + React app and needs a dev server.

```bash
cd site
npm install
npm run dev
```

- Local: http://localhost:5173
- Phone (same Wi‑Fi): use the Network URL from the terminal, e.g. http://192.168.0.43:5173

## Production build

```bash
npm run build
npm run preview -- --host
```

## Contact form

**Default:** Netlify Forms (`contact` + `testimonial-review` in `index.html`). React submits via `fetch` on deploy.

### Client reviews (approve link)

New reviews go through `/api/testimonials/submit` (Netlify Function + Blobs):

1. Visitor submits a review on the site.
2. You receive an email with two links:
   - **Publish on site** — one click, live without redeploy.
   - **Don't publish / Remove** — for tests or if you approved by mistake (same email works later).
3. No Netlify dashboard or code edits needed for day-to-day moderation.

Local dev mocks submit; use `netlify dev` in `site/` to test functions locally.

Optional: set `VITE_CONTACT_HANDLER=php`, `VITE_FORMSPREE_FORM_ID`, or `VITE_CONTACT_ENDPOINT` in `.env.local` — see `.env.example`.

## Stack

React 18 · TypeScript · Vite 6 · Tailwind CSS 4 · Framer Motion
