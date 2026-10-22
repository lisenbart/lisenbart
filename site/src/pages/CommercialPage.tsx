import FilmContactSection from "@/components/FilmContactSection";
import FilmCapabilityItem from "@/components/film/FilmCapabilityItem";
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
        <PageHeroReel title="Client Work" titleId="client-work-heading" reel={reel} />

        <section className="page-shell work-page page-shell--from-reel">
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
            <div className="direction-clients">
              <p className="film-section-label">{site.trustedBy.label}</p>

              <div className="client-group">
                <h2 className="client-group__heading">Brands</h2>
                <div className="client-names" aria-label="Selected brands">
                  {site.trustedBy.brands.map((brand) => (
                    <span key={brand}>{brand}</span>
                  ))}
                </div>
              </div>

              <div className="client-group">
                <h2 className="client-group__heading">Agencies</h2>
                <div className="client-names" aria-label="Selected agencies">
                  {site.trustedBy.agencies.map((agency) => (
                    <span key={agency}>{agency}</span>
                  ))}
                </div>
              </div>
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
