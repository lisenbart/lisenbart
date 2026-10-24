import FilmContactSection from "@/components/FilmContactSection";
import FilmReveal from "@/components/film/FilmReveal";
import FilmShowreel from "@/components/film/FilmShowreel";
import PageHeroReel from "@/components/film/PageHeroReel";
import {
  FestivalFeaturedStrip,
  FestivalRecognitionSection,
} from "@/components/originals/FestivalRecognition";
import {
  CreditsDisclosure,
  OriginalsStillGallery,
} from "@/components/originals/OriginalsMedia";
import { SEO } from "@/components/SEO";
import {
  getOriginalsProject,
  type OriginalsProjectPage as ProjectData,
} from "@/data/originalsProjects";
import { goToContactWithPrefill, site } from "@/data/site";
import { publicAsset } from "@/lib/publicAsset";
import {
  hubCanonicalHref,
  originalsProjectHref,
  parseOriginalsProject,
  type OriginalsProjectSlug,
} from "@/lib/routes";

const HIGHLIGHT_LINE =
  "Golden Goblet Award Competition, Shanghai IFF · Official Selection, Huesca (Oscar-qualifying)";

function ProjectNav({ title }: { title: string }) {
  return (
    <div className="project-page__nav">
      <a className="project-page__back" href={hubCanonicalHref("originals")}>
        ← Originals
      </a>
      <span className="project-page__crumb" aria-hidden="true">
        /
      </span>
      <span className="project-page__crumb-title">{title}</span>
    </div>
  );
}

function ProjectCta({ project }: { project: ProjectData }) {
  return (
    <div className="project-page__cta-row">
      <button
        type="button"
        className="project-page__cta"
        onClick={() =>
          goToContactWithPrefill({
            projectType: project.cta.projectType,
            message: project.cta.message,
          })
        }
      >
        {project.cta.label}
      </button>
    </div>
  );
}

function FilmShortBody({ project }: { project: ProjectData }) {
  const item = project.case;
  const imdbHref = item.imdbId ? `https://www.imdb.com/title/${item.imdbId}/` : null;
  const stills = item.stills ?? [];

  return (
    <div className="project-page__layout project-page__layout--film-short">
      {stills.length > 0 ? (
        <section className="project-stills-bleed" aria-label={`${item.title} stills`}>
          <OriginalsStillGallery stills={stills} projectTitle={item.title} />
        </section>
      ) : null}

      <section className="project-press" aria-label="Press">
        <div className="project-press__aside">
          {item.sweetTv ? (
            <a
              className="project-press__sweet"
              href={item.sweetTv.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.sweetTv.label ?? "Watch on SWEET.TV"}
            >
              <img
                className="project-press__sweet-poster"
                src={publicAsset(item.sweetTv.poster)}
                alt=""
                width={268}
                height={402}
                loading="lazy"
                decoding="async"
              />
              <span className="project-press__sweet-label">
                {item.sweetTv.label ?? "SWEET.TV"}
              </span>
            </a>
          ) : null}

          {imdbHref ? (
            <a
              className="project-press__imdb"
              href={imdbHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={
                item.imdbRating
                  ? `IMDb rating ${item.imdbRating} out of 10`
                  : "View on IMDb"
              }
            >
              <span className="project-press__imdb-mark" aria-hidden="true">
                IMDb
              </span>
              {item.imdbRating ? (
                <span className="project-press__imdb-score">
                  <span className="project-press__imdb-value">{item.imdbRating}</span>
                  <span className="project-press__imdb-scale">/10</span>
                </span>
              ) : (
                <span className="project-press__imdb-link-label">View on IMDb</span>
              )}
            </a>
          ) : null}
        </div>

        {item.quote ? (
          <blockquote className="project-press__quote">
            <span className="project-press__quotemark" aria-hidden="true">
              “
            </span>
            <div className="project-press__quote-body">
              <p className="project-press__quote-text">{item.quote.text}</p>
              {item.quote.href ? (
                <cite>
                  <a href={item.quote.href} target="_blank" rel="noopener noreferrer">
                    {item.quote.attribution}
                  </a>
                </cite>
              ) : (
                <cite>{item.quote.attribution}</cite>
              )}
            </div>
          </blockquote>
        ) : null}
      </section>

      <div className="festival-featured-bleed">
        <FestivalFeaturedStrip />
      </div>

      <div className="page-shell project-page project-page--film-short page-shell--from-reel project-page__rest">
        <p className="project-page__highlight">{HIGHLIGHT_LINE}</p>

        <div className="project-page__copy">
          <FestivalRecognitionSection />
          {item.credits ? <CreditsDisclosure credits={item.credits} /> : null}
          <ProjectCta project={project} />
        </div>
      </div>
    </div>
  );
}

function ProjectBody({ project }: { project: ProjectData }) {
  return <FilmShortBody project={project} />;
}

function FilmProjectIntro({ project }: { project: ProjectData }) {
  const item = project.case;
  return (
    <div className="project-page__intro">
      <p className="project-page__format">{project.format}</p>
      {project.status ? <p className="project-page__status">{project.status}</p> : null}
      <h1 id={`${item.id}-heading`}>{item.title}</h1>
    </div>
  );
}

export default function OriginalProjectPage({ slug }: { slug?: OriginalsProjectSlug }) {
  const resolved = slug ?? parseOriginalsProject();
  const project = resolved ? getOriginalsProject(resolved) : null;

  if (!project) {
    return (
      <section className="page-shell project-page">
        <ProjectNav title="Not found" />
        <h1>Project not found</h1>
        <p>
          <a href={hubCanonicalHref("originals")}>Back to Originals</a>
        </p>
      </section>
    );
  }

  const canonicalPath = originalsProjectHref(project.slug);
  const ogImage = project.case.mediaImage
    ? publicAsset(project.case.mediaImage.split("?")[0]!)
    : undefined;
  const item = project.case;
  const hasFullBleedReel = Boolean(item.vimeoId && item.mediaImage);

  return (
    <>
      <SEO
        title={project.seoTitle}
        description={project.seoDescription}
        url={`${site.canonical}${canonicalPath}`}
        image={ogImage}
      />

      {hasFullBleedReel ? (
        <div className={`project-page project-page--${project.layout} page-with-hero-reel`}>
          <PageHeroReel
            title={item.title}
            titleId={`${item.id}-heading`}
            media={
              <FilmShowreel
                id={`${item.id}-reel`}
                label={item.title}
                poster={publicAsset(item.mediaImage!)}
                vimeoId={item.vimeoId}
                playLabel="Watch full film"
                withSound
                forceModal
              />
            }
          >
            <ProjectNav title={item.title} />
            <FilmProjectIntro project={project} />
          </PageHeroReel>
          <FilmReveal delayMs={100}>
            <ProjectBody project={project} />
          </FilmReveal>
        </div>
      ) : (
        <section className={`page-shell project-page project-page--${project.layout}`}>
          <FilmReveal>
            <ProjectNav title={item.title} />
            <ProjectBody project={project} />
          </FilmReveal>
        </section>
      )}

      <FilmReveal>
        <FilmContactSection heading={site.homeContact.heading} />
      </FilmReveal>
    </>
  );
}
