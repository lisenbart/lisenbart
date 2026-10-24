import { SEO } from "@/components/SEO";
import { legalConfig, type RegisteredPresence } from "@/data/legal";
import { site } from "@/data/site";

const meta = legalConfig.policies.legal;

function EntityBlock({ presence }: { presence: RegisteredPresence }) {
  return (
    <section className="legal-doc__entity" aria-labelledby={`legal-${presence.countryLabel}`}>
      <h2 id={`legal-${presence.countryLabel}`}>{presence.countryLabel}</h2>
      <address className="legal-doc__address">
        <span className="legal-doc__entity-name">{presence.legalName}</span>
        <span>{presence.addressLine}</span>
        <span>{presence.cityLine}</span>
        <span>{presence.registrationLine}</span>
      </address>
    </section>
  );
}

export default function LegalPage() {
  return (
    <>
      <SEO
        title={meta.seoTitle}
        description={meta.seoDescription}
        url={`${site.canonical}${meta.path}`}
      />

      <article className="page-shell legal-doc">
        <div className="legal-doc__inner">
          <div className="page-title-row">
            <h1>{meta.pageTitle}</h1>
          </div>

          <div className="legal-doc__body">
            <p>
              Registered business information for <strong>{site.brand}</strong>. Public contact:{" "}
              <a href={`mailto:${site.email}`}>{site.email}</a>.
            </p>

            <div className="legal-doc__entities">
              <EntityBlock presence={legalConfig.canada} />
              <EntityBlock presence={legalConfig.ukraine} />
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
