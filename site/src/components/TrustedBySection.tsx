import { sectionIds, site } from "@/data/site";

export default function TrustedBySection() {
  const { trustedBy } = site;

  return (
    <section
      id={sectionIds.trusted}
      className="scroll-mt-24 px-[var(--page-padding)] pb-[var(--section-spacing)]"
      aria-label="Trusted by"
    >
      <div className="mx-auto w-full min-w-0 max-w-[920px]">
        <div className="trusted-by">
          <p className="trusted-by__label">{trustedBy.label}</p>
          <ul className="trusted-by__list">
            {trustedBy.brands.map((brand) => (
              <li key={brand} className="trusted-by__item">
                {brand}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
