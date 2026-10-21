import FilmReveal from "@/components/film/FilmReveal";
import { sectionIds, site } from "@/data/site";

export default function HomeExperienceSection() {
  const { homeExperience: experience } = site;

  return (
    <section
      id={sectionIds.experience}
      className="home-b2b home-experience scroll-mt-[var(--header-offset)]"
      aria-labelledby="home-experience-heading"
    >
      <FilmReveal>
        <h2 id="home-experience-heading" className="home-b2b__heading">
          {experience.heading}
        </h2>
      </FilmReveal>
      <FilmReveal delayMs={60}>
        <p className="home-b2b__lead">{experience.lead}</p>
      </FilmReveal>

      <FilmReveal delayMs={100}>
        <dl className="home-experience__facts">
          {experience.facts.map((fact) => (
            <div key={fact.label} className="home-experience__fact">
              <dt className="home-experience__fact-value">{fact.value}</dt>
              <dd className="home-experience__fact-label">{fact.label}</dd>
            </div>
          ))}
        </dl>
      </FilmReveal>

      <div className="home-experience__clients">
        <FilmReveal delayMs={120}>
          <div className="home-experience__group">
            <h3 className="home-experience__group-heading">Brands</h3>
            <div className="home-experience__names" aria-label="Selected brands">
              {experience.brands.map((brand) => (
                <span key={brand}>{brand}</span>
              ))}
            </div>
          </div>
        </FilmReveal>
        <FilmReveal delayMs={160}>
          <div className="home-experience__group">
            <h3 className="home-experience__group-heading">Agencies</h3>
            <div className="home-experience__names" aria-label="Selected agencies">
              {experience.agencies.map((agency) => (
                <span key={agency}>{agency}</span>
              ))}
            </div>
          </div>
        </FilmReveal>
      </div>
    </section>
  );
}
