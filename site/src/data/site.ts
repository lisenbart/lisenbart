import { publicAsset } from "@/lib/publicAsset";

export const site = {
  name: "LISENBART",
  brand: "LISENBART",
  tagline: {
    line1: "General producer for",
    line2: "film, animation and AI content",
  },
  oneLiner:
    "General producer for film, animation and AI content — one lead, the right team, delivery end to end.",
  hero: {
    headlineLine2BeforeAccent: "The right team. ",
    headlineAccent: "End to end",
    paragraph:
      "General producer for film, animation and AI content — the right team, delivery end to end.",
  },
  capabilitiesLine:
    "Film, animation, game and AI content — scoped and delivered end to end.",
  ctaLabel: "Discuss a project",
  email: "info@lisenbart.com",
  linkedin: "https://www.linkedin.com/in/lisenbart/",
  vimeo: "https://vimeo.com/849899875",
  youtube: "https://www.youtube.com/@lisenbartProduction",
  social: {
    linkedin: {
      href: "https://www.linkedin.com/in/lisenbart/",
      active: true,
    },
    whatsapp: {
      href: "https://wa.me/380676302252",
      active: true,
    },
    facebook: {
      href: "https://www.facebook.com/dmytro.linsenbarth",
      active: true,
    },
    youtube: {
      href: "https://www.youtube.com/@lisenbartProduction",
      active: true,
    },
  },
  socialComingSoon: {
    title: "Almost there",
    body: "This channel is still in the works. For now, drop me a line and I'll get back to you.",
    cta: "Email Me",
    closeLabel: "Close",
  },
  locations: "Ukraine · Remote worldwide",
  canonical: "https://www.lisenbart.com",
  meta: {
    title: "LISENBART — General Producer for Film, Animation and AI Content",
    description:
      "General producer for film, animation and AI content. One lead, the right team, delivery end to end.",
    ogImage: publicAsset("/images/header_01.png"),
  },
  organizationDescription:
    "General producer for film, animation and AI content — one lead, the right team, delivery end to end.",
};

export const sectionIds = {
  services: "services",
  about: "about",
  contact: "contact",
} as const;

export function scrollToSection(id: string, onDone?: () => void) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    if (onDone) {
      onDone();
    } else if (id === sectionIds.contact) {
      window.setTimeout(() => document.getElementById("contact-email")?.focus(), 650);
    }
  }
}
