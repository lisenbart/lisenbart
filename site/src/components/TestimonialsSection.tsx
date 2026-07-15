import TestimonialsBlock from "./TestimonialsBlock";

export default function TestimonialsSection() {
  return (
    <section
      className="scroll-mt-24 px-[var(--page-padding)] pb-[var(--section-spacing)]"
      aria-label="Client testimonials"
    >
      <div className="mx-auto w-full min-w-0 max-w-[920px]">
        <TestimonialsBlock />
      </div>
    </section>
  );
}
