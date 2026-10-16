import { useEffect } from "react";
import ContactForm from "@/components/ContactForm";
import { SEO } from "@/components/SEO";
import { scrollToSection, site } from "@/data/site";
import { hubCanonicalHref } from "@/lib/routes";

/** Company page — intro, engagement models, people. No portfolio or clients. */
export default function StudioPage() {
  const { studioPage } = site;
  const seoUrl = `${site.canonical}${hubCanonicalHref("studio")}`;

  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, "");
    if (!hash) return;
    const timer = window.setTimeout(() => scrollToSection(hash), 50);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <>
      <SEO title={studioPage.seoTitle} description={studioPage.seoDescription} url={seoUrl} />
      <main className="site-main work-page archive-hub studio-page">
        <header className="work-page-header hub-page-header">
          <h1 className="hub-page-header__row">
            <span className="hub-page-header__name">{studioPage.name}</span>
            <span className="hub-page-header__sep" aria-hidden="true" />
            <span className="sr-only"> — </span>
            <span className="hub-page-header__lead">{studioPage.title}</span>
          </h1>
        </header>

        <div className="archive-container studio-page__body">
          <section className="studio-page__section" aria-labelledby="studio-intro">
            <h2 id="studio-intro" className="studio-page__heading">
              {studioPage.introHeading}
            </h2>
            <p className="studio-page__text">{studioPage.intro}</p>
          </section>

          <section className="studio-page__section studio-page__engagement" aria-labelledby="studio-engagement">
            <h2 id="studio-engagement" className="studio-page__heading">
              {studioPage.engagementHeading}
            </h2>
            <ul className="studio-engagement__list">
              {studioPage.engagementModels.map((item) => (
                <li key={item.title} className="studio-engagement__item">
                  <p className="studio-engagement__title">{item.title}</p>
                  <p className="studio-engagement__text">{item.text}</p>
                </li>
              ))}
            </ul>
            <p className="studio-engagement__note">{studioPage.engagementNote}</p>
          </section>

          <section className="studio-page__section" aria-labelledby="studio-people">
            <h2 id="studio-people" className="studio-page__heading">
              {studioPage.peopleHeading}
            </h2>
            <p className="studio-page__text">{studioPage.people}</p>
            <p className="studio-page__founder">
              {studioPage.founderLine}{" "}
              <a className="studio-page__founder-link" href={hubCanonicalHref("about")}>
                {studioPage.founderCta}
              </a>
            </p>
          </section>
        </div>

        <ContactForm heading={studioPage.contactHeading} lead={studioPage.contactLead} />
      </main>
    </>
  );
}
