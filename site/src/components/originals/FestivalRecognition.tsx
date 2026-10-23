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

/** Full typographic festival history further down the project page. */
export function FestivalRecognitionSection() {
  return (
    <section
      id="festivals"
      className="festival-rec"
      aria-labelledby="festival-rec-heading"
    >
      <h2 id="festival-rec-heading" className="project-page__section-label">
        Festival Recognition
      </h2>
      <p className="festival-rec__summary">{unnecessaryThingsFestivalSummary.statement}</p>

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
