import FilmReveal from "@/components/film/FilmReveal";
import { Arrow } from "@/components/film/FilmIcons";
import { site } from "@/data/site";
import { hubCanonicalHref } from "@/lib/routes";
import { publicAsset } from "@/lib/publicAsset";

export default function HomePathsSection() {
  const { homePaths } = site;

  return (
    <section className="home-gateway home-paths" aria-label="Audience paths">
      <div className="home-paths__grid">
        {homePaths.items.map((item, index) => (
          <FilmReveal key={item.label} delayMs={index * 60}>
            <a className="home-paths__card" href={hubCanonicalHref(item.hub)}>
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
        ))}
      </div>
    </section>
  );
}
