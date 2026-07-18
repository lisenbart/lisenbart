import { useEffect } from "react";
import WorkCaseBlock from "@/components/WorkCaseBlock";
import ContactForm from "@/components/ContactForm";
import { SEO } from "@/components/SEO";
import { filmPageJsonLd } from "@/data/filmJsonLd";
import { getWorkCasesByIds } from "@/data/work";
import { scrollToSection, site } from "@/data/site";
import { routes } from "@/lib/routes";

export default function FilmPage() {
  const { filmPage } = site;
  const cases = getWorkCasesByIds(filmPage.caseIds);
  const seoUrl = `${site.canonical}${routes.film}`;

  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, "");
    if (!hash) return;
    const timer = window.setTimeout(() => scrollToSection(hash), 50);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <>
      <SEO title={`Film — ${site.brand}`} description={filmPage.title} url={seoUrl} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(filmPageJsonLd) }}
      />
      <main className="site-main work-page">
        <header className="work-page-header hub-page-header px-[var(--page-padding)]">
          <h1 className="hub-page-header__row mx-auto w-full min-w-0 max-w-[920px]">
            <span className="hub-page-header__name work-page-title--film-entertainment">Film</span>
            <span className="hub-page-header__sep" aria-hidden="true" />
            <span className="sr-only"> — </span>
            <span className="hub-page-header__lead">{filmPage.title}</span>
          </h1>
        </header>

        <div className="film-cases px-[var(--page-padding)]">
          {cases.map((item, index) => (
            <WorkCaseBlock
              key={item.id}
              item={
                item.filmCategory ? { ...item, category: item.filmCategory } : item
              }
              mediaSide="left"
              mediaPriority={index === 0 ? "lcp" : "lazy"}
            />
          ))}
        </div>

        <ContactForm lead={filmPage.contactLead} />
      </main>
    </>
  );
}
