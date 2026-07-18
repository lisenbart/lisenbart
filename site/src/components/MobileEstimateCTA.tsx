import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { goToContact, sectionIds, site } from "@/data/site";

export default function MobileEstimateCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const intro = document.querySelector('[aria-label="Introduction"]');
    const contact = document.getElementById(sectionIds.contact);

    const suppressing = new Set<Element>();
    /** No hero intro on hub pages — treat as already past intro. */
    let introPassed = !intro;
    let scrollLocked = document.body.style.overflow === "hidden";

    const sync = () => {
      setVisible(introPassed && suppressing.size === 0 && !scrollLocked);
    };

    const introObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        introPassed = !entry.isIntersecting || entry.intersectionRatio < 0.35;
        sync();
      },
      { threshold: [0, 0.35, 0.65, 1] },
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
      if (contact) suppressObserver.observe(contact);
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
    observeSuppressNodes();

    domObserver.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["style", "class"],
    });

    return () => {
      introObserver.disconnect();
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
            onClick={() => goToContact()}
            className="gradient-button-emerald btn-on-accent w-full rounded-full py-3 text-sm font-medium uppercase tracking-[0.12em]"
          >
            {site.ctaLabel}
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
