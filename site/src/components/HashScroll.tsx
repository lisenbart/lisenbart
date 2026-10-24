import { useEffect } from "react";
import { scrollToSection } from "@/data/site";

/** Smooth-scroll to the URL hash after mount (e.g. /client-work/#contact). */
export default function HashScroll() {
  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, "");
    if (!hash) return;
    const timer = window.setTimeout(() => scrollToSection(hash), 50);
    return () => window.clearTimeout(timer);
  }, []);

  return null;
}
