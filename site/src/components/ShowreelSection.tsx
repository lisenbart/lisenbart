import { sectionIds, site } from "@/data/site";
import HeroShowreel from "./HeroShowreel";

interface ShowreelSectionProps {
  eyebrow?: string;
  caption?: string;
  /** Omit for default home reel. Pass `null` when the Vimeo ID is still TODO. */
  vimeoId?: string | null;
  shareUrl?: string;
  sectionId?: string;
  ariaLabel?: string;
}

export default function ShowreelSection({
  eyebrow = site.showreelSection.eyebrow,
  caption = site.showreelSection.caption,
  vimeoId,
  shareUrl,
  sectionId = sectionIds.showreel,
  ariaLabel = "Showreel",
}: ShowreelSectionProps) {
  return (
    <section
      id={sectionId}
      className="scroll-mt-24 px-[var(--page-padding)] pb-[var(--section-spacing)]"
      aria-label={ariaLabel}
    >
      <div className="mx-auto w-full min-w-0 max-w-[920px]">
        <article className="how-ios-card showreel-card" aria-label={ariaLabel}>
          <div className="showreel-section__frame">
            <p className="personal-section-eyebrow">{eyebrow}</p>
            <div className="video-stage showreel-card-media hero-showreel-frame relative w-full min-w-0">
              <HeroShowreel vimeoId={vimeoId} shareUrl={shareUrl} title={ariaLabel} />
            </div>
            <p className="showreel-section__caption">{caption}</p>
          </div>
        </article>
      </div>
    </section>
  );
}
