import { sectionIds, site } from "@/data/site";

const STATS = [
  { value: "35", label: "Years in animation" },
  { value: "20", label: "Years producing" },
  { value: "1,000+", label: "Projects delivered" },
] as const;

export default function PersonalAboutSection() {
  const { personalAbout } = site;

  return (
    <section id={sectionIds.about} className="archive-about scroll-mt-24" aria-label="About">
      <div className="archive-about__inner archive-container">
        <div className="archive-about__stats" aria-label="Experience">
          {STATS.map((stat) => (
            <p key={stat.label} className="archive-about__stat">
              <span className="archive-about__stat-value">{stat.value}</span>
              <span className="archive-about__stat-label">{stat.label}</span>
            </p>
          ))}
        </div>

        <div className="archive-about__copy">
          <h2 className="archive-h2">{personalAbout.title}</h2>
          <p className="archive-body archive-about__text">{personalAbout.bio}</p>
          <ul className="archive-about__markers">
            <li className="archive-about__marker">{personalAbout.recognition}</li>
            <li className="archive-about__marker">{personalAbout.locations}</li>
            <li className="archive-about__marker">Karpenko-Kary University</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
