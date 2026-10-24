import { SEO } from "@/components/SEO";
import { LegalInfoBody } from "@/components/legal/legalDocBodies";
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
        <div className="legal-doc__inner">
          <div className="page-title-row">
            <h1>{meta.pageTitle}</h1>
          </div>

          <div className="legal-doc__body">
            <LegalInfoBody />
          </div>
        </div>
      </article>
    </>
  );
}
