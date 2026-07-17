import { useEffect } from "react";
import ReelBlock from "@/components/ReelBlock";
import TestimonialsSection from "@/components/TestimonialsSection";
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
      <SEO title={`Commercial — ${site.brand}`} description={commercialPage.title} url={seoUrl} />
      <main className="site-main work-page">
        <header className="work-page-header hub-page-header px-[var(--page-padding)]">
          <h1 className="hub-page-header__row mx-auto w-full min-w-0 max-w-[920px]">
            <span className="hub-page-header__name work-page-title--commercial">Commercial</span>
            <span className="hub-page-header__sep" aria-hidden="true" />
            <span className="hub-page-header__lead">{commercialPage.title}</span>
          </h1>
        </header>

        <TrustedBySection />

        <div className="film-cases px-[var(--page-padding)]">
          {commercialPage.reels.map((reel) => (
            <ReelBlock
              key={reel.id}
              id={reel.id}
              label={reel.label}
              text={reel.text}
              videoId={reel.vimeoId}
              comingSoonEndsAt={reel.comingSoonEndsAt}
            />
          ))}
        </div>

        <TestimonialsSection />

        <ContactForm lead={commercialPage.contactLead} />
      </main>
    </>
  );
}
