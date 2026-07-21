export const routes = {
  home: "/",
  film: "/film",
  commercial: "/commercial",
} as const;

export type HubPageSlug = "film" | "commercial";

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

export function hubPageHref(slug: HubPageSlug) {
  return slug === "film" ? routes.film : routes.commercial;
}

export function parseHubPage(pathname?: string): HubPageSlug | null {
  const normalized = normalizePathname(resolvePathname(pathname));
  if (normalized === routes.film) return "film";
  if (normalized === routes.commercial) return "commercial";
  return null;
}

/** Hub pages (/film, /commercial) — not home. */
export function isSiteSubpage(pathname?: string) {
  return parseHubPage(pathname) !== null;
}

export function canonicalHubPath(slug: HubPageSlug): string {
  return `${hubPageHref(slug)}/`;
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
 * Legacy /work/* → current hubs.
 * /work/film → /film; everything else under /work → /commercial.
 */
export function legacyWorkRedirectTarget(pathname?: string): string | null {
  const normalized = normalizePathname(resolvePathname(pathname));

  if (normalized === "/work" || normalized.startsWith("/work/")) {
    if (normalized === "/work/film" || normalized.startsWith("/work/film/")) {
      return canonicalHubPath("film");
    }
    return canonicalHubPath("commercial");
  }

  return null;
}
