import { useEffect } from "react";
import { createPortal } from "react-dom";

export default function PlayableModal({
  open,
  src,
  title,
  onClose,
}: {
  open: boolean;
  src: string | null;
  title: string;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div className="playable-modal" role="dialog" aria-modal="true" aria-label={title}>
      <button
        type="button"
        className="playable-modal__backdrop"
        aria-label="Close"
        onClick={onClose}
      />
      <div className="playable-modal__stage">
        <button type="button" className="playable-modal__close" onClick={onClose}>
          ✕
        </button>
        <div className="playable-modal__phone">
          {src ? (
            <iframe
              className="playable-modal__frame"
              title={title}
              src={src}
              allow="autoplay; fullscreen; encrypted-media"
            />
          ) : null}
        </div>
      </div>
    </div>,
    document.body,
  );
}
