import {
  useEffect,
  useRef,
  useState,
  type FocusEvent,
  type FormEvent,
  type PointerEvent,
} from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { CheckCircle2, ChevronRight, X } from "lucide-react";
import StarRatingInput from "./StarRatingInput";
import { sectionIds, site, scrollToSection } from "@/data/site";
import {
  submitTestimonialReview,
  TESTIMONIAL_MAX_LENGTH,
  validateTestimonialSubmit,
} from "@/lib/testimonialSubmit";

interface TestimonialSubmitPopoverProps {
  onClose: () => void;
}

type FormState = {
  authorName: string;
  company: string;
  quote: string;
  rating: number;
  honeypot: string;
};

type Status = "idle" | "loading" | "success" | "error";

function isEditableField(element: Element | null): element is HTMLElement {
  return (
    element instanceof HTMLInputElement ||
    element instanceof HTMLTextAreaElement ||
    element instanceof HTMLSelectElement
  );
}

export default function TestimonialSubmitPopover({ onClose }: TestimonialSubmitPopoverProps) {
  const layerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const copy = site.testimonialsBlock.submitModal;
  const [form, setForm] = useState<FormState>({
    authorName: "",
    company: "",
    quote: "",
    rating: 0,
    honeypot: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [serverMsg, setServerMsg] = useState("");
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    panelRef.current?.focus({ preventScroll: true });
  }, []);

  useEffect(() => {
    const viewport = window.visualViewport;
    if (!viewport) return;

    const syncViewport = () => {
      const layer = layerRef.current;
      if (!layer) return;

      const keyboardVisible = viewport.height < window.innerHeight * 0.82;
      setKeyboardOpen(keyboardVisible);

      layer.style.top = `${viewport.offsetTop}px`;
      layer.style.left = `${viewport.offsetLeft}px`;
      layer.style.width = `${viewport.width}px`;
      layer.style.height = `${viewport.height}px`;
    };

    syncViewport();
    viewport.addEventListener("resize", syncViewport);
    viewport.addEventListener("scroll", syncViewport);

    return () => {
      viewport.removeEventListener("resize", syncViewport);
      viewport.removeEventListener("scroll", syncViewport);

      const layer = layerRef.current;
      if (layer) {
        layer.style.top = "";
        layer.style.left = "";
        layer.style.width = "";
        layer.style.height = "";
      }
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const updateField = <K extends keyof FormState>(field: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field as string]) {
      setErrors((prev) => ({ ...prev, [field as string]: "" }));
    }
    if (formError) setFormError("");
  };

  const scrollFieldIntoView = (target: HTMLElement) => {
    requestAnimationFrame(() => {
      target.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
  };

  const handleFieldFocus = (event: FocusEvent<HTMLElement>) => {
    scrollFieldIntoView(event.currentTarget);
  };

  const handleBackdropPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (panelRef.current?.contains(event.target as Node)) return;

    const active = document.activeElement;
    if (isEditableField(active) && panelRef.current?.contains(active)) {
      active.blur();
      event.preventDefault();
    }
  };

  const scrollToFirstError = (validationErrors: Record<string, string>) => {
    requestAnimationFrame(() => {
      const panel = panelRef.current;
      if (!panel) return;

      const fieldOrder = ["quote", "authorName", "company", "rating"] as const;
      const firstKey = fieldOrder.find((key) => validationErrors[key]);
      if (!firstKey) return;

      const target = panel.querySelector<HTMLElement>(
        `#testimonial-${firstKey === "authorName" ? "author" : firstKey}`,
      );
      if (!target) return;

      scrollFieldIntoView(target);
      target.focus({ preventScroll: true });
    });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const validationErrors = validateTestimonialSubmit(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setFormError(copy.validationSummary);
      setStatus("idle");
      scrollToFirstError(validationErrors);
      return;
    }

    setErrors({});
    setFormError("");
    setStatus("loading");
    setServerMsg("");

    try {
      const result = await submitTestimonialReview(form);
      if (result.success) {
        setStatus("success");
        setForm({ authorName: "", company: "", quote: "", rating: 0, honeypot: "" });
      } else {
        setStatus("error");
        setServerMsg(result.message);
      }
    } catch {
      setStatus("error");
      setServerMsg(`Could not send your review. Please email ${site.email}.`);
    }
  };

  const charsLeft = TESTIMONIAL_MAX_LENGTH - form.quote.length;

  return createPortal(
    <div
      ref={layerRef}
      className={`testimonial-submit-layer${keyboardOpen ? " is-keyboard-open" : ""}`}
      onPointerDown={handleBackdropPointerDown}
    >
      <div className="testimonial-submit-scrim" aria-hidden="true" />

      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={status === "success" ? "testimonial-submit-success-text" : "testimonial-submit-title"}
        tabIndex={-1}
        initial={{ opacity: 0, scale: 0.96, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: 4 }}
        transition={{ type: "spring", stiffness: 420, damping: 32, mass: 0.82 }}
        className="testimonial-submit-popover capability-showreel-modal modal-panel flex flex-col rounded-[20px] outline-none"
        onPointerDown={(event) => event.stopPropagation()}
      >
        <div className="capability-showreel-modal__glow" aria-hidden="true" />

        <button
          type="button"
          onClick={onClose}
          className="modal-close-btn absolute right-2.5 top-2.5 z-10 flex h-9 w-9 items-center justify-center rounded-full backdrop-blur-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--link-accent)]"
          aria-label={copy.closeLabel}
        >
          <X size={18} />
        </button>

        <div className="testimonial-submit-popover__body relative z-[1] flex flex-col px-4 pb-4 pt-5 md:px-5 md:pb-5 md:pt-5">
          {status !== "success" && (
            <div className="shrink-0 text-center">
              <h2
                id="testimonial-submit-title"
                className="font-display text-lg font-medium leading-tight tracking-[0.01em] text-text-primary md:text-xl"
              >
                {copy.title}
              </h2>
              <p className="mt-1.5 text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-text-secondary md:text-xs">
                {copy.subtitle}
              </p>
            </div>
          )}

          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="testimonial-submit-success py-6 text-center"
              role="status"
              aria-labelledby="testimonial-submit-success-text"
            >
              <CheckCircle2 size={40} className="mx-auto link-accent" />
              <p
                id="testimonial-submit-success-text"
                className="mt-4 text-sm font-light leading-relaxed text-text-secondary"
              >
                {copy.successBody}
              </p>
              <button
                type="button"
                onClick={() => scrollToSection(sectionIds.contact, onClose)}
                className="gradient-button-emerald btn-on-accent capability-showreel-modal__cta mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium uppercase tracking-[0.12em]"
              >
                {site.ctaLabel}
                <ChevronRight size={16} aria-hidden="true" />
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="testimonial-submit-form mt-3 flex flex-col gap-3">
              {formError && (
                <p className="testimonial-submit-form-error rounded-xl px-3 py-2.5 text-xs" role="alert">
                  {formError}
                </p>
              )}

              <input
                type="text"
                name="website"
                value={form.honeypot}
                onChange={(event) => updateField("honeypot", event.target.value)}
                className="absolute -left-[9999px] h-0 w-0 opacity-0"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              <div>
                <label
                  htmlFor="testimonial-quote"
                  className={`inquiry-label ${errors.quote ? "inquiry-label--error" : ""}`}
                >
                  {copy.quoteLabel}
                  <span className="inquiry-required">*</span>
                </label>
                <textarea
                  id="testimonial-quote"
                  value={form.quote}
                  onChange={(event) =>
                    updateField("quote", event.target.value.slice(0, TESTIMONIAL_MAX_LENGTH))
                  }
                  onFocus={handleFieldFocus}
                  rows={3}
                  className={`inquiry-input inquiry-textarea testimonial-submit-textarea resize-none ${errors.quote ? "inquiry-input--error" : ""}`}
                  maxLength={TESTIMONIAL_MAX_LENGTH}
                />
                <div className="mt-1.5 flex items-center justify-between gap-3">
                  {errors.quote ? (
                    <p className="text-xs text-error" role="alert">
                      {errors.quote}
                    </p>
                  ) : (
                    <span className="text-xs text-text-tertiary">Up to {TESTIMONIAL_MAX_LENGTH} characters</span>
                  )}
                  <span className={`text-xs ${charsLeft < 40 ? "text-text-secondary" : "text-text-tertiary"}`}>
                    {charsLeft} left
                  </span>
                </div>
              </div>

              <div>
                <label
                  htmlFor="testimonial-author"
                  className={`inquiry-label ${errors.authorName ? "inquiry-label--error" : ""}`}
                >
                  {copy.nameLabel}
                  <span className="inquiry-required">*</span>
                </label>
                <input
                  id="testimonial-author"
                  value={form.authorName}
                  onChange={(event) => updateField("authorName", event.target.value)}
                  onFocus={handleFieldFocus}
                  className={`inquiry-input ${errors.authorName ? "inquiry-input--error" : ""}`}
                  autoComplete="name"
                />
                {errors.authorName && (
                  <p className="mt-1.5 text-xs text-error" role="alert">
                    {errors.authorName}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="testimonial-company"
                  className={`inquiry-label ${errors.company ? "inquiry-label--error" : ""}`}
                >
                  {copy.companyLabel}
                  <span className="inquiry-required">*</span>
                </label>
                <input
                  id="testimonial-company"
                  value={form.company}
                  onChange={(event) => updateField("company", event.target.value)}
                  onFocus={handleFieldFocus}
                  className={`inquiry-input ${errors.company ? "inquiry-input--error" : ""}`}
                  autoComplete="organization"
                />
                {errors.company && (
                  <p className="mt-1.5 text-xs text-error" role="alert">
                    {errors.company}
                  </p>
                )}
              </div>

              <StarRatingInput
                value={form.rating}
                onChange={(rating) => updateField("rating", rating)}
                label={copy.ratingLabel}
                skipLabel={copy.ratingSkip}
              />

              {status === "error" && serverMsg && (
                <p className="alert-error rounded-xl px-4 py-3 text-sm" role="alert">
                  {serverMsg}{" "}
                  {!serverMsg.includes(site.email) && (
                    <a href={`mailto:${site.email}`} className="link-accent underline">
                      {site.email}
                    </a>
                  )}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="gradient-button-emerald btn-on-accent capability-showreel-modal__cta inline-flex w-full items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium uppercase tracking-[0.12em]"
              >
                {status === "loading" ? (
                  <>
                    <span className="form-spinner h-4 w-4 animate-spin rounded-full border-2" />
                    {copy.sendingLabel}
                  </>
                ) : (
                  <>
                    {copy.submitLabel}
                    <ChevronRight size={16} aria-hidden="true" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </div>,
    document.body,
  );
}
