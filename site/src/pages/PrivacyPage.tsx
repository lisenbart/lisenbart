import { SEO } from "@/components/SEO";
import { openCookiePreferences } from "@/components/CookieConsent";
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
            <p>Last updated: October 2026</p>

            <h2>Who we are</h2>
            <p>
              lisenbart.com is operated by {legalConfig.ukraine.legalName},{" "}
              {legalConfig.ukraine.addressLine}, {legalConfig.ukraine.cityLine},{" "}
              {legalConfig.ukraine.registrationLine} (&quot;we&quot;, &quot;us&quot;). For any
              privacy question, contact{" "}
              <a href={`mailto:${site.email}`}>{site.email}</a>. Full company details:{" "}
              <a href={legalConfig.policies.legal.path}>Legal Information</a>.
            </p>
            <p>
              If your enquiry leads to a project, the contracting entity named in your contract
              processes your data as needed for that contract.
            </p>

            <h2>What we collect and why</h2>
            <p>
              When you send us a message through a contact form, we receive your name, email
              address, the project type you select, your message, and the page of the site you sent
              it from. We use this only to reply to your enquiry and to discuss a possible project
              with you. Where GDPR applies, the legal basis is our legitimate interest in responding
              to enquiries and taking steps at your request before entering into a contract. Please
              do not send sensitive personal data through the form.
            </p>

            <h2>Analytics</h2>
            <p>
              If you accept analytics in the cookie prompt, we use Google Analytics 4 to understand
              how the site is used in aggregate. If you reject it, Google Analytics is not loaded.
              You can change your choice at any time via{" "}
              <button type="button" className="legal-doc__text-btn" onClick={() => openCookiePreferences()}>
                Cookie preferences
              </button>
              . The legal basis for analytics is your consent.
            </p>

            <h2>Service providers</h2>
            <p>
              We use the following providers, which may process data on our behalf or when you use
              their features:
            </p>
            <ul>
              <li>
                <strong>Netlify</strong> — website hosting and processing of contact form
                submissions.
              </li>
              <li>
                <strong>Google</strong> — Google Analytics (only with your consent) and Google Fonts.
              </li>
              <li>
                <strong>Vimeo</strong> — playback of films and showreels when you press play.
              </li>
              <li>
                <strong>YouTube</strong> (privacy-enhanced mode) — playback of some videos when you
                press play.
              </li>
            </ul>
            <p>
              Links to external sites (YouTube, Instagram, TikTok, IMDb, SWEET.TV and partner sites)
              are governed by those services&apos; own policies.
            </p>

            <h2>International transfers</h2>
            <p>
              Some of these providers process data outside your country, including in the United
              States. We rely on the safeguards these providers offer for international transfers.
            </p>

            <h2>How long we keep data</h2>
            <p>
              We keep enquiries for up to 24 months after our last contact, unless they lead to a
              project — then we keep what is needed for the project and our legal obligations.
              Analytics data is kept according to our Google Analytics retention settings.
            </p>

            <h2>Your rights</h2>
            <p>
              You can ask us to access, correct or delete your personal data, to restrict or object
              to its processing, and to receive a copy of it. You can withdraw your consent to
              analytics at any time. Write to{" "}
              <a href={`mailto:${site.email}`}>{site.email}</a> — we will reply within 30 days. You
              also have the right to complain to the data protection authority in your country.
            </p>

            <h2>Children</h2>
            <p>
              This website is intended for businesses and professionals and is not directed at
              children.
            </p>

            <h2>Changes</h2>
            <p>We may update this policy. The date above shows the latest version.</p>
          </div>
        </div>
      </article>
    </>
  );
}
