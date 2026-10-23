export type ContactHandler = "netlify" | "php" | "remote";

function resolveContactHandler(): ContactHandler {
  const mode = import.meta.env.VITE_CONTACT_HANDLER?.trim().toLowerCase();
  if (mode === "php") return "php";
  if (mode === "netlify") return "netlify";
  if (mode === "remote") return "remote";
  if (import.meta.env.VITE_CONTACT_ENDPOINT?.trim() || import.meta.env.VITE_FORMSPREE_FORM_ID?.trim()) {
    return "remote";
  }
  return "netlify";
}

export const contactHandler = resolveContactHandler();

export function resolveContactEndpoint(): string {
  const custom = import.meta.env.VITE_CONTACT_ENDPOINT?.trim();
  if (custom) return custom;

  const formspreeId = import.meta.env.VITE_FORMSPREE_FORM_ID?.trim();
  if (formspreeId) return `https://formspree.io/f/${formspreeId}`;

  if (contactHandler === "php") return "/contact.php";
  return "/";
}

export const contactEndpoint = resolveContactEndpoint();

export const NETLIFY_FORM_NAME = "contact";
/** Games page Netlify Forms hook (detected via static form in index.html). */
export const NETLIFY_FORM_NAME_GAMES = "contact-games";
/** AI page Netlify Forms hook (detected via static form in index.html). */
export const NETLIFY_FORM_NAME_AI = "contact-ai";

/**
 * Live submit on production (Netlify/php) or whenever a remote endpoint is configured.
 * Local Vite mocks unless a remote handler/URL is set.
 */
export const isContactFormLive =
  contactHandler === "remote" || Boolean(import.meta.env.PROD);
