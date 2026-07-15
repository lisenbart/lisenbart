import { useEffect, useState } from "react";
import { Clapperboard, FileText, MessageSquare } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { site } from "@/data/site";

type ProcessStep = {
  num: string;
  title: string;
  text: string;
  icon: LucideIcon;
  accent: string;
};

const steps: ProcessStep[] = [
  {
    num: "01",
    title: site.endToEndProduction.steps[0].title,
    text: site.endToEndProduction.steps[0].text,
    icon: FileText,
    accent: "var(--cyan)",
  },
  {
    num: "02",
    title: site.endToEndProduction.steps[1].title,
    text: site.endToEndProduction.steps[1].text,
    icon: MessageSquare,
    accent: "var(--violet)",
  },
  {
    num: "03",
    title: site.endToEndProduction.steps[2].title,
    text: site.endToEndProduction.steps[2].text,
    icon: Clapperboard,
    accent: "var(--magenta)",
  },
];

function ProductionProcessFlow() {
  const [litCount, setLitCount] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(motionQuery.matches);

    if (motionQuery.matches) return;

    const id = window.setInterval(() => {
      setLitCount((current) => (current >= steps.length ? 0 : current + 1));
    }, 1400);

    return () => window.clearInterval(id);
  }, []);

  const visibleCount = reducedMotion ? steps.length : litCount;
  const allLit = visibleCount === steps.length;

  return (
    <div
      className={`how-process end-to-end-process${allLit ? " how-process--complete" : ""}`}
      aria-label="From brief to final delivery"
    >
      {steps.map((step, index) => (
        <div key={step.num} className="how-process-group">
          <div
            className={`how-process-card${index < visibleCount ? " how-process-card--active" : " how-process-card--pending"}`}
            style={{ ["--step-accent" as string]: step.accent }}
          >
            <div className="how-process-card-top">
              <div className="how-process-card-heading">
                <span className="how-process-num">{step.num}</span>
                <h3 className="how-process-card-title">{step.title}</h3>
              </div>
              <step.icon className="how-process-icon" strokeWidth={1.5} aria-hidden="true" />
            </div>
            <p className="how-process-card-text">{step.text}</p>
          </div>
          {index < steps.length - 1 && (
            <div
              className={`how-process-connector${!reducedMotion && visibleCount > index + 1 ? " how-process-connector-active" : ""}`}
              aria-hidden="true"
            >
              <span className="how-process-line" />
              <span className="how-process-dot" />
              <span className="how-process-line" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function EndToEndProductionSection() {
  return (
    <section
      className="end-to-end-section how-section scroll-mt-24 px-[var(--page-padding)] pb-[var(--section-spacing)]"
      aria-label="End to end production"
    >
      <div className="mx-auto w-full min-w-0 max-w-[920px]">
        <article className="how-ios-card how-ios-card-emerald" aria-label="End to end production">
          <div className="how-ios-card-inner how-ios-card-inner--compact end-to-end-inner">
            <h2 className="hero-headline end-to-end-hero-headline mx-auto w-full min-w-0 max-w-5xl font-display font-normal uppercase tracking-[0.04em] text-text-primary">
              <span className="hero-headline-row">
                {site.hero.headlineLine2BeforeAccent}
                <span className="accent-emerald">{site.hero.headlineAccent}</span>.
              </span>
            </h2>
            <p className="end-to-end-hero-lead">{site.hero.paragraph}</p>
            <ProductionProcessFlow />
          </div>
        </article>
      </div>
    </section>
  );
}
