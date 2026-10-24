/**
 * Surface band alternating — footer-up rule.
 *
 * Footer is always tint. Contact (above footer) is always white.
 * Content bands above contact alternate: tint → white → tint …
 * So the last content band before contact is always tint.
 *
 * Tokens live in film-identity.css: --surface-white / --surface-tint.
 */

/** True when this band (0-based from top of content stack) should be tint. */
export function isSurfaceTint(index: number, total: number): boolean {
  if (total <= 0) return false;
  // Last band (index total-1) → tint; then white, tint, …
  return (total - 1 - index) % 2 === 0;
}

/** Class suffix for studio-section / surface-band. */
export function surfaceBandClass(index: number, total: number): string {
  return isSurfaceTint(index, total) ? "studio-section--tint" : "";
}

/** Full class list for a studio section band. */
export function studioSectionClass(
  index: number,
  total: number,
  extra = "",
): string {
  const tint = surfaceBandClass(index, total);
  return ["studio-section", tint, extra].filter(Boolean).join(" ");
}
