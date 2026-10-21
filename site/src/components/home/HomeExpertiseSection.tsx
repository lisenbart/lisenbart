import FilmReveal from "@/components/film/FilmReveal";
import { site } from "@/data/site";

export default function HomeExpertiseSection() {
  const { homeExpertise } = site;

  return (
    <section
      className="home-gateway home-expertise"
      aria-labelledby="home-expertise-heading"
    >
      <FilmReveal>
        <h2 id="home-expertise-heading" className="home-expertise__heading">
          {homeExpertise.heading}
        </h2>
      </FilmReveal>

      <ul className="home-expertise__list">
        {homeExpertise.items.map((item, index) => (
          <FilmReveal key={item} delayMs={index * 40}>
            <li className="home-expertise__item">{item}</li>
          </FilmReveal>
        ))}
      </ul>
    </section>
  );
}
