import type { WorkCaseStudy } from "@/data/work";
import { FilmMediaStage } from "@/components/originals/OriginalsMedia";
import { goToContactWithPrefill } from "@/data/site";

interface DevelopmentFilmCaseProps {
  item: WorkCaseStudy;
}

function filmMetaWithoutStatus(filmCategory?: string) {
  if (!filmCategory) return "";
  return filmCategory
    .split("·")
    .map((part) => part.trim())
    .filter((part) => part.toLowerCase() !== "in development")
    .join(" · ");
}

/** Feature in development — The Last Kozak. */
export default function DevelopmentFilmCase({ item }: DevelopmentFilmCaseProps) {
  const meta = filmMetaWithoutStatus(item.filmCategory ?? item.category);
  const statusLines = (item.result ?? "")
    .split(/(?<=\.)\s+/)
    .map((line) => line.trim())
    .filter(Boolean);

  return (
    <article id={item.id} className="originals-case originals-case--development">
      <header className="originals-case__intro">
        <h3 className="originals-case__title">{item.title}</h3>
        {meta && <p className="originals-case__meta">{meta}</p>}
        <p className="originals-case__status">In Development</p>
      </header>

      {item.vimeoId && item.mediaImage && (
        <FilmMediaStage
          className="originals-case__media"
          title={item.title}
          posterSrc={item.mediaImage}
          posterAlt={item.mediaImageAlt ?? item.title}
          vimeoId={item.vimeoId}
        />
      )}

      <div className="originals-case__body">
        <p className="originals-case__synopsis">{item.description}</p>

        {statusLines.length > 0 && (
          <ul className="originals-case__dev-list">
            {statusLines.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        )}

        <p className="originals-case__cta-row">
          <button
            type="button"
            className="originals-case__cta originals-case__cta--button"
            onClick={() =>
              goToContactWithPrefill({
                projectType: "Originals Partnership",
                message: "I'd like to request the pitch for The Last Kozak.",
              })
            }
          >
            Request the Pitch
          </button>
        </p>
      </div>
    </article>
  );
}
