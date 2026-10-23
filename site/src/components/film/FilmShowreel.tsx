import { useState } from "react";
import { PlayIcon } from "@/components/film/FilmIcons";
import { useReel } from "@/contexts/ReelContext";
import { useIsNarrowViewport } from "@/hooks/useMatchMedia";
import { useShowreelSession } from "@/hooks/useShowreelSession";

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
  playLabel,
  playLabelHidden = false,
  withSound = false,
}: {
  id: string;
  label: string;
  poster: string;
  vimeoId?: string | null;
  /** Used when no Vimeo id — e.g. Games specialist site. */
  externalHref?: string;
  /** Overrides default "Watch reel" / "Open site" play control text. */
  playLabel?: string;
  /** Icon-only play control (no text label). */
  playLabelHidden?: boolean;
  /** Request unmuted autoplay after a user click (Vimeo `muted=0`). */
  withSound?: boolean;
}) {
  const { openReel } = useReel();
  const isNarrow = useIsNarrowViewport();
  const [playing, setPlaying] = useState(false);
  const closeControl = useShowreelSession(playing, setPlaying);
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

  const actionLabel = playLabel ?? (canPlayInline ? "Watch reel" : "Open site");
  const ariaAction = canPlayInline ? `Play ${label}` : `Open ${label}`;
  const vimeoQuery = withSound
    ? "autoplay=1&muted=0&title=0&byline=0&portrait=0"
    : "autoplay=1&title=0&byline=0&portrait=0";

  return (
    <section id={id} className="film-showreel" aria-label={label}>
      {playing && vimeoId ? (
        <>
          <div className="film-showreel__stage film-showreel__stage--playing">
            <iframe
              title={label}
              src={`https://player.vimeo.com/video/${vimeoId}?${vimeoQuery}`}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
          </div>
          {closeControl}
        </>
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
            {playLabelHidden ? null : (
              <span className="film-showreel__play-label">{actionLabel}</span>
            )}
          </span>
        </button>
      )}
    </section>
  );
}
