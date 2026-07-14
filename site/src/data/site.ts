import { publicAsset } from "@/lib/publicAsset";

export const site = {
  name: "LISENBART",
  brand: "LISENBART",
  tagline: {
    line1: "Commercial · film",
    line2: "Gaming · social",
  },
  oneLiner:
    "From brief to screen — animation, film and AI content, produced end to end.",
  hero: {
    headlineLine2BeforeAccent: "The right team. ",
    headlineAccent: "End to end",
    paragraph:
      "From brief to screen — animation, film and AI content, produced end to end.",
  },
  capabilitiesLine:
    "Film, animation, game and AI content — scoped and delivered end to end.",
  ctaLabel: "Discuss a project",
  contactSubmitLabel: "Send message",
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
    body: "This channel is still in the works. For now, drop us a line and you'll hear back.",
    cta: "Email Me",
    closeLabel: "Close",
  },
  capabilityShowreelModal: {
    soonLabel: "Showreel coming soon",
    closeLabel: "Close",
  },
  clientsModal: {
    title: "Clients",
    subtitle: "1000+ projects delivered",
    casesCtaLabel: "Our cases",
    closeLabel: "Close",
  },
  testimonialsBlock: {
    title: "What clients say",
    addLabel: "Leave a review",
    submitModal: {
      title: "Leave a review",
      subtitle: "Sent for moderation before publishing",
      quoteLabel: "Your review",
      nameLabel: "Your name",
      companyLabel: "Company",
      ratingLabel: "Rating",
      ratingSkip: "No rating",
      submitLabel: "Send review",
      sendingLabel: "Sending...",
      closeLabel: "Close",
      charLimit: 500,
      successBody: "Review submitted and will be added as soon as possible.",
      validationSummary: "Please check the highlighted fields.",
    },
    readModal: {
      closeLabel: "Close",
    },
  },
  locations: "Ukraine · Canada · Poland · Remote worldwide",
  founderQuote: {
    text: "The AI era — guided by a professional eye.",
    author: "Dmytro Lisenbart",
  },
  canonical: "https://www.lisenbart.com",
  logo: {
    /** Shown on dark backgrounds */
    white: "/images/logo_white.png",
    /** Shown on light backgrounds */
    black: "/images/logo_black.png",
  },
  favicon: "/favicon.png",
  meta: {
    title: "LISENBART — Film, Animation & AI Content",
    description:
      "From brief to screen — animation, film and AI content, produced end to end.",
    ogImage: publicAsset("/images/header_01.png"),
  },
};

export const sectionIds = {
  services: "services",
  about: "about",
  contact: "contact",
} as const;

export function scrollToSection(id: string, onDone?: () => void) {
  const el = document.getElementById(id);
  if (!el) {
    onDone?.();
    return;
  }

  document.body.style.overflow = "";
  document.body.classList.remove("header-connect-open");

  const runScroll = () => {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    onDone?.();

    if (id === sectionIds.contact) {
      window.setTimeout(() => {
        document.getElementById("contact-email")?.focus({ preventScroll: true });
      }, 720);
    }
  };

  requestAnimationFrame(() => {
    requestAnimationFrame(runScroll);
  });
}
