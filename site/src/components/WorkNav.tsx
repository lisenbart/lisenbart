import { workCategories } from "@/data/work";
import type { WorkCategorySlug } from "@/data/work";
import { routes, workCategoryHref } from "@/lib/routes";

interface WorkNavProps {
  active: WorkCategorySlug;
}

const shortNavLabels: Record<WorkCategorySlug, string> = {
  commercial: "Commercial",
  gaming: "Gaming",
  film: "Film",
  social: "Social Media",
};

export default function WorkNav({ active }: WorkNavProps) {
  return (
    <>
      <nav className="work-nav" aria-label="Work navigation">
        <div className="work-nav-bar px-[var(--page-padding)]">
          <div className="work-nav-inner mx-auto w-full min-w-0 max-w-[920px]">
            <div className="work-nav-group scrollbar-hide">
              <a href={routes.home} className="work-nav-home">
                ← Site
              </a>

              <div className="work-nav-tabs" role="list">
                {workCategories.map((category) => (
                  <a
                    key={category.slug}
                    href={workCategoryHref(category.slug)}
                    className={`work-nav-tab work-nav-tab--${category.slug}${active === category.slug ? " is-active" : ""}`}
                    aria-current={active === category.slug ? "page" : undefined}
                  >
                    {shortNavLabels[category.slug]}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className="work-nav-spacer" aria-hidden="true" />
    </>
  );
}
