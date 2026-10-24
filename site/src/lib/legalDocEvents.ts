export type LegalDocKind = "legal" | "privacy" | "cookies";

export const LEGAL_DOC_OPEN_EVENT = "lisenbart:open-legal-doc";

type OpenDetail = { kind: LegalDocKind };

/** Open Legal / Privacy / Cookie content in the on-page modal (stay on current route). */
export function openLegalDoc(kind: LegalDocKind): void {
  window.dispatchEvent(
    new CustomEvent<OpenDetail>(LEGAL_DOC_OPEN_EVENT, { detail: { kind } }),
  );
}
