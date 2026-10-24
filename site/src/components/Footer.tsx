import { legalConfig } from "@/data/legal";
import { openCookiePreferences } from "@/components/CookieConsent";
import { contactNavHref, goToContact, site } from "@/data/site";
import { hubCanonicalHref, routes } from "@/lib/routes";

const cultureDefendsHref = `${hubCanonicalHref("about")}#culture-defends`;

export default function Footer() {
  return (
    <footer className="film-footer">
      <div className="film-footer__inner">
        <div className="film-footer__level film-footer__level--brand">
          <div className="film-footer__identity">
            <a className="film-footer__brand" href={routes.home}>
              {site.brand}
            </a>
            <a className="film-footer__email" href={`mailto:${site.email}`}>
              {site.email}
            </a>
            <p className="film-footer__locations">
              Toronto · Kyiv
              <a className="film-footer__tagline" href={cultureDefendsHref}>
                {site.footerTagline}
              </a>
            </p>
          </div>

          <nav className="film-footer__nav" aria-label="Footer">
            {site.footerNav.map((link) =>
              link.id === "contact" ? (
                <a
                  key={link.id}
                  href={contactNavHref()}
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

        <div className="film-footer__level film-footer__level--bar">
          <p className="film-footer__copy">
            © {legalConfig.copyrightYear} {site.brand}
          </p>
          <nav className="film-footer__policies" aria-label="Legal">
            <a href={legalConfig.policies.legal.path}>{legalConfig.policies.legal.title}</a>
            <a href={legalConfig.policies.privacy.path}>{legalConfig.policies.privacy.title}</a>
            <a href={legalConfig.policies.cookies.path}>{legalConfig.policies.cookies.title}</a>
            <button
              type="button"
              className="film-footer__cookie-prefs"
              onClick={() => openCookiePreferences()}
            >
              Cookie preferences
            </button>
          </nav>
        </div>
      </div>
    </footer>
  );
}
