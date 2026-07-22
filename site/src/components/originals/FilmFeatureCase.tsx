import type { WorkCaseStudy } from "@/data/work";
import {
  CreditsDisclosure,
  FilmMediaStage,
  OriginalsStillGallery,
} from "@/components/originals/OriginalsMedia";

interface FilmFeatureCaseProps {
  item: WorkCaseStudy;
}

/** Lead completed festival short — Unnecessary Things. */
export default function FilmFeatureCase({ item }: FilmFeatureCaseProps) {
  const meta = item.filmCategory ?? item.category;
  const recognition = item.result;
  const festivals = (item.selectionLinks ?? []).slice(0, 3);
  const imdbHref = item.imdbId ? `https://www.imdb.com/title/${item.imdbId}/` : null;

  return (
    <article id={item.id} className="originals-case originals-case--feature">
      <header className="originals-case__intro">
        <h3 className="originals-case__title">{item.title}</h3>
        {meta && <p className="originals-case__meta">{meta}</p>}
      </header>

      {item.vimeoId && item.mediaImage && (
        <FilmMediaStage
          className="originals-case__media originals-case__media--lead"
          title={item.title}
          posterSrc={item.mediaImage}
          posterAlt={item.mediaImageAlt ?? item.title}
          vimeoId={item.vimeoId}
          priority
        />
      )}

      <div className="originals-case__body">
        <p className="originals-case__synopsis">{item.description}</p>

        {recognition && <p className="originals-case__recognition">{recognition}</p>}

        {(festivals.length > 0 || item.winnerLink) && (
          <div className="originals-case__festivals">
            {festivals.length > 0 && (
              <ul className="originals-case__festival-list">
                {festivals.map((fest) => (
                  <li key={fest.href}>
                    <a href={fest.href} target="_blank" rel="noopener noreferrer">
                      {fest.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
            {item.winnerLink && (
              <p className="originals-case__winner">
                <a href={item.winnerLink.href} target="_blank" rel="noopener noreferrer">
                  {item.winnerLink.label}
                </a>
              </p>
            )}
          </div>
        )}

        {item.quote && (
          <blockquote className="originals-case__quote">
            <p>“{item.quote.text}”</p>
            {item.quote.href ? (
              <cite>
                <a href={item.quote.href} target="_blank" rel="noopener noreferrer">
                  {item.quote.attribution}
                </a>
              </cite>
            ) : (
              <cite>{item.quote.attribution}</cite>
            )}
          </blockquote>
        )}

        {imdbHref && (
          <p className="originals-case__cta-row">
            <a
              className="originals-case__cta"
              href={imdbHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              View on IMDb
            </a>
          </p>
        )}

        {item.stills && item.stills.length > 0 && (
          <OriginalsStillGallery stills={item.stills} projectTitle={item.title} />
        )}

        {item.credits && <CreditsDisclosure credits={item.credits} />}
      </div>
    </article>
  );
}
