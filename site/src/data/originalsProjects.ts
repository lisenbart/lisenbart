import { getWorkCasesByIds, type WorkCaseStudy } from "@/data/work";
import type { OriginalsProjectSlug } from "@/lib/routes";

export type { OriginalsProjectSlug };

export type OriginalsLayout = "film-short";

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
      "Unnecessary Things (2021) — a 14-minute animated short by Dmytro Lisenbart. 11 awards · 45 festival selections.",
    format: "Animated short · 14 min · 2021",
    synopsis: unnecessary.description,
    cta: {
      label: "Discuss this film",
      projectType: "Originals Partnership",
      message: "Enquiry about Unnecessary Things.",
    },
    contactLead:
      "Want to screen or distribute Unnecessary Things? Tell us about your festival, platform or programme. We reply within one business day.",
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
