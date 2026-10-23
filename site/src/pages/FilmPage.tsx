import { useEffect } from "react";
import FilmContactSection from "@/components/FilmContactSection";
import FilmReveal from "@/components/film/FilmReveal";
import FilmShowreel from "@/components/film/FilmShowreel";
import PageHeroReel from "@/components/film/PageHeroReel";
import { SEO } from "@/components/SEO";
import { goToContact, scrollToSection, site } from "@/data/site";
import { publicAsset } from "@/lib/publicAsset";

const page = site.filmPage;

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

        <section className="studio-section" aria-labelledby="originals-slate-heading">
          <FilmReveal>
            <div className="studio-section__grid">
              <div className="studio-section__aside">
                <h2 id="originals-slate-heading" className="studio-section-heading">
                  {page.slateHeading}
                </h2>
              </div>
            </div>
          </FilmReveal>

          <div className="originals-slate">
            {page.slate.map((item, index) => {
              const flip = index % 2 === 1;
              return (
                <article
                  key={item.id}
                  id={item.id}
                  className={`originals-slate__block${flip ? " originals-slate__block--flip" : ""}`}
                >
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
                        <h3 className="originals-slate__title">{item.title}</h3>
                        <p className="originals-slate__format">{item.format}</p>
                        <p className="originals-slate__logline">{item.logline}</p>
                        {"facts" in item && item.facts ? (
                          <p className="originals-slate__meta">
                            <span className="originals-slate__meta-label">Key facts</span>
                            {item.facts}
                          </p>
                        ) : null}
                        {"available" in item && item.available ? (
                          <p className="originals-slate__meta">
                            <span className="originals-slate__meta-label">What&apos;s available</span>
                            {item.available}
                          </p>
                        ) : null}
                        {"library" in item && item.library ? (
                          <p className="originals-slate__meta">
                            <span className="originals-slate__meta-label">Library</span>
                            {item.library}
                          </p>
                        ) : null}
                        {"distribution" in item && item.distribution ? (
                          <p className="originals-slate__meta">
                            <span className="originals-slate__meta-label">Distribution</span>
                            {item.distribution}
                          </p>
                        ) : null}
                        {"links" in item && item.links ? (
                          <ul className="originals-slate__links" aria-label="Links">
                            {item.links.map((link) => (
                              <li key={link.href}>
                                <a href={link.href} target="_blank" rel="noopener noreferrer">
                                  {link.label}
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
                </article>
              );
            })}
          </div>
        </section>

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
