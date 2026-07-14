export function resolveSiteUrl(): string {
  const url = process.env.DEPLOY_PRIME_URL || process.env.URL || "https://www.lisenbart.com";
  return url.replace(/\/$/, "");
}

export function buildApproveUrl(id: string, token: string): string {
  const siteUrl = resolveSiteUrl();
  const params = new URLSearchParams({ id, token });
  return `${siteUrl}/api/testimonials/approve?${params.toString()}`;
}
