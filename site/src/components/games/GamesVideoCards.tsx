import { PlayIcon } from "@/components/film/FilmIcons";
import { useReel } from "@/contexts/ReelContext";
import type { SelectedWorkItem } from "@/components/film/SelectedWorkGrid";
import { publicAsset } from "@/lib/publicAsset";

export default function GamesVideoCards({ items }: { items: readonly SelectedWorkItem[] }) {
  const { openReel } = useReel();

  return (
    <>
      {items.map((item, index) => {
        const alt = `${item.client} — ${item.title}`;
        const poster = item.poster
          ? item.poster.startsWith("http")
            ? item.poster
            : publicAsset(item.poster)
          : null;
        const canPlay = Boolean(item.youtubeId || item.vimeoId);

        return (
          <div key={item.id} className="games-proof-card" role="listitem">
            <button
              type="button"
              className="games-proof-card__button"
              aria-label={canPlay ? `Play ${alt}` : alt}
              disabled={!canPlay}
              onClick={() => {
                if (item.youtubeId) {
                  openReel({ provider: "youtube", id: item.youtubeId }, alt);
                  return;
                }
                if (item.vimeoId) openReel(item.vimeoId, alt);
              }}
            >
              <span className="games-proof-card__media">
                {poster ? (
                  <img
                    src={poster}
                    alt=""
                    width={1280}
                    height={720}
                    loading={index < 3 ? "eager" : "lazy"}
                    decoding="async"
                  />
                ) : null}
                {canPlay ? (
                  <span className="games-proof-card__play" aria-hidden="true">
                    <span className="games-proof-card__play-circle">
                      <PlayIcon />
                    </span>
                  </span>
                ) : null}
              </span>
              <span className="games-proof-card__meta">
                <span className="games-proof-card__name">{item.title}</span>
                <span className="games-proof-card__tap">{item.client}</span>
              </span>
            </button>
          </div>
        );
      })}
    </>
  );
}
