import { useEffect, type RefObject } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type ParallaxOptions = {
  /** Max translate in % of element height (hero art). Default 10. */
  strength?: number;
  /** CSS custom property for background drift (explore cards). */
  cssVar?: string;
  /** Multiplier for cssVar pixel offset. Default 0.045. */
  cssStrength?: number;
};

/**
 * Subtle scroll-linked motion on a target inside a section.
 * - Without cssVar: sets translate3d on the target (hero).
 * - With cssVar: sets a CSS variable in px (explore ::before).
 */
export function useScrollParallax(
  sectionRef: RefObject<HTMLElement | null>,
  targetRef: RefObject<HTMLElement | null>,
  options: ParallaxOptions = {},
) {
  const reduced = usePrefersReducedMotion();
  const { strength = 10, cssVar, cssStrength = 0.045 } = options;

  useEffect(() => {
    if (reduced) return;

    const section = sectionRef.current;
    const target = targetRef.current;
    if (!section || !target) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const view = window.innerHeight || 1;

      if (cssVar) {
        const mid = rect.top + rect.height / 2;
        const offset = (mid - view / 2) * -cssStrength;
        target.style.setProperty(cssVar, `${offset.toFixed(1)}px`);
        return;
      }

      const travel = Math.max(rect.height, 1);
      const progress = Math.min(1, Math.max(0, -rect.top / travel));
      target.style.transform = `translate3d(0, ${(progress * strength).toFixed(2)}%, 0) scale(1.05)`;
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
      if (cssVar) target.style.removeProperty(cssVar);
      else target.style.transform = "";
    };
  }, [reduced, sectionRef, targetRef, strength, cssVar, cssStrength]);
}
