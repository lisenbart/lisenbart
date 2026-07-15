import { site } from "@/data/site";

export default function BeyondTheToolSection() {
  const copy = site.beyondTheTool;

  return (
    <section
      className="how-section scroll-mt-24 px-[var(--page-padding)] pb-[var(--section-spacing)]"
      aria-label="Beyond the tool"
    >
      <div className="mx-auto w-full min-w-0 max-w-[920px]">
        <div className="how-work-beyond how-work-beyond--standalone">
          <p className="section-eyebrow">{copy.eyebrow}</p>
          <h2 className="how-work-beyond-title">{copy.title}</h2>
          <p className="how-work-beyond-body">{copy.body}</p>
        </div>
      </div>
    </section>
  );
}
