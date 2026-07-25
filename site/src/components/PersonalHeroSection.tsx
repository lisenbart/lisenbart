import { useState, type MouseEvent } from "react";
import { AnimatePresence } from "framer-motion";
import { MessageSquare } from "lucide-react";
import PersonPopover from "@/components/PersonPopover";
import { publicAsset } from "@/lib/publicAsset";
import { site } from "@/data/site";
import type { ClickPoint } from "@/lib/popoverCoords";

export default function PersonalHeroSection() {
  const { hero } = site;
  const [firstName, lastName] = hero.personalName.split(" ");
  const portraitSrc = publicAsset(hero.personalPortrait);
  const [clickPoint, setClickPoint] = useState<ClickPoint | null>(null);

  const openNote = (event: MouseEvent<HTMLButtonElement>) => {
    setClickPoint({ x: event.clientX, y: event.clientY });
  };

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
        </div>

        <div className="archive-hero__aside">
          <button
            type="button"
            className="archive-hero__portrait-trigger"
            onClick={openNote}
            aria-haspopup="dialog"
            aria-expanded={clickPoint !== null}
            aria-label={`${hero.personalName}, ${hero.personalRole}. Open a short note.`}
          >
            <figure className="archive-hero__media">
              <img
                src={portraitSrc}
                alt=""
                width={900}
                height={900}
                decoding="async"
                fetchPriority="high"
              />
            </figure>
            <span className="archive-hero__message" aria-hidden="true">
              <MessageSquare size={20} strokeWidth={2.25} />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {clickPoint ? (
          <PersonPopover
            key="hero-note"
            name={hero.personalName}
            role={hero.personalRole}
            note={hero.personalNote}
            clickPoint={clickPoint}
            onClose={() => setClickPoint(null)}
          />
        ) : null}
      </AnimatePresence>
    </section>
  );
}
