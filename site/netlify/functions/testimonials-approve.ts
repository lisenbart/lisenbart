import type { Config, Context } from "@netlify/functions";
import { moderationPage } from "../lib/moderationPage";
import { approveTestimonial } from "../lib/testimonialsStore";
import { buildRemoveUrl, resolveSiteUrl } from "../lib/siteUrl";

function publishedActions(id: string, token: string, homeUrl: string): string {
  const removeUrl = buildRemoveUrl(id, token);
  return `<div class="actions">
    <a class="btn btn-primary" href="${homeUrl}/#about">Подивитись на сайті</a>
    <a class="btn btn-danger" href="${removeUrl}">Прибрати з сайту</a>
  </div>`;
}

export default async function handler(req: Request, context: Context): Promise<Response> {
  if (req.method !== "GET") {
    return moderationPage("Not allowed", "<h1>Method not allowed</h1>");
  }

  const url = new URL(req.url);
  const id = url.searchParams.get("id")?.trim();
  const token = url.searchParams.get("token")?.trim();

  if (!id || !token) {
    return moderationPage(
      "Invalid link",
      "<h1>Невірне посилання</h1><p class=\"muted\">Invalid approval link.</p>",
    );
  }

  try {
    const result = await approveTestimonial(id, token, context);
    const homeUrl = resolveSiteUrl();

    if (result === "invalid") {
      return moderationPage(
        "Invalid link",
        "<h1>Посилання не діє</h1><p class=\"muted\">Link expired or invalid.</p>",
      );
    }

    if (result === "already") {
      return moderationPage(
        "Already published",
        `<h1>Вже на сайті</h1><p>Цей відгук уже опубліковано раніше.</p>${publishedActions(id, token, homeUrl)}`,
      );
    }

    return moderationPage(
      "Review published",
      `<h1>Опубліковано</h1><p><strong>${result.company}</strong> — ${result.name}<br />Відгук уже на головній сторінці.</p>${publishedActions(id, token, homeUrl)}`,
    );
  } catch (error) {
    console.error("[testimonials-approve]", error);
    return moderationPage(
      "Error",
      "<h1>Щось пішло не так</h1><p class=\"muted\">Спробуйте ще раз через хвилину.</p>",
    );
  }
}

export const config: Config = {
  path: "/api/testimonials/approve",
};
