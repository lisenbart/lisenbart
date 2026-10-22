import { SEO } from "@/components/SEO";
import { legalConfig } from "@/data/legal";
import { site } from "@/data/site";

const meta = legalConfig.policies.legal;

export default function LegalPage() {
  return (
    <>
      <SEO
        title={meta.seoTitle}
        description={meta.seoDescription}
        url={`${site.canonical}${meta.path}`}
      />

      <article className="page-shell legal-doc">
        <div className="page-title-row">
          <h1>{meta.pageTitle}</h1>
        </div>

        <div className="legal-doc__body">
          <p>
            Registered business information for <strong>{site.brand}</strong>. Public contact:{" "}
            <a href={`mailto:${site.email}`}>{site.email}</a>.
          </p>

          <h2>{legalConfig.canada.countryLabel}</h2>
          <p>
            {legalConfig.canada.legalName}
            <br />
            {legalConfig.canada.addressLine}
            <br />
            {legalConfig.canada.cityLine}
            <br />
            {legalConfig.canada.registrationLine}
          </p>

          <h2>{legalConfig.ukraine.countryLabel}</h2>
          <p>
            {legalConfig.ukraine.legalName}
            <br />
            {legalConfig.ukraine.addressLine}
            <br />
            {legalConfig.ukraine.cityLine}
            <br />
            {legalConfig.ukraine.registrationLine}
          </p>
        </div>
      </article>
    </>
  );
}
