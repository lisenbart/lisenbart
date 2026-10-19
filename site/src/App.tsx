import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import FilmPage from "./pages/FilmPage";
import CommercialPage from "./pages/CommercialPage";
import StudioPage from "./pages/StudioPage";
import AboutPage from "./pages/AboutPage";
import Footer from "./components/Footer";
import { ReelProvider } from "./contexts/ReelContext";
import {
  legacyWorkRedirectTarget,
  parseHubPage,
  shouldRedirectToCanonicalHubPath,
} from "./lib/routes";

function resolveMain() {
  const hub = parseHubPage();
  if (hub === "originals") return <FilmPage />;
  if (hub === "client-work") return <CommercialPage />;
  if (hub === "studio") return <StudioPage />;
  if (hub === "about") return <AboutPage />;
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
    <ReelProvider>
      <div className="film-app">
        <Header />
        {resolveMain()}
        <Footer />
      </div>
    </ReelProvider>
  );
}
