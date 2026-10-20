/**
 * Centralized legal / policy configuration for LISENBART FILM.
 *
 * Do not invent registration numbers, entity names, or street addresses.
 * Flip per-jurisdiction `verified` / `policiesPublished` only after real data is confirmed.
 *
 * Canada source (2026-10-20): Ontario Business Name Registration for a Sole Proprietorship
 * — Business Names Act; BIN 1001421710; effective 2025-11-21; expiry 2030-11-20.
 */

export type RegisteredPresence = {
  countryLabel: string;
  verified: boolean;
  legalName: string;
  addressLine: string;
  cityLine: string;
  registrationLine: string;
};

export const legalConfig = {
  /**
   * When false, Privacy / Cookie pages are review drafts only.
   * Production footer omits those links until this is true.
   */
  policiesPublished: false as boolean,

  brandDescriptor: "Independent Creative Studio · Est. 2006",

  copyrightYear: 2026,

  legalSectionLabel: "Registered business information",

  pendingNote: "Details pending verification",

  /** Soft presence when a jurisdiction is unverified outside preview. */
  presenceContactHint: "For formal notices, email",

  canada: {
    countryLabel: "Canada",
    verified: true,
    legalName: "LISENBART FILM",
    addressLine: "Sole proprietorship of Dmytro Lisenbart",
    cityLine: "3100 Keele Street, Toronto, Ontario M3M 0E1, Canada",
    registrationLine: "Ontario Business Identification Number 1001421710",
  } satisfies RegisteredPresence,

  ukraine: {
    countryLabel: "Ukraine",
    verified: false,
    legalName: "[UKRAINE — REGISTERED LEGAL NAME]",
    addressLine: "[UKRAINE — REGISTERED ADDRESS]",
    cityLine: "[UKRAINE — CITY, REGION, POSTAL CODE]",
    registrationLine: "[UKRAINE — REGISTRATION / TAX NUMBER]",
  } satisfies RegisteredPresence,

  policies: {
    privacy: {
      title: "Privacy Policy",
      path: "/privacy/",
      seoTitle: "Privacy Policy (Draft) — LISENBART FILM",
      seoDescription:
        "Draft privacy notice for LISENBART FILM covering the contact form and site analytics. Pending legal review.",
    },
    cookies: {
      title: "Cookie Policy",
      path: "/cookie-policy/",
      seoTitle: "Cookie Policy (Draft) — LISENBART FILM",
      seoDescription:
        "Draft cookie notice for LISENBART FILM describing analytics cookies in use. Pending legal review. No consent UI is claimed.",
    },
  },
} as const;

/** True when every jurisdiction has verified public registration data. */
export function legalDetailsVerified(): boolean {
  return legalConfig.canada.verified && legalConfig.ukraine.verified;
}

/** True when Vite is building/serving a legal-preview context (Netlify DP / local). */
export function isLegalPreviewContext(): boolean {
  if (import.meta.env.DEV) return true;
  return import.meta.env.VITE_LEGAL_PREVIEW === "true";
}

export type JurisdictionRenderMode = "verified" | "placeholder" | "soft";

/** How to render one jurisdiction block in the footer. */
export function jurisdictionRenderMode(
  presence: RegisteredPresence,
): JurisdictionRenderMode {
  if (presence.verified) return "verified";
  if (isLegalPreviewContext()) return "placeholder";
  return "soft";
}

/**
 * Footer / nav may link to Privacy & Cookie pages.
 * Drafts only in preview until `policiesPublished`.
 */
export function shouldLinkDraftPolicies(): boolean {
  if (legalConfig.policiesPublished) return true;
  return isLegalPreviewContext();
}

/** Policy document pages: draft banner + noindex while unpublished. */
export function shouldTreatPoliciesAsDraft(): boolean {
  return !legalConfig.policiesPublished;
}
