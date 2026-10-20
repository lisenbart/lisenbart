/**
 * Originals — distribution / content partners.
 *
 * Names below are leads supplied for verification. Do not invent websites,
 * logos, territories, or title-level rights. Flip `verified` / `sectionPublished`
 * only after the relationship and public attribution are confirmed.
 */

export type DistributionPartner = {
  id: string;
  name: string;
  country: string;
  /** High-level relationship — keep generic until contract type is confirmed. */
  relationship: string;
  /** Official site only when verified — never invent. */
  website: string | null;
  /** Path under /public only when an approved logo asset exists. */
  logo: string | null;
  verified: boolean;
};

export const distributionPartnersConfig = {
  heading: "Distribution Partners",
  lead: "Our stories travel beyond the studio.",

  /**
   * Master publication flag.
   * When false, the section never appears on production hosts as confirmed
   * partners — only in preview/dev as a clearly marked draft.
   */
  sectionPublished: false as boolean,

  partners: [
    {
      id: "brighten-moon",
      name: "Brighten Moon",
      country: "United States",
      relationship: "Distribution (pending confirmation)",
      website: null,
      logo: null,
      verified: false,
    },
    {
      id: "leejoy",
      name: "LeeJoy",
      country: "China",
      relationship: "Distribution (pending confirmation)",
      website: null,
      logo: null,
      verified: false,
    },
    {
      id: "sweet-tv",
      name: "SWEET.TV",
      country: "Ukraine",
      relationship: "Platform / content (pending confirmation)",
      website: null,
      logo: null,
      verified: false,
    },
  ] satisfies DistributionPartner[],
} as const;

/** Same preview gate as legal draft exposure (Netlify DP / local). */
function isPreviewContext(): boolean {
  if (import.meta.env.DEV) return true;
  return import.meta.env.VITE_LEGAL_PREVIEW === "true";
}

export type DistributionPartnersVisibility = "published" | "draft" | "hidden";

/**
 * - published: all partners verified + sectionPublished — clean public section
 * - draft: preview only — names visible with pending marking
 * - hidden: production with unverified data — omit section entirely
 */
export function distributionPartnersVisibility(): DistributionPartnersVisibility {
  const { sectionPublished, partners } = distributionPartnersConfig;
  const allVerified = partners.every((p) => p.verified);

  if (sectionPublished && allVerified) return "published";
  if (isPreviewContext()) return "draft";
  return "hidden";
}

/** Partners safe to list for the current visibility mode. */
export function distributionPartnersForDisplay(): DistributionPartner[] {
  const mode = distributionPartnersVisibility();
  if (mode === "hidden") return [];
  if (mode === "published") {
    return distributionPartnersConfig.partners.filter((p) => p.verified);
  }
  // Draft preview: show leads so design can be reviewed; not confirmed.
  return [...distributionPartnersConfig.partners];
}
