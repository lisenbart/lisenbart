import { useEffect, useLayoutEffect, useRef, useState } from "react";
import FilmContactSection from "@/components/FilmContactSection";
import FilmReveal from "@/components/film/FilmReveal";
import HomePathsSection from "@/components/home/HomePathsSection";
import HomeStudioTeaser from "@/components/home/HomeStudioTeaser";
import { SEO } from "@/components/SEO";
import { useScrollParallax } from "@/hooks/useScrollParallax";
import {
  HERO_IMAGES,
  heroPeriodFromDate,
  msUntilNextHeroBoundary,
  type HeroPeriod,
} from "@/lib/heroTime";
import { scrollToSection, site } from "@/data/site";

export default function HomePage() {
  /** Default day for SSR/prerender; local period applied before paint. */
  const [period, setPeriod] = useState<HeroPeriod>("day");
  const heroRef = useRef<HTMLElement>(null);
  const bearRef = useRef<HTMLImageElement>(null);

  useScrollParallax(heroRef, bearRef, { strength: 8 });

  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, "");
    if (!hash) return;
    const timer = window.setTimeout(() => scrollToSection(hash), 50);
    return () => window.clearTimeout(timer);
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
          <picture>
            <source media="(max-width: 800px)" srcSet={HERO_IMAGES.mobile} width={1170} height={1560} />
            <img
              ref={bearRef}
              className="bear-art"
              src={HERO_IMAGES.desktop}
              alt=""
              width={2400}
              height={800}
              fetchPriority="high"
            />
          </picture>
          <div className="home-hero__copy film-reveal is-in">
            <div className="home-hero__intro">
              <h1
                id="home-who-heading"
                className="home-hero__fly"
                aria-label={site.studioHome.heroH1Aria}
              >
                <span className="home-hero__support-heading">
                  {site.studioHome.heroSupportHeading}
                </span>
                <span className="sr-only">: </span>
                <span className="home-hero__fly-line">{site.studioHome.headline}</span>
              </h1>
              <p className="home-hero__lead">{site.studioHome.heroLead}</p>
            </div>
          </div>
        </section>

        <section
          className="studio-section studio-section--tint home-proof-band"
          aria-label="Studio proof"
        >
          <FilmReveal>
            <div className="studio-section__grid">
              <div className="studio-section__body">
                <p className="studio-models__note home-proof-band__text">
                  {site.studioHome.heroSupport}
                </p>
              </div>
            </div>
          </FilmReveal>
        </section>

        <HomePathsSection />

        <HomeStudioTeaser />

        <FilmReveal>
          <FilmContactSection heading={site.homeContact.heading} />
        </FilmReveal>
      </div>
    </>
  );
}
