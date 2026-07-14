import type { Config, Context } from "@netlify/functions";
import { moderationPage } from "../lib/moderationPage";
import { removeTestimonial } from "../lib/testimonialsStore";
import { resolveSiteUrl } from "../lib/siteUrl";

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
      "<h1>Невірне посилання</h1><p class=\"muted\">Invalid link.</p>",
    );
  }

  try {
    const result = await removeTestimonial(id, token, context);
    const homeUrl = resolveSiteUrl();

    if (result === "invalid") {
      return moderationPage(
        "Invalid link",
        "<h1>Посилання не діє</h1><p class=\"muted\">Можливо, відгук уже прибрано, або посилання застаріло.</p>",
      );
    }

    return moderationPage(
      "Review removed",
      `<h1>Відгук прибрано</h1><p>Його більше немає на сайті. Якщо все ще бачите — оновіть головну (Cmd+Shift+R).</p><div class="actions"><a class="btn btn-primary" href="${homeUrl}/#about">На головну</a></div>`,
    );
  } catch (error) {
    console.error("[testimonials-remove]", error);
    return moderationPage(
      "Error",
      "<h1>Щось пішло не так</h1><p class=\"muted\">Спробуйте ще раз через хвилину.</p>",
    );
  }
}

export const config: Config = {
  path: "/api/testimonials/remove",
};
