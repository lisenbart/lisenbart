/** JSON-LD graphs for primary /film case studies (Movie / CreativeWork). */
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
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "7.9",
      bestRating: "10",
      worstRating: "1",
    },
    award: "Winner, Prague Film Awards",
    sameAs: ["https://www.imdb.com/title/tt14760808/"],
    url: "https://lisenbart.com/film#unnecessary-things",
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
      "80-minute animated feature. A stylized action-fantasy about the Last Kozak trapped in a time loop.",
    url: "https://lisenbart.com/film#the-last-kozak",
  },
] as const;
