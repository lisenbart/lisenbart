import { sectionIds, site } from "@/data/site";
import HeroShowreel from "./HeroShowreel";

interface ShowreelSectionProps {
  title?: string;
  caption?: string;
  /** Omit for default home reel. Pass `null` when the Vimeo ID is still TODO. */
  vimeoId?: string | null;
  shareUrl?: string;
  sectionId?: string;
  ariaLabel?: string;
}

export default function ShowreelSection({
  title = site.showreelSection.title,
  caption = site.showreelSection.caption,
  vimeoId,
  shareUrl,
  sectionId = sectionIds.showreel,
  ariaLabel = "Showreel",
}: ShowreelSectionProps) {
  return (
    <section id={sectionId} className="archive-showreel scroll-mt-24" aria-label={ariaLabel}>
      <div className="archive-showreel__inner archive-container">
        <div className="archive-showreel__header">
          <h2 className="archive-showreel__title">{title}</h2>
          <p className="archive-showreel__caption">{caption}</p>
        </div>
        <div className="archive-showreel__stage video-stage hero-showreel-frame relative w-full min-w-0">
          <HeroShowreel vimeoId={vimeoId} shareUrl={shareUrl} title={ariaLabel} />
        </div>
      </div>
    </section>
  );
}
