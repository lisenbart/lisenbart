import type { MouseEvent } from "react";
import { site, sectionIds } from "@/data/site";
import { isSiteSubpage, routes } from "@/lib/routes";
import BrandLogo from "./BrandLogo";

const IMDB_PROFILE = site.imdb;

function FooterNavLink({
  href,
  label,
  onClick,
}: {
  href: string;
  label: string;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
}) {
  return (
    <a
      href={href}
      className="text-sm font-light text-text-secondary transition-colors hover:text-text-primary"
      onClick={onClick}
    >
      {label}
    </a>
  );
}

export default function Footer() {
  const onSubpage = isSiteSubpage();

  const connectLinks = [
    { label: "Email", href: `mailto:${site.email}` },
    { label: "LinkedIn", href: site.linkedin, external: true as const },
    { label: "YouTube", href: site.youtube, external: true as const },
    { label: "IMDb", href: IMDB_PROFILE, external: true as const },
  ];

  return (
    <footer className="w-full max-w-full min-w-0 overflow-x-clip px-[var(--page-padding)] pb-24 pt-7 md:pb-12 md:pt-14">
      <div className="mx-auto w-full min-w-0 max-w-[920px]">
        <article className="how-ios-card">
          <div className="how-ios-card-inner">
            <div className="grid gap-5 md:grid-cols-[minmax(0,1.4fr)_minmax(0,0.8fr)_minmax(0,0.8fr)] md:gap-8 lg:gap-12">
              <div className="min-w-0">
                <a
                  href={onSubpage ? routes.home : "#top"}
                  className="inline-flex min-w-0"
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
                </a>
              </div>

              <div className="grid grid-cols-2 gap-x-4 gap-y-0 md:contents">
                <nav aria-label="Footer navigation">
                  <p className="footer-section-label text-[10px] font-medium uppercase tracking-[0.14em] md:text-[11px]">
                    Navigate
                  </p>
                  <ul className="mt-2 flex flex-col gap-1.5 md:mt-4 md:gap-3">
                    <li>
                      <FooterNavLink href={routes.film} label="Originals" />
                    </li>
                    <li>
                      <FooterNavLink href={routes.commercial} label="Client Work" />
                    </li>
                    <li>
                      <FooterNavLink
                        href={onSubpage ? `${routes.home}#${sectionIds.about}` : `#${sectionIds.about}`}
                        label="About"
                        onClick={
                          onSubpage
                            ? undefined
                            : (e) => {
                                e.preventDefault();
                                document.getElementById(sectionIds.about)?.scrollIntoView({
                                  behavior: "smooth",
                                  block: "start",
                                });
                              }
                        }
                      />
                    </li>
                  </ul>
                </nav>

                <nav aria-label="Connect">
                  <p className="footer-section-label text-[10px] font-medium uppercase tracking-[0.14em] md:text-[11px]">
                    Connect
                  </p>
                  <ul className="mt-2 flex flex-col gap-1.5 md:mt-4 md:gap-3">
                    {connectLinks.map((link) => (
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
