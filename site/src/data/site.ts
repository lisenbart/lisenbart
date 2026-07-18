import { publicAsset } from "@/lib/publicAsset";
import { isWorkSection, routes } from "@/lib/routes";

export const site = {
  name: "LISENBART",
  brand: "LISENBART",
  tagline: {
    line1: "Film · Commercial",
    line2: "",
  },
  hero: {
    personalName: "Dmytro Lisenbart",
    personalRole: "Animation Director & Producer",
    personalPositioning: "I direct animation and film — for festivals, for brands, and for myself.",
    personalProof: "35 years in animation · 20 years producing · 1000+ projects delivered",
    personalPortrait: "/images/portrait.jpg",
    personalPortraitAlt: "Portrait of Dmytro Lisenbart",
  },
  showreelSection: {
    title: "Showreel",
    caption:
      "Some of it I was asked to make. Some of it I just wanted to. None of it made alone.",
  },
  trustedBy: {
    label: "Trusted by",
    brands: ["Samsung", "McDonald's", "Nestlé", "MasterCard", "Playtika", "Plarium"] as const,
  },
  explorePaths: {
    title: "Two roads, one direction.",
    film: {
      label: "Film",
      title: "Authored cinema & personal IP",
      text: "Original shorts, an animated feature in development, and two IP universes.",
    },
    commercial: {
      label: "Commercial",
      title: "Brands & game studios",
      text: "Campaign films, trailers and animation for brands and game studios.",
    },
  },
  personalAbout: {
    title: "About",
    bio: "I've been directing animation for 35 years and producing commercial work for 20 — leading creative and production teams across Ukraine, Canada and Poland for clients across Europe and North America. I headed Ukranimafilm from 2017 to 2019 and co-founded UANIMA, the Ukrainian Animation Association. My background is in painting and film directing, trained at Kyiv's Karpenko-Kary University. None of it happens alone — every project here was shaped by writers, designers and animators I'm lucky to work with.",
    recognition: "UANIMA · Head of Ukranimafilm, 2017–2019",
    locations: "Ukraine · Canada · Poland",
  },
  filmPage: {
    title: "Original stories, directed for the screen — not the client.",
    caseIds: ["unnecessary-things", "the-last-kozak", "pershosvit", "scoopy-cap"] as const,
    contactLead: "For festival inquiries, co-productions or press — get in touch.",
  },
  commercialPage: {
    title: "Production leadership for brands, agencies and game studios.",
    reels: [
      {
        id: "ai-powered-reel",
        label: "AI Powered",
        text: "Concept exploration and rapid visual development — accelerated with AI-assisted tools, always finished by hand.",
        vimeoId: null as string | null,
        /** 10-day countdown window ending at this ISO timestamp */
        comingSoonEndsAt: "2026-07-27T18:00:00+02:00",
      },
      {
        id: "advertising-reel",
        label: "Advertising",
        text: "Brand campaigns and commercial films for Samsung, McDonald's, Nestlé and MasterCard — from first concept to final delivery.",
        vimeoId: "849899875" as string | null,
      },
      {
        id: "games-reel",
        label: "Games",
        text: "Trailers and cinematics for Playtika, Plarium and Moon Active — built to sell the moment before the click.",
        vimeoId: "944158555" as string | null,
      },
    ],
    contactLead: "Tell me about your project — I'll get back to you within 24 hours.",
  },
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
    body: "This one's still being built. Until it's live, drop me a line — I read everything myself.",
    cta: "Email Me",
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
  canonical: "https://lisenbart.com",
  logo: {
    /** Shown on dark backgrounds */
    white: "/images/logo_white.png",
    /** Shown on light backgrounds */
    black: "/images/logo_black.png",
  },
  meta: {
    title: "Dmytro Lisenbart — Animation Director & Producer",
    description:
      "I direct animation and film — for festivals, for brands, and for myself. Festival work, children’s IP, and commercial craft.",
    ogImage: publicAsset("/images/work/lisenbart-showreel-preview.jpg"),
  },
};

export const sectionIds = {
  about: "about",
  showreel: "showreel",
  explore: "explore",
  trusted: "trusted",
  contact: "contact",
} as const;

export function contactHref() {
  // Home + /film + /commercial host the form in-page; legacy /work/* still jumps home.
  if (isWorkSection()) {
    return `${routes.home}#${sectionIds.contact}`;
  }
  return `#${sectionIds.contact}`;
}

/** Scroll to Contact on the current page when the form is present; otherwise go home. */
export function goToContact(onDone?: () => void) {
  if (isWorkSection()) {
    window.location.href = `${routes.home}#${sectionIds.contact}`;
    return;
  }
  scrollToSection(sectionIds.contact, onDone);
}

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
