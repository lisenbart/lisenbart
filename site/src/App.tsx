import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import FilmPage from "./pages/FilmPage";
import OriginalProjectPage from "./pages/OriginalProjectPage";
import CommercialPage from "./pages/CommercialPage";
import StudioPage from "./pages/StudioPage";
import AboutPage from "./pages/AboutPage";
import GamesPage from "./pages/GamesPage";
import AiPage from "./pages/AiPage";
import PrivacyPage from "./pages/PrivacyPage";
import CookiePolicyPage from "./pages/CookiePolicyPage";
import Footer from "./components/Footer";
import { ReelProvider } from "./contexts/ReelContext";
import {
  legacyAiAnchorRedirectTarget,
  legacyWorkRedirectTarget,
  parseHubPage,
  parseLegalPage,
  parseOriginalsProject,
  shouldRedirectToCanonicalHubPath,
} from "./lib/routes";

function resolveMain() {
  const legal = parseLegalPage();
  if (legal === "privacy") return <PrivacyPage />;
  if (legal === "cookie-policy") return <CookiePolicyPage />;

  const originalsProject = parseOriginalsProject();
  if (originalsProject) return <OriginalProjectPage slug={originalsProject} />;

  const hub = parseHubPage();
  if (hub === "originals") return <FilmPage />;
  if (hub === "client-work") return <CommercialPage />;
  if (hub === "studio") return <StudioPage />;
  if (hub === "about") return <AboutPage />;
  if (hub === "games") return <GamesPage />;
  if (hub === "ai") return <AiPage />;
  return <HomePage />;
}

export default function App() {
  if (typeof window !== "undefined") {
    const legacyRedirect = legacyWorkRedirectTarget();
    if (legacyRedirect) {
      window.location.replace(legacyRedirect);
      return null;
    }

    const aiAnchorRedirect = legacyAiAnchorRedirectTarget();
    if (aiAnchorRedirect) {
      window.location.replace(aiAnchorRedirect);
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
