import { useEffect } from "react";
import FilmContactSection from "@/components/FilmContactSection";
import FilmReveal from "@/components/film/FilmReveal";
import PageHeroReel from "@/components/film/PageHeroReel";
import StudioModelItem from "@/components/film/StudioModelItem";
import { SEO } from "@/components/SEO";
import StudioSlideshow from "@/components/film/StudioSlideshow";
import { scrollToSection, site } from "@/data/site";
import { hubCanonicalHref } from "@/lib/routes";
import { publicAsset } from "@/lib/publicAsset";
import { SHOW_DIVISIONS } from "@/lib/siteFlags";

const page = site.studioPage;

export default function StudioPage() {
  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, "");
    if (!hash) return;
    const timer = window.setTimeout(() => scrollToSection(hash), 50);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <>
      <SEO
        title={page.seoTitle}
        description={page.seoDescription}
        url={`${site.canonical}/studio/`}
      />
      <div className="studio-page page-with-hero-reel">
        <PageHeroReel titleId="studio-page-heading" media={<StudioSlideshow />}>
          <div className="page-title-row">
            <h1 id="studio-page-heading">{page.name}</h1>
          </div>
          <p className="studio-page-hero__lead">{page.heroLead}</p>
        </PageHeroReel>

        <section className="studio-section" aria-labelledby="who-heading">
          <FilmReveal delayMs={100}>
            <div className="studio-section__grid">
              <div className="studio-section__aside">
                <h2 id="who-heading" className="studio-section-heading">
                  {page.introHeading}
                </h2>
                {page.introParagraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)} className="studio-models__note">
                    {paragraph}
                  </p>
                ))}
              </div>
              <div className="studio-section__body">
                <ul className="studio-models__list studio-stats" aria-label="Studio at a glance">
                  {page.stats.map((stat, index) => (
                    <StudioModelItem
                      key={stat.label}
                      title={stat.value}
                      text={stat.label}
                      delayMs={index * 70}
                    />
                  ))}
                </ul>
                <p className="studio-models__note studio-section__trust">{page.statsNote}</p>
              </div>
            </div>
          </FilmReveal>
        </section>

        <section
          className="studio-section studio-section--tint studio-section--teams"
          aria-labelledby="teams-heading"
        >
          <FilmReveal>
            <div className="studio-section__grid studio-section__grid--inset">
              <h2 id="teams-heading" className="studio-section-heading studio-section-heading--teams">
                <span className="studio-section-heading__run">{page.teamsHeadingLead}</span>{" "}
                <span className="studio-section-heading__run">
                  {page.teamsHeadingTail.replace(" ", "\u00A0")}
                </span>
              </h2>
              <div className="studio-section__body">
                <p className="studio-models__note">{page.teamsNote}</p>
              </div>
            </div>
          </FilmReveal>
          <ul
            className="studio-teams-grid"
            aria-label={SHOW_DIVISIONS ? "Three teams" : "Three directions"}
          >
            {page.teams.map((item, index) => (
              <StudioModelItem
                key={item.hub}
                title={item.title}
                team={SHOW_DIVISIONS ? item.team : undefined}
                text={item.text}
                href={hubCanonicalHref(item.hub)}
                image={item.image}
                imageAlt={item.imageAlt}
                delayMs={index * 70}
              />
            ))}
          </ul>
        </section>

        <section className="studio-section" aria-labelledby="how-heading">
          <FilmReveal>
            <div className="studio-section__grid">
              <div className="studio-section__aside">
                <h2 id="how-heading" className="studio-section-heading">
                  {page.howHeading}
                </h2>
                {page.howParagraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)} className="studio-models__note">
                    {paragraph}
                  </p>
                ))}
              </div>
              <div className="studio-section__body">
                <p className="studio-models__note">{page.howNote}</p>
              </div>
            </div>
          </FilmReveal>
          <ol className="studio-how-steps studio-section__full" aria-label="How we work">
            {page.howSteps.map((step) => (
              <li key={step.title} className="studio-how-steps__item">
                <span className="studio-how-steps__number">{step.number}</span>
                <h3 className="studio-models__title">{step.title}</h3>
                <p className="studio-models__text">{step.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="studio-section studio-section--founder studio-section--tint" aria-labelledby="people-heading">
          <FilmReveal>
            <div className="studio-section__grid">
              <div className="studio-section__aside">
                <h2 id="people-heading" className="studio-section-heading">
                  {page.peopleHeading}
                </h2>
                <blockquote className="studio-pull__quote">
                  <p>{page.pullQuote}</p>
                </blockquote>
              </div>
              <div className="studio-founder">
                <img
                  className="studio-founder__portrait"
                  src={publicAsset(page.founderPortrait)}
                  alt={page.founderPortraitAlt}
                  width={120}
                  height={120}
                />
                <div className="studio-founder__copy">
                  <p className="studio-people__founder-name">{page.founderName}</p>
                  <p className="studio-people__founder-role">{page.founderRole}</p>
                  {page.founderProof.map((line) => (
                    <p key={line} className="studio-people__founder-proof">
                      {line}
                    </p>
                  ))}
                  <a className="studio-people__link" href={hubCanonicalHref("about")}>
                    {page.founderCta}
                  </a>
                </div>
              </div>
            </div>
          </FilmReveal>
        </section>

        <FilmReveal>
          <FilmContactSection heading={site.homeContact.heading} />
        </FilmReveal>
      </div>
    </>
  );
}
