import Header from "./components/Header";
import WorkNav from "./components/WorkNav";
import HomePage from "./pages/HomePage";
import WorkCategoryPage from "./pages/WorkCategoryPage";
import MobileEstimateCTA from "./components/MobileEstimateCTA";
import Footer from "./components/Footer";
import { getWorkCategory } from "./data/work";
import {
  isWorkIndexPath,
  parseWorkRoute,
  shouldRedirectToCanonicalWorkPath,
  workEntryHref,
} from "./lib/routes";

function WorkRouter() {
  const route = parseWorkRoute();
  if (!route) return null;

  const category = getWorkCategory(route.slug);
  if (!category) return null;

  return (
    <div className="work-shell">
      <WorkNav active={route.slug} />
      <WorkCategoryPage category={category} />
    </div>
  );
}

export default function App() {
  if (typeof window !== "undefined") {
    const canonicalWorkRedirect = shouldRedirectToCanonicalWorkPath();
    if (canonicalWorkRedirect) {
      window.location.replace(canonicalWorkRedirect);
      return null;
    }

    if (isWorkIndexPath()) {
      window.location.replace(workEntryHref());
      return null;
    }
  }

  const workRoute = parseWorkRoute();

  return (
    <>
      <div className="cosmic-bg" aria-hidden="true" />
      <Header />
      {workRoute ? <WorkRouter /> : <HomePage />}
      <Footer />
      <MobileEstimateCTA />
    </>
  );
}
