import { useEffect, useState } from "react";
import { PlayIcon } from "@/components/film/FilmIcons";
import { useReel } from "@/contexts/ReelContext";
import { site } from "@/data/site";

const SLIDES = [
  {
    src: "/images/studio/studio-strip.webp",
    alt: "LISENBART FILM animation studio",
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
  const [active, setActive] = useState(0);

  useEffect(() => {
    SLIDES.forEach(({ src }) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const timer = window.setInterval(() => {
      setActive((index) => (index + 1) % SLIDES.length);
    }, INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="studio-image" aria-label="Studio work collage slideshow">
      {SLIDES.map((slide, index) => (
        <img
          key={slide.src}
          className={index === active ? "is-active" : undefined}
          src={slide.src}
          alt={index === active ? slide.alt : ""}
          width={1536}
          height={1024}
          loading={index === 0 ? "eager" : "lazy"}
          aria-hidden={index === active ? undefined : true}
        />
      ))}
      <button
        type="button"
        className="studio-image__play"
        onClick={() => openReel(reel.vimeoId, reel.label)}
        aria-label={`${reel.playLabel}: ${reel.label}`}
      >
        <span className="studio-image__play-circle">
          <PlayIcon />
        </span>
        <span className="studio-image__play-label">{reel.playLabel}</span>
      </button>
    </div>
  );
}
