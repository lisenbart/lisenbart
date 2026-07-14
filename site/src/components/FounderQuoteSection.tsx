import { site } from "@/data/site";

export default function FounderQuoteSection() {
  return (
    <section className="founder-quote-section px-[var(--page-padding)]" aria-label="Founder note">
      <div className="mx-auto w-full min-w-0 max-w-[920px] text-center">
        <blockquote className="founder-quote">
          <p className="founder-quote-text">{site.founderQuote.text}</p>
          <footer className="founder-quote-author">— {site.founderQuote.author}</footer>
        </blockquote>
      </div>
    </section>
  );
}
