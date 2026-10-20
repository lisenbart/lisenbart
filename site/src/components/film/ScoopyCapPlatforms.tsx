import {
  scoopyCapDistribution,
  scoopyCapPlatformsForDisplay,
} from "@/data/scoopyCapDistribution";

type ScoopyCapPlatformsProps = {
  /** Override default heading (e.g. project page). */
  heading?: string;
  /** Hide the reach note when the page already carries that context. */
  compactNote?: boolean;
};

/** Full Scoopy Cap distribution list — channels + platforms, no truncation. */
export default function ScoopyCapPlatforms({
  heading,
  compactNote = false,
}: ScoopyCapPlatformsProps = {}) {
  const platforms = scoopyCapPlatformsForDisplay();

  if (platforms.length === 0) return null;

  const { reachNote, platformsHeading } = scoopyCapDistribution;

  return (
    <div className="scoopy-platforms">
      {!compactNote ? <p className="scoopy-platforms__note">{reachNote}</p> : null}
      <p className="scoopy-platforms__heading">{heading ?? platformsHeading}</p>
      <ul className="scoopy-platforms__list">
        {platforms.map((platform) => (
          <li key={platform.id}>
            {platform.contentUrl ? (
              <a
                href={platform.contentUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {platform.name}
              </a>
            ) : (
              platform.name
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
