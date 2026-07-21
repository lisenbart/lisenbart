import { useEffect, useId, useState } from "react";
import { goToContact, sectionIds, site } from "@/data/site";
import { isSiteSubpage, parseHubPage, routes } from "@/lib/routes";
import BrandLogo from "./BrandLogo";

const pillLinks = [
  { href: routes.home, id: "home" as const, label: "Home" },
  { href: routes.film, id: "film" as const, label: "Film" },
  { href: routes.commercial, id: "commercial" as const, label: "Commercial" },
  { href: `#${sectionIds.contact}`, id: "contact" as const, label: "Contact" },
] as const;

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  useEffect(() => {
    const onResize = () => {
      if (window.matchMedia("(min-width: 768px)").matches) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const onSubpage = isSiteSubpage();
  const activeHub = parseHubPage();

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header fixed top-0 inset-x-0 z-50 w-full max-w-full">
      <nav
        className={`site-header-nav${scrolled ? " site-header-nav--scrolled" : ""}`}
        aria-label="Main navigation"
      >
        <div className="site-header-bar">
          <div className="site-header-bar__start">
            <a
              href={onSubpage ? routes.home : "#top"}
              className="site-brand-lockup flex min-w-0 items-center"
              aria-label={`${site.brand} home`}
              onClick={
                onSubpage
                  ? undefined
                  : (e) => {
                      e.preventDefault();
                      closeMenu();
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }
              }
            >
              <BrandLogo variant="header" />
            </a>
          </div>

          <div className="header-nav-pill" aria-label="Primary">
            {pillLinks.map((link) => {
              const isHome = link.id === "home";
              const isContact = link.id === "contact";
              const isActive =
                (isHome && !onSubpage) ||
                (link.id === "film" && activeHub === "film") ||
                (link.id === "commercial" && activeHub === "commercial");

              if (isContact) {
                return (
                  <button
                    key={link.id}
                    type="button"
                    className="header-nav-pill__link"
                    onClick={() => goToContact()}
                  >
                    {link.label}
                  </button>
                );
              }

              const href = isHome && !onSubpage ? "#top" : isHome ? routes.home : link.href;

              return (
                <a
                  key={link.id}
                  href={href}
                  className={`header-nav-pill__link${isActive ? " is-active" : ""}${
                    link.id === "film" ? " header-nav-pill__link--film" : ""
                  }${link.id === "commercial" ? " header-nav-pill__link--commercial" : ""}`}
                  aria-current={isActive ? "page" : undefined}
                  onClick={
                    isHome && !onSubpage
                      ? (e) => {
                          e.preventDefault();
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }
                      : undefined
                  }
                >
                  {link.label}
                </a>
              );
            })}
          </div>

          <div className="site-header-bar__end">
            <button
              type="button"
              className="header-menu-toggle"
              aria-expanded={menuOpen}
              aria-controls={menuId}
              onClick={() => setMenuOpen((v) => !v)}
            >
              {menuOpen ? "Close" : "Menu"}
            </button>
            <button type="button" onClick={() => goToContact()} className="site-header-cta">
              {site.ctaLabel}
            </button>
          </div>
        </div>

        <div
          id={menuId}
          className={`header-mobile-panel${menuOpen ? " is-open" : ""}`}
          hidden={!menuOpen}
        >
          <div className="header-mobile-panel__list">
            {pillLinks.map((link) => {
              const isHome = link.id === "home";
              const isContact = link.id === "contact";
              const isActive =
                (isHome && !onSubpage) ||
                (link.id === "film" && activeHub === "film") ||
                (link.id === "commercial" && activeHub === "commercial");

              if (isContact) {
                return (
                  <button
                    key={link.id}
                    type="button"
                    className="header-mobile-panel__link"
                    onClick={() => {
                      closeMenu();
                      goToContact();
                    }}
                  >
                    {link.label}
                  </button>
                );
              }

              const href = isHome && !onSubpage ? "#top" : isHome ? routes.home : link.href;

              return (
                <a
                  key={link.id}
                  href={href}
                  className={`header-mobile-panel__link${isActive ? " is-active" : ""}`}
                  aria-current={isActive ? "page" : undefined}
                  onClick={
                    isHome && !onSubpage
                      ? (e) => {
                          e.preventDefault();
                          closeMenu();
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }
                      : closeMenu
                  }
                >
                  {link.label}
                </a>
              );
            })}
          </div>
        </div>
      </nav>
    </header>
  );
}
