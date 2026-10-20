import { useEffect, useState } from "react";
import {
  getAnalyticsConsent,
  setAnalyticsConsent,
  type AnalyticsConsent,
} from "@/lib/analyticsConsent";
import { legalConfig } from "@/data/legal";

const OPEN_EVENT = "lisenbart:open-cookie-preferences";

export function openCookiePreferences(): void {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

/**
 * Minimal analytics consent — Accept / Reject optional Google Analytics.
 * Essential site features are never blocked.
 */
export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [choice, setChoice] = useState<AnalyticsConsent | null>(null);

  useEffect(() => {
    const stored = getAnalyticsConsent();
    setChoice(stored);
    if (!stored) setVisible(true);

    const onOpen = () => setVisible(true);
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOpen);
  }, []);

  const decide = (value: AnalyticsConsent) => {
    setAnalyticsConsent(value);
    setChoice(value);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="cookie-consent"
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-desc"
    >
      <div className="cookie-consent__inner">
        <p id="cookie-consent-title" className="cookie-consent__title">
          Analytics cookies
        </p>
        <p id="cookie-consent-desc" className="cookie-consent__text">
          We use optional Google Analytics to understand aggregate traffic. Essential site
          features work either way.{" "}
          <a href={legalConfig.policies.cookies.path}>Cookie Policy</a>
          {" · "}
          <a href={legalConfig.policies.privacy.path}>Privacy Policy</a>
        </p>
        <div className="cookie-consent__actions">
          <button
            type="button"
            className="cookie-consent__btn cookie-consent__btn--secondary"
            onClick={() => decide("rejected")}
          >
            Reject
          </button>
          <button
            type="button"
            className="cookie-consent__btn cookie-consent__btn--primary"
            onClick={() => decide("accepted")}
          >
            Accept analytics
          </button>
        </div>
        {choice ? (
          <p className="cookie-consent__hint">Current choice: {choice}</p>
        ) : null}
      </div>
    </div>
  );
}
