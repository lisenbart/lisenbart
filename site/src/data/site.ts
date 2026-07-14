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
  studioModal: {
    title: "Lisenbart Production",
    subtitle: "In animation since 2006",
    intro:
      "Lisenbart Production has been creating animation, film and motion content since 2006 — from TV branding and commercials to short films, game marketing and YouTube channels.",
    body:
      "We are a producer-led studio: one trusted lead contact, the right team assembled for each brief, and delivery from script and design through animation, sound and final grade. Teams in Ukraine, Canada and Poland — working with clients worldwide.",
    highlights: [
      "Founded 2006 · Kyiv, Ukraine",
      "2D · 3D · motion graphics · stop-motion · puppet",
      "Commercial · film · gaming · social content",
      "Producer-led · end-to-end delivery",
    ],
    ctaLabel: "Discuss a project",
    closeLabel: "Close",
  },
  awardsModal: {
    title: "Unnecessary Things",
    subtitle: "15 awards · 45 selections · 8.0 on IMDb",
    intro:
      "Award-winning 14-minute animated short directed by Dmytro Lisenbart. A robot buys a human from a store of unwanted things — a friendship that ends where it began.",
    body:
      "Full 2D production from Lisenbart Animation Studio: script, design, animation and festival delivery. Recognised across Europe and Asia on the international festival circuit.",
    highlights: [
      "Best Animated Short Film · Curtas International Film Festival",
      "World Premiere · Shanghai International Film Festival",
      "Linoleum · ZIFF · Vancouver · Huesca · Odessa",
      "Prague Film Awards",
      "45 official festival selections worldwide",
    ],
    ctaLabel: "View film case",
    closeLabel: "Close",
  },
  teamModal: {
    title: "Global production network",
    subtitle: "Canada · Ukraine · Poland · Remote worldwide",
    intro:
      "Our producers, directors, art directors, animators, compositors and sound partners work across time zones — not in one room, but as one team assembled for each project.",
    body:
      "That distributed model keeps production moving around the clock. When one region signs off, another picks up — so reviews, revisions and delivery never wait for morning. One lead producer on your side, specialists worldwide, always within reach.",
    highlights: [
      "Producers · directors · art directors · animators",
      "Storyboard · design · 2D · 3D · motion · compositing",
      "Hubs in Canada, Ukraine and Poland",
      "Remote collaborators across Europe and North America",
      "Near 24/7 coverage · always on call for active projects",
    ],
    ctaLabel: "Discuss a project",
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
