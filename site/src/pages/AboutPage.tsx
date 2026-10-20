import { useEffect } from "react";
import FilmContactSection from "@/components/FilmContactSection";
import FilmReveal from "@/components/film/FilmReveal";
import PersonalAboutSection from "@/components/PersonalAboutSection";
import PersonalHeroSection from "@/components/PersonalHeroSection";
import { SEO } from "@/components/SEO";
import { scrollToSection, site } from "@/data/site";
import { hubCanonicalHref } from "@/lib/routes";

/** Personal foundation page — adapted to the film identity shell. */
export default function AboutPage() {
  const { aboutPage } = site;
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
      <main className="film-about">
        <FilmReveal>
          <PersonalHeroSection />
        </FilmReveal>
        <FilmReveal delayMs={80}>
          <PersonalAboutSection hideContact />
        </FilmReveal>
        <FilmReveal delayMs={120}>
          <FilmContactSection
            heading="Contact"
            lead="A brief or a few clear details are enough to start."
          />
        </FilmReveal>
      </main>
    </>
  );
}
