import { publicAsset } from "@/lib/publicAsset";
import { pageHasContactForm } from "@/lib/routes";

export const site = {
  name: "LISENBART FILM",
  brand: "LISENBART FILM",
  gamesUrl: "https://www.lisenbart.games",
  studioHome: {
    brandLine: "LISENBART FILM",
    /** Home hero primary headline — always two lines: CLEARED FOR / TAKEOFF */
    headline: "Cleared for\ntakeoff",
    /** Studio page only */
    lead: "An independent film and animation studio united by a belief in the power of storytelling to make a difference.",
    /** Home hero — under the fly headline */
    heroSupportHeading: "FILM & ANIMATION PRODUCTION COMPANY",
    heroSupport:
      "Since 2006 · 1,000+ projects for brands and studios like Nestlé, McDonald's, Samsung, Mastercard, Playtika and Moon Active · 11 festival awards",
    /** Shown with brand in the header lockup */
    established: "Est. 2006",
    proof: ["Since 2006", "1,000+ projects delivered"] as const,
    exploreLabel: "Explore Our Work",
    ctaLabel: "Start a Project",
    founderLine: "Founded by Dmytro Lisenbart",
    founderAria: "About Dmytro Lisenbart, founder of LISENBART FILM",
  },

  homePaths: {
    items: [
      {
        label: "For Brands & Agencies",
        statement: "From the first sketch to the final cut.",
        text: "Commercial films, animation and creative production. Bring us a brief, a script or just the beginnings of an idea.",
        cta: "Explore Client Work",
        hub: "client-work" as const,
        image: "/images/home/brands-path-preview.webp",
        imageAlt: "Brand film and commercial animation stills",
      },
      {
        label: "For AI-Driven Projects",
        statement: "New tools. Same creative standards.",
        text: "AI, animation, compositing — whatever serves the shot.",
        cta: "Explore AI & Hybrid",
        hub: "ai" as const,
        image: "/images/home/ai-path-preview.webp",
        imageAlt: "AI & Hybrid production still",
      },
      {
        label: "For Game Studios",
        statement: "Let's get your game noticed.",
        text: "Video ads, UA creatives and playables. From ready-to-produce assets to fresh creative concepts.",
        cta: "Explore Game Ads",
        hub: "games" as const,
        image: "/images/home/games-path-preview.webp",
        imageAlt: "Game advertising creatives collage",
      },
      {
        label: "For Film & IP Partners",
        statement: "We've got stories of our own, too.",
        text: "Original films and IP in development. Always open to the right creative partners and co-producers.",
        cta: "Explore Originals",
        hub: "originals" as const,
        image: "/images/home/originals-path-preview.webp",
        imageAlt: "Original films and IP collage",
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
    heading: "Original Stories. Independent Vision",
    lead: "Our original films reflect the storytelling and creative direction we bring to everything we make.",
    filmId: "unnecessary-things" as const,
    filmTitle: "Unnecessary Things",
    result: "11 awards · 45 festival selections",
    cta: "Explore Originals",
  },
  whyStudio: {
    eyebrow: "Why LISENBART",
    headline: "Creative thinking. Directorial experience. Production you can rely on",
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
      cta: "Explore Games ADS",
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
      "McDonald's",
      "Samsung",
      "Mastercard",
      "Coca-Cola",
      "P&G",
      "Danone",
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
    titleLines: ["What we do"] as const,
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
      "Since then: artist, director, producer, studio founder. For a stretch I was the last director of Ukranimafilm, Ukraine's oldest state animation studio — still slightly improbable to me.",
      "What all of it taught me is that creativity and production aren't enemies, even if they sometimes act like it. An idea needs room to breathe — and the right people, structure and runway to actually get made.",
      "I usually start with \"What if?\" It pretty quickly becomes: \"Alright — how do we pull this off?\"",
      "If you're working on something — an animated film, a world, a character, or an idea that is starting to take shape — send me a short brief or a few clear thoughts.",
    ] as const,
    closing: "That is enough to begin a conversation.",
    markers: [] as const,
  },
  filmPage: {
    name: "ORIGINALS",
    heroLead:
      "Stories of our own. Original films and animated IP — developed in-house, open to co-producers, distributors and platforms.",
    seoTitle: "Originals — Original Films & IP | LISENBART FILM",
    seoDescription:
      "Original animated films and preschool IP by LISENBART FILM — award-winning short Unnecessary Things, The Last Kozak in development, and Pershosvit / Scoopy Cap with 200M+ views. Open to co-producers, distributors and platforms.",
    defaultProjectType: "Originals Partnership",
    /** Hero still — Originals IP collage */
    heroImage: "/images/explore/originals/card-poster.jpg",
    projects: [
      {
        id: "unnecessary-things",
        title: "Unnecessary Things",
        image: "/images/work/unnecessary-things-preview.webp",
        imageAlt: "Unnecessary Things — robot eyes close-up",
        /** Still only on the hub — full film opens via CTA lightbox */
        vimeoId: null as string | null,
        accent: "11 awards · 45 festival selections",
        format: "Animated short · 14 min · 2021",
        logline:
          "In a quiet future, a robot buys a discarded human from a store of unwanted things. What begins as an act of curiosity becomes a story about friendship, memory and the need to be seen.",
        secondary: "Based on a story by Robert Sheckley · Officially licensed adaptation",
        fullFilmLabel: "Watch the full film",
        fullFilmVimeoId: "823618245",
        festivalLabel: "Festivals & awards →",
        festivalHref: "/originals/unnecessary-things/",
        ctaLabel: null as string | null,
        ctaKind: null as "contact" | null,
      },
      {
        id: "the-last-kozak",
        title: "The Last Kozak",
        image: "/images/work/the-last-kozak-preview.webp",
        imageAlt: "The Last Kozak — teaser preview frame",
        vimeoId: "699197721" as string | null,
        accent: "26 min · In development",
        format: "Animated short · English teaser available",
        logline:
          "A nameless Cossack is trapped in a time loop, forced to face evil again and again. An action-fantasy drawing on Ukrainian mythology, comic-book rhythm and psychological tension.",
        secondary: "Script, treatment, storyboard and art complete.",
        ctaLabel: "Request the pitch",
        ctaKind: "contact" as const,
      },
      {
        id: "pershosvit",
        anchorIds: ["pershosvit", "scoopy-cap"] as const,
        title: "Scoopy Cap",
        image: "/images/work/scoopy-cap-preview.jpg",
        imageAlt: "Scoopy Cap — preschool robot character",
        /** Drop in a Vimeo id later to replace the still with a channel teaser. */
        vimeoId: null as string | null,
        accent: "200M+ views · 160K+ subscribers",
        format: "Preschool IP · Ages 2–5 · English & Ukrainian (as Pershosvit) · Since 2016",
        logline:
          "Songs, stories and early learning for the youngest viewers, led by Scoopy Cap — a space captain who helps kids discover the world.",
        secondary: "On YouTube, YouTube Kids, Amazon, Roku and 9 more platforms.",
        appCard: {
          icon: "/images/work/scoopy-log-icon.png",
          title: "Scoopy Log",
          text: "Baby tracker app for parents — sleep, feeding and diapers.",
          storeHref: "https://apps.apple.com/app/apple-store/id6758025825",
          storeBadge: "/images/work/app-store-badge.svg",
          storeBadgeAlt: "Download on the App Store",
        },
        socialLinks: [
          { platform: "youtube" as const, label: "YouTube (Pershosvit)", href: "https://www.youtube.com/@pershosvit" },
          { platform: "youtube" as const, label: "YouTube (Scoopy Cap)", href: "https://www.youtube.com/@ScoopyCap" },
          { platform: "instagram" as const, label: "Instagram", href: "https://www.instagram.com/scoopycap/" },
          { platform: "tiktok" as const, label: "TikTok", href: "https://www.tiktok.com/@scoopycap" },
        ] as const,
        ctaLabel: "Discuss licensing",
        ctaKind: "contact" as const,
      },
    ] as const,
    partnerHeading: "How we partner",
    partners: [
      {
        title: "Co-production",
        text: "Develop and produce new films and series together.",
      },
      {
        title: "Distribution & sales",
        text: "Bring our films and library to new audiences.",
      },
      {
        title: "Licensing",
        text: "Characters, episodes and music for your platform or products.",
      },
    ] as const,
  },
  commercialPage: {
    name: "CLIENT WORK",
    heroLead: "Brand animation, crafted like film.",
    seoTitle: "Client Work — Brand Animation & Commercials | LISENBART FILM",
    seoDescription:
      "Brand animation, crafted like film. Commercials, brand films and character animation for brands and agencies — 2D, 3D, hand-drawn and stop motion, since 2006.",
    showreel: {
      id: "advertising-reel",
      label: "Advertising & Animation Showreel",
      body: [] as const,
      vimeoId: "849899875" as string | null,
      poster: "/images/reels/advertising/showreel-poster.webp",
    },
    selectedWorkHeading: "Selected work",
    selectedWork: [
      { id: "cw-1", title: "Project title", client: "Client" },
      { id: "cw-2", title: "Project title", client: "Client" },
      { id: "cw-3", title: "Project title", client: "Client" },
      { id: "cw-4", title: "Project title", client: "Client" },
      { id: "cw-5", title: "Project title", client: "Client" },
      { id: "cw-6", title: "Project title", client: "Client" },
    ] as const,
    whatWeMakeHeading: "What we make",
    formats: [
      "Commercials & TV spots",
      "Brand films",
      "Character animation",
      "Explainers & motion design",
      "Social & digital content",
    ] as const,
    techniques: ["2D", "3D", "Hand-drawn", "Stop motion", "Motion design", "Mixed media"] as const,
    waysHeading: "Ways to work with us",
    ways: [
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
    clientsHeading: "Selected clients",
    defaultProjectType: "Brand Film or Campaign",
  },

  gamesPage: {
    name: "GAME ADS",
    heroLead: "Animation that sells games.",
    seoTitle: "Game Ads — Trailers, UA Creatives & Playables | LISENBART FILM",
    seoDescription:
      "Game advertising creatives, playable production and creative development — LISENBART GAMES, part of LISENBART FILM.",
    showreel: {
      id: "games-reel",
      label: "LISENBART GAMES Showreel",
      vimeoId: "944158555" as string | null,
      poster: "/images/reels/games/showreel-poster.webp",
    },
    selectedWorkHeading: "Selected work",
    selectedWork: [
      { id: "ga-1", title: "Project title", client: "Client" },
      { id: "ga-2", title: "Project title", client: "Client" },
      { id: "ga-3", title: "Project title", client: "Client" },
      { id: "ga-4", title: "Project title", client: "Client" },
      { id: "ga-5", title: "Project title", client: "Client" },
      { id: "ga-6", title: "Project title", client: "Client" },
    ] as const,
    whatWeMakeHeading: "What we make",
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
    formats: [
      "Ad creatives",
      "Variants & localisation",
      "Playable ads",
      "Trailers & cinematics",
      "Store & ASO assets",
      "In-game motion & art",
    ] as const,
    howHeading: "How we work",
    howSteps: [
      {
        title: "Start with a test task",
        text: "Judge our work on your own project.",
      },
      {
        title: "Dedicated producer",
        text: "One contact, from brief to delivery.",
      },
      {
        title: "Your production portal",
        text: "Every project, status and deadline in one place.",
      },
      {
        title: "Scale with you",
        text: "From a single task to a steady flow.",
      },
    ] as const,
    trustedHeading: "Selected clients",
    clientsNote:
      "Trusted by teams at Playtika, Moon Active, Voodoo, Plarium, Youda, Slotomania and Beach Bum Games.",
    divisionHeading: "LISENBART GAMES",
    divisionText: "Our dedicated games team, part of LISENBART FILM.",
    externalCta: "Visit lisenbart.games",
    externalHref: "https://lisenbart.games",
    /** Hello email — keep main studio inbox for now; switch to info@lisenbart.games later. */
    contactEmail: "info@lisenbart.com",
    defaultProjectType: "Game Ads, Trailers & Playables",
  },

  aiPage: {
    name: "AI & HYBRID",
    heroLead: "New tools. Same creative standards.",
    seoTitle: "AI & Hybrid — AI Video Production by GLOWL | LISENBART FILM",
    seoDescription:
      "AI & hybrid video production by GLOWL, part of LISENBART FILM. AI, animation and live action — directed by filmmakers.",
    showreel: {
      id: "ai-powered-reel",
      label: "AI & Hybrid Showreel",
      body: [] as const,
      vimeoId: "1212613379" as string | null,
      poster: "/images/reels/ai/showreel-poster.webp",
    },
    selectedWorkHeading: "Selected work",
    selectedWork: [
      { id: "ai-1", title: "Project title", client: "Client" },
      { id: "ai-2", title: "Project title", client: "Client" },
      { id: "ai-3", title: "Project title", client: "Client" },
      { id: "ai-4", title: "Project title", client: "Client" },
      { id: "ai-5", title: "Project title", client: "Client" },
      { id: "ai-6", title: "Project title", client: "Client" },
    ] as const,
    howHeading: "How we use AI",
    howIntro: "The brief defines AI's role, not the other way round.",
    howSteps: [
      {
        number: "01",
        title: "Visual development",
        text: "Find the look before committing to production.",
      },
      {
        number: "02",
        title: "World building",
        text: "Environments and characters at the scale the idea needs.",
      },
      {
        number: "03",
        title: "Individual sequences",
        text: "AI shots inside a handcrafted film.",
      },
      {
        number: "04",
        title: "Complete films",
        text: "Fully AI-generated, directed from first frame to last.",
      },
    ] as const,
    whatWeMakeHeading: "What we make",
    formats: [
      "Commercials",
      "Brand films",
      "Game trailers & cinematics",
      "Product animation",
      "Title sequences",
      "Music videos",
    ] as const,
    principlesHeading: "Principles",
    principles: [
      {
        title: "Directed, not generated",
        text: "The creative decisions stay with filmmakers.",
      },
      {
        title: "Finished by hand",
        text: "Compositing, sound and grading by our team.",
      },
      {
        title: "Your AI policy, respected",
        text: "We work within your brand's rules on AI.",
      },
    ] as const,
    divisionHeading: "GLOWL",
    divisionText: "Our AI & hybrid production team, part of LISENBART FILM.",
    externalCta: "Visit glowl.direct",
    externalHref: "https://glowl.direct",
    /** Hello email — keep main studio inbox for now; switch to info@glowl.direct later. */
    contactEmail: "info@lisenbart.com",
    defaultProjectType: "AI & Hybrid",
  },
  homeContact: {
    heading: "Let's fly together",
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
    seoTitle: "Studio — Independent Animation Studio Since 2006 | LISENBART FILM",
    seoDescription:
      "Independent animation studio since 2006. Brand films, AI & hybrid production, game ads and original IP — one creative lead, specialized teams.",
    showreel: {
      label: "Studio Showreel",
      vimeoId: "849899875",
      playLabel: "Watch reel",
    },
    heroLead: "Independent animation studio. Production company discipline.",
    introHeading: "Who we are",
    introParagraphs: [
      "Founded in 2006, LISENBART FILM creates animation and film for brands, agencies, game studios and production partners. Alongside client work, we develop award-winning original films and IP.",
    ] as const,
    stats: [
      { value: "2006", label: "founded" },
      { value: "1,000+", label: "projects delivered" },
      { value: "3", label: "specialized teams" },
    ] as const,
    statsNote:
      "Trusted by Nestlé, McDonald's, Samsung, Mastercard, Playtika, Moon Active, Voodoo, Plarium and leading agencies including BBDO, McCann and Leo Burnett.",
    teamsHeading: "One vision, three teams",
    teams: [
      {
        title: "Brand & Original Animation",
        team: "LISENBART FILM",
        text: "Commercials, brand films and our own animated IP.",
        hub: "client-work" as const,
        image: "/images/reels/advertising/showreel-poster.webp",
        imageAlt: "Client Work showreel",
      },
      {
        title: "AI & Hybrid Production",
        team: "GLOWL",
        text: "AI-powered films and content, directed by filmmakers.",
        hub: "ai" as const,
        image: "/images/reels/ai/showreel-poster.webp",
        imageAlt: "AI & Hybrid showreel",
      },
      {
        title: "Game Ads & Playables",
        team: "LISENBART GAMES",
        text: "Trailers, UA creatives and playable ads for games.",
        hub: "games" as const,
        image: "/images/reels/games/showreel-poster.webp",
        imageAlt: "Game Ads showreel",
      },
    ] as const,
    teamsNote: "One creative lead. Specialized teams around every project.",
    howHeading: "How we work",
    howParagraphs: [
      "A small senior core leads every project and brings in the right artists and specialists for it — studio-level craft without studio-level overhead.",
    ] as const,
    howNote: "One producer, one point of contact, from the first call to the final file.",
    howSteps: [
      {
        number: "01",
        title: "Brief",
        text: "Your goals, assets and constraints.",
      },
      {
        number: "02",
        title: "Development",
        text: "Concept, script, storyboard and look.",
      },
      {
        number: "03",
        title: "Production",
        text: "Animation, AI, compositing and sound.",
      },
      {
        number: "04",
        title: "Delivery",
        text: "Final files in every format you need.",
      },
    ] as const,
    pullQuote:
      "\u201CI usually start with \u2018What if?\u2019 It pretty quickly becomes: \u2018Alright — how do we pull this off?\u2019\u201D",
    peopleHeading: "Founder",
    founderName: "Dmytro Lisenbart",
    founderRole: "Founder, Director & Producer",
    founderProof: [
      "The last director of Ukranimafilm, Ukraine's oldest state animation studio",
      "Co-founder of UANIMA, the Ukrainian Animation Association",
    ] as const,
    founderCta: "About Dmytro",
    founderPortrait: "/images/portrait.webp",
    founderPortraitAlt: "Portrait of Dmytro Lisenbart",
  },

  contactForm: {
    submitLabel: "Send a brief",
    sendingLabel: "Sending…",
    successHeading: "Welcome aboard",
    successMessage: "Thanks for reaching out. We'll be in touch soon.",
    successAction: "Send Another Message",
    errorFallback: "Something went wrong. Please email us at info@lisenbart.com.",
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
    title: "LISENBART FILM — Animation Studio for Brands, Games & Film",
    description:
      "Animation studio for brands, agencies and game studios since 2006 — commercials, AI & hybrid production, game ads and original films.",

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

/** Canonical contact destination when the current page has no form (legal pages). */
export function contactPageHref() {
  return `/#${sectionIds.contact}`;
}

/** Nav/footer href: same-page #contact when the form is on this route, else home #contact. */
export function contactNavHref(pathname?: string) {
  return pageHasContactForm(pathname) ? contactHref() : contactPageHref();
}

/**
 * Scroll to Contact on the current page when present.
 * Otherwise open home contact (legal / privacy / cookie pages have no form).
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
    if (id === sectionIds.contact) {
      const nextHash = `#${sectionIds.contact}`;
      if (window.location.hash !== nextHash) {
        history.replaceState(null, "", nextHash);
      }
    }

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
