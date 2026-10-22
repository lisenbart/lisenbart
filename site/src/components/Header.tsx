import { useEffect, useId, useRef, useState, type MouseEvent } from "react";
import { contactNavHref, goToContact, site } from "@/data/site";
import {
  hubCanonicalHref,
  isSiteSubpage,
  parseHubPage,
  parseOriginalsProject,
  routes,
} from "@/lib/routes";

type NavId = (typeof site.primaryNav)[number]["id"];

function navHref(id: NavId) {
  if (id === "contact") return contactNavHref();
  return hubCanonicalHref(id);
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  /** TEMP V8: always show hamburger (desktop nav hidden). Restore scroll-dock later. */
  const [navDocked, setNavDocked] = useState(true);
  const menuId = useId();
  const headerRef = useRef<HTMLElement>(null);
  const onSubpage = isSiteSubpage();
  const activeHub = parseHubPage();

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onResize = () => {
      if (window.matchMedia("(min-width: 801px)").matches) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    // TEMP V8: desktop inline nav is off — keep floating hamburger always available
    setNavDocked(true);
  }, []);

  const closeMenu = () => setMenuOpen(false);
  const toggleMenu = () => setMenuOpen((v) => !v);

  const isActive = (id: NavId) => {
    if (id === "contact") return false;
    if (id === "originals" && parseOriginalsProject()) return true;
    return activeHub === id;
  };

  const onNavClick = (id: NavId, e: MouseEvent<HTMLAnchorElement>) => {
    const wasMenuOpen = menuOpen;
    closeMenu();
    if (id !== "contact") return;
    e.preventDefault();
    // Let the mobile menu unlock body scroll before smooth-scrolling to the form.
    const run = () => goToContact();
    if (wasMenuOpen) window.setTimeout(run, 40);
    else run();
  };

  const showFloating = navDocked || menuOpen;

  return (
    <>
      <header ref={headerRef} className="film-header">
        <a
          className={`brand-lockup${onSubpage ? "" : " brand-lockup--hero"}`}
          href={onSubpage ? routes.home : "#top"}
          aria-label={`${site.brand} ${site.studioHome.established} home`}
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
          <span className="brand">{site.brand}</span>
          <span className="brand-est">{site.studioHome.established}</span>
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {site.primaryNav.map((link) => (
            <a
              key={link.id}
              href={navHref(link.id)}
              className={isActive(link.id) ? "active" : undefined}
              aria-current={isActive(link.id) ? "page" : undefined}
              onClick={(e) => onNavClick(link.id, e)}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </header>

      <button
        className={`menu-button${menuOpen ? " open" : ""}${showFloating ? " is-floating" : ""}`}
        type="button"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        aria-controls={menuId}
        aria-hidden={!showFloating}
        tabIndex={showFloating ? 0 : -1}
        onClick={toggleMenu}
      >
        <span />
        <span />
        <span />
      </button>

      <nav
        id={menuId}
        className={`mobile-menu ${menuOpen ? "open" : ""}`}
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
      >
        {site.primaryNav.map((link, index) => (
          <a
            key={link.id}
            href={navHref(link.id)}
            tabIndex={menuOpen ? 0 : -1}
            onClick={(e) => onNavClick(link.id, e)}
          >
            <span>0{index + 1}</span>
            {link.label}
          </a>
        ))}
      </nav>
    </>
  );
}
