export type Theme = "light";

export const THEME_STORAGE_KEY = "lisenbart-theme";

/** Site is light-only. Always apply light and clear any stored dark preference. */
export function getStoredTheme(): Theme {
  return "light";
}

export function applyTheme(_theme: Theme = "light") {
  document.documentElement.setAttribute("data-theme", "light");
  try {
    localStorage.setItem(THEME_STORAGE_KEY, "light");
  } catch {
    /* ignore */
  }
}

export function initTheme() {
  applyTheme("light");
}
