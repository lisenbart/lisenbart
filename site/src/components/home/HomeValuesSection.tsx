import FilmReveal from "@/components/film/FilmReveal";
import { site } from "@/data/site";

export default function HomeValuesSection() {
  const { homeValues } = site;

  return (
    <section className="home-gateway home-values" aria-labelledby="home-values-heading">
      <FilmReveal>
        <h2 id="home-values-heading" className="home-values__heading">
          {homeValues.heading}
        </h2>
      </FilmReveal>

      <ul className="home-values__list">
        {homeValues.items.map((item, index) => (
          <FilmReveal key={item.title} delayMs={index * 50}>
            <li className="home-values__item">
              <h3 className="home-values__title">{item.title}</h3>
              <p className="home-values__text">{item.text}</p>
            </li>
          </FilmReveal>
        ))}
      </ul>
    </section>
  );
}
