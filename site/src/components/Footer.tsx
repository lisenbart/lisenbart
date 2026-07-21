import { contactHref, goToContact, site, scrollToSection, sectionIds } from "@/data/site";
import { isSiteSubpage, routes } from "@/lib/routes";
import SocialIconLinks from "./SocialIconLinks";
import BrandLogo from "./BrandLogo";

const navLinks = [
  { id: sectionIds.showreel, label: "Showreel" },
  { id: sectionIds.about, label: "About" },
  { id: sectionIds.contact, label: "Contact" },
];

const socialLinks = [
  { label: "Email", href: `mailto:${site.email}` },
  { label: "WhatsApp", href: site.social.whatsapp.href, external: true as const },
  { label: "LinkedIn", href: site.linkedin, external: true as const },
  { label: "Facebook", href: site.social.facebook.href, external: true as const },
  { label: "YouTube", href: site.youtube, external: true as const },
];

function FooterSectionLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="text-sm font-light text-text-secondary transition-colors hover:text-text-primary"
    >
      {label}
    </a>
  );
}

function FooterLink({ id, label }: { id: string; label: string }) {
  const onSubpage = isSiteSubpage();
  const isContact = id === sectionIds.contact;

  return (
    <a
      href={isContact ? contactHref() : onSubpage ? `${routes.home}#${id}` : `#${id}`}
      className="text-sm font-light text-text-secondary transition-colors hover:text-text-primary"
      onClick={
        isContact || !onSubpage
          ? (e) => {
              e.preventDefault();
              if (isContact) goToContact();
              else scrollToSection(id);
            }
          : undefined
      }
    >
      {label}
    </a>
  );
}

export default function Footer() {
  const onSubpage = isSiteSubpage();

  return (
    <footer className="w-full max-w-full min-w-0 overflow-x-clip px-[var(--page-padding)] pb-24 pt-7 md:pb-12 md:pt-14">
      <div className="mx-auto w-full min-w-0 max-w-[920px]">
        <article className="how-ios-card">
          <div className="how-ios-card-inner">
            <div className="grid gap-5 md:grid-cols-[minmax(0,1.4fr)_minmax(0,0.8fr)_minmax(0,0.8fr)] md:gap-8 lg:gap-12">
              <div className="min-w-0">
                <a
                  href={onSubpage ? routes.home : "#top"}
                  className="inline-flex min-w-0 flex-col gap-1 md:gap-2"
                  aria-label={`${site.name} home`}
                  onClick={
                    onSubpage
                      ? undefined
                      : (e) => {
                          e.preventDefault();
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }
                  }
                >
                  <BrandLogo variant="footer" />
                  <span className="site-logo-tagline font-sans uppercase leading-snug text-text-tertiary">
                    <span className="block">{site.tagline.line1}</span>
                    {site.tagline.line2 ? (
                      <span className="block">{site.tagline.line2}</span>
                    ) : null}
                  </span>
                </a>
                <SocialIconLinks className="mt-4 md:mt-5" size="md" />
                <p className="mt-3 hidden max-w-sm text-sm font-light leading-relaxed text-text-secondary md:block">
                  {site.meta.description}
                </p>
                <button
                  type="button"
                  onClick={() => goToContact()}
                  className="gradient-button-emerald btn-on-accent mt-4 hidden rounded-full px-5 py-2.5 text-xs font-medium tracking-wide sm:inline-flex md:mt-6 md:text-sm"
                >
                  {site.ctaLabel}
                </button>
              </div>

              <div className="grid grid-cols-2 gap-x-4 gap-y-0 md:contents">
                <nav aria-label="Footer navigation">
                  <p className="footer-section-label text-[10px] font-medium uppercase tracking-[0.14em] md:text-[11px]">
                    Navigate
                  </p>
                  <ul className="mt-2 flex flex-col gap-1.5 md:mt-4 md:gap-3">
                    {navLinks.map((link) => (
                      <li key={link.id}>
                        <FooterLink id={link.id} label={link.label} />
                      </li>
                    ))}
                    <li>
                      <FooterSectionLink href={routes.film} label="Film" />
                    </li>
                    <li>
                      <FooterSectionLink href={routes.commercial} label="Commercial" />
                    </li>
                  </ul>
                </nav>

                <nav aria-label="Social links">
                  <p className="footer-section-label text-[10px] font-medium uppercase tracking-[0.14em] md:text-[11px]">
                    Connect
                  </p>
                  <ul className="mt-2 flex flex-col gap-1.5 md:mt-4 md:gap-3">
                    {socialLinks.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          className="text-sm font-light text-text-secondary transition-colors hover:text-text-primary"
                          {...("external" in link && link.external
                            ? { target: "_blank", rel: "noopener noreferrer" }
                            : {})}
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>

            <div className="mt-5 flex flex-row items-center justify-between gap-3 border-t border-[var(--separator)] pt-4 text-[10px] font-light text-text-secondary/80 md:mt-10 md:pt-6 md:text-[11px]">
              <span className="truncate">{site.locations}</span>
              <span className="shrink-0">
                © {new Date().getFullYear()} {site.name}
              </span>
            </div>
          </div>
        </article>
      </div>
    </footer>
  );
}
