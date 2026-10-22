import { createPortal } from "react-dom";

/** Portaled to `document.body` so header/iframe stacking cannot block clicks. */
export default function ShowreelCloseButton({ onClose }: { onClose: () => void }) {
  if (typeof document === "undefined") return null;

  return createPortal(
    <button type="button" className="film-showreel__close" onClick={onClose}>
      Close
    </button>,
    document.body,
  );
}
