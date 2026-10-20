/**
 * Centralized legal / policy configuration for LISENBART FILM.
 *
 * Do not invent registration numbers, entity names, or street addresses.
 * Flip `legalDetailsVerified` / `policiesPublished` only after real data is confirmed.
 */

export type RegisteredPresence = {
  countryLabel: string;
  /** Bracketed placeholders until verified — never treat as public fact. */
  legalName: string;
  addressLine: string;
  cityLine: string;
  registrationLine: string;
};

export const legalConfig = {
  /**
   * When false, unverified registration fields must not appear as real
   * on production hosts. Preview/dev may show marked placeholders.
   */
  legalDetailsVerified: false as boolean,

  /**
   * When false, Privacy / Cookie pages are review drafts only.
   * Production footer omits those links until this is true.
   */
  policiesPublished: false as boolean,

  brandDescriptor: "Independent Creative Studio · Est. 2006",

  copyrightYear: 2026,

  legalSectionLabel: "Registered business information",

  pendingNote: "Details pending verification",

  /** Soft presence line when placeholders are withheld (production + unverified). */
  presenceSummary: "Registered business presence in Canada and Ukraine.",

  presenceContactHint: "For formal notices, email",

  canada: {
    countryLabel: "Canada",
    legalName: "[CANADA — REGISTERED LEGAL NAME]",
    addressLine: "[CANADA — REGISTERED ADDRESS]",
    cityLine: "[CANADA — CITY, PROVINCE, POSTAL CODE]",
    registrationLine: "[CANADA — REGISTRATION NUMBER]",
  } satisfies RegisteredPresence,

  ukraine: {
    countryLabel: "Ukraine",
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

/** True when Vite is building/serving a legal-preview context (Netlify DP / local). */
export function isLegalPreviewContext(): boolean {
  if (import.meta.env.DEV) return true;
  return import.meta.env.VITE_LEGAL_PREVIEW === "true";
}

/**
 * Show bracketed registration placeholders (with pending note).
 * Never on production when unverified.
 */
export function shouldShowLegalPlaceholders(): boolean {
  if (legalConfig.legalDetailsVerified) return false;
  return isLegalPreviewContext();
}

/** Show verified registration blocks (real data only). */
export function shouldShowVerifiedLegalDetails(): boolean {
  return legalConfig.legalDetailsVerified;
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
