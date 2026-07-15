import { site } from "@/data/site";

export default function HowWeWorkSection() {
  const workCopy = site.workModels;

  return (
    <section
      className="how-section how-work-section scroll-mt-24 px-[var(--page-padding)] pb-[var(--section-spacing)]"
      aria-label="How we work"
    >
      <div className="mx-auto w-full min-w-0 max-w-[920px]">
        <h2 className="how-col-title how-col-title-cyan how-section-heading how-work-section-title">
          {workCopy.title}
        </h2>

        <ul className="work-models-grid how-work-models-grid" role="list">
          {workCopy.cards.map((card) => (
            <li key={card.id} className={`work-model-card work-model-card--${card.id}`}>
              <span className="work-model-badge">{card.modelLabel}</span>
              <h3 className="work-model-name">{card.label}</h3>
              <ul className="work-model-chips" aria-label={`${card.label} highlights`}>
                {card.chips.map((chip) => (
                  <li key={chip} className="work-model-chip">
                    {chip}
                  </li>
                ))}
              </ul>
              <p className="work-model-body">{card.summary}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
