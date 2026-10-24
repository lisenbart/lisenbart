import { useEffect, useRef, useState } from "react";
import FilmReveal from "@/components/film/FilmReveal";
import { Arrow } from "@/components/film/FilmIcons";
import { site } from "@/data/site";
import { useIsNarrowViewport } from "@/hooks/useMatchMedia";
import { hubCanonicalHref } from "@/lib/routes";
import { publicAsset } from "@/lib/publicAsset";

export default function HomePathsSection() {
  const { homePaths } = site;
  const isNarrow = useIsNarrowViewport();
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeHub, setActiveHub] = useState<string | null>(null);

  useEffect(() => {
    if (!isNarrow) {
      setActiveHub(null);
      return;
    }

    const grid = gridRef.current;
    if (!grid) return;

    let raf = 0;
    const updateActive = () => {
      const mid = window.innerHeight * 0.5;
      let bestHub: string | null = null;
      let bestDist = Number.POSITIVE_INFINITY;

      grid.querySelectorAll<HTMLElement>(".home-paths__card").forEach((card) => {
        const rect = card.getBoundingClientRect();
        if (rect.bottom <= 0 || rect.top >= window.innerHeight) return;
        const center = rect.top + rect.height / 2;
        const dist = Math.abs(center - mid);
        if (dist < bestDist) {
          bestDist = dist;
          bestHub = card.dataset.pathHub ?? null;
        }
      });

      setActiveHub(bestHub);
    };

    const onScrollOrResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(updateActive);
    };

    updateActive();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [isNarrow, homePaths.items]);

  return (
    <section className="home-gateway home-paths" aria-label="Audience paths">
      <div ref={gridRef} className="home-paths__grid">
        {homePaths.items.map((item, index) => {
          const isActive = isNarrow && activeHub === item.hub;
          return (
            <FilmReveal key={item.label} delayMs={index * 60}>
              <a
                className={["home-paths__card", isActive ? "is-active" : ""].filter(Boolean).join(" ")}
                href={hubCanonicalHref(item.hub)}
                data-path-hub={item.hub}
              >
                <span className="home-paths__media">
                  <img
                    src={publicAsset(item.image)}
                    alt={item.imageAlt}
                    width={640}
                    height={360}
                    loading="lazy"
                    decoding="async"
                  />
                </span>
                <h3 className="home-paths__label">{item.label}</h3>
                <p className="home-paths__statement">{item.statement}</p>
                <p className="home-paths__text">{item.text}</p>
                <span className="film-cta home-paths__cta">
                  {item.cta}
                  <span className="home-paths__cta-arrow" aria-hidden="true">
                    <Arrow />
                  </span>
                </span>
              </a>
            </FilmReveal>
          );
        })}
      </div>
    </section>
  );
}
