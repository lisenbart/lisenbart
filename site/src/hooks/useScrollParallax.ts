import { useEffect, type RefObject } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type ParallaxOptions = {
  /** Max translate in % of element height (hero art). Default 10. */
  strength?: number;
  /** Extra Y% at rest (e.g. lower home bear under the nav). Default 0. */
  baseOffset?: number;
  /** Cover scale while parallaxing. Default 1.05. */
  scale?: number;
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
  const { strength = 10, baseOffset = 0, scale = 1.05, cssVar, cssStrength = 0.045 } = options;

  useEffect(() => {
    if (reduced) return;

    const section = sectionRef.current;
    const target = targetRef.current;
    if (!section || !target) return;

    let frame = 0;
    const narrowMq = window.matchMedia("(max-width: 800px)");

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

      // Narrow viewports use CSS crop for the bear — don't override with parallax zoom.
      if (narrowMq.matches) {
        target.style.transform = "";
        return;
      }

      const travel = Math.max(rect.height, 1);
      const progress = Math.min(1, Math.max(0, -rect.top / travel));
      const y = baseOffset + progress * strength;
      // Scale from the top so cover growth doesn't open a gap under the nav.
      target.style.transformOrigin = "50% 0%";
      target.style.transform = `translate3d(0, ${y.toFixed(2)}%, 0) scale(${scale})`;
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    narrowMq.addEventListener("change", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      narrowMq.removeEventListener("change", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
      if (cssVar) target.style.removeProperty(cssVar);
      else target.style.transform = "";
    };
  }, [reduced, sectionRef, targetRef, strength, baseOffset, scale, cssVar, cssStrength]);
}
