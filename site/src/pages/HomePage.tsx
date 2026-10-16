import { useEffect } from "react";
import ContactForm from "@/components/ContactForm";
import SelectedWorkSection from "@/components/SelectedWorkSection";
import SpecializedDivisionsSection from "@/components/SpecializedDivisionsSection";
import StudioDirectionsSection from "@/components/StudioDirectionsSection";
import StudioHeroSection from "@/components/StudioHeroSection";
import WhyStudioSection from "@/components/WhyStudioSection";
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
      <SEO title={site.meta.title} description={site.meta.description} url={`${site.canonical}/`} />
      <main className="site-main site-main-stack">
        <StudioHeroSection />
        <SelectedWorkSection />
        <StudioDirectionsSection />
        <WhyStudioSection />
        <SpecializedDivisionsSection />
        <ContactForm heading={site.homeContact.heading} lead={site.homeContact.lead} />
      </main>
    </>
  );
}
