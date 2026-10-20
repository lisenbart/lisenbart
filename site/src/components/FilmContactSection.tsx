import { useEffect, useRef, useState, type FormEvent } from "react";
import { isContactFormLive, NETLIFY_FORM_NAME } from "@/lib/contactConfig";
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
const emptyForm = (): FormState => ({
  name: "",
  email: "",
  projectType: "",
  message: "",
  honeypot: "",
});

export default function FilmContactSection({
  heading = site.homeContact.heading,
  lead,
}: {
  heading?: string;
  lead?: string;
}) {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMsg, setServerMsg] = useState("");
  const submittingRef = useRef(false);

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
    if (submittingRef.current || status === "loading") return;

    const validationErrors = validateContact(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setStatus("idle");
      if (validationErrors.email) document.getElementById("contact-email")?.focus();
      else if (validationErrors.message) document.getElementById("contact-message")?.focus();
      return;
    }

    submittingRef.current = true;
    setErrors({});
    setStatus("loading");
    setServerMsg("");

    try {
      const result = await submitContact(form);
      if (result.success) {
        setStatus("success");
        setServerMsg(result.message);
        setForm(emptyForm());
      } else {
        setStatus("error");
        setServerMsg(result.message);
      }
    } catch {
      setStatus("error");
      setServerMsg(copy.errorFallback);
    } finally {
      submittingRef.current = false;
    }
  };

  return (
    <section id={sectionIds.contact} className="contact-page" aria-label="Contact">
      <div className="contact-content">
        <h1>{heading}</h1>
        {lead ? <p className="film-contact__lead">{lead}</p> : null}
        {!isContactFormLive && import.meta.env.DEV ? (
          <p className="film-contact__lead">
            Dev: form mocks locally. On Netlify it uses Netlify Forms.
          </p>
        ) : null}

        <div className="contact-columns">
          <div aria-live="polite" aria-atomic="true" className="contact-status-region">
            {status === "success" ? (
              <div role="status">
                <p>{serverMsg || copy.successMessage}</p>
                <button type="button" className="send-button" onClick={() => setStatus("idle")}>
                  {copy.successAction}
                </button>
              </div>
            ) : (
              <form
                name={NETLIFY_FORM_NAME}
                method="POST"
                data-netlify="true"
                data-netlify-honeypot="website"
                onSubmit={handleSubmit}
                noValidate
              >
                <input type="hidden" name="form-name" value={NETLIFY_FORM_NAME} />
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
                <label htmlFor="contact-name">
                  <span>Name</span>
                  <input
                    id="contact-name"
                    name="name"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    autoComplete="name"
                    placeholder="Your name"
                  />
                </label>
                <label htmlFor="contact-email">
                  <span>
                    Email
                    {errors.email ? (
                      <span className="contact-field-error"> — {errors.email}</span>
                    ) : null}
                  </span>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    autoComplete="email"
                    required
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "contact-email-error" : undefined}
                    placeholder={copy.emailPlaceholder}
                  />
                  {errors.email ? (
                    <span id="contact-email-error" className="sr-only">
                      {errors.email}
                    </span>
                  ) : null}
                </label>
                <label htmlFor="contact-projectType">
                  <span>Project type</span>
                  <select
                    id="contact-projectType"
                    name="projectType"
                    value={form.projectType}
                    onChange={(e) => update("projectType", e.target.value)}
                  >
                    <option value="">{copy.projectTypePlaceholder}</option>
                    {projectTypes.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </label>
                <label htmlFor="contact-message">
                  <span>
                    Message
                    {errors.message ? (
                      <span className="contact-field-error"> — {errors.message}</span>
                    ) : null}
                  </span>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    required
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? "contact-message-error" : undefined}
                    placeholder={copy.messagePlaceholder}
                  />
                  {errors.message ? (
                    <span id="contact-message-error" className="sr-only">
                      {errors.message}
                    </span>
                  ) : null}
                </label>
                {status === "error" && serverMsg ? (
                  <p className="contact-form-error" role="alert">
                    {serverMsg}{" "}
                    <a href={`mailto:${site.email}`}>{site.email}</a>
                  </p>
                ) : null}
                <button className="send-button" type="submit" disabled={status === "loading"}>
                  {status === "loading" ? copy.sendingLabel : copy.submitLabel}
                </button>
              </form>
            )}
          </div>
          <div className="contact-details">
            <span>Or just say hello</span>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </div>
        </div>
      </div>
    </section>
  );
}
