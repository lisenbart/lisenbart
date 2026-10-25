import FilmContactSection from "@/components/FilmContactSection";
import FilmReveal from "@/components/film/FilmReveal";
import PageHeroReel from "@/components/film/PageHeroReel";
import ClientNameList from "@/components/ClientNameList";
import SelectedWorkGrid from "@/components/film/SelectedWorkGrid";
import { SEO } from "@/components/SEO";
import { site } from "@/data/site";
import { publicAsset } from "@/lib/publicAsset";
import { studioSectionClass } from "@/lib/surfaceBand";

const page = site.commercialPage;
const hero = page.showreel;

/** Content bands above contact (hero skipped). Last before contact = tint. */
const BANDS = 4;

export default function CommercialPage() {
  return (
    <>
      <SEO
        title={page.seoTitle}
        description={page.seoDescription}
        url={`${site.canonical}/client-work/`}
      />
      <div className="work-page page-with-hero-reel">
        <PageHeroReel
          titleId="client-work-heading"
          media={
            <div className="page-hero-reel__still page-hero-reel__still--bottom" aria-hidden="true">
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
            <h1 id="client-work-heading">{page.name}</h1>
          </div>
          <p className="studio-page-hero__lead">{page.heroLead}</p>
        </PageHeroReel>

        <section className={studioSectionClass(0, BANDS)} aria-labelledby="what-we-make-heading">
          <FilmReveal>
            <div className="studio-section__grid">
              <div className="studio-section__aside">
                <h2 id="what-we-make-heading" className="studio-section-heading">
                  {page.whatWeMakeHeading}
                </h2>
                <p className="studio-models__note">{page.whatWeMakeIntro}</p>
              </div>
              <div className="studio-section__body client-make">
                <p className="client-make__line">
                  <span className="client-make__label">Formats</span>
                  {page.formats.join(" · ")}
                </p>
                <p className="client-make__line client-make__line--secondary">
                  <span className="client-make__label">Techniques</span>
                  {page.techniques.join(" · ")}
                </p>
              </div>
            </div>
          </FilmReveal>
        </section>

        <SelectedWorkGrid
          items={page.selectedWork}
          label={page.selectedWorkHeading}
          moreLabel={page.selectedWorkMore}
          lessLabel={page.selectedWorkLess}
          gridId="client-selected-work-grid"
        />

        <section className={studioSectionClass(2, BANDS)} aria-labelledby="ways-heading">
          <FilmReveal>
            <div className="studio-section__grid">
              <div className="studio-section__aside">
                <h2 id="ways-heading" className="studio-section-heading">
                  {page.waysHeading}
                </h2>
              </div>
            </div>
          </FilmReveal>
          <ul className="studio-how-steps studio-how-steps--3 studio-section__full" aria-label="Ways to work">
            {page.ways.map((way) => (
              <li key={way.title} className="studio-how-steps__item">
                <h3 className="studio-models__title">{way.title}</h3>
                <p className="studio-models__text">{way.text}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className={studioSectionClass(3, BANDS)} aria-labelledby="clients-heading">
          <FilmReveal>
            <div className="studio-section__grid">
              <div className="studio-section__aside">
                <h2 id="clients-heading" className="studio-section-heading">
                  {page.clientsHeading}
                </h2>
              </div>
              <div className="studio-section__body">
                <div className="client-group">
                  <h3 className="client-group__heading">Brands</h3>
                  <ClientNameList names={site.trustedBy.brands} aria-label="Selected brands" />
                </div>
                <div className="client-group">
                  <h3 className="client-group__heading">Agencies</h3>
                  <ClientNameList names={site.trustedBy.agencies} aria-label="Selected agencies" />
                </div>
              </div>
            </div>
          </FilmReveal>
        </section>

        <FilmReveal>
          <FilmContactSection
            heading={site.homeContact.heading}
            defaultProjectType={page.defaultProjectType}
          />
        </FilmReveal>
      </div>
    </>
  );
}
