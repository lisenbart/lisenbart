import { ChevronRight } from "lucide-react";
import { sectionIds, site } from "@/data/site";
import { routes } from "@/lib/routes";

export default function ExplorePathsSection() {
  const { explorePaths } = site;

  return (
    <section
      id={sectionIds.explore}
      className="scroll-mt-24 px-[var(--page-padding)] pb-[var(--section-spacing)]"
      aria-label="Film and commercial work"
    >
      <div className="mx-auto w-full min-w-0 max-w-[920px]">
        <article className="how-ios-card">
          <div className="how-ios-card-inner">
            <h2 className="how-col-title section-heading">{explorePaths.title}</h2>

            <div className="explore-paths-grid">
              <a className="explore-path-card" href={routes.film}>
                <span className="explore-path-card__label work-page-title--film-entertainment">
                  {explorePaths.film.label}
                </span>
                <h3 className="explore-path-card__title">{explorePaths.film.title}</h3>
                <p className="explore-path-card__text">{explorePaths.film.text}</p>
                <span className="explore-path-card__action" aria-hidden="true">
                  <ChevronRight className="explore-path-card__chevron" size={18} strokeWidth={2} />
                </span>
              </a>

              <a className="explore-path-card" href={routes.commercial}>
                <span className="explore-path-card__label work-page-title--commercial">
                  {explorePaths.commercial.label}
                </span>
                <h3 className="explore-path-card__title">{explorePaths.commercial.title}</h3>
                <p className="explore-path-card__text">{explorePaths.commercial.text}</p>
                <span className="explore-path-card__action" aria-hidden="true">
                  <ChevronRight className="explore-path-card__chevron" size={18} strokeWidth={2} />
                </span>
              </a>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
