import { sectionIds, site } from "@/data/site";

export default function PersonalAboutSection() {
  const { personalAbout } = site;

  return (
    <section id={sectionIds.about} className="archive-about scroll-mt-24" aria-label="About">
      <div className="archive-about__inner archive-container">
        <div className="archive-about__copy archive-about__copy--solo">
          <h2 className="archive-h2">{personalAbout.title}</h2>
          {personalAbout.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 24)} className="archive-body archive-about__text">
              {paragraph}
            </p>
          ))}
          {personalAbout.markers.length > 0 && (
            <ul className="archive-about__markers">
              {personalAbout.markers.map((marker) => (
                <li key={marker} className="archive-about__marker">
                  {marker}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
