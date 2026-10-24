import FilmReveal from "@/components/film/FilmReveal";
import { site } from "@/data/site";
import { hubCanonicalHref } from "@/lib/routes";

export default function HomeStudioTeaser() {
  const teaser = site.homeStudioTeaser;

  return (
    <section
      className="studio-section studio-section--tint home-studio-teaser"
      aria-labelledby="home-studio-heading"
    >
      <FilmReveal>
        <div className="studio-section__grid">
          <div className="studio-section__aside">
            <p className="studio-section__eyebrow">{teaser.eyebrow}</p>
            <h2 id="home-studio-heading" className="studio-section-heading">
              {teaser.heading}
            </h2>
          </div>
          <div className="studio-section__body">
            <p className="studio-models__note home-studio-teaser__text">{teaser.text}</p>
            <a className="film-cta home-studio-teaser__cta" href={hubCanonicalHref("studio")}>
              {teaser.cta}
            </a>
          </div>
        </div>
      </FilmReveal>
    </section>
  );
}
