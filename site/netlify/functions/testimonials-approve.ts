import type { Config, Context } from "@netlify/functions";
import { approveTestimonial } from "../lib/testimonialsStore";
import { resolveSiteUrl } from "../lib/siteUrl";

function htmlPage(title: string, body: string): Response {
  return new Response(
    `<!DOCTYPE html>
<html lang="en">
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
      max-width: 28rem;
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
      letter-spacing: 0.02em;
    }
    p {
      margin: 0 0 1.25rem;
      line-height: 1.6;
      color: rgba(243,244,246,0.72);
      font-size: 0.95rem;
    }
    a {
      display: inline-block;
      padding: 0.65rem 1.1rem;
      border-radius: 999px;
      background: linear-gradient(135deg, #34d399, #22d3ee);
      color: #041012;
      text-decoration: none;
      font-size: 0.82rem;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }
    .muted { color: rgba(243,244,246,0.45); font-size: 0.85rem; }
  </style>
</head>
<body>
  <div class="card">
    ${body}
  </div>
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

export default async function handler(req: Request, _context: Context): Promise<Response> {
  if (req.method !== "GET") {
    return htmlPage("Not allowed", "<h1>Method not allowed</h1>");
  }

  const url = new URL(req.url);
  const id = url.searchParams.get("id")?.trim();
  const token = url.searchParams.get("token")?.trim();

  if (!id || !token) {
    return htmlPage(
      "Invalid link",
      "<h1>Invalid approval link</h1><p class=\"muted\">This link is missing required parameters.</p>",
    );
  }

  try {
    const result = await approveTestimonial(id, token);
    const homeUrl = resolveSiteUrl();

    if (result === "invalid") {
      return htmlPage(
        "Invalid link",
        "<h1>Link expired or invalid</h1><p class=\"muted\">This approval link is no longer valid.</p>",
      );
    }

    if (result === "already") {
      return htmlPage(
        "Already published",
        `<h1>Already on the site</h1><p>This review was approved earlier.</p><a href="${homeUrl}/#about">View homepage</a>`,
      );
    }

    return htmlPage(
      "Review published",
      `<h1>Review published</h1><p><strong>${result.company}</strong> — ${result.name}<br />The review is now live on the homepage.</p><a href="${homeUrl}/#about">View homepage</a>`,
    );
  } catch (error) {
    console.error("[testimonials-approve]", error);
    return htmlPage(
      "Error",
      "<h1>Something went wrong</h1><p class=\"muted\">Please try the approval link again in a moment.</p>",
    );
  }
}

export const config: Config = {
  path: "/api/testimonials/approve",
};
