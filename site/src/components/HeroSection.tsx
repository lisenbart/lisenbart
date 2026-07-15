import { sectionIds, scrollToSection, site } from "@/data/site";
import HeroShowreel from "./HeroShowreel";

export default function HeroSection() {
  return (
    <section
      id="top"
      className="hero-split scroll-mt-24 px-[var(--page-padding)] pt-[5.75rem] md:pt-[4.5rem]"
      aria-label="Introduction"
    >
      <div className="mx-auto w-full min-w-0 max-w-[920px]">
        <article className="how-ios-card showreel-card hero-split-card" aria-label="Hero">
          <div className="hero-split-card__inner">
            <div className="hero-split-card__media video-stage showreel-card-media hero-showreel-frame relative w-full min-w-0">
              <HeroShowreel />
            </div>

            <div className="hero-split-card__copy">
              <h1 className="hero-split__headline">{site.hero.posterHeadlineLine1}</h1>
              <p className="hero-split__subhead">{site.hero.posterHeadlineLine2}</p>
              <a
                href={`#${sectionIds.services}`}
                onClick={(event) => {
                  event.preventDefault();
                  scrollToSection(sectionIds.services);
                }}
                className="hero-split__cta gradient-button-emerald btn-on-accent inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium uppercase tracking-[0.12em]"
              >
                {site.hero.posterCtaLabel}
              </a>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
