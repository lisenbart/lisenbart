import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { publicAsset } from "@/lib/publicAsset";
import { sectionIds, site } from "@/data/site";
import ImdbProfileModal from "./ImdbProfileModal";

const IMDB_PROFILE = "https://www.imdb.com/name/nm11412621/";

const PROOF_ITEMS = [
  "35 years in animation",
  "20 years producing",
  "1,000+ projects delivered",
] as const;

export default function PersonalHeroSection() {
  const { hero } = site;
  const [imdbOpen, setImdbOpen] = useState(false);
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
            {PROOF_ITEMS.map((item) => (
              <li key={item} className="archive-hero__proof-item">
                {item}
              </li>
            ))}
            <li className="archive-hero__proof-item">
              <button
                type="button"
                className="archive-hero__proof-link"
                onClick={() => setImdbOpen(true)}
                aria-haspopup="dialog"
              >
                IMDb
              </button>
            </li>
          </ul>
          <a className="archive-hero__scroll" href={`#${sectionIds.showreel}`}>
            <span className="archive-hero__scroll-line" aria-hidden="true" />
            View work
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

      <AnimatePresence>
        {imdbOpen ? (
          <ImdbProfileModal href={IMDB_PROFILE} onClose={() => setImdbOpen(false)} />
        ) : null}
      </AnimatePresence>
    </section>
  );
}
