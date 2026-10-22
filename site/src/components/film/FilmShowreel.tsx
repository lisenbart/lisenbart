import { useState } from "react";
import { PlayIcon } from "@/components/film/FilmIcons";
import { useReel } from "@/contexts/ReelContext";
import { useIsNarrowViewport } from "@/hooks/useMatchMedia";

/**
 * Single showreel presentation: one poster, one play action.
 * Mobile → fullscreen modal. Desktop → plays in the showreel frame.
 */
export default function FilmShowreel({
  id,
  label,
  poster,
  vimeoId = null,
  externalHref,
}: {
  id: string;
  label: string;
  poster: string;
  vimeoId?: string | null;
  /** Used when no Vimeo id — e.g. Games specialist site. */
  externalHref?: string;
}) {
  const { openReel } = useReel();
  const isNarrow = useIsNarrowViewport();
  const [playing, setPlaying] = useState(false);
  const canPlayInline = Boolean(vimeoId);

  const play = () => {
    if (canPlayInline && vimeoId) {
      if (isNarrow) {
        openReel(vimeoId, label);
        return;
      }
      setPlaying(true);
      return;
    }
    if (externalHref) {
      window.open(externalHref, "_blank", "noopener,noreferrer");
    }
  };

  const actionLabel = canPlayInline ? "Watch reel" : "Open site";
  const ariaAction = canPlayInline ? `Watch ${label}` : `Open ${label}`;

  return (
    <section id={id} className="film-showreel" aria-label={label}>
      {playing && vimeoId ? (
        <div className="film-showreel__stage film-showreel__stage--playing">
          <iframe
            title={label}
            src={`https://player.vimeo.com/video/${vimeoId}?autoplay=1&title=0&byline=0&portrait=0`}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : (
        <button
          type="button"
          className="film-showreel__stage"
          onClick={play}
          aria-label={ariaAction}
        >
          <img src={poster} alt="" width={1672} height={941} decoding="async" />
          <span className="film-showreel__play">
            <span className="film-showreel__play-circle">
              <PlayIcon />
            </span>
            <span className="film-showreel__play-label">{actionLabel}</span>
          </span>
        </button>
      )}
    </section>
  );
}
