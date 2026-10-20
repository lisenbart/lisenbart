import { useEffect, useLayoutEffect, useState } from "react";
import FilmContactSection from "@/components/FilmContactSection";
import { SEO } from "@/components/SEO";
import { Arrow, PlayIcon } from "@/components/film/FilmIcons";
import { useReel } from "@/contexts/ReelContext";
import {
  HERO_IMAGES,
  heroImageForPeriod,
  heroPeriodFromDate,
  msUntilNextHeroBoundary,
  type HeroPeriod,
} from "@/lib/heroTime";
import { scrollToSection, sectionIds, site } from "@/data/site";
import { hubCanonicalHref } from "@/lib/routes";

function formatHeadline(headline: string) {
  const parts = headline.split(/(?<=\.)\s+/).filter(Boolean);
  if (parts.length < 2) return [headline];
  return parts;
}

export default function HomePage() {
  const { openReel } = useReel();
  /** Default day for SSR/prerender; local period applied before paint. */
  const [period, setPeriod] = useState<HeroPeriod>("day");
  const headlineLines = formatHeadline(site.studioHome.headline);

  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, "");
    if (!hash) return;
    const timer = window.setTimeout(() => scrollToSection(hash), 50);
    return () => window.clearTimeout(timer);
  }, []);

  useLayoutEffect(() => {
    Object.values(HERO_IMAGES).forEach((src) => {
      const preload = new Image();
      preload.src = src;
    });

    const next = heroPeriodFromDate();
    setPeriod(next);
    document.documentElement.dataset.heroPeriod = next;
  }, []);

  useEffect(() => {
    let timer: number;

    const sync = () => {
      const next = heroPeriodFromDate();
      setPeriod(next);
      document.documentElement.dataset.heroPeriod = next;
      timer = window.setTimeout(sync, msUntilNextHeroBoundary());
    };

    timer = window.setTimeout(sync, msUntilNextHeroBoundary());
    const onVisible = () => {
      if (document.visibilityState === "visible") {
        window.clearTimeout(timer);
        sync();
      }
    };
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("visibilitychange", onVisible);
      delete document.documentElement.dataset.heroPeriod;
    };
  }, []);

  const heroSrc = heroImageForPeriod(period);

  return (
    <>
      <SEO title={site.meta.title} description={site.meta.description} url={`${site.canonical}/`} />
      <div className="home-page">
        <section className={`home-hero home-hero--${period}`}>
          <img
            className="bear-art"
            src={heroSrc}
            alt=""
            width={1024}
            height={576}
            fetchPriority="high"
          />
          <div className="home-statement">
            <h1>
              {headlineLines.map((line, index) => (
                <span key={line}>
                  {index > 0 ? <br /> : null}
                  {line}
                </span>
              ))}
            </h1>
            <i />
            <p>Lisenbart Film</p>
            <p>Est. 2006</p>
          </div>
          <div className="home-actions">
            <a href={`#${sectionIds.explore}`}>
              Scroll{" "}
              <span className="tiny-circle">
                <Arrow direction="down" />
              </span>
            </a>
            <button type="button" onClick={() => openReel(site.selectedWork.vimeoId, "Advertising reel")}>
              Play reel{" "}
              <span className="play-circle">
                <PlayIcon />
              </span>
            </button>
          </div>
        </section>

        <section className="home-explore" id={sectionIds.explore}>
          <a className="explore-strip work-card" href={hubCanonicalHref("client-work")}>
            <span className="strip-icon strip-icon--blank" aria-hidden="true" />
            <div>
              <h3>Client Work</h3>
              <p>
                Brands. Agencies.
                <br />
                Bold ideas.
              </p>
            </div>
            <span className="circle-link">
              <Arrow />
            </span>
          </a>
          <a className="explore-strip originals-card" href={hubCanonicalHref("originals")}>
            <span className="strip-icon strip-icon--blank" aria-hidden="true" />
            <div>
              <h3>Originals</h3>
              <p>
                Our stories.
                <br />
                New worlds.
              </p>
            </div>
            <span className="circle-link">
              <Arrow />
            </span>
          </a>
          <a className="explore-strip" href={hubCanonicalHref("games")}>
            <span className="strip-icon gamepad-icon">◇</span>
            <div>
              <h3>Games</h3>
              <p>
                Trailers. Cinematics.
                <br />
                Playables.
              </p>
            </div>
            <span className="circle-link">
              <Arrow />
            </span>
          </a>
          <a className="explore-strip" href={hubCanonicalHref("ai")}>
            <span className="strip-icon ai-orb" />
            <div>
              <h3>AI</h3>
              <p>
                Hybrid production.
                <br />
                More possibilities.
              </p>
            </div>
            <span className="circle-link">
              <Arrow />
            </span>
          </a>
        </section>

        <FilmContactSection heading="Contact" lead={site.homeContact.lead} />
      </div>
    </>
  );
}
