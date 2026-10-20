import FilmContactSection from "@/components/FilmContactSection";
import FilmReveal from "@/components/film/FilmReveal";
import StudioModelItem from "@/components/film/StudioModelItem";
import { SEO } from "@/components/SEO";
import { Arrow } from "@/components/film/FilmIcons";
import StudioSlideshow from "@/components/film/StudioSlideshow";
import { goToContact, site } from "@/data/site";
import { hubCanonicalHref } from "@/lib/routes";
import { publicAsset } from "@/lib/publicAsset";

const page = site.studioPage;

export default function StudioPage() {
  return (
    <>
      <SEO
        title={page.seoTitle}
        description={page.seoDescription}
        url={`${site.canonical}/studio/`}
      />
      <section className="studio-page">
        <FilmReveal>
          <div className="page-title-row">
            <h1>Studio</h1>
          </div>
        </FilmReveal>

        <FilmReveal delayMs={60}>
          <div className="studio-intro" aria-labelledby="who-heading">
            <h2 id="who-heading" className="studio-section-heading">
              {page.introHeading}
            </h2>
            <p className="studio-models__note">{page.intro}</p>
          </div>
        </FilmReveal>

        <FilmReveal delayMs={100}>
          <StudioSlideshow />
        </FilmReveal>
      </section>

      <section className="studio-models" aria-labelledby="how-heading">
        <FilmReveal>
          <h2 id="how-heading" className="studio-section-heading">
            {page.howHeading}
          </h2>
          <p className="studio-models__note">{page.how}</p>
        </FilmReveal>

        <FilmReveal delayMs={40}>
          <h2 id="ways-heading" className="studio-section-heading studio-block">
            {page.engagementHeading}
          </h2>
        </FilmReveal>

        <ul className="studio-models__list">
          {page.engagementModels.map((model, index) => (
            <StudioModelItem
              key={model.title}
              title={model.title}
              text={model.text}
              delayMs={index * 70}
            />
          ))}
        </ul>

        <FilmReveal delayMs={80}>
          <a
            className="studio-cta"
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              goToContact();
            }}
          >
            <span className="circle-link">
              <Arrow />
            </span>
            Discuss a project
          </a>
        </FilmReveal>
      </section>

      <section className="studio-people" aria-labelledby="people-heading">
        <FilmReveal>
          <h2 id="people-heading" className="studio-models__title">
            {page.peopleHeading}
          </h2>
          <div className="studio-founder">
            <img
              className="studio-founder__portrait"
              src={publicAsset(page.founderPortrait)}
              alt={page.founderPortraitAlt}
              width={160}
              height={160}
            />
            <div>
              <p className="studio-people__founder-name">{page.founderName}</p>
              <p className="studio-people__founder-role">{page.founderRole}</p>
              <p className="studio-people__founder-proof">{page.founderProof}</p>
              <a className="studio-people__link" href={hubCanonicalHref("about")}>
                {page.founderCta}
              </a>
            </div>
          </div>
        </FilmReveal>
      </section>

      <FilmReveal>
        <FilmContactSection heading={site.homeContact.heading} />
      </FilmReveal>
    </>
  );
}
