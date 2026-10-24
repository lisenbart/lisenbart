import { openCookiePreferences } from "@/components/CookieConsent";
import { legalConfig, type RegisteredPresence } from "@/data/legal";
import type { LegalDocKind } from "@/lib/legalDocEvents";
import { site } from "@/data/site";

export type { LegalDocKind };

export function legalDocTitle(kind: LegalDocKind): string {
  if (kind === "legal") return legalConfig.policies.legal.pageTitle;
  if (kind === "privacy") return legalConfig.policies.privacy.title;
  return legalConfig.policies.cookies.title;
}

function EntityBlock({ presence }: { presence: RegisteredPresence }) {
  return (
    <section className="legal-doc__entity" aria-labelledby={`legal-${presence.countryLabel}`}>
      <h2 id={`legal-${presence.countryLabel}`}>{presence.countryLabel}</h2>
      <address className="legal-doc__address">
        <span className="legal-doc__entity-name">{presence.legalName}</span>
        <span>{presence.addressLine}</span>
        <span>{presence.cityLine}</span>
        <span>{presence.registrationLine}</span>
      </address>
    </section>
  );
}

export function LegalInfoBody() {
  return (
    <>
      <p>
        Registered business information for <strong>{site.brand}</strong>. Public contact:{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>

      <div className="legal-doc__entities">
        <EntityBlock presence={legalConfig.canada} />
        <EntityBlock presence={legalConfig.ukraine} />
      </div>
    </>
  );
}

export function PrivacyPolicyBody({
  onOpenLegal,
}: {
  onOpenLegal?: () => void;
}) {
  return (
    <>
      <p>Last updated: October 2026</p>

      <h2>Who we are</h2>
      <p>
        lisenbart.com is operated by {legalConfig.ukraine.legalName},{" "}
        {legalConfig.ukraine.addressLine}, {legalConfig.ukraine.cityLine},{" "}
        {legalConfig.ukraine.registrationLine} (&quot;we&quot;, &quot;us&quot;). For any privacy
        question, contact <a href={`mailto:${site.email}`}>{site.email}</a>. Full company details:{" "}
        {onOpenLegal ? (
          <button type="button" className="legal-doc__text-btn" onClick={onOpenLegal}>
            Legal Information
          </button>
        ) : (
          <a href={legalConfig.policies.legal.path}>Legal Information</a>
        )}
        .
      </p>
      <p>
        If your enquiry leads to a project, the contracting entity named in your contract processes
        your data as needed for that contract.
      </p>

      <h2>What we collect and why</h2>
      <p>
        When you send us a message through a contact form, we receive your name, email address, the
        project type you select, your message, and the page of the site you sent it from. We use this
        only to reply to your enquiry and to discuss a possible project with you. Where GDPR
        applies, the legal basis is our legitimate interest in responding to enquiries and taking
        steps at your request before entering into a contract. Please do not send sensitive personal
        data through the form.
      </p>

      <h2>Analytics</h2>
      <p>
        If you accept analytics in the cookie prompt, we use Google Analytics 4 to understand how
        the site is used in aggregate. If you reject it, Google Analytics is not loaded. You can
        change your choice at any time via{" "}
        <button
          type="button"
          className="legal-doc__text-btn"
          onClick={() => openCookiePreferences()}
        >
          Cookie preferences
        </button>
        . The legal basis for analytics is your consent.
      </p>

      <h2>Service providers</h2>
      <p>
        We use the following providers, which may process data on our behalf or when you use their
        features:
      </p>
      <ul>
        <li>
          <strong>Netlify</strong> — website hosting and processing of contact form submissions.
        </li>
        <li>
          <strong>Google</strong> — Google Analytics (only with your consent) and Google Fonts.
        </li>
        <li>
          <strong>Vimeo</strong> — playback of films and showreels when you press play.
        </li>
        <li>
          <strong>YouTube</strong> (privacy-enhanced mode) — playback of some videos when you press
          play.
        </li>
      </ul>
      <p>
        Links to external sites (YouTube, Instagram, TikTok, IMDb, SWEET.TV and partner sites) are
        governed by those services&apos; own policies.
      </p>

      <h2>International transfers</h2>
      <p>
        Some of these providers process data outside your country, including in the United States.
        We rely on the safeguards these providers offer for international transfers.
      </p>

      <h2>How long we keep data</h2>
      <p>
        We keep enquiries for up to 24 months after our last contact, unless they lead to a project
        — then we keep what is needed for the project and our legal obligations. Analytics data is
        kept according to our Google Analytics retention settings.
      </p>

      <h2>Your rights</h2>
      <p>
        You can ask us to access, correct or delete your personal data, to restrict or object to its
        processing, and to receive a copy of it. You can withdraw your consent to analytics at any
        time. Write to <a href={`mailto:${site.email}`}>{site.email}</a> — we will reply within 30
        days. You also have the right to complain to the data protection authority in your country.
      </p>

      <h2>Children</h2>
      <p>
        This website is intended for businesses and professionals and is not directed at children.
      </p>

      <h2>Changes</h2>
      <p>We may update this policy. The date above shows the latest version.</p>
    </>
  );
}

export function CookiePolicyBody() {
  return (
    <>
      <p>Last updated: October 2026</p>

      <p>
        This page explains the cookies and similar technologies used on lisenbart.com and how you
        can control them.
      </p>

      <h2>Essential</h2>
      <ul>
        <li>
          Your analytics choice and your theme preference are stored in your browser&apos;s local
          storage.
        </li>
        <li>
          When you arrive at a contact form from a button on the site, the selected project type is
          stored briefly in session storage to prefill the form.
        </li>
      </ul>
      <p>These are needed for the site to work and are not used for advertising.</p>

      <h2>Analytics (optional)</h2>
      <p>
        Google Analytics 4 loads only if you accept analytics in the cookie prompt. Google may then
        set its own cookies. If you reject analytics, it is not loaded.
      </p>

      <h2>Embedded video</h2>
      <p>
        When you press play on a video, Vimeo or YouTube (privacy-enhanced mode) is loaded and may
        set its own cookies under its own policies. Nothing is loaded from them before you press
        play.
      </p>

      <h2>Fonts</h2>
      <p>
        The site loads fonts from Google Fonts, which receives technical connection data such as
        your IP address.
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
    </>
  );
}
