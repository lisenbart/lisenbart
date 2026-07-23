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

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      {verification ? <meta name="google-site-verification" content={verification} /> : null}

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
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
