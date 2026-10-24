import { useState, type SyntheticEvent } from "react";
import { useReel } from "@/contexts/ReelContext";
import { publicAsset } from "@/lib/publicAsset";
import { youtubePosterSrc } from "@/lib/reelSource";

export type SelectedWorkItem = {
  id: string;
  title: string;
  client: string;
  poster?: string;
  vimeoId?: string | null;
  youtubeId?: string;
};

const PREVIEW_COUNT = 3;

function resolvePoster(item: SelectedWorkItem): string | null {
  if (item.poster) {
    return item.poster.startsWith("http") ? item.poster : publicAsset(item.poster);
  }
  if (item.youtubeId) return youtubePosterSrc(item.youtubeId);
  return null;
}

function onYouTubePosterError(event: SyntheticEvent<HTMLImageElement>, youtubeId?: string) {
  if (!youtubeId) return;
  const img = event.currentTarget;
  const fallback = youtubePosterSrc(youtubeId, "hqdefault");
  if (img.src !== fallback) img.src = fallback;
}

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
    const reelTitle = `${item.client} — ${item.title}`;
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
          const poster = resolvePoster(item);
          const alt = `${item.client} — ${item.title}`;

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
                aria-label={canPlay ? `Play ${alt}` : alt}
                style={{ animationDelay: `${index * 40}ms` }}
                onClick={() => {
                  if (canPlay) playItem(item);
                }}
                tabIndex={collapsed ? -1 : undefined}
                disabled={!canPlay}
              >
                <span className="client-selected-card__media">
                  {poster ? (
                    <img
                      className="client-selected-card__poster"
                      src={poster}
                      alt={alt}
                      width={1280}
                      height={720}
                      loading={index < PREVIEW_COUNT ? "eager" : "lazy"}
                      decoding="async"
                      onError={(event) => onYouTubePosterError(event, item.youtubeId)}
                    />
                  ) : null}
                  <span className="client-selected-card__brand">{item.client}</span>
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
