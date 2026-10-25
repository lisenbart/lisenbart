import FilmContactSection from "@/components/FilmContactSection";
import FilmReveal from "@/components/film/FilmReveal";
import PageHeroReel from "@/components/film/PageHeroReel";
import SelectedWorkGrid from "@/components/film/SelectedWorkGrid";
import { SEO } from "@/components/SEO";
import { site } from "@/data/site";
import { NETLIFY_FORM_NAME_AI } from "@/lib/contactConfig";
import { publicAsset } from "@/lib/publicAsset";
import { SHOW_DIVISIONS } from "@/lib/siteFlags";
import { studioSectionClass } from "@/lib/surfaceBand";

const page = site.aiPage;
const hero = page.showreel;

/** Content bands above contact (hero skipped). Last before contact = tint.
 * Index 1 = Selected work grid (own section chrome). */
const BANDS = SHOW_DIVISIONS ? 5 : 4;

export default function AiPage() {
  return (
    <>
      <SEO
        title={page.seoTitle}
        description={page.seoDescription}
        url={`${site.canonical}/ai/`}
      />
      <div className="ai-page page-with-hero-reel">
        <PageHeroReel
          titleId="ai-page-heading"
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
            <h1 id="ai-page-heading">{page.name}</h1>
          </div>
          <p className="studio-page-hero__lead">{page.heroLead}</p>
        </PageHeroReel>

        <section className={studioSectionClass(0, BANDS)} aria-labelledby="ai-what-heading">
          <FilmReveal>
            <div className="studio-section__grid">
              <div className="studio-section__aside">
                <h2 id="ai-what-heading" className="studio-section-heading">
                  {page.whatWeMakeHeading}
                </h2>
              </div>
              <div className="studio-section__body client-make client-make--row">
                <p className="client-make__line">{page.formats.join(" · ")}</p>
                <p className="client-make__line client-make__line--secondary">{page.whatWeMakeNote}</p>
              </div>
            </div>
          </FilmReveal>
        </section>

        <SelectedWorkGrid
          items={page.selectedWork}
          label={page.selectedWorkHeading}
          moreLabel={page.selectedWorkMore}
          lessLabel={page.selectedWorkLess}
          gridId="ai-selected-work-grid"
        />

        <section className={studioSectionClass(2, BANDS)} aria-labelledby="ai-film-made-heading">
          <FilmReveal>
            <div className="studio-section__grid">
              <div className="studio-section__aside">
                <h2 id="ai-film-made-heading" className="studio-section-heading">
                  {page.filmMadeHeading}
                </h2>
              </div>
              <div className="studio-section__body">
                <p className="studio-models__note">{page.filmMadeIntro}</p>
              </div>
            </div>
          </FilmReveal>
          <ol
            className="studio-how-steps studio-how-steps--5 studio-section__full"
            aria-label={page.filmMadeHeading}
          >
            {page.filmMadeSteps.map((step) => {
              const hasMedia = Boolean(step.video || step.image);
              return (
                <li key={step.title} className="studio-how-steps__item">
                  {hasMedia ? (
                    <div className="studio-how-steps__media">
                      {step.video ? (
                        <video
                          className="studio-how-steps__video"
                          src={publicAsset(step.video)}
                          muted
                          playsInline
                          loop
                          autoPlay
                          preload="metadata"
                          aria-label={step.imageAlt || step.title}
                        />
                      ) : (
                        <img
                          className="studio-how-steps__image"
                          src={publicAsset(step.image!)}
                          alt={step.imageAlt || step.title}
                          width={640}
                          height={360}
                          loading="lazy"
                          decoding="async"
                        />
                      )}
                    </div>
                  ) : null}
                  <span className="studio-how-steps__number">{step.number}</span>
                  <h3 className="studio-models__title">{step.title}</h3>
                  <p className="studio-models__text">{step.text}</p>
                </li>
              );
            })}
          </ol>
          <p className="studio-models__note studio-section__full ai-film-made__closing">
            {page.filmMadeClosing}
          </p>
        </section>

        <section className={studioSectionClass(3, BANDS)} aria-labelledby="ai-how-heading">
          <FilmReveal>
            <div className="studio-section__grid">
              <div className="studio-section__aside">
                <h2 id="ai-how-heading" className="studio-section-heading">
                  {page.howHeading}
                </h2>
              </div>
              <div className="studio-section__body">
                <p className="studio-models__note">{page.howIntro}</p>
              </div>
            </div>
          </FilmReveal>
          <ol className="studio-how-steps studio-section__full" aria-label="How we use AI">
            {page.howSteps.map((step) => (
              <li key={step.title} className="studio-how-steps__item">
                <span className="studio-how-steps__number">{step.number}</span>
                <h3 className="studio-models__title">{step.title}</h3>
                <p className="studio-models__text">{step.text}</p>
              </li>
            ))}
          </ol>
        </section>

        {SHOW_DIVISIONS ? (
          <section
            className={studioSectionClass(4, BANDS, "hub-division hub-division--glowl")}
            aria-labelledby="ai-division-heading"
          >
            <FilmReveal>
              <div className="studio-section__grid">
                <div className="studio-section__aside">
                  <h2 id="ai-division-heading" className="studio-section-heading hub-division__heading">
                    <span className="sr-only">{page.divisionHeading}</span>
                    <img
                      className="hub-division__logo"
                      src={publicAsset("/images/brand/glowl-logo.webp")}
                      alt=""
                      width={1024}
                      height={479}
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
        ) : null}

        <FilmReveal>
          <FilmContactSection
            heading={site.homeContact.heading}
            lead={page.contactLead}
            defaultProjectType={page.defaultProjectType}
            formName={NETLIFY_FORM_NAME_AI}
          />
        </FilmReveal>
      </div>
    </>
  );
}
