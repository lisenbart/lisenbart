import { goToContact, site } from "@/data/site";
import { hubCanonicalHref } from "@/lib/routes";

export default function StudioHeroSection() {
  const { studioHome } = site;

  return (
    <section id="top" className="studio-hero scroll-mt-24" aria-label="LISENBART FILM">
      <div className="archive-container studio-hero__inner">
        <p className="studio-hero__brand">{studioHome.brandLine}</p>
        <h1 className="studio-hero__headline">{studioHome.headline}</h1>
        <p className="studio-hero__lead">{studioHome.lead}</p>

        <ul className="studio-hero__proof" aria-label="Studio">
          {studioHome.proof.map((item) => (
            <li key={item} className="studio-hero__proof-item">
              {item}
            </li>
          ))}
        </ul>

        <div className="studio-hero__actions">
          <button type="button" className="studio-hero__cta" onClick={() => goToContact()}>
            {studioHome.ctaLabel}
          </button>
        </div>

        <p className="studio-hero__founder-line">
          <a
            className="studio-hero__founder"
            href={hubCanonicalHref("about")}
            aria-label={studioHome.founderAria}
          >
            {studioHome.founderLine}
          </a>
        </p>
      </div>
    </section>
  );
}
