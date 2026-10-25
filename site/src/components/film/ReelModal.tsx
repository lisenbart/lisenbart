import { useEffect, useRef } from "react";
import { PlayIcon } from "./FilmIcons";
import ShowreelCloseButton from "@/components/film/ShowreelCloseButton";
import { reelEmbedSrc, type ReelSource } from "@/lib/reelSource";
import { unmuteVimeoIframe } from "@/lib/vimeoPlayer";

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
  const iframeRef = useRef<HTMLIFrameElement>(null);

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

  // Modal opens after setState — unmute once muted autoplay is running.
  useEffect(() => {
    if (!open || source?.provider !== "vimeo") return;
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
  }, [open, source]);

  if (!open) return null;

  return (
    <>
      <div className="reel-modal" role="dialog" aria-modal="true" aria-label={title}>
        {source ? (
          <div className="reel-embed">
            <iframe
              ref={iframeRef}
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
