import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import PlayableModal from "@/components/games/PlayableModal";
import {
  PLAYABLES_PREVIEW_COUNT,
  type PlayableItem,
} from "@/data/playables";
import { publicAsset } from "@/lib/publicAsset";

export default function PlayablesGrid({
  items,
  label,
  moreLabel,
  lessLabel,
  gridId = "games-playables-grid",
  tapLabel = "Tap to play",
}: {
  items: readonly PlayableItem[];
  /** Accessible name for the grid (service title). */
  label: string;
  moreLabel: string;
  lessLabel: string;
  gridId?: string;
  tapLabel?: string;
}) {
  const [moreOpen, setMoreOpen] = useState(false);
  const [active, setActive] = useState<PlayableItem | null>(null);
  const hasMore = items.length > PLAYABLES_PREVIEW_COUNT;

  return (
    <div className="games-service__media games-playables">
      <ul id={gridId} className="games-playables__grid" aria-label={label}>
        {items.map((item, index) => {
          const collapsed = hasMore && !moreOpen && index >= PLAYABLES_PREVIEW_COUNT;
          return (
            <li
              key={item.id}
              className={[
                "games-playables__card",
                collapsed ? "games-playables__card--collapsed" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              hidden={collapsed}
            >
              <button
                type="button"
                className="games-playables__button"
                aria-label={`${tapLabel}: ${item.game}`}
                tabIndex={collapsed ? -1 : undefined}
                onClick={() => setActive(item)}
              >
                <span className="games-playables__cover">
                  <img
                    src={publicAsset(item.cover)}
                    alt=""
                    width={512}
                    height={512}
                    loading={index < PLAYABLES_PREVIEW_COUNT ? "eager" : "lazy"}
                    decoding="async"
                  />
                </span>
                <span className="games-playables__meta">
                  <span className="games-playables__name">{item.game}</span>
                  <span className="games-playables__tap">{tapLabel}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {hasMore ? (
        <div className="client-selected-more">
          <button
            type="button"
            className="film-cta client-selected-more__cta"
            aria-expanded={moreOpen}
            aria-controls={gridId}
            onClick={() => {
              setMoreOpen((open) => {
                if (open) {
                  window.requestAnimationFrame(() => {
                    document.getElementById(gridId)?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  });
                }
                return !open;
              });
            }}
          >
            <span>{moreOpen ? lessLabel : moreLabel}</span>
            {moreOpen ? (
              <ChevronUp className="client-selected-more__chevron" size={18} strokeWidth={2.25} aria-hidden="true" />
            ) : (
              <ChevronDown className="client-selected-more__chevron" size={18} strokeWidth={2.25} aria-hidden="true" />
            )}
          </button>
        </div>
      ) : null}

      <PlayableModal
        open={Boolean(active)}
        src={active ? publicAsset(active.file) : null}
        title={active ? active.game : "Playable"}
        onClose={() => setActive(null)}
      />
    </div>
  );
}
