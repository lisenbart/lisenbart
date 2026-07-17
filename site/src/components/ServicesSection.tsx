import { capabilities } from "@/data/capabilities";
import { goToContact, sectionIds, site } from "@/data/site";
import CapabilityCard from "./CapabilityCard";

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
            <div className="section-card-header section-card-header--capabilities">
              <h2 className="how-col-title how-col-title-cyan section-card-header__title">
                Production capabilities
              </h2>
              <p className="section-card-header__lead how-support-line">{site.capabilitiesLine}</p>
              <p className="section-card-header__lead section-card-header__lead--secondary capability-ai-note">
                AI-assisted production means faster iteration and broader creative range.
              </p>
            </div>

            <ul className="capability-grid">
              {capabilities.map((item) => (
                <CapabilityCard key={item.id} item={item} />
              ))}
            </ul>

            <div className="capability-cta scroll-mt-24" aria-label="Discuss a project">
              <h3 className="capability-cta-title">Have a project in mind?</h3>
              <p className="capability-cta-text">
                Send your brief, references or even an early idea. A producer will review your brief and
                propose the most effective approach.
              </p>

              <div className="estimate-cta-actions mt-7 flex w-full min-w-0 max-w-full flex-col items-stretch justify-center gap-3 md:flex-row md:items-center md:justify-center md:gap-4">
                <button
                  type="button"
                  onClick={() => goToContact()}
                  className="gradient-button-emerald btn-on-accent site-scroll-cta w-full min-w-0 max-w-full rounded-full px-5 py-3 text-sm font-medium uppercase tracking-[0.12em] md:w-auto md:px-6"
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
