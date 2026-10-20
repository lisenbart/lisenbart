import { useEffect, type RefObject } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/** Soft background drift on .explore-strip cards while they are on screen. */
export function useExploreParallax(containerRef: RefObject<HTMLElement | null>) {
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const root = containerRef.current;
    if (!root) return;

    const strips = Array.from(root.querySelectorAll<HTMLElement>(".explore-strip"));
    if (!strips.length) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const view = window.innerHeight || 1;
      for (const strip of strips) {
        const rect = strip.getBoundingClientRect();
        if (rect.bottom < -80 || rect.top > view + 80) continue;
        const mid = rect.top + rect.height / 2;
        const offset = (mid - view / 2) * -0.05;
        strip.style.setProperty("--parallax-y", `${offset.toFixed(1)}px`);
      }
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
      for (const strip of strips) strip.style.removeProperty("--parallax-y");
    };
  }, [reduced, containerRef]);
}
