import {
  jurisdictionRenderMode,
  legalConfig,
  shouldLinkDraftPolicies,
  type RegisteredPresence,
} from "@/data/legal";
import { goToContact, site } from "@/data/site";
import { hubCanonicalHref, routes } from "@/lib/routes";

function PresenceBlock({ presence }: { presence: RegisteredPresence }) {
  const mode = jurisdictionRenderMode(presence);

  return (
    <div className="film-footer__presence">
      <h3 className="film-footer__country">{presence.countryLabel}</h3>

      {mode === "verified" ? (
        <address className="film-footer__address">
          <span>{presence.legalName}</span>
          <span>{presence.addressLine}</span>
          <span>{presence.cityLine}</span>
          <span>{presence.registrationLine}</span>
        </address>
      ) : null}

      {mode === "placeholder" ? (
        <address className="film-footer__address film-footer__address--placeholder">
          <span>{presence.legalName}</span>
          <span>{presence.addressLine}</span>
          <span>{presence.cityLine}</span>
          <span>{presence.registrationLine}</span>
        </address>
      ) : null}

      {mode === "soft" ? (
        <p className="film-footer__jurisdiction-pending">{legalConfig.pendingNote}</p>
      ) : null}
    </div>
  );
}

export default function Footer() {
  const showPolicies = shouldLinkDraftPolicies();
  const showPendingNote =
    jurisdictionRenderMode(legalConfig.canada) === "placeholder" ||
    jurisdictionRenderMode(legalConfig.ukraine) === "placeholder";

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

          <div className="film-footer__presence-grid">
            <PresenceBlock presence={legalConfig.canada} />
            <PresenceBlock presence={legalConfig.ukraine} />
          </div>

          {showPendingNote ? (
            <p className="film-footer__pending">{legalConfig.pendingNote}</p>
          ) : null}
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
