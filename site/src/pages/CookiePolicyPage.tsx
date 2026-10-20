import { SEO } from "@/components/SEO";
import { legalConfig, shouldTreatPoliciesAsDraft } from "@/data/legal";
import { site } from "@/data/site";

const meta = legalConfig.policies.cookies;

export default function CookiePolicyPage() {
  const draft = shouldTreatPoliciesAsDraft();

  return (
    <>
      <SEO
        title={draft ? meta.seoTitle : "Cookie Policy — LISENBART FILM"}
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
            Draft for review — not an approved cookie notice. No cookie preference centre is provided
            on this site yet.
          </p>
        ) : null}

        <div className="legal-doc__body">
          <p>
            This draft explains cookies and similar technologies used on lisenbart.com. It does not
            claim a consent banner or preference controls that are not actually present.
          </p>

          <h2>What we use today</h2>
          <p>
            The site includes Google Analytics via Google Tag Manager / gtag (measurement ID present
            in the site shell). Analytics cookies or local storage may be set by Google according to
            their configuration.
          </p>

          <h2>Essential storage</h2>
          <p>
            The contact form and UI may use session or local browser storage for form prefill and
            basic site behaviour. These are functional, not advertising cookies.
          </p>

          <h2>Consent controls</h2>
          <p>
            A cookie settings / consent-management UI is <strong>not implemented</strong>. Linking
            “Cookie Settings” without a working control would be misleading, so it is omitted from
            the footer until a real consent flow exists.
          </p>

          <h2>Managing cookies</h2>
          <p>
            You can clear or block cookies through your browser settings. Blocking analytics may
            limit our ability to understand aggregate traffic.
          </p>

          <h2>Contact</h2>
          <p>
            Questions: <a href={`mailto:${site.email}`}>{site.email}</a>. Last draft note: October
            2026.
          </p>
        </div>
      </article>
    </>
  );
}
