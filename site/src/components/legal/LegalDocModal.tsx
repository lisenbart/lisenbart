import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  CookiePolicyBody,
  LegalInfoBody,
  PrivacyPolicyBody,
  legalDocTitle,
} from "@/components/legal/legalDocBodies";
import {
  LEGAL_DOC_OPEN_EVENT,
  type LegalDocKind,
} from "@/lib/legalDocEvents";

export { openLegalDoc } from "@/lib/legalDocEvents";

type OpenDetail = { kind: LegalDocKind };

export default function LegalDocModal() {
  const [kind, setKind] = useState<LegalDocKind | null>(null);
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const open = kind !== null;

  useEffect(() => {
    const onOpen = (event: Event) => {
      const detail = (event as CustomEvent<OpenDetail>).detail;
      if (detail?.kind) setKind(detail.kind);
    };
    window.addEventListener(LEGAL_DOC_OPEN_EVENT, onOpen);
    return () => window.removeEventListener(LEGAL_DOC_OPEN_EVENT, onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setKind(null);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (!open || typeof document === "undefined") return null;

  const title = legalDocTitle(kind);

  return createPortal(
    <div
      className="legal-doc-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <button
        type="button"
        className="legal-doc-modal__backdrop"
        aria-label="Close"
        onClick={() => setKind(null)}
      />
      <div className="legal-doc-modal__panel">
        <div className="legal-doc-modal__chrome">
          <h2 id={titleId} className="legal-doc-modal__title">
            {title}
          </h2>
          <button
            ref={closeRef}
            type="button"
            className="legal-doc-modal__close"
            onClick={() => setKind(null)}
          >
            Close
          </button>
        </div>
        <div className="legal-doc-modal__body legal-doc__body">
          {kind === "legal" ? <LegalInfoBody /> : null}
          {kind === "privacy" ? (
            <PrivacyPolicyBody onOpenLegal={() => setKind("legal")} />
          ) : null}
          {kind === "cookies" ? <CookiePolicyBody /> : null}
        </div>
      </div>
    </div>,
    document.body,
  );
}
