import { ArrowUpRight, ChevronRight } from "lucide-react";
import { sectionIds, site } from "@/data/site";

export default function SpecializedDivisionsSection() {
  const { specializedDivisions: divisions } = site;
  const items = [divisions.games, divisions.ai];

  return (
    <section
      id={sectionIds.divisions}
      className="specialized-divisions scroll-mt-24"
      aria-labelledby="specialized-divisions-heading"
    >
      <div className="archive-container specialized-divisions__inner">
        <h2 id="specialized-divisions-heading" className="specialized-divisions__heading">
          {divisions.heading}
        </h2>

        <div className="specialized-divisions__grid">
          {items.map((item) => (
            <a
              key={item.title}
              className="specialized-divisions__card"
              href={item.href}
              aria-label={item.cta}
              {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              <div className="specialized-divisions__card-top">
                <span className="specialized-divisions__title">{item.title}</span>
                <span className="specialized-divisions__icon" aria-hidden="true">
                  {item.external ? (
                    <ArrowUpRight size={18} strokeWidth={2.25} />
                  ) : (
                    <ChevronRight size={18} strokeWidth={2.25} />
                  )}
                </span>
              </div>
              <p className="specialized-divisions__subtitle">{item.subtitle}</p>
              <p className="specialized-divisions__text">{item.text}</p>
              <span className="specialized-divisions__cta">{item.cta}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
