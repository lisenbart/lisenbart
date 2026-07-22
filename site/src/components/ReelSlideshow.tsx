import { useEffect, useRef, useState } from "react";
import { publicAsset } from "@/lib/publicAsset";

interface ReelSlideshowProps {
  images: string[];
  alt: string;
  intervalMs?: number;
}

/** Crossfading still-frame slideshow for commercial reel previews. */
export default function ReelSlideshow({
  images,
  alt,
  intervalMs = 3200,
}: ReelSlideshowProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(true);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        setInView(entry.isIntersecting && entry.intersectionRatio > 0.15);
      },
      { threshold: [0, 0.15, 0.4] },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (images.length < 2 || reduceMotion || !inView) return;
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % images.length);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [images.length, intervalMs, reduceMotion, inView]);

  if (images.length === 0) {
    return <div className="reel-slideshow reel-slideshow--empty" aria-hidden="true" />;
  }

  const labeled = Boolean(alt);

  return (
    <div
      ref={rootRef}
      className="reel-slideshow"
      {...(labeled ? { role: "img" as const, "aria-label": alt } : { "aria-hidden": true as const })}
    >
      {images.map((src, index) => (
        <img
          key={src}
          src={publicAsset(src)}
          alt=""
          aria-hidden="true"
          className={`reel-slideshow__frame${index === active ? " is-active" : ""}`}
          loading={index === 0 ? "eager" : "lazy"}
          decoding="async"
          draggable={false}
        />
      ))}
    </div>
  );
}
