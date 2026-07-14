import { Play, Youtube } from "lucide-react";

interface WorkYouTubeChannelPreviewProps {
  title: string;
  bannerImage: string;
  avatarImage: string;
  thumbnails: string[];
  onPlay: () => void;
}

export default function WorkYouTubeChannelPreview({
  title,
  bannerImage,
  avatarImage,
  thumbnails,
  onPlay,
}: WorkYouTubeChannelPreviewProps) {
  return (
    <div className="work-youtube-preview">
      <div className="work-youtube-preview__banner">
        <img src={bannerImage} alt="" className="work-youtube-preview__banner-image" />
      </div>

      <div className="work-youtube-preview__header">
        <img
          src={avatarImage}
          alt=""
          className="work-youtube-preview__avatar"
        />
        <div className="work-youtube-preview__meta">
          <p className="work-youtube-preview__title">{title}</p>
          <p className="work-youtube-preview__label">YouTube channel</p>
        </div>
      </div>

      <div className="work-youtube-preview__grid" aria-hidden="true">
        {thumbnails.map((thumb, index) => (
          <div key={thumb} className="work-youtube-preview__thumb">
            <img src={thumb} alt="" className="work-youtube-preview__thumb-image" />
            {index === 0 ? <span className="work-youtube-preview__thumb-play" /> : null}
          </div>
        ))}
      </div>

      <div className="work-youtube-preview__brand" aria-hidden="true">
        <Youtube className="work-youtube-preview__brand-icon" />
      </div>

      <button
        type="button"
        className="showreel-stage-play work-block-media__play work-youtube-preview__play"
        onClick={onPlay}
        aria-label={`Play ${title} video`}
      >
        <Play className="showreel-stage-play-icon" fill="currentColor" strokeWidth={0} />
      </button>
    </div>
  );
}
