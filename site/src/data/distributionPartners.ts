/**
 * Originals — studio-level distribution / content partners.
 *
 * Distinct from Scoopy Cap platform listings (`scoopyCapDistribution.ts`).
 * Flip `verified` / `sectionPublished` only after public attribution is confirmed.
 *
 * Spelling notes:
 * - BrighterMoon Entertainment LLC — studio-corrected full legal name.
 * - LeadJoy — studio-confirmed brand spelling.
 * - SWEET.TV — studio lead; alternate “SWEEN.TV” unresolved → keep unverified.
 * - VlogBox — studio-supplied partner; public site https://vlogbox.com.
 */

export type DistributionPartner = {
  id: string;
  name: string;
  country: string;
  relationship: string;
  website: string | null;
  logo: string | null;
  verified: boolean;
};

export const distributionPartnersConfig = {
  heading: "Distribution Partners",
  lead: "Our stories travel beyond the studio.",

  /**
   * When true, verified partners render on production.
   * Unverified partners remain preview-only.
   */
  sectionPublished: true as boolean,

  partners: [
    {
      id: "brightermoon",
      name: "BrighterMoon Entertainment LLC",
      country: "United States",
      relationship: "Distribution",
      website: null,
      logo: null,
      verified: true,
    },
    {
      id: "leadjoy",
      name: "LeadJoy",
      country: "China",
      relationship: "Distribution",
      website: null,
      logo: null,
      verified: true,
    },
    {
      id: "sweet-tv",
      name: "SWEET.TV",
      country: "Ukraine",
      relationship: "Platform / content",
      website: null,
      logo: null,
      /** Alternate spelling SWEEN.TV still unresolved. */
      verified: false,
    },
    {
      id: "vlogbox",
      name: "VlogBox",
      country: "",
      relationship: "OTT / CTV distribution & monetization",
      website: "https://vlogbox.com",
      logo: null,
      verified: true,
    },
  ] satisfies DistributionPartner[],
} as const;

function isPreviewContext(): boolean {
  if (import.meta.env.DEV) return true;
  return import.meta.env.VITE_LEGAL_PREVIEW === "true";
}

export type DistributionPartnersVisibility = "published" | "draft" | "hidden";

export function distributionPartnersVisibility(): DistributionPartnersVisibility {
  const { sectionPublished, partners } = distributionPartnersConfig;
  const hasVerified = partners.some((p) => p.verified);

  if (sectionPublished && hasVerified) return "published";
  if (isPreviewContext()) return "draft";
  return "hidden";
}

export function distributionPartnersForDisplay(): DistributionPartner[] {
  const mode = distributionPartnersVisibility();
  if (mode === "hidden") return [];
  if (mode === "published") {
    return distributionPartnersConfig.partners.filter((p) => p.verified);
  }
  return [...distributionPartnersConfig.partners];
}
