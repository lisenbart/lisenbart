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
  /** Display rating next to IMDb mark (optional). */
  imdbRating?: string;
  imdbVotes?: string;
  /** Streaming / VOD presence (e.g. Sweet.tv). */
  sweetTv?: {
    href: string;
    poster: string;
    posterAlt: string;
    label?: string;
  };
  youtubeUrl?: string;
  tiktokUrl?: string;
  instagramUrl?: string;
  /** Optional per-platform preview stills for IP cards. */
  platformPreviews?: {
    youtube?: string;
    tiktok?: string;
    instagram?: string;
  };
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
    filmCategory: "Animated short · 14 min · 2021",
    year: "2021",
    title: "Unnecessary Things",
    description:
      "In a quiet future, a robot buys a discarded human from a store of unwanted things. What begins as an act of curiosity becomes a story about friendship, memory and the need to be seen.",
    result: "11 Awards · 45 Festival Selections",


    mediaColor: "#0a1f0f",
    /** Full film — festival-page hero opens this in the lightbox */
    vimeoId: "823618245",
    mediaImage: "/images/work/unnecessary-things-preview.webp",
    mediaImageAlt: "Unnecessary Things — cosmic eyes over the crimson tree",
    stills: [
      "/images/work/unnecessary-things-still-02.jpg",
      "/images/work/unnecessary-things-still-04.jpg",
      "/images/work/unnecessary-things-still-06.jpg",
      "/images/work/unnecessary-things-still-08.jpg",
    ],
    imdbId: "tt14760808",
    imdbRating: "8.0",
    imdbVotes: "38",
    sweetTv: {
      href: "https://sweet.tv/ua-en/cartoon/28822-unnecessary-things",
      poster: "/images/work/unnecessary-things-sweet-tv.webp",
      posterAlt: "Unnecessary Things on SWEET.TV",
      label: "Watch on SWEET.TV",
    },
    selectionLinks: [
      {
        label: "Vancouver International Film Festival",
        href: "https://www.youtube.com/watch?v=9I_So6Tq0rU",
      },
      {
        label: "Short Shorts Film Festival & Asia",
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
      "Written and directed by Dmytro Lisenbart, based on a story by Robert Sheckley. Co-written with Andriy Rushkovskyi, with production design by Dmytro Krivonos. Produced by Lisenbart Animation Studio and Marcus Film, with support from Derzhkino.",
    quote: {
      text: "A lovely story about sentience and friendship.",
      attribution: "Review on Letterboxd",
      href: "https://letterboxd.com/film/unnecessary-things/",
    },
  },
  {
    id: "the-last-kozak",
    client: "Lisenbart Animation Studio",
    category: "Film & Entertainment · Animated Feature",
    filmCategory: "Animated feature · In development",
    year: "",
    title: "The Last Kozak",
    description:
      "A nameless Cossack is trapped in a time loop, forced to face evil again and again. An action-fantasy drawing on Ukrainian mythology, comic-book rhythm and psychological tension. Script, treatment and pitch complete; English teaser available.",
    result: "Animated feature · In development",

    mediaColor: "#120808",
    vimeoId: "699197721",
    mediaImage: "/images/work/the-last-kozak-preview.webp",
    mediaImageAlt: "The Last Kozak — Frozen Frontier still",
  },
  {
    id: "scoopy-cap",
    client: "Scoopy Cap",
    category: "Social Media · YouTube Channel",
    filmCategory: "Original English-language preschool learning & music",
    year: "",
    title: "Scoopy Cap",
    description:
      "English-language preschool animation — music, alphabet and character stories built as educational IP.",
    result: "Original English-language preschool learning & music",

    mediaColor: "#1a1428",
    mediaImage: "/images/work/scoopy-cap-preview.webp",
    mediaImageAlt: "Scoopy Cap — colourful kids channel collage",
    youtubeUrl: "https://www.youtube.com/@ScoopyCap",
    tiktokUrl: "https://www.tiktok.com/@scoopycap",
    instagramUrl: "https://www.instagram.com/scoopycap/",
    platformPreviews: {
      youtube: "/images/work/scoopy-cap-youtube.jpg?v=6",
      tiktok: "/images/work/scoopy-cap-tiktok.jpg?v=6",
      instagram: "/images/work/scoopy-cap-instagram.jpg?v=6",
    },
  },
  {
    id: "pershosvit",
    client: "Pershosvit",
    category: "Social Media · YouTube Channel",
    filmCategory: "Original Ukrainian preschool animation & songs",
    year: "",
    title: "Pershosvit",
    description:
      "Ukrainian-language preschool animation — songs, stories and early learning across original characters and repeatable formats.",
    result: "Original Ukrainian preschool animation & songs",

    mediaColor: "#1f1020",
    mediaImage: "/images/work/pershosvit-preview.jpg",
    mediaImageAlt: "Pershosvit YouTube channel",
    youtubeUrl: "https://www.youtube.com/@pershosvit",
    tiktokUrl: "https://www.tiktok.com/@pershosvit",
    instagramUrl: "https://www.instagram.com/pershosvit/",
    platformPreviews: {
      youtube: "/images/work/pershosvit-youtube.jpg?v=6",
      tiktok: "/images/work/pershosvit-tiktok.jpg?v=6",
      instagram: "/images/work/pershosvit-instagram.jpg?v=6",
    },
  },
];

export function getWorkCasesByIds(ids: readonly string[]): WorkCaseStudy[] {
  const byId = new Map(originalsCases.map((item) => [item.id, item]));
  return ids.flatMap((id) => {
    const item = byId.get(id);
    return item ? [item] : [];
  });
}
