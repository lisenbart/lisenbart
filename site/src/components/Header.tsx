import { useEffect, useId, useState, type MouseEvent } from "react";
import { contactPageHref, goToContact, site } from "@/data/site";
import {
  hubCanonicalHref,
  isSiteSubpage,
  parseHubPage,
  parseOriginalsProject,
  routes,
} from "@/lib/routes";

type NavId = (typeof site.primaryNav)[number]["id"];

function navHref(id: NavId) {
  if (id === "contact") return contactPageHref();
  return hubCanonicalHref(id);
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();
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

  const closeMenu = () => setMenuOpen(false);
  const toggleMenu = () => setMenuOpen((v) => !v);

  const isActive = (id: NavId) => {
    if (id === "contact") return false;
    if (id === "originals" && parseOriginalsProject()) return true;
    return activeHub === id;
  };

  const onNavClick = (id: NavId, e: MouseEvent<HTMLAnchorElement>) => {
    closeMenu();
    if (id !== "contact") return;
    e.preventDefault();
    goToContact();
  };

  return (
    <>
      <header className="film-header">
        <a
          className="brand-lockup"
          href={onSubpage ? routes.home : "#top"}
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
          <span className="brand">{site.brand}</span>
          <span className="brand-est">{site.studioHome.credentials}</span>
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
        className={`menu-button ${menuOpen ? "open" : ""}`}
        type="button"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        aria-controls={menuId}
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
