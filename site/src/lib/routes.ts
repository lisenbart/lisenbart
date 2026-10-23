export const routes = {
  home: "/",
  originals: "/originals",
  clientWork: "/client-work",
  studio: "/studio",
  about: "/about",
  games: "/games",
  ai: "/ai",
  privacy: "/privacy",
  cookiePolicy: "/cookie-policy",
  legal: "/legal",
} as const;

export type HubPageSlug =
  | "originals"
  | "client-work"
  | "studio"
  | "about"
  | "games"
  | "ai";

export type LegalPageSlug = "privacy" | "cookie-policy" | "legal";

export type OriginalsProjectSlug =
  | "unnecessary-things"
  | "the-last-kozak"
  | "pershosvit"
  | "scoopy-cap";

const ORIGINALS_PROJECT_SLUGS: readonly OriginalsProjectSlug[] = [
  "unnecessary-things",
  "the-last-kozak",
  "pershosvit",
  "scoopy-cap",
] as const;

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
  if (slug === "originals") return routes.originals;
  if (slug === "studio") return routes.studio;
  if (slug === "about") return routes.about;
  if (slug === "games") return routes.games;
  if (slug === "ai") return routes.ai;
  return routes.clientWork;
}

export function parseHubPage(pathname?: string): HubPageSlug | null {
  const normalized = normalizePathname(resolvePathname(pathname));
  if (normalized === routes.originals) return "originals";
  if (normalized === routes.clientWork) return "client-work";
  if (normalized === routes.studio) return "studio";
  if (normalized === routes.about) return "about";
  if (normalized === routes.games) return "games";
  if (normalized === routes.ai) return "ai";
  return null;
}

export function parseLegalPage(pathname?: string): LegalPageSlug | null {
  const normalized = normalizePathname(resolvePathname(pathname));
  if (normalized === routes.privacy) return "privacy";
  if (normalized === routes.cookiePolicy) return "cookie-policy";
  if (normalized === routes.legal) return "legal";
  return null;
}

export function originalsProjectHref(slug: OriginalsProjectSlug): string {
  return `${routes.originals}/${slug}/`;
}

export function parseOriginalsProject(pathname?: string): OriginalsProjectSlug | null {
  const normalized = normalizePathname(resolvePathname(pathname));
  const prefix = `${routes.originals}/`;
  if (!normalized.startsWith(prefix)) return null;
  const slug = normalized.slice(prefix.length);
  return (ORIGINALS_PROJECT_SLUGS as readonly string[]).includes(slug)
    ? (slug as OriginalsProjectSlug)
    : null;
}

/** Hub, legal, or originals project subpages — not home. */
export function isSiteSubpage(pathname?: string) {
  return (
    parseHubPage(pathname) !== null ||
    parseLegalPage(pathname) !== null ||
    parseOriginalsProject(pathname) !== null
  );
}

/** True when the route renders FilmContactSection (id=contact). */
export function pageHasContactForm(pathname?: string): boolean {
  // Only legal/privacy/cookie pages omit the form; home and all hubs include it.
  return parseLegalPage(pathname) === null;
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

  const project = parseOriginalsProject(resolved);
  if (project) {
    const canonical = originalsProjectHref(project);
    if (resolved === canonical) return null;
    if (/\/index\.html/i.test(resolved) || !resolved.endsWith("/")) {
      return canonical;
    }
    return null;
  }

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
 * /client-work/#ai-powered-reel handled separately in App (hash).
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

/** Old Client Work AI anchor → dedicated AI page. */
export function legacyAiAnchorRedirectTarget(): string | null {
  if (typeof window === "undefined") return null;
  const hub = parseHubPage();
  if (hub !== "client-work") return null;
  const hash = window.location.hash.replace(/^#/, "");
  if (hash === "ai-powered-reel") return canonicalHubPath("ai");
  return null;
}
