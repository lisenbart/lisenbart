import FilmContactSection from "@/components/FilmContactSection";
import FilmCapabilityItem from "@/components/film/FilmCapabilityItem";
import FilmReveal from "@/components/film/FilmReveal";
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
        <FilmReveal>
          <div className="page-title-row">
            <h1>{page.name}</h1>
          </div>
        </FilmReveal>
      </section>

      <FilmReveal delayMs={60}>
        <FilmShowreel
          id={reel.id}
          label={reel.label}
          poster={reel.poster}
          vimeoId={reel.vimeoId}
        />
      </FilmReveal>

      <section className="page-shell direction-page page-shell--from-reel">
        <FilmReveal>
          <p className="film-section-label">{page.capabilitiesHeading}</p>
        </FilmReveal>
        <ul className="film-capabilities__list">
          {page.capabilities.map((item, index) => (
            <FilmCapabilityItem
              key={item.title}
              title={item.title}
              text={item.text}
              delayMs={index * 70}
            />
          ))}
        </ul>

        <FilmReveal delayMs={80}>
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
        </FilmReveal>
      </section>
      <FilmReveal>
        <FilmContactSection heading={site.homeContact.heading} />
      </FilmReveal>
    </>
  );
}
