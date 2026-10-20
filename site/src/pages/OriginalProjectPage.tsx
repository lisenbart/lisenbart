import type { ReactNode } from "react";
import FilmContactSection from "@/components/FilmContactSection";
import ScoopyCapPlatforms from "@/components/film/ScoopyCapPlatforms";
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
import { Instagram, Youtube } from "lucide-react";

function TikTokGlyph({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15.3a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.73a8.18 8.18 0 0 0 4.76 1.52V6.84a4.84 4.84 0 0 1-1-.15Z" />
    </svg>
  );
}

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

function ChannelLinks({ project }: { project: ProjectData }) {
  const { case: item } = project;
  const links: Array<{ key: string; href: string; label: string; icon: ReactNode }> = [];

  if (item.youtubeUrl) {
    links.push({
      key: "youtube",
      href: item.youtubeUrl,
      label: "YouTube",
      icon: <Youtube size={16} strokeWidth={2.25} aria-hidden="true" />,
    });
  }
  if (item.tiktokUrl) {
    links.push({
      key: "tiktok",
      href: item.tiktokUrl,
      label: "TikTok",
      icon: <TikTokGlyph size={15} />,
    });
  }
  if (item.instagramUrl) {
    links.push({
      key: "instagram",
      href: item.instagramUrl,
      label: "Instagram",
      icon: <Instagram size={15} strokeWidth={2.25} aria-hidden="true" />,
    });
  }

  if (links.length === 0) return null;

  return (
    <ul className="project-page__channels">
      {links.map((link) => (
        <li key={link.key}>
          <a href={link.href} target="_blank" rel="noopener noreferrer">
            {link.icon}
            <span>{link.label}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

function PlatformPreviews({ project }: { project: ProjectData }) {
  const { case: item } = project;
  const previews = item.platformPreviews;
  const phones: Array<{ key: string; href: string; image: string; label: string }> = [];

  if (item.youtubeUrl) {
    phones.push({
      key: "youtube",
      href: item.youtubeUrl,
      image: publicAsset(previews?.youtube ?? item.mediaImage ?? ""),
      label: "YouTube",
    });
  }
  if (item.tiktokUrl) {
    phones.push({
      key: "tiktok",
      href: item.tiktokUrl,
      image: publicAsset(previews?.tiktok ?? item.mediaImage ?? ""),
      label: "TikTok",
    });
  }
  if (item.instagramUrl) {
    phones.push({
      key: "instagram",
      href: item.instagramUrl,
      image: publicAsset(previews?.instagram ?? item.mediaImage ?? ""),
      label: "Instagram",
    });
  }

  if (phones.length === 0) return null;

  return (
    <div className="project-page__phones">
      {phones.map((phone) => (
        <a
          key={phone.key}
          className={`project-page__phone project-page__phone--${phone.key}`}
          href={phone.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.case.title} on ${phone.label}`}
        >
          <img
            src={phone.image}
            alt=""
            width={390}
            height={844}
            loading="lazy"
            decoding="async"
          />
        </a>
      ))}
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
  mediaFirst = true,
}: {
  project: ProjectData;
  showPlatforms?: boolean;
  mediaFirst?: boolean;
}) {
  const item = project.case;

  const media = (
    <div className="project-page__ip-media">
      {item.mediaImage ? (
        <div className="project-page__ip-hero">
          <img
            src={publicAsset(item.mediaImage)}
            alt={item.mediaImageAlt ?? item.title}
            width={1280}
            height={720}
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
        </div>
      ) : null}
      <PlatformPreviews project={project} />
    </div>
  );

  const copy = (
    <div className="project-page__copy">
      <div className="project-page__intro">
        <p className="project-page__format">{project.format}</p>
        <h1>{item.title}</h1>
      </div>

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

      <ChannelLinks project={project} />

      {showPlatforms ? (
        <div className="project-page__platforms">
          <ScoopyCapPlatforms heading="Distribution & Platforms" compactNote />
        </div>
      ) : null}

      <ProjectCta project={project} />
    </div>
  );

  return (
    <div
      className={`project-page__layout project-page__layout--preschool ${
        mediaFirst ? "project-page__layout--media-first" : "project-page__layout--copy-first"
      }`}
    >
      {mediaFirst ? (
        <>
          {media}
          {copy}
        </>
      ) : (
        <>
          {copy}
          {media}
        </>
      )}
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
      return <PreschoolLayout project={project} mediaFirst />;
    case "preschool-en":
      return <PreschoolLayout project={project} showPlatforms mediaFirst={false} />;
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
