import { ChevronRight } from "lucide-react";
import { publicAsset } from "@/lib/publicAsset";
import { sectionIds, site } from "@/data/site";
import { routes } from "@/lib/routes";

const PANEL_MEDIA = {
  film: "/images/work/unnecessary-things-preview.webp",
  commercial: "/images/work/lisenbart-showreel-preview.jpg",
} as const;

export default function ExplorePathsSection() {
  const { explorePaths } = site;

  return (
    <section
      id={sectionIds.explore}
      className="archive-explore scroll-mt-24"
      aria-label="Film and commercial work"
    >
      <div className="archive-explore__inner archive-container">
        <h2 className="archive-h2 archive-explore__title">{explorePaths.title}</h2>

        <div className="archive-explore__panels">
          <a className="archive-panel archive-panel--film" href={routes.film}>
            <span
              className="archive-panel__bg"
              style={{ backgroundImage: `url(${publicAsset(PANEL_MEDIA.film)})` }}
              aria-hidden="true"
            />
            <span className="archive-panel__veil" aria-hidden="true" />
            <span className="archive-panel__label">{explorePaths.film.label}</span>
            <h3 className="archive-panel__title">{explorePaths.film.title}</h3>
            <p className="archive-panel__text">{explorePaths.film.text}</p>
            <span className="archive-panel__cta">
              Explore Film
              <ChevronRight size={16} strokeWidth={2.25} aria-hidden="true" />
            </span>
          </a>

          <a className="archive-panel archive-panel--commercial" href={routes.commercial}>
            <span
              className="archive-panel__bg"
              style={{ backgroundImage: `url(${publicAsset(PANEL_MEDIA.commercial)})` }}
              aria-hidden="true"
            />
            <span className="archive-panel__veil" aria-hidden="true" />
            <span className="archive-panel__label">{explorePaths.commercial.label}</span>
            <h3 className="archive-panel__title">{explorePaths.commercial.title}</h3>
            <p className="archive-panel__text">{explorePaths.commercial.text}</p>
            <span className="archive-panel__cta">
              Explore Commercial
              <ChevronRight size={16} strokeWidth={2.25} aria-hidden="true" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
