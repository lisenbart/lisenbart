import { useEffect, type RefObject } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type GyroOptions = {
  /** Max translate in px. Default 10. */
  maxPx?: number;
};

function isCoarsePointer(): boolean {
  return window.matchMedia("(hover: none) and (pointer: coarse)").matches;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

/**
 * Light device-tilt drift for the home hero image on phones.
 * Sets --gyro-x / --gyro-y on the target (combined with scroll via CSS).
 * iOS 13+ requests permission on first touch of the hero — no banner on load.
 */
export function useHeroGyro(
  sectionRef: RefObject<HTMLElement | null>,
  targetRef: RefObject<HTMLElement | null>,
  options: GyroOptions = {},
) {
  const reduced = usePrefersReducedMotion();
  const maxPx = options.maxPx ?? 10;

  useEffect(() => {
    if (reduced) return;
    if (typeof window === "undefined" || !isCoarsePointer()) return;

    const section = sectionRef.current;
    const target = targetRef.current;
    if (!section || !target) return;

    let originBeta: number | null = null;
    let originGamma: number | null = null;
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;
    let frame = 0;
    let listening = false;
    let cancelled = false;

    const apply = () => {
      frame = 0;
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;
      if (Math.abs(currentX) < 0.05) currentX = 0;
      if (Math.abs(currentY) < 0.05) currentY = 0;
      target.style.setProperty("--gyro-x", `${currentX.toFixed(2)}px`);
      target.style.setProperty("--gyro-y", `${currentY.toFixed(2)}px`);
      if (
        Math.abs(targetX - currentX) > 0.05 ||
        Math.abs(targetY - currentY) > 0.05
      ) {
        frame = window.requestAnimationFrame(apply);
      }
    };

    const onOrient = (event: DeviceOrientationEvent) => {
      if (event.beta == null || event.gamma == null) return;
      if (originBeta == null || originGamma == null) {
        originBeta = event.beta;
        originGamma = event.gamma;
      }
      const dBeta = clamp(event.beta - originBeta, -18, 18);
      const dGamma = clamp(event.gamma - originGamma, -18, 18);
      targetX = (dGamma / 18) * maxPx;
      targetY = (dBeta / 18) * maxPx * 0.85;
      if (!frame) frame = window.requestAnimationFrame(apply);
    };

    const startListening = () => {
      if (listening || cancelled) return;
      listening = true;
      window.addEventListener("deviceorientation", onOrient, { passive: true });
    };

    const maybeRequestPermission = async () => {
      const DOE = DeviceOrientationEvent as unknown as {
        requestPermission?: () => Promise<"granted" | "denied" | "default">;
      };
      if (typeof DOE.requestPermission === "function") {
        try {
          const state = await DOE.requestPermission();
          if (state === "granted") startListening();
        } catch {
          /* user dismissed / unavailable */
        }
        return;
      }
      startListening();
    };

    // Android / most browsers: events without a permission prompt.
    startListening();

    // iOS: permission needs a gesture — request on first hero touch.
    const onFirstTouch = () => {
      void maybeRequestPermission();
      section.removeEventListener("touchstart", onFirstTouch);
    };
    section.addEventListener("touchstart", onFirstTouch, { passive: true });

    return () => {
      cancelled = true;
      section.removeEventListener("touchstart", onFirstTouch);
      window.removeEventListener("deviceorientation", onOrient);
      if (frame) window.cancelAnimationFrame(frame);
      target.style.removeProperty("--gyro-x");
      target.style.removeProperty("--gyro-y");
    };
  }, [reduced, sectionRef, targetRef, maxPx]);
}
