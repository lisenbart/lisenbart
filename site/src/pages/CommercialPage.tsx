import FilmContactSection from "@/components/FilmContactSection";
import FilmCapabilityItem from "@/components/film/FilmCapabilityItem";
import FilmReveal from "@/components/film/FilmReveal";
import FilmShowreel from "@/components/film/FilmShowreel";
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
      <section className="page-shell work-page page-shell--to-reel">
        <FilmReveal>
          <div className="page-title-row">
            <h1>Client Work</h1>
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
              <p className="client-group__proof">{site.trustedBy.brandsProof}</p>
              <div className="client-names" aria-label="Selected brands">
                {site.trustedBy.brands.map((brand) => (
                  <span key={brand}>{brand}</span>
                ))}
              </div>
            </div>

            <div className="client-group">
              <h2 className="client-group__heading">Agencies</h2>
              <p className="client-group__proof">{site.trustedBy.agenciesProof}</p>
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
    </>
  );
}
