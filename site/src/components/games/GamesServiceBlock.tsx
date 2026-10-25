import { useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import FilmReveal from "@/components/film/FilmReveal";

export default function GamesServiceBlock({
  titleId,
  title,
  text,
  railLabel,
  children,
}: {
  titleId: string;
  title: string;
  text: string;
  railLabel: string;
  children: ReactNode;
}) {
  const railRef = useRef<HTMLDivElement>(null);
  const [canScroll, setCanScroll] = useState(false);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    const update = () => {
      setCanScroll(rail.scrollWidth > rail.clientWidth + 2);
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(rail);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [children]);

  const scrollByCard = (direction: -1 | 1) => {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.querySelector<HTMLElement>(".games-proof-card");
    const styles = getComputedStyle(rail);
    const gap = Number.parseFloat(styles.columnGap || styles.gap || "0") || 0;
    const step = (card?.offsetWidth ?? rail.clientWidth / 3) + gap;
    rail.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  return (
    <article className="games-service" aria-labelledby={titleId}>
      <FilmReveal>
        <div className="games-service__copy">
          <h3 id={titleId} className="studio-models__title">
            {title}
          </h3>
          <p className="studio-models__text">{text}</p>
        </div>
      </FilmReveal>

      <div className={["games-service__media", canScroll ? "is-scrollable" : ""].filter(Boolean).join(" ")}>
        {canScroll ? (
          <div className="games-service__rail-chrome">
            <button
              type="button"
              className="games-service__nav games-service__nav--prev"
              aria-label="Scroll examples left"
              onClick={() => scrollByCard(-1)}
            >
              <ChevronLeft size={18} strokeWidth={2.25} aria-hidden="true" />
            </button>
            <button
              type="button"
              className="games-service__nav games-service__nav--next"
              aria-label="Scroll examples right"
              onClick={() => scrollByCard(1)}
            >
              <ChevronRight size={18} strokeWidth={2.25} aria-hidden="true" />
            </button>
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
    </article>
  );
}
