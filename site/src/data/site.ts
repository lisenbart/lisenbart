import { publicAsset } from "@/lib/publicAsset";

export const site = {
  name: "LISENBART FILM",
  brand: "LISENBART FILM",
  gamesUrl: "https://lisenbart.games",
  studioHome: {
    brandLine: "LISENBART FILM",
    headline: "Independent animation studio",
    lead: "Original films, story IP, and commissioned animation — from the first idea through final delivery.",
    proof: ["Since 2006", "Kyiv · Canada · Poland", "1,000+ projects delivered"] as const,
    ctaLabel: "Discuss a Project",
    founderLine: "Founded by Dmytro Lisenbart",
    founderAria: "About Dmytro Lisenbart",
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
      text: "Direction and production for brands, agencies, and production partners.",
      ctaAria: "View selected client work",
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
    games: {
      title: "LISENBART GAMES",
      text: "Trailers, ad creatives, and playables for mobile and PC games.",
      ctaAria: "Open Lisenbart Games — game animation studio",
      href: "https://lisenbart.games",
      mark: "GAMES",
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
    title: "Direction and production shaped around each brief — from creative development through final delivery.",
    seoTitle: "Client Animation — Brands & Agencies | LISENBART FILM",
    seoDescription:
      "Animation direction and production for brands and agencies — from creative development through final delivery. LISENBART FILM.",
    reels: [
      {
        id: "ai-powered-reel",
        label: "AI Production",
        body: [
          "AI doesn't replace the brief — it changes what's possible inside it.",
          "We use AI across visual development, world-building, pre-production and individual sequences, depending on what the project needs. It's a production tool, not a pipeline shortcut: every frame is directed, reviewed and finished by the same team that handles the work without it.",
          "Practically, this means faster concept iteration, more developed visual options before production locks, and the ability to take on formats and timelines that wouldn't be viable otherwise. Currently accepting select projects for AI-assisted animation, short-form content and visual development for longer productions.",
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
      {
        id: "advertising-reel",
        label: "Advertising",
        body: [
          "Animation for brands that need the work to land — not just look good in a deck.",
          "We direct and produce animated campaigns, brand films and product visuals for global brands and the agencies that work with them. The format follows the brief: 2D character animation, motion graphics, mixed media, or something that doesn't fit a category yet. Projects have shipped for Nestlé, Samsung, McDonald's, MasterCard and others across broadcast, digital and social platforms.",
          "Typical engagements run from a single campaign film to multi-format content systems built for repeat production. The process is direct — one creative lead, no handoff between strategy and execution.",
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
    ],
    gamesBridge: {
      title: "Looking for game animation?",
      text: "Trailers, ads, and playables live on Lisenbart Games.",
      cta: "Visit lisenbart.games",
      href: "https://lisenbart.games",
    },
    contactHeading: "Have a Brief?",
    contactLead: "Share the project, timeline, and current stage. I’ll come back with the right next step.",
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
