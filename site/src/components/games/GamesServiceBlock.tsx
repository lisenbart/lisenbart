import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import FilmReveal from "@/components/film/FilmReveal";
import { Arrow } from "@/components/film/FilmIcons";
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
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateRailNav = useCallback(() => {
    const rail = railRef.current;
    if (!rail) {
      setCanScrollLeft(false);
      setCanScrollRight(false);
      return;
    }
    const maxScroll = rail.scrollWidth - rail.clientWidth;
    if (maxScroll <= 2) {
      setCanScrollLeft(false);
      setCanScrollRight(false);
      return;
    }
    setCanScrollLeft(rail.scrollLeft > 2);
    setCanScrollRight(rail.scrollLeft < maxScroll - 2);
  }, []);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    if (!isMobile) {
      rail.querySelectorAll<HTMLElement>(".games-proof-card.is-active").forEach((card) => {
        card.classList.remove("is-active");
      });
    }

    let raf = 0;
    const updateActive = () => {
      if (!isMobile) return;
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
      raf = requestAnimationFrame(() => {
        updateActive();
        updateRailNav();
      });
    };

    updateActive();
    updateRailNav();
    rail.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);

    const ro =
      typeof ResizeObserver !== "undefined" ? new ResizeObserver(onScrollOrResize) : null;
    ro?.observe(rail);

    return () => {
      cancelAnimationFrame(raf);
      rail.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      ro?.disconnect();
    };
  }, [isMobile, children, updateRailNav]);

  const scrollRail = (direction: -1 | 1) => {
    const rail = railRef.current;
    if (!rail) return;
    const firstCard = rail.querySelector<HTMLElement>(".games-proof-card");
    const step = firstCard
      ? firstCard.getBoundingClientRect().width +
        (Number.parseFloat(getComputedStyle(rail).columnGap || "0") || 8)
      : rail.clientWidth * 0.75;
    rail.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  const showDesktopNav = !isMobile && (canScrollLeft || canScrollRight);

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
        {showDesktopNav ? (
          <div className="games-service__rail-nav">
            {canScrollLeft ? (
              <button
                type="button"
                className="games-service__rail-btn games-service__rail-btn--prev"
                aria-label="Scroll previews left"
                onClick={() => scrollRail(-1)}
              >
                <span className="circle-link games-service__rail-btn-circle" aria-hidden="true">
                  <Arrow />
                </span>
              </button>
            ) : null}
            {canScrollRight ? (
              <button
                type="button"
                className="games-service__rail-btn games-service__rail-btn--next"
                aria-label="Scroll previews right"
                onClick={() => scrollRail(1)}
              >
                <span className="circle-link games-service__rail-btn-circle" aria-hidden="true">
                  <Arrow />
                </span>
              </button>
            ) : null}
          </div>
        ) : null}
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
