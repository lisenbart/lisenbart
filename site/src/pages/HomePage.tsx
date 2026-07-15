import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import EndToEndProductionSection from "@/components/EndToEndProductionSection";
import BeyondTheToolSection from "@/components/BeyondTheToolSection";
import HowWeWorkSection from "@/components/HowWeWorkSection";
import FounderQuoteSection from "@/components/FounderQuoteSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactForm from "@/components/ContactForm";
import { SEO } from "@/components/SEO";
import { site } from "@/data/site";

export default function HomePage() {
  return (
    <>
      <SEO title={site.meta.title} description={site.meta.description} url={site.canonical} />
      <main className="site-main site-main-stack">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <EndToEndProductionSection />
        <BeyondTheToolSection />
        <HowWeWorkSection />
        <FounderQuoteSection />
        <TestimonialsSection />
        <ContactForm />
      </main>
    </>
  );
}
