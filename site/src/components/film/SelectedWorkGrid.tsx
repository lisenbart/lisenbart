import { useEffect, useRef, useState, type SyntheticEvent } from "react";
import { PlayIcon } from "@/components/film/FilmIcons";
import { useReel } from "@/contexts/ReelContext";
import { useIsNarrowViewport } from "@/hooks/useMatchMedia";
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
  const isNarrow = useIsNarrowViewport();
  const gridRef = useRef<HTMLUListElement>(null);
  const [moreOpen, setMoreOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
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

  useEffect(() => {
    if (!isNarrow) {
      setActiveId(null);
      return;
    }

    const grid = gridRef.current;
    if (!grid) return;

    let raf = 0;
    const updateActive = () => {
      const mid = window.innerHeight * 0.5;
      let bestId: string | null = null;
      let bestDist = Number.POSITIVE_INFINITY;

      grid.querySelectorAll<HTMLElement>(".client-selected-card:not([hidden])").forEach((card) => {
        const rect = card.getBoundingClientRect();
        if (rect.bottom <= 0 || rect.top >= window.innerHeight) return;
        const center = rect.top + rect.height / 2;
        const dist = Math.abs(center - mid);
        if (dist < bestDist) {
          bestDist = dist;
          bestId = card.dataset.workId ?? null;
        }
      });

      setActiveId(bestId);
    };

    const onScrollOrResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(updateActive);
    };

    updateActive();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [isNarrow, moreOpen, items]);

  return (
    <section
      className="studio-section studio-section--selected-work studio-section--selected-work-compact"
      aria-label={label}
    >
      <ul
        ref={gridRef}
        id={gridId}
        className="client-selected-grid client-selected-grid--flush"
        aria-label={label}
      >
        {items.map((item, index) => {
          const collapsed = hasMore && !moreOpen && index >= PREVIEW_COUNT;
          const canPlay = Boolean(item.youtubeId || item.vimeoId);
          const poster = resolvePoster(item);
          const alt = `${item.client} — ${item.title}`;
          const isActive = isNarrow && activeId === item.id;

          return (
            <li
              key={item.id}
              data-work-id={item.id}
              className={[
                "client-selected-card",
                collapsed ? "client-selected-card--collapsed" : "",
                isActive ? "is-active" : "",
              ]
                .filter(Boolean)
                .join(" ")}
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
