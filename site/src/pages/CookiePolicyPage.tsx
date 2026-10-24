import { SEO } from "@/components/SEO";
import { CookiePolicyBody } from "@/components/legal/legalDocBodies";
import { legalConfig } from "@/data/legal";
import { site } from "@/data/site";

const meta = legalConfig.policies.cookies;

export default function CookiePolicyPage() {
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
            <CookiePolicyBody />
          </div>
        </div>
      </article>
    </>
  );
}
