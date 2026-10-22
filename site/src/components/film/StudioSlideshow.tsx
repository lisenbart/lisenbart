import { useEffect, useState } from "react";
import { PlayIcon } from "@/components/film/FilmIcons";
import ShowreelCloseButton from "@/components/film/ShowreelCloseButton";
import { useReel } from "@/contexts/ReelContext";
import { useIsNarrowViewport } from "@/hooks/useMatchMedia";
import { site } from "@/data/site";

const SLIDES = [
  {
    src: "/images/studio/studio-strip.webp",
    alt: "LISENBART FILM animation studio",
  },
  {
    src: "/images/studio/showreel-collage.webp",
    alt: "LISENBART FILM showreel collage",
  },
  {
    src: "/images/reels/advertising/showreel-poster.webp",
    alt: "Client Work collage",
  },
  {
    src: "/images/explore/originals/card-poster.jpg",
    alt: "Originals collage",
  },
  {
    src: "/images/reels/games/showreel-poster.webp",
    alt: "Game Ads collage",
  },
  {
    src: "/images/reels/ai/showreel-poster.webp",
    alt: "AI & Hybrid collage",
  },
] as const;

const INTERVAL_MS = 4500;
const reel = site.studioPage.showreel;

export default function StudioSlideshow() {
  const { openReel } = useReel();
  const isNarrow = useIsNarrowViewport();
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    SLIDES.forEach(({ src }) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    if (playing) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const timer = window.setInterval(() => {
      setActive((index) => (index + 1) % SLIDES.length);
    }, INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, [playing]);

  useEffect(() => {
    if (!playing) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPlaying(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [playing]);

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
      aria-label="Studio work collage slideshow"
    >
      {SLIDES.map((slide, index) => (
        <img
          key={slide.src}
          className={index === active ? "is-active" : undefined}
          src={slide.src}
          alt={index === active && !playing ? slide.alt : ""}
          width={1536}
          height={1024}
          loading={index === 0 ? "eager" : "lazy"}
          aria-hidden={index === active && !playing ? undefined : true}
        />
      ))}
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
          <ShowreelCloseButton onClose={() => setPlaying(false)} />
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
