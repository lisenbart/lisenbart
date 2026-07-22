import { useEffect } from "react";
import PersonalHeroSection from "@/components/PersonalHeroSection";
import ExplorePathsSection from "@/components/ExplorePathsSection";
import PersonalAboutSection from "@/components/PersonalAboutSection";
import ContactForm from "@/components/ContactForm";
import { SEO } from "@/components/SEO";
import { scrollToSection, site } from "@/data/site";

export default function HomePage() {
  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, "");
    if (!hash) return;
    const timer = window.setTimeout(() => scrollToSection(hash), 50);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <>
      <SEO title={site.meta.title} description={site.meta.description} url={site.canonical} />
      <main className="site-main site-main-stack">
        <PersonalHeroSection />
        <ExplorePathsSection />
        <PersonalAboutSection />
        <ContactForm heading={site.homeContact.heading} lead={site.homeContact.lead} />
      </main>
    </>
  );
}
