import FilmContactSection from "@/components/FilmContactSection";
import FilmReveal from "@/components/film/FilmReveal";
import PageHeroReel from "@/components/film/PageHeroReel";
import GamesServiceBlock from "@/components/games/GamesServiceBlock";
import GamesVideoCards from "@/components/games/GamesVideoCards";
import PlayablesGrid from "@/components/games/PlayablesGrid";
import { SEO } from "@/components/SEO";
import { gamesPlayables } from "@/data/playables";
import { site } from "@/data/site";
import { NETLIFY_FORM_NAME_GAMES } from "@/lib/contactConfig";
import { publicAsset } from "@/lib/publicAsset";

const page = site.gamesPage;
const hero = page.showreel;

export default function GamesPage() {
  return (
    <>
      <SEO
        title={page.seoTitle}
        description={page.seoDescription}
        url={`${site.canonical}/games/`}
      />
      <div className="games-page page-with-hero-reel">
        <PageHeroReel
          titleId="games-page-heading"
          media={
            <div className="page-hero-reel__still" aria-hidden="true">
              <img
                src={publicAsset(hero.poster)}
                alt=""
                width={1672}
                height={941}
                decoding="async"
              />
            </div>
          }
        >
          <div className="page-title-row">
            <h1 id="games-page-heading">{page.name}</h1>
          </div>
          <p className="studio-page-hero__lead">{page.heroLead}</p>
        </PageHeroReel>

        <section className="studio-section" aria-labelledby="games-what-heading">
          <FilmReveal>
            <div className="studio-section__grid">
              <div className="studio-section__aside">
                <h2 id="games-what-heading" className="studio-section-heading">
                  {page.whatWeMakeHeading}
                </h2>
              </div>
              <div className="studio-section__body">
                <p className="client-make__line client-make__line--secondary games-formats games-formats--inline">
                  <span className="client-make__label">Formats</span>
                  {page.formats.join(" · ")}
                </p>
              </div>
            </div>
          </FilmReveal>

          <GamesServiceBlock
            titleId="games-creative-production-heading"
            title={page.creativeProduction.title}
            text={page.creativeProduction.text}
            railLabel={`${page.creativeProduction.title} examples`}
          >
            <GamesVideoCards items={page.creativeProduction.work} />
          </GamesServiceBlock>

          <GamesServiceBlock
            titleId="games-playable-production-heading"
            title={page.playableProduction.title}
            text={page.playableProduction.text}
            railLabel={`${page.playableProduction.title} examples`}
            density="icons"
          >
            <PlayablesGrid
              items={gamesPlayables}
              tapLabel={page.playableProduction.tapLabel}
            />
          </GamesServiceBlock>

          <GamesServiceBlock
            titleId="games-creative-development-heading"
            title={page.creativeDevelopment.title}
            text={page.creativeDevelopment.text}
            railLabel={`${page.creativeDevelopment.title} examples`}
          >
            <GamesVideoCards items={page.creativeDevelopment.work} />
          </GamesServiceBlock>
        </section>

        <section className="studio-section studio-section--tint" aria-labelledby="games-how-heading">
          <FilmReveal>
            <div className="studio-section__grid">
              <div className="studio-section__aside">
                <h2 id="games-how-heading" className="studio-section-heading">
                  {page.howHeading}
                </h2>
              </div>
            </div>
          </FilmReveal>
          <ul className="studio-how-steps studio-section__full" aria-label="How we work">
            {page.howSteps.map((step) => (
              <li key={step.title} className="studio-how-steps__item">
                <h3 className="studio-models__title">{step.title}</h3>
                <p className="studio-models__text">{step.text}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="studio-section" aria-labelledby="games-trusted-heading">
          <FilmReveal>
            <div className="studio-section__grid">
              <div className="studio-section__aside">
                <h2 id="games-trusted-heading" className="studio-section-heading">
                  {page.trustedHeading}
                </h2>
              </div>
              <div className="studio-section__body">
                <p className="studio-models__note">{page.clientsNote}</p>
              </div>
            </div>
          </FilmReveal>
        </section>

        <section
          className="studio-section studio-section--tint hub-division hub-division--games"
          aria-labelledby="games-division-heading"
        >
          <FilmReveal>
            <div className="studio-section__grid">
              <div className="studio-section__aside">
                <h2 id="games-division-heading" className="studio-section-heading hub-division__heading">
                  <span className="sr-only">{page.divisionHeading}</span>
                  <img
                    className="hub-division__logo"
                    src={publicAsset("/images/brand/lisenbart-games-logo.webp")}
                    alt=""
                    width={1024}
                    height={477}
                  />
                </h2>
              </div>
              <div className="studio-section__body games-division">
                <p className="studio-models__note">{page.divisionText}</p>
                <a
                  className="send-button games-division__cta"
                  href={page.externalHref}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {page.externalCta}
                </a>
              </div>
            </div>
          </FilmReveal>
        </section>

        <FilmReveal>
          <FilmContactSection
            heading={site.homeContact.heading}
            defaultProjectType={page.defaultProjectType}
            formName={NETLIFY_FORM_NAME_GAMES}
          />
        </FilmReveal>
      </div>
    </>
  );
}
