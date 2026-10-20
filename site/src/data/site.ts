import { publicAsset } from "@/lib/publicAsset";

export const site = {
  name: "LISENBART FILM",
  brand: "LISENBART FILM",
  gamesUrl: "https://www.lisenbart.games",
  studioHome: {
    brandLine: "LISENBART FILM",
    headline: "Creative freedom\nProduction control",
    lead: "Independent animation studio for brands, production partners and original films. Creative development, direction and production — together or as individual stages.",
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
      text: "Advertising creatives and playables for game companies.",
      href: "/games/",
      cta: "Explore Games",
      external: false as const,
    },
    ai: {
      title: "AI",
      subtitle: "AI & Hybrid",
      text: "AI-assisted visuals and video, guided by creative direction and production oversight.",
      href: "/ai/",
      cta: "View AI Work",
      external: false as const,
    },
  },

  hero: {
    personalName: "Dmytro Lisenbart",
    personalRole: "Animation Director & Producer",
    personalPositioning:
      "I develop original animation projects and direct commissioned work for brands, studios, and production partners.",
    personalProof: [
      "20 years directing",
      "15 years producing",
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
      text: "Original animated films and story IP — created, developed and produced by the studio.",
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
    name: "ORIGINALS",
    title: "",
    seoTitle: "Original Films & IP — LISENBART FILM",
    seoDescription:
      "Original animated films and character-led IP from LISENBART FILM: Unnecessary Things, The Last Kozak, Pershosvit and Scoopy Cap.",
    filmIds: ["unnecessary-things", "the-last-kozak"] as const,
    ipIds: ["pershosvit", "scoopy-cap"] as const,
    unnecessaryResult: "11 awards · 45 festival selections",
  },
  commercialPage: {
    name: "CLIENT WORK",
    title: "Bring us the idea, the brief, or the work already in progress. We'll take it from there.",
    seoTitle: "Client Work — Animation Production & Direction | LISENBART FILM",
    seoDescription:
      "Commission animation for brands and agencies: creative development, direction and production — from individual stages to complete campaigns.",
    showreelHeading: "Advertising & Animation Showreel",
    showreel: {
      id: "advertising-reel",
      label: "Advertising & Animation Showreel",
      body: [] as const,
      vimeoId: "849899875" as string | null,
      poster: "/images/reels/advertising/showreel-poster.webp",
    },
    capabilitiesHeading: "What we bring to the table",
    capabilities: [
      {
        title: "Creative Development",
        text: "Ideas, scripts, storyboards and visual worlds.",
      },
      {
        title: "Direction",
        text: "A clear creative vision, from first decisions to final frame.",
      },
      {
        title: "Production",
        text: "The right team and a production plan built around your project.",
      },
    ] as const,
  },

  gamesPage: {
    name: "Game Ads",
    title: "From the assets you already have to the ideas you haven't made yet.",
    seoTitle: "Game Ads — Ads, Cinematics & Playables | LISENBART FILM",
    seoDescription:
      "Game advertising creatives, playable production and creative development — LISENBART GAMES, a direction of LISENBART FILM.",
    showreelHeading: "LISENBART GAMES",
    showreel: {
      id: "games-reel",
      label: "LISENBART GAMES Showreel",
      vimeoId: "944158555" as string | null,
      poster: "/images/reels/games/showreel-poster.webp",
    },
    capabilitiesHeading: "What we do",
    capabilities: [
      {
        title: "Creative Production",
        text: "Turn your briefs and assets into campaign-ready creatives.",
      },
      {
        title: "Playable Production",
        text: "Interactive ads, built and adapted for your campaigns.",
      },
      {
        title: "Creative Development",
        text: "New concepts, scripts and creative direction.",
      },
    ] as const,
    externalCta: "Explore LISENBART GAMES",
    externalHref: "https://www.lisenbart.games",
  },

  aiPage: {
    name: "AI & Hybrid",
    title: "New tools open up new possibilities. We know how to turn them into finished work.",
    seoTitle: "AI & Hybrid | LISENBART FILM",
    seoDescription:
      "AI-assisted visuals and hybrid filmmaking as a capability of LISENBART FILM — from exploration to finishing.",
    showreelHeading: "AI & Hybrid Showreel",
    showreel: {
      id: "ai-powered-reel",
      label: "AI & Hybrid Showreel",
      body: [] as const,
      vimeoId: "1212613379" as string | null,
      poster: "/images/reels/ai/01.webp",
    },
    capabilitiesHeading: "How we use it",
    capabilities: [
      {
        title: "Explore",
        text: "Find the look before committing to production.",
      },
      {
        title: "Create",
        text: "Bring ideas to the screen in new ways.",
      },
      {
        title: "Finish",
        text: "Bring everything together into one coherent result.",
      },
    ] as const,
  },
  homeContact: {
    heading: "Have something in mind?",
    lead: "",
  },
  aboutPage: {
    seoTitle: "Dmytro Lisenbart — Director & Producer | LISENBART FILM",
    seoDescription:
      "Dmytro Lisenbart — animation director and producer, founder of LISENBART FILM. Original films, story IP, and commissioned work.",
  },
  /** Company page — identity, operating model, engagement. */
  studioPage: {
    name: "STUDIO",
    title: "",
    seoTitle: "Studio — How We Work | LISENBART FILM",
    seoDescription:
      "LISENBART FILM is an independent director-led creative production company founded in 2006. Commissioned animation and original films.",
    introHeading: "Who we are",
    intro:
      "We make animation for clients and films of our own. Some projects begin with a finished brief. Others start with a question worth exploring.",
    howHeading: "How we work",
    how:
      "Every project needs its own mix of people and skills. We bring them together, guide the creative work and keep production moving.",
    engagementHeading: "Ways to work with us",
    engagementModels: [
      {
        title: "Production Partner",
        text: "You have the brief and assets. We handle the production work you need.",
      },
      {
        title: "Creative & Direction",
        text: "Need the idea, the story or the right visual approach? That's where we can start.",
      },
      {
        title: "Full Production",
        text: "From the first conversation to the finished film, with creative leadership guiding the process.",
      },
    ] as const,
    peopleHeading: "People & leadership",
    founderName: "Dmytro Lisenbart",
    founderRole: "Animation Director, Producer & Founder",
    founderProof: "20 years directing · 15 years producing",
    founderCta: "About Dmytro Lisenbart",
    founderPortrait: "/images/portrait.webp",
    founderPortraitAlt: "Portrait of Dmytro Lisenbart",
  },

  contactForm: {
    submitLabel: "Send a brief",
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
    { id: "games" as const, label: "Game Ads" },
    { id: "ai" as const, label: "AI & Hybrid" },
    { id: "studio" as const, label: "Studio" },
    { id: "contact" as const, label: "Contact" },
  ],

  ctaLabel: "Discuss a Project",
  email: "info@lisenbart.com",
  linkedin: "https://www.linkedin.com/in/lisenbart/",
  vimeo: "https://vimeo.com/849899875",
  youtube: "https://www.youtube.com/@lisenbartProduction",
  imdb: "https://www.imdb.com/name/nm11412621/",
  locations: "Canada · Poland · Ukraine",
  canonical: "https://lisenbart.com",
  logo: {
    /** Combined LISENBART wordmark + bear (black on transparent). */
    black: "/images/black_logo.png",
    /** No separate white lockup yet — dark theme inverts via CSS. */
    white: "/images/black_logo.png",
  },
  meta: {
    title: "LISENBART FILM — Creative Freedom · Production Control",
    description:
      "Independent animation studio for brands, agencies and production partners. Creative development, direction and animation production since 2006.",

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
