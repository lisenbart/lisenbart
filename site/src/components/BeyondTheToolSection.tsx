import { site } from "@/data/site";

export default function BeyondTheToolSection() {
  const copy = site.beyondTheTool;

  return (
    <section
      className="journal-quote-section how-section scroll-mt-24 px-[var(--page-padding)] pb-[var(--section-spacing)]"
      aria-label="Beyond the tool"
    >
      <div className="mx-auto w-full min-w-0 max-w-[920px]">
        <article className="journal-quote-card">
          <blockquote className="journal-quote-card__quote">
            <p className="journal-quote-card__eyebrow">{copy.eyebrow}</p>
            <h2 className="journal-quote-card__pull">{copy.title}</h2>
            <p className="journal-quote-card__dek">{copy.body}</p>
          </blockquote>
        </article>
      </div>
    </section>
  );
}
