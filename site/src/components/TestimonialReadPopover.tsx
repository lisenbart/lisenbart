import { useEffect, useLayoutEffect, useRef, useState, type RefObject } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { Star, X } from "lucide-react";
import type { Testimonial } from "@/data/testimonials";
import { site } from "@/data/site";
import { clampPopoverCoords, getPopoverWidth, type ClickPoint } from "@/lib/popoverCoords";

interface TestimonialReadPopoverProps {
  clickPoint: ClickPoint;
  testimonial: Testimonial;
  rootRef: RefObject<HTMLElement | null>;
  onClose: () => void;
}

const POPOVER_MAX_WIDTH = 380;

function ReadStars({ rating }: { rating?: number }) {
  if (!rating || rating <= 0) return null;

  return (
    <div className="testimonial-stars" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: rating }, (_, index) => (
        <Star
          key={index}
          className="testimonial-star"
          size={13}
          strokeWidth={1.75}
          fill="currentColor"
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

export default function TestimonialReadPopover({
  clickPoint,
  testimonial,
  rootRef,
  onClose,
}: TestimonialReadPopoverProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const copy = site.testimonialsBlock.readModal;
  const [coords, setCoords] = useState<ReturnType<typeof clampPopoverCoords> | null>(null);

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
      aria-labelledby="testimonial-read-title"
      tabIndex={-1}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: isReady ? 1 : 0, scale: isReady ? 1 : 0.96 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ type: "spring", stiffness: 420, damping: 32, mass: 0.82 }}
      className="testimonial-read-popover capability-showreel-modal modal-panel fixed z-[100] flex max-h-[min(72vh,28rem)] flex-col overflow-hidden rounded-[20px] outline-none"
      style={{
        top: coords?.top ?? clickPoint.y,
        left: coords?.left ?? clickPoint.x,
        width: coords?.width ?? getPopoverWidth(POPOVER_MAX_WIDTH),
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

      <div className="relative flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain px-5 pb-5 pt-6">
        <ReadStars rating={testimonial.rating} />
        <p id="testimonial-read-title" className="testimonial-client testimonial-client--read">
          {testimonial.company}
        </p>
        <blockquote className="testimonial-quote testimonial-quote--read">
          <p>&ldquo;{testimonial.quote}&rdquo;</p>
        </blockquote>
        <p className="testimonial-read-name">{testimonial.name}</p>
      </div>
    </motion.div>,
    document.body,
  );
}
