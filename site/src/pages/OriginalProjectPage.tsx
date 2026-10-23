import FilmContactSection from "@/components/FilmContactSection";
import FilmReveal from "@/components/film/FilmReveal";
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

  return (
    <div className="project-page__layout project-page__layout--film-short">
      <FestivalFeaturedStrip />

      <div className="project-page__copy">
        <p className="project-page__synopsis">{project.synopsis}</p>
        {project.body?.map((paragraph) => (
          <p key={paragraph} className="project-page__body">
            {paragraph}
          </p>
        ))}

        {item.quote ? (
          <blockquote className="project-page__quote">
            <p>“{item.quote.text}”</p>
            {item.quote.href ? (
              <cite>
                <a href={item.quote.href} target="_blank" rel="noopener noreferrer">
                  {item.quote.attribution}
                </a>
              </cite>
            ) : (
              <cite>{item.quote.attribution}</cite>
            )}
          </blockquote>
        ) : null}

        {imdbHref ? (
          <p className="project-page__ext-link">
            <a href={imdbHref} target="_blank" rel="noopener noreferrer">
              View on IMDb
            </a>
          </p>
        ) : null}

        {item.stills && item.stills.length > 0 ? (
          <div className="project-page__stills">
            <h2 className="project-page__section-label">Stills</h2>
            <OriginalsStillGallery stills={item.stills} projectTitle={item.title} />
          </div>
        ) : null}

        <FestivalRecognitionSection />

        {item.credits ? <CreditsDisclosure credits={item.credits} /> : null}

        <ProjectCta project={project} />
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
            reel={{
              id: `${item.id}-reel`,
              label: item.title,
              poster: publicAsset(item.mediaImage!),
              vimeoId: item.vimeoId,
            }}
          >
            <ProjectNav title={item.title} />
            <FilmProjectIntro project={project} />
          </PageHeroReel>
          <section
            className={`page-shell project-page project-page--${project.layout} page-shell--from-reel`}
          >
            <FilmReveal delayMs={100}>
              <ProjectBody project={project} />
            </FilmReveal>
          </section>
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
