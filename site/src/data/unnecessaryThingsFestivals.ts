/**
 * Unnecessary Things — festival recognition.
 *
 * Summary figures (approved project-level): 11 awards · 45 festival selections.
 * Individual entries below are limited to recognitions documented in studio
 * festival records and matching laurel assets. Not every selection is listed.
 */

export type FestivalKind = "award" | "nominee" | "finalist" | "semi-finalist" | "official-selection";

export type FestivalRecognition = {
  id: string;
  festival: string;
  country?: string;
  year: string;
  kind: FestivalKind;
  /** Award category or selection label shown in the list. */
  detail: string;
  href?: string;
  /** Local optimized laurel under /images/work/unnecessary-things/laurels/ */
  laurelSrc?: string;
  laurelAlt?: string;
  /** Show in the compact featured strip after the hero. */
  featured?: boolean;
};

export const unnecessaryThingsFestivalSummary = {
  awards: 11,
  selections: 45,
  statement: "11 Awards · 45 Festival Selections",
} as const;

/**
 * Featured strip under the reel — highest-status recognitions.
 * Order: Shanghai, Huesca, Prague, Curtas, VIFF, Palm Springs, SSFF & Asia.
 * Full awards / selections remain in the Festival Recognition section below.
 */
export const unnecessaryThingsFeaturedLaurels: FestivalRecognition[] = [
  {
    id: "shanghai-2021",
    festival: "Shanghai International Film Festival",
    country: "China",
    year: "2021",
    kind: "official-selection",
    detail: "Golden Goblet Award Competition",
    laurelSrc: "/images/work/unnecessary-things/laurels/shanghai-2021-golden-goblet-competition.png",
    laurelAlt: "Golden Goblet Award Competition — Shanghai International Film Festival 2021",
    featured: true,
  },
  {
    id: "huesca-2021",
    festival: "Huesca International Film Festival",
    country: "Spain",
    year: "2021",
    kind: "official-selection",
    detail: "Official Selection",
    laurelSrc: "/images/work/unnecessary-things/laurels/huesca-2021-official-selection.png",
    laurelAlt: "Official Selection — 49th Huesca International Film Festival",
    featured: true,
  },
  {
    id: "prague-2022",
    festival: "Prague Film Awards",
    country: "Czech Republic",
    year: "2022",
    kind: "award",
    detail: "Best Animated Film",
    href: "https://odessa-journal.com/dmytro-lisenbarts-animated-short-unnecessary-things-won-an-award-at-the-prague-film-awards/",
    laurelSrc: "/images/work/unnecessary-things/laurels/prague-film-awards-2022-winner.png",
    laurelAlt: "Winner, Best Animated Film — Prague Film Awards 2022",
    featured: true,
  },
  {
    id: "curtas-2021",
    festival: "Curtas Festival do Imaxinario",
    country: "Brazil",
    year: "2021",
    kind: "award",
    detail: "Best Animated Short Film",
    href: "https://curtas.org/2021/10/31/curtas-2021-palmares/",
    laurelSrc: "/images/work/unnecessary-things/laurels/curtas-2021-best-animated-short.png",
    laurelAlt: "Best Animated Short Film — Curtas Festival do Imaxinario 2021",
    featured: true,
  },
  {
    id: "viff-2021",
    festival: "Vancouver International Film Festival",
    country: "Canada",
    year: "2021",
    kind: "official-selection",
    detail: "Official Selection",
    href: "https://www.youtube.com/watch?v=9I_So6Tq0rU",
    laurelSrc: "/images/work/unnecessary-things/laurels/viff-2021-official-selection.png",
    laurelAlt: "Official Selection — Vancouver International Film Festival 2021",
    featured: true,
  },
  {
    id: "psiaf-2022",
    festival: "Palm Springs International Animation Festival",
    country: "United States",
    year: "2022",
    kind: "official-selection",
    detail: "Official Selection",
    laurelSrc: "/images/work/unnecessary-things/laurels/psiaf-2022-official-selection.png",
    laurelAlt: "Official Selection — Palm Springs International Animation Festival 2022",
    featured: true,
  },
  {
    id: "ssff-asia-2022",
    festival: "Short Shorts Film Festival & Asia",
    country: "Japan",
    year: "2022",
    kind: "official-selection",
    detail: "Official Selection",
    href: "https://shortshorts.org/2022/en/program/anime/anime-2/unnecessary-things/",
    laurelSrc: "/images/work/unnecessary-things/laurels/ssff-asia-2022-official-selection.png",
    laurelAlt: "Official Selection — Short Shorts Film Festival & Asia 2022",
    featured: true,
  },
];

