import FilmContactSection from "@/components/FilmContactSection";
import FilmCapabilityItem from "@/components/film/FilmCapabilityItem";
import FilmReveal from "@/components/film/FilmReveal";
import PageHeroReel from "@/components/film/PageHeroReel";
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
      <div className="games-page page-with-hero-reel">
        <PageHeroReel title={page.name} titleId="games-page-heading" reel={reel} />

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
      </div>
    </>
  );
}