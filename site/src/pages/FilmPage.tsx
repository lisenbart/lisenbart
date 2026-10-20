import FilmContactSection from "@/components/FilmContactSection";
import DistributionPartnersSection from "@/components/film/DistributionPartnersSection";
import { SEO } from "@/components/SEO";
import { site } from "@/data/site";
import { getWorkCasesByIds, type WorkCaseStudy } from "@/data/work";
import {
  originalsProjectHref,
  type OriginalsProjectSlug,
} from "@/lib/routes";

const page = site.filmPage;

/** Short type line only — full detail lives on the project page. */
const PROJECT_CARD: Record<
  OriginalsProjectSlug,
  { type: string; actionLabel: string }
> = {
  "unnecessary-things": { type: "Animated short", actionLabel: "View project" },
  "the-last-kozak": { type: "Animated feature", actionLabel: "View project" },
  pershosvit: { type: "Preschool IP", actionLabel: "View project" },
  "scoopy-cap": { type: "Preschool IP", actionLabel: "View project" },
};

type ProjectCard = {
  item: WorkCaseStudy;
  slug: OriginalsProjectSlug;
  href: string;
  type: string;
  actionLabel: string;
};

function buildCards(): ProjectCard[] {
  const slugs = Object.keys(PROJECT_CARD) as OriginalsProjectSlug[];
  const cases = getWorkCasesByIds(slugs);
  const byId = new Map(cases.map((item) => [item.id, item]));

  return slugs.flatMap((slug) => {
    const item = byId.get(slug);
    if (!item) return [];
    const meta = PROJECT_CARD[slug];
    return [
      {
        item,
        slug,
        href: originalsProjectHref(slug),
        type: meta.type,
        actionLabel: meta.actionLabel,
      },
    ];
  });
}

export default function FilmPage() {
  const cards = buildCards();

  return (
    <>
      <SEO
        title={page.seoTitle}
        description={page.seoDescription}
        url={`${site.canonical}/originals/`}
      />
      <section className="page-shell originals-page">
        <div className="page-title-row originals-title">
          <h1>Originals</h1>
        </div>

        <div className="originals-grid">
          {cards.map(({ item, href, type, actionLabel }) => {
            const media = item.mediaImage ?? "";

            return (
              <a
                key={item.id}
                className="original-card"
                href={href}
                aria-label={`${item.title} — ${actionLabel}`}
              >
                <span className="original-card__media">
                  <img src={media} alt="" />
                  <span className="original-card__overlay">
                    <span className="original-card__copy">
                      <span className="original-card__title">{item.title}</span>
                      <span className="original-card__status">{type}</span>
                      <span className="original-card__action">{actionLabel}</span>
                    </span>
                  </span>
                </span>
              </a>
            );
          })}
        </div>

        <DistributionPartnersSection />
      </section>
      <FilmContactSection heading={site.homeContact.heading} />
    </>
  );
}
