import { randomBytes } from "node:crypto";
import type { Config, Context } from "@netlify/functions";
import { buildApproveUrl, buildRemoveUrl } from "../lib/siteUrl";
import {
  buildTestimonialId,
  validateTestimonialPayload,
  type TestimonialPayload,
} from "../lib/testimonialValidation";
import { savePendingTestimonial, type StoredTestimonial } from "../lib/testimonialsStore";

const TESTIMONIAL_FORM_NAME = "testimonial-review";

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
  });
}

function buildNotificationMessage(
  data: TestimonialPayload,
  approveUrl: string,
  removeUrl: string,
): string {
  const stars = data.rating > 0 ? `${data.rating} / 5` : "(not provided)";

  return [
    "Новий відгук від клієнта",
    "",
    `Ім'я: ${data.authorName.trim()}`,
    `Компанія: ${data.company.trim()}`,
    `Рейтинг: ${stars}`,
    "",
    "Текст:",
    data.quote.trim(),
    "",
    "════════════════════════════════",
    "✅ ОПУБЛІКУВАТИ НА САЙТІ (один клік):",
    approveUrl,
    "",
    "❌ НЕ ПУБЛІКУВАТИ / ПРИБРАТИ:",
    removeUrl,
    "════════════════════════════════",
    "",
    "Тестовий відгук? → натисни «НЕ ПУБЛІКУВАТИ» або просто видали лист.",
    "Опублікував помилково? → відкрий цей лист знову і натисни «ПРИБРАТИ».",
  ].join("\n");
}

async function notifyViaNetlifyForm(data: TestimonialPayload, message: string): Promise<void> {
  const siteUrl = process.env.DEPLOY_PRIME_URL || process.env.URL || "https://www.lisenbart.com";
  const body = new URLSearchParams({
    "form-name": TESTIMONIAL_FORM_NAME,
    authorName: data.authorName.trim(),
    company: data.company.trim(),
    quote: data.quote.trim(),
    rating: data.rating > 0 ? String(data.rating) : "",
    message,
    website: "",
  });

  const res = await fetch(`${siteUrl.replace(/\/$/, "")}/`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });

  if (!res.ok) {
    throw new Error(`Netlify form notification failed (${res.status})`);
  }
}

export default async function handler(req: Request, _context: Context): Promise<Response> {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  if (req.method !== "POST") {
    return jsonResponse({ error: "Method not allowed" }, 405);
  }

  let payload: TestimonialPayload;
  try {
    payload = (await req.json()) as TestimonialPayload;
  } catch {
    return jsonResponse({ error: "Invalid JSON body" }, 400);
  }

  const validationError = validateTestimonialPayload(payload);
  if (validationError) {
    return jsonResponse({ error: validationError }, 400);
  }

  const id = buildTestimonialId(payload);
  const token = randomBytes(24).toString("hex");
  const approveUrl = buildApproveUrl(id, token);
  const removeUrl = buildRemoveUrl(id, token);

  const record: StoredTestimonial = {
    id,
    quote: payload.quote.trim(),
    name: payload.authorName.trim(),
    company: payload.company.trim(),
    rating: payload.rating > 0 ? payload.rating : 0,
    status: "pending",
    token,
    createdAt: new Date().toISOString(),
  };

  try {
    await savePendingTestimonial(record);
    await notifyViaNetlifyForm(payload, buildNotificationMessage(payload, approveUrl, removeUrl));
  } catch (error) {
    console.error("[testimonials-submit]", error);
    return jsonResponse({ error: "Could not save or notify about the review." }, 500);
  }

  return jsonResponse({ success: true, id });
}

export const config: Config = {
  path: "/api/testimonials/submit",
};
