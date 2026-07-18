import {
  contactHandler,
  isContactFormLive,
} from "@/lib/contactConfig";

export const TESTIMONIAL_MAX_LENGTH = 500;

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

const SUBMIT_API = "/api/testimonials/submit";

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

async function parseErrorResponse(res: Response): Promise<string> {
  try {
    const json = (await res.json()) as { error?: string; message?: string };
    if (json.error) return json.error;
    if (json.message) return json.message;
  } catch {
    /* ignore */
  }
  return "Could not send your review. Please try again or email me directly.";
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
    await new Promise((resolve) => window.setTimeout(resolve, 600));
    return {
      success: true,
      message: "Your review has been sent. Thank you — I appreciate it.",
    };
  }

  if (contactHandler !== "netlify") {
    return {
      success: false,
      message: "Please email your review to info@lisenbart.com",
    };
  }

  const res = await fetch(SUBMIT_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    return { success: false, message: await parseErrorResponse(res) };
  }

  return {
    success: true,
    message: "Your review has been sent. Thank you — I appreciate it.",
  };
}
