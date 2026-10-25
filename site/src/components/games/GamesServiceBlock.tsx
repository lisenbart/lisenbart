import { useEffect, useRef, type ReactNode } from "react";
import FilmReveal from "@/components/film/FilmReveal";
import { useMatchMedia } from "@/hooks/useMatchMedia";

export default function GamesServiceBlock({
  titleId,
  title,
  text,
  note,
  railLabel,
  density = "video",
  sectionClassName,
  children,
}: {
  titleId: string;
  title: string;
  text: string;
  /** Delivery / timing line under the description. */
  note?: string;
  railLabel: string;
  /** `icons` = playable phone thumbs. */
  density?: "video" | "icons";
  /** Surface band classes from `studioSectionClass`. */
  sectionClassName?: string;
  children: ReactNode;
}) {
  const railRef = useRef<HTMLDivElement>(null);
  const isMobile = useMatchMedia("(max-width: 899px)");

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    if (!isMobile) {
      rail.querySelectorAll<HTMLElement>(".games-proof-card.is-active").forEach((card) => {
        card.classList.remove("is-active");
      });
      return;
    }

    let raf = 0;
    const updateActive = () => {
      const midX = window.innerWidth * 0.5;
      const midY = window.innerHeight * 0.5;
      let best: HTMLElement | null = null;
      let bestDist = Number.POSITIVE_INFINITY;

      rail.querySelectorAll<HTMLElement>(".games-proof-card").forEach((card) => {
        const rect = card.getBoundingClientRect();
        if (
          rect.bottom <= 0 ||
          rect.top >= window.innerHeight ||
          rect.right <= 0 ||
          rect.left >= window.innerWidth
        ) {
          return;
        }
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dist = Math.hypot(cx - midX, cy - midY);
        if (dist < bestDist) {
          bestDist = dist;
          best = card;
        }
      });

      const threshold = Math.min(window.innerWidth, window.innerHeight) * 0.42;
      rail.querySelectorAll<HTMLElement>(".games-proof-card").forEach((card) => {
        card.classList.toggle("is-active", Boolean(best && card === best && bestDist <= threshold));
      });
    };

    const onScrollOrResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(updateActive);
    };

    updateActive();
    rail.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
    return () => {
      cancelAnimationFrame(raf);
      rail.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [isMobile, children]);

  return (
    <section
      className={[
        sectionClassName || "studio-section",
        "games-service",
        density === "icons" ? "games-service--icons" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      aria-labelledby={titleId}
    >
      <FilmReveal>
        <div className="games-service__copy">
          <h3 id={titleId} className="studio-models__title">
            {title}
          </h3>
          <p className="studio-models__text">{text}</p>
          {note ? <p className="games-service__note">{note}</p> : null}
        </div>
      </FilmReveal>

      <div className="games-service__media">
        <div
          ref={railRef}
          className="games-service__rail"
          role="list"
          aria-label={railLabel}
        >
          {children}
        </div>
      </div>
    </section>
  );
}
