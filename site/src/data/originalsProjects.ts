import { getWorkCasesByIds, type WorkCaseStudy } from "@/data/work";

export type OriginalsProjectSlug =
  | "unnecessary-things"
  | "the-last-kozak"
  | "pershosvit"
  | "scoopy-cap";

export type OriginalsLayout = "film-short" | "feature-dev" | "preschool-ua" | "preschool-en";

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
  case: WorkCaseStudy;
};

const [unnecessary, kozak, pershosvit, scoopy] = getWorkCasesByIds([
  "unnecessary-things",
  "the-last-kozak",
  "pershosvit",
  "scoopy-cap",
]);

if (!unnecessary || !kozak || !pershosvit || !scoopy) {
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
    case: unnecessary,
  },

  "the-last-kozak": {
    slug: "the-last-kozak",
    layout: "feature-dev",
    seoTitle: "The Last Kozak — Animated Feature in Development | LISENBART FILM",
    seoDescription:
      "The Last Kozak — an animated feature in development from LISENBART FILM. Ukrainian mythological action-fantasy; English teaser available.",
    format: "Animated feature · 26 min",
    status: "In development",
    synopsis:
      "A nameless Cossack is trapped in a time loop, forced to face evil again and again. An action-fantasy drawing on Ukrainian mythology, comic-book rhythm and psychological tension.",
    developmentNotes: [
      "Script, treatment and pitch complete.",
      "English teaser available.",
    ],
    cta: {
      label: "Request the Pitch",
      projectType: "Originals Partnership",
      message: "Request the pitch for The Last Kozak.",
    },
    case: kozak,
  },

  pershosvit: {
    slug: "pershosvit",
    layout: "preschool-ua",
    seoTitle: "Pershosvit — Ukrainian Preschool Animation IP | LISENBART FILM",
    seoDescription:
      "Pershosvit — original Ukrainian preschool animation and songs for ages 0–6, led by Captain Firefly. A LISENBART FILM educational entertainment IP.",
    format: "Original preschool IP · Ukrainian · Ages 0–6",
    synopsis: pershosvit.description,
    characterNote:
      "Captain Firefly — a cheerful robot guide who sings, explores and introduces colours, numbers, shapes and emotions.",
    /** Category-level selection from live @pershosvit playlists (verified Oct 2026). */
    highlights: [
      "Ukrainian songs and early learning",
      "Alphabet — Ukrainian A–Я and English first words",
      "Марійчин Першосвіт friendship cartoons",
      "Lullabies and seasonal songs",
    ],
    cta: {
      label: "Discuss this IP",
      projectType: "Originals Partnership",
      message: "Enquiry about Pershosvit partnership or licensing.",
    },
    case: pershosvit,
  },

  "scoopy-cap": {
    slug: "scoopy-cap",
    layout: "preschool-en",
    seoTitle: "Scoopy Cap — English Preschool Animation IP | LISENBART FILM",
    seoDescription:
      "Scoopy Cap — original English-language preschool animation and learning IP from LISENBART FILM. Music, alphabet and character stories for ages 2–5.",
    format: "Original preschool IP · English · Ages 2–5",
    synopsis: scoopy.description,
    characterNote:
      "Scoopy Cap — a gentle explorer who turns first letters, songs and everyday learning into play.",
    /** Category-level selection from live @ScoopyCap playlists (verified Oct 2026). */
    highlights: [
      "Nursery rhymes and kids songs",
      "ABC Universe — alphabet A to Z",
      "Meet Scoopy Cap Shorts",
      "Seasonal songs — Christmas, Halloween, Easter",
    ],
    cta: {
      label: "Discuss this IP",
      projectType: "Originals Partnership",
      message: "Enquiry about Scoopy Cap partnership or distribution.",
    },
    case: scoopy,
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
