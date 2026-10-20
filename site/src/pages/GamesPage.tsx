import FilmContactSection from "@/components/FilmContactSection";
import FilmShowreel from "@/components/film/FilmShowreel";
import { SEO } from "@/components/SEO";
import { Arrow } from "@/components/film/FilmIcons";
import { site } from "@/data/site";

const page = site.gamesPage;
const reel = page.showreel;

export default function GamesPage() {
  return (
    <>
      <SEO
        title={page.seoTitle}
        description={page.seoDescription}
        url={`${site.canonical}/games/`}
      />
      <section className="page-shell direction-page page-shell--to-reel">
        <div className="page-title-row">
          <h1>{page.name}</h1>
        </div>
      </section>

      <FilmShowreel
        id={reel.id}
        label={reel.label}
        poster={reel.poster}
        vimeoId={reel.vimeoId}
      />

      <section className="page-shell direction-page page-shell--from-reel">
        <div className="film-capabilities">
          <p className="film-section-label">{page.capabilitiesHeading}</p>
          <ul className="film-capabilities__list">
            {page.capabilities.map((item) => (
              <li key={item.title}>
                <h2 className="film-capabilities__title">{item.title}</h2>
                <p className="film-capabilities__text">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="direction-external">
          <a
            className="direction-external__link"
            href={page.externalHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              e.preventDefault();
              window.open(page.externalHref, "_blank", "noopener,noreferrer");
            }}
          >
            {page.externalCta}
            <span className="circle-link">
              <Arrow />
            </span>
          </a>
        </div>
      </section>
      <FilmContactSection heading={site.homeContact.heading} />
    </>
  );
}
