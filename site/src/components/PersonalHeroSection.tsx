import { useEffect, useRef, useState } from "react";
import { publicAsset } from "@/lib/publicAsset";
import { site } from "@/data/site";

/** Play on first view; later only after several re-entries into view. */
function HeroPortraitVideo({
  src,
  poster,
  alt,
}: {
  src: string;
  poster: string;
  alt: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    /** Re-entries into view required before a repeat play (after the first). */
    const REENTRIES_BEFORE_REPLAY = 3;

    let cancelled = false;
    let playedThisVisit = false;
    let hasPlayedOnce = false;
    let entriesSinceLastPlay = 0;
    let isInView = false;

    const freezeOnLastFrame = () => {
      video.pause();
      if (video.duration && Number.isFinite(video.duration)) {
        try {
          video.currentTime = Math.max(0, video.duration - 0.05);
        } catch {
          /* ignore */
        }
      }
    };

    const resetToStart = () => {
      video.pause();
      try {
        video.currentTime = 0;
      } catch {
        /* ignore */
      }
    };

    const playOnce = () => {
      if (cancelled || !isInView || playedThisVisit) return;
      playedThisVisit = true;
      entriesSinceLastPlay = 0;
      try {
        video.currentTime = 0;
      } catch {
        /* ignore seek errors before metadata */
      }
      void video.play()
        .then(() => {
          hasPlayedOnce = true;
        })
        .catch(() => {
          playedThisVisit = false;
        });
    };

    const onEnded = () => {
      freezeOnLastFrame();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry || cancelled) return;

        if (entry.isIntersecting) {
          if (isInView) return;
          isInView = true;

          if (!hasPlayedOnce) {
            playOnce();
            return;
          }

          entriesSinceLastPlay += 1;
          if (entriesSinceLastPlay >= REENTRIES_BEFORE_REPLAY) {
            playOnce();
          }
          return;
        }

        isInView = false;
        playedThisVisit = false;
        video.pause();
        // Keep last frame after the first play; only reset before first play.
        if (!hasPlayedOnce) {
          resetToStart();
        }
      },
      { threshold: 0, rootMargin: "0px" },
    );

    video.loop = false;
    video.addEventListener("ended", onEnded);
    observer.observe(video);

    return () => {
      cancelled = true;
      observer.disconnect();
      video.removeEventListener("ended", onEnded);
      video.pause();
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      className="archive-hero__portrait-video"
      src={src}
      poster={poster}
      muted
      playsInline
      preload="auto"
      loop={false}
      aria-label={alt}
    />
  );
}

export default function PersonalHeroSection() {
  const { hero } = site;
  const [firstName, lastName] = hero.personalName.split(" ");
  const portraitSrc = publicAsset(hero.personalPortrait);
  const portraitVideoSrc = publicAsset(hero.personalPortraitVideo);
  const [preferReducedMotion, setPreferReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setPreferReducedMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  return (
    <section id="top" className="archive-hero scroll-mt-24" aria-label="Introduction">
      <div className="archive-container archive-hero__grid">
        <div className="archive-hero__copy">
          <p className="archive-meta archive-hero__role">{hero.personalRole}</p>
          <h1 className="archive-hero__name">
            <span className="archive-hero__name-line">{firstName}</span>
            <span className="archive-hero__name-line archive-hero__name-line--offset">{lastName}</span>
          </h1>
          <p className="archive-hero__bio">{hero.personalPositioning}</p>
          <ul className="archive-hero__proof" aria-label="Experience">
            {hero.personalProof.map((item) => (
              <li key={item} className="archive-hero__proof-item">
                {item}
              </li>
            ))}
            <li className="archive-hero__proof-item">
              <a
                href={hero.imdbHref}
                className="archive-hero__proof-link"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={hero.imdbAria}
              >
                IMDb
              </a>
            </li>
          </ul>
        </div>

        <div className="archive-hero__aside">
          <figure className="archive-hero__media">
            {preferReducedMotion ? (
              <img
                src={portraitSrc}
                alt={hero.personalPortraitAlt}
                width={900}
                height={900}
                decoding="async"
                fetchPriority="high"
              />
            ) : (
              <HeroPortraitVideo
                src={portraitVideoSrc}
                poster={portraitSrc}
                alt={hero.personalPortraitAlt}
              />
            )}
          </figure>
        </div>
      </div>
    </section>
  );
}
