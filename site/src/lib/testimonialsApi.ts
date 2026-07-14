import type { Testimonial } from "@/data/testimonials";
import { testimonials as seedTestimonials } from "@/data/testimonials";

const API_PATH = "/api/testimonials";
const MAX_TESTIMONIALS = 10;

export function mergeTestimonials(dynamic: Testimonial[]): Testimonial[] {
  const dynamicIds = new Set(dynamic.map((item) => item.id));
  const staticWithoutDupes = seedTestimonials.filter((item) => !dynamicIds.has(item.id));

  const confirmedStatic = staticWithoutDupes.filter((item) => item.confirmed);
  const pendingStatic = staticWithoutDupes.filter((item) => !item.confirmed);

  return [...confirmedStatic, ...dynamic, ...pendingStatic].slice(0, MAX_TESTIMONIALS);
}

export async function fetchPublishedTestimonials(): Promise<Testimonial[]> {
  try {
    const res = await fetch(`${API_PATH}?t=${Date.now()}`, {
      cache: "no-store",
      headers: {
        Accept: "application/json",
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
      },
    });

    if (!res.ok) return seedTestimonials;

    const data = (await res.json()) as { items?: Testimonial[] };
    const dynamic = Array.isArray(data.items) ? data.items : [];
    return mergeTestimonials(dynamic);
  } catch {
    return seedTestimonials;
  }
}
