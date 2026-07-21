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
  const countLabel = `${trustedBy.label} · ${brands.length}`;

  return (
    <section
      id={sectionIds.trusted}
      className="scroll-mt-24 px-[var(--page-padding)] pb-[var(--section-spacing)]"
      aria-label={countLabel}
    >
      <div className="mx-auto w-full min-w-0 max-w-[920px]">
        <p className="trusted-by__label">{countLabel}</p>
        <div className="trusted-by trusted-by--marquee" aria-hidden="true">
          <div className="trusted-by__marquee strip-marquee-viewport overflow-hidden">
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
