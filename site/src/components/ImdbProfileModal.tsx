import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ExternalLink, X } from "lucide-react";
import { publicAsset } from "@/lib/publicAsset";
import { site } from "@/data/site";

interface ImdbProfileModalProps {
  href: string;
  onClose: () => void;
}

function displayHostPath(href: string) {
  try {
    const url = new URL(href);
    return `${url.host}${url.pathname}`.replace(/\/$/, "");
  } catch {
    return href;
  }
}

export default function ImdbProfileModal({ href, onClose }: ImdbProfileModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const { hero } = site;
  const previewUrl = displayHostPath(href);

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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="modal-overlay fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="imdb-profile-title"
      aria-describedby="imdb-profile-body"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.96, opacity: 0, y: 8 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.96, opacity: 0, y: 8 }}
        transition={{ duration: 0.22 }}
        className="social-coming-soon-panel modal-panel imdb-profile-modal relative w-full max-w-lg overflow-hidden rounded-[20px]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="modal-close-btn absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--link-accent)]"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <div className="imdb-profile-modal__inner px-5 pb-6 pt-8 md:px-7 md:pb-8 md:pt-9">
          <h2
            id="imdb-profile-title"
            className="pr-10 text-center font-display text-xl font-medium tracking-[0.02em] text-text-primary md:text-2xl"
          >
            IMDb profile
          </h2>

          <div className="imdb-profile-preview" aria-hidden="true">
            <div className="imdb-profile-preview__chrome">
              <span className="imdb-profile-preview__dot" />
              <span className="imdb-profile-preview__dot" />
              <span className="imdb-profile-preview__dot" />
              <div className="imdb-profile-preview__url">{previewUrl}</div>
            </div>
            <div className="imdb-profile-preview__page">
              <div className="imdb-profile-preview__brand">
                <img
                  src="/images/imdb-logo.svg"
                  alt=""
                  width={46}
                  height={23}
                  decoding="async"
                />
              </div>
              <div className="imdb-profile-preview__person">
                <img
                  src={publicAsset(hero.personalPortrait)}
                  alt=""
                  className="imdb-profile-preview__photo"
                  width={120}
                  height={120}
                  decoding="async"
                />
                <div className="imdb-profile-preview__meta">
                  <p className="imdb-profile-preview__name">{hero.personalName}</p>
                  <p className="imdb-profile-preview__role">{hero.personalRole}</p>
                  <p className="imdb-profile-preview__credits">Filmography · Festival credits</p>
                </div>
              </div>
            </div>
          </div>

          <p
            id="imdb-profile-body"
            className="mx-auto mt-4 max-w-sm text-center text-sm font-light leading-relaxed text-text-secondary md:text-[15px]"
          >
            My director page on IMDb — everything I've made, for anyone who wants the paper trail.
          </p>

          <div className="mt-6 flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center">
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open on IMDb (opens in a new tab)"
              className="gradient-button-emerald btn-on-accent inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium"
            >
              Open on IMDb
              <ExternalLink size={15} strokeWidth={1.75} aria-hidden="true" />
            </a>
            <button
              type="button"
              onClick={onClose}
              className="estimate-cta-secondary inline-flex items-center justify-center px-6 py-3 text-sm font-medium"
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
