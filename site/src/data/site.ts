import { publicAsset } from "@/lib/publicAsset";

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
    personalPositioning:
      "I direct animation and produce film — for festivals, brands, and original projects.",
    personalProof: "35 years in animation · 20 years producing · 1,000+ projects delivered",
    personalPortrait: "/images/portrait.webp",
    personalPortraitAlt: "Portrait of Dmytro Lisenbart",
  },
  showreelSection: {
    title: "Showreel",
    caption:
      "Festival films, commercial work, and original projects — directed and produced with the teams each brief required.",
  },
  trustedBy: {
    label: "Trusted by",
    brands: [
      "Nestlé",
      "Playtika",
      "MasterCard",
      "Voodoo",
      "Samsung",
      "Plarium",
      "McDonald's",
      "Moon Active",
    ] as const,
  },
  explorePaths: {
    title: "Film and commercial work.",
    film: {
      label: "Film",
      title: "Original films & IP",
      text: "Original shorts, a feature in development, and children’s IP for young audiences.",
    },
    commercial: {
      label: "Commercial",
      title: "Brands, agencies & game studios",
      text: "Campaign films, trailers, and animation — shaped for the brief, audience, and final delivery.",
    },
  },
  personalAbout: {
    title: "About",
    bio: "I've been directing animation for 35 years and producing commercial work for 20 — leading creative and production teams across Ukraine, Canada and Poland for clients across Europe and North America. I headed Ukranimafilm from 2017 to 2019 and co-founded UANIMA, the Ukrainian Animation Association. My background is in painting and film directing, trained at Kyiv's Karpenko-Kary University. Every project here is shaped with the writers, designers, animators and producers the work requires.",
    recognition: "UANIMA · Head of Ukranimafilm, 2017–2019",
    locations: "Ukraine · Canada · Poland",
  },
  filmPage: {
    title: "Original films, feature development, and children’s IP.",
    caseIds: ["unnecessary-things", "the-last-kozak", "pershosvit", "scoopy-cap"] as const,
    contactLead:
      "For festivals, co-productions, distribution or press — tell me where the project stands.",
  },
  commercialPage: {
    title: "Production leadership for brands, agencies and game studios.",
    reels: [
      {
        id: "ai-powered-reel",
        label: "AI Production",
        text: "Sometimes the idea calls for AI in visual development, world building, individual sequences, or a complete film. The brief defines its role, and I shape every decision with the team.",
        vimeoId: null as string | null,
        /** 10-day countdown window ending at this ISO timestamp */
        comingSoonEndsAt: "2026-07-27T18:00:00+02:00",
      },
      {
        id: "advertising-reel",
        label: "Advertising",
        text: "Brand campaigns and commercial films for Samsung, McDonald's, Nestlé and MasterCard — from first idea to final delivery.",
        vimeoId: "849899875" as string | null,
      },
      {
        id: "games-reel",
        label: "Games",
        text: "Trailers and cinematics for Playtika, Plarium and Moon Active — shaped for the audience, platform and campaign goal.",
        vimeoId: "944158555" as string | null,
      },
    ],
    contactLead: "Tell me where the idea stands today. A brief is enough to begin.",
  },
  ctaLabel: "Discuss a Project",
  contactSubmitLabel: "Send It Over",
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
    body: "This channel is still being set up. Until then, email me directly.",
    cta: "Email Me Directly",
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
      "I direct animation and produce film for festivals, brands, and original projects. Festival work, children’s IP, and commercial production.",
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
  return `#${sectionIds.contact}`;
}

/** Scroll to Contact on the current page. */
export function goToContact(onDone?: () => void) {
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
