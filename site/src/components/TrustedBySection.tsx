import { sectionIds, site } from "@/data/site";

function BrandRow({ groupId, brands }: { groupId: string; brands: readonly string[] }) {
  return (
    <div className="flex shrink-0 items-center">
      {brands.map((brand) => (
        <div key={`${groupId}-${brand}`} className="flex shrink-0 items-center">
          <span className="trusted-by__item whitespace-nowrap px-2 md:px-2.5">{brand}</span>
          <span
            className="strip-service-dot trusted-by__dot mx-3 h-1 w-1 shrink-0 rounded-full md:mx-4"
            aria-hidden="true"
          />
        </div>
      ))}
    </div>
  );
}

export default function TrustedBySection() {
  const { trustedBy } = site;
  const brands = trustedBy.brands;

  return (
    <section
      id={sectionIds.trusted}
      className="trusted-by-section scroll-mt-24 pb-[var(--section-spacing)]"
      aria-label={trustedBy.label}
    >
      <div className="archive-container">
        <div className="trusted-by trusted-by--marquee">
          <p className="trusted-by__label">{trustedBy.label}</p>
          <div className="trusted-by__marquee strip-marquee-viewport overflow-hidden" aria-hidden="true">
            <div className="strip-marquee-clip">
              <div className="strip-marquee-track">
                <BrandRow groupId="a" brands={brands} />
                <BrandRow groupId="b" brands={brands} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
