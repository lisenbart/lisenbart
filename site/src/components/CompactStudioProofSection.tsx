import TrustedBySection from "@/components/TrustedBySection";
import { sectionIds, site } from "@/data/site";
import { hubCanonicalHref } from "@/lib/routes";

/** Concise home proof — clients + routes. No reel. */
export default function CompactStudioProofSection() {
  const { compactProof } = site;

  return (
    <section
      id={sectionIds.proof}
      className="compact-proof scroll-mt-24"
      aria-labelledby="compact-proof-heading"
    >
      <div className="archive-container compact-proof__inner">
        <h2 id="compact-proof-heading" className="compact-proof__heading">
          {compactProof.heading}
        </h2>
        <p className="compact-proof__text">{compactProof.text}</p>
        <p className="compact-proof__links">
          <a className="compact-proof__link" href={hubCanonicalHref("client-work")}>
            {compactProof.workCta}
          </a>
          <span className="compact-proof__sep" aria-hidden="true">
            ·
          </span>
          <a className="compact-proof__link" href={hubCanonicalHref("about")}>
            {compactProof.aboutCta}
          </a>
        </p>
      </div>
      <TrustedBySection />
    </section>
  );
}
