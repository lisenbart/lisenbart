import { useEffect, useLayoutEffect, useRef, useState, type RefObject } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { ChevronRight, X } from "lucide-react";
import { sectionIds, scrollToSection, site } from "@/data/site";

interface ClickPoint {
  x: number;
  y: number;
}

interface CapabilityShowreelPopoverProps {
  categoryTitle: string;
  clickPoint: ClickPoint;
  rootRef: RefObject<HTMLElement | null>;
  onClose: () => void;
}

interface PanelCoords {
  top: number;
  left: number;
}

const POPOVER_WIDTH = 280;
const VIEWPORT_PADDING = 12;

const itemMotion = {
  initial: { opacity: 0, y: 8 },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.05 + index * 0.06,
      duration: 0.24,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

function clampPanelCoords(
  clickPoint: ClickPoint,
  panel: HTMLElement,
  cta: HTMLElement,
): PanelCoords {
  const panelRect = panel.getBoundingClientRect();
  const ctaRect = cta.getBoundingClientRect();

  const ctaCenterX = ctaRect.left - panelRect.left + ctaRect.width / 2;
  const ctaCenterY = ctaRect.top - panelRect.top + ctaRect.height / 2;

  let left = clickPoint.x - ctaCenterX;
  let top = clickPoint.y - ctaCenterY;

  left = Math.max(VIEWPORT_PADDING, Math.min(left, window.innerWidth - panelRect.width - VIEWPORT_PADDING));
  top = Math.max(VIEWPORT_PADDING, Math.min(top, window.innerHeight - panelRect.height - VIEWPORT_PADDING));

  return { top, left };
}

export default function CapabilityShowreelPopover({
  categoryTitle,
  clickPoint,
  rootRef,
  onClose,
}: CapabilityShowreelPopoverProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const copy = site.capabilityShowreelModal;
  const [coords, setCoords] = useState<PanelCoords | null>(null);

  useLayoutEffect(() => {
    const panel = panelRef.current;
    const cta = ctaRef.current;
    if (!panel || !cta) return;

    const update = () => {
      setCoords(clampPanelCoords(clickPoint, panel, cta));
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [clickPoint, categoryTitle]);

  useEffect(() => {
    ctaRef.current?.focus({ preventScroll: true });
  }, [coords]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  useEffect(() => {
    const onScroll = () => onClose();
    window.addEventListener("scroll", onScroll, true);
    return () => window.removeEventListener("scroll", onScroll, true);
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

  const handleCta = () => {
    scrollToSection(sectionIds.contact, onClose);
  };

  const isReady = coords !== null;

  return createPortal(
    <motion.div
      ref={panelRef}
      role="dialog"
      aria-labelledby="capability-showreel-title"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: isReady ? 1 : 0, scale: isReady ? 1 : 0.96 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ type: "spring", stiffness: 420, damping: 32, mass: 0.82 }}
      className="capability-showreel-popover capability-showreel-modal modal-panel fixed z-[90] overflow-hidden rounded-[20px]"
      style={{
        top: coords?.top ?? clickPoint.y,
        left: coords?.left ?? clickPoint.x,
        width: POPOVER_WIDTH,
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

      <div className="relative px-5 pb-5 pt-6 text-center">
        <motion.h2
          id="capability-showreel-title"
          custom={0}
          variants={itemMotion}
          initial="initial"
          animate="animate"
          className="font-display text-xl font-medium leading-tight tracking-[0.01em] text-text-primary"
        >
          {categoryTitle}
        </motion.h2>

        <motion.p
          custom={1}
          variants={itemMotion}
          initial="initial"
          animate="animate"
          className="capability-showreel-modal__soon mt-2.5 text-sm font-medium uppercase tracking-[0.14em] text-text-secondary"
        >
          {copy.soonLabel}
        </motion.p>

        <motion.div custom={2} variants={itemMotion} initial="initial" animate="animate" className="mt-5">
          <button
            ref={ctaRef}
            type="button"
            onClick={handleCta}
            className="gradient-button-emerald btn-on-accent capability-showreel-modal__cta inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium uppercase tracking-[0.12em]"
          >
            {site.ctaLabel}
            <ChevronRight size={16} aria-hidden="true" />
          </button>
        </motion.div>
      </div>
    </motion.div>,
    document.body,
  );
}
