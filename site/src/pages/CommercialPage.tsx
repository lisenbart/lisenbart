import { useEffect } from "react";
import ReelBlock from "@/components/ReelBlock";
import TrustedBySection from "@/components/TrustedBySection";
import ContactForm from "@/components/ContactForm";
import { SEO } from "@/components/SEO";
import { scrollToSection, site } from "@/data/site";
import { hubCanonicalHref } from "@/lib/routes";

export default function CommercialPage() {
  const { commercialPage } = site;
  const seoUrl = `${site.canonical}${hubCanonicalHref("client-work")}`;
  const [advertisingReel, ...secondaryReels] = commercialPage.reels;

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

        <div className="commercial-capabilities archive-container" aria-labelledby="capabilities-heading">
          <h2 id="capabilities-heading" className="commercial-capabilities__section-title">
            {commercialPage.capabilitiesHeading}
          </h2>
          <ul className="commercial-capabilities__list">
            {commercialPage.capabilities.map((item) => (
              <li key={item.title} className="commercial-capabilities__item">
                <p className="commercial-capabilities__title">{item.title}</p>
                <p className="commercial-capabilities__text">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>

        <section className="commercial-evidence" aria-labelledby="commercial-evidence-heading">
          <div className="archive-container commercial-evidence__header">
            <h2 id="commercial-evidence-heading" className="commercial-capabilities__section-title">
              {commercialPage.evidenceHeading}
            </h2>
          </div>

          <TrustedBySection />

          <div className="film-cases film-cases--reels">
            {advertisingReel && (
              <ReelBlock
                key={advertisingReel.id}
                id={advertisingReel.id}
                label={advertisingReel.label}
                body={advertisingReel.body}
                videoId={advertisingReel.vimeoId}
                previewImages={advertisingReel.previewImages}
                emphasis="primary"
              />
            )}
            {secondaryReels.map((reel) => (
              <ReelBlock
                key={reel.id}
                id={reel.id}
                label={reel.label}
                body={reel.body}
                videoId={reel.vimeoId}
                previewImages={reel.previewImages}
                emphasis="secondary"
              />
            ))}
          </div>
        </section>

        {commercialPage.gamesBridge && (
          <aside className="studio-games-bridge archive-container" aria-label="Lisenbart Games">
            <div className="studio-games-bridge__row">
              <div className="studio-games-bridge__copy">
                <p className="studio-games-bridge__title">{commercialPage.gamesBridge.title}</p>
                <p className="studio-games-bridge__text">{commercialPage.gamesBridge.text}</p>
              </div>
              <a
                className="studio-games-bridge__link"
                href={commercialPage.gamesBridge.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {commercialPage.gamesBridge.cta}
              </a>
            </div>
          </aside>
        )}

        <ContactForm heading={commercialPage.contactHeading} lead={commercialPage.contactLead} />
      </main>
    </>
  );
}
