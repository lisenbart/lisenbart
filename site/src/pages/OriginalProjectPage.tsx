import FilmContactSection from "@/components/FilmContactSection";
import ScoopyCapPlatforms from "@/components/film/ScoopyCapPlatforms";
import OriginalIpPhones from "@/components/originals/OriginalIpPhones";
import {
  CreditsDisclosure,
  FilmMediaStage,
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

function FilmShortLayout({ project }: { project: ProjectData }) {
  const item = project.case;
  const festivals = (item.selectionLinks ?? []).slice(0, 3);
  const imdbHref = item.imdbId ? `https://www.imdb.com/title/${item.imdbId}/` : null;

  return (
    <div className="project-page__layout project-page__layout--film-short">
      {item.vimeoId && item.mediaImage ? (
        <div className="project-page__hero-media">
          <FilmMediaStage
            title={item.title}
            posterSrc={item.mediaImage}
            posterAlt={item.mediaImageAlt ?? item.title}
            vimeoId={item.vimeoId}
            priority
          />
        </div>
      ) : null}

      <div className="project-page__intro">
        <p className="project-page__format">{project.format}</p>
        <h1>{item.title}</h1>
        {item.result ? <p className="project-page__recognition">{item.result}</p> : null}
      </div>

      <div className="project-page__copy">
        <p className="project-page__synopsis">{project.synopsis}</p>
        {project.body?.map((paragraph) => (
          <p key={paragraph} className="project-page__body">
            {paragraph}
          </p>
        ))}

        {(festivals.length > 0 || item.winnerLink) && (
          <div className="project-page__festivals">
            <h2 className="project-page__section-label">Festival recognition</h2>
            {festivals.length > 0 ? (
              <ul className="project-page__festival-list">
                {festivals.map((fest) => (
                  <li key={fest.href}>
                    <a href={fest.href} target="_blank" rel="noopener noreferrer">
                      {fest.label}
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
            {item.winnerLink ? (
              <p className="project-page__winner">
                <a href={item.winnerLink.href} target="_blank" rel="noopener noreferrer">
                  {item.winnerLink.label}
                </a>
              </p>
            ) : null}
          </div>
        )}

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

        {item.credits ? <CreditsDisclosure credits={item.credits} /> : null}

        <ProjectCta project={project} />
      </div>
    </div>
  );
}

function FeatureDevLayout({ project }: { project: ProjectData }) {
  const item = project.case;

  return (
    <div className="project-page__layout project-page__layout--feature-dev">
      <div className="project-page__dev-grid">
        {item.vimeoId && item.mediaImage ? (
          <div className="project-page__hero-media">
            <FilmMediaStage
              title={item.title}
              posterSrc={item.mediaImage}
              posterAlt={item.mediaImageAlt ?? item.title}
              vimeoId={item.vimeoId}
              priority
            />
          </div>
        ) : null}

        <div className="project-page__copy">
          <div className="project-page__intro">
            <p className="project-page__format">{project.format}</p>
            {project.status ? <p className="project-page__status">{project.status}</p> : null}
            <h1>{item.title}</h1>
          </div>

          <p className="project-page__synopsis">{project.synopsis}</p>
          {project.body?.map((paragraph) => (
            <p key={paragraph} className="project-page__body">
              {paragraph}
            </p>
          ))}

          {project.developmentNotes && project.developmentNotes.length > 0 ? (
            <ul className="project-page__dev-list">
              {project.developmentNotes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          ) : null}

          <ProjectCta project={project} />
        </div>
      </div>
    </div>
  );
}

function PreschoolLayout({
  project,
  showPlatforms = false,
}: {
  project: ProjectData;
  showPlatforms?: boolean;
}) {
  const item = project.case;

  return (
    <div className="project-page__layout project-page__layout--preschool">
      <section className="originals-case originals-case--ip project-page__ip-case">
        <OriginalIpPhones item={item} />

        <div className="originals-case__copy">
          <div className="originals-case__intro originals-ip-intro">
            {item.mediaImage ? (
              <img
                className="originals-ip-avatar"
                src={publicAsset(item.mediaImage)}
                alt=""
                width={72}
                height={72}
                loading="eager"
                decoding="async"
              />
            ) : null}
            <div className="originals-ip-intro__text">
              <p className="project-page__format">{project.format}</p>
              <h1 className="originals-case__title">{item.title}</h1>
            </div>
          </div>

          <div className="originals-case__body">
            <p className="project-page__synopsis">{project.synopsis}</p>
            {project.body?.map((paragraph) => (
              <p key={paragraph} className="project-page__body">
                {paragraph}
              </p>
            ))}

            {project.characterNote ? (
              <p className="project-page__character">
                <span className="project-page__section-label">Lead character</span>
                {project.characterNote}
              </p>
            ) : null}

            {project.highlights && project.highlights.length > 0 ? (
              <div className="project-page__highlights">
                <h2 className="project-page__section-label">In the library</h2>
                <ul>
                  {project.highlights.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </div>
            ) : null}

            {showPlatforms ? (
              <div className="project-page__platforms">
                <ScoopyCapPlatforms heading="Distribution & Platforms" compactNote />
              </div>
            ) : null}

            <ProjectCta project={project} />
          </div>
        </div>
      </section>
    </div>
  );
}

function ProjectBody({ project }: { project: ProjectData }) {
  switch (project.layout) {
    case "film-short":
      return <FilmShortLayout project={project} />;
    case "feature-dev":
      return <FeatureDevLayout project={project} />;
    case "preschool-ua":
      return <PreschoolLayout project={project} />;
    case "preschool-en":
      return <PreschoolLayout project={project} showPlatforms />;
    default:
      return null;
  }
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

  return (
    <>
      <SEO
        title={project.seoTitle}
        description={project.seoDescription}
        url={`${site.canonical}${canonicalPath}`}
        image={ogImage}
      />
      <section className={`page-shell project-page project-page--${project.layout}`}>
        <ProjectNav title={project.case.title} />
        <ProjectBody project={project} />
      </section>
      <FilmContactSection heading={site.homeContact.heading} />
    </>
  );
}
