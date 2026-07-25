import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { Send, X } from "lucide-react";
import { site } from "@/data/site";
import { clampPopoverCoords, getPopoverWidth, type ClickPoint } from "@/lib/popoverCoords";

interface PersonPopoverProps {
  name: string;
  role: string;
  note: string;
  clickPoint: ClickPoint;
  onClose: () => void;
}

const POPOVER_MAX_WIDTH = 360;

function firstName(fullName: string) {
  return fullName.trim().split(/\s+/)[0] || fullName;
}

export default function PersonPopover({
  name,
  role,
  note,
  clickPoint,
  onClose,
}: PersonPopoverProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [coords, setCoords] = useState<ReturnType<typeof clampPopoverCoords> | null>(null);
  const noteLabel = `A note from ${firstName(name)}`;

  useLayoutEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    const update = () => {
      setCoords(clampPopoverCoords(clickPoint, panel, POPOVER_MAX_WIDTH));
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [clickPoint]);

  useEffect(() => {
    closeRef.current?.focus({ preventScroll: true });
  }, [coords]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (panelRef.current?.contains(target)) return;
      onClose();
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [onClose]);

  const isReady = coords !== null;

  return createPortal(
    <motion.div
      ref={panelRef}
      role="dialog"
      aria-labelledby="person-popover-title"
      aria-describedby="person-popover-body"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: isReady ? 1 : 0, scale: isReady ? 1 : 0.96 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ type: "spring", stiffness: 420, damping: 32, mass: 0.82 }}
      className="person-popover modal-panel"
      style={{
        top: coords?.top ?? clickPoint.y,
        left: coords?.left ?? clickPoint.x,
        width: coords?.width ?? getPopoverWidth(POPOVER_MAX_WIDTH),
        visibility: isReady ? "visible" : "hidden",
        pointerEvents: isReady ? "auto" : "none",
      }}
      onClick={(event) => event.stopPropagation()}
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        className="modal-close-btn person-popover__close"
        aria-label="Close"
      >
        <X size={18} />
      </button>

      <div className="person-popover__body">
        <p id="person-popover-title" className="person-popover__note">
          {noteLabel}
        </p>

        <blockquote id="person-popover-body" className="person-popover__quote">
          <span className="person-popover__mark" aria-hidden="true">
            “
          </span>
          <p className="person-popover__quote-text">{note}</p>
        </blockquote>

        <div className="person-popover__attribution">
          <div className="person-popover__identity">
            <cite className="person-popover__name">{name}</cite>
            <span className="person-popover__role">{role}</span>
          </div>
          {site.email ? (
            <a
              href={`mailto:${site.email}`}
              className="person-popover__mail"
              aria-label={`Email ${name} at ${site.email}`}
              title={site.email}
            >
              <Send size={18} strokeWidth={2.25} aria-hidden="true" />
            </a>
          ) : null}
        </div>
      </div>
    </motion.div>,
    document.body,
  );
}
