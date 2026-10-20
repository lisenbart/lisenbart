import { Arrow } from "@/components/film/FilmIcons";
import { goToContactWithPrefill } from "@/data/site";

/**
 * Concise B2B invitation on Originals overview — no partner list, no second form.
 * CTA scrolls to the shared Contact section with Originals Partnership prefill.
 */
export default function OriginalsPartnershipSection() {
  return (
    <section
      className="originals-partnership"
      aria-labelledby="originals-partnership-heading"
    >
      <h2 id="originals-partnership-heading" className="film-section-label">
        Original stories. Built from the ground up.
      </h2>
      <p className="originals-partnership__lead">
        From the first idea to a fully developed animated property, we create original
        worlds, characters and stories — independently or in partnership.
      </p>
      <button
        type="button"
        className="originals-partnership__cta"
        onClick={() =>
          goToContactWithPrefill({
            projectType: "Originals Partnership",
            message: "Enquiry about developing original animation IP together.",
          })
        }
      >
        Discuss a Partnership
        <span className="circle-link" aria-hidden="true">
          <Arrow />
        </span>
      </button>
    </section>
  );
}