/** Documented awards from studio festival record + matching laurels where available. */
export const unnecessaryThingsAwards: FestivalRecognition[] = [
  {
    id: "linoleum-2021",
    festival: "Linoleum Contemporary Animation and Media Art Festival",
    country: "Ukraine",
    year: "2021",
    kind: "award",
    detail: "Best Ukrainian Animation Film",
    href: "https://linoleumfest.com/uk/program/competition-programs/events/Unnecessary-things",
    laurelSrc: "/images/work/unnecessary-things/laurels/linoleum-2021-best-ukrainian-animation.png",
    laurelAlt: "Best Ukrainian Animation Film — Linoleum 2021",
  },
  {
    id: "cinema-and-you-2021",
    festival: "International Film Festival Cinema and You",
    country: "Ukraine",
    year: "2021",
    kind: "award",
    detail: "Best Ukrainian Animation Film",
    laurelSrc: "/images/work/unnecessary-things/laurels/cinema-and-you-2021-best-ukrainian-animation.png",
    laurelAlt: "Best Ukrainian Animation Film — Cinema and You 2021",
  },
  {
    id: "ziff-2021",
    festival: "Zaporizhzhia International Film Festival",
    country: "Ukraine",
    year: "2021",
    kind: "award",
    detail: "Best Ukrainian Animation Film",
    laurelSrc: "/images/work/unnecessary-things/laurels/ziff-2021-best-ukrainian-animation.png",
    laurelAlt: "Best Ukrainian Animation Film — ZIFF 2021",
  },
  {
    id: "curtas-2021-list",
    festival: "Curtas Festival do Imaxinario",
    country: "Brazil",
    year: "2021",
    kind: "award",
    detail: "Best Animated Short Film",
    href: "https://curtas.org/2021/10/31/curtas-2021-palmares/",
  },
  {
    id: "film-only-2022",
    festival: "Film Only Film Festival",
    year: "2022",
    kind: "award",
    detail: "Favourite Experimental Film",
    href: "https://www.filmonlyfilm.org/2022",
    laurelSrc: "/images/work/unnecessary-things/laurels/film-only-film-2022-award-winner.png",
    laurelAlt: "Award Winner — Film Only Film Festival 2022",
  },
  {
    id: "fantasy-scifi-2022",
    festival: "Fantasy / Sci-Fi Film & Screenplay Festival",
    year: "2022",
    kind: "award",
    detail: "Best Sci-Fi Film",
    href: "https://fantasyscififestival.com/2022/03/22/highlights-winners-videos-march-2022-film-festival/",
  },
  {
    id: "big-muddy-2022",
    festival: "Big Muddy Film Festival",
    country: "United States",
    year: "2022",
    kind: "award",
    detail: "Best Animation Film",
    laurelSrc: "/images/work/unnecessary-things/laurels/big-muddy-2022-best-animation.png",
    laurelAlt: "Best Animation Film — Big Muddy Film Festival 2022",
  },
  {
    id: "sunday-shorts-2022",
    festival: "Sunday Shorts",
    year: "2022",
    kind: "award",
    detail: "Best Animated Short",
    laurelSrc: "/images/work/unnecessary-things/laurels/sunday-shorts-2022-best-animated-short.png",
    laurelAlt: "Best Animated Short — Sunday Shorts 2022",
  },
  {
    id: "sunday-shorts-screenwriting-2022",
    festival: "Sunday Shorts",
    year: "2022",
    kind: "award",
    detail: "Best Screenwriting",
  },
  {
    id: "prague-2022-list",
    festival: "Prague Film Awards",
    country: "Czech Republic",
    year: "2022",
    kind: "award",
    detail: "Best Animated Film",
    href: "https://odessa-journal.com/dmytro-lisenbarts-animated-short-unnecessary-things-won-an-award-at-the-prague-film-awards/",
  },
];

