import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronRight, X } from "lucide-react";
import { sectionIds, scrollToSection, site } from "@/data/site";

interface CapabilityShowreelModalProps {
  categoryTitle: string;
  onClose: () => void;
}

const overlayMotion = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] as const },
};

const panelMotion = {
  initial: { opacity: 0, y: 18, scale: 0.94 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 420,
      damping: 30,
      mass: 0.82,
    },
  },
  exit: {
    opacity: 0,
    y: 10,
    scale: 0.97,
    transition: { duration: 0.16, ease: [0.4, 0, 1, 1] as const },
  },
};

const itemMotion = {
  initial: { opacity: 0, y: 10 },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.08 + index * 0.07,
      duration: 0.28,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

export default function CapabilityShowreelModal({ categoryTitle, onClose }: CapabilityShowreelModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const copy = site.capabilityShowreelModal;

  useEffect(() => {
    closeRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const handleCta = () => {
    scrollToSection(sectionIds.contact, onClose);
  };

  return (
    <motion.div
      {...overlayMotion}
      className="capability-showreel-modal__overlay modal-overlay fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="capability-showreel-title"
      onClick={onClose}
    >
      <motion.div
        {...panelMotion}
        className="capability-showreel-modal modal-panel relative w-full max-w-[22rem] overflow-hidden rounded-[22px] md:max-w-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="capability-showreel-modal__glow" aria-hidden="true" />

        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="modal-close-btn absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--link-accent)]"
          aria-label={copy.closeLabel}
        >
          <X size={20} />
        </button>

        <div className="relative px-6 pb-7 pt-8 text-center md:px-8 md:pb-8 md:pt-9">
          <motion.h2
            id="capability-showreel-title"
            custom={0}
            variants={itemMotion}
            initial="initial"
            animate="animate"
            className="font-display text-[1.35rem] font-medium leading-tight tracking-[0.01em] text-text-primary md:text-2xl"
          >
            {categoryTitle}
          </motion.h2>

          <motion.p
            custom={1}
            variants={itemMotion}
            initial="initial"
            animate="animate"
            className="capability-showreel-modal__soon mt-3 text-sm font-medium uppercase tracking-[0.14em] text-text-secondary md:text-base"
          >
            {copy.soonLabel}
          </motion.p>

          <motion.div
            custom={2}
            variants={itemMotion}
            initial="initial"
            animate="animate"
            className="mt-7"
          >
            <button
              type="button"
              onClick={handleCta}
              className="gradient-button-emerald btn-on-accent capability-showreel-modal__cta inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium uppercase tracking-[0.12em]"
            >
              {site.ctaLabel}
              <ChevronRight size={16} aria-hidden="true" />
            </button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
