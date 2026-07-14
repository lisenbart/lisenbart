export function resolveSiteUrl(): string {
  const url = process.env.URL || process.env.DEPLOY_PRIME_URL || "https://lisenbart.com";
  return url.replace(/\/$/, "");
}

export function buildApproveUrl(id: string, token: string): string {
  const siteUrl = resolveSiteUrl();
  const params = new URLSearchParams({ id, token });
  return `${siteUrl}/api/testimonials/approve?${params.toString()}`;
}

export function buildRemoveUrl(id: string, token: string): string {
  const siteUrl = resolveSiteUrl();
  const params = new URLSearchParams({ id, token });
  return `${siteUrl}/api/testimonials/remove?${params.toString()}`;
}
