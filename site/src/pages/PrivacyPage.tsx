import { SEO } from "@/components/SEO";
import { PrivacyPolicyBody } from "@/components/legal/legalDocBodies";
import { openLegalDoc } from "@/lib/legalDocEvents";
import { legalConfig } from "@/data/legal";
import { site } from "@/data/site";

const meta = legalConfig.policies.privacy;

export default function PrivacyPage() {
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
            <h1>{meta.title}</h1>
          </div>

          <div className="legal-doc__body">
            <PrivacyPolicyBody onOpenLegal={() => openLegalDoc("legal")} />
          </div>
        </div>
      </article>
    </>
  );
}
