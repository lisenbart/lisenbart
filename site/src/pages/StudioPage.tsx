import FilmContactSection from "@/components/FilmContactSection";
import { SEO } from "@/components/SEO";
import LightScene from "@/components/film/LightScene";
import { Arrow } from "@/components/film/FilmIcons";
import { goToContact, site } from "@/data/site";
import { hubCanonicalHref } from "@/lib/routes";

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
        <div className="studio-hero">
          <LightScene variant="studio" />
          <div>
            <h1>
              Director-led
              <br />
              creative
              <br />
              production
              <br />
              company.
            </h1>
            <i />
            <p>Est. 2006</p>
          </div>
        </div>
        <div className="studio-image">
          <img
            src="/images/explore/originals/07.webp"
            alt="Creative production in progress"
          />
        </div>
        <div className="studio-footer">
          <p>
            Creative people.
            <br />
            Real production.
            <br />
            Global stories.
          </p>
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

      <section className="studio-models" aria-labelledby="ways-heading">
        <p className="film-section-label">{page.introHeading}</p>
        <p className="studio-models__note" style={{ marginTop: 0 }}>
          {page.intro}
        </p>
        <h2 id="ways-heading" className="studio-models__title" style={{ marginTop: "2rem" }}>
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
        <p className="studio-models__note">{page.engagementNote}</p>
      </section>

      <section className="studio-people" aria-labelledby="people-heading">
        <h2 id="people-heading" className="studio-models__title">
          {page.peopleHeading}
        </h2>
        <p className="studio-people__text">{page.people}</p>
        <p className="studio-people__founder">
          {page.founderLine}{" "}
          <a className="studio-people__link" href={hubCanonicalHref("about")}>
            {page.founderCta}
          </a>
        </p>
      </section>

      <FilmContactSection heading={page.contactHeading} lead={page.contactLead} />
    </>
  );
}
