import FilmContactSection from "@/components/FilmContactSection";
import { SEO } from "@/components/SEO";
import { PlayIcon } from "@/components/film/FilmIcons";
import { useReel } from "@/contexts/ReelContext";
import { site } from "@/data/site";
import { getWorkCasesByIds } from "@/data/work";

const page = site.filmPage;
const films = getWorkCasesByIds([...page.filmIds, ...page.ipIds]);
const byId = Object.fromEntries(films.map((item) => [item.id, item]));

type OriginalTile = {
  id: string;
  title: string;
  meta: string;
  image: string;
  className: string;
  vimeoId?: string;
  href?: string;
  blurb?: string;
};

const originals: OriginalTile[] = [
  {
    id: "unnecessary-things",
    title: "Unnecessary Things",
    meta: byId["unnecessary-things"]?.result ?? page.unnecessaryResult,
    image: "/images/work/unnecessary-things-preview.webp",
    className: "original-main",
    vimeoId: byId["unnecessary-things"]?.vimeoId ?? "823618245",
    blurb: byId["unnecessary-things"]?.description,
  },
  {
    id: "the-last-kozak",
    title: "The Last Kozak",
    meta: "Feature film in development",
    image: "/images/work/the-last-kozak-preview.webp",
    className: "original-kozak",
    vimeoId: byId["the-last-kozak"]?.vimeoId ?? "699197721",
    blurb: byId["the-last-kozak"]?.description,
  },
  {
    id: "pershosvit",
    title: "Pershosvit",
    meta: byId["pershosvit"]?.filmCategory ?? "Kids' IP",
    image: "/images/work/pershosvit-preview.jpg",
    className: "original-small",
    href: byId["pershosvit"]?.youtubeUrl ?? "https://www.youtube.com/@pershosvit",
  },
  {
    id: "scoopy-cap",
    title: "Scoopy Cap",
    meta: byId["scoopy-cap"]?.filmCategory ?? "Kids' IP",
    image: "/images/work/scoopy-cap-preview.jpg",
    className: "original-small",
    href: byId["scoopy-cap"]?.youtubeUrl ?? "https://www.youtube.com/@ScoopyCap",
  },
];

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

        <div className="originals-layout">
          {originals.map((item) => {
            if (item.href) {
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
                onClick={() => openReel(item.vimeoId ?? null, item.title)}
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

        <ul className="originals-context">
          {originals
            .filter((item) => item.blurb)
            .map((item) => (
              <li key={`${item.id}-blurb`}>
                <strong>{item.title}</strong>
                <span>{item.meta}</span>
                <p>{item.blurb}</p>
              </li>
            ))}
        </ul>
      </section>
      <FilmContactSection heading={page.contactHeading} lead={page.contactLead} />
    </>
  );
}
