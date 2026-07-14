import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
import FounderQuoteSection from "@/components/FounderQuoteSection";
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
        <FounderQuoteSection />
        <ServicesSection />
        <ContactForm />
      </main>
    </>
  );
}
