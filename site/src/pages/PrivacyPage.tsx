import { SEO } from "@/components/SEO";
import {
  legalConfig,
  shouldTreatPoliciesAsDraft,
} from "@/data/legal";
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
        <div className="legal-doc__inner">
        <div className="page-title-row">
          <h1>{meta.title}</h1>
        </div>

        {draft ? (
          <p className="legal-doc__banner" role="status">
            Draft for review — not an approved policy. Do not treat as a binding privacy notice until
            published.
          </p>
        ) : null}

        <div className="legal-doc__body">
          <p>
            This notice describes how <strong>{site.brand}</strong> handles information related to
            lisenbart.com, based on how the website actually works today.
          </p>

          <h2>Who we are</h2>
          <p>
            LISENBART FILM is an independent animation studio. Public contact:{" "}
            <a href={`mailto:${site.email}`}>{site.email}</a>.
          </p>
          <p>
            Registered presence (as published in the site footer):
          </p>
          <ul>
            <li>
              Canada — {legalConfig.canada.legalName}; {legalConfig.canada.cityLine};{" "}
              {legalConfig.canada.registrationLine}.
            </li>
            <li>
              Ukraine — {legalConfig.ukraine.legalName}; {legalConfig.ukraine.addressLine},{" "}
              {legalConfig.ukraine.cityLine}; {legalConfig.ukraine.registrationLine}.
            </li>
          </ul>
          <p>
            {/* REVIEW REQUIRED: nominate the primary data controller / lead entity for GDPR/PIPEDA
                correspondence if different from the public contact email. */}
            <em>REVIEW REQUIRED:</em> Confirm which entity is the primary data controller for
            website enquiries if Canada and Ukraine entities share operations.
          </p>

          <h2>Information you send us</h2>
          <p>
            The contact form may collect your name, email address, selected project type, and
            message. We use that information to respond to project enquiries. Please do not submit
            sensitive personal data through the form.
          </p>
          <p>
            Form submissions are processed via <strong>Netlify Forms</strong> on our hosting
            provider (Netlify). Message content may be emailed to the studio for follow-up.
          </p>

          <h2>Analytics</h2>
          <p>
            Optional <strong>Google Analytics 4</strong> (measurement ID G-ZB7KBQMZ6T) may load
            after you accept analytics cookies in the site consent prompt. If you reject analytics,
            GA4 is not initialized by this site.
          </p>
          <p>
            {/* REVIEW REQUIRED: lawful basis for analytics (consent vs legitimate interest) per
                jurisdiction. */}
            <em>REVIEW REQUIRED:</em> Confirm the lawful basis for analytics in each market you
            actively serve.
          </p>

          <h2>Embedded media and third parties</h2>
          <ul>
            <li>
              <strong>Vimeo</strong> — showreel playback may load Vimeo players when you choose to
              watch a reel.
            </li>
            <li>
              <strong>Google Fonts</strong> — typefaces are requested from Google Fonts.
            </li>
            <li>
              External links (YouTube, TikTok, Instagram, IMDb, partner sites) are controlled by
              those services when you leave lisenbart.com.
            </li>
          </ul>

          <h2>Browser storage</h2>
          <ul>
            <li>
              <strong>localStorage</strong> — theme preference; analytics consent choice
              (<code> lisenbart-analytics-consent</code>).
            </li>
            <li>
              <strong>sessionStorage</strong> — short-lived contact-form prefill when arriving from
              an on-site CTA.
            </li>
          </ul>

          <h2>Retention and rights</h2>
          <p>
            {/* REVIEW REQUIRED: retention schedule for Netlify form submissions and email threads. */}
            <em>REVIEW REQUIRED:</em> Document how long enquiry emails and Netlify form records are
            retained. Until then, email <a href={`mailto:${site.email}`}>{site.email}</a> for access
            or deletion requests.
          </p>

          <h2>Changes</h2>
          <p>
            This page will be updated when the policy is approved for publication. Last technical
            draft: October 2026.
          </p>
        </div>
        </div>
      </article>
    </>
  );
}
