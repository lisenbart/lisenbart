import { ArrowUpRight, ChevronRight } from "lucide-react";
import ReelSlideshow from "@/components/ReelSlideshow";
import { sectionIds, site } from "@/data/site";
import { hubCanonicalHref } from "@/lib/routes";

function DirectionPanel({
  variant,
  href,
  ariaLabel,
  title,
  text,
  images,
  intervalMs = 3400,
  external = false,
}: {
  variant: "film" | "commercial" | "games";
  href: string;
  ariaLabel: string;
  title: string;
  text: string;
  images?: readonly string[];
  intervalMs?: number;
  external?: boolean;
}) {
  const isGames = variant === "games";

  return (
    <a
      className={`archive-panel archive-panel--${variant}`}
      href={href}
      aria-label={ariaLabel}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <span className="archive-panel__bezel">
        <span className="archive-panel__screen">
          {images && images.length > 0 ? (
            <span className="archive-panel__media" aria-hidden="true">
              <ReelSlideshow images={[...images]} alt="" intervalMs={intervalMs} />
            </span>
          ) : (
            <span className="archive-panel__media archive-panel__media--games" aria-hidden="true">
              <span className="archive-panel__games-mark">
                <span className="archive-panel__games-word">LISENBART</span>
                <span className="archive-panel__games-badge">{site.explorePaths.games.mark}</span>
              </span>
            </span>
          )}
          <span className="archive-panel__overlay" aria-hidden="true" />
          <div className="archive-panel__content">
            <div className="archive-panel__heading">
              <h3 className="archive-panel__title">{title}</h3>
              <span className="archive-panel__cta" aria-hidden="true">
                {isGames ? <ArrowUpRight size={26} strokeWidth={2.4} /> : <ChevronRight size={28} strokeWidth={2.5} />}
              </span>
            </div>
            <p className="archive-panel__text">{text}</p>
          </div>
          <span className="archive-panel__home" aria-hidden="true" />
        </span>
      </span>
    </a>
  );
}

export default function StudioDirectionsSection() {
  const { explorePaths } = site;
  const title = explorePaths.titleLines.join(" ");

  return (
    <section id={sectionIds.explore} className="archive-explore scroll-mt-24" aria-labelledby="explore-work-heading">
      <div className="archive-explore__inner archive-container">
        <h2 id="explore-work-heading" className="archive-explore__title archive-explore__title--studio">
          {title}
        </h2>

        <div className="archive-explore__panels archive-explore__panels--studio">
          <DirectionPanel
            variant="film"
            href={hubCanonicalHref("originals")}
            ariaLabel={explorePaths.film.ctaAria}
            title={explorePaths.film.title}
            text={explorePaths.film.text}
            images={explorePaths.film.previewImages}
            intervalMs={3400}
          />
          <DirectionPanel
            variant="commercial"
            href={hubCanonicalHref("client-work")}
            ariaLabel={explorePaths.commercial.ctaAria}
            title={explorePaths.commercial.title}
            text={explorePaths.commercial.text}
            images={explorePaths.commercial.previewImages}
            intervalMs={3900}
          />
          <DirectionPanel
            variant="games"
            href={explorePaths.games.href}
            ariaLabel={explorePaths.games.ctaAria}
            title={explorePaths.games.title}
            text={explorePaths.games.text}
            external
          />
        </div>
      </div>
    </section>
  );
}
