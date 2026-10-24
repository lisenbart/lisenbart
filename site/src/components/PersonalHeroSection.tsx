import { useState, type MouseEvent } from "react";
import { AnimatePresence } from "framer-motion";
import { MessageSquare } from "lucide-react";
import PersonPopover from "@/components/PersonPopover";
import { publicAsset } from "@/lib/publicAsset";
import { site } from "@/data/site";
import type { ClickPoint } from "@/lib/popoverCoords";

/** Dark About hero — portrait + name; media layer ready for a future photo. */
export default function PersonalHeroSection() {
  const { hero, aboutPage } = site;
  const portraitSrc = publicAsset(hero.personalPortrait);
  const [clickPoint, setClickPoint] = useState<ClickPoint | null>(null);

  const openNote = (event: MouseEvent<HTMLButtonElement>) => {
    setClickPoint({ x: event.clientX, y: event.clientY });
  };

  return (
    <section className="about-hero about-hero--dark" aria-labelledby="about-hero-heading">
      <div className="about-hero__media" aria-hidden="true">
        <img
          className="about-hero__still"
          src={publicAsset(aboutPage.heroImage)}
          alt=""
          width={1920}
          height={1200}
          decoding="async"
          fetchPriority="high"
        />
        <div className="about-hero__veil" />
      </div>

      <div className="about-hero__content">
        <button
          type="button"
          className="about-hero__portrait-trigger"
          onClick={openNote}
          aria-haspopup="dialog"
          aria-expanded={clickPoint !== null}
          aria-label={`${aboutPage.heroName}, ${aboutPage.heroSubtitle}. Open a short note.`}
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

        <div className="about-hero__copy">
          <h1 id="about-hero-heading" className="about-hero__name">
            {aboutPage.heroName}
          </h1>
          <p className="about-hero__subtitle">{aboutPage.heroSubtitle}</p>
        </div>
      </div>

      <AnimatePresence>
        {clickPoint ? (
          <PersonPopover
            key="hero-note"
            name={aboutPage.heroName}
            role={aboutPage.heroSubtitle}
            note={hero.personalNote}
            clickPoint={clickPoint}
            onClose={() => setClickPoint(null)}
          />
        ) : null}
      </AnimatePresence>
    </section>
  );
}
