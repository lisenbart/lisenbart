import { site } from "@/data/site";
import HeroShowreel from "./HeroShowreel";

export default function HeroSection() {
  return (
    <>
      <section id="top" className="showreel-hero scroll-mt-24 px-[var(--page-padding)] pt-[5.75rem] md:pt-[4.5rem]" aria-label="Showreel">
        <div className="mx-auto w-full min-w-0 max-w-[920px]">
          <article className="how-ios-card showreel-card">
            <div className="video-stage showreel-card-media relative aspect-video w-full overflow-hidden">
              <HeroShowreel />
            </div>
          </article>
        </div>
      </section>

      <section className="px-[var(--page-padding)]" aria-label="Introduction">
        <div className="mx-auto w-full min-w-0 max-w-[1440px] text-center">
          <h1 className="hero-headline mx-auto w-full min-w-0 max-w-5xl font-display font-normal uppercase tracking-[0.04em] text-text-primary">
            <span className="hero-headline-row">
              {site.hero.headlineLine2BeforeAccent}
              <span className="accent-emerald">{site.hero.headlineAccent}</span>.
            </span>
          </h1>
          <p
            className="mx-auto mt-3 max-w-2xl font-sans text-text-secondary"
            style={{ fontSize: 16, lineHeight: 1.75, fontWeight: 300 }}
          >
            {site.hero.paragraph}
          </p>
        </div>
      </section>
    </>
  );
}
