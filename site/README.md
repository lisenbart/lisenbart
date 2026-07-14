# LISENBART

One-page site for **LISENBART** — general producer for film, animation and AI content.

## Local development

**Do not double-click `index.html`** — it will show a blank page. This is a Vite + React app and needs a dev server.

```bash
cd site
npm install
npm run dev
```

Or double-click **`Dev LISENBART.command`** on the Desktop or in the project folder.

- Local: http://localhost:5173
- Phone (same Wi‑Fi): use the Network URL from the terminal, e.g. http://192.168.0.43:5173

## Production build

```bash
npm run build
npm run preview -- --host
```

## Contact form

**Default:** Netlify Forms (`contact` + `testimonial-review` in `index.html`). React submits via `fetch` on deploy.

Optional: set `VITE_CONTACT_HANDLER=php`, `VITE_FORMSPREE_FORM_ID`, or `VITE_CONTACT_ENDPOINT` in `.env.local` — see `.env.example`.

## Stack

React 18 · TypeScript · Vite 6 · Tailwind CSS 4 · Framer Motion
