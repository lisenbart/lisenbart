import ReelBlock from "@/components/ReelBlock";
import TestimonialsSection from "@/components/TestimonialsSection";
import TrustedBySection from "@/components/TrustedBySection";
import { SEO } from "@/components/SEO";
import { contactHref, site } from "@/data/site";
import { routes } from "@/lib/routes";

export default function CommercialPage() {
  const { commercialPage } = site;
  const seoUrl = `${site.canonical}${routes.commercial}`;

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

        <section className="work-page-cta px-[var(--page-padding)]" aria-label="Contact">
          <div className="mx-auto w-full min-w-0 max-w-[920px] text-center">
            <p className="work-page-cta-lead">{commercialPage.contactLead}</p>
            <a
              href={contactHref()}
              className="gradient-button-emerald btn-on-accent mt-4 inline-flex rounded-full px-6 py-3 text-sm font-medium tracking-wide"
            >
              {site.ctaLabel}
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
