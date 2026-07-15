import { useRef, useState, type MouseEvent, type RefObject } from "react";
import { AnimatePresence } from "framer-motion";
import { Award, ChevronRight, Clapperboard, Globe2, History } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import AwardsPopover from "./AwardsPopover";
import ClientsPopover from "./ClientsPopover";
import StudioPopover from "./StudioPopover";
import TeamPopover from "./TeamPopover";
import { sectionIds } from "@/data/site";

type ExperiencePopoverId = "clients" | "studio" | "awards" | "team";

type ExperienceStat = {
  id: "projects" | "awards" | "timeline" | "teams";
  icon: LucideIcon;
  lines: { text: string; tone?: "primary" | "accent"; size?: "hero" | "medium" | "compact" }[];
  subtext?: string;
  interactive?: boolean;
  popover?: ExperiencePopoverId;
  interactiveHint?: string;
  interactiveAriaLabel?: string;
};

interface ClickPoint {
  x: number;
  y: number;
}

const experienceStats: ExperienceStat[] = [
  {
    id: "projects",
    icon: Clapperboard,
    lines: [{ text: "1000+", tone: "accent", size: "hero" }],
    subtext: "projects delivered",
    interactive: true,
    popover: "clients",
    interactiveHint: "View clients",
    interactiveAriaLabel: "1000 plus projects delivered. View clients.",
  },
  {
    id: "awards",
    icon: Award,
    lines: [
      { text: "15 awards", tone: "accent", size: "medium" },
      { text: "45 selections", tone: "primary", size: "medium" },
      { text: "8.0 on IMDb", tone: "primary", size: "compact" },
    ],
    interactive: true,
    popover: "awards",
    interactiveHint: "Festival recognition",
    interactiveAriaLabel: "15 awards, 45 selections, 8.0 on IMDb. Festival recognition.",
  },
  {
    id: "timeline",
    icon: History,
    lines: [{ text: "20 years", tone: "accent", size: "hero" }],
    subtext: "in animation since 2006",
    interactive: true,
    popover: "studio",
    interactiveHint: "About the studio",
    interactiveAriaLabel: "20 years in animation since 2006. About the studio.",
  },
  {
    id: "teams",
    icon: Globe2,
    lines: [{ text: "Canada • Ukraine • Poland", tone: "primary", size: "compact" }],
    subtext: "creative & production teams",
    interactive: true,
    popover: "team",
    interactiveHint: "Global team",
    interactiveAriaLabel: "Canada, Ukraine, Poland. Global team.",
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
  onInteractiveOpen?: (event: MouseEvent<HTMLButtonElement>) => void;
  cardRef?: RefObject<HTMLLIElement | null>;
}

function ExperienceStatCard({ stat, onInteractiveOpen, cardRef }: ExperienceStatCardProps) {
  const content = (
    <>
      <span
        className={`how-experience-stat-icon-wrap how-experience-stat-icon-wrap--${stat.id}`}
        aria-hidden="true"
      >
        <stat.icon className="how-experience-stat-icon" strokeWidth={1.65} />
      </span>
      <div className="how-experience-stat-copy">
        <div className="how-experience-stat-lines">
          {stat.lines.map((line) => (
            <span key={line.text} className={experienceLineClass(line.tone, line.size)}>
              {line.text}
            </span>
          ))}
        </div>
        {stat.subtext ? <p className="how-experience-stat-sub">{stat.subtext}</p> : null}
        {stat.interactive && stat.interactiveHint ? (
          <p className="how-experience-stat-hint">{stat.interactiveHint}</p>
        ) : null}
      </div>
      {stat.interactive && (
        <span className="how-experience-stat-action" aria-hidden="true">
          <ChevronRight className="how-experience-stat-chevron" size={20} strokeWidth={2.15} />
        </span>
      )}
    </>
  );

  if (stat.interactive && onInteractiveOpen) {
    return (
      <li ref={cardRef} className="how-experience-stat how-experience-stat--interactive">
        <button
          type="button"
          className="how-experience-stat-button"
          onClick={onInteractiveOpen}
          aria-haspopup="dialog"
          aria-label={stat.interactiveAriaLabel}
        >
          {content}
        </button>
      </li>
    );
  }

  return <li className="how-experience-stat">{content}</li>;
}

const experienceLead =
  "Proven production experience, built across commercial and cinematic work.";

export default function AboutSection() {
  const [openPopover, setOpenPopover] = useState<ExperiencePopoverId | null>(null);
  const [clickPoint, setClickPoint] = useState<ClickPoint | null>(null);
  const projectsRef = useRef<HTMLLIElement>(null);
  const awardsRef = useRef<HTMLLIElement>(null);
  const timelineRef = useRef<HTMLLIElement>(null);
  const teamRef = useRef<HTMLLIElement>(null);

  const popoverRefs: Record<ExperiencePopoverId, RefObject<HTMLLIElement | null>> = {
    clients: projectsRef,
    awards: awardsRef,
    studio: timelineRef,
    team: teamRef,
  };

  const handleStatOpen =
    (popover: ExperiencePopoverId) => (event: MouseEvent<HTMLButtonElement>) => {
      setClickPoint({ x: event.clientX, y: event.clientY });
      setOpenPopover(popover);
    };

  const closePopover = () => {
    setOpenPopover(null);
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
            <div className="section-card-header how-experience-header">
              <h2 className="how-col-title how-col-title-experience section-card-header__title">
                Experience
              </h2>
              <p className="section-card-header__lead how-experience-lead">{experienceLead}</p>
            </div>
            <ul className="how-experience-grid">
              {experienceStats.map((stat) => (
                <ExperienceStatCard
                  key={stat.id}
                  stat={stat}
                  cardRef={stat.popover ? popoverRefs[stat.popover] : undefined}
                  onInteractiveOpen={
                    stat.interactive && stat.popover
                      ? handleStatOpen(stat.popover)
                      : undefined
                  }
                />
              ))}
            </ul>
          </div>
        </article>
      </div>

      <AnimatePresence>
        {openPopover === "clients" && clickPoint ? (
          <ClientsPopover clickPoint={clickPoint} rootRef={projectsRef} onClose={closePopover} />
        ) : null}
        {openPopover === "awards" && clickPoint ? (
          <AwardsPopover clickPoint={clickPoint} rootRef={awardsRef} onClose={closePopover} />
        ) : null}
        {openPopover === "studio" && clickPoint ? (
          <StudioPopover clickPoint={clickPoint} rootRef={timelineRef} onClose={closePopover} />
        ) : null}
        {openPopover === "team" && clickPoint ? (
          <TeamPopover clickPoint={clickPoint} rootRef={teamRef} onClose={closePopover} />
        ) : null}
      </AnimatePresence>
    </section>
  );
}
