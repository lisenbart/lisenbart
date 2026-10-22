import type { ReactNode } from "react";
import FilmShowreel from "@/components/film/FilmShowreel";

type PageHeroReelProps = {
  title: string;
  titleId: string;
  reel: {
    id: string;
    label: string;
    poster: string;
    vimeoId?: string | null;
    externalHref?: string;
  };
  /** Optional chrome instead of the default page title h1 */
  children?: ReactNode;
};

/**
 * Direction / project hero: existing showreel as the first viewport,
 * with page chrome (title, optional nav) overlaid like Home over the bear.
 */
export default function PageHeroReel({
  title,
  titleId,
  reel,
  children,
}: PageHeroReelProps) {
  return (
    <section className="page-hero-reel" aria-labelledby={titleId}>
      <FilmShowreel
        id={reel.id}
        label={reel.label}
        poster={reel.poster}
        vimeoId={reel.vimeoId}
        externalHref={reel.externalHref}
      />
      <div className="page-hero-reel__chrome">
        {children ?? (
          <div className="page-title-row">
            <h1 id={titleId}>{title}</h1>
          </div>
        )}
      </div>
    </section>
  );
}
