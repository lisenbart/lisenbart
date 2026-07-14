import { site } from "@/data/site";
import { publicAsset } from "@/lib/publicAsset";

type BrandLogoVariant = "header" | "footer";

interface BrandLogoProps {
  variant?: BrandLogoVariant;
  className?: string;
}

export default function BrandLogo({ variant = "header", className = "" }: BrandLogoProps) {
  const wrapClass = `site-logo-wrap site-logo-wrap--${variant}${className ? ` ${className}` : ""}`;

  return (
    <span className={wrapClass}>
      <img
        src={publicAsset(site.logo.black)}
        alt={site.brand}
        className="site-logo-image site-logo-image--theme-light"
        width={variant === "footer" ? 180 : 140}
        height={variant === "footer" ? 40 : 32}
        decoding="async"
      />
      <img
        src={publicAsset(site.logo.white)}
        alt=""
        aria-hidden="true"
        className="site-logo-image site-logo-image--theme-dark"
        width={variant === "footer" ? 180 : 140}
        height={variant === "footer" ? 40 : 32}
        decoding="async"
      />
    </span>
  );
}
