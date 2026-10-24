import { useEffect } from "react";
import { Instagram, Youtube } from "lucide-react";
import FilmContactSection from "@/components/FilmContactSection";
import FilmReveal from "@/components/film/FilmReveal";
import FilmShowreel from "@/components/film/FilmShowreel";
import PageHeroReel from "@/components/film/PageHeroReel";
import { SEO } from "@/components/SEO";
import { useReel } from "@/contexts/ReelContext";
import { goToContact, scrollToSection, site } from "@/data/site";
import { publicAsset } from "@/lib/publicAsset";

const page = site.filmPage;

function TikTokIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15.2 6.34 6.34 0 0 0 9.49 21.5a6.34 6.34 0 0 0 6.34-6.34V8.6a8.2 8.2 0 0 0 4.76 1.52V6.69h-1Z" />
    </svg>
  );
}

function SocialIcon({ platform }: { platform: "youtube" | "instagram" | "tiktok" }) {
  if (platform === "youtube") return <Youtube size={18} strokeWidth={1.75} aria-hidden="true" />;
  if (platform === "instagram") return <Instagram size={18} strokeWidth={1.75} aria-hidden="true" />;
  return <TikTokIcon />;
}

function ProjectMedia({
  id,
  title,
  image,
  imageAlt,
  vimeoId,
}: {
  id: string;
  title: string;
  image: string;
  imageAlt: string;
  vimeoId?: string | null;
}) {
  if (vimeoId) {
    return (
      <FilmShowreel
        id={`${id}-teaser`}
        label={`${title} teaser`}
        poster={publicAsset(image)}
        vimeoId={vimeoId}
        playLabelHidden
        withSound
      />
    );
  }

  return (
    <div className="originals-row__still">
      <img
        src={publicAsset(image)}
        alt={imageAlt}
        width={1280}
        height={720}
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}

export default function FilmPage() {
  const { openReel } = useReel();

  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, "");
    if (!hash || hash === "contact") return;
    const timer = window.setTimeout(() => scrollToSection(hash), 80);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <>
      <SEO
        title={page.seoTitle}
        description={page.seoDescription}
        url={`${site.canonical}/originals/`}
      />
      <div className="originals-page page-with-hero-reel">
        <PageHeroReel
          titleId="originals-page-heading"
          media={
            <div className="page-hero-reel__still" aria-hidden="true">
              <img
                src={publicAsset(page.heroImage)}
                alt=""
                width={1600}
                height={900}
                decoding="async"
              />
            </div>
          }
        >
          <div className="page-title-row">
            <h1 id="originals-page-heading">{page.name}</h1>
          </div>
          <p className="studio-page-hero__lead">{page.heroLead}</p>
        </PageHeroReel>

        {page.projects.map((item, index) => {
          const primaryId =
            "anchorIds" in item && item.anchorIds ? item.anchorIds[0] : item.id;
          const extraAnchors =
            "anchorIds" in item && item.anchorIds ? item.anchorIds.slice(1) : [];
          const tint = index % 2 === 1;
          const fullFilmLabel =
            "fullFilmLabel" in item && item.fullFilmLabel ? item.fullFilmLabel : null;
          const fullFilmVimeoId =
            "fullFilmVimeoId" in item && item.fullFilmVimeoId ? item.fullFilmVimeoId : null;
          const festivalLabel =
            "festivalLabel" in item && item.festivalLabel ? item.festivalLabel : null;
          const festivalHref =
            "festivalHref" in item && item.festivalHref ? item.festivalHref : null;

          return (
            <section
              key={item.id}
              id={primaryId}
              className={`studio-section originals-row${tint ? " studio-section--tint" : ""}`}
              aria-labelledby={`${item.id}-title`}
            >
              {extraAnchors.map((anchorId) => (
                <span
                  key={anchorId}
                  id={anchorId}
                  className="originals-slate__anchor"
                  aria-hidden="true"
                />
              ))}
              <FilmReveal className="originals-row__reveal">
                <div className="originals-row__grid">
                  <div className="originals-row__media">
                    <ProjectMedia
                      id={item.id}
                      title={item.title}
                      image={item.image}
                      imageAlt={item.imageAlt}
                      vimeoId={item.vimeoId}
                    />
                  </div>
                  <div
                    className={`originals-row__copy${
                      "appCard" in item && item.appCard ? " originals-row__copy--split" : ""
                    }`}
                  >
                    <div className="originals-row__body">
                      <div className="originals-row__main">
                        <p className="originals-slate__accent originals-slate__accent--row">
                          {item.accent}
                        </p>
                        <h2 id={`${item.id}-title`} className="originals-slate__title">
                          {item.title}
                        </h2>
                        <p className="originals-slate__format">{item.format}</p>
                        <p className="originals-slate__logline">{item.logline}</p>
                        {"secondary" in item && item.secondary ? (
                          <p className="originals-slate__secondary">{item.secondary}</p>
                        ) : null}
                        {"socialLinks" in item && item.socialLinks ? (
                          <ul className="originals-slate__social" aria-label="Social links">
                            {item.socialLinks.map((link) => (
                              <li key={link.href}>
                                <a
                                  href={link.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  aria-label={link.label}
                                  title={link.label}
                                >
                                  <SocialIcon platform={link.platform} />
                                </a>
                              </li>
                            ))}
                          </ul>
                        ) : null}
                      </div>
                      {"appCard" in item && item.appCard ? (
                        <aside className="originals-app-card" aria-label="Scoopy Log app">
                          <img
                            className="originals-app-card__icon"
                            src={publicAsset(item.appCard.icon)}
                            alt=""
                            width={56}
                            height={56}
                            loading="lazy"
                            decoding="async"
                          />
                          <div className="originals-app-card__copy">
                            <p className="originals-app-card__title">{item.appCard.title}</p>
                            <p className="originals-app-card__text">{item.appCard.text}</p>
                            <a
                              className="originals-app-card__store"
                              href={item.appCard.storeHref}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <img
                                src={publicAsset(item.appCard.storeBadge)}
                                alt={item.appCard.storeBadgeAlt}
                                width={120}
                                height={40}
                                loading="lazy"
                                decoding="async"
                              />
                            </a>
                          </div>
                        </aside>
                      ) : null}
                    </div>
                    <div className="originals-row__actions">
                      {festivalHref && festivalLabel ? (
                        <a className="originals-row__text-link" href={festivalHref}>
                          {festivalLabel}
                        </a>
                      ) : null}
                      {fullFilmLabel && fullFilmVimeoId ? (
                        <button
                          type="button"
                          className="send-button"
                          onClick={() => openReel(fullFilmVimeoId, item.title)}
                        >
                          {fullFilmLabel}
                        </button>
                      ) : null}
                      {item.ctaKind === "contact" && item.ctaLabel ? (
                        <button
                          type="button"
                          className="send-button originals-slate__cta"
                          onClick={() => goToContact()}
                        >
                          {item.ctaLabel}
                        </button>
                      ) : null}
                    </div>
                  </div>
                </div>
              </FilmReveal>
            </section>
          );
        })}

        <section className="studio-section" aria-labelledby="originals-partner-heading">
          <FilmReveal>
            <div className="studio-section__grid">
              <div className="studio-section__aside">
                <h2 id="originals-partner-heading" className="studio-section-heading">
                  {page.partnerHeading}
                </h2>
              </div>
            </div>
          </FilmReveal>
          <ul
            className="studio-how-steps studio-how-steps--3 studio-section__full"
            aria-label="How we partner"
          >
            {page.partners.map((item) => (
              <li key={item.title} className="studio-how-steps__item">
                <h3 className="studio-models__title">{item.title}</h3>
                <p className="studio-models__text">{item.text}</p>
              </li>
            ))}
          </ul>
        </section>

        <FilmReveal>
          <FilmContactSection
            heading={site.homeContact.heading}
            defaultProjectType={page.defaultProjectType}
          />
        </FilmReveal>
      </div>
    </>
  );
}
