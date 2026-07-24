export interface WorkCaseStudy {
  id: string;
  client: string;
  category: string;
  /** Label shown on Originals page */
  filmCategory?: string;
  year: string;
  title: string;
  description: string;
  result: string;
  mediaColor: string;
  vimeoId?: string;
  mediaImage?: string;
  mediaImageAlt?: string;
  stills?: string[];
  imdbId?: string;
  youtubeUrl?: string;
  selectionLinks?: Array<{ label: string; href: string }>;
  winnerLink?: { label: string; href: string };
  credits?: string;
  quote?: {
    text: string;
    attribution: string;
    href: string;
  };
  statusBadge?: string;
}

/** Cases used by Originals (`/originals/`). */
const originalsCases: WorkCaseStudy[] = [
  {
    id: "unnecessary-things",
    client: "Lisenbart Animation Studio",
    category: "Film & Entertainment · Short Film",
    filmCategory: "Animated Short · 14 min",
    year: "2021",
    title: "Unnecessary Things",
    description:
      "A robot buys a human from a store of unwanted things, beginning a friendship that ends where it began.",
    result: "15 awards · 45 festival selections",
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
    filmCategory: "Animated Feature · 80 min · In Development",
    year: "",
    title: "The Last Kozak",
    description:
      "He has no name — everyone calls him the Last Kozak. Trapped in a time loop, he must defeat evil again and again. A stylized action-fantasy with comic-book editing, psychological depth, and a cossack who rides the Iron Dog through worlds that meet at the Last Khreshchatyk.",
    result: "Script, treatment and pitch complete. English teaser available.",
    mediaColor: "#120808",
    vimeoId: "699197721",
    mediaImage: "/images/work/the-last-kozak-preview.webp",
    mediaImageAlt: "The Last Kozak — teaser preview frame",
  },
  {
    id: "scoopy-cap",
    client: "Scoopy Cap",
    category: "Social Media · YouTube Channel",
    filmCategory: "Original Preschool IP · English",
    year: "",
    title: "Scoopy Cap",
    description:
      "10.4K subscribers · 225 videos\nNursery rhymes, ABC, colours and numbers built around Scoopy Cap — a space explorer designed for calm viewing and repeat plays.",
    result:
      "Finger Family is the channel’s top-performing video. Full songs each Saturday; Shorts through the week.",
    mediaColor: "#1a1428",
    mediaImage: "/images/work/scoopy-cap-preview.jpg",
    mediaImageAlt: "Scoopy Cap YouTube channel",
    youtubeUrl: "https://www.youtube.com/@ScoopyCap",
  },
  {
    id: "pershosvit",
    client: "Pershosvit",
    category: "Social Media · YouTube Channel",
    filmCategory: "Original Preschool IP · Ukrainian",
    year: "",
    title: "Pershosvit · Kapitan Świetlik",
    description:
      "147K subscribers · 274 videos\nSongs, fairy tales and learning with Kapitan Świetlik — a robot hero for young audiences and the parents who watch with them.",
    result:
      "Alphabet, bedtime and learning series across Ukraine. Baby Shark UA is among the channel’s strongest videos.",
    mediaColor: "#1f1020",
    mediaImage: "/images/work/pershosvit-preview.jpg",
    mediaImageAlt: "Pershosvit YouTube channel",
    youtubeUrl: "https://www.youtube.com/@pershosvit",
  },
];

export function getWorkCasesByIds(ids: readonly string[]): WorkCaseStudy[] {
  const byId = new Map(originalsCases.map((item) => [item.id, item]));
  return ids.flatMap((id) => {
    const item = byId.get(id);
    return item ? [item] : [];
  });
}
