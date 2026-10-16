import { useEffect } from "react";
import ContactForm from "@/components/ContactForm";
import { SEO } from "@/components/SEO";
import { scrollToSection, site } from "@/data/site";
import { hubCanonicalHref } from "@/lib/routes";

/** Company page — how the studio works. No Selected Clients or service catalogue. */
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
          {studioPage.sections.map((section) => (
            <section
              key={section.id}
              className="studio-page__section"
              aria-labelledby={`studio-${section.id}`}
            >
              <h2 id={`studio-${section.id}`} className="studio-page__heading">
                {section.heading}
              </h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="studio-page__text">
                  {paragraph}
                </p>
              ))}
              {section.id === "people" && (
                <p className="studio-page__founder">
                  {studioPage.founderLine}{" "}
                  <a className="studio-page__founder-link" href={hubCanonicalHref("about")}>
                    {studioPage.founderCta}
                  </a>
                </p>
              )}
            </section>
          ))}
        </div>

        <ContactForm heading={studioPage.contactHeading} lead={studioPage.contactLead} />
      </main>
    </>
  );
}
