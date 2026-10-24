import FilmReveal from "@/components/film/FilmReveal";
import { Arrow } from "@/components/film/FilmIcons";
import { sectionIds, site } from "@/data/site";
import { hubCanonicalHref } from "@/lib/routes";

export default function HomeDivisionsSection() {
  const { specializedDivisions: divisions } = site;
  const items = [
    { ...divisions.games, hub: "games" as const },
    { ...divisions.ai, hub: "ai" as const },
  ];

  return (
    <section
      id={sectionIds.divisions}
      className="home-b2b home-divisions scroll-mt-[var(--header-offset)]"
      aria-labelledby="home-divisions-heading"
    >
      <FilmReveal>
        <h2 id="home-divisions-heading" className="home-b2b__heading">
          {divisions.heading}
        </h2>
      </FilmReveal>

      <div className="home-divisions__grid">
        {items.map((item, index) => (
          <FilmReveal key={item.title} delayMs={index * 80}>
            <a className="home-divisions__card" href={hubCanonicalHref(item.hub)}>
              <div className="home-divisions__card-top">
                <h3 className="home-divisions__title">{item.title}</h3>
                <span className="circle-link home-divisions__arrow" aria-hidden="true">
                  <Arrow />
                </span>
              </div>
              <p className="home-divisions__text">{item.text}</p>
            </a>
          </FilmReveal>
        ))}
      </div>
    </section>
  );
}