/** Notable finalist / nominee / semi-finalist entries with documentation. */
export const unnecessaryThingsNotablePlacements: FestivalRecognition[] = [
  {
    id: "sao-paulo-2021",
    festival: "São Paulo International Film Festival",
    country: "Brazil",
    year: "2021",
    kind: "finalist",
    detail: "Finalist",
    href: "https://www.saopaulofilmfestival.com.br/portfolio/unnecessary-things/",
    laurelSrc: "/images/work/unnecessary-things/laurels/sao-paulo-2021-finalist.png",
    laurelAlt: "Finalist — São Paulo International Film Festival 2021",
  },
  {
    id: "rhode-island-2021",
    festival: "Flickers' Rhode Island International Film Festival",
    country: "United States",
    year: "2021",
    kind: "semi-finalist",
    detail: "Semi-Finalist",
  },
  {
    id: "lwiff-nominee",
    festival: "Living Waters International Film Festival",
    year: "2022",
    kind: "nominee",
    detail: "Nominee, Best Animated Film",
  },
];

/**
 * Selected high-signal official selections (not a complete list of 45).
 * Shanghai = World Premiere / Golden Goblet Short Film competition selection — not an award.
 */
export const unnecessaryThingsNotableSelections: FestivalRecognition[] = [
  {
    id: "siff-2021",
    festival: "Shanghai International Film Festival",
    country: "China",
    year: "2021",
    kind: "official-selection",
    detail: "Official Selection · World Premiere · Golden Goblet Award Competition",
    laurelSrc: "/images/work/unnecessary-things/laurels/shanghai-2021-golden-goblet-competition.png",
    laurelAlt: "Golden Goblet Award Competition — Shanghai International Film Festival 2021",
  },
  {
    id: "huesca-2021-list",
    festival: "Huesca International Film Festival",
    country: "Spain",
    year: "2021",
    kind: "official-selection",
    detail: "Official Selection",
    laurelSrc: "/images/work/unnecessary-things/laurels/huesca-2021-official-selection.png",
    laurelAlt: "Official Selection — 49th Huesca International Film Festival",
  },
  {
    id: "la-shorts-2021",
    festival: "LA Shorts International Film Festival",
    country: "United States",
    year: "2021",
    kind: "official-selection",
    detail: "Official Selection",
    href: "https://www.lashortsfest.com/animation-program4",
  },
  {
    id: "viff-2021-list",
    festival: "Vancouver International Film Festival",
    country: "Canada",
    year: "2021",
    kind: "official-selection",
    detail: "Official Selection",
  },
  {
    id: "sliff-2021",
    festival: "St. Louis International Film Festival",
    country: "United States",
    year: "2021",
    kind: "official-selection",
    detail: "Official Selection",
    href: "https://watch.eventive.org/2021sliff/play/615f8c7b6152f10045ca60bf/615cc215038537025765c6a0",
  },
  {
    id: "ssff-asia-2022-list",
    festival: "Short Shorts Film Festival & Asia",
    country: "Japan",
    year: "2022",
    kind: "official-selection",
    detail: "Official Selection",
    href: "https://shortshorts.org/2022/en/program/anime/anime-2/unnecessary-things/",
  },
  {
    id: "psiaf-2022-list",
    festival: "Palm Springs International Animation Festival",
    country: "United States",
    year: "2022",
    kind: "official-selection",
    detail: "Official Selection",
  },
  {
    id: "mecal-2022",
    festival: "MECAL Barcelona International Short and Animation Festival",
    country: "Spain",
    year: "2022",
    kind: "official-selection",
    detail: "Official Selection",
  },
  {
    id: "columbus-2022",
    festival: "Columbus International Film & Animation Festival",
    country: "United States",
    year: "2022",
    kind: "official-selection",
    detail: "Official Selection",
  },
  {
    id: "animaze-2022",
    festival: "ANIMAZE Montreal International Animation Film Festival",
    country: "Canada",
    year: "2022",
    kind: "official-selection",
    detail: "Official Selection",
  },
];

/**
 * Review flags (not shown on page):
 * - Documented award rows above: 10. Approved summary remains 11 awards — one award
 *   not yet matched to a named entry in the studio festival doc excerpt (KINOKOLO
 *   laurel exists as Best Animated Film asset but was not listed in !_ROBOT FESTS.docx).
 * - SIFF Golden Goblet asset is a competition/selection mark, not a win.
 * - FantaSci 2022 appears near awards in the studio doc with a nominations URL — treated as unverified for awards list.
 */
export const unnecessaryThingsFestivalReviewNotes = [
  "Approved summary 11 awards · 45 selections retained; awards list documents 10 named wins from studio records.",
  "KINOKOLO Best Animated Film laurel present in assets but absent from !_ROBOT FESTS.docx awards list — not displayed as award pending confirmation.",
  "Shanghai Golden Goblet Short Film mark is Official Selection / competition category, not an award.",
] as const;
