import { useState } from "react";
import { PlayIcon } from "@/components/film/FilmIcons";
import { useReel } from "@/contexts/ReelContext";
import { publicAsset } from "@/lib/publicAsset";

export type SelectedWorkItem = {
  id: string;
  title: string;
  client: string;
  poster?: string;
  vimeoId?: string | null;
  youtubeId?: string;
};

const PREVIEW_COUNT = 3;

export default function SelectedWorkGrid({
  items,
  label,
  moreLabel,
  lessLabel,
  gridId,
}: {
  items: readonly SelectedWorkItem[];
  label: string;
  moreLabel: string;
  lessLabel: string;
  gridId: string;
}) {
  const { openReel } = useReel();
  const [moreOpen, setMoreOpen] = useState(false);
  const hasMore = items.length > PREVIEW_COUNT;

  const playItem = (item: SelectedWorkItem) => {
    const reelTitle = `${item.title} — ${item.client}`;
    if (item.youtubeId) {
      openReel({ provider: "youtube", id: item.youtubeId }, reelTitle);
      return;
    }
    if (item.vimeoId) {
      openReel(item.vimeoId, reelTitle);
    }
  };

  return (
    <section
      className="studio-section studio-section--selected-work studio-section--selected-work-compact"
      aria-label={label}
    >
      <ul
        id={gridId}
        className="client-selected-grid client-selected-grid--flush"
        aria-label={label}
      >
        {items.map((item, index) => {
          const collapsed = hasMore && !moreOpen && index >= PREVIEW_COUNT;
          const canPlay = Boolean(item.youtubeId || item.vimeoId);

          return (
            <li
              key={item.id}
              className={
                collapsed
                  ? "client-selected-card client-selected-card--collapsed"
                  : "client-selected-card"
              }
              hidden={collapsed}
            >
              <button
                type="button"
                className="client-selected-card__button"
                aria-label={canPlay ? `Play ${item.title} — ${item.client}` : `${item.title} — ${item.client}`}
                style={{ animationDelay: `${index * 40}ms` }}
                onClick={() => {
                  if (canPlay) playItem(item);
                }}
                tabIndex={collapsed ? -1 : undefined}
                disabled={!canPlay}
              >
                <span className="client-selected-card__media">
                  {item.poster ? (
                    <img
                      className="client-selected-card__poster"
                      src={publicAsset(item.poster)}
                      alt=""
                      width={1280}
                      height={720}
                      loading={index < PREVIEW_COUNT ? "eager" : "lazy"}
                      decoding="async"
                    />
                  ) : null}
                  {canPlay ? (
                    <span className="client-selected-card__play" aria-hidden="true">
                      <span className="client-selected-card__play-circle">
                        <PlayIcon />
                      </span>
                    </span>
                  ) : null}
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
            {moreOpen ? lessLabel : moreLabel}
          </button>
        </div>
      ) : null}
    </section>
  );
}
