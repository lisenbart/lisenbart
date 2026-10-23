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
const featured = page.featured;

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
                src={publicAsset(featured.image)}
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

        <section
          id={featured.id}
          className="studio-section originals-featured"
          aria-labelledby="originals-featured-title"
        >
          <FilmReveal>
            <div className="originals-featured__grid">
              <div className="originals-featured__primary">
                <h2 id="originals-featured-title" className="originals-slate__title">
                  {featured.title}
                </h2>
                <p className="originals-slate__format">{featured.format}</p>
                <button
                  type="button"
                  className="send-button originals-featured__watch"
                  onClick={() => openReel(featured.fullFilmVimeoId, featured.title)}
                >
                  {featured.fullFilmLabel}
                </button>
              </div>
              <div className="originals-featured__copy">
                <p className="originals-slate__accent">{featured.accent}</p>
                <p className="originals-slate__logline">{featured.logline}</p>
                <p className="originals-slate__secondary">{featured.credit}</p>
                <a className="originals-featured__festival-link" href={featured.festivalHref}>
                  {featured.festivalLabel}
                </a>
              </div>
            </div>
          </FilmReveal>
        </section>

        {page.projects.map((item, index) => {
          const primaryId =
            "anchorIds" in item && item.anchorIds ? item.anchorIds[0] : item.id;
          const extraAnchors =
            "anchorIds" in item && item.anchorIds ? item.anchorIds.slice(1) : [];
          const tint = index % 2 === 1;

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
              <FilmReveal>
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
                  <div className="originals-row__copy">
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
                    {item.ctaKind === "contact" ? (
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
