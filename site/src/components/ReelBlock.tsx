import { useState } from "react";
import { Play } from "lucide-react";
import HeroShowreel from "./HeroShowreel";
import ReelSlideshow from "./ReelSlideshow";

interface ReelBlockProps {
  id: string;
  label: string;
  text: string;
  videoId: string | null;
  previewImages: string[];
  comingSoon?: boolean;
}

/** Commercial reel — slideshow preview → play launches showreel. */
export default function ReelBlock({
  id,
  label,
  text,
  videoId,
  previewImages,
  comingSoon = false,
}: ReelBlockProps) {
  const [playing, setPlaying] = useState(false);
  const ariaLabel = `${label} reel`;
  const canPlay = Boolean(videoId) && !comingSoon;

  return (
    <article
      id={id}
      className={`reel-block reel-block--split${comingSoon ? " reel-block--soon" : ""}${
        playing ? " reel-block--playing" : ""
      }`}
      aria-labelledby={`reel-block-title-${id}`}
    >
      <div className="reel-block__stage">
        {playing && canPlay ? (
          <div className="reel-block__media" aria-label={ariaLabel}>
            <HeroShowreel
              vimeoId={videoId}
              title={ariaLabel}
              autoPlay
              hidePlayButton
            />
          </div>
        ) : (
          <>
            <div className="reel-block__media reel-block__media--preview">
              <ReelSlideshow images={previewImages} alt={`${label} preview frames`} />
            </div>

            {comingSoon ? (
              <div className="reel-block__soon-badge">
                <span className="reel-block__soon-wip">WIP</span>
                <span className="reel-block__soon-label">Coming soon</span>
              </div>
            ) : (
              <button
                type="button"
                className="reel-block__play-badge"
                onClick={() => setPlaying(true)}
                aria-label={`Play ${label} showreel`}
              >
                <Play className="reel-block__play-badge-icon" fill="currentColor" strokeWidth={0} />
              </button>
            )}
          </>
        )}
      </div>

      <div className="reel-block__copy">
        <h2 id={`reel-block-title-${id}`} className="reel-block__title">
          {label}
        </h2>
        <p className="reel-block__text">{text}</p>
      </div>
    </article>
  );
}
