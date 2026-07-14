import {
  contactEndpoint,
  contactHandler,
  isContactFormLive,
} from "@/lib/contactConfig";

export const TESTIMONIAL_FORM_NAME = "testimonial-review";
export const TESTIMONIAL_MAX_LENGTH = 500;
const TESTIMONIAL_MIN_LENGTH = 1;

export interface TestimonialSubmitPayload {
  authorName: string;
  company: string;
  quote: string;
  rating: number;
  honeypot?: string;
}

export interface TestimonialSubmitResult {
  success: boolean;
  message: string;
}

function encodeUrlBody(fields: Record<string, string>): string {
  return Object.entries(fields)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join("&");
}

function buildModerationBlock(data: TestimonialSubmitPayload): string {
  const slug = `${data.company.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}-${Date.now()}`;
  const ratingLine =
    data.rating > 0 ? `  rating: ${data.rating},` : "  // rating omitted";

  return [
    "---",
    "MODERATION — publish manually after review",
    "Add to site/src/data/testimonials.ts:",
    "",
    "{",
    `  id: "${slug}",`,
    `  quote: ${JSON.stringify(data.quote.trim())},`,
    `  name: ${JSON.stringify(data.authorName.trim())},`,
    `  company: ${JSON.stringify(data.company.trim())},`,
    ratingLine,
    "}",
  ].join("\n");
}

function buildEmailBody(data: TestimonialSubmitPayload): string {
  const stars =
    data.rating > 0 ? `${data.rating} / 5` : "(not provided)";

  return [
    "New client testimonial submitted for moderation.",
    "",
    `Name: ${data.authorName.trim()}`,
    `Company: ${data.company.trim()}`,
    `Rating: ${stars}`,
    "",
    "Review:",
    data.quote.trim(),
    "",
    buildModerationBlock(data),
  ].join("\n");
}

export function validateTestimonialSubmit(
  data: TestimonialSubmitPayload,
): Record<string, string> {
  const errors: Record<string, string> = {};

  if (data.honeypot?.trim()) {
    errors.form = "Submission blocked.";
    return errors;
  }

  if (!data.authorName.trim()) errors.authorName = "Name is required";

  if (!data.company.trim()) errors.company = "Company is required";

  const quote = data.quote.trim();
  if (!quote) errors.quote = "Review text is required";
  else if (quote.length > TESTIMONIAL_MAX_LENGTH) {
    errors.quote = `Maximum ${TESTIMONIAL_MAX_LENGTH} characters`;
  }

  if (data.rating < 0 || data.rating > 5) {
    errors.rating = "Choose 1 to 5 stars, or skip rating";
  }

  return errors;
}

function buildNetlifyBody(data: TestimonialSubmitPayload): string {
  return encodeUrlBody({
    "form-name": TESTIMONIAL_FORM_NAME,
    authorName: data.authorName.trim(),
    company: data.company.trim(),
    quote: data.quote.trim(),
    rating: data.rating > 0 ? String(data.rating) : "",
    message: buildEmailBody(data),
    website: data.honeypot?.trim() ?? "",
  });
}

async function parseErrorResponse(res: Response): Promise<string> {
  try {
    const json = (await res.json()) as {
      message?: string;
      error?: string;
      errors?: { message: string }[];
    };
    if (json.message) return json.message;
    if (json.errors?.[0]?.message) return json.errors[0].message;
    if (json.error) return json.error;
  } catch {
    /* ignore */
  }
  return "Could not send your review. Please try again or email us directly.";
}

export async function submitTestimonialReview(
  data: TestimonialSubmitPayload,
): Promise<TestimonialSubmitResult> {
  const errors = validateTestimonialSubmit(data);
  if (Object.keys(errors).length > 0) {
    return { success: false, message: Object.values(errors)[0] };
  }

  if (!isContactFormLive) {
    console.info("[LISENBART] Testimonial review (dev mock):", data);
    console.info(buildModerationBlock(data));
    await new Promise((resolve) => window.setTimeout(resolve, 600));
    return {
      success: true,
      message: "Your review has been sent. We appreciate your feedback — thank you.",
    };
  }

  if (contactHandler !== "netlify") {
    return {
      success: false,
      message: `Please email your review to info@lisenbart.com`,
    };
  }

  const res = await fetch(contactEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: buildNetlifyBody(data),
  });

  if (!res.ok) {
    return { success: false, message: await parseErrorResponse(res) };
  }

  return {
    success: true,
    message: "Your review has been sent. We appreciate your feedback — thank you.",
  };
}
