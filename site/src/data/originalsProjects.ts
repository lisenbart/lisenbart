import { getWorkCasesByIds, type WorkCaseStudy } from "@/data/work";
import type { OriginalsProjectSlug } from "@/lib/routes";

export type { OriginalsProjectSlug };

export type OriginalsLayout = "film-short";

export type OriginalsCreditLine =
  | { kind: "row"; role: string; names: string }
  | { kind: "note"; text: string };

export type OriginalsProjectPage = {
  slug: OriginalsProjectSlug;
  layout: OriginalsLayout;
  seoTitle: string;
  seoDescription: string;
  /** Meta line under the title */
  format: string;
  status?: string;
  /** Longer page synopsis — may deepen the overview card blurb without inventing plot. */
  synopsis: string;
  /** Optional supporting paragraphs (real source only). */
  body?: readonly string[];
  highlights?: readonly string[];
  characterNote?: string;
  developmentNotes?: readonly string[];
  /** Structured credits block (film-short project page). */
  creditLines?: readonly OriginalsCreditLine[];
  creditsImdbHref?: string;
  cta: {
    label: string;
    projectType: string;
    message: string;
  };
  /** Contact form intro under “Let's fly together”; falls back to home default. */
  contactLead?: string;
  case: WorkCaseStudy;
};

const [unnecessary] = getWorkCasesByIds(["unnecessary-things"]);

if (!unnecessary) {
  throw new Error("Originals project cases missing from work.ts");
}

export const originalsProjects: Record<OriginalsProjectSlug, OriginalsProjectPage> = {
  "unnecessary-things": {
    slug: "unnecessary-things",
    layout: "film-short",
    seoTitle: "Unnecessary Things — Animated Short | LISENBART FILM",
    seoDescription:
      "Unnecessary Things — a 14-minute animated short by Dmytro Lisenbart, based on Robert Sheckley's “The Old Curiosity Shop”. 11 awards · 45 selections.",
    format: "Animated short · 14 min · 2021",
    synopsis: unnecessary.description,
    creditLines: [
      { kind: "row", role: "Directed by", names: "Dmytro Lisenbart" },
      {
        kind: "row",
        role: "Written by",
        names: "Andriy Rushkovskyi, Dmytro Lisenbart",
      },
      {
        kind: "row",
        role: "With",
        names: "With the participation of Valeriy Pugashkin",
      },
      { kind: "row", role: "Producer", names: "Vitaliy Halo, Marcus Film" },
      { kind: "row", role: "Creative producer", names: "Valeriy Pugashkin" },
      { kind: "row", role: "Production design", names: "Dmytro Kryvonos" },
      { kind: "row", role: "Music", names: "Oleksiy Omelchuk" },
      { kind: "row", role: "Sound, mixing and mastering", names: "Propeller Studios" },
      { kind: "row", role: "Production", names: "Lisenbart Animation Studio" },
      {
        kind: "row",
        role: "Made with the support of",
        names:
          "State Agency of Ukraine for Film Affairs; Ministry of Culture and Information Policy of Ukraine",
      },
    ],
    creditsImdbHref: "https://www.imdb.com/title/tt14760808/",
    cta: {
      label: "Festival & press enquiries",
      projectType: "Originals Partnership",
      message: "Enquiry about Unnecessary Things.",
    },
    contactLead:
      "Festival, programme or press enquiry about Unnecessary Things? Tell us what you have in mind. We reply within one business day.",
    case: unnecessary,
  },
};

export const originalsProjectSlugs = Object.keys(
  originalsProjects,
) as OriginalsProjectSlug[];

export function getOriginalsProject(slug: string): OriginalsProjectPage | null {
  if (slug in originalsProjects) {
    return originalsProjects[slug as OriginalsProjectSlug];
  }
  return null;
}
