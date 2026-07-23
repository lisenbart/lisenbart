export const routes = {
  home: "/",
  originals: "/originals",
  clientWork: "/client-work",
} as const;

export type HubPageSlug = "originals" | "client-work";

let prerenderPathnameOverride: string | undefined;

export function setPrerenderPathname(pathname: string) {
  prerenderPathnameOverride = pathname;
}

export function clearPrerenderPathname() {
  prerenderPathnameOverride = undefined;
}

function resolvePathname(pathname?: string) {
  if (pathname !== undefined) return pathname;
  if (prerenderPathnameOverride !== undefined) return prerenderPathnameOverride;
  return window.location.pathname;
}

/** Strip index.html and trailing slashes for route matching. */
export function normalizePathname(pathname: string): string {
  let normalized = pathname.trim();

  if (!normalized.startsWith("/")) {
    normalized = `/${normalized}`;
  }

  normalized = normalized.replace(/\/index\.html$/i, "");

  if (normalized.length > 1) {
    normalized = normalized.replace(/\/+$/, "");
  }

  return normalized;
}

/** Path without trailing slash — for matching only. */
export function hubPageHref(slug: HubPageSlug) {
  return slug === "originals" ? routes.originals : routes.clientWork;
}

export function parseHubPage(pathname?: string): HubPageSlug | null {
  const normalized = normalizePathname(resolvePathname(pathname));
  if (normalized === routes.originals) return "originals";
  if (normalized === routes.clientWork) return "client-work";
  return null;
}

/** Hub pages — not home. */
export function isSiteSubpage(pathname?: string) {
  return parseHubPage(pathname) !== null;
}

/** Canonical hub path for links, sitemap, and SEO (trailing slash). */
export function canonicalHubPath(slug: HubPageSlug): string {
  return `${hubPageHref(slug)}/`;
}

/** Alias for link hrefs — same as canonicalHubPath. */
export function hubCanonicalHref(slug: HubPageSlug) {
  return canonicalHubPath(slug);
}

export function shouldRedirectToCanonicalHubPath(pathname?: string): string | null {
  const resolved = resolvePathname(pathname);
  const slug = parseHubPage(resolved);
  if (!slug) return null;

  const canonical = canonicalHubPath(slug);
  if (resolved === canonical) return null;

  const href = hubPageHref(slug);
  const normalized = normalizePathname(resolved);
  if (normalized === href && !resolved.endsWith("/")) {
    return canonical;
  }

  if (/\/index\.html/i.test(resolved)) {
    return canonical;
  }

  return null;
}

/**
 * Legacy paths → current hubs.
 * /film → /originals/; /commercial → /client-work/;
 * /work/film → /originals/; other /work/* → /client-work/.
 */
export function legacyWorkRedirectTarget(pathname?: string): string | null {
  const normalized = normalizePathname(resolvePathname(pathname));

  if (normalized === "/film" || normalized.startsWith("/film/")) {
    return canonicalHubPath("originals");
  }

  if (normalized === "/commercial" || normalized.startsWith("/commercial/")) {
    return canonicalHubPath("client-work");
  }

  if (normalized === "/work" || normalized.startsWith("/work/")) {
    if (normalized === "/work/film" || normalized.startsWith("/work/film/")) {
      return canonicalHubPath("originals");
    }
    return canonicalHubPath("client-work");
  }

  return null;
}
