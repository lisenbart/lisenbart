import { SEO } from "@/components/SEO";
import { openCookiePreferences } from "@/components/CookieConsent";
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
            <p>Last updated: October 2026</p>

            <p>
              This page explains the cookies and similar technologies used on lisenbart.com and how
              you can control them.
            </p>

            <h2>Essential</h2>
            <ul>
              <li>
                Your analytics choice and your theme preference are stored in your browser&apos;s
                local storage.
              </li>
              <li>
                When you arrive at a contact form from a button on the site, the selected project
                type is stored briefly in session storage to prefill the form.
              </li>
            </ul>
            <p>These are needed for the site to work and are not used for advertising.</p>

            <h2>Analytics (optional)</h2>
            <p>
              Google Analytics 4 loads only if you accept analytics in the cookie prompt. Google may
              then set its own cookies. If you reject analytics, it is not loaded.
            </p>

            <h2>Embedded video</h2>
            <p>
              When you press play on a video, Vimeo or YouTube (privacy-enhanced mode) is loaded and
              may set its own cookies under its own policies. Nothing is loaded from them before you
              press play.
            </p>

            <h2>Fonts</h2>
            <p>
              The site loads fonts from Google Fonts, which receives technical connection data such
              as your IP address.
            </p>

            <h2>Your choices</h2>
            <p>You can change your choice at any time:</p>
            <p>
              <button
                type="button"
                className="legal-doc__prefs-btn"
                onClick={() => openCookiePreferences()}
              >
                Cookie preferences
              </button>
            </p>
            <p>You can also clear or block cookies in your browser settings.</p>

            <h2>Contact</h2>
            <p>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </p>
          </div>
        </div>
      </article>
    </>
  );
}
