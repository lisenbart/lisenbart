import { useEffect } from "react";
import ReelBlock from "@/components/ReelBlock";
import TrustedBySection from "@/components/TrustedBySection";
import ContactForm from "@/components/ContactForm";
import { SEO } from "@/components/SEO";
import { scrollToSection, site } from "@/data/site";
import { routes } from "@/lib/routes";

export default function CommercialPage() {
  const { commercialPage } = site;
  const seoUrl = `${site.canonical}${routes.commercial}`;

  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, "");
    if (!hash) return;
    const timer = window.setTimeout(() => scrollToSection(hash), 50);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <>
      <SEO
        title={commercialPage.seoTitle}
        description={commercialPage.seoDescription}
        url={seoUrl}
      />
      <main className="site-main work-page work-page--commercial archive-hub">
        <header className="work-page-header hub-page-header">
          <h1 className="hub-page-header__row">
            <span className="hub-page-header__name work-page-title--commercial">
              {commercialPage.name}
            </span>
            <span className="hub-page-header__sep" aria-hidden="true" />
            <span className="sr-only"> — </span>
            <span className="hub-page-header__lead">{commercialPage.title}</span>
          </h1>
        </header>

        <TrustedBySection />

        <div className="film-cases film-cases--reels">
          {commercialPage.reels.map((reel) => (
            <ReelBlock
              key={reel.id}
              id={reel.id}
              label={reel.label}
              text={reel.text}
              videoId={reel.vimeoId}
              previewImages={reel.previewImages}
              comingSoon={reel.comingSoon}
            />
          ))}
        </div>

        {/* Temporarily hidden — restore when testimonials are ready to show */}
        {/* <TestimonialsSection /> */}

        <ContactForm heading={commercialPage.contactHeading} lead={commercialPage.contactLead} />
      </main>
    </>
  );
}
