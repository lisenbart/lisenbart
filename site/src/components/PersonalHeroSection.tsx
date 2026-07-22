import { publicAsset } from "@/lib/publicAsset";
import { sectionIds, site } from "@/data/site";

export default function PersonalHeroSection() {
  const { hero } = site;
  const [firstName, lastName] = hero.personalName.split(" ");

  return (
    <section id="top" className="archive-hero scroll-mt-24" aria-label="Introduction">
      <div className="archive-container archive-hero__grid">
        <div className="archive-hero__copy">
          <p className="archive-meta archive-hero__role">{hero.personalRole}</p>
          <h1 className="archive-hero__name">
            <span className="archive-hero__name-line">{firstName}</span>
            <span className="archive-hero__name-line archive-hero__name-line--offset">{lastName}</span>
          </h1>
          <p className="archive-hero__bio">{hero.personalPositioning}</p>
          <ul className="archive-hero__proof" aria-label="Experience">
            {hero.personalProof.map((item) => (
              <li key={item} className="archive-hero__proof-item">
                {item}
              </li>
            ))}
            <li className="archive-hero__proof-item">
              <a
                href={hero.imdbHref}
                className="archive-hero__proof-link"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={hero.imdbAria}
              >
                IMDb
              </a>
            </li>
          </ul>
          <a className="archive-hero__scroll" href={`#${sectionIds.explore}`}>
            <span className="archive-hero__scroll-line" aria-hidden="true" />
            {hero.showreelCta}
          </a>
        </div>

        <figure className="archive-hero__media">
          <img
            src={publicAsset(hero.personalPortrait)}
            alt={hero.personalPortraitAlt}
            width={900}
            height={900}
            decoding="async"
            fetchPriority="high"
          />
        </figure>
      </div>
    </section>
  );
}
