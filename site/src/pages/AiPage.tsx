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

/** Content bands above contact (hero skipped). Last before contact = tint. */
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
              <div className="studio-section__body">
                <p className="client-make__line">{page.formats.join(" · ")}</p>
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

        <section className={studioSectionClass(2, BANDS)} aria-labelledby="ai-how-heading">
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

        <section className={studioSectionClass(3, BANDS)} aria-labelledby="ai-principles-heading">
          <FilmReveal>
            <div className="studio-section__grid">
              <div className="studio-section__aside">
                <h2 id="ai-principles-heading" className="studio-section-heading">
                  {page.principlesHeading}
                </h2>
              </div>
            </div>
          </FilmReveal>
          <ul
            className="studio-how-steps studio-how-steps--3 studio-section__full"
            aria-label="Principles"
          >
            {page.principles.map((item) => (
              <li key={item.title} className="studio-how-steps__item">
                <h3 className="studio-models__title">{item.title}</h3>
                <p className="studio-models__text">{item.text}</p>
              </li>
            ))}
          </ul>
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
