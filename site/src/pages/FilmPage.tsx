import FilmContactSection from "@/components/FilmContactSection";
import { SEO } from "@/components/SEO";
import { PlayIcon } from "@/components/film/FilmIcons";
import { useReel } from "@/contexts/ReelContext";
import { site } from "@/data/site";
import { getWorkCasesByIds } from "@/data/work";

const page = site.filmPage;
const [unnecessary] = getWorkCasesByIds(["unnecessary-things"]);

const originals = [
  {
    id: "unnecessary-things",
    title: "Unnecessary Things",
    meta: "An animated film by Lisenbart Film · 11 awards",
    image: "/images/work/unnecessary-things-preview.webp",
    className: "original-main",
    vimeoId: "823618245",
  },
  {
    id: "the-last-kozak",
    title: "The Last Kozak",
    meta: "Feature film in development",
    image: "/images/work/the-last-kozak-preview.webp",
    className: "original-kozak",
    vimeoId: "699197721",
  },
  {
    id: "pershosvit",
    title: "Pershosvit",
    meta: "Kids' IP",
    image: "/images/work/pershosvit-preview.jpg",
    className: "original-small",
    href: "https://www.youtube.com/@pershosvit",
  },
  {
    id: "scoopy-cap",
    title: "Scoopy Cap",
    meta: "Kids' IP",
    image: "/images/work/scoopy-cap-preview.jpg",
    className: "original-small",
    href: "https://www.youtube.com/@ScoopyCap",
  },
] as const;

export default function FilmPage() {
  const { openReel } = useReel();

  return (
    <>
      <SEO
        title={page.seoTitle}
        description={page.seoDescription}
        url={`${site.canonical}/originals/`}
      />
      <section className="page-shell originals-page">
        <div className="page-title-row originals-title">
          <h1>Originals</h1>
          <p>
            Our stories.
            <br />
            New worlds.
          </p>
        </div>
        <p className="film-contact__lead" style={{ marginBottom: "2rem", maxWidth: "36rem" }}>
          {page.title}
        </p>
        {unnecessary?.result ? (
          <p className="film-section-label" style={{ marginBottom: "1.5rem" }}>
            Unnecessary Things — {unnecessary.result}
          </p>
        ) : null}

        <div className="originals-layout">
          {originals.map((item) => {
            if ("href" in item && item.href) {
              return (
                <a
                  key={item.id}
                  className={`original-tile ${item.className}`}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={item.image} alt="" />
                  <span className="tile-shade" />
                  <span className="tile-copy">
                    <strong>{item.title}</strong>
                    <small>{item.meta}</small>
                  </span>
                </a>
              );
            }

            return (
              <button
                key={item.id}
                className={`original-tile ${item.className}`}
                type="button"
                onClick={() =>
                  openReel("vimeoId" in item ? item.vimeoId : null, item.title)
                }
              >
                <img src={item.image} alt="" />
                <span className="tile-shade" />
                <span className="tile-copy">
                  <strong>{item.title}</strong>
                  <small>{item.meta}</small>
                </span>
                <span className="tile-play">
                  <PlayIcon />
                </span>
              </button>
            );
          })}
        </div>
      </section>
      <FilmContactSection heading={page.contactHeading} lead={page.contactLead} />
    </>
  );
}
