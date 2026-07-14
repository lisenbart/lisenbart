import { useRef, useState, type MouseEvent, type RefObject } from "react";
import { AnimatePresence } from "framer-motion";
import { Calendar, ChevronRight, Rocket, Trophy, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import ClientsPopover from "./ClientsPopover";
import TestimonialsBlock from "./TestimonialsBlock";
import { sectionIds } from "@/data/site";

type ExperienceStat = {
  id: string;
  icon: LucideIcon;
  lines: { text: string; tone?: "primary" | "accent"; size?: "hero" | "medium" | "compact" }[];
  subtext: string;
  interactive?: boolean;
};

interface ClickPoint {
  x: number;
  y: number;
}

const experienceStats: ExperienceStat[] = [
  {
    id: "projects",
    icon: Rocket,
    lines: [{ text: "1000+", tone: "accent", size: "hero" }],
    subtext: "projects delivered",
    interactive: true,
  },
  {
    id: "awards",
    icon: Trophy,
    lines: [
      { text: "15 awards", tone: "accent", size: "medium" },
      { text: "45 selections", tone: "primary", size: "medium" },
    ],
    subtext: "international festival recognition — incl. Ottawa, Animafest Zagreb, Krok",
  },
  {
    id: "timeline",
    icon: Calendar,
    lines: [{ text: "20 years", tone: "accent", size: "hero" }],
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

interface ExperienceStatCardProps {
  stat: ExperienceStat;
  onProjectsOpen?: (event: MouseEvent<HTMLButtonElement>) => void;
  cardRef?: RefObject<HTMLLIElement | null>;
}

function ExperienceStatCard({ stat, onProjectsOpen, cardRef }: ExperienceStatCardProps) {
  const content = (
    <>
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
        {stat.interactive && (
          <p className="how-experience-stat-hint">{stat.id === "projects" ? "View clients" : ""}</p>
        )}
      </div>
      {stat.interactive && (
        <span className="how-experience-stat-action" aria-hidden="true">
          <ChevronRight className="how-experience-stat-chevron" size={20} strokeWidth={2.15} />
        </span>
      )}
    </>
  );

  if (stat.interactive && onProjectsOpen) {
    return (
      <li ref={cardRef} className="how-experience-stat how-experience-stat--interactive">
        <button
          type="button"
          className="how-experience-stat-button"
          onClick={onProjectsOpen}
          aria-haspopup="dialog"
          aria-label="1000 plus projects delivered. View clients."
        >
          {content}
        </button>
      </li>
    );
  }

  return <li className="how-experience-stat">{content}</li>;
}

export default function AboutSection() {
  const [clientsOpen, setClientsOpen] = useState(false);
  const [clickPoint, setClickPoint] = useState<ClickPoint | null>(null);
  const projectsRef = useRef<HTMLLIElement>(null);

  const handleProjectsOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setClickPoint({ x: event.clientX, y: event.clientY });
    setClientsOpen(true);
  };

  const closeClients = () => {
    setClientsOpen(false);
    setClickPoint(null);
  };

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
              <p className="how-experience-identity">
                Dmytro Lisenbart — producer, named lead and the trusted point of contact for clients across
                three continents.
              </p>
              <p className="how-experience-lead">
                Proven production experience, built across commercial and cinematic work.
              </p>
            </div>
            <ul className="how-experience-grid">
              {experienceStats.map((stat) => (
                <ExperienceStatCard
                  key={stat.id}
                  stat={stat}
                  cardRef={stat.id === "projects" ? projectsRef : undefined}
                  onProjectsOpen={stat.interactive ? handleProjectsOpen : undefined}
                />
              ))}
            </ul>
          </div>
        </article>

        <TestimonialsBlock />
      </div>

      <AnimatePresence>
        {clientsOpen && clickPoint && (
          <ClientsPopover clickPoint={clickPoint} rootRef={projectsRef} onClose={closeClients} />
        )}
      </AnimatePresence>
    </section>
  );
}
