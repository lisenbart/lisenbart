import { useEffect, useState } from "react";
import { Moon, Send, Sun } from "lucide-react";
import { goToContact, site } from "@/data/site";
import { isSiteSubpage, parseHubPage, routes } from "@/lib/routes";
import { useTheme } from "@/hooks/useTheme";
import HeaderConnectMenu from "./HeaderConnectMenu";
import SocialIconLinks from "./SocialIconLinks";
import BrandLogo from "./BrandLogo";

const hubLinks = [
  { href: routes.film, slug: "film" as const, label: "Film" },
  { href: routes.commercial, slug: "commercial" as const, label: "Commercial" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onSubpage = isSiteSubpage();
  const activeHub = parseHubPage();

  return (
    <header className="fixed top-0 inset-x-0 z-50 w-full max-w-full overflow-x-clip">
      <nav
        className={`site-header-nav transition-colors duration-300${scrolled ? " site-header-nav--scrolled" : ""}`}
        aria-label="Main navigation"
      >
        <div className="mx-auto flex h-[4.25rem] w-full min-w-0 max-w-[1440px] items-center gap-2 px-[var(--page-padding)] md:h-16 md:gap-4">
          <div className="flex min-w-0 flex-1 items-center gap-2 md:gap-3">
            <button
              type="button"
              className="theme-toggle shrink-0"
              onClick={toggleTheme}
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              {theme === "dark" ? <Sun size={18} strokeWidth={1.75} /> : <Moon size={18} strokeWidth={1.75} />}
            </button>
            <a
              href={onSubpage ? routes.home : "#top"}
              className="site-brand-lockup relative z-10 flex min-w-0 shrink items-center"
              aria-label={`${site.brand} home`}
              onClick={
                onSubpage
                  ? undefined
                  : (e) => {
                      e.preventDefault();
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }
              }
            >
              <BrandLogo variant="header" />
            </a>
            <div className="header-hub-nav" aria-label="Sections">
              {hubLinks.map((link) => {
                const isActive = activeHub === link.slug;
                return (
                  <a
                    key={link.slug}
                    href={link.href}
                    className={`header-hub-nav__link${isActive ? " is-active" : ""}`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {link.label}
                  </a>
                );
              })}
            </div>
          </div>

          <div className="ml-auto flex shrink-0 items-center gap-1.5 md:gap-2">
            <div className="header-desktop-social hidden min-w-0 items-center gap-1.5 lg:flex lg:gap-2">
              <a
                href={`mailto:${site.email}`}
                className="theme-toggle shrink-0"
                aria-label={`Email ${site.email}`}
              >
                <Send size={18} strokeWidth={1.75} aria-hidden="true" />
              </a>
              <SocialIconLinks className="min-w-0" />
            </div>
            <HeaderConnectMenu />
            <button
              type="button"
              onClick={() => goToContact()}
              className="gradient-button-emerald btn-on-accent hidden rounded-full px-4 py-2 text-[11px] font-medium uppercase tracking-[0.1em] lg:inline-flex xl:px-5 xl:text-[13px]"
            >
              {site.ctaLabel}
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
