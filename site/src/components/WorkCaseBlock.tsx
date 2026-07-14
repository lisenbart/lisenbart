import { useState, type ReactNode } from "react";
import { Play, Youtube } from "lucide-react";
import type { WorkCaseStudy } from "@/data/work";
import { sectionIds, site } from "@/data/site";
import { routes } from "@/lib/routes";
import ImdbTitleRating from "@/components/ImdbTitleRating";
import WorkYouTubeChannelPreview from "@/components/WorkYouTubeChannelPreview";
import WorkPlayablesPreview from "@/components/WorkPlayablesPreview";

interface WorkCaseBlockProps {
  item: WorkCaseStudy;
  mediaSide: "left" | "right";
  bordered?: boolean;
}

const STAT_PATTERN = /(\d+(?:[.,]\d+)?(?:K|M)?)/g;

function highlightStats(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;

  for (const match of text.matchAll(STAT_PATTERN)) {
    const value = match[0];
    const index = match.index ?? 0;

    if (index > lastIndex) {
      nodes.push(text.slice(lastIndex, index));
    }

    nodes.push(
      <span key={`${index}-${value}`} className="work-block-stat">
        {value}
      </span>,
    );

    lastIndex = index + value.length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes.length > 0 ? nodes : [text];
}

function linkifyChannelName(text: string, channelName: string, channelUrl: string): ReactNode[] {
  const index = text.indexOf(channelName);
  if (index === -1) {
    return [text];
  }

  return [
    text.slice(0, index),
    <a
      key={`${channelName}-${index}`}
      href={channelUrl}
      className="work-block-channel-link"
      target="_blank"
      rel="noopener noreferrer"
    >
      {channelName}
    </a>,
    text.slice(index + channelName.length),
  ];
}

function renderDescriptionBody(item: WorkCaseStudy, body: string): ReactNode {
  if (item.youtubeUrl && item.client && body.includes(item.client)) {
    return linkifyChannelName(body, item.client, item.youtubeUrl);
  }

  return body;
}

function vimeoEmbedSrc(vimeoId: string, autoplay = false): string {
  const params = new URLSearchParams({
    title: "0",
    byline: "0",
    portrait: "0",
    badge: "0",
    autopause: "0",
    dnt: "1",
    transparent: "0",
  });
  if (autoplay) params.set("autoplay", "1");
  return `https://player.vimeo.com/video/${vimeoId}?${params.toString()}`;
}

function youtubeEmbedSrc(youtubeVideoId: string, autoplay = false): string {
  const params = new URLSearchParams({
    rel: "0",
    modestbranding: "1",
  });
  if (autoplay) params.set("autoplay", "1");
  return `https://www.youtube.com/embed/${youtubeVideoId}?${params.toString()}`;
}

function WorkBlockMedia({ item }: { item: WorkCaseStudy }) {
  const [playing, setPlaying] = useState(false);

  if (item.playableTiers && item.playableTiers.length > 0) {
    return (
      <div className="work-block-media work-block-media--playables">
        <WorkPlayablesPreview tiers={item.playableTiers} title={item.title} />
      </div>
    );
  }

  const embedSrc = item.vimeoId
    ? vimeoEmbedSrc(item.vimeoId, playing)
    : item.youtubeVideoId
      ? youtubeEmbedSrc(item.youtubeVideoId, playing)
      : null;

  const iframeAllow = item.youtubeVideoId
    ? "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    : "autoplay; fullscreen; picture-in-picture; encrypted-media";

  if (embedSrc) {
    const hasYouTubePreview =
      item.youtubeVideoId &&
      item.youtubeBannerImage &&
      item.youtubeThumbnails &&
      item.youtubeThumbnails.length > 0 &&
      item.mediaImage;

    if (!playing && hasYouTubePreview) {
      return (
        <div className="work-block-media work-block-media--video work-block-media--poster work-block-media--youtube">
          <WorkYouTubeChannelPreview
            title={item.title}
            bannerImage={item.youtubeBannerImage!}
            avatarImage={item.mediaImage!}
            thumbnails={item.youtubeThumbnails!}
            onPlay={() => setPlaying(true)}
          />
        </div>
      );
    }

    if (!playing && item.mediaImage) {
      return (
        <div className="work-block-media work-block-media--video work-block-media--poster">
          <img
            src={item.mediaImage}
            alt={item.mediaImageAlt ?? `${item.title} preview`}
            className="work-block-media__image"
          />
          <div className="work-block-media__overlay" aria-hidden="true" />
          <button
            type="button"
            className="showreel-stage-play work-block-media__play"
            onClick={() => setPlaying(true)}
            aria-label={`Play ${item.title} video`}
          >
            <Play className="showreel-stage-play-icon" fill="currentColor" strokeWidth={0} />
          </button>
        </div>
      );
    }

    return (
      <div className="work-block-media work-block-media--video">
        <iframe
          src={embedSrc}
          title={`${item.title} video`}
          allow={iframeAllow}
          allowFullScreen
          className="work-block-media__iframe"
        />
      </div>
    );
  }

  if (item.mediaImage) {
    return (
      <div className="work-block-media">
        <img
          src={item.mediaImage}
          alt={item.mediaImageAlt ?? item.title}
          className="work-block-media__image"
        />
      </div>
    );
  }

  if (item.mediaPlaceholder) {
    return (
      <div
        className="work-block-media work-block-media--placeholder"
        style={{ backgroundColor: item.mediaColor }}
      >
        <div className="work-block-media-placeholder">
          <p className="work-block-media-placeholder__headline">{item.mediaPlaceholder.headline}</p>
          <a
            href={`${routes.home}#${sectionIds.contact}`}
            className="work-block-media-placeholder__cta gradient-button-emerald btn-on-accent"
          >
            {item.mediaPlaceholder.ctaLabel ?? site.ctaLabel}
          </a>
        </div>
      </div>
    );
  }

  if (item.comingSoonProgress !== undefined) {
    const progress = Math.min(100, Math.max(0, item.comingSoonProgress));
    return (
      <div
        className="work-block-media work-block-media--coming-soon"
        style={{ backgroundColor: item.mediaColor }}
        role="img"
        aria-label={`Coming soon — ${progress} percent complete`}
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
            aria-label="Production progress"
          >
            <span
              className="work-block-coming-soon__progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="work-block-coming-soon__percent">{progress}%</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className="work-block-media"
      style={{ backgroundColor: item.mediaColor }}
      role="img"
      aria-label="Case media coming soon"
    >
      <span className="work-block-media-label" aria-hidden="true">
        COMING SOON
      </span>
    </div>
  );
}

export default function WorkCaseBlock({ item, mediaSide, bordered = false }: WorkCaseBlockProps) {
  return (
    <article
      id={item.id}
      className={`work-block work-block--media-${mediaSide}${bordered ? " work-block--bordered" : ""}`}
      aria-labelledby={`work-block-title-${item.id}`}
    >
      <div className="work-block-inner">
        <WorkBlockMedia item={item} />
        <div className="work-block-copy">
          <p className="work-block-meta">
            <span>{item.client}</span>
            <span className="work-block-meta-sep" aria-hidden="true">
              ·
            </span>
            <span>{item.category}</span>
            <span className="work-block-meta-sep" aria-hidden="true">
              ·
            </span>
            <span>{item.year}</span>
          </p>
          <h2 id={`work-block-title-${item.id}`} className="work-block-title">
            <span className="work-block-title-text">{item.title}</span>
            {item.imdbId ? <ImdbTitleRating imdbId={item.imdbId} /> : null}
          </h2>
          <p className="work-block-description">
            {item.description.includes("\n") ? (
              <>
                <span className="work-block-description-lead">
                  {highlightStats(item.description.split("\n")[0])}
                </span>
                <span className="work-block-description-body">
                  {renderDescriptionBody(item, item.description.split("\n").slice(1).join(" "))}
                </span>
              </>
            ) : (
              item.description
            )}
          </p>
          <p className="work-block-result">
            <span className="work-block-result-label">Result</span>
            {highlightStats(item.result)}
          </p>
          {item.youtubeUrl ? (
            <div className="work-block-cta-row">
              <a
                href={item.youtubeUrl}
                className="work-block-youtube-cta"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Youtube className="work-block-youtube-cta__icon" aria-hidden="true" />
                Watch on YouTube
              </a>
              <a
                href={`${routes.home}#${sectionIds.contact}`}
                className="work-block-contact-cta gradient-button-emerald btn-on-accent"
              >
                {site.ctaLabel}
              </a>
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
}
