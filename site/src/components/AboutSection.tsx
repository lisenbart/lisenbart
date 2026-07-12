import { Calendar, Rocket, Trophy, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { sectionIds } from "@/data/site";

type ExperienceStat = {
  id: string;
  icon: LucideIcon;
  lines: { text: string; tone?: "primary" | "accent"; size?: "hero" | "medium" | "compact" }[];
  subtext: string;
};

const experienceStats: ExperienceStat[] = [
  {
    id: "projects",
    icon: Rocket,
    lines: [{ text: "1000+", tone: "accent", size: "hero" }],
    subtext: "projects delivered",
  },
  {
    id: "awards",
    icon: Trophy,
    lines: [
      { text: "15 awards", tone: "accent", size: "medium" },
      { text: "45 selections", tone: "primary", size: "medium" },
    ],
    subtext: "international festival recognition",
  },
  {
    id: "timeline",
    icon: Calendar,
    lines: [{ text: "35 years", tone: "accent", size: "hero" }],
    subtext: "in animation",
  },
  {
    id: "teams",
    icon: Users,
    lines: [{ text: "Canada • Ukraine • Poland", tone: "primary", size: "compact" }],
    subtext: "creative & production teams",
  },
];

function experienceLineClass(tone: ExperienceStat["lines"][number]["tone"], size: ExperienceStat["lines"][number]["size"]) {
  const toneClass =
    tone === "accent" ? "how-experience-stat-accent" : "how-experience-stat-primary";
  const sizeClass =
    size === "hero"
      ? "how-experience-stat-line-hero"
      : size === "compact"
        ? "how-experience-stat-line-compact"
        : "how-experience-stat-line-medium";
  return `${toneClass} ${sizeClass}`;
}

function ExperienceStatCard({ stat }: { stat: ExperienceStat }) {
  return (
    <li className="how-experience-stat">
      <span className="how-experience-stat-icon-wrap" aria-hidden="true">
        <stat.icon className="how-experience-stat-icon" strokeWidth={1.5} />
      </span>
      <div className="how-experience-stat-copy">
        <div className="how-experience-stat-lines">
          {stat.lines.map((line) => (
            <span key={line.text} className={experienceLineClass(line.tone, line.size)}>
              {line.text}
            </span>
          ))}
        </div>
        <p className="how-experience-stat-sub">{stat.subtext}</p>
      </div>
    </li>
  );
}

export default function AboutSection() {
  return (
    <section
      id={sectionIds.about}
      className="scroll-mt-24 px-[var(--page-padding)] pb-[var(--section-spacing)]"
      aria-label="Experience"
    >
      <div className="mx-auto w-full min-w-0 max-w-[920px]">
        <article className="how-ios-card how-experience-card" aria-label="Experience">
          <div className="how-ios-card-inner how-experience-inner">
            <div className="how-experience-header">
              <h2 className="how-col-title how-col-title-experience">Experience</h2>
              <p className="how-experience-lead">
                Proven production experience, built across commercial and cinematic work.
              </p>
            </div>
            <ul className="how-experience-grid">
              {experienceStats.map((stat) => (
                <ExperienceStatCard key={stat.id} stat={stat} />
              ))}
            </ul>
          </div>
        </article>
      </div>
    </section>
  );
}
