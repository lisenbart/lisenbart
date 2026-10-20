import FilmContactSection from "@/components/FilmContactSection";
import FilmShowreel from "@/components/film/FilmShowreel";
import { SEO } from "@/components/SEO";
import { site } from "@/data/site";

const page = site.aiPage;
const reel = page.showreel;

export default function AiPage() {
  return (
    <>
      <SEO
        title={page.seoTitle}
        description={page.seoDescription}
        url={`${site.canonical}/ai/`}
      />
      <section className="page-shell direction-page page-shell--to-reel">
        <div className="page-title-row">
          <h1>{page.name}</h1>
        </div>
        <p className="film-contact__lead direction-lead">{page.title}</p>
        <p className="film-section-label">{page.showreelHeading}</p>
      </section>

      <FilmShowreel
        id={reel.id}
        label={reel.label}
        poster={reel.poster}
        vimeoId={reel.vimeoId}
      />

      <section className="page-shell direction-page page-shell--from-reel">
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
      <FilmContactSection heading={site.homeContact.heading} />
    </>
  );
}
