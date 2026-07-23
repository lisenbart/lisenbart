import { publicAsset } from "@/lib/publicAsset";

export const site = {
  name: "LISENBART",
  brand: "LISENBART",
  hero: {
    personalName: "Dmytro Lisenbart",
    personalRole: "Animation Director & Producer",
    personalPositioning:
      "I develop original animation projects and direct commissioned work for brands, studios, and production partners.",
    personalProof: [
      "35 years in animation",
      "20 years producing",
      "1,000+ projects delivered",
    ] as const,
    personalPortrait: "/images/portrait.webp",
    personalPortraitAlt: "Portrait of Dmytro Lisenbart",
    imdbHref: "https://www.imdb.com/name/nm11412621/",
    imdbAria: "View Dmytro Lisenbart on IMDb",
  },
  showreelSection: {
    title: "Showreel",
  },
  trustedBy: {
    label: "Selected Clients",
    brands: [
      "Nestlé",
      "Playtika",
      "Mastercard",
      "Voodoo",
      "Samsung",
      "Plarium",
      "McDonald's",
      "Moon Active",
    ] as const,
  },
  explorePaths: {
    titleLines: ["One Practice.", "Two Directions."] as const,
    film: {
      title: "LISENBART ORIGINALS",
      text: "Independent films, stories, and IP developed from the first idea onward.",
      ctaAria: "View LISENBART Originals projects",
      previewImages: [
        "/images/explore/originals/00-eyes.webp",
        "/images/explore/originals/01.webp",
        "/images/explore/originals/02.webp",
        "/images/explore/originals/03.webp",
        "/images/explore/originals/04.webp",
        "/images/explore/originals/05.webp",
        "/images/explore/originals/06.webp",
        "/images/explore/originals/07.webp",
        "/images/explore/originals/08.webp",
        "/images/explore/originals/09.webp",
        "/images/explore/originals/10.webp",
        "/images/explore/originals/11.webp",
        "/images/explore/originals/12.webp",
        "/images/explore/originals/13.webp",
        "/images/explore/originals/14.webp",
      ],
    },
    commercial: {
      title: "CLIENT WORK",
      text: "Direction and production for brands, agencies, studios, and production partners.",
      ctaAria: "View selected client work",
      previewImages: [
        "/images/reels/games/01.webp",
        "/images/reels/advertising/01.webp",
        "/images/reels/ai/01.webp",
        "/images/reels/games/03.webp",
        "/images/reels/advertising/03.webp",
        "/images/reels/ai/05.webp",
        "/images/reels/games/05.webp",
        "/images/reels/advertising/05.webp",
        "/images/reels/ai/08.webp",
        "/images/reels/games/07.webp",
        "/images/reels/advertising/07.webp",
        "/images/reels/ai/12.webp",
      ],
    },
  },
  personalAbout: {
    title: "About",
    paragraphs: [
      "I grew up drawing and making things up. At no point did I decide this was the career — I just kept doing it, and never got around to stopping.",
      "Since then: artist, director, producer, studio founder. For a stretch I ran Ukranimafilm, Ukraine's national animation studio — still slightly improbable to me.",
      "What all of it taught me: creativity and production aren't enemies, even if they act like it. An idea needs room to breathe — and the right people, structure and runway to actually get made.",
      "I usually start with \"What if?\" It pretty quickly becomes: \"Alright — how do we pull this off?\"",
    ] as const,
    markers: [] as const,
  },
  filmPage: {
    name: "LISENBART ORIGINALS",
    title: "Original films and story worlds developed from first idea through production.",
    seoTitle: "LISENBART Originals — Animated Films & Story IP",
    seoDescription:
      "Original animated films and story IP by Dmytro Lisenbart — including Unnecessary Things and projects in development. Co-production, festival, and press enquiries.",
    filmIds: ["unnecessary-things", "the-last-kozak"] as const,
    ipIds: ["pershosvit", "scoopy-cap"] as const,
    contactHeading: "Project Enquiries",
    contactLead:
      "For co-production, distribution, festivals, or press, tell me which project you’re interested in.",
  },
  commercialPage: {
    name: "CLIENT WORK",
    title: "Direction and production shaped around each brief — from creative development through final delivery.",
    seoTitle: "Client Animation — Brands, Games & Agencies | LISENBART",
    seoDescription:
      "Animation direction and production for brands, agencies, and game studios — from creative development through final delivery. Led by Dmytro Lisenbart.",
    reels: [
      {
        id: "ai-powered-reel",
        label: "AI Production",
        text: "AI can support visual development, world-building, individual sequences, or an entire film. Its role is defined by the brief and the creative needs of the project.",
        vimeoId: null as string | null,
        comingSoon: true,
        previewImages: [
          "/images/reels/ai/01.webp",
          "/images/reels/ai/02.webp",
          "/images/reels/ai/03.webp",
          "/images/reels/ai/04.webp",
          "/images/reels/ai/05.webp",
          "/images/reels/ai/06.webp",
          "/images/reels/ai/07.webp",
          "/images/reels/ai/08.webp",
          "/images/reels/ai/09.webp",
          "/images/reels/ai/10.webp",
          "/images/reels/ai/11.webp",
          "/images/reels/ai/12.webp",
          "/images/reels/ai/13.webp",
          "/images/reels/ai/14.webp",
          "/images/reels/ai/15.webp",
          "/images/reels/ai/16.webp",
        ],
      },
      {
        id: "game-reel",
        label: "Gaming",
        text: "Trailers and cinematics shaped for the audience, platform, and campaign goal.",
        vimeoId: "944158555" as string | null,
        previewImages: [
          "/images/reels/games/01.webp",
          "/images/reels/games/02.webp",
          "/images/reels/games/03.webp",
          "/images/reels/games/04.webp",
          "/images/reels/games/05.webp",
          "/images/reels/games/06.webp",
          "/images/reels/games/07.webp",
        ],
      },
      {
        id: "advertising-reel",
        label: "Advertising",
        text: "Campaigns and films created for global brands and agencies.",
        vimeoId: "849899875" as string | null,
        previewImages: [
          "/images/reels/advertising/01.webp",
          "/images/reels/advertising/02.webp",
          "/images/reels/advertising/03.webp",
          "/images/reels/advertising/04.webp",
          "/images/reels/advertising/05.webp",
          "/images/reels/advertising/06.webp",
          "/images/reels/advertising/07.webp",
          "/images/reels/advertising/08.webp",
        ],
      },
    ],
    contactHeading: "Have a Brief?",
    contactLead: "Share the project, timeline, and current stage. I’ll come back with the right next step.",
  },
  homeContact: {
    heading: "Start a Conversation",
    lead: "Tell me what you’re working on and where it stands. A short brief is enough to begin.",
  },
  contactForm: {
    submitLabel: "Send Message",
    sendingLabel: "Sending…",
    successMessage: "Thank you — I’ll review your message and get back to you soon.",
    successAction: "Send Another Message",
    errorFallback: "Your message couldn’t be sent. Please try again or email me directly.",
    emailRequired: "Email is required.",
    emailInvalid: "Enter a valid email address.",
    messageRequired: "Tell me a little about the project.",
    emailPlaceholder: "you@company.com",
    projectTypePlaceholder: "Select a Project Type",
    messagePlaceholder: "Project, goals, timeline, and references",
    aiHelper: "Where do you see AI fitting into the project?",
  },
  primaryNav: [
    { id: "originals" as const, label: "Originals" },
    { id: "client-work" as const, label: "Client Work" },
    { id: "about" as const, label: "About" },
  ],
  ctaLabel: "Discuss a Project",
  email: "info@lisenbart.com",
  linkedin: "https://www.linkedin.com/in/lisenbart/",
  vimeo: "https://vimeo.com/849899875",
  youtube: "https://www.youtube.com/@lisenbartProduction",
  imdb: "https://www.imdb.com/name/nm11412621/",
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
  locations: "Ukraine · Canada · Poland · Worldwide",
  canonical: "https://lisenbart.com",
  logo: {
    white: "/images/logo_white.png",
    black: "/images/logo_black.png",
  },
  meta: {
    title: "Dmytro Lisenbart — Animation Director & Producer | LISENBART",
    description:
      "Animation director and producer. Original films and IP under LISENBART Originals, plus commissioned work for brands, studios, and production partners.",
    ogImage: publicAsset("/images/work/lisenbart-showreel-preview.jpg"),
    /** Paste from Google Search Console → HTML tag verification (content= value only). */
    googleSiteVerification: "" as string,
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

const CONTACT_PREFILL_KEY = "lisenbart-contact-prefill";

export const CONTACT_PREFILL_EVENT = "lisenbart:contact-prefill";

export type ContactPrefill = {
  projectType?: string;
  message?: string;
};

/** Prefill contact fields, then scroll to the form. */
export function goToContactWithPrefill(prefill: ContactPrefill, onDone?: () => void) {
  try {
    sessionStorage.setItem(CONTACT_PREFILL_KEY, JSON.stringify(prefill));
  } catch {
    /* ignore quota / private mode */
  }
  window.dispatchEvent(new CustomEvent(CONTACT_PREFILL_EVENT, { detail: prefill }));
  goToContact(onDone);
}

export function consumeContactPrefill(): ContactPrefill | null {
  try {
    const raw = sessionStorage.getItem(CONTACT_PREFILL_KEY);
    if (!raw) return null;
    sessionStorage.removeItem(CONTACT_PREFILL_KEY);
    return JSON.parse(raw) as ContactPrefill;
  } catch {
    return null;
  }
}

export function clearContactPrefill() {
  try {
    sessionStorage.removeItem(CONTACT_PREFILL_KEY);
  } catch {
    /* ignore */
  }
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
