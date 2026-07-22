import { sectionIds, site } from "@/data/site";
import HeroShowreel from "./HeroShowreel";

interface ShowreelSectionProps {
  title?: string;
  vimeoId?: string | null;
  shareUrl?: string;
  sectionId?: string;
  ariaLabel?: string;
}

export default function ShowreelSection({
  title = site.showreelSection.title,
  vimeoId,
  shareUrl,
  sectionId = sectionIds.showreel,
  ariaLabel = "Showreel",
}: ShowreelSectionProps) {
  return (
    <section id={sectionId} className="archive-showreel scroll-mt-24" aria-label={ariaLabel}>
      <div className="archive-showreel__inner archive-container">
        <div className="archive-split-card archive-showreel__card">
          <div className="archive-split-card__media archive-showreel__stage video-stage hero-showreel-frame relative w-full min-w-0">
            <HeroShowreel vimeoId={vimeoId} shareUrl={shareUrl} title={ariaLabel} />
          </div>
          <div className="archive-split-card__content">
            <div className="archive-split-card__heading">
              <h2 className="archive-split-card__title archive-showreel__title">{title}</h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
