import FilmContactSection from "@/components/FilmContactSection";
import FilmCapabilityItem from "@/components/film/FilmCapabilityItem";
import FilmReveal from "@/components/film/FilmReveal";
import PageHeroReel from "@/components/film/PageHeroReel";
import { SEO } from "@/components/SEO";
import { site } from "@/data/site";

const page = site.aiPage;
const reel = page.showreel;

export default function AiPage() {
  return (
    <>
      <SEO
        title={page.seoTitle}
        description={page.seoDescription}
        url={`${site.canonical}/ai/`}
      />
      <div className="ai-page page-with-hero-reel">
        <PageHeroReel title={page.name} titleId="ai-page-heading" reel={reel} />

        <section className="page-shell direction-page page-shell--from-reel">
          <FilmReveal>
            <p className="film-section-label">{page.capabilitiesHeading}</p>
          </FilmReveal>
          <ul className="film-capabilities__list">
            {page.capabilities.map((item, index) => (
              <FilmCapabilityItem
                key={item.title}
                title={item.title}
                text={item.text}
                delayMs={index * 70}
              />
            ))}
          </ul>
        </section>
        <FilmReveal>
          <FilmContactSection heading={site.homeContact.heading} />
        </FilmReveal>
      </div>
    </>
  );
}
