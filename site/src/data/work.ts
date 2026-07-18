export type WorkCategorySlug = "commercial" | "gaming" | "film" | "social";

export interface WorkPlayableExample {
  id: string;
  label: string;
  url: string;
}

export interface WorkPlayableTier {
  id: string;
  label: string;
  examples: WorkPlayableExample[];
}

export interface WorkCaseStudy {
  id: string;
  /** [PLACEHOLDER — replace with real content before deploy] */
  client: string;
  category: string;
  /** Category label when shown on /film (keeps legacy /work/* category intact) */
  filmCategory?: string;
  year: string;
  title: string;
  description: string;
  result: string;
  /** [PLACEHOLDER — replace with real media before deploy] */
  mediaColor: string;
  vimeoId?: string;
  mediaImage?: string;
  mediaImageAlt?: string;
  /** Frame stills shown under the trailer */
  stills?: string[];
  imdbId?: string;
  youtubeVideoId?: string;
  youtubeUrl?: string;
  youtubeBannerImage?: string;
  youtubeThumbnails?: string[];
  playableTiers?: WorkPlayableTier[];
  /** Optional festival laurel badges shown beside the project title */
  laurels?: string[];
  /** Festival selections with source links */
  selectionLinks?: Array<{ label: string; href: string }>;
  /** Winner line with source link */
  winnerLink?: { label: string; href: string };
  /** Smaller credit line under the description */
  credits?: string;
  /** Optional short press quote */
  quote?: {
    text: string;
    attribution: string;
    href: string;
  };
  /** Optional status chip (e.g. Feature film in development) */
  statusBadge?: string;
  mediaPlaceholder?: {
    headline: string;
    ctaLabel?: string;
  };
  /** 0–100 — shows COMING SOON media with a progress bar when set */
  comingSoonProgress?: number;
}

export interface WorkCategory {
  slug: WorkCategorySlug;
  pageTitle: string;
  subtitle: string;
  /** [PLACEHOLDER — replace with real content before deploy] */
  cases: WorkCaseStudy[];
}

