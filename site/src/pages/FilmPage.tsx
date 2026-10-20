import FilmContactSection from "@/components/FilmContactSection";
import DistributionPartnersSection from "@/components/film/DistributionPartnersSection";
import ScoopyCapPlatforms from "@/components/film/ScoopyCapPlatforms";
import { SEO } from "@/components/SEO";
import { site } from "@/data/site";
import { getWorkCasesByIds, type WorkCaseStudy } from "@/data/work";
import {
  originalsProjectHref,
  type OriginalsProjectSlug,
} from "@/lib/routes";

const page = site.filmPage;

const PROJECT_ACTION: Record<OriginalsProjectSlug, string> = {
  "unnecessary-things": "View project",
  "the-last-kozak": "View project",
  pershosvit: "View project",
  "scoopy-cap": "View project",
};

type ProjectCard = {
  item: WorkCaseStudy;
  slug: OriginalsProjectSlug;
  href: string;
  actionLabel: string;
};

function buildCards(): ProjectCard[] {
  const slugs = Object.keys(PROJECT_ACTION) as OriginalsProjectSlug[];
  const cases = getWorkCasesByIds(slugs);
  const byId = new Map(cases.map((item) => [item.id, item]));

  return slugs.flatMap((slug) => {
    const item = byId.get(slug);
    if (!item) return [];
    return [
      {
        item,
        slug,
        href: originalsProjectHref(slug),
        actionLabel: PROJECT_ACTION[slug],
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
          {cards.map(({ item, slug, href, actionLabel }) => {
            const status =
              item.result ||
              item.filmCategory ||
              (slug === "the-last-kozak" ? "Animated feature in development" : "");
            const media = item.mediaImage ?? "";
            const scoopyExtras =
              slug === "scoopy-cap" ? <ScoopyCapPlatforms /> : null;

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
                  {status ? <p className="original-card__status">{status}</p> : null}
                  <p className="original-card__text">{item.description}</p>
                  {scoopyExtras}
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
