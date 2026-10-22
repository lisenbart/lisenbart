import { useState } from "react";
import { PlayIcon } from "@/components/film/FilmIcons";
import { useReel } from "@/contexts/ReelContext";
import { useIsNarrowViewport } from "@/hooks/useMatchMedia";
import { useShowreelSession } from "@/hooks/useShowreelSession";
import { site } from "@/data/site";

/** Same studio still on desktop and mobile — bears in the studio. */
const STUDIO_STILL = {
  src: "/images/studio/studio-strip.webp",
  alt: "LISENBART FILM animation studio",
} as const;

const reel = site.studioPage.showreel;

export default function StudioSlideshow() {
  const { openReel } = useReel();
  const isNarrow = useIsNarrowViewport();
  const [playing, setPlaying] = useState(false);
  const closeControl = useShowreelSession(playing, setPlaying);

  const play = () => {
    if (!reel.vimeoId) return;
    if (isNarrow) {
      openReel(reel.vimeoId, reel.label);
      return;
    }
    setPlaying(true);
  };

  return (
    <div
      className={`studio-image${playing ? " studio-image--playing" : ""}`}
      aria-label="LISENBART FILM studio"
    >
      <img
        className="is-active"
        src={STUDIO_STILL.src}
        alt={playing ? "" : STUDIO_STILL.alt}
        width={1536}
        height={1024}
        loading="eager"
        fetchPriority="high"
        aria-hidden={playing ? true : undefined}
      />
      {playing && reel.vimeoId ? (
        <>
          <div className="studio-image__player">
            <iframe
              title={reel.label}
              src={`https://player.vimeo.com/video/${reel.vimeoId}?autoplay=1&title=0&byline=0&portrait=0`}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
          </div>
          {closeControl}
        </>
      ) : (
        <button
          type="button"
          className="studio-image__play"
          onClick={play}
          aria-label={`${reel.playLabel}: ${reel.label}`}
        >
          <span className="studio-image__play-circle">
            <PlayIcon />
          </span>
          <span className="studio-image__play-label">{reel.playLabel}</span>
        </button>
      )}
    </div>
  );
}
