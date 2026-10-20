import { useEffect, useState, type FormEvent } from "react";
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
import { Arrow } from "@/components/film/FilmIcons";

interface FormState {
  name: string;
  email: string;
  projectType: string;
  message: string;
  honeypot: string;
}

type Status = "idle" | "loading" | "success" | "error";

const copy = site.contactForm;

export default function FilmContactSection({
  heading = site.homeContact.heading,
  lead = site.homeContact.lead,
}: {
  heading?: string;
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
    <section id={sectionIds.contact} className="contact-page" aria-label="Contact">
      <div className="contact-content">
        <h1>{heading}</h1>
        {lead ? <p className="film-contact__lead">{lead}</p> : null}
        {!isContactFormLive && import.meta.env.DEV ? (
          <p className="film-contact__lead">Dev: form mocks locally. On Netlify it uses Netlify Forms.</p>
        ) : null}

        <div className="contact-columns">
          {status === "success" ? (
            <div role="status">
              <p>{serverMsg || copy.successMessage}</p>
              <button type="button" className="send-button" onClick={() => setStatus("idle")}>
                <span className="circle-link">
                  <Arrow />
                </span>
                {copy.successAction}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
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
              <label>
                <span>Name</span>
                <input
                  id="contact-name"
                  name="name"
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  autoComplete="name"
                />
              </label>
              <label>
                <span>
                  Email{errors.email ? " — required" : ""}
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
                />
              </label>
              <label>
                <span>Project type</span>
                <select
                  id="contact-projectType"
                  name="type"
                  value={form.projectType}
                  onChange={(e) => update("projectType", e.target.value)}
                >
                  <option value="">Select</option>
                  {projectTypes.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                <span>
                  Message{errors.message ? " — required" : ""}
                </span>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={2}
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                  required
                  aria-invalid={Boolean(errors.message)}
                />
              </label>
              {status === "error" && serverMsg ? (
                <p role="alert">
                  {serverMsg}{" "}
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                </p>
              ) : null}
              <button className="send-button" type="submit" disabled={status === "loading"}>
                <span className="circle-link">
                  <Arrow />
                </span>
                {status === "loading" ? copy.sendingLabel : "Send a brief"}
              </button>
            </form>
          )}
          <div className="contact-details">
            <span>Or just say hello</span>
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <p>{site.locations}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
