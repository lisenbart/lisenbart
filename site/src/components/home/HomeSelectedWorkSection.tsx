import FilmReveal from "@/components/film/FilmReveal";
import FilmShowreel from "@/components/film/FilmShowreel";
import { Arrow } from "@/components/film/FilmIcons";
import { sectionIds, site } from "@/data/site";
import { hubCanonicalHref } from "@/lib/routes";

/** Featured commercial showreel — reuses Client Work Vimeo + poster. */
export default function HomeSelectedWorkSection() {
  const { selectedWork } = site;
  const reel = site.commercialPage.showreel;

  return (
    <section
      id={sectionIds.selectedWork}
      className="home-b2b home-selected-work scroll-mt-[var(--header-offset)]"
      aria-labelledby="home-selected-work-heading"
    >
      <div className="home-b2b__header home-b2b__header--row">
        <FilmReveal>
          <h2 id="home-selected-work-heading" className="home-b2b__heading">
            {selectedWork.label}
          </h2>
        </FilmReveal>
        <FilmReveal delayMs={60}>
          <a className="home-b2b__text-link" href={hubCanonicalHref("client-work")}>
            {selectedWork.cta}
            <span className="home-b2b__text-link-arrow" aria-hidden="true">
              <Arrow />
            </span>
          </a>
        </FilmReveal>
      </div>

      <FilmReveal delayMs={100}>
        <FilmShowreel
          id="home-advertising-reel"
          label={reel.label}
          poster={reel.poster}
          vimeoId={reel.vimeoId}
        />
      </FilmReveal>
    </section>
  );
}
