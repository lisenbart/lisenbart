/** JSON-LD graphs for primary Originals case studies (Movie / CreativeWork). */
export const filmPageJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Movie",
    name: "Unnecessary Things",
    director: {
      "@type": "Person",
      name: "Dmytro Lisenbart",
    },
    datePublished: "2021",
    genre: "Animation",
    duration: "PT14M",
    award: "Winner, Prague Film Awards",
    sameAs: ["https://www.imdb.com/title/tt14760808/"],
    url: "https://lisenbart.com/originals/#unnecessary-things",
  },
  {
    "@context": "https://schema.org",
    "@type": "Movie",
    name: "The Last Kozak",
    director: {
      "@type": "Person",
      name: "Dmytro Lisenbart",
    },
    genre: ["Animation", "Drama", "Action", "Fantasy"],
    creativeWorkStatus: "In development",
    description:
      "80-minute animated feature in development. A nameless Cossack trapped in a time loop — action-fantasy drawing on Ukrainian mythology.",

    url: "https://lisenbart.com/originals/#the-last-kozak",
  },
] as const;
