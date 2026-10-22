import { useEffect, useLayoutEffect, useRef, useState } from "react";
import HomePathsSection from "@/components/home/HomePathsSection";
import { SEO } from "@/components/SEO";
import { useScrollParallax } from "@/hooks/useScrollParallax";
import {
  HERO_IMAGES,
  heroPeriodFromDate,
  msUntilNextHeroBoundary,
  type HeroPeriod,
} from "@/lib/heroTime";
import { scrollToSection, site } from "@/data/site";

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
  const bearDesktopRef = useRef<HTMLImageElement>(null);

  useScrollParallax(heroRef, bearDesktopRef, { strength: 8 });

  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, "");
    if (!hash) return;
    const timer = window.setTimeout(() => scrollToSection(hash), 50);
    return () => window.clearTimeout(timer);
  }, []);

  /** Blend desktop↔mobile hero framing across a width band (no hard jump at 800px). */
  useLayoutEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const BLEND_WIDE = 900;
    const BLEND_NARROW = 700;

    const syncNarrow = () => {
      const t = Math.min(
        1,
        Math.max(0, (BLEND_WIDE - window.innerWidth) / (BLEND_WIDE - BLEND_NARROW)),
      );
      hero.style.setProperty("--hero-narrow", t.toFixed(4));
    };

    syncNarrow();
    window.addEventListener("resize", syncNarrow, { passive: true });
    return () => {
      window.removeEventListener("resize", syncNarrow);
      hero.style.removeProperty("--hero-narrow");
    };
  }, []);

  useLayoutEffect(() => {
    [HERO_IMAGES.desktop, HERO_IMAGES.mobile].forEach((src) => {
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

  return (
    <>
      <SEO title={site.meta.title} description={site.meta.description} url={`${site.canonical}/`} />
      <div className="home-page home-page--gateway">
        <section
          ref={heroRef}
          className={`home-hero home-hero--${period}`}
          aria-labelledby="home-who-heading"
        >
          <div className="home-hero__art" aria-hidden="true">
            <img
              ref={bearDesktopRef}
              className="bear-art bear-art--desktop"
              src={HERO_IMAGES.desktop}
              alt=""
              width={2400}
              height={800}
              fetchPriority="high"
            />
            <img
              className="bear-art bear-art--mobile"
              src={HERO_IMAGES.mobile}
              alt=""
              width={1170}
              height={1560}
              fetchPriority="high"
            />
          </div>
          <div className="home-hero__copy film-reveal is-in">
            <div className="home-hero__intro">
              <h1 id="home-who-heading" className="home-hero__fly">
                {headlineLines.map((line) => (
                  <span key={line} className="home-hero__fly-line">
                    {line}
                  </span>
                ))}
              </h1>
              <p className="home-hero__support-heading">{site.studioHome.heroSupportHeading}</p>
              <p className="home-hero__support">{site.studioHome.heroSupport}</p>
            </div>
          </div>
        </section>

        <HomePathsSection />
      </div>
    </>
  );
}
