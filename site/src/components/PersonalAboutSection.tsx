import { sectionIds, site } from "@/data/site";

export default function PersonalAboutSection() {
  const { personalAbout } = site;

  return (
    <section
      id={sectionIds.about}
      className="scroll-mt-24 px-[var(--page-padding)] pb-[var(--section-spacing)]"
      aria-label="About"
    >
      <div className="mx-auto w-full min-w-0 max-w-[920px]">
        <article className="how-ios-card">
          <div className="how-ios-card-inner">
            <p className="personal-section-eyebrow">{personalAbout.eyebrow}</p>
            <h2 className="how-col-title section-heading">{personalAbout.title}</h2>
            <p className="personal-about__text">{personalAbout.bio}</p>
            <p className="personal-about__recognition">{personalAbout.recognition}</p>
            <p className="personal-about__locations">{personalAbout.locations}</p>
          </div>
        </article>
      </div>
    </section>
  );
}
