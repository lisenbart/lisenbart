import { useEffect, useLayoutEffect, useRef, useState, type RefObject } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { ChevronRight, X } from "lucide-react";
import { site, sectionIds } from "@/data/site";
import { routes } from "@/lib/routes";

interface ClickPoint {
  x: number;
  y: number;
}

interface TeamPopoverProps {
  clickPoint: ClickPoint;
  rootRef: RefObject<HTMLElement | null>;
  onClose: () => void;
}

interface PanelCoords {
  top: number;
  left: number;
  width: number;
}

const POPOVER_MAX_WIDTH = 360;
const VIEWPORT_PADDING = 12;
const MOBILE_BOTTOM_INSET = 76;

function getPopoverWidth() {
  return Math.min(POPOVER_MAX_WIDTH, window.innerWidth - VIEWPORT_PADDING * 2);
}

function clampPanelCoords(clickPoint: ClickPoint, panel: HTMLElement): PanelCoords {
  const panelRect = panel.getBoundingClientRect();
  const width = getPopoverWidth();
  const bottomInset = window.innerWidth < 768 ? MOBILE_BOTTOM_INSET : 0;

  let left = clickPoint.x - width / 2;
  let top = clickPoint.y - 28;

  left = Math.max(VIEWPORT_PADDING, Math.min(left, window.innerWidth - width - VIEWPORT_PADDING));
  top = Math.max(
    VIEWPORT_PADDING,
    Math.min(top, window.innerHeight - panelRect.height - VIEWPORT_PADDING - bottomInset),
  );

  return { top, left, width };
}

export default function TeamPopover({ clickPoint, rootRef, onClose }: TeamPopoverProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const copy = site.teamModal;
  const [coords, setCoords] = useState<PanelCoords | null>(null);

  useLayoutEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    const update = () => {
      setCoords(clampPanelCoords(clickPoint, panel));
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [clickPoint]);

  useEffect(() => {
    panelRef.current?.focus({ preventScroll: true });
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
      if (rootRef.current?.contains(target)) return;
      if (panelRef.current?.contains(target)) return;
      onClose();
    };

    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [onClose, rootRef]);

  const isReady = coords !== null;

  return createPortal(
    <motion.div
      ref={panelRef}
      role="dialog"
      aria-labelledby="team-popover-title"
      tabIndex={-1}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: isReady ? 1 : 0, scale: isReady ? 1 : 0.96 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ type: "spring", stiffness: 420, damping: 32, mass: 0.82 }}
      className="team-popover studio-popover clients-popover capability-showreel-modal modal-panel fixed z-[100] flex max-h-[min(72vh,28rem)] flex-col overflow-hidden rounded-[20px] outline-none"
      style={{
        top: coords?.top ?? clickPoint.y,
        left: coords?.left ?? clickPoint.x,
        width: coords?.width ?? getPopoverWidth(),
        visibility: isReady ? "visible" : "hidden",
        pointerEvents: isReady ? "auto" : "none",
      }}
      onClick={(event) => event.stopPropagation()}
    >
      <div className="capability-showreel-modal__glow" aria-hidden="true" />

      <button
        type="button"
        onClick={onClose}
        className="modal-close-btn absolute right-2.5 top-2.5 z-10 flex h-9 w-9 items-center justify-center rounded-full backdrop-blur-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--link-accent)]"
        aria-label={copy.closeLabel}
      >
        <X size={18} />
      </button>

      <div className="relative flex min-h-0 flex-1 flex-col px-5 pb-5 pt-6">
        <div className="shrink-0 text-center">
          <h2
            id="team-popover-title"
            className="font-display text-xl font-medium leading-tight tracking-[0.01em] text-text-primary"
          >
            {copy.title}
          </h2>
          <p className="mt-2 text-sm font-medium uppercase tracking-[0.14em] text-text-secondary">
            {copy.subtitle}
          </p>
        </div>

        <div className="studio-popover-body mt-4 min-h-0 flex-1 overflow-y-auto overscroll-contain">
          <p className="studio-popover-intro">{copy.intro}</p>
          <p className="studio-popover-text">{copy.body}</p>
          <ul className="studio-popover-highlights">
            {copy.highlights.map((item) => (
              <li key={item} className="studio-popover-highlight">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-4 shrink-0">
          <a
            href={`${routes.home}#${sectionIds.contact}`}
            className="gradient-button-emerald btn-on-accent capability-showreel-modal__cta inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium uppercase tracking-[0.12em]"
          >
            {copy.ctaLabel}
            <ChevronRight size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
    </motion.div>,
    document.body,
  );
}
