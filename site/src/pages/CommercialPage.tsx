import FilmContactSection from "@/components/FilmContactSection";
import FilmReveal from "@/components/film/FilmReveal";
import PageHeroReel from "@/components/film/PageHeroReel";
import { SEO } from "@/components/SEO";
import { site } from "@/data/site";

const page = site.commercialPage;
const reel = page.showreel;

export default function CommercialPage() {
  return (
    <>
      <SEO
        title={page.seoTitle}
        description={page.seoDescription}
        url={`${site.canonical}/client-work/`}
      />
      <div className="work-page page-with-hero-reel">
        <PageHeroReel titleId="client-work-heading" reel={reel}>
          <div className="page-title-row">
            <h1 id="client-work-heading">{page.name}</h1>
          </div>
          <p className="studio-page-hero__lead">{page.heroLead}</p>
        </PageHeroReel>

        <section
          className="studio-section studio-section--selected-work"
          aria-labelledby="selected-work-heading"
        >
          <FilmReveal>
            <div className="studio-section__grid studio-section__grid--inset">
              <h2 id="selected-work-heading" className="studio-section-heading">
                {page.selectedWorkHeading}
              </h2>
            </div>
          </FilmReveal>
          <ul className="client-selected-grid" aria-label="Selected work">
            {page.selectedWork.map((item, index) => (
              <li key={item.id} className="client-selected-card">
                <button
                  type="button"
                  className="client-selected-card__button"
                  aria-label={`${item.title} — ${item.client}`}
                  style={{ animationDelay: `${index * 40}ms` }}
                >
                  <span className="client-selected-card__media" aria-hidden="true" />
                  <span className="client-selected-card__meta">
                    <span className="client-selected-card__title">{item.title}</span>
                    <span className="client-selected-card__client">{item.client}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </section>

        <section className="studio-section studio-section--tint" aria-labelledby="what-we-make-heading">
          <FilmReveal>
            <div className="studio-section__grid">
              <div className="studio-section__aside">
                <h2 id="what-we-make-heading" className="studio-section-heading">
                  {page.whatWeMakeHeading}
                </h2>
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

        <section className="studio-section" aria-labelledby="ways-heading">
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

        <section className="studio-section studio-section--tint" aria-labelledby="clients-heading">
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
                  <div className="client-names" aria-label="Selected brands">
                    {site.trustedBy.brands.map((brand) => (
                      <span key={brand}>{brand}</span>
                    ))}
                  </div>
                </div>
                <div className="client-group">
                  <h3 className="client-group__heading">Agencies</h3>
                  <div className="client-names" aria-label="Selected agencies">
                    {site.trustedBy.agencies.map((agency) => (
                      <span key={agency}>{agency}</span>
                    ))}
                  </div>
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
