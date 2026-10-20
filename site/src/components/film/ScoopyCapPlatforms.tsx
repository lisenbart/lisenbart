import { useState } from "react";
import {
  scoopyCapDistribution,
  scoopyCapPlatformsForDisplay,
} from "@/data/scoopyCapDistribution";

const PREVIEW_COUNT = 6;

type ScoopyCapPlatformsProps = {
  /** Override default "Where to Watch" heading (e.g. project page). */
  heading?: string;
  /** Hide the reach note when the page already carries that context. */
  compactNote?: boolean;
};

/** Quiet platform list for Scoopy Cap (overview card or project page). */
export default function ScoopyCapPlatforms({
  heading,
  compactNote = false,
}: ScoopyCapPlatformsProps = {}) {
  const platforms = scoopyCapPlatformsForDisplay();
  const [expanded, setExpanded] = useState(false);

  if (platforms.length === 0) return null;

  const { reachNote, platformsHeading } = scoopyCapDistribution;
  const visible = expanded ? platforms : platforms.slice(0, PREVIEW_COUNT);
  const canExpand = platforms.length > PREVIEW_COUNT;

  return (
    <div className="scoopy-platforms">
      {!compactNote ? <p className="scoopy-platforms__note">{reachNote}</p> : null}
      <p className="scoopy-platforms__heading">{heading ?? platformsHeading}</p>
      <ul className="scoopy-platforms__list">
        {visible.map((platform) => (
          <li key={platform.id}>{platform.name}</li>
        ))}
      </ul>
      {canExpand ? (
        <button
          type="button"
          className="scoopy-platforms__more"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
        >
          {expanded ? "Show less" : "Show all platforms"}
        </button>
      ) : null}
    </div>
  );
}
