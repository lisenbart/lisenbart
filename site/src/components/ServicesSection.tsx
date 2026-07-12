import { capabilities } from "@/data/capabilities";
import { publicAsset } from "@/lib/publicAsset";
import { sectionIds, scrollToSection, site } from "@/data/site";

export default function ServicesSection() {
  return (
    <section
      id={sectionIds.services}
      className="how-section scroll-mt-24 px-[var(--page-padding)] pb-[var(--section-spacing)]"
      aria-label="Production capabilities"
    >
      <div className="mx-auto w-full min-w-0 max-w-[920px]">
        <article className="how-ios-card how-ios-card-cyan" aria-label="Production capabilities">
          <div className="how-ios-card-inner">
            <h2 className="how-col-title how-col-title-cyan">Production capabilities</h2>
            <p className="how-support-line">{site.capabilitiesLine}</p>

            <ul className="capability-grid">
              {capabilities.map((item) => (
                <li key={item.id} className="capability-card">
                  <div className="capability-media">
                    <img
                      src={publicAsset(item.image)}
                      alt=""
                      className="capability-image"
                      loading="lazy"
                    />
                    <div className="capability-scrim" aria-hidden="true" />
                    <h3 className="capability-title">{item.title}</h3>
                  </div>
                </li>
              ))}
            </ul>

            <div className="capability-cta scroll-mt-24" aria-label="Discuss a project">
              <h3 className="capability-cta-title">Have a project in mind?</h3>
              <p className="capability-cta-text">
                Send your brief, references or even an early idea. I'll review it and propose the most effective
                production approach.
              </p>

              <div className="estimate-cta-actions mt-7 flex w-full min-w-0 max-w-full flex-col items-stretch justify-center gap-3 md:flex-row md:items-center md:justify-center md:gap-4">
                <button
                  type="button"
                  onClick={() => scrollToSection(sectionIds.contact)}
                  className="gradient-button-emerald btn-on-accent w-full min-w-0 max-w-full rounded-full px-5 py-3 text-sm font-medium md:w-auto md:px-6"
                >
                  {site.ctaLabel}
                </button>
                <a href={`mailto:${site.email}`} className="estimate-cta-secondary w-full min-w-0 max-w-full md:w-auto">
                  Email Directly
                </a>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
