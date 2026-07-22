import { useEffect, useId, useState } from "react";
import { MessageSquare } from "lucide-react";
import { goToContact, sectionIds, site } from "@/data/site";
import { isSiteSubpage, parseHubPage, routes } from "@/lib/routes";
import BrandLogo from "./BrandLogo";

type NavId = (typeof site.primaryNav)[number]["id"];

function navHref(id: NavId, onSubpage: boolean) {
  if (id === "film") return routes.film;
  if (id === "commercial") return routes.commercial;
  return onSubpage ? `${routes.home}#${sectionIds.about}` : `#${sectionIds.about}`;
}

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

  const isActive = (id: NavId) => {
    if (id === "film") return activeHub === "film";
    if (id === "commercial") return activeHub === "commercial";
    return false;
  };

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
            {site.primaryNav.map((link) => {
              const href = navHref(link.id, onSubpage);
              const aboutOnHome = link.id === "about" && !onSubpage;

              return (
                <a
                  key={link.id}
                  href={href}
                  className={`header-nav-pill__link${isActive(link.id) ? " is-active" : ""}${
                    link.id === "film" ? " header-nav-pill__link--film" : ""
                  }${link.id === "commercial" ? " header-nav-pill__link--commercial" : ""}`}
                  aria-current={isActive(link.id) ? "page" : undefined}
                  onClick={
                    aboutOnHome
                      ? (e) => {
                          e.preventDefault();
                          closeMenu();
                          document.getElementById(sectionIds.about)?.scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                          });
                        }
                      : closeMenu
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
            <button
              type="button"
              onClick={() => {
                closeMenu();
                goToContact();
              }}
              className="site-header-cta"
              aria-label={site.ctaLabel}
            >
              <MessageSquare
                className="site-header-cta__icon"
                size={18}
                strokeWidth={1.75}
                color="#fff"
                aria-hidden="true"
              />
              <span className="site-header-cta__label">{site.ctaLabel}</span>
            </button>
          </div>
        </div>

        <div
          id={menuId}
          className={`header-mobile-panel${menuOpen ? " is-open" : ""}`}
          hidden={!menuOpen}
        >
          <div className="header-mobile-panel__list">
            {site.primaryNav.map((link) => {
              const href = navHref(link.id, onSubpage);
              const aboutOnHome = link.id === "about" && !onSubpage;

              return (
                <a
                  key={link.id}
                  href={href}
                  className={`header-mobile-panel__link${isActive(link.id) ? " is-active" : ""}`}
                  aria-current={isActive(link.id) ? "page" : undefined}
                  onClick={
                    aboutOnHome
                      ? (e) => {
                          e.preventDefault();
                          closeMenu();
                          document.getElementById(sectionIds.about)?.scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                          });
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
