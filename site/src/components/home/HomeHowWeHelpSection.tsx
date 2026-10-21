import FilmReveal from "@/components/film/FilmReveal";
import { sectionIds, site } from "@/data/site";

export default function HomeHowWeHelpSection() {
  const { howWeHelp } = site;

  return (
    <section
      id={sectionIds.howWeHelp}
      className="home-b2b home-how-help scroll-mt-[var(--header-offset)]"
      aria-labelledby="home-how-help-heading"
    >
      <FilmReveal>
        <h2 id="home-how-help-heading" className="home-b2b__heading">
          {howWeHelp.heading}
        </h2>
      </FilmReveal>

      <ul className="home-how-help__list">
        {howWeHelp.items.map((item, index) => (
          <FilmReveal key={item.title} delayMs={index * 70}>
            <li className="home-how-help__item">
              <h3 className="home-how-help__title">{item.title}</h3>
              <p className="home-how-help__text">{item.text}</p>
            </li>
          </FilmReveal>
        ))}
      </ul>
    </section>
  );
}
