import ContactForm from "@/components/ContactForm";
import { sectionIds, site } from "@/data/site";

export default function PersonalAboutSection({
  hideContact = false,
}: {
  hideContact?: boolean;
}) {
  const { personalAbout } = site;

  return (
    <section id={sectionIds.about} className="about-body" aria-label="About">
      <h2 className="film-section-label">{personalAbout.title}</h2>

      <div className="about-body__copy">
        {personalAbout.paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 40)} className="film-lead">
            {paragraph}
          </p>
        ))}
      </div>

      {personalAbout.markers.length > 0 ? (
        <ul className="about-body__markers">
          {personalAbout.markers.map((marker) => (
            <li key={marker}>{marker}</li>
          ))}
        </ul>
      ) : null}

      <p className="about-body__closing">{personalAbout.closing}</p>

      {!hideContact ? <ContactForm embedded labelledBy="about-closing" /> : null}
    </section>
  );
}
