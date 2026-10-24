/**
 * Centralized legal / policy configuration for LISENBART FILM.
 *
 * Do not invent registration numbers, entity names, or street addresses.
 * Flip per-jurisdiction `verified` / `policiesPublished` only after real data is confirmed.
 *
 * Canada source (2026-10-20): Ontario Business Name Registration for a Sole Proprietorship
 * — Business Names Act; BIN 1001421710; effective 2025-11-21; expiry 2030-11-20.
 *
 * Ukraine source (2026-10-20): Extract from the Unified State Register (EN), extract no. 37804667
 * dated 29.06.2026 — LLC "Lisenbart Film", EDRPOU 44610768.
 * Film producer: State Register Series B No. 001298 (11.02.2022), per Derzhkino criteria filing.
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
  /** When true, Privacy / Cookie pages are published (no draft banner / noindex). */
  policiesPublished: true as boolean,

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
    verified: true,
    legalName: "LISENBART FILM LLC",
    addressLine: "Pryrichna Street, building 9A, apartment 81",
    cityLine: "Kyiv 04213, Ukraine",
    registrationLine: "EDRPOU 44610768",
  } satisfies RegisteredPresence,

  /**
   * Professional accreditation (not a registered-address field).
   * Shown on Studio — not mixed into footer legal blocks.
   */
  ukraineFilmProducer: {
    verified: true,
    label: "Registered film producer in Ukraine",
    detail:
      "State Register of Film Producers, Distributors and Demonstrators of Films — Series B No. 001298 (11 February 2022)",
  },

  policies: {
    legal: {
      title: "Legal",
      path: "/legal/",
      pageTitle: "Legal Information",
      seoTitle: "Legal Information | LISENBART FILM",
      seoDescription:
        "Registered business information for LISENBART FILM in Canada and Ukraine, including legal names, addresses and registration numbers.",
    },
    privacy: {
      title: "Privacy Policy",
      path: "/privacy/",
      seoTitle: "Privacy Policy | LISENBART FILM",
      seoDescription:
        "How LISENBART FILM handles personal data on lisenbart.com: contact form, optional Google Analytics after consent, Vimeo and YouTube on play, and your rights.",
    },
    cookies: {
      title: "Cookie Policy",
      path: "/cookie-policy/",
      seoTitle: "Cookie Policy | LISENBART FILM",
      seoDescription:
        "Cookies and similar technologies on lisenbart.com: essential storage, optional Google Analytics after consent, Vimeo and YouTube on play, and how to change your choice.",
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
