import { useState, useEffect } from "react";
import { Menu, Moon, Send, Sun, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { sectionIds, scrollToSection, site } from "@/data/site";
import { useTheme } from "@/hooks/useTheme";
import HeaderConnectMenu from "./HeaderConnectMenu";
import SocialIconLinks from "./SocialIconLinks";

const navLinks = [
  { id: sectionIds.services, label: "Services" },
  { id: sectionIds.about, label: "Experience" },
  { id: sectionIds.contact, label: "Contact" },
];

function NavLink({
  id,
  label,
  onNavigate,
  className,
}: {
  id: string;
  label: string;
  onNavigate?: () => void;
  className?: string;
}) {
  return (
    <a
      href={`#${id}`}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        scrollToSection(id, onNavigate);
      }}
    >
      {label}
    </a>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 w-full max-w-full overflow-x-clip">
      <nav
        className={`site-header-nav transition-all duration-300${scrolled ? " site-header-nav--scrolled" : ""}`}
        aria-label="Main navigation"
      >
        <div className="mx-auto flex min-h-[4.25rem] w-full min-w-0 max-w-[1440px] items-center gap-2 px-[var(--page-padding)] py-2.5 md:min-h-16 md:gap-4 md:py-3">
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
              href="#top"
              className="relative z-10 flex min-w-0 shrink items-center gap-2.5 md:gap-4"
              aria-label={`${site.brand} home`}
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <span
                className="font-display font-extralight uppercase leading-none tracking-[0.12em] text-text-primary"
                style={{ fontSize: "clamp(1.1rem, 2.8vw, 1.45rem)" }}
              >
                {site.brand}
              </span>
              <span
                className="site-header-tagline font-sans hidden flex-col justify-center gap-px leading-none uppercase sm:flex"
                style={{
                  fontSize: "clamp(7px, 1.05vw, 10px)",
                  letterSpacing: "0.14em",
                  maxHeight: "2.2rem",
                }}
              >
                <span className="whitespace-nowrap">{site.tagline.line1}</span>
                <span className="whitespace-nowrap">{site.tagline.line2}</span>
              </span>
            </a>
          </div>

          <ul className="hidden min-w-0 flex-1 items-center justify-center gap-1 lg:flex xl:gap-2">
            {navLinks.map((link) => (
              <li key={link.id}>
                <NavLink
                  id={link.id}
                  label={link.label}
                  className="site-header-link whitespace-nowrap rounded-full px-3 py-2 text-[11px] font-medium uppercase tracking-[0.1em] xl:px-4 xl:text-[13px]"
                />
              </li>
            ))}
          </ul>

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
              onClick={() => scrollToSection(sectionIds.contact)}
              className="gradient-button-emerald btn-on-accent hidden rounded-full px-4 py-2 text-[11px] font-medium uppercase tracking-[0.1em] lg:inline-flex xl:px-5 xl:text-xs"
            >
              {site.ctaLabel}
            </button>
            <button
              type="button"
              className="site-header-link flex h-9 w-9 shrink-0 items-center justify-center lg:hidden"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="site-header-mobile-menu overflow-hidden lg:hidden"
            >
              <ul className="site-header-mobile-nav flex flex-col items-stretch gap-1 px-[var(--page-padding)] py-5">
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <NavLink
                      id={link.id}
                      label={link.label}
                      onNavigate={closeMenu}
                      className="site-header-link site-header-mobile-link block py-3 text-[13px] font-medium uppercase tracking-[0.14em]"
                    />
                  </li>
                ))}
                <li className="flex justify-center pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      closeMenu();
                      scrollToSection(sectionIds.contact);
                    }}
                    className="gradient-button-emerald btn-on-accent rounded-full px-6 py-3 text-sm font-medium uppercase tracking-[0.12em]"
                  >
                    {site.ctaLabel}
                  </button>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
