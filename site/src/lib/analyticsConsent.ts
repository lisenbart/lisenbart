/** GA4 measurement ID — loaded only after optional analytics consent. */
export const GA_MEASUREMENT_ID = "G-ZB7KBQMZ6T";

export const ANALYTICS_CONSENT_KEY = "lisenbart-analytics-consent";

export type AnalyticsConsent = "accepted" | "rejected";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    __lisenbartGaLoaded?: boolean;
  }
}

export function getAnalyticsConsent(): AnalyticsConsent | null {
  try {
    const value = localStorage.getItem(ANALYTICS_CONSENT_KEY);
    if (value === "accepted" || value === "rejected") return value;
  } catch {
    /* private mode */
  }
  return null;
}

export function setAnalyticsConsent(value: AnalyticsConsent): void {
  try {
    localStorage.setItem(ANALYTICS_CONSENT_KEY, value);
  } catch {
    /* ignore */
  }

  if (value === "accepted") {
    loadGoogleAnalytics();
  } else {
    disableGoogleAnalytics();
  }

  window.dispatchEvent(
    new CustomEvent("lisenbart:analytics-consent", { detail: value }),
  );
}

export function loadGoogleAnalytics(): void {
  if (typeof window === "undefined") return;
  if (window.__lisenbartGaLoaded) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer?.push(args);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID, { anonymize_ip: true });

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.__lisenbartGaLoaded = true;
}

export function disableGoogleAnalytics(): void {
  if (typeof window === "undefined") return;
  try {
    const disableKey = `ga-disable-${GA_MEASUREMENT_ID}`;
    (window as unknown as Record<string, boolean>)[disableKey] = true;
  } catch {
    /* ignore */
  }
}

/** Apply stored choice on boot (no banner flash for returning visitors). */
export function initAnalyticsFromStoredConsent(): void {
  const consent = getAnalyticsConsent();
  if (consent === "accepted") loadGoogleAnalytics();
  if (consent === "rejected") disableGoogleAnalytics();
}
