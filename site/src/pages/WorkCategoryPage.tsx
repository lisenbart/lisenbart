import { workCategoryTitleClass, type WorkCategory } from "@/data/work";
import WorkCaseBlock from "@/components/WorkCaseBlock";
import { SEO } from "@/components/SEO";
import { sectionIds, site } from "@/data/site";
import { routes, workCategoryHref } from "@/lib/routes";

interface WorkCategoryPageProps {
  category: WorkCategory;
}

export default function WorkCategoryPage({ category }: WorkCategoryPageProps) {
  const seoUrl = `${site.canonical}${workCategoryHref(category.slug)}`;

  return (
    <>
      <SEO
        title={`${category.pageTitle} — LISENBART`}
        description={category.subtitle}
        url={seoUrl}
      />
      <main className="site-main work-page">
        <header className="work-page-header px-[var(--page-padding)]">
          <div className="mx-auto w-full min-w-0 max-w-[920px] text-center">
            <h1 className={`work-page-title ${workCategoryTitleClass[category.slug]}`}>
              {category.pageTitle}
            </h1>
            <p className="work-page-subtitle mx-auto mt-3 max-w-2xl">{category.subtitle}</p>
          </div>
        </header>

        <div className="work-blocks">
          {category.cases.map((item, index) => (
            <WorkCaseBlock
              key={item.id}
              item={item}
              mediaSide={index % 2 === 0 ? "left" : "right"}
              bordered={index > 0}
            />
          ))}
        </div>

        <section className="work-page-cta px-[var(--page-padding)]" aria-label="Contact">
          <div className="mx-auto w-full min-w-0 max-w-[920px] text-center">
            <p className="work-page-cta-lead">Interested in similar work?</p>
            <a
              href={`${routes.home}#${sectionIds.contact}`}
              className="gradient-button-emerald btn-on-accent mt-4 inline-flex rounded-full px-6 py-3 text-sm font-medium tracking-wide"
            >
              {site.ctaLabel}
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
