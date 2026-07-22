import type { WorkCaseStudy } from "@/data/work";
import { publicAsset } from "@/lib/publicAsset";

interface OriginalIpCardProps {
  item: WorkCaseStudy;
}

function splitDescription(description: string) {
  const [first = "", ...rest] = description.split("\n");
  return {
    stats: first.trim(),
    blurb: rest.join("\n").trim(),
  };
}

/** Preschool YouTube IP card — no faux channel chrome. */
export default function OriginalIpCard({ item }: OriginalIpCardProps) {
  const meta = item.filmCategory ?? item.category;
  const { stats, blurb } = splitDescription(item.description);
  const youtubeHref = item.youtubeUrl;

  return (
    <article id={item.id} className="originals-ip-card">
      {item.mediaImage && (
        <div className="originals-ip-card__media">
          <img
            src={publicAsset(item.mediaImage)}
            alt={item.mediaImageAlt ?? item.title}
            width={640}
            height={360}
            loading="lazy"
            decoding="async"
          />
        </div>
      )}

      <div className="originals-ip-card__body">
        <h3 className="originals-ip-card__title">{item.title}</h3>
        {meta && <p className="originals-ip-card__meta">{meta}</p>}
        {stats && <p className="originals-ip-card__stats">{stats}</p>}
        {blurb && <p className="originals-ip-card__text">{blurb}</p>}

        {youtubeHref && (
          <p className="originals-ip-card__cta-row">
            <a
              className="originals-case__cta"
              href={youtubeHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              Watch on YouTube
            </a>
          </p>
        )}
      </div>
    </article>
  );
}
