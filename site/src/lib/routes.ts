import type { WorkCategorySlug } from "@/data/work";

export const routes = {
  home: "/",
  workBase: "/work",
  film: "/film",
  commercial: "/commercial",
} as const;

export type HubPageSlug = "film" | "commercial";

export const DEFAULT_WORK_CATEGORY: WorkCategorySlug = "commercial";

export function workCategoryHref(slug: WorkCategorySlug) {
  return `${routes.workBase}/${slug}`;
}

export function workEntryHref() {
  return workCategoryHref(DEFAULT_WORK_CATEGORY);
}

export function hubPageHref(slug: HubPageSlug) {
  return slug === "film" ? routes.film : routes.commercial;
}

export type WorkRoute = { slug: WorkCategorySlug };

const WORK_CATEGORY_PATTERN = /^\/work\/(commercial|gaming|film|social)\/?$/;

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

/** Strip index.html and trailing slashes so /work/film/index.html resolves correctly. */
export function normalizeWorkPathname(pathname: string): string {
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

export function parseWorkCategorySlug(pathname?: string): WorkCategorySlug | null {
  const normalized = normalizeWorkPathname(resolvePathname(pathname));
  const match = normalized.match(WORK_CATEGORY_PATTERN);
  if (match) return match[1] as WorkCategorySlug;

  const looseMatch = normalized.match(/^\/work\/(commercial|gaming|film|social)(?:\/|$)/);
  return looseMatch ? (looseMatch[1] as WorkCategorySlug) : null;
}

export function isWorkIndexPath(pathname?: string) {
  const normalized = normalizeWorkPathname(resolvePathname(pathname));
  return normalized === routes.workBase;
}

export function parseWorkRoute(pathname?: string): WorkRoute | null {
  const slug = parseWorkCategorySlug(pathname);
  return slug ? { slug } : null;
}

export function parseHubPage(pathname?: string): HubPageSlug | null {
  const normalized = normalizeWorkPathname(resolvePathname(pathname));
  if (normalized === routes.film) return "film";
  if (normalized === routes.commercial) return "commercial";
  return null;
}

export function isWorkSection(pathname?: string) {
  const normalized = normalizeWorkPathname(resolvePathname(pathname));
  return isWorkIndexPath(normalized) || WORK_CATEGORY_PATTERN.test(normalized);
}

/** Work category pages or new hub pages (/film, /commercial). */
export function isSiteSubpage(pathname?: string) {
  return isWorkSection(pathname) || parseHubPage(pathname) !== null;
}

export function canonicalWorkPath(slug: WorkCategorySlug): string {
  return `${workCategoryHref(slug)}/`;
}

export function canonicalHubPath(slug: HubPageSlug): string {
  return `${hubPageHref(slug)}/`;
}

export function shouldRedirectToCanonicalWorkPath(pathname?: string): string | null {
  const resolved = resolvePathname(pathname);
  const slug = parseWorkCategorySlug(resolved);
  if (!slug) return null;

  const canonical = canonicalWorkPath(slug);
  if (resolved === canonical) return null;

  const normalized = normalizeWorkPathname(resolved);
  if (normalized === workCategoryHref(slug) && !resolved.endsWith("/")) {
    return canonical;
  }

  if (/\/index\.html/i.test(resolved)) {
    return canonical;
  }

  return null;
}

export function shouldRedirectToCanonicalHubPath(pathname?: string): string | null {
  const resolved = resolvePathname(pathname);
  const slug = parseHubPage(resolved);
  if (!slug) return null;

  const canonical = canonicalHubPath(slug);
  if (resolved === canonical) return null;

  const href = hubPageHref(slug);
  const normalized = normalizeWorkPathname(resolved);
  if (normalized === href && !resolved.endsWith("/")) {
    return canonical;
  }

  if (/\/index\.html/i.test(resolved)) {
    return canonical;
  }

  return null;
}
