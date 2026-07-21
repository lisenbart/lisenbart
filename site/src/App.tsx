import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import FilmPage from "./pages/FilmPage";
import CommercialPage from "./pages/CommercialPage";
import MobileEstimateCTA from "./components/MobileEstimateCTA";
import Footer from "./components/Footer";
import {
  legacyWorkRedirectTarget,
  parseHubPage,
  shouldRedirectToCanonicalHubPath,
} from "./lib/routes";

function resolveMain() {
  const hub = parseHubPage();
  if (hub === "film") return <FilmPage />;
  if (hub === "commercial") return <CommercialPage />;
  return <HomePage />;
}

export default function App() {
  if (typeof window !== "undefined") {
    const legacyRedirect = legacyWorkRedirectTarget();
    if (legacyRedirect) {
      window.location.replace(legacyRedirect);
      return null;
    }

    const canonicalHubRedirect = shouldRedirectToCanonicalHubPath();
    if (canonicalHubRedirect) {
      window.location.replace(canonicalHubRedirect);
      return null;
    }
  }

  return (
    <>
      <div className="cosmic-bg" aria-hidden="true" />
      <Header />
      {resolveMain()}
      <Footer />
      <MobileEstimateCTA />
    </>
  );
}
