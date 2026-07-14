export interface CapabilityItem {
  id: string;
  title: string;
  image: string;
  description: string;
  formats: string[];
  workLinkLabel: string;
  workAnchor: string;
  /** Category showreel — swap path when ready */
  showreelSrc?: string;
}

export const capabilities: CapabilityItem[] = [
  {
    id: "commercial",
    title: "Commercial",
    image: "/images/capabilities/commercial.png",
    description:
      "Brand films, commercials and product visuals — from concept through final delivery.",
    formats: ["TV & digital ads", "brand films", "product animation", "explainer videos"],
    workLinkLabel: "Our cases →",
    workAnchor: "commercial",
  },
  {
    id: "gaming",
    title: "Gaming",
    image: "/images/capabilities/gaming.png",
    description:
      "Trailers, cinematics and in-game animation — built for the pace and scale of game production.",
    formats: ["playable ads", "marketing video", "game trailers", "CGI cinematics"],
    workLinkLabel: "Our cases →",
    workAnchor: "gaming",
  },
  {
    id: "film-entertainment",
    title: "Film & Entertainment",
    image: "/images/capabilities/film-entertainment.png",
    description:
      "Animated series, short films and feature development — across 2D, 3D and mixed media.",
    formats: ["animated series", "short films", "co-productions", "festival projects"],
    workLinkLabel: "Our cases →",
    workAnchor: "film",
  },
  {
    id: "performance-social",
    title: "Performance & Social",
    image: "/images/capabilities/performance-social.png",
    description:
      "Fast-turnaround content for live events, social platforms and performance contexts.",
    formats: ["social content", "event visuals", "motion design", "reels & shorts"],
    workLinkLabel: "Our cases →",
    workAnchor: "social",
  },
];
