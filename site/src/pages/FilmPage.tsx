import { useEffect } from "react";
import { Instagram, Youtube } from "lucide-react";
import FilmContactSection from "@/components/FilmContactSection";
import FilmReveal from "@/components/film/FilmReveal";
import FilmShowreel from "@/components/film/FilmShowreel";
import PageHeroReel from "@/components/film/PageHeroReel";
import { SEO } from "@/components/SEO";
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

export default function FilmPage() {
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
          <p className="studio-page-hero__support">{page.heroSupport}</p>
        </PageHeroReel>

        {page.slate.map((item, index) => {
          const flip = index % 2 === 1;
          const tint = index % 2 === 1;
          const primaryId =
            "anchorIds" in item && item.anchorIds ? item.anchorIds[0] : item.id;
          const extraAnchors =
            "anchorIds" in item && item.anchorIds
              ? item.anchorIds.slice(1)
              : [];

          return (
            <section
              key={item.id}
              id={primaryId}
              className={`studio-section originals-slate-section${tint ? " studio-section--tint" : ""}${flip ? " originals-slate-section--flip" : ""}`}
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
                <div className="originals-slate__grid">
                  <div className="originals-slate__media">
                    {"vimeoId" in item && item.vimeoId ? (
                      <FilmShowreel
                        id={`${item.id}-teaser`}
                        label={`${item.title} teaser`}
                        poster={item.image}
                        vimeoId={item.vimeoId}
                      />
                    ) : (
                      <img
                        src={publicAsset(item.image)}
                        alt={item.imageAlt}
                        width={1280}
                        height={720}
                        loading="lazy"
                        decoding="async"
                      />
                    )}
                  </div>
                  <div className="originals-slate__copy">
                    <p className="originals-slate__accent">{item.accent}</p>
                    <h2 id={`${item.id}-title`} className="originals-slate__title">
                      {item.title}
                    </h2>
                    <p className="originals-slate__format">{item.format}</p>
                    <p className="originals-slate__logline">{item.logline}</p>
                    {"secondary" in item && item.secondary ? (
                      <p className="originals-slate__secondary">{item.secondary}</p>
                    ) : null}
                    {"secondaryBeforeLink" in item && item.secondaryBeforeLink && item.secondaryLink ? (
                      <p className="originals-slate__secondary">
                        {item.secondaryBeforeLink}
                        <a
                          href={item.secondaryLink.href}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {item.secondaryLink.label}
                        </a>
                      </p>
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
                    {item.ctaKind === "link" && "ctaHref" in item && item.ctaHref ? (
                      <a className="send-button originals-slate__cta" href={item.ctaHref}>
                        {item.ctaLabel}
                      </a>
                    ) : (
                      <button
                        type="button"
                        className="send-button originals-slate__cta"
                        onClick={() => goToContact()}
                      >
                        {item.ctaLabel}
                      </button>
                    )}
                  </div>
                </div>
              </FilmReveal>
            </section>
          );
        })}

        <section
          className="studio-section studio-section--tint"
          aria-labelledby="originals-partner-heading"
        >
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
