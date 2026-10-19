import { useEffect } from "react";
import FilmContactSection from "@/components/FilmContactSection";
import { SEO } from "@/components/SEO";
import { Arrow, PlayIcon } from "@/components/film/FilmIcons";
import { useReel } from "@/contexts/ReelContext";
import { scrollToSection, site } from "@/data/site";

const page = site.commercialPage;
const advertisingReel = page.reels[0];
const aiReel = page.reels[1];

export default function CommercialPage() {
  const { openReel } = useReel();

  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, "");
    if (!hash) return;
    const timer = window.setTimeout(() => scrollToSection(hash), 80);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <>
      <SEO
        title={page.seoTitle}
        description={page.seoDescription}
        url={`${site.canonical}/client-work/`}
      />
      <section className="page-shell work-page">
        <div className="page-title-row">
          <h1>Client Work</h1>
          <button
            className="reel-link"
            type="button"
            onClick={() => openReel(advertisingReel.vimeoId, advertisingReel.label)}
          >
            Play reel{" "}
            <span>
              <PlayIcon />
            </span>
          </button>
        </div>
        <p className="film-contact__lead" style={{ marginBottom: "2rem", maxWidth: "36rem" }}>
          {page.title}
        </p>

        <div className="film-capabilities">
          <p className="film-section-label">{page.capabilitiesHeading}</p>
          <ul className="film-capabilities__list">
            {page.capabilities.map((item) => (
              <li key={item.title}>
                <h2 className="film-capabilities__title">{item.title}</h2>
                <p className="film-capabilities__text">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>

        <p className="film-section-label">{page.evidenceHeading}</p>
        <p className="film-capabilities__text" style={{ marginBottom: "1.25rem", maxWidth: "36rem" }}>
          Frames from the advertising &amp; branded-content showreel. Click any frame to play the reel.
        </p>
        <div className="work-gallery">
          {advertisingReel.previewImages.map((image) => (
            <button
              className="gallery-item"
              type="button"
              onClick={() => openReel(advertisingReel.vimeoId, advertisingReel.label)}
              key={image}
              aria-label={`Play ${advertisingReel.label}`}
            >
              <img src={image} alt="" />
              <span className="gallery-overlay">
                <PlayIcon />
                <strong>{advertisingReel.label}</strong>
              </span>
            </button>
          ))}
        </div>

        <div className="client-names" aria-label={site.trustedBy.label}>
          {site.trustedBy.brands.map((brand) => (
            <span key={brand}>{brand}</span>
          ))}
        </div>

        <div className="film-ai-block" id="ai-powered-reel">
          <div className="page-title-row" style={{ marginBottom: "1rem" }}>
            <h2 className="film-capabilities__title" style={{ fontSize: "0.7rem" }}>
              {aiReel.label}
            </h2>
            <button
              className="reel-link"
              type="button"
              onClick={() => openReel(aiReel.vimeoId, aiReel.label)}
            >
              Play AI reel{" "}
              <span>
                <PlayIcon />
              </span>
            </button>
          </div>
          <p className="film-capabilities__text" style={{ maxWidth: "36rem", marginBottom: "1.5rem" }}>
            {aiReel.body[0]}
          </p>
          <div className="work-gallery">
            {aiReel.previewImages.slice(0, 6).map((image) => (
              <button
                className="gallery-item"
                type="button"
                key={image}
                onClick={() => openReel(aiReel.vimeoId, aiReel.label)}
                aria-label={`Play ${aiReel.label}`}
              >
                <img src={image} alt="" />
                <span className="gallery-overlay">
                  <PlayIcon />
                  <strong>{aiReel.label}</strong>
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="film-games-bridge">
          <div>
            <h2 className="film-games-bridge__title">{page.gamesBridge.title}</h2>
            <p className="film-games-bridge__text">{page.gamesBridge.text}</p>
          </div>
          <a
            className="film-games-bridge__link"
            href={page.gamesBridge.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {page.gamesBridge.cta}
            <span className="circle-link">
              <Arrow />
            </span>
          </a>
        </div>
      </section>
      <FilmContactSection heading={page.contactHeading} lead={page.contactLead} />
    </>
  );
}
