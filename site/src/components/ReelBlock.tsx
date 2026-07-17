import { useEffect, useState } from "react";
import HeroShowreel from "./HeroShowreel";

interface ReelBlockProps {
  id: string;
  label: string;
  text: string;
  /** Pass `null` when the Vimeo ID is still TODO. */
  videoId: string | null;
  /** ISO deadline — shows COMING SOON media with a 10-day countdown progress bar. */
  comingSoonEndsAt?: string;
}

const COUNTDOWN_WINDOW_MS = 10 * 24 * 60 * 60 * 1000;

function useCountdownProgress(endsAt?: string) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (!endsAt) return;
    const id = window.setInterval(() => setNow(Date.now()), 60_000);
    return () => window.clearInterval(id);
  }, [endsAt]);

  if (!endsAt) return null;

  const end = new Date(endsAt).getTime();
  if (Number.isNaN(end)) return null;

  const start = end - COUNTDOWN_WINDOW_MS;
  const remainingMs = Math.max(0, end - now);
  const elapsedMs = Math.min(COUNTDOWN_WINDOW_MS, Math.max(0, now - start));
  const progress = Math.round((elapsedMs / COUNTDOWN_WINDOW_MS) * 100);
  const daysLeft = Math.max(0, Math.ceil(remainingMs / (24 * 60 * 60 * 1000)));

  return { progress, daysLeft, remainingMs };
}

function ComingSoonMedia({ endsAt, label }: { endsAt: string; label: string }) {
  const countdown = useCountdownProgress(endsAt);
  const progress = countdown?.progress ?? 0;
  const daysLeft = countdown?.daysLeft ?? 0;
  const countdownLabel =
    daysLeft <= 0 ? "Available soon" : daysLeft === 1 ? "1 day left" : `${daysLeft} days left`;

  return (
    <div
      className="work-block-media work-block-media--coming-soon reel-block__media"
      role="img"
      aria-label={`${label} — coming soon, ${countdownLabel}`}
    >
      <div className="work-block-coming-soon">
        <span className="work-block-media-label" aria-hidden="true">
          COMING SOON
        </span>
        <div
          className="work-block-coming-soon__progress"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Countdown progress"
        >
          <span className="work-block-coming-soon__progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <span className="work-block-coming-soon__percent">{countdownLabel}</span>
      </div>
    </div>
  );
}

/** Repeatable commercial reel card — media left, copy right (same as /film cases). */
export default function ReelBlock({
  id,
  label,
  text,
  videoId,
  comingSoonEndsAt,
}: ReelBlockProps) {
  const ariaLabel = `${label} reel`;
  const showComingSoon = Boolean(comingSoonEndsAt);

  return (
    <article
      id={id}
      className="work-block work-block--media-left reel-block"
      aria-labelledby={`reel-block-title-${id}`}
    >
      <div className="work-block-inner reel-block__inner">
        {showComingSoon && comingSoonEndsAt ? (
          <ComingSoonMedia endsAt={comingSoonEndsAt} label={label} />
        ) : (
          <div
            className="work-block-media work-block-media--video showreel-card-media hero-showreel-frame reel-block__media relative min-w-0"
            aria-label={ariaLabel}
          >
            <HeroShowreel vimeoId={videoId} title={ariaLabel} />
          </div>
        )}

        <div className="work-block-copy reel-block__copy">
          <h2 id={`reel-block-title-${id}`} className="work-block-title reel-block__label">
            {label}
          </h2>
          <p className="work-block-description reel-block__text">{text}</p>
        </div>
      </div>
    </article>
  );
}
