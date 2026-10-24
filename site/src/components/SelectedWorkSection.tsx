import { useState } from "react";
import { Play } from "lucide-react";
import HeroShowreel from "@/components/HeroShowreel";
import ReelSlideshow from "@/components/ReelSlideshow";
import { useShowreelSession } from "@/hooks/useShowreelSession";
import { sectionIds, site } from "@/data/site";
import { hubCanonicalHref } from "@/lib/routes";

/** Compact commercial proof after hero — reuses advertising reel media. */
export default function SelectedWorkSection() {
  const { selectedWork } = site;
  const [playing, setPlaying] = useState(false);
  const closeControl = useShowreelSession(playing, setPlaying);
  const images = [...selectedWork.previewImages];

  return (
    <section
      id={sectionIds.selectedWork}
      className="selected-work scroll-mt-24"
      aria-labelledby="selected-work-heading"
    >
      <div className="archive-container selected-work__inner">
        <div className="selected-work__header">
          <h2 id="selected-work-heading" className="selected-work__label">
            {selectedWork.label}
          </h2>
          <a className="selected-work__link" href={hubCanonicalHref("client-work")}>
            {selectedWork.cta}
          </a>
        </div>

        <div className="selected-work__stage">
          {playing ? (
            <>
              <div className="selected-work__media" aria-label={`${selectedWork.label} reel`}>
                <HeroShowreel
                  vimeoId={selectedWork.vimeoId}
                  title={selectedWork.label}
                  autoPlay
                  hidePlayButton
                />
              </div>
              {closeControl}
            </>
          ) : (
            <>
              <div className="selected-work__media selected-work__media--preview">
                <ReelSlideshow images={images} alt={`${selectedWork.label} frames`} />
              </div>
              <button
                type="button"
                className="selected-work__play"
                onClick={() => setPlaying(true)}
                aria-label={`Play ${selectedWork.label}`}
              >
                <Play className="selected-work__play-icon" fill="currentColor" strokeWidth={0} />
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
