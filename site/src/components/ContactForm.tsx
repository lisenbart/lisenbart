import { useState, FormEvent, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ChevronDown, ChevronRight } from "lucide-react";
import { isContactFormLive } from "@/lib/contactConfig";
import { projectTypes } from "@/data/services";
import {
  CONTACT_PREFILL_EVENT,
  clearContactPrefill,
  consumeContactPrefill,
  sectionIds,
  site,
  type ContactPrefill,
} from "@/data/site";
import { submitContact, validateContact } from "@/lib/contactSubmit";

interface FormState {
  name: string;
  email: string;
  projectType: string;
  message: string;
  honeypot: string;
}

type Status = "idle" | "loading" | "success" | "error";

const copy = site.contactForm;

export default function ContactForm({
  heading,
  lead,
}: {
  heading: string;
  lead: string;
}) {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    projectType: "",
    message: "",
    honeypot: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMsg, setServerMsg] = useState("");

  useEffect(() => {
    const applyPrefill = (prefill: ContactPrefill) => {
      setForm((prev) => ({
        ...prev,
        projectType: prefill.projectType ?? prev.projectType,
        message: prefill.message ?? prev.message,
      }));
    };

    const stored = consumeContactPrefill();
    if (stored) applyPrefill(stored);

    const onPrefill = (event: Event) => {
      const detail = (event as CustomEvent<ContactPrefill>).detail;
      if (!detail) return;
      clearContactPrefill();
      applyPrefill(detail);
    };

    window.addEventListener(CONTACT_PREFILL_EVENT, onPrefill);
    return () => window.removeEventListener(CONTACT_PREFILL_EVENT, onPrefill);
  }, []);

  const update = (field: keyof FormState, value: string) => {
    setForm((p) => ({ ...p, [field]: value }));
    if (errors[field]) setErrors((p) => ({ ...p, [field]: "" }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validateContact(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatus("idle");
      if (validationErrors.email) document.getElementById("contact-email")?.focus();
      else if (validationErrors.message) document.getElementById("contact-message")?.focus();
      return;
    }

    setErrors({});
    setStatus("loading");
    setServerMsg("");

    const result = await submitContact(form);
    if (result.success) {
      setStatus("success");
      setServerMsg(result.message);
      setForm({ name: "", email: "", projectType: "", message: "", honeypot: "" });
    } else {
      setStatus("error");
      setServerMsg(result.message);
    }
  };

  return (
    <section
      id={sectionIds.contact}
      className="archive-contact scroll-mt-24 w-full max-w-full min-w-0 pb-[var(--section-spacing)]"
      aria-label={heading}
    >
      <div className="archive-container">
        <div className="mb-8 text-center md:mb-10">
          <h2 className="archive-h2 section-heading">{heading}</h2>
          <p className="archive-body mx-auto mt-3 max-w-md">{lead}</p>
          {!isContactFormLive && import.meta.env.DEV && (
            <p className="mx-auto mt-2 max-w-md text-xs font-light text-text-tertiary">
              Dev: form mocks locally. On Netlify it uses Netlify Forms.
            </p>
          )}
        </div>

        <article className="how-ios-card inquiry-panel">
          <div className="how-ios-card-inner">
            {status === "success" ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-10 text-center" role="status">
                <CheckCircle2 size={44} className="mx-auto link-accent" />
                <p className="mt-4 text-base font-light text-text-primary">
                  {serverMsg || copy.successMessage}
                </p>
                <button type="button" onClick={() => setStatus("idle")} className="mt-4 text-sm link-accent hover:underline">
                  {copy.successAction}
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
                <input
                  type="text"
                  name="website"
                  value={form.honeypot}
                  onChange={(e) => update("honeypot", e.target.value)}
                  className="absolute -left-[9999px] h-0 w-0 opacity-0"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />

                <div>
                  <label htmlFor="contact-email" className={`inquiry-label ${errors.email ? "inquiry-label--error" : ""}`}>
                    Email
                    <span className="inquiry-required">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    className={`inquiry-input ${errors.email ? "inquiry-input--error" : ""}`}
                    autoComplete="email"
                    placeholder={copy.emailPlaceholder}
                    required
                  />
                  {errors.email && (
                    <p className="mt-1.5 text-xs text-error" role="alert">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="contact-name" className="inquiry-label">
                    Name
                    <span className="inquiry-optional">optional</span>
                  </label>
                  <input
                    id="contact-name"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    className="inquiry-input"
                    autoComplete="name"
                  />
                </div>

                <div>
                  <label htmlFor="contact-projectType" className="inquiry-label">
                    Project Type
                    <span className="inquiry-optional">optional</span>
                  </label>
                  <div className="relative">
                    <select
                      id="contact-projectType"
                      value={form.projectType}
                      onChange={(e) => update("projectType", e.target.value)}
                      className={`inquiry-input inquiry-select w-full ${!form.projectType ? "inquiry-input--empty" : ""}`}
                    >
                      <option value="">{copy.projectTypePlaceholder}</option>
                      {projectTypes.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                    <ChevronDown size={14} className="inquiry-select-chevron pointer-events-none absolute right-0 top-1/2 -translate-y-1/2" aria-hidden="true" />
                  </div>
                  {form.projectType === "AI Production" && (
                    <p className="inquiry-helper mt-2 text-xs font-light leading-relaxed text-text-tertiary">
                      {copy.aiHelper}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="contact-message" className={`inquiry-label ${errors.message ? "inquiry-label--error" : ""}`}>
                    Message
                    <span className="inquiry-required">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    placeholder={copy.messagePlaceholder}
                    rows={4}
                    required
                    className={`inquiry-input inquiry-textarea resize-none ${errors.message ? "inquiry-input--error" : ""}`}
                  />
                  {errors.message && (
                    <p className="mt-1.5 text-xs text-error" role="alert">
                      {errors.message}
                    </p>
                  )}
                </div>

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
                  className="gradient-button-emerald btn-on-accent flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-sm font-medium uppercase tracking-[0.14em]"
                >
                  {status === "loading" ? (
                    <>
                      <span className="form-spinner h-4 w-4 animate-spin rounded-full border-2" />
                      {copy.sendingLabel}
                    </>
                  ) : (
                    <>
                      {copy.submitLabel}
                      <ChevronRight size={16} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </article>
      </div>
    </section>
  );
}
