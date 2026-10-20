import FilmContactSection from "@/components/FilmContactSection";
import { SEO } from "@/components/SEO";
import { Arrow } from "@/components/film/FilmIcons";
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
        <div className="studio-hero" aria-labelledby="who-heading">
          <h2 id="who-heading" className="film-section-label">
            {page.introHeading}
          </h2>
          <p className="studio-hero__lead">{page.intro}</p>
        </div>
        <div className="studio-image">
          <img
            src="/images/explore/originals/07.webp"
            alt="Creative production in progress"
          />
        </div>
        <div className="studio-footer">
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              goToContact();
            }}
          >
            <span className="circle-link">
              <Arrow />
            </span>{" "}
            Discuss a project
          </a>
        </div>
      </section>

      <section className="studio-models" aria-labelledby="how-heading">
        <h2 id="how-heading" className="studio-models__title">
          {page.howHeading}
        </h2>
        <p className="studio-models__note">{page.how}</p>
        <h2 id="ways-heading" className="studio-models__title studio-block">
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
            <p className="studio-people__founder">{page.founderLine}</p>
            <a className="studio-people__link" href={hubCanonicalHref("about")}>
              {page.founderCta}
            </a>
          </div>
        </div>
      </section>

      <FilmContactSection heading={page.contactHeading} lead={page.contactLead} />
    </>
  );
}
