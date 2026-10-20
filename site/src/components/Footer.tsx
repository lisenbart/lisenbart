import { goToContact, site } from "@/data/site";
import { hubCanonicalHref, routes } from "@/lib/routes";

export default function Footer() {
  return (
    <footer className="film-footer">
      <a href={routes.home} aria-label={`${site.name} home`}>
        LISENBART FILM · Est. 2006
      </a>
      <nav aria-label="Footer">
        <a href={hubCanonicalHref("client-work")}>Client Work</a>
        <a href={hubCanonicalHref("originals")}>Originals</a>
        <a href={hubCanonicalHref("games")}>Game Ads</a>
        <a href={hubCanonicalHref("ai")}>AI & Hybrid</a>
        <a href={hubCanonicalHref("studio")}>Studio</a>
        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            goToContact();
          }}
        >
          Contact
        </a>
        <a href={`mailto:${site.email}`}>{site.email}</a>
      </nav>
    </footer>
  );
}
