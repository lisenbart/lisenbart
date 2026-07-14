import type { Config, Context } from "@netlify/functions";
import { listApprovedTestimonials } from "../lib/testimonialsStore";

export default async function handler(_req: Request, context: Context): Promise<Response> {
  try {
    const approved = await listApprovedTestimonials(context);
    const items = approved.map((item) => ({
      id: item.id,
      quote: item.quote,
      name: item.name,
      company: item.company,
      rating: item.rating > 0 ? item.rating : undefined,
      confirmed: true as const,
    }));

    return new Response(JSON.stringify({ items }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store, max-age=0",
        Pragma: "no-cache",
      },
    });
  } catch (error) {
    console.error("[testimonials-list]", error);
    return new Response(JSON.stringify({ items: [] }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      },
    });
  }
}

export const config: Config = {
  path: "/api/testimonials",
};
