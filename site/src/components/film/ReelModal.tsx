import { useEffect } from "react";
import { PlayIcon } from "./FilmIcons";

export default function ReelModal({
  open,
  close,
  vimeoId,
  title = "Showreel",
}: {
  open: boolean;
  close: () => void;
  vimeoId: string | null;
  title?: string;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close]);

  if (!open) return null;

  return (
    <div className="reel-modal" role="dialog" aria-modal="true" aria-label={title}>
      <button className="modal-close" type="button" onClick={close}>
        Close
      </button>
      {vimeoId ? (
        <div className="reel-embed">
          <iframe
            title={title}
            src={`https://player.vimeo.com/video/${vimeoId}?autoplay=1&title=0&byline=0&portrait=0`}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : (
        <div className="reel-placeholder">
          <span>
            <PlayIcon />
          </span>
          <p>Reel unavailable</p>
        </div>
      )}
    </div>
  );
}
