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
  const ogImage = image ?? site.meta.ogImage;
  const canonical = url.startsWith("http") ? url : `${site.canonical}${url}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content="website" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {children}
    </Helmet>
  );
}
