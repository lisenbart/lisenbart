import { useState, type MouseEvent } from "react";
import { AnimatePresence } from "framer-motion";
import { MessageSquare } from "lucide-react";
import PersonPopover from "@/components/PersonPopover";
import { publicAsset } from "@/lib/publicAsset";
import { site } from "@/data/site";
import type { ClickPoint } from "@/lib/popoverCoords";

export default function PersonalHeroSection() {
  const { hero } = site;
  const portraitSrc = publicAsset(hero.personalPortrait);
  const [clickPoint, setClickPoint] = useState<ClickPoint | null>(null);

  const openNote = (event: MouseEvent<HTMLButtonElement>) => {
    setClickPoint({ x: event.clientX, y: event.clientY });
  };

  return (
    <section className="about-hero" aria-label="Introduction">
      <div className="about-hero__grid">
        <div className="about-hero__copy">
          <p className="film-section-label">{hero.personalRole}</p>
          <h1 className="film-display">{hero.personalName}</h1>
          <p className="film-lead about-hero__bio">{hero.personalPositioning}</p>
          <ul className="about-hero__proof" aria-label="Experience">
            {hero.personalProof.map((item) => (
              <li key={item}>{item}</li>
            ))}
            <li>
              <a
                href={hero.imdbHref}
                className="about-hero__imdb"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={hero.imdbAria}
              >
                IMDb
              </a>
            </li>
          </ul>
        </div>

        <div className="about-hero__aside">
          <button
            type="button"
            className="about-hero__portrait-trigger"
            onClick={openNote}
            aria-haspopup="dialog"
            aria-expanded={clickPoint !== null}
            aria-label={`${hero.personalName}, ${hero.personalRole}. Open a short note.`}
          >
            <img
              className="about-hero__portrait"
              src={portraitSrc}
              alt={hero.personalPortraitAlt}
              width={320}
              height={320}
              decoding="async"
              fetchPriority="high"
            />
            <span className="about-hero__message" aria-hidden="true">
              <MessageSquare size={18} strokeWidth={2.25} />
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
