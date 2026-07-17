import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ChevronDown, ChevronRight } from "lucide-react";
import { isContactFormLive } from "@/lib/contactConfig";
import { projectTypes } from "@/data/services";
import { sectionIds, site } from "@/data/site";
import { submitContact, validateContact } from "@/lib/contactSubmit";

interface FormState {
  name: string;
  email: string;
  projectType: string;
  message: string;
  honeypot: string;
}

type Status = "idle" | "loading" | "success" | "error";

export default function ContactForm({
  lead = "Tell me about your project — I'll get back to you within 24 hours.",
}: {
  lead?: string;
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
      return;
    }

    setErrors({});
    setStatus("loading");
    setServerMsg("");

    const result = await submitContact(form);
    if (result.success) {
      setStatus("success");
      setForm({ name: "", email: "", projectType: "", message: "", honeypot: "" });
    } else {
      setStatus("error");
      setServerMsg(result.message);
    }
  };

  return (
    <section
      id={sectionIds.contact}
      className="scroll-mt-24 w-full max-w-full min-w-0 px-[var(--page-padding)] pb-[var(--section-spacing)]"
      aria-label="Contact"
    >
      <div className="mx-auto w-full min-w-0 max-w-[920px]">
        <div className="mb-8 text-center md:mb-10">
          <h2 className="section-heading">Contact</h2>
          <p className="mx-auto mt-3 max-w-md text-[0.9375rem] font-light leading-relaxed text-text-secondary md:text-base">
            {lead}
          </p>
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
                  Thank you. I've received your message and you'll hear back shortly.
                </p>
                <button type="button" onClick={() => setStatus("idle")} className="mt-4 text-sm link-accent hover:underline">
                  Send another message
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
                    placeholder={`you@company.com`}
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
                    Project type
                    <span className="inquiry-optional">optional</span>
                  </label>
                  <div className="relative">
                    <select
                      id="contact-projectType"
                      value={form.projectType}
                      onChange={(e) => update("projectType", e.target.value)}
                      className={`inquiry-input inquiry-select w-full ${!form.projectType ? "inquiry-input--empty" : ""}`}
                    >
                      <option value="">Select type</option>
                      {projectTypes.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                    <ChevronDown size={14} className="inquiry-select-chevron pointer-events-none absolute right-0 top-1/2 -translate-y-1/2" aria-hidden="true" />
                  </div>
                  {form.projectType === "AI-Assisted Production" && (
                    <p className="inquiry-helper mt-2 text-xs font-light leading-relaxed text-text-tertiary">
                      AI speeds up the work — the craft stays mine.
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="contact-message" className="inquiry-label">
                    Message
                    <span className="inquiry-optional">optional</span>
                  </label>
                  <textarea
                    id="contact-message"
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    placeholder="Brief, timeline, references..."
                    rows={4}
                    className="inquiry-input inquiry-textarea resize-none"
                  />
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
                      Sending...
                    </>
                  ) : (
                    <>
                      {site.contactSubmitLabel}
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
