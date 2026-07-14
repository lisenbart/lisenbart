export function moderationPage(title: string, body: string): Response {
  return new Response(
    `<!DOCTYPE html>
<html lang="uk">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${title} · LISENBART</title>
  <style>
    :root { color-scheme: dark; }
    body {
      margin: 0;
      min-height: 100vh;
      display: grid;
      place-items: center;
      padding: 1.5rem;
      font-family: Inter, system-ui, sans-serif;
      background: #0b0d10;
      color: #f3f4f6;
    }
    .card {
      max-width: 30rem;
      width: 100%;
      padding: 1.75rem 1.5rem;
      border-radius: 20px;
      border: 1px solid rgba(255,255,255,0.08);
      background: rgba(255,255,255,0.03);
      box-shadow: 0 18px 48px rgba(0,0,0,0.35);
      text-align: center;
    }
    h1 {
      margin: 0 0 0.75rem;
      font-size: 1.25rem;
      font-weight: 600;
    }
    p {
      margin: 0 0 1rem;
      line-height: 1.6;
      color: rgba(243,244,246,0.72);
      font-size: 0.95rem;
    }
    .actions {
      display: flex;
      flex-direction: column;
      gap: 0.65rem;
      align-items: center;
      margin-top: 1.25rem;
    }
    a.btn {
      display: inline-block;
      padding: 0.65rem 1.1rem;
      border-radius: 999px;
      text-decoration: none;
      font-size: 0.82rem;
      font-weight: 600;
      letter-spacing: 0.06em;
    }
    a.btn-primary {
      background: linear-gradient(135deg, #34d399, #22d3ee);
      color: #041012;
    }
    a.btn-danger {
      border: 1px solid rgba(248,113,113,0.45);
      color: #fecaca;
      background: rgba(248,113,113,0.08);
    }
    .muted { color: rgba(243,244,246,0.45); font-size: 0.85rem; }
  </style>
</head>
<body>
  <div class="card">${body}</div>
</body>
</html>`,
    {
      status: 200,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-store",
      },
    },
  );
}
