import { publicAsset } from "@/lib/publicAsset";

export const site = {
  name: "LISENBART FILM",
  brand: "LISENBART FILM",
  gamesUrl: "https://lisenbart.games",
  studioHome: {
    brandLine: "LISENBART FILM",
    headline: "Endless stories. Different worlds. One language.",
    lead: "Independent animation studio creating commercials, original films and story-driven content. From creative development and direction to complete production.",
    proof: ["Since 2006", "1,000+ projects delivered"] as const,
    ctaLabel: "Discuss a Project",
    exploreLabel: "Explore Our Work",
    founderLine: "Founded by Dmytro Lisenbart",
    founderAria: "About Dmytro Lisenbart, founder of LISENBART FILM",
  },
  selectedWork: {
    label: "Selected Commercial Work",
    href: "/client-work/",
    cta: "View Client Work",
    vimeoId: "849899875",
    previewImages: [
      "/images/reels/advertising/01.webp",
      "/images/reels/advertising/02.webp",
      "/images/reels/advertising/03.webp",
      "/images/reels/advertising/04.webp",
      "/images/reels/advertising/05.webp",
      "/images/reels/advertising/06.webp",
      "/images/reels/advertising/07.webp",
      "/images/reels/advertising/08.webp",
    ] as const,
  },
  whyStudio: {
    eyebrow: "Why LISENBART",
    headline: "Creative thinking. Directorial experience. Production you can rely on.",
    text: "An independent animation studio founded in 2006 — combining creative development, direction and production under one roof.",
    founder: "Founded by Dmytro Lisenbart, animation director and producer.",
    aboutCta: "About the founder",
  },
  /** Home proof strip — clients + routes; no reel, no hero repeats. */
  compactProof: {
    heading: "Selected clients",
    text: "Commercial work for brands and agencies. Dmytro Lisenbart — founder and animation director.",
    workCta: "View Client Work",
    aboutCta: "About the founder",
  },

  specializedDivisions: {
    heading: "Specialized Divisions",
    games: {
      title: "GAMES",
      subtitle: "Game Advertising & Playable Production",
      text: "Advertising creatives, playable ads and production for game companies.",
      href: "https://lisenbart.games",
      cta: "Visit Lisenbart Games",
      external: true as const,
    },
    ai: {
      title: "AI",
      subtitle: "AI & Hybrid Production",
      text: "AI-assisted visual development and video production, directed and finished by our team.",
      href: "/client-work/#ai-powered-reel",
      cta: "See AI work",
      external: false as const,
    },
  },
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
    personalNote:
      "Creativity and production aren't enemies, even if they act like it. An idea needs room to breathe — and the right people, structure and runway to actually get made.",
    imdbHref: "https://www.imdb.com/name/nm11412621/",
    imdbAria: "View Dmytro Lisenbart on IMDb",
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
    titleLines: ["What we do."] as const,
    commercial: {
      title: "CLIENT WORK",
      text: "Creative development, direction and animation production for brands, agencies and production partners.",
      ctaAria: "View Client Work",
      previewImages: [
        "/images/reels/advertising/01.webp",
        "/images/reels/ai/01.webp",
        "/images/reels/advertising/03.webp",
        "/images/reels/ai/05.webp",
        "/images/reels/advertising/05.webp",
        "/images/reels/ai/08.webp",
        "/images/reels/advertising/07.webp",
        "/images/reels/ai/12.webp",
      ],
    },
    film: {
      title: "ORIGINALS",
      text: "Original animated films, stories and worlds developed from the first idea onward.",
      ctaAria: "View LISENBART Originals",
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
  },
  personalAbout: {
    title: "About",
    paragraphs: [
      "I grew up drawing and making things up. At no point did I decide this was the career — I just kept doing it, and never got around to stopping.",
      "Since then: artist, director, producer, studio founder. For a stretch I ran Ukranimafilm, Ukraine's national animation studio — still slightly improbable to me.",
      "What all of it taught me is that creativity and production aren't enemies, even if they sometimes act like it. An idea needs room to breathe — and the right people, structure and runway to actually get made.",
      "I usually start with \"What if?\" It pretty quickly becomes: \"Alright — how do we pull this off?\"",
      "If you're working on something — an animated film, a world, a character, or an idea that is starting to take shape — send me a short brief or a few clear thoughts.",
    ] as const,
    closing: "That is enough to begin a conversation.",
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
    title:
      "From first concept to final frame. Creative development, direction and animation production for brands, agencies and production partners.",
    seoTitle: "Client Animation — Brands & Agencies | LISENBART FILM",
    seoDescription:
      "Creative development, direction and animation production for brands and agencies. LISENBART FILM.",
    capabilities: [
      {
        title: "Creative Development",
        text: "Concepts, scripts and visual approaches shaped around the brief.",
      },
      {
        title: "Direction",
        text: "Creative leadership from look development through delivery.",
      },
      {
        title: "Animation Production",
        text: "Complete production — or selected stages — with clear process and one lead.",
      },
    ] as const,
    reels: [
      {
        id: "advertising-reel",
        label: "Advertising",
        body: [
          "Animated campaigns, brand films and product visuals for brands and agencies.",
          "Format follows the brief: character animation, motion graphics, mixed media. Projects for Nestlé, Samsung, McDonald's, Mastercard and others across broadcast, digital and social.",
        ] as const,
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
      {
        id: "ai-powered-reel",
        label: "AI & Hybrid Production",
        body: [
          "AI-assisted visual development and sequences where the brief calls for it — always directed and finished by our team.",
          "Method depends on the project. Not a shortcut, and not the same pipeline for every job.",
        ] as const,
        vimeoId: "1212613379" as string | null,
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
    ],
    gamesBridge: {
      title: "Looking for game animation?",
      text: "Trailers, ads and playables live on Lisenbart Games.",
      cta: "Visit lisenbart.games",
      href: "https://lisenbart.games",
    },
    contactHeading: "Have a Brief?",
    contactLead: "Share the project, timeline and current stage. We’ll come back with the right next step.",
  },
  homeContact: {
    heading: "Tell us about the project.",
    lead: "",
  },
  aboutPage: {
    seoTitle: "Dmytro Lisenbart — Director & Producer | LISENBART FILM",
    seoDescription:
      "Dmytro Lisenbart — animation director and producer, founder of LISENBART FILM. Original films, story IP, and commissioned work.",
  },
  contactForm: {
    submitLabel: "Send Message",
    sendingLabel: "Sending…",
    successMessage: "Thank you — we’ll review your message and get back to you soon.",
    successAction: "Send Another Message",
    errorFallback: "Your message couldn’t be sent. Please try again or email us directly.",
    emailRequired: "Email is required.",
    emailInvalid: "Enter a valid email address.",
    messageRequired: "Tell us a little about the project.",
    emailPlaceholder: "you@company.com",
    projectTypePlaceholder: "Select a Project Type",
    messagePlaceholder: "Project, goals, timeline, and references",
    aiHelper: "Where do you see AI fitting into the project?",
  },
  primaryNav: [
    { id: "client-work" as const, label: "Client Work" },
    { id: "originals" as const, label: "Originals" },
    { id: "about" as const, label: "About" },
  ],
  ctaLabel: "Discuss a Project",
  email: "info@lisenbart.com",
  linkedin: "https://www.linkedin.com/in/lisenbart/",
  vimeo: "https://vimeo.com/849899875",
  youtube: "https://www.youtube.com/@lisenbartProduction",
  imdb: "https://www.imdb.com/name/nm11412621/",
  locations: "Ukraine · Canada · Poland",
  canonical: "https://lisenbart.com",
  logo: {
    /** Combined LISENBART wordmark + bear (black on transparent). */
    black: "/images/black_logo.png",
    /** No separate white lockup yet — dark theme inverts via CSS. */
    white: "/images/black_logo.png",
  },
  meta: {
    title: "LISENBART FILM — Independent Animation Studio",
    description:
      "Independent animation studio. Original films and story IP, plus commissioned work for brands and agencies. Game animation at Lisenbart Games.",
    /** Fresh path after domain-hack OG cache; keep separate from work thumbs. */
    ogImage: publicAsset("/images/work/lisenbart-og-2026.jpg"),
    /** Paste from Google Search Console → HTML tag verification (content= value only). */
    googleSiteVerification: "" as string,
  },
};

export const sectionIds = {
  about: "about",
  explore: "explore",
  selectedWork: "selected-work",
  why: "why",
  proof: "proof",
  divisions: "divisions",
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
