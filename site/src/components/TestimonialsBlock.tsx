import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type MouseEvent,
  type PointerEvent,
} from "react";
import { AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { testimonials, type Testimonial } from "@/data/testimonials";
import { site } from "@/data/site";
import TestimonialCard from "./TestimonialCard";
import TestimonialReadPopover from "./TestimonialReadPopover";
import TestimonialSubmitPopover from "./TestimonialSubmitPopover";
import type { ClickPoint } from "@/lib/popoverCoords";

function getScrollStep(viewport: HTMLElement) {
  const firstItem = viewport.querySelector<HTMLElement>(".testimonial-slide");
  const track = viewport.querySelector<HTMLElement>(".testimonial-track");
  if (!firstItem || !track) return 0;

  const gap = Number.parseFloat(getComputedStyle(track).gap || "0") || 0;
  const cardWidth = firstItem.getBoundingClientRect().width;
  return cardWidth + gap;
}

export default function TestimonialsBlock() {
  const blockRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({ active: false, startX: 0, scrollLeft: 0 });
  const isResettingRef = useRef(false);
  const resetTimeoutRef = useRef<number | null>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [fadeStart, setFadeStart] = useState(false);
  const [fadeEnd, setFadeEnd] = useState(false);
  const [hasOverflow, setHasOverflow] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [submitOpen, setSubmitOpen] = useState(false);
  const [readOpen, setReadOpen] = useState(false);
  const [readClickPoint, setReadClickPoint] = useState<ClickPoint | null>(null);
  const [readItem, setReadItem] = useState<Testimonial | null>(null);

  const count = testimonials.length;

  const updateScrollState = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const maxScroll = viewport.scrollWidth - viewport.clientWidth;
    const overflow = maxScroll > 1;

    setHasOverflow(overflow);

    const step = getScrollStep(viewport);
    if (step > 0) {
      const slideIndex = Math.min(Math.max(Math.round(viewport.scrollLeft / step), 0), count - 1);
      setActiveIndex(slideIndex);
    }

    if (!overflow) {
      setFadeStart(false);
      setFadeEnd(false);
      return;
    }

    setFadeStart(viewport.scrollLeft > 2);
    setFadeEnd(viewport.scrollLeft < maxScroll - 2);
  }, [count]);

  const resetToStart = useCallback((behavior: ScrollBehavior = "smooth") => {
    const viewport = viewportRef.current;
    if (!viewport || isResettingRef.current || dragRef.current.active) return;

    if (viewport.scrollLeft <= 2) {
      setActiveIndex(0);
      return;
    }

    isResettingRef.current = true;
    viewport.scrollTo({ left: 0, behavior });
  }, []);

  const handleScrollSettled = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport || dragRef.current.active) return;

    if (isResettingRef.current) {
      if (viewport.scrollLeft <= 2) {
        isResettingRef.current = false;
        setActiveIndex(0);
        updateScrollState();
      }
      return;
    }

    resetToStart();
    updateScrollState();
  }, [resetToStart, updateScrollState]);

  const queueScrollSettled = useCallback(() => {
    if (resetTimeoutRef.current !== null) {
      window.clearTimeout(resetTimeoutRef.current);
    }

    resetTimeoutRef.current = window.setTimeout(() => {
      handleScrollSettled();
      resetTimeoutRef.current = null;
    }, 120);
  }, [handleScrollSettled]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    updateScrollState();

    const onScroll = () => {
      if (isResettingRef.current) return;
      updateScrollState();
    };

    const onScrollEnd = () => {
      handleScrollSettled();
    };

    viewport.addEventListener("scroll", onScroll, { passive: true });
    viewport.addEventListener("scrollend", onScrollEnd);
    viewport.addEventListener("touchend", onScrollEnd, { passive: true });

    const resizeObserver = new ResizeObserver(updateScrollState);
    resizeObserver.observe(viewport);

    return () => {
      viewport.removeEventListener("scroll", onScroll);
      viewport.removeEventListener("scrollend", onScrollEnd);
      viewport.removeEventListener("touchend", onScrollEnd);
      resizeObserver.disconnect();

      if (resetTimeoutRef.current !== null) {
        window.clearTimeout(resetTimeoutRef.current);
      }
    };
  }, [handleScrollSettled, updateScrollState]);

  const scrollByCard = useCallback((direction: -1 | 1) => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const step = getScrollStep(viewport);
    if (step <= 0) return;

    viewport.scrollBy({ left: direction * step, behavior: "smooth" });
  }, []);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      scrollByCard(-1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      scrollByCard(1);
    }
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0 || event.pointerType === "touch") return;

    const viewport = viewportRef.current;
    if (!viewport || !hasOverflow) return;

    isResettingRef.current = false;

    dragRef.current = {
      active: true,
      startX: event.clientX,
      scrollLeft: viewport.scrollLeft,
    };
    setIsDragging(true);
    viewport.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const viewport = viewportRef.current;
    if (!viewport || !dragRef.current.active) return;

    const delta = event.clientX - dragRef.current.startX;
    viewport.scrollLeft = dragRef.current.scrollLeft - delta;
  };

  const endDrag = (event: PointerEvent<HTMLDivElement>) => {
    const viewport = viewportRef.current;
    if (!viewport || !dragRef.current.active) return;

    dragRef.current.active = false;
    setIsDragging(false);
    viewport.releasePointerCapture(event.pointerId);
    queueScrollSettled();
  };

  const closeSubmit = () => {
    setSubmitOpen(false);
  };

  const closeRead = () => {
    setReadOpen(false);
    setReadClickPoint(null);
    setReadItem(null);
  };

  const handleAddOpen = () => {
    if (submitOpen) {
      closeSubmit();
      return;
    }

    closeRead();
    setSubmitOpen(true);
  };

  const handleReadOpen = (item: Testimonial, event: MouseEvent<HTMLElement>) => {
    if (item.confirmed !== true) return;
    event.stopPropagation();
    setReadItem(item);
    setReadClickPoint({ x: event.clientX, y: event.clientY });
    setReadOpen(true);
  };

  if (testimonials.length === 0) return null;

  return (
    <div className="experience-testimonials">
      <article ref={blockRef} className="testimonials-block" aria-label="Client testimonials">
        <div className="testimonials-block-header">
          <h3 className="testimonials-block-title how-col-title how-col-title-cyan">
            {site.testimonialsBlock.title}
          </h3>
        </div>

        <div className="testimonial-carousel-row">
          <div
            className="testimonial-carousel"
            data-scrollable={hasOverflow ? "true" : "false"}
          >
            {hasOverflow && (
              <div
                className={`testimonial-carousel-fade testimonial-carousel-fade--start${fadeStart ? " is-visible" : ""}`}
                aria-hidden="true"
              />
            )}

            <div
              ref={viewportRef}
              className={`testimonial-viewport${isDragging ? " is-dragging" : ""}`}
              tabIndex={hasOverflow ? 0 : undefined}
              aria-roledescription="carousel"
              onKeyDown={hasOverflow ? handleKeyDown : undefined}
              onPointerDown={hasOverflow ? handlePointerDown : undefined}
              onPointerMove={hasOverflow ? handlePointerMove : undefined}
              onPointerUp={hasOverflow ? endDrag : undefined}
              onPointerCancel={hasOverflow ? endDrag : undefined}
            >
              <ul className="testimonial-track" role="list">
                {testimonials.map((item) => (
                  <li key={item.id} className="testimonial-slide">
                    <TestimonialCard item={item} onRead={handleReadOpen} />
                  </li>
                ))}
              </ul>
            </div>

            {hasOverflow && (
              <div
                className={`testimonial-carousel-fade testimonial-carousel-fade--end${fadeEnd ? " is-visible" : ""}`}
                aria-hidden="true"
              />
            )}
          </div>

          <button
            type="button"
            className="testimonial-add-card"
            onClick={handleAddOpen}
            aria-label={site.testimonialsBlock.addLabel}
            aria-haspopup="dialog"
            aria-expanded={submitOpen}
          >
            <span className="testimonial-add-card-icon" aria-hidden="true">
              <Plus size={32} strokeWidth={2.2} />
            </span>
          </button>
        </div>

        {testimonials.length > 1 && (
          <div
            className="testimonial-dots"
            role="tablist"
            aria-label="Testimonial slides"
          >
            {testimonials.map((item, index) => (
              <span
                key={item.id}
                role="tab"
                aria-selected={index === activeIndex}
                aria-label={`Slide ${index + 1} of ${testimonials.length}`}
                className={`testimonial-dot${index === activeIndex ? " is-active" : ""}`}
              />
            ))}
          </div>
        )}
      </article>

      <AnimatePresence>
        {submitOpen && (
          <TestimonialSubmitPopover key="testimonial-submit" onClose={closeSubmit} />
        )}
        {readOpen && readClickPoint && readItem && (
          <TestimonialReadPopover
            clickPoint={readClickPoint}
            testimonial={readItem}
            rootRef={blockRef}
            onClose={closeRead}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
