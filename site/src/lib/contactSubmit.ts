import {
  contactEndpoint,
  contactHandler,
  isContactFormLive,
  NETLIFY_FORM_NAME,
} from "@/lib/contactConfig";
import { site } from "@/data/site";

export interface ContactPayload {
  name: string;
  email: string;
  projectType: string;
  message: string;
  honeypot?: string;
}

export interface ContactResult {
  success: boolean;
  message: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContact(data: ContactPayload): Record<string, string> {
  const errors: Record<string, string> = {};

  if (data.honeypot?.trim()) {
    errors.form = "Submission blocked.";
    return errors;
  }
  if (!data.email.trim()) errors.email = "Email is required";
  else if (!EMAIL_RE.test(data.email)) errors.email = "Enter a valid email";

  return errors;
}

function buildSubject(data: ContactPayload): string {
  const type = data.projectType.trim();
  return type ? `LISENBART — ${type}` : "LISENBART — New project inquiry";
}

function formatMessageBody(data: ContactPayload): string {
  const lines = [
    data.message.trim() || "(no message)",
    "",
    "---",
    data.name.trim() ? `Name: ${data.name.trim()}` : "Name: (not provided)",
    `Email: ${data.email.trim()}`,
    data.projectType ? `Project type: ${data.projectType}` : "Project type: (not provided)",
  ];
  return lines.join("\n");
}

function encodeUrlBody(fields: Record<string, string>): string {
  return Object.entries(fields)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join("&");
}

async function parseErrorResponse(res: Response): Promise<string> {
  try {
    const json = (await res.json()) as {
      message?: string;
      error?: string;
      errors?: { message: string }[];
    };
    if (json.message) return json.message;
    if (json.errors?.[0]?.message) return json.errors[0].message;
    if (json.error) return json.error;
  } catch {
    /* ignore */
  }
  return "Could not send your message. Please try again or email us directly.";
}

function buildPhpFormBody(data: ContactPayload): FormData {
  const body = new FormData();
  body.append("email", data.email.trim());
  if (data.name.trim()) body.append("name", data.name.trim());
  if (data.projectType) body.append("projectType", data.projectType);
  body.append("message", formatMessageBody(data));
  if (data.honeypot?.trim()) body.append("website", data.honeypot.trim());
  return body;
}

function buildFormspreeBody(data: ContactPayload): FormData {
  const body = buildPhpFormBody(data);
  body.append("_replyto", data.email.trim());
  body.append("_subject", buildSubject(data));
  if (data.honeypot?.trim()) body.append("_gotcha", data.honeypot.trim());
  return body;
}

function buildNetlifyBody(data: ContactPayload): string {
  return encodeUrlBody({
    "form-name": NETLIFY_FORM_NAME,
    email: data.email.trim(),
    name: data.name.trim(),
    projectType: data.projectType,
    message: formatMessageBody(data),
    website: data.honeypot?.trim() ?? "",
  });
}

export async function submitContact(data: ContactPayload): Promise<ContactResult> {
  const errors = validateContact(data);
  if (Object.keys(errors).length > 0) {
    return { success: false, message: Object.values(errors)[0] };
  }

  if (!isContactFormLive) {
    console.info("[LISENBART] Contact (dev mock):", {
      name: data.name,
      email: data.email,
      projectType: data.projectType,
      message: data.message,
    });
    await new Promise((r) => setTimeout(r, 600));
    return {
      success: true,
      message: "Thank you. I've received your message and you'll hear back shortly.",
    };
  }

  let res: Response;

  if (contactHandler === "netlify") {
    res = await fetch(contactEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: buildNetlifyBody(data),
    });
  } else if (contactHandler === "remote" && contactEndpoint.includes("formspree.io")) {
    res = await fetch(contactEndpoint, {
      method: "POST",
      body: buildFormspreeBody(data),
      headers: { Accept: "application/json" },
    });
  } else {
    res = await fetch(contactEndpoint, {
      method: "POST",
      body: buildPhpFormBody(data),
      headers: { Accept: "application/json" },
    });
  }

  if (!res.ok) {
    return { success: false, message: await parseErrorResponse(res) };
  }

  if (contactHandler === "php") {
    try {
      const json = (await res.json()) as { success?: boolean; message?: string };
      if (json.success === false) {
        return { success: false, message: json.message ?? "Could not send your message." };
      }
    } catch {
      /* ignore */
    }
  }

  return {
    success: true,
    message: "Thank you. I've received your message and you'll hear back shortly.",
  };
}
