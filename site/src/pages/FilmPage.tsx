import WorkCaseBlock from "@/components/WorkCaseBlock";
import { SEO } from "@/components/SEO";
import { getWorkCasesByIds } from "@/data/work";
import { contactHref, site } from "@/data/site";
import { routes } from "@/lib/routes";

export default function FilmPage() {
  const { filmPage } = site;
  const cases = getWorkCasesByIds(filmPage.caseIds);
  const seoUrl = `${site.canonical}${routes.film}`;

  return (
    <>
      <SEO title={`Film — ${site.brand}`} description={filmPage.title} url={seoUrl} />
      <main className="site-main work-page">
        <header className="work-page-header hub-page-header px-[var(--page-padding)]">
          <h1 className="hub-page-header__row mx-auto w-full min-w-0 max-w-[920px]">
            <span className="hub-page-header__name work-page-title--film-entertainment">Film</span>
            <span className="hub-page-header__sep" aria-hidden="true" />
            <span className="hub-page-header__lead">{filmPage.title}</span>
          </h1>
        </header>

        <div className="film-cases px-[var(--page-padding)]">
          {cases.map((item) => (
            <WorkCaseBlock
              key={item.id}
              item={
                item.filmCategory ? { ...item, category: item.filmCategory } : item
              }
              mediaSide="left"
            />
          ))}
        </div>

        <section className="work-page-cta px-[var(--page-padding)]" aria-label="Contact">
          <div className="mx-auto w-full min-w-0 max-w-[920px] text-center">
            <p className="work-page-cta-lead">{filmPage.contactLead}</p>
            <a
              href={contactHref()}
              className="gradient-button-emerald btn-on-accent mt-4 inline-flex rounded-full px-6 py-3 text-sm font-medium tracking-wide"
            >
              {filmPage.contactCtaLabel}
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
