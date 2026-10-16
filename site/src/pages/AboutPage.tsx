import { useEffect } from "react";
import PersonalAboutSection from "@/components/PersonalAboutSection";
import PersonalHeroSection from "@/components/PersonalHeroSection";
import { SEO } from "@/components/SEO";
import { scrollToSection, site } from "@/data/site";
import { hubCanonicalHref } from "@/lib/routes";

/** Personal foundation page — same hero + About voice as the previous home. */
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
      <main className="site-main site-main-stack">
        <PersonalHeroSection />
        <PersonalAboutSection />
      </main>
    </>
  );
}
