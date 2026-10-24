import { useEffect } from "react";
import { PlayIcon } from "./FilmIcons";
import ShowreelCloseButton from "@/components/film/ShowreelCloseButton";
import { reelEmbedSrc, type ReelSource } from "@/lib/reelSource";

export default function ReelModal({
  open,
  close,
  source,
  title = "Showreel",
}: {
  open: boolean;
  close: () => void;
  source: ReelSource | null;
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
    <>
      <div className="reel-modal" role="dialog" aria-modal="true" aria-label={title}>
        {source ? (
          <div className="reel-embed">
            <iframe
              title={title}
              src={reelEmbedSrc(source)}
              allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
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
      <ShowreelCloseButton onClose={close} />
    </>
  );
}
