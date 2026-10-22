import { publicAsset } from "@/lib/publicAsset";

export const site = {
  name: "LISENBART FILM",
  brand: "LISENBART FILM",
  gamesUrl: "https://www.lisenbart.games",
  studioHome: {
    brandLine: "LISENBART FILM",
    /** Home hero primary headline — two lines */
    headline: "Let's fly\ntogether.",
    /** Studio page only */
    lead: "An independent film and animation studio united by a belief in the power of storytelling to make a difference.",
    /** Home hero — under the fly headline */
    heroSupportHeading: "FILM & ANIMATION PRODUCTION COMPANY",
    heroSupport:
      "Some projects start with a blank page. Others arrive with a brief and a deadline. We're comfortable with both — from creative development and direction to production and final delivery.",
    /** Home header tagline beside brand */
    animalines: "Animalines",
    /** Shown under the header logo */
    established: "Est. 2006",
    proof: ["Since 2006", "1,000+ projects delivered"] as const,
    exploreLabel: "Explore Our Work",
    ctaLabel: "Start a Project",
    founderLine: "Founded by Dmytro Lisenbart",
    founderAria: "About Dmytro Lisenbart, founder of LISENBART FILM",
  },

  homePaths: {
    heading: "Welcome aboard.",
    items: [
      {
        seat: "1A",
        direction: "Client Work",
        label: "For Brands & Agencies",
        statement: "From the first sketch to the final cut.",
        text: "Commercial films, animation and creative production. Bring us a brief, a script or just the beginnings of an idea.",
        cta: "Explore Client Work",
        hub: "client-work" as const,
      },
      {
        seat: "1B",
        direction: "AI & Hybrid",
        label: null,
        statement: "New tools. Same creative standards.",
        text: "AI, animation, compositing — whatever serves the shot. The creative decisions stay with filmmakers.",
        cta: "Explore AI",
        hub: "ai" as const,
      },
      {
        seat: "2A",
        direction: "Game Ads",
        label: "For Game Studios",
        statement: "Let's get your game noticed.",
        text: "Video ads, UA creatives and playables. From ready-to-produce assets to fresh creative concepts.",
        cta: "Explore Games",
        hub: "games" as const,
      },
      {
        seat: "2B",
        direction: "Originals",
        label: "For Film & IP Partners",
        statement: "We've got stories of our own, too.",
        text: "Original films and IP in development. Always open to the right creative partners and co-producers.",
        cta: "Explore Originals",
        hub: "originals" as const,
      },
    ] as const,
  },

  selectedWork: {
    label: "Selected Work",
    href: "/client-work/",
    cta: "Explore Client Work",
    lead: "Commercial animation, branded content and creative production for agencies and brands.",
    vimeoId: "849899875",
    poster: "/images/reels/advertising/showreel-poster.webp",
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

  howWeHelp: {
    heading: "How We Can Help",
    items: [
      {
        title: "Production Partner",
        text: "You bring the brief, concept or creative assets. We handle the production work needed to bring them to screen.",
      },
      {
        title: "Creative Development & Direction",
        text: "From the first idea to scripts, storyboards and visual direction — we shape stories built to communicate.",
      },
      {
        title: "Full Production",
        text: "One creative and production partner, from concept development through animation, finishing and final delivery.",
      },
    ] as const,
  },

  homeExperience: {
    heading: "Experience That Delivers",
    lead: "Trusted by brands and agencies across a wide range of commercial productions.",
    model:
      "A focused creative and production core, with the right specialists brought together for each project.",
    facts: [
      { value: "2006", label: "Established" },
      { value: "1,000+", label: "Projects delivered" },
    ] as const,
    /** Curated subset of Client Work names — not a full logo wall */
    brands: [
      "Nestlé",
      "Danone",
      "McDonald's",
      "Mastercard",
      "Samsung",
      "PepsiCo",
      "METRO",
      "Borjomi",
    ] as const,
    agencies: ["Havas", "Y&R", "BBDO", "McCann Erickson", "Leo Burnett"] as const,
  },

  homeOriginals: {
    heading: "Original Stories. Independent Vision.",
    lead: "Our original films reflect the storytelling and creative direction we bring to everything we make.",
    filmId: "unnecessary-things" as const,
    filmTitle: "Unnecessary Things",
    result: "11 awards · 45 festival selections",
    cta: "Explore Originals",
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
      text: "Creative production, game advertising and playable ads.",
      href: "/games/",
      cta: "Explore Games",
      external: false as const,
    },
    ai: {
      title: "AI",
      subtitle: "AI & Hybrid",
      text: "AI-assisted and hybrid production guided by creative direction and filmmaking expertise.",
      href: "/ai/",
      cta: "Explore AI",
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
    /**
     * International names evidenced on @lisenbartfilm credits.
     * No UA/RU brands, no game studios. Agencies = network names from public credits.
     */
    brands: [
      "Nestlé",
      "Danone",
      "McDonald's",
      "Mastercard",
      "Samsung",
      "PepsiCo",
      "METRO",
      "Lactalis",
      "Borjomi",
      "Bionorica",
      "Lacalut",
      "Staropramen",
      "TUC",
      "Kraft",
      "Enterogermina",
      "Watsons",
      "Raiffeisen",
    ] as const,
    brandsProof:
      "Production & animation — motion graphics, frame and 3D animation, live-action hybrid.",
    agencies: [
      "Havas",
      "Y&R",
      "DraftFCB",
      "BBDO",
      "Cheil Worldwide",
      "McCann Erickson",
      "Leo Burnett",
    ] as const,
    agenciesProof:
      "Campaign production partner — credited alongside network creative agencies.",
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
      poster: "/images/reels/ai/showreel-poster.webp",
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
    heading: "Have a project? Let's talk.",
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
    showreel: {
      label: "Studio Showreel",
      vimeoId: "849899875",
      playLabel: "Watch reel",
    },
    introHeading: "Who we are",
    introParagraphs: [
      "Founded in 2006, LISENBART FILM is an independent animation studio with over 1,000 commercial projects behind us.",
      "We work with brands, agencies and production partners, combining creative direction and production expertise.",
      "Alongside commissioned work, we develop and produce our own animated films and original IP.",
    ] as const,
    howHeading: "How we work",
    howParagraphs: [
      "A focused creative and production core leads each project, bringing together the right artists and specialists for its specific needs.",
      "We manage the creative process and production, taking responsibility from the first decisions to final delivery.",
    ] as const,
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
    { id: "ai" as const, label: "AI & Hybrid" },
    { id: "games" as const, label: "Game Ads" },
    { id: "originals" as const, label: "Originals" },
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
  howWeHelp: "how-we-help",
  experience: "experience",
  originalStories: "original-stories",
  why: "why",
  proof: "proof",
  divisions: "divisions",
  trusted: "trusted",
  contact: "contact",
} as const;

export function contactHref() {
  return `#${sectionIds.contact}`;
}

/** Canonical contact destination when the current page has no form (home / legal). */
export function contactPageHref() {
  return `/studio/#${sectionIds.contact}`;
}

/**
 * Scroll to Contact on the current page when present.
 * Otherwise open Studio contact (homepage no longer hosts the form).
 */
export function goToContact(onDone?: () => void) {
  if (document.getElementById(sectionIds.contact)) {
    scrollToSection(sectionIds.contact, onDone);
    return;
  }
  window.location.assign(contactPageHref());
  onDone?.();
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
