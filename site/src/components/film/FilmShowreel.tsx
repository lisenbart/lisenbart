import { useEffect, useRef, useState } from "react";
import { PlayIcon } from "@/components/film/FilmIcons";
import { useReel } from "@/contexts/ReelContext";
import { useIsNarrowViewport } from "@/hooks/useMatchMedia";
import { useShowreelSession } from "@/hooks/useShowreelSession";
import { unmuteVimeoIframe } from "@/lib/vimeoPlayer";

/**
 * Single showreel presentation: one poster, one play action.
 * Mobile → fullscreen modal. Desktop → plays in the showreel frame.
 *
 * Embeds always start muted (autoplay after setState loses the user-gesture
 * token, so unmuted `autoplay=1&muted=0` can show Vimeo's Error dialog).
 * When `withSound`, we unmute via the Player API after the iframe loads.
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
  forceModal = false,
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
  /** Prefer unmuted playback after the user click (unmute via Player API). */
  withSound?: boolean;
  /** Always open the lightbox player instead of inline playback. */
  forceModal?: boolean;
}) {
  const { openReel } = useReel();
  const isNarrow = useIsNarrowViewport();
  const [playing, setPlaying] = useState(false);
  const closeControl = useShowreelSession(playing, setPlaying);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const canPlayInline = Boolean(vimeoId);

  const play = () => {
    if (canPlayInline && vimeoId) {
      if (forceModal || isNarrow) {
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

  useEffect(() => {
    if (!playing || !vimeoId || !withSound) return;
    const iframe = iframeRef.current;
    if (!iframe) return;

    let cancelled = false;
    const tryUnmute = () => {
      if (cancelled) return;
      void unmuteVimeoIframe(iframe);
    };

    iframe.addEventListener("load", tryUnmute);
    tryUnmute();

    return () => {
      cancelled = true;
      iframe.removeEventListener("load", tryUnmute);
    };
  }, [playing, vimeoId, withSound]);

  const actionLabel = playLabel ?? (canPlayInline ? "Watch reel" : "Open site");
  const ariaAction = canPlayInline ? `Play ${label}` : `Open ${label}`;
  // Always muted in the URL — reliable after async iframe mount.
  const vimeoQuery = "autoplay=1&muted=1&title=0&byline=0&portrait=0&playsinline=1";

  return (
    <section id={id} className="film-showreel" aria-label={label}>
      {playing && vimeoId ? (
        <>
          <div className="film-showreel__stage film-showreel__stage--playing">
            <iframe
              ref={iframeRef}
              title={label}
              src={`https://player.vimeo.com/video/${vimeoId}?${vimeoQuery}`}
              allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
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
