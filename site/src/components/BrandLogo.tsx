import { site } from "@/data/site";
import { publicAsset } from "@/lib/publicAsset";

type BrandLogoVariant = "header" | "footer";

interface BrandLogoProps {
  variant?: BrandLogoVariant;
  className?: string;
}

/** Combined wordmark + bear mark (single asset). */
export default function BrandLogo({ variant = "header", className = "" }: BrandLogoProps) {
  const lockupClass = `site-logo-lockup site-logo-lockup--${variant}${className ? ` ${className}` : ""}`;
  const wrapClass = `site-logo-wrap site-logo-wrap--${variant}`;
  const isFooter = variant === "footer";

  return (
    <span className={lockupClass}>
      <span className={wrapClass}>
        <img
          src={publicAsset(`${site.logo.black}?v=4`)}
          alt={site.brand}
          className="site-logo-image site-logo-image--theme-light"
          width={isFooter ? 264 : 216}
          height={isFooter ? 47 : 38}
          decoding="async"
        />
        <img
          src={publicAsset(`${site.logo.black}?v=4`)}
          alt=""
          aria-hidden="true"
          className="site-logo-image site-logo-image--theme-dark"
          width={isFooter ? 264 : 216}
          height={isFooter ? 47 : 38}
          decoding="async"
        />
      </span>
    </span>
  );
}
