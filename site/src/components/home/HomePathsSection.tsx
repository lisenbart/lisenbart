import FilmReveal from "@/components/film/FilmReveal";
import { Arrow } from "@/components/film/FilmIcons";
import { site } from "@/data/site";
import { hubCanonicalHref } from "@/lib/routes";

export default function HomePathsSection() {
  const { homePaths } = site;

  return (
    <section className="home-gateway home-paths" aria-labelledby="home-paths-heading">
      <FilmReveal>
        <h2 id="home-paths-heading" className="home-paths__heading">
          {homePaths.heading}
        </h2>
      </FilmReveal>

      <div className="home-paths__grid">
        {homePaths.items.map((item, index) => (
          <FilmReveal key={item.seat} delayMs={index * 60}>
            <a className="home-paths__card" href={hubCanonicalHref(item.hub)}>
              <div className="home-paths__direction">
                <span className="home-paths__seat" aria-hidden="true">
                  {item.seat}
                </span>
                <span className="home-paths__direction-name">{item.direction}</span>
              </div>
              {item.label ? <p className="home-paths__label">{item.label}</p> : null}
              <h3 className="home-paths__statement">{item.statement}</h3>
              <p className="home-paths__text">{item.text}</p>
              <span className="home-paths__cta">
                {item.cta}
                <span className="home-paths__cta-arrow" aria-hidden="true">
                  <Arrow />
                </span>
              </span>
            </a>
          </FilmReveal>
        ))}
      </div>
    </section>
  );
}
