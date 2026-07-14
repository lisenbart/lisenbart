/** Resolve a public/ asset path for the current Vite base URL. */
export function publicAsset(path: string): string {
  const base = import.meta.env.BASE_URL;
  const normalized = path.replace(/^\//, "");
  return `${base}${normalized}`;
}
