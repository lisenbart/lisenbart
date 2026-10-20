import FilmContactSection from "@/components/FilmContactSection";
import ReelBlock from "@/components/ReelBlock";
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
      <section className="page-shell work-page">
        <div className="page-title-row">
          <h1>Client Work</h1>
        </div>
        <p className="film-contact__lead direction-lead">{page.title}</p>

        <div className="direction-showreel">
          <p className="film-section-label">{page.showreelHeading}</p>
          <ReelBlock
            id={reel.id}
            label={reel.label}
            body={reel.body}
            videoId={reel.vimeoId}
            previewImages={[...reel.previewImages]}
            emphasis="primary"
          />
        </div>

        <div className="direction-clients">
          <p className="film-section-label">{site.trustedBy.label}</p>
          <div className="client-names" aria-label={site.trustedBy.label}>
            {site.trustedBy.brands.map((brand) => (
              <span key={brand}>{brand}</span>
            ))}
          </div>
        </div>

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
      </section>
      <FilmContactSection heading={page.contactHeading} lead={page.contactLead} />
    </>
  );
}
