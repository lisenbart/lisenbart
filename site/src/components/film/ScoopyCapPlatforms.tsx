import { useState } from "react";
import {
  scoopyCapDistribution,
  scoopyCapPlatformsForDisplay,
} from "@/data/scoopyCapDistribution";

const PREVIEW_COUNT = 6;

/** Quiet platform list for the Scoopy Cap Originals card only. */
export default function ScoopyCapPlatforms() {
  const platforms = scoopyCapPlatformsForDisplay();
  const [expanded, setExpanded] = useState(false);

  if (platforms.length === 0) return null;

  const { reachNote, platformsHeading } = scoopyCapDistribution;
  const visible = expanded ? platforms : platforms.slice(0, PREVIEW_COUNT);
  const canExpand = platforms.length > PREVIEW_COUNT;

  return (
    <div className="scoopy-platforms">
      <p className="scoopy-platforms__note">{reachNote}</p>
      <p className="scoopy-platforms__heading">{platformsHeading}</p>
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
