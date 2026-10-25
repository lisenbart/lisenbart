import { useState } from "react";
import PlayableModal from "@/components/games/PlayableModal";
import type { PlayableItem } from "@/data/playables";
import { publicAsset } from "@/lib/publicAsset";

export default function PlayablesGrid({
  items,
  tapLabel = "Tap to play",
}: {
  items: readonly PlayableItem[];
  tapLabel?: string;
}) {
  const [active, setActive] = useState<PlayableItem | null>(null);

  return (
    <>
      {items.map((item, index) => (
        <div key={item.id} className="games-proof-card" role="listitem">
          <button
            type="button"
            className="games-proof-card__button"
            aria-label={`${tapLabel}: ${item.game}`}
            onClick={() => setActive(item)}
          >
            <span className="games-proof-card__media">
              <img
                src={publicAsset(item.cover)}
                alt=""
                width={512}
                height={512}
                loading={index < 3 ? "eager" : "lazy"}
                decoding="async"
              />
            </span>
            <span className="games-proof-card__meta">
              <span className="games-proof-card__name">{item.game}</span>
              <span className="games-proof-card__tap">{tapLabel}</span>
            </span>
          </button>
        </div>
      ))}

      <PlayableModal
        open={Boolean(active)}
        src={active ? publicAsset(active.file) : null}
        title={active ? active.game : "Playable"}
        onClose={() => setActive(null)}
      />
    </>
  );
}
