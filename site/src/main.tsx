import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import { initAnalyticsFromStoredConsent } from "./lib/analyticsConsent";
import { initTheme } from "./lib/theme";
import "./styles/index.css";
import "./styles/theme-light.css";

initTheme();
initAnalyticsFromStoredConsent();

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>,
);
