import FilmContactSection from "@/components/FilmContactSection";
import { SEO } from "@/components/SEO";
import { PlayIcon } from "@/components/film/FilmIcons";
import { useReel } from "@/contexts/ReelContext";
import { site } from "@/data/site";
import { getWorkCasesByIds, type WorkCaseStudy } from "@/data/work";

const page = site.filmPage;

type ProjectCard = {
  item: WorkCaseStudy;
  featured?: boolean;
  actionLabel: string;
};

function buildCards(): ProjectCard[] {
  const [unnecessary, kozak, pershosvit, scoopy] = getWorkCasesByIds([
    "unnecessary-things",
    "the-last-kozak",
    "pershosvit",
    "scoopy-cap",
  ]);

  return [
    {
      item: unnecessary,
      featured: true,
      actionLabel: "Watch film",
    },
    {
      item: kozak,
      actionLabel: "Watch teaser",
    },
    {
      item: pershosvit,
      actionLabel: "Explore on YouTube",
    },
    {
      item: scoopy,
      actionLabel: "Explore on YouTube",
    },
  ].filter((card): card is ProjectCard => Boolean(card.item));
}

export default function FilmPage() {
  const { openReel } = useReel();
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
          <p>
            Our stories.
            <br />
            New worlds.
          </p>
        </div>
        <p className="film-contact__lead direction-lead">{page.title}</p>

        <div className="originals-grid">
          {cards.map(({ item, featured, actionLabel }) => {
            const status =
              item.result ||
              item.filmCategory ||
              (item.id === "the-last-kozak" ? "Animated feature in development" : "");
            const media = item.mediaImage ?? "";

            if (item.vimeoId) {
              return (
                <article
                  key={item.id}
                  className={`original-card${featured ? " original-card--featured" : ""}`}
                >
                  <button
                    type="button"
                    className="original-card__media"
                    onClick={() => openReel(item.vimeoId ?? null, item.title)}
                    aria-label={`${actionLabel}: ${item.title}`}
                  >
                    <img src={media} alt={item.mediaImageAlt ?? ""} />
                    <span className="original-card__play">
                      <PlayIcon />
                    </span>
                  </button>
                  <div className="original-card__body">
                    <h2>{item.title}</h2>
                    {status ? <p className="original-card__status">{status}</p> : null}
                    <p className="original-card__text">{item.description}</p>
                    <button
                      type="button"
                      className="original-card__action"
                      onClick={() => openReel(item.vimeoId ?? null, item.title)}
                    >
                      {actionLabel}
                    </button>
                  </div>
                </article>
              );
            }

            return (
              <article key={item.id} className="original-card">
                <a
                  className="original-card__media"
                  href={item.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${actionLabel}: ${item.title}`}
                >
                  <img src={media} alt={item.mediaImageAlt ?? ""} />
                </a>
                <div className="original-card__body">
                  <h2>{item.title}</h2>
                  {status ? <p className="original-card__status">{status}</p> : null}
                  <p className="original-card__text">{item.description}</p>
                  <a
                    className="original-card__action"
                    href={item.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {actionLabel}
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </section>
      <FilmContactSection heading={page.contactHeading} lead={page.contactLead} />
    </>
  );
}
