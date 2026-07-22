import { useEffect, useId, useRef, useState } from "react";
import { Play, X } from "lucide-react";
import HeroShowreel from "@/components/HeroShowreel";
import { publicAsset } from "@/lib/publicAsset";

/** 16:9 poster → play → Vimeo (mount on interaction). */
export function FilmMediaStage({
  title,
  posterSrc,
  posterAlt,
  vimeoId,
  priority = false,
  className = "",
}: {
  title: string;
  posterSrc: string;
  posterAlt: string;
  vimeoId: string;
  priority?: boolean;
  className?: string;
}) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className={`originals-media ${className}`.trim()}>
      {playing ? (
        <div className="originals-media__player">
          <HeroShowreel vimeoId={vimeoId} title={title} autoPlay hidePlayButton />
        </div>
      ) : (
        <>
          <img
            className="originals-media__poster"
            src={publicAsset(posterSrc)}
            alt={posterAlt}
            width={1280}
            height={720}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            {...(priority ? { fetchPriority: "high" as const } : {})}
          />
          <button
            type="button"
            className="originals-media__play"
            onClick={() => setPlaying(true)}
            aria-label={`Play ${title}`}
          >
            <Play className="originals-media__play-icon" fill="currentColor" strokeWidth={0} />
          </button>
        </>
      )}
    </div>
  );
}

export function OriginalsStillGallery({
  stills,
  projectTitle,
}: {
  stills: string[];
  projectTitle: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogLabelId = useId();

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIndex(null);
      if (e.key === "ArrowRight") {
        setOpenIndex((i) => (i === null ? i : (i + 1) % stills.length));
      }
      if (e.key === "ArrowLeft") {
        setOpenIndex((i) => (i === null ? i : (i - 1 + stills.length) % stills.length));
      }
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [openIndex, stills.length]);

  if (stills.length === 0) return null;

  return (
    <div className="originals-gallery">
      <ul className="originals-gallery__thumbs">
        {stills.map((src, index) => (
          <li key={src}>
            <button
              type="button"
              className="originals-gallery__thumb"
              onClick={() => setOpenIndex(index)}
              aria-label={`Open still ${index + 1} from ${projectTitle}`}
            >
              <img
                src={publicAsset(src)}
                alt=""
                width={320}
                height={180}
                loading="lazy"
                decoding="async"
              />
            </button>
          </li>
        ))}
      </ul>

      {openIndex !== null && (
        <div
          className="originals-lightbox"
          role="dialog"
          aria-modal="true"
          aria-labelledby={dialogLabelId}
        >
          <button
            type="button"
            className="originals-lightbox__backdrop"
            aria-label="Close gallery"
            onClick={() => setOpenIndex(null)}
          />
          <div className="originals-lightbox__panel">
            <p id={dialogLabelId} className="sr-only">
              {projectTitle} still {openIndex + 1} of {stills.length}
            </p>
            <button
              ref={closeRef}
              type="button"
              className="originals-lightbox__close"
              onClick={() => setOpenIndex(null)}
              aria-label="Close gallery"
            >
              <X size={20} strokeWidth={1.75} />
            </button>
            <img
              className="originals-lightbox__image"
              src={publicAsset(stills[openIndex]!)}
              alt={`${projectTitle} still ${openIndex + 1}`}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export function CreditsDisclosure({ credits }: { credits: string }) {
  return (
    <details className="originals-credits">
      <summary className="originals-credits__summary">Credits</summary>
      <p className="originals-credits__body">{credits}</p>
    </details>
  );
}
