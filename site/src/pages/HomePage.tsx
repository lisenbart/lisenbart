import { useEffect, useLayoutEffect, useRef, useState } from "react";
import HomePathsSection from "@/components/home/HomePathsSection";
import { SEO } from "@/components/SEO";
import { useScrollParallax } from "@/hooks/useScrollParallax";
import {
  HERO_IMAGES,
  heroImageForPeriod,
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
  const bearRef = useRef<HTMLImageElement>(null);

  useScrollParallax(heroRef, bearRef, { strength: 12 });

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
      <div className="home-page home-page--gateway">
        <section
          ref={heroRef}
          className={`home-hero home-hero--${period}`}
          aria-label={headlineLines.join(" ")}
        >
          <img
            ref={bearRef}
            className="bear-art"
            src={heroSrc}
            alt=""
            width={2500}
            height={2500}
            fetchPriority="high"
          />
          <div className="home-hero__copy film-reveal is-in">
            {/* Main slogan temporarily hidden for composition review — restore home-hero__slogan */}
            <div className="home-hero__footer-copy">
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
