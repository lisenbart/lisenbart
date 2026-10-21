import FilmReveal from "@/components/film/FilmReveal";
import { Arrow } from "@/components/film/FilmIcons";
import { getWorkCasesByIds } from "@/data/work";
import { sectionIds, site } from "@/data/site";
import { hubCanonicalHref, originalsProjectHref } from "@/lib/routes";

export default function HomeOriginalStoriesSection() {
  const { homeOriginals } = site;
  const film = getWorkCasesByIds([homeOriginals.filmId])[0];

  if (!film?.mediaImage) return null;

  return (
    <section
      id={sectionIds.originalStories}
      className="home-b2b home-originals scroll-mt-[var(--header-offset)]"
      aria-labelledby="home-originals-heading"
    >
      <FilmReveal>
        <h2 id="home-originals-heading" className="home-b2b__heading">
          {homeOriginals.heading}
        </h2>
      </FilmReveal>
      <FilmReveal delayMs={60}>
        <p className="home-b2b__lead">{homeOriginals.lead}</p>
      </FilmReveal>

      <FilmReveal delayMs={100}>
        <a
          className="home-originals__feature"
          href={originalsProjectHref(homeOriginals.filmId)}
        >
          <div className="home-originals__media">
            <img
              src={film.mediaImage}
              alt={film.mediaImageAlt}
              width={960}
              height={540}
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="home-originals__copy">
            <p className="home-originals__eyebrow">{film.filmCategory ?? film.category}</p>
            <h3 className="home-originals__title">{homeOriginals.filmTitle}</h3>
            <p className="home-originals__result">{homeOriginals.result}</p>
          </div>
        </a>
      </FilmReveal>

      <FilmReveal delayMs={140}>
        <a className="home-b2b__text-link" href={hubCanonicalHref("originals")}>
          {homeOriginals.cta}
          <span className="home-b2b__text-link-arrow" aria-hidden="true">
            <Arrow />
          </span>
        </a>
      </FilmReveal>
    </section>
  );
}