/** [PLACEHOLDER — replace with real content before deploy] */
export const workCategories: WorkCategory[] = [
  {
    slug: "commercial",
    pageTitle: "Commercial Selected Work",
    subtitle: "Brand films, commercials and product visuals — from concept through delivery.",
    cases: [
      {
        id: "lisenbart-showreel",
        client: "Lisenbart Production",
        category: "Commercial · Showreel",
        year: "2026",
        title: "Creative & Animation Showreel",
        description:
          "2026 · 2D · 3D · stop-motion · puppet · collage\nWe create animation — we have been doing this for a long time and we really enjoy it. Everything is possible in the world of animation: any fantasy is real and any task is achievable. Our creative team gives 100%, producers 200%. We believe in our clients' ideas, and clients trust us. Lisenbart Production creates 2D and 3D animation, collage and puppet animation, stop-motion and interlacing animation. We develop characters, create ideas and write scripts.",
        result:
          "The showreel from our homepage — a cross-section of commercial animation, from TVCs and brand films to music videos and mixed-media work.",
        mediaColor: "#0a1628",
        vimeoId: "849899875",
        mediaImage: "/images/work/lisenbart-showreel-preview.jpg",
        mediaImageAlt: "LISENBART creative and animation showreel — preview frame",
      },
      {
        id: "nlo-valentine-id",
        client: "NLO.TV",
        category: "Commercial · TV Branding",
        year: "2014",
        title: "Valentine's Day · NLO.TV TV ID",
        description:
          "15 sec · 3D CGI · seasonal on-air ident\nA four-armed monster falls for his own reflection — then a mountain of Valentine's gifts collapses on him. Part of NLO.TV's long-running ident series that built a playful monster universe for one of Ukraine's landmark entertainment channels. Idea by Pluzharov Artem, directed by Yuriy Kovalyov, animation direction by Dmytro Lisenbart.",
        result:
          "Flagship seasonal ID from the NLO.TV branding family — a series that defined the channel's on-air character and earned international festival attention, including selections on the London advertising circuit in the early 2010s.",
        mediaColor: "#1a0a18",
        mediaImage: "https://img.youtube.com/vi/VD0D6BXSKkA/hqdefault.jpg",
        mediaImageAlt: "NLO.TV Valentine's Day TV ID — 3D animation preview",
        youtubeVideoId: "VD0D6BXSKkA",
        youtubeUrl: "https://www.youtube.com/watch?v=VD0D6BXSKkA",
      },
      {
        id: "hubbub-sound-go-social",
        client: "Hubbub.fm",
        category: "Commercial · Motion Graphics",
        year: "2011",
        title: "Sound Go Social · Hubbub.fm",
        description:
          "Motion graphics · 2 min · product launch film\nWhat if social feeds were audio? Hubbub.fm turned text into 15-second sound clips — personalized streams you listen to like radio, voice fingerprints instead of passwords, and three taps to broadcast instead of three hundred keystrokes. We visualized a complex tech story through crisp motion design: networks, microphones, aquariums, loading bars — every metaphor moving with clarity and wit.",
        result:
          "Launch TVC for Hubbub.fm — billed as the first real sound social network on the web. Animation direction by Dmytro Lisenbart, production by Lisenbart Production, sound by Propeller Studios. Built to explain the impossible in under two minutes.",
        mediaColor: "#0a1420",
        mediaImage: "https://img.youtube.com/vi/E5IjKHWROFY/hqdefault.jpg",
        mediaImageAlt: "Hubbub.fm Sound Go Social — motion graphics preview",
        youtubeVideoId: "E5IjKHWROFY",
        youtubeUrl: "https://www.youtube.com/watch?v=E5IjKHWROFY",
      },
      {
        id: "commercial-coming-soon",
        client: "Lisenbart Production",
        category: "Commercial",
        year: "In production",
        title: "Coming soon",
        description:
          "In production · case study on the way\nAnother commercial project is moving through edit and grade — full credits, process notes and deliverables will land here soon.",
        result: "Publishing the full case study as soon as final delivery is cleared.",
        mediaColor: "#0c1a30",
        comingSoonProgress: 70,
      },
      {
        id: "commercial-your-project",
        client: "Lisenbart Production",
        category: "Commercial · Your project",
        year: "—",
        title: "Your next campaign",
        description:
          "Brand films · TVCs · motion design\nThe next case study on this page could be yours — a launch film, product story or campaign toolkit built to your brief and timeline.",
        result: "From first concept to broadcast-ready delivery — we ship commercial work that moves brands.",
        mediaColor: "#081420",
        mediaPlaceholder: {
          headline: "Your project could be here",
        },
      },
    ],
  },
  {
    slug: "gaming",
    pageTitle: "Gaming Selected Work",
    subtitle:
      "Game marketing built to win UA — trailers, HTML5 playables and performance creatives engineered to cut CPI, ship fast and scale with your data team.",
    cases: [
      {
        id: "lisenbart-games-showreel",
        client: "Lisenbart Games",
        category: "Gaming · Showreel",
        year: "2026",
        title: "Game Marketing Showreel",
        description:
          "2026 · Promotional videos · Playable ads · UA creatives\nWe specialize in promotional videos for games — plus static banners, cinemagraphs, testimonials and playable ads for any creative task at a competitive price. We develop the most popular and relevant ideas through constant market monitoring and analysis, and work with your data team to improve CPI and achieve the best result. Direct production without maintaining an in-house studio, with flexible project cooperation on request.",
        result:
          "Marketing animation showreel — game trailers, playable ads and promotional creatives built for UA, launch and live-ops campaigns.",
        mediaColor: "#1a0a2e",
        vimeoId: "944158555",
        mediaImage: "/images/work/lisenbart-games-showreel-preview.jpg",
        mediaImageAlt: "Lisenbart Games marketing showreel — preview frame",
      },
      {
        id: "playable-ads",
        client: "Lisenbart Games",
        category: "Gaming · Playable Ads",
        year: "2026",
        title: "Playable Ads",
        description:
          "CPI-first · hook in 3 seconds · Moloco & Meta ready\nInteractive HTML5 ads engineered to win UA auctions — from rich mini-games to high-velocity tap-throughs. We concept, animate and ship playables optimized for Moloco, Meta, Unity Ads and major networks, with rapid A/B iteration aligned to your data team's CPI and retention targets.",
        result:
          "Six live examples across three complexity tiers — complex mechanics, mid-weight engagement loops and lightweight playables built for scale testing and performance marketing.",
        mediaColor: "#160828",
        playableTiers: [
          {
            id: "complex",
            label: "Complex",
            examples: [
              {
                id: "blitzy-runway",
                label: "Blitzy Runway",
                url: "https://677ebabf171dc264e0591457--stunning-salamander-0479f8.netlify.app/playables/BB_BlitzyRunway.html",
              },
              {
                id: "balinko",
                label: "Balinko",
                url: "https://677ebabf171dc264e0591457--stunning-salamander-0479f8.netlify.app/playables/SM_Balinko.html",
              },
            ],
          },
          {
            id: "average",
            label: "Average",
            examples: [
              {
                id: "snoopy-moloco",
                label: "Snoopy",
                url: "https://677ebabf171dc264e0591457--stunning-salamander-0479f8.netlify.app/playables/SGH_Snoopy_Moloco.html",
              },
              {
                id: "bank-of-jackpot",
                label: "Bank of Jackpot",
                url: "https://677ebabf171dc264e0591457--stunning-salamander-0479f8.netlify.app/playables/HOF_BankOfJackpot.html",
              },
            ],
          },
          {
            id: "simple",
            label: "Simple",
            examples: [
              {
                id: "wsop-all-in",
                label: "WSOP All-In",
                url: "https://677ebabf171dc264e0591457--stunning-salamander-0479f8.netlify.app/playables/WSOP_AllIn.html",
              },
              {
                id: "simplified-gameplay",
                label: "Simplified Gameplay",
                url: "https://677ebabf171dc264e0591457--stunning-salamander-0479f8.netlify.app/playables/BF_SimplifiedGamePlay_Moloco.html",
              },
            ],
          },
        ],
      },
      {
        id: "gaming-coming-soon",
        client: "Lisenbart Games",
        category: "Gaming",
        year: "In production",
        title: "Coming soon",
        description:
          "In production · case study on the way\nA new game marketing project is in final polish — trailer cuts, playable variants and performance notes will go live here shortly.",
        result: "Full breakdown coming as soon as the client launch window opens.",
        mediaColor: "#1f0a34",
        comingSoonProgress: 50,
      },
      {
        id: "gaming-your-project",
        client: "Lisenbart Games",
        category: "Gaming · Your project",
        year: "—",
        title: "Your next campaign",
        description:
          "Trailers · playables · UA creatives\nThe next case study on this page could be yours — a launch trailer, playable ad or performance creative built to your brief, your KPIs and your timeline.",
        result: "From first concept to network-ready delivery — we ship game marketing that wins UA.",
        mediaColor: "#140622",
        mediaPlaceholder: {
          headline: "Your project could be here",
        },
      },
    ],
  },
  {
    slug: "film",
    pageTitle: "Film Selected Work",
    subtitle: "Animated series, short films and co-productions — across 2D, 3D and mixed media.",
    cases: [
      {
        id: "unnecessary-things",
        client: "Lisenbart Animation Studio",
        category: "Film & Entertainment · Short Film",
        year: "2021",
        title: "Unnecessary Things",
        description:
          "Award-winning 14-minute animated short — World Premiere at Shanghai, Best Animated Short Film at Curtas. A robot buys a human from a store of unwanted things; a friendship that ends where it began.",
        result:
          "Festival winner across Europe and Asia — from Linoleum and ZIFF to Vancouver, Huesca and Odessa. Full 2D production: script, design, animation and festival delivery.",
        mediaColor: "#0a1f0f",
        vimeoId: "823618245",
        mediaImage: "/images/work/unnecessary-things-preview.webp",
        mediaImageAlt: "Unnecessary Things — robot eyes close-up preview",
        stills: [
          "/images/work/unnecessary-things-still-02.jpg",
          "/images/work/unnecessary-things-still-04.jpg",
          "/images/work/unnecessary-things-still-06.jpg",
          "/images/work/unnecessary-things-still-08.jpg",
        ],
        imdbId: "tt14760808",
        laurels: ["15 awards", "45 selections", "7.9 IMDb"],
        selectionLinks: [
          {
            label: "Vancouver International Film Festival",
            href: "https://www.youtube.com/watch?v=9I_So6Tq0rU",
          },
          {
            label: "Short Shorts Film Festival & Asia (Tokyo)",
            href: "https://shortshorts.org/2022/en/program/anime/anime-2/unnecessary-things/",
          },
          {
            label: "St. Louis International Film Festival",
            href: "https://watch.eventive.org/2021sliff/play/615f8c7b6152f10045ca60bf/615cc215038537025765c6a0",
          },
        ],
        winnerLink: {
          label: "Winner, Prague Film Awards",
          href: "https://odessa-journal.com/dmytro-lisenbarts-animated-short-unnecessary-things-won-an-award-at-the-prague-film-awards/",
        },
        credits:
          "Written and directed by Dmytro Lisenbart, based on a story by Robert Sheckley. Co-written with Andriy Rushkovskyi; production design by Dmytro Krivonos. Produced by Lisenbart Animation Studio and Marcus Film (Vitalii Khalo), with support from Derzhkino.",
        quote: {
          text: "Pair this with Blade Runner 2049 — a lovely story about sentience and friendship.",
          attribution: "Review on Letterboxd",
          href: "https://letterboxd.com/film/unnecessary-things/",
        },
      },
      {
        id: "the-last-kozak",
        client: "Lisenbart Animation Studio",
        category: "Film & Entertainment · Animated Feature",
        year: "In development",
        title: "The Last Kozak",
        description:
          "80-minute animated feature · Drama · Action · Fantasy · 12+\nHe has no name — everyone calls him the Last Kozak. Trapped in a time loop, he must defeat evil again and again. A stylized action-fantasy with comic-book editing, psychological depth and a cossack who rides the Iron Dog through worlds that intersect at the Last Khreshchatyk.",
        result:
          "Currently in development — script, treatment and pitch complete. English teaser available.",
        mediaColor: "#120808",
        vimeoId: "699197721", // UA teaser for localization: 639390060
        mediaImage: "/images/work/the-last-kozak-preview.webp",
        mediaImageAlt: "The Last Kozak — teaser preview frame",
        statusBadge: "Feature film in development",
      },
      {
        id: "song-departure",
        client: "Lisenbart Production",
        category: "Film & Entertainment · Music Video",
        year: "2012",
        title: "Song Departure · La robe rouge",
        description:
          "Golden Kuker 2012 · Sofia International Animation Film Festival\nAnimated music video for Void ft's \"La robe rouge\" — stylized 2D animation from concept and storyboard through final cut.",
        result:
          "Selected for Golden Kuker International Animation Film Festival 2012. An art-film music video built for festival circuit and YouTube release.",
        mediaColor: "#1a1420",
        mediaImage: "/images/work/song-departure-preview.jpg",
        mediaImageAlt: "Song Departure music video — preview frame",
        youtubeVideoId: "a9OEOEVVZog",
        youtubeUrl: "https://www.youtube.com/watch?v=a9OEOEVVZog",
      },
      {
        id: "song-mishka",
        client: "Ivan Dorn",
        category: "Film & Entertainment · Music Video",
        year: "2014",
        title: "Mishka · Ivan Dorn",
        description:
          "Frame-by-frame animation · client Ivan Dorn · Kyiv production\nMusic video for \"Mishka is guilty\" — hand-crafted 2D animation directed by Alexander Koreshkov and Dmytro Lisenbart, from design and backgrounds through final composite.",
        result:
          "Delivered for one of Ukraine's top pop artists — character-driven visuals built for broadcast, VOD and YouTube release.",
        mediaColor: "#181820",
        mediaImage: "/images/work/song-mishka-preview.jpg",
        mediaImageAlt: "Mishka music video by Ivan Dorn — preview frame",
        youtubeVideoId: "jPqAVzcpn9U",
        youtubeUrl: "https://www.youtube.com/watch?v=jPqAVzcpn9U",
      },
      {
        id: "film-coming-soon",
        client: "Lisenbart Animation Studio",
        category: "Film & Entertainment",
        year: "In production",
        title: "Coming soon",
        description:
          "In production · case study on the way\nA new film & entertainment project is in development — treatment, visual development and production milestones will be shared here as they lock.",
        result: "Case study drops once the next festival or release milestone is confirmed.",
        mediaColor: "#141820",
        comingSoonProgress: 35,
      },
      {
        id: "film-your-project",
        client: "Lisenbart Animation Studio",
        category: "Film & Entertainment · Your project",
        year: "—",
        title: "Your next film",
        description:
          "Short films · series · co-productions\nThe next case study on this page could be yours — an animated short, series pilot or co-production built from script to festival delivery.",
        result: "From first treatment to premiere — we produce film & entertainment with festival-ready finish.",
        mediaColor: "#101018",
        mediaPlaceholder: {
          headline: "Your project could be here",
        },
      },
    ],
  },
  {
    slug: "social",
    pageTitle: "Social Media Selected Work",
    subtitle: "YouTube channels — animated songs, stories and learning content for preschool audiences.",
    cases: [
      {
        id: "scoopy-cap",
        client: "Scoopy Cap",
        category: "Social Media · YouTube Channel",
        filmCategory: "Original IP · YouTube Channel",
        year: "2024",
        title: "Scoopy Cap",
        description:
          "225 videos · 10.4K subscribers · weekly hits that kids replay\nFull English preschool channel — nursery rhymes, ABC, colours and numbers built around Scoopy Cap, a friendly space explorer designed for calm watch-time and repeat views.",
        result:
          "Finger Family became the channel's top-performing video. New full songs every Saturday, Shorts through the week — a content engine built to grow.",
        mediaColor: "#1a1428",
        mediaImage: "/images/work/scoopy-cap-preview.jpg",
        mediaImageAlt: "Scoopy Cap YouTube channel",
        youtubeBannerImage: "/images/work/scoopy-cap-banner.jpg",
        youtubeThumbnails: [
          "/images/work/scoopy-cap-thumb-1.jpg",
          "/images/work/scoopy-cap-thumb-2.jpg",
          "/images/work/scoopy-cap-thumb-3.jpg",
        ],
        youtubeVideoId: "kKZpVhpBV_0",
        youtubeUrl: "https://www.youtube.com/@ScoopyCap",
      },
      {
        id: "pershosvit",
        client: "Pershosvit",
        category: "Social Media · YouTube Channel",
        filmCategory: "Original IP · YouTube Channel",
        year: "2024",
        title: "Pershosvit · Kapitan Świetlik",
        description:
          "147K subscribers · 274 videos · breakout hits in Ukrainian\nThe country's leading preschool channel — songs, fairy tales and learning with Kapitan Świetlik, a robot hero parents trust and kids watch on repeat.",
        result:
          "Baby Shark UA became a channel phenomenon. Alphabet, bedtime and learning series driving daily growth across Ukraine.",
        mediaColor: "#1f1020",
        mediaImage: "/images/work/pershosvit-preview.jpg",
        mediaImageAlt: "Pershosvit YouTube channel",
        youtubeBannerImage: "/images/work/pershosvit-banner.jpg",
        youtubeThumbnails: [
          "/images/work/pershosvit-thumb-1.jpg",
          "/images/work/pershosvit-thumb-2.jpg",
          "/images/work/pershosvit-thumb-3.jpg",
        ],
        youtubeVideoId: "PzxN3FT1eAw",
        youtubeUrl: "https://www.youtube.com/@pershosvit",
      },
      {
        id: "social-coming-soon",
        client: "Lisenbart Production",
        category: "Social Media",
        year: "In production",
        title: "Coming soon",
        description:
          "In production · case study on the way\nA new YouTube channel project is in active production — content calendar, character bible and first episodes are on the way.",
        result: "Channel case study goes live once the first growth milestones are in.",
        mediaColor: "#181028",
        comingSoonProgress: 58,
      },
      {
        id: "social-your-project",
        client: "Lisenbart Production",
        category: "Social Media · Your project",
        year: "—",
        title: "Your next channel",
        description:
          "YouTube · preschool · learning content\nThe next case study on this page could be yours — a channel launch, content series or IP built for repeat views and subscriber growth.",
        result: "From character design to upload schedule — we build social content engines that scale.",
        mediaColor: "#140e22",
        mediaPlaceholder: {
          headline: "Your project could be here",
        },
      },
    ],
  },
];

export function getWorkCategory(slug: WorkCategorySlug): WorkCategory | undefined {
  return workCategories.find((category) => category.slug === slug);
}

export function getWorkCasesByIds(ids: readonly string[]): WorkCaseStudy[] {
  const byId = new Map(
    workCategories.flatMap((category) => category.cases).map((item) => [item.id, item]),
  );
  return ids.flatMap((id) => {
    const item = byId.get(id);
    return item ? [item] : [];
  });
}

/** Tone classes for work page title color */
export const workCategoryTitleClass: Record<WorkCategorySlug, string> = {
  commercial: "work-page-title--commercial",
  gaming: "work-page-title--gaming",
  film: "work-page-title--film-entertainment",
  social: "work-page-title--performance-social",
};
