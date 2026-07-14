export const TESTIMONIAL_MAX_LENGTH = 500;

export type TestimonialPayload = {
  authorName: string;
  company: string;
  quote: string;
  rating: number;
  honeypot?: string;
};

export function validateTestimonialPayload(data: TestimonialPayload): string | null {
  if (data.honeypot?.trim()) return "Submission blocked.";

  if (!data.authorName.trim()) return "Name is required";
  if (!data.company.trim()) return "Company is required";

  const quote = data.quote.trim();
  if (!quote) return "Review text is required";
  if (quote.length > TESTIMONIAL_MAX_LENGTH) {
    return `Maximum ${TESTIMONIAL_MAX_LENGTH} characters`;
  }

  if (data.rating < 0 || data.rating > 5) {
    return "Choose 1 to 5 stars, or skip rating";
  }

  return null;
}

export function slugPart(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function buildTestimonialId(data: TestimonialPayload): string {
  const parts = [slugPart(data.company), slugPart(data.authorName)].filter(Boolean);
  const base = parts.join("-") || "review";
  return `${base}-${Date.now()}`;
}
