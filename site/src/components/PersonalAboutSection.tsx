import ContactForm from "@/components/ContactForm";
import { sectionIds, site } from "@/data/site";

export default function PersonalAboutSection() {
  const { personalAbout } = site;

  return (
    <section id={sectionIds.about} className="archive-about scroll-mt-24" aria-label="About">
      <div className="archive-about__inner">
        <div className="archive-about__copy archive-about__copy--solo">
          <div className="archive-about__heading">
            <span className="archive-about__mark" aria-hidden="true">
              “
            </span>
            <h2 className="archive-h2">{personalAbout.title}</h2>
          </div>

          <blockquote className="archive-about__quote">
            {personalAbout.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 32)} className="archive-about__quote-line">
                {paragraph}
              </p>
            ))}
          </blockquote>

          {personalAbout.markers.length > 0 && (
            <ul className="archive-about__markers">
              {personalAbout.markers.map((marker) => (
                <li key={marker} className="archive-about__marker">
                  {marker}
                </li>
              ))}
            </ul>
          )}

          <div className="archive-about__bridge">
            <h2 id="about-closing" className="archive-about__closing">
              {personalAbout.closing}
            </h2>
          </div>

          <ContactForm embedded labelledBy="about-closing" />
        </div>
      </div>
    </section>
  );
}
