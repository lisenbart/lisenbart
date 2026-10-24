import { useEffect } from "react";
import FilmContactSection from "@/components/FilmContactSection";
import FilmReveal from "@/components/film/FilmReveal";
import StudioModelItem from "@/components/film/StudioModelItem";
import PersonalHeroSection from "@/components/PersonalHeroSection";
import { SEO } from "@/components/SEO";
import { scrollToSection, sectionIds, site } from "@/data/site";
import { hubCanonicalHref } from "@/lib/routes";

/** Personal /about/ — film identity shell, studio section pattern. */
export default function AboutPage() {
  const { aboutPage, personalAbout, hero } = site;
  const seoUrl = `${site.canonical}${hubCanonicalHref("about")}`;

  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, "");
    if (!hash) return;
    const timer = window.setTimeout(() => scrollToSection(hash), 50);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <>
      <SEO title={aboutPage.seoTitle} description={aboutPage.seoDescription} url={seoUrl} />
      <main className="about-page page-with-hero-reel">
        <PersonalHeroSection />

        <section className="studio-section" aria-label="Experience">
          <FilmReveal delayMs={60}>
            <ul className="studio-models__list studio-stats about-stats" aria-label="Experience">
              {aboutPage.stats.map((stat, index) => (
                <StudioModelItem
                  key={stat.label}
                  title={stat.value}
                  text={stat.label}
                  delayMs={index * 70}
                />
              ))}
            </ul>
          </FilmReveal>
        </section>

        <section
          id={sectionIds.about}
          className="studio-section studio-section--tint"
          aria-labelledby="about-copy-heading"
        >
          <FilmReveal>
            <div className="studio-section__grid">
              <div className="studio-section__aside">
                <h2 id="about-copy-heading" className="studio-section-heading">
                  {personalAbout.title}
                </h2>
              </div>
              <div className="studio-section__body about-copy">
                {personalAbout.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)} className="studio-models__note">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </FilmReveal>
        </section>

        <section className="studio-section about-quote" aria-label="Pull quote">
          <FilmReveal>
            <blockquote className="about-quote__block">
              <p className="about-quote__text">{personalAbout.pullQuote}</p>
            </blockquote>
          </FilmReveal>
        </section>

        <section
          className="studio-section studio-section--tint"
          aria-labelledby="about-credentials-heading"
        >
          <FilmReveal>
            <div className="studio-section__grid">
              <div className="studio-section__aside">
                <h2 id="about-credentials-heading" className="studio-section-heading">
                  {aboutPage.credentialsHeading}
                </h2>
              </div>
              <div className="studio-section__body">
                <ul className="about-list">
                  {aboutPage.credentials.map((item) => (
                    <li key={item.slice(0, 48)} className="about-list__item">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FilmReveal>
        </section>

        <section className="studio-section" aria-labelledby="about-work-heading">
          <FilmReveal>
            <div className="studio-section__grid">
              <div className="studio-section__aside">
                <h2 id="about-work-heading" className="studio-section-heading">
                  {aboutPage.selectedWorkHeading}
                </h2>
              </div>
              <div className="studio-section__body">
                <ul className="about-work">
                  {aboutPage.selectedWork.map((item) => (
                    <li key={item.title} className="about-work__item">
                      <a className="about-work__link" href={item.href}>
                        <span className="about-work__title">{item.title}</span>
                        <span className="about-work__meta">{item.meta}</span>
                      </a>
                      {"note" in item && item.note ? (
                        <p className="about-work__note">{item.note}</p>
                      ) : null}
                    </li>
                  ))}
                </ul>
                <p className="about-work__imdb">
                  <a
                    href={hero.imdbHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={hero.imdbAria}
                  >
                    IMDb
                  </a>
                </p>
              </div>
            </div>
          </FilmReveal>
        </section>

        <section
          id="culture-defends"
          className="studio-section studio-section--tint about-culture"
          aria-labelledby="about-culture-heading"
        >
          <FilmReveal>
            <div className="studio-section__grid">
              <div className="studio-section__aside">
                <h2 id="about-culture-heading" className="studio-section-heading">
                  {aboutPage.cultureHeading}
                </h2>
              </div>
              <div className="studio-section__body about-culture__copy">
                {aboutPage.cultureParagraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)} className="about-culture__text">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </FilmReveal>
        </section>

        <FilmReveal delayMs={80}>
          <FilmContactSection
            heading={site.homeContact.heading}
            lead={personalAbout.contactInvite}
          />
        </FilmReveal>
      </main>
    </>
  );
}
