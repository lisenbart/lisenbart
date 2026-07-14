import type { WorkCategorySlug } from "@/data/work";

export const routes = {
  home: "/",
  workBase: "/work",
} as const;

export const DEFAULT_WORK_CATEGORY: WorkCategorySlug = "commercial";

export function workCategoryHref(slug: WorkCategorySlug) {
  return `${routes.workBase}/${slug}`;
}

export function workEntryHref() {
  return workCategoryHref(DEFAULT_WORK_CATEGORY);
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

export function isWorkIndexPath(pathname?: string) {
  const resolved = resolvePathname(pathname);
  return resolved === routes.workBase || resolved === `${routes.workBase}/`;
}

export function parseWorkRoute(pathname?: string): WorkRoute | null {
  const resolved = resolvePathname(pathname);
  const match = resolved.match(WORK_CATEGORY_PATTERN);
  if (!match) return null;

  return { slug: match[1] as WorkCategorySlug };
}

export function isWorkSection(pathname?: string) {
  const resolved = resolvePathname(pathname);
  return isWorkIndexPath(resolved) || WORK_CATEGORY_PATTERN.test(resolved);
}

export function workSectionHref(slug: WorkCategorySlug) {
  return workCategoryHref(slug);
}
