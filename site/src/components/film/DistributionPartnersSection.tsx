import {
  distributionPartnersConfig,
  distributionPartnersForDisplay,
  distributionPartnersVisibility,
} from "@/data/distributionPartners";

/**
 * Compact Originals block for distribution / content partners.
 * Hidden on production until partners are verified and sectionPublished is true.
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
            <span className="distribution-partners__name">{partner.name}</span>
            <span className="distribution-partners__meta">{partner.country}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
