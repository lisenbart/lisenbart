import { ChevronRight } from "lucide-react";
import { publicAsset } from "@/lib/publicAsset";
import { sectionIds, site } from "@/data/site";
import { routes } from "@/lib/routes";

const PANEL_MEDIA = {
  film: "/images/work/unnecessary-things-preview.webp",
  commercial: "/images/work/lisenbart-showreel-preview.jpg",
} as const;

function DirectionPanel({
  variant,
  href,
  ariaLabel,
  title,
  text,
  media,
}: {
  variant: "film" | "commercial";
  href: string;
  ariaLabel: string;
  title: string;
  text: string;
  media: string;
}) {
  return (
    <a
      className={`archive-panel archive-panel--${variant}`}
      href={href}
      aria-label={ariaLabel}
    >
      <span
        className="archive-panel__media"
        style={{ backgroundImage: `url(${publicAsset(media)})` }}
        aria-hidden="true"
      />
      <span className="archive-panel__overlay" aria-hidden="true" />
      <div className="archive-panel__content">
        <div className="archive-panel__heading">
          <h3 className="archive-panel__title">{title}</h3>
          <span className="archive-panel__cta" aria-hidden="true">
            <ChevronRight size={28} strokeWidth={2.5} />
          </span>
        </div>
        <p className="archive-panel__text">{text}</p>
      </div>
    </a>
  );
}

export default function ExplorePathsSection() {
  const { explorePaths } = site;
  const [line1, line2] = explorePaths.titleLines;

  return (
    <section id={sectionIds.explore} className="archive-explore scroll-mt-24" aria-labelledby="explore-work-heading">
      <div className="archive-explore__inner archive-container">
        <h2 id="explore-work-heading" className="archive-explore__title">
          <span className="archive-explore__title-line">{line1}</span>
          <span className="archive-explore__title-line archive-explore__title-line--offset">{line2}</span>
        </h2>

        <div className="archive-explore__panels">
          <DirectionPanel
            variant="film"
            href={routes.film}
            ariaLabel={explorePaths.film.ctaAria}
            title={explorePaths.film.title}
            text={explorePaths.film.text}
            media={PANEL_MEDIA.film}
          />
          <DirectionPanel
            variant="commercial"
            href={routes.commercial}
            ariaLabel={explorePaths.commercial.ctaAria}
            title={explorePaths.commercial.title}
            text={explorePaths.commercial.text}
            media={PANEL_MEDIA.commercial}
          />
        </div>
      </div>
    </section>
  );
}
