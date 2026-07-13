import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { sectionIds, scrollToSection, site } from "@/data/site";

export default function MobileEstimateCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const intro = document.querySelector('[aria-label="Introduction"]');
    const services = document.getElementById(sectionIds.services);

    const suppressSelectors = [
      `#${sectionIds.contact}`,
      ".capability-cta",
      ".site-scroll-cta",
      ".capability-showreel-modal__overlay",
    ];

    const getSuppressNodes = () =>
      suppressSelectors.flatMap((selector) => Array.from(document.querySelectorAll(selector)));

    const suppressing = new Set<Element>();
    let introPassed = false;
    let servicesVisible = false;
    let scrollLocked = document.body.style.overflow === "hidden";

    const sync = () => {
      setVisible((introPassed || servicesVisible) && suppressing.size === 0 && !scrollLocked);
    };

    const introObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        introPassed = !entry.isIntersecting || entry.intersectionRatio < 0.35;
        sync();
      },
      { threshold: [0, 0.35, 0.65, 1] },
    );

    const servicesObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        servicesVisible = entry.isIntersecting && entry.intersectionRatio > 0.08;
        sync();
      },
      { threshold: [0, 0.08, 0.2] },
    );

    const suppressObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) suppressing.add(entry.target);
          else suppressing.delete(entry.target);
        });
        sync();
      },
      {
        threshold: 0.14,
        rootMargin: "0px 0px -72px 0px",
      },
    );

    const observeSuppressNodes = () => {
      suppressObserver.disconnect();
      suppressing.clear();
      getSuppressNodes().forEach((node) => suppressObserver.observe(node));
      sync();
    };

    const domObserver = new MutationObserver((mutations) => {
      scrollLocked = document.body.style.overflow === "hidden";

      const shouldRefreshNodes = mutations.some(
        (mutation) =>
          mutation.type === "childList" ||
          (mutation.type === "attributes" &&
            mutation.target === document.body &&
            mutation.attributeName === "style"),
      );

      if (shouldRefreshNodes) observeSuppressNodes();
      else sync();
    });

    if (intro) introObserver.observe(intro);
    if (services) servicesObserver.observe(services);
    observeSuppressNodes();

    domObserver.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["style", "class"],
    });

    return () => {
      introObserver.disconnect();
      servicesObserver.disconnect();
      suppressObserver.disconnect();
      domObserver.disconnect();
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ type: "spring", stiffness: 420, damping: 34, mass: 0.88 }}
          className="mobile-estimate-bar fixed bottom-0 left-0 right-0 z-40 px-4 py-3 md:hidden"
          style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
        >
          <button
            type="button"
            onClick={() => scrollToSection(sectionIds.contact)}
            className="gradient-button-emerald btn-on-accent w-full rounded-full py-3 text-sm font-medium uppercase tracking-[0.12em]"
          >
            {site.ctaLabel}
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
