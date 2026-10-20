import {
  distributionPartnersConfig,
  distributionPartnersForDisplay,
  distributionPartnersVisibility,
} from "@/data/distributionPartners";

/**
 * Compact Originals block for studio distribution partners.
 * Production shows verified partners only when sectionPublished.
 */
export default function DistributionPartnersSection() {
  const mode = distributionPartnersVisibility();
  const partners = distributionPartnersForDisplay();

  if (mode === "hidden" || partners.length === 0) return null;

  const { heading, lead } = distributionPartnersConfig;

  return (
    <section
      className="distribution-partners"
      aria-labelledby="distribution-partners-heading"
      data-status={mode}
    >
      <h2 id="distribution-partners-heading" className="film-section-label">
        {heading}
      </h2>
      {lead ? <p className="distribution-partners__lead">{lead}</p> : null}

      <ul className="distribution-partners__list">
        {partners.map((partner) => (
          <li key={partner.id} className="distribution-partners__item">
            {partner.website ? (
              <a
                className="distribution-partners__name distribution-partners__name--link"
                href={partner.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                {partner.name}
              </a>
            ) : (
              <span className="distribution-partners__name">{partner.name}</span>
            )}
            {partner.country ? (
              <span className="distribution-partners__meta">{partner.country}</span>
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  );
}
