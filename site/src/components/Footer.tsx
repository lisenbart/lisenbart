import {
  legalConfig,
  shouldLinkDraftPolicies,
  shouldShowLegalPlaceholders,
  shouldShowVerifiedLegalDetails,
  type RegisteredPresence,
} from "@/data/legal";
import { goToContact, site } from "@/data/site";
import { hubCanonicalHref, routes } from "@/lib/routes";

function PresenceBlock({
  presence,
  verified,
}: {
  presence: RegisteredPresence;
  verified: boolean;
}) {
  return (
    <div className="film-footer__presence">
      <h3 className="film-footer__country">{presence.countryLabel}</h3>
      {verified ? (
        <address className="film-footer__address">
          <span>{presence.legalName}</span>
          <span>{presence.addressLine}</span>
          <span>{presence.cityLine}</span>
          <span>{presence.registrationLine}</span>
        </address>
      ) : (
        <address className="film-footer__address film-footer__address--placeholder">
          <span>{presence.legalName}</span>
          <span>{presence.addressLine}</span>
          <span>{presence.cityLine}</span>
          <span>{presence.registrationLine}</span>
        </address>
      )}
    </div>
  );
}

export default function Footer() {
  const showPlaceholders = shouldShowLegalPlaceholders();
  const showVerified = shouldShowVerifiedLegalDetails();
  const showPolicies = shouldLinkDraftPolicies();
  const showLegalLevel = showPlaceholders || showVerified;

  return (
    <footer className="film-footer">
      <div className="film-footer__inner">
        <div className="film-footer__level film-footer__level--brand">
          <div className="film-footer__identity">
            <a className="film-footer__brand" href={routes.home}>
              {site.brand}
            </a>
            <p className="film-footer__descriptor">{legalConfig.brandDescriptor}</p>
            <a className="film-footer__email" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </div>

          <nav className="film-footer__nav" aria-label="Footer">
            {site.primaryNav.map((link) =>
              link.id === "contact" ? (
                <a
                  key={link.id}
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    goToContact();
                  }}
                >
                  {link.label}
                </a>
              ) : (
                <a key={link.id} href={hubCanonicalHref(link.id)}>
                  {link.label}
                </a>
              ),
            )}
          </nav>
        </div>

        <div className="film-footer__level film-footer__level--legal">
          <p className="film-footer__legal-label">{legalConfig.legalSectionLabel}</p>

          {showLegalLevel ? (
            <>
              <div className="film-footer__presence-grid">
                <PresenceBlock presence={legalConfig.canada} verified={showVerified} />
                <PresenceBlock presence={legalConfig.ukraine} verified={showVerified} />
              </div>
              {showPlaceholders ? (
                <p className="film-footer__pending">{legalConfig.pendingNote}</p>
              ) : null}
            </>
          ) : (
            <div className="film-footer__presence-soft">
              <p>{legalConfig.presenceSummary}</p>
              <p>
                {legalConfig.presenceContactHint}{" "}
                <a href={`mailto:${site.email}`}>{site.email}</a>.
              </p>
            </div>
          )}
        </div>

        <div className="film-footer__level film-footer__level--bar">
          <p className="film-footer__copy">
            © {legalConfig.copyrightYear} {site.brand}
          </p>
          {showPolicies ? (
            <nav className="film-footer__policies" aria-label="Legal">
              <a href={legalConfig.policies.privacy.path}>{legalConfig.policies.privacy.title}</a>
              <a href={legalConfig.policies.cookies.path}>{legalConfig.policies.cookies.title}</a>
            </nav>
          ) : null}
        </div>
      </div>
    </footer>
  );
}
