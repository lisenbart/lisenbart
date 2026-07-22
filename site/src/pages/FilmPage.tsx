import { useEffect } from "react";
import ContactForm from "@/components/ContactForm";
import FilmFeatureCase from "@/components/originals/FilmFeatureCase";
import DevelopmentFilmCase from "@/components/originals/DevelopmentFilmCase";
import OriginalIpCard from "@/components/originals/OriginalIpCard";
import { SEO } from "@/components/SEO";
import { filmPageJsonLd } from "@/data/filmJsonLd";
import { getWorkCasesByIds } from "@/data/work";
import { scrollToSection, site } from "@/data/site";
import { routes } from "@/lib/routes";

export default function FilmPage() {
  const { filmPage } = site;
  const films = getWorkCasesByIds(filmPage.filmIds);
  const ips = getWorkCasesByIds(filmPage.ipIds);
  const seoUrl = `${site.canonical}${routes.film}`;

  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, "");
    if (!hash) return;
    const timer = window.setTimeout(() => scrollToSection(hash), 50);
    return () => window.clearTimeout(timer);
  }, []);

  const unnecessaryThings = films.find((item) => item.id === "unnecessary-things");
  const lastKozak = films.find((item) => item.id === "the-last-kozak");

  return (
    <>
      <SEO title={filmPage.seoTitle} description={filmPage.seoDescription} url={seoUrl} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(filmPageJsonLd) }}
      />
      <main className="site-main work-page work-page--film archive-hub originals-page">
        <header className="work-page-header hub-page-header">
          <h1 className="hub-page-header__row">
            <span className="hub-page-header__name work-page-title--film-entertainment">
              {filmPage.name}
            </span>
            <span className="hub-page-header__sep" aria-hidden="true" />
            <span className="sr-only"> — </span>
            <span className="hub-page-header__lead">{filmPage.title}</span>
          </h1>
        </header>

        <div className="originals-rail">
          <section className="originals-section" aria-labelledby="originals-films-heading">
            <h2 id="originals-films-heading" className="originals-section__heading">
              Films
            </h2>

            <div className="originals-section__stack">
              {unnecessaryThings && <FilmFeatureCase item={unnecessaryThings} />}
              {lastKozak && <DevelopmentFilmCase item={lastKozak} />}
            </div>
          </section>

          <section className="originals-section" aria-labelledby="originals-ip-heading">
            <h2 id="originals-ip-heading" className="originals-section__heading">
              Original IP
            </h2>

            <div className="originals-ip-grid">
              {ips.map((item) => (
                <OriginalIpCard key={item.id} item={item} />
              ))}
            </div>
          </section>
        </div>

        <ContactForm heading={filmPage.contactHeading} lead={filmPage.contactLead} />
      </main>
    </>
  );
}
