import { useEffect, useLayoutEffect, useRef, useState } from "react";
import FilmContactSection from "@/components/FilmContactSection";
import FilmReveal from "@/components/film/FilmReveal";
import { SEO } from "@/components/SEO";
import { Arrow } from "@/components/film/FilmIcons";
import { useExploreParallax } from "@/hooks/useExploreParallax";
import { useScrollParallax } from "@/hooks/useScrollParallax";
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
  const lines = headline.split(/\n+/).map((line) => line.trim()).filter(Boolean);
  if (lines.length >= 2) return lines;
  const parts = headline
    .split(/(?<=\.)\s+/)
    .map((part) => part.replace(/\.$/, "").trim())
    .filter(Boolean);
  return parts.length >= 2 ? parts : [headline.replace(/\.$/, "").trim()];
}

export default function HomePage() {
  /** Default day for SSR/prerender; local period applied before paint. */
  const [period, setPeriod] = useState<HeroPeriod>("day");
  const headlineLines = formatHeadline(site.studioHome.headline);
  const heroRef = useRef<HTMLElement>(null);
  const bearRef = useRef<HTMLImageElement>(null);
  const exploreRef = useRef<HTMLElement>(null);

  useScrollParallax(heroRef, bearRef, { strength: 12 });
  useExploreParallax(exploreRef);

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
        <section ref={heroRef} className={`home-hero home-hero--${period}`}>
          <img
            ref={bearRef}
            className="bear-art"
            src={heroSrc}
            alt=""
            width={1024}
            height={576}
            fetchPriority="high"
          />
          <div className="home-statement film-reveal is-in">
            <h1>
              {headlineLines.map((line, index) => (
                <span key={line}>
                  {index > 0 ? <br /> : null}
                  {line}
                </span>
              ))}
            </h1>
          </div>
        </section>

        <section ref={exploreRef} className="home-explore" id={sectionIds.explore}>
          <FilmReveal delayMs={0}>
            <a className="explore-strip explore-strip--work" href={hubCanonicalHref("client-work")}>
              <div>
                <h3>Client Work</h3>
                <p>Animation for brands &amp; agencies</p>
              </div>
              <span className="circle-link">
                <Arrow />
              </span>
            </a>
          </FilmReveal>
          <FilmReveal delayMs={80}>
            <a className="explore-strip explore-strip--originals" href={hubCanonicalHref("originals")}>
              <div>
                <h3>Originals</h3>
                <p>Stories of our own</p>
              </div>
              <span className="circle-link">
                <Arrow />
              </span>
            </a>
          </FilmReveal>
          <FilmReveal delayMs={160}>
            <a className="explore-strip explore-strip--games" href={hubCanonicalHref("games")}>
              <div>
                <h3>Game Ads</h3>
                <p>Ads, cinematics &amp; playables</p>
              </div>
              <span className="circle-link">
                <Arrow />
              </span>
            </a>
          </FilmReveal>
          <FilmReveal delayMs={240}>
            <a className="explore-strip explore-strip--ai" href={hubCanonicalHref("ai")}>
              <div>
                <h3>AI &amp; Hybrid</h3>
              </div>
              <span className="circle-link">
                <Arrow />
              </span>
            </a>
          </FilmReveal>
        </section>

        <FilmReveal>
          <FilmContactSection heading={site.homeContact.heading} />
        </FilmReveal>
      </div>
    </>
  );
}
