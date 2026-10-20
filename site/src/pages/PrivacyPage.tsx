import { SEO } from "@/components/SEO";
import { legalConfig, shouldTreatPoliciesAsDraft } from "@/data/legal";
import { site } from "@/data/site";

const meta = legalConfig.policies.privacy;

export default function PrivacyPage() {
  const draft = shouldTreatPoliciesAsDraft();

  return (
    <>
      <SEO
        title={draft ? meta.seoTitle : "Privacy Policy — LISENBART FILM"}
        description={meta.seoDescription}
        url={`${site.canonical}${meta.path}`}
      >
        {draft ? <meta name="robots" content="noindex, nofollow" /> : null}
      </SEO>

      <article className="page-shell legal-doc">
        <div className="page-title-row">
          <h1>{meta.title}</h1>
        </div>

        {draft ? (
          <p className="legal-doc__banner" role="status">
            Draft for review — not an approved policy. Do not treat as a binding privacy notice.
          </p>
        ) : null}

        <div className="legal-doc__body">
          <p>
            This draft describes how <strong>{site.brand}</strong> intends to handle information
            submitted through lisenbart.com. It is not legal advice and does not identify a verified
            data controller until registration details are confirmed.
          </p>

          <h2>Who we are</h2>
          <p>
            LISENBART FILM is an independent creative studio. Public contact:{" "}
            <a href={`mailto:${site.email}`}>{site.email}</a>. Registered legal entity names and
            addresses will appear here only after verification.
          </p>

          <h2>Information you send us</h2>
          <p>
            The contact form may collect your name, email address, project type, and message. We use
            that information to respond to enquiries. Do not submit sensitive personal data through
            the form.
          </p>

          <h2>Analytics</h2>
          <p>
            The site currently loads Google Analytics (gtag). Analytics may set cookies or similar
            identifiers. A consent management interface is not yet implemented; see the Cookie Policy
            draft for current behaviour.
          </p>

          <h2>Retention and rights</h2>
          <p>
            Retention periods, lawful bases, and statutory rights (access, erasure, etc.) will be
            completed once the controlling legal entity and applicable jurisdictions are confirmed.
            Until then, email <a href={`mailto:${site.email}`}>{site.email}</a> for privacy questions.
          </p>

          <h2>Changes</h2>
          <p>
            This page will be updated when the policy is approved for publication. Last draft note:
            October 2026.
          </p>
        </div>
      </article>
    </>
  );
}
