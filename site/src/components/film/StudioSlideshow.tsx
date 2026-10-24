/** Studio hero still — bears in the studio. No play / reel. */
const STUDIO_STILL = {
  src: "/images/studio/studio-strip.webp",
  alt: "LISENBART FILM animation studio",
} as const;

export default function StudioSlideshow() {
  return (
    <div className="studio-image studio-image--still" aria-label="LISENBART FILM studio">
      <img
        className="is-active"
        src={STUDIO_STILL.src}
        alt={STUDIO_STILL.alt}
        width={1536}
        height={1024}
        loading="eager"
        fetchPriority="high"
      />
    </div>
  );
}
