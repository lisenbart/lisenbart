import { publicAsset } from "@/lib/publicAsset";
import { site } from "@/data/site";

export default function PersonalHeroSection() {
  const { hero } = site;

  return (
    <section
      id="top"
      className="hero-split scroll-mt-24 px-[var(--page-padding)] pt-[5.75rem] md:pt-[4.5rem]"
      aria-label="Introduction"
    >
      <div className="mx-auto w-full min-w-0 max-w-[920px]">
        <article className="how-ios-card hero-split-card" aria-label="Hero">
          <div className="hero-split-card__inner personal-hero__inner">
            <figure className="personal-hero__media">
              <img
                src={publicAsset(hero.personalPortrait)}
                alt={hero.personalPortraitAlt}
                width={900}
                height={1100}
                decoding="async"
              />
            </figure>

            <div className="hero-split-card__copy personal-hero__copy">
              <p className="personal-hero__role">{hero.personalRole}</p>
              <h1 className="hero-split__headline personal-hero__name">{hero.personalName}</h1>
              <p className="hero-split__subhead personal-hero__bio">{hero.personalPositioning}</p>
              <p className="personal-hero__proof">{hero.personalProof}</p>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
