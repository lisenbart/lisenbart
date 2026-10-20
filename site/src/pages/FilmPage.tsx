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
              <article key={item.id} className="original-card">
                <a
                  className="original-card__media"
                  href={href}
                  aria-label={`${actionLabel}: ${item.title}`}
                >
                  <img src={media} alt={item.mediaImageAlt ?? ""} />
                </a>
                <div className="original-card__body">
                  <h2>
                    <a className="original-card__title-link" href={href}>
                      {item.title}
                    </a>
                  </h2>
                  <p className="original-card__status">{type}</p>
                  <a className="original-card__action" href={href}>
                    {actionLabel}
                  </a>
                </div>
              </article>
            );
          })}
        </div>

        <DistributionPartnersSection />
      </section>
      <FilmContactSection heading={site.homeContact.heading} />
    </>
  );
}
