import type { ReactNode } from "react";
import { Helmet } from "react-helmet-async";
import { site } from "@/data/site";

interface SEOProps {
  title: string;
  description: string;
  url: string;
  image?: string;
  children?: ReactNode;
}

export function SEO({ title, description, url, image, children }: SEOProps) {
  const ogImage = (() => {
    const raw = image ?? site.meta.ogImage;
    if (raw.startsWith("http")) return raw;
    const path = raw.startsWith("/") ? raw : `/${raw}`;
    return `${site.canonical}${path}`;
  })();
  const canonical = url.startsWith("http") ? url : `${site.canonical}${url}`;
  const verification = site.meta.googleSiteVerification?.trim();

  /** Deploy-preview / branch builds set VITE_LEGAL_PREVIEW — keep out of indexes. */
  const previewNoIndex = import.meta.env.VITE_LEGAL_PREVIEW === "true";

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      {previewNoIndex ? <meta name="robots" content="noindex, nofollow" /> : null}
      {verification ? <meta name="google-site-verification" content={verification} /> : null}

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:secure_url" content={ogImage} />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:image:width" content="1280" />
      <meta property="og:image:height" content="720" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={site.brand} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {children}
    </Helmet>
  );
}
