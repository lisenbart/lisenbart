import type { ReactNode } from "react";
import FilmShowreel from "@/components/film/FilmShowreel";

type ReelProps = {
  id: string;
  label: string;
  poster: string;
  vimeoId?: string | null;
  externalHref?: string;
};

type PageHeroReelProps = {
  /** Used for default chrome; optional when `children` provide the heading */
  title?: string;
  titleId: string;
  /** Standard Vimeo/poster showreel */
  reel?: ReelProps;
  /** Custom hero media (e.g. Studio slideshow) — replaces reel when set */
  media?: ReactNode;
  /** Optional chrome instead of the default page title h1 */
  children?: ReactNode;
};

/**
 * Direction / project / studio hero: media as the first viewport,
 * with page chrome (title, optional nav) overlaid like Home over the bear.
 */
export default function PageHeroReel({
  title,
  titleId,
  reel,
  media,
  children,
}: PageHeroReelProps) {
  return (
    <section className="page-hero-reel" aria-labelledby={titleId}>
      {media ??
        (reel ? (
          <FilmShowreel
            id={reel.id}
            label={reel.label}
            poster={reel.poster}
            vimeoId={reel.vimeoId}
            externalHref={reel.externalHref}
          />
        ) : null)}
      <div className="page-hero-reel__chrome">
        {children ?? (
          <div className="page-title-row">
            <h1 id={titleId}>{title ?? ""}</h1>
          </div>
        )}
      </div>
    </section>
  );
}
