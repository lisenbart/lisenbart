import { useEffect, useRef } from "react";
import {
  unnecessaryThingsAwards,
  unnecessaryThingsFeaturedLaurels,
  unnecessaryThingsFestivalSummary,
  unnecessaryThingsNotablePlacements,
  unnecessaryThingsNotableSelections,
  type FestivalKind,
  type FestivalRecognition,
} from "@/data/unnecessaryThingsFestivals";
import { publicAsset } from "@/lib/publicAsset";

function kindLabel(kind: FestivalKind): string {
  switch (kind) {
    case "award":
      return "Award";
    case "nominee":
      return "Nominee";
    case "finalist":
      return "Finalist";
    case "semi-finalist":
      return "Semi-Finalist";
    case "official-selection":
      return "Official Selection";
  }
}

function RecognitionRow({ item }: { item: FestivalRecognition }) {
  const line = (
    <>
      <span className="festival-rec__name">{item.festival}</span>
      <span className="festival-rec__meta">
        {item.detail}
        {item.year ? ` · ${item.year}` : ""}
        {item.country ? ` · ${item.country}` : ""}
      </span>
    </>
  );

  return (
    <li className="festival-rec__item">
      {item.href ? (
        <a href={item.href} target="_blank" rel="noopener noreferrer">
          {line}
        </a>
      ) : (
        <div>{line}</div>
      )}
    </li>
  );
}

/** Compact featured laurels — placed near the top of the festival page. */
export function FestivalFeaturedStrip() {
  const laurels = unnecessaryThingsFeaturedLaurels.filter((l) => l.laurelSrc);

  return (
    <aside className="festival-featured" aria-label="Festival recognition highlights">
      <ul className="festival-featured__laurels">
        {laurels.map((item) => (
          <li key={item.id} className="festival-featured__laurel">
            {item.href ? (
              <a href={item.href} target="_blank" rel="noopener noreferrer">
                <img
                  src={publicAsset(item.laurelSrc!)}
                  alt={item.laurelAlt ?? `${item.festival} — ${item.detail}`}
                  width={360}
                  height={200}
                  loading="lazy"
                  decoding="async"
                />
              </a>
            ) : (
              <img
                src={publicAsset(item.laurelSrc!)}
                alt={item.laurelAlt ?? `${item.festival} — ${item.detail}`}
                width={360}
                height={200}
                loading="lazy"
                decoding="async"
              />
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
}

const HIGHLIGHT_LINE =
  "Golden Goblet Award Competition, Shanghai IFF · Official Selection, Huesca (Oscar-qualifying)";

/**
 * Always-visible awards block: laurels + highlight + summary stats,
 * with a clear control to expand the full festival list.
 */
export function AwardsDisclosure() {
  const detailsRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const openIfHash = () => {
      if (window.location.hash.replace(/^#/, "") !== "festivals") return;
      const el = detailsRef.current;
      if (!el) return;
      el.open = true;
    };
    openIfHash();
    window.addEventListener("hashchange", openIfHash);
    return () => window.removeEventListener("hashchange", openIfHash);
  }, []);

  return (
    <section id="festivals" className="awards-block" aria-labelledby="awards-heading">
      <div className="awards-block__intro">
        <h2 id="awards-heading" className="awards-block__label">
          Awards
        </h2>
      </div>

      <div className="festival-featured-bleed awards-block__laurels">
        <FestivalFeaturedStrip />
      </div>

      <div className="awards-block__copy">
        <p className="awards-block__highlight">{HIGHLIGHT_LINE}</p>
        <p className="awards-block__stats">{unnecessaryThingsFestivalSummary.statement}</p>

        <details ref={detailsRef} className="awards-block__details">
          <summary className="awards-block__toggle">
            <span className="awards-block__toggle-closed">View full festival list</span>
            <span className="awards-block__toggle-open">Hide festival list</span>
            <span className="awards-block__toggle-chevron" aria-hidden="true" />
          </summary>
          <div className="awards-block__panel">
            <FestivalRecognitionSection hideHeading hideSummary />
          </div>
        </details>
      </div>
    </section>
  );
}

/** Full typographic festival history further down the project page. */
export function FestivalRecognitionSection({
  hideHeading = false,
  hideSummary = false,
}: {
  hideHeading?: boolean;
  hideSummary?: boolean;
} = {}) {
  return (
    <section
      className="festival-rec"
      aria-labelledby={hideHeading ? undefined : "festival-rec-heading"}
      aria-label={hideHeading ? "Festival recognition" : undefined}
    >
      {hideHeading ? null : (
        <h2 id="festival-rec-heading" className="project-page__section-label">
          Festival Recognition
        </h2>
      )}
      {hideSummary ? null : (
        <p className="festival-rec__summary">{unnecessaryThingsFestivalSummary.statement}</p>
      )}

      <div className="festival-rec__group">
        <h3 className="festival-rec__group-title">{kindLabel("award")}s</h3>
        <ul className="festival-rec__list">
          {unnecessaryThingsAwards.map((item) => (
            <RecognitionRow key={item.id} item={item} />
          ))}
        </ul>
      </div>

      <div className="festival-rec__group">
        <h3 className="festival-rec__group-title">Finalists &amp; Nominees</h3>
        <ul className="festival-rec__list">
          {unnecessaryThingsNotablePlacements.map((item) => (
            <RecognitionRow key={item.id} item={item} />
          ))}
        </ul>
      </div>

      <div className="festival-rec__group">
        <h3 className="festival-rec__group-title">Selected Official Selections</h3>
        <p className="festival-rec__note">
          A curated selection from {unnecessaryThingsFestivalSummary.selections} festival
          selections. Official Selection is not an award.
        </p>
        <ul className="festival-rec__list">
          {unnecessaryThingsNotableSelections.map((item) => (
            <RecognitionRow key={item.id} item={item} />
          ))}
        </ul>
      </div>
    </section>
  );
}
