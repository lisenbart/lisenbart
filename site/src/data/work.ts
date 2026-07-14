export type WorkCategorySlug = "commercial" | "gaming" | "film" | "social";

export interface WorkCaseStudy {
  id: string;
  /** [PLACEHOLDER — replace with real content before deploy] */
  client: string;
  category: string;
  year: string;
  title: string;
  description: string;
  result: string;
  /** [PLACEHOLDER — replace with real media before deploy] */
  mediaColor: string;
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
        id: "commercial-fmcg-brand-film",
        client: "Global FMCG Brand",
        category: "Commercial · Brand Film",
        year: "2023",
        title: "Brand film for regional campaign launch",
        description:
          "Animated brand film combining 2D character animation with motion graphics. Delivered in 6 weeks from first brief.",
        result: "Aired across 5 markets. Campaign exceeded target reach by 40%.",
        mediaColor: "#0a1628",
      },
      {
        id: "commercial-product-launch",
        client: "Consumer Electronics Brand",
        category: "Commercial · Product Film",
        year: "2024",
        title: "Product hero film for global retail launch",
        description:
          "High-energy product story built for paid social, retail screens and e-commerce. Modular cut-downs for 6, 15 and 30 seconds.",
        result: "Used in 14 retail territories. Pre-order page conversion +22% vs. prior campaign.",
        mediaColor: "#0c1a30",
      },
      {
        id: "commercial-explainer-series",
        client: "B2B SaaS Company",
        category: "Commercial · Explainer",
        year: "2023",
        title: "Explainer series for enterprise onboarding",
        description:
          "Four-part animated explainer system covering product value, workflow and security. Designed for sales decks and help centre.",
        result: "Reduced sales demo length by 18 minutes on average across the enterprise team.",
        mediaColor: "#081420",
      },
      {
        id: "commercial-digital-campaign",
        client: "Regional Retail Group",
        category: "Commercial · Digital Campaign",
        year: "2024",
        title: "Seasonal digital campaign toolkit",
        description:
          "Motion toolkit for always-on digital placements — banners, short loops and vertical formats with one shared visual language.",
        result: "32 assets delivered in 5 weeks. Paid social CTR improved by 31%.",
        mediaColor: "#0a1828",
      },
    ],
  },
  {
    slug: "gaming",
    pageTitle: "Gaming Selected Work",
    subtitle: "Trailers, cinematics and in-game animation — built for game production pace and scale.",
    cases: [
      {
        id: "gaming-playtika-launch",
        client: "Playtika",
        category: "Gaming · Game Trailer",
        year: "2024",
        title: "Launch trailer for a top-grossing mobile title",
        description:
          "Full production from brief to delivery — concept, storyboard, animation and sound. Built for simultaneous release across 12 markets.",
        result: "12M views in the first week across paid and organic channels.",
        mediaColor: "#1a0a2e",
      },
      {
        id: "gaming-cinematic-trilogy",
        client: "Mobile Game Publisher",
        category: "Gaming · Cinematic",
        year: "2023",
        title: "Three-part cinematic story arc for live ops event",
        description:
          "Serialized CGI cinematics released over a month-long in-game event. Produced to match live content updates and localisation needs.",
        result: "Event participation +28% week-on-week during cinematic release window.",
        mediaColor: "#160828",
      },
      {
        id: "gaming-playable-ads",
        client: "Casual Games Studio",
        category: "Gaming · Playable Ads",
        year: "2024",
        title: "Playable ad system for UA testing",
        description:
          "Template-based playable ad pipeline with rapid iteration on hooks, UI beats and end cards for performance marketing tests.",
        result: "18 playable variants shipped in 4 weeks. Best performer lowered CPI by 19%.",
        mediaColor: "#1f0a34",
      },
      {
        id: "gaming-marketing-video",
        client: "PC Strategy Studio",
        category: "Gaming · Marketing Video",
        year: "2023",
        title: "Announcement trailer and feature breakdown series",
        description:
          "Announcement trailer plus three feature-focused videos for Steam, YouTube and creator outreach ahead of early access.",
        result: "Wishlist growth +42% in the 30 days after announcement.",
        mediaColor: "#140622",
      },
    ],
  },
  {
    slug: "film",
    pageTitle: "Film Selected Work",
    subtitle: "Animated series, short films and co-productions — across 2D, 3D and mixed media.",
    cases: [
      {
        id: "film-award-short",
        client: "Independent Co-production",
        category: "Film & Entertainment · Short Film",
        year: "2023",
        title: "Award-winning animated short",
        description:
          "Co-produced animated short film in mixed 2D/3D technique. Full production from script development through post-production and festival submission.",
        result: "Selected at Ottawa, Animafest Zagreb and 12 other festivals.",
        mediaColor: "#0a1f0f",
      },
      {
        id: "film-series-pilot",
        client: "Streaming Platform Partner",
        category: "Film & Entertainment · Animated Series",
        year: "2024",
        title: "Animated series pilot and look development",
        description:
          "Pilot episode production with bible-ready character, environment and pipeline documentation for a youth-focused animated series.",
        result: "Pilot approved for development slate. Look book adopted for season planning.",
        mediaColor: "#081a12",
      },
      {
        id: "film-co-production",
        client: "European Film Fund",
        category: "Film & Entertainment · Co-production",
        year: "2023",
        title: "International co-production feature development",
        description:
          "Development package including animatic, production design pack and budget model for a 75-minute animated feature.",
        result: "Project advanced to financing stage with three territory partners attached.",
        mediaColor: "#0c2218",
      },
      {
        id: "film-festival-package",
        client: "Author-Directed Project",
        category: "Film & Entertainment · Festival Project",
        year: "2024",
        title: "Festival submission package and DCP delivery",
        description:
          "Final mastering, subtitle versions and festival submission assets for an auteur-led animated short.",
        result: "Delivered 6 language versions and DCP in under 10 days for premiere deadline.",
        mediaColor: "#071610",
      },
    ],
  },
  {
    slug: "social",
    pageTitle: "Social Selected Work",
    subtitle: "Fast-turnaround content for social platforms, live events and performance contexts.",
    cases: [
      {
        id: "social-content-pipeline",
        client: "Gaming Studio",
        category: "Performance & Social · Content Campaign",
        year: "2024",
        title: "Ongoing social content production",
        description:
          "Monthly content pipeline for social platforms — reels, shorts and motion ads. Consistent visual system across formats.",
        result: "48 assets delivered across 8 months. Average engagement +65% vs. previous creative.",
        mediaColor: "#1f0a0a",
      },
      {
        id: "social-event-visuals",
        client: "Live Entertainment Brand",
        category: "Performance & Social · Event Visuals",
        year: "2023",
        title: "Event opener and stage visual package",
        description:
          "Motion package for a product keynote — stage loops, speaker bumpers and social cut-downs from one production shoot.",
        result: "Used across main stage, livestream and 9 post-event social posts.",
        mediaColor: "#241010",
      },
      {
        id: "social-reels-campaign",
        client: "Consumer App",
        category: "Performance & Social · Reels Campaign",
        year: "2024",
        title: "Always-on reels and shorts campaign",
        description:
          "Twelve-week reels programme with weekly drops, trend-adapted formats and creator-friendly editable templates.",
        result: "Average view-through rate +54%. Follower growth +18% over campaign period.",
        mediaColor: "#1a0808",
      },
      {
        id: "social-motion-ads",
        client: "E-commerce Brand",
        category: "Performance & Social · Motion Ads",
        year: "2023",
        title: "Performance motion ad library",
        description:
          "Modular motion ad system for paid social — product, offer and seasonal variants with shared end-frame architecture.",
        result: "24 ad variants produced in 3 weeks. ROAS improved 27% on top-performing set.",
        mediaColor: "#200c0c",
      },
    ],
  },
];

export function getWorkCategory(slug: WorkCategorySlug): WorkCategory | undefined {
  return workCategories.find((category) => category.slug === slug);
}

/** Matches capability-work-link tone classes for page title color */
export const workCategoryTitleClass: Record<WorkCategorySlug, string> = {
  commercial: "work-page-title--commercial",
  gaming: "work-page-title--gaming",
  film: "work-page-title--film-entertainment",
  social: "work-page-title--performance-social",
};
