import FilmContactSection from "@/components/FilmContactSection";
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
        <div className="page-title-row">
          <h1>Studio</h1>
        </div>

        <div className="studio-intro" aria-labelledby="who-heading">
          <h2 id="who-heading" className="studio-section-heading">
            {page.introHeading}
          </h2>
          <p className="studio-models__note">{page.intro}</p>
        </div>

        <StudioSlideshow />
      </section>

      <section className="studio-models" aria-labelledby="how-heading">
        <h2 id="how-heading" className="studio-section-heading">
          {page.howHeading}
        </h2>
        <p className="studio-models__note">{page.how}</p>
        <h2 id="ways-heading" className="studio-section-heading studio-block">
          {page.engagementHeading}
        </h2>
        <ul className="studio-models__list">
          {page.engagementModels.map((model) => (
            <li key={model.title}>
              <h3 className="studio-models__title">{model.title}</h3>
              <p className="studio-models__text">{model.text}</p>
            </li>
          ))}
        </ul>

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
      </section>

      <section className="studio-people" aria-labelledby="people-heading">
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
      </section>

      <FilmContactSection heading={site.homeContact.heading} />
    </>
  );
}
