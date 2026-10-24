import { SEO } from "@/components/SEO";
import { openCookiePreferences } from "@/components/CookieConsent";
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
        <div className="legal-doc__inner">
        <div className="page-title-row">
          <h1>{meta.title}</h1>
        </div>

        {draft ? (
          <p className="legal-doc__banner" role="status">
            Draft for review — not an approved cookie notice until published.
          </p>
        ) : null}

        <div className="legal-doc__body">
          <p>
            This page describes cookies and similar technologies used on lisenbart.com and how you
            can control optional analytics.
          </p>

          <h2>Essential / functional</h2>
          <ul>
            <li>
              Contact-form prefill uses <strong>sessionStorage</strong> briefly when you arrive from
              an on-site CTA.
            </li>
            <li>
              Theme preference and analytics consent are stored in <strong>localStorage</strong>.
            </li>
          </ul>
          <p>These are needed for basic site behaviour and are not advertising cookies.</p>

          <h2>Optional analytics</h2>
          <p>
            <strong>Google Analytics 4</strong> (G-ZB7KBQMZ6T) loads only if you accept analytics in
            the consent prompt. Rejecting analytics prevents this site from initializing GA4.
          </p>
          <p>
            Google may set its own cookies or identifiers according to Google’s configuration when
            analytics is accepted.
          </p>

          <h2>Embedded media</h2>
          <p>
            Choosing to play a showreel may load <strong>Vimeo</strong>, which can set cookies or
            similar technologies under Vimeo’s policies.
          </p>

          <h2>Fonts</h2>
          <p>
            The site requests fonts from <strong>Google Fonts</strong>, which may process connection
            data according to Google’s practices.
          </p>

          <h2>Your choices</h2>
          <p>
            Use the consent prompt on first visit, or reopen preferences anytime:
          </p>
          <p>
            <button type="button" className="legal-doc__prefs-btn" onClick={() => openCookiePreferences()}>
              Cookie preferences
            </button>
          </p>
          <p>
            You can also clear or block cookies in your browser settings. Blocking analytics may
            limit aggregate traffic measurement.
          </p>

          <h2>Contact</h2>
          <p>
            Questions: <a href={`mailto:${site.email}`}>{site.email}</a>. Last technical draft:
            October 2026.
          </p>
        </div>
        </div>
      </article>
    </>
  );
}
