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

        <section className="studio-intro-block" aria-labelledby="who-heading">
          <FilmReveal delayMs={100}>
            <div className="studio-intro" aria-labelledby="who-heading">
              <h2 id="who-heading" className="studio-section-heading">
                {page.introHeading}
              </h2>
              {page.introParagraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 48)} className="studio-models__note">
                  {paragraph}
                </p>
              ))}
              <a className="studio-people__link" href={hubCanonicalHref(page.introCta.hub)}>
                {page.introCta.label}
              </a>
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
            </div>
          </FilmReveal>
        </section>

        <section className="studio-models" aria-labelledby="teams-heading">
          <FilmReveal>
            <h2 id="teams-heading" className="studio-section-heading">
              {page.teamsHeading}
            </h2>
          </FilmReveal>
          <ul className="studio-models__list">
            {page.teams.map((team, index) => (
              <StudioModelItem
                key={team.title}
                title={team.title}
                text={team.text}
                delayMs={index * 70}
              />
            ))}
          </ul>
          <FilmReveal delayMs={80}>
            <p className="studio-models__note">{page.teamsNote}</p>
          </FilmReveal>
        </section>

        <section className="studio-models studio-how" aria-labelledby="how-heading">
          <FilmReveal>
            <h2 id="how-heading" className="studio-section-heading">
              {page.howHeading}
            </h2>
            {page.howParagraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 48)} className="studio-models__note">
                {paragraph}
              </p>
            ))}
            <p className="studio-models__title studio-how__stages">
              {page.howStages.join(" → ")}
            </p>
            <p className="studio-models__note">{page.howNote}</p>
          </FilmReveal>
        </section>

        <section className="studio-people" aria-labelledby="people-heading">
          <FilmReveal>
            <h2 id="people-heading" className="studio-section-heading">
              {page.peopleHeading}
            </h2>
            <div className="studio-founder">
              <img
                className="studio-founder__portrait"
                src={publicAsset(page.founderPortrait)}
                alt={page.founderPortraitAlt}
                width={160}
                height={160}
              />
              <div>
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
          </FilmReveal>
        </section>

        <FilmReveal>
          <FilmContactSection heading={site.homeContact.heading} />
        </FilmReveal>
      </div>
    </>
  );
}
