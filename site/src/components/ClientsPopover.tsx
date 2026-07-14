import { useEffect, useLayoutEffect, useRef, useState, type RefObject } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { ChevronRight, Star, X } from "lucide-react";
import { clients } from "@/data/clients";
import { site } from "@/data/site";
import { workEntryHref } from "@/lib/routes";

interface ClickPoint {
  x: number;
  y: number;
}

interface ClientsPopoverProps {
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

const starColorCycle = ["yellow", "cyan"] as const;

export default function ClientsPopover({ clickPoint, rootRef, onClose }: ClientsPopoverProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const copy = site.clientsModal;
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
      aria-labelledby="clients-popover-title"
      tabIndex={-1}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: isReady ? 1 : 0, scale: isReady ? 1 : 0.96 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ type: "spring", stiffness: 420, damping: 32, mass: 0.82 }}
      className="clients-popover capability-showreel-modal modal-panel fixed z-[100] flex max-h-[min(72vh,28rem)] flex-col overflow-hidden rounded-[20px] outline-none"
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
            id="clients-popover-title"
            className="font-display text-xl font-medium leading-tight tracking-[0.01em] text-text-primary"
          >
            {copy.title}
          </h2>
          <p className="mt-2 text-sm font-medium uppercase tracking-[0.14em] text-text-secondary">
            {copy.subtitle}
          </p>
        </div>

        <ul className="clients-popover-list mt-4 min-h-0 flex-1 overflow-y-auto overscroll-contain">
          {clients.map((name, index) => (
            <li key={name} className="clients-popover-item">
              <Star
                className={`clients-popover-star clients-popover-star--${starColorCycle[index % starColorCycle.length]}`}
                size={11}
                strokeWidth={0}
                fill="currentColor"
                aria-hidden="true"
              />
              <span>{name}</span>
            </li>
          ))}
        </ul>

        <div className="mt-4 shrink-0">
          <a
            href={workEntryHref()}
            className="gradient-button-emerald btn-on-accent capability-showreel-modal__cta inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium uppercase tracking-[0.12em]"
          >
            {copy.casesCtaLabel}
            <ChevronRight size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
    </motion.div>,
    document.body,
  );
}
