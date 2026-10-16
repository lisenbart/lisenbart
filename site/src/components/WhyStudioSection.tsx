import TrustedBySection from "@/components/TrustedBySection";
import { sectionIds, site } from "@/data/site";
import { hubCanonicalHref } from "@/lib/routes";

export default function WhyStudioSection() {
  const { whyStudio } = site;

  return (
    <section id={sectionIds.why} className="why-studio scroll-mt-24" aria-labelledby="why-studio-heading">
      <div className="archive-container why-studio__inner">
        <p className="why-studio__eyebrow">{whyStudio.eyebrow}</p>
        <h2 id="why-studio-heading" className="why-studio__headline">
          {whyStudio.headline}
        </h2>
        <p className="why-studio__text">{whyStudio.text}</p>
        <p className="why-studio__founder">
          {whyStudio.founder}{" "}
          <a className="why-studio__about" href={hubCanonicalHref("about")}>
            {whyStudio.aboutCta}
          </a>
        </p>
      </div>
      <TrustedBySection />
    </section>
  );
}
