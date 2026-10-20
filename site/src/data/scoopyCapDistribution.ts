/**
 * Scoopy Cap — platform / channel reach (project-level only).
 *
 * Not studio-wide distribution partners. Do not invent content URLs,
 * subscriber counts, or Amazon/Roku service placement beyond the supplied list.
 */

export type ScoopyCapPlatform = {
  id: string;
  /** Public-facing display name. */
  name: string;
  /**
   * channel = owned social / YouTube presence
   * platform = named kids/AVOD service or catalog
   * ecosystem = broad store/ecosystem (Amazon, Roku) — no specific channel claimed
   */
  category: "channel" | "platform" | "ecosystem";
  /** Official platform homepage if known — never used as Scoopy Cap deep-link proof. */
  officialUrl: string | null;
  /** Direct Scoopy Cap title/channel URL — only when verified. */
  contentUrl: string | null;
  nameVerified: boolean;
  published: boolean;
};

export const scoopyCapDistribution = {
  projectId: "scoopy-cap" as const,

  /** Kept separate from the core project blurb in work.ts. */
  reachNote:
    "Scoopy Cap is an original preschool animation and learning IP distributed across a growing network of digital and connected-TV platforms.",

  platformsHeading: "Distribution & Platforms",

  /**
   * Studio-supplied platform names may appear when true.
   * Content URLs stay null until individually verified.
   */
  sectionPublished: true as boolean,

  platforms: [
    {
      id: "youtube",
      name: "YouTube",
      category: "channel",
      officialUrl: "https://www.youtube.com",
      contentUrl: "https://www.youtube.com/@ScoopyCap",
      nameVerified: true,
      published: true,
    },
    {
      id: "youtube-kids",
      name: "YouTube Kids",
      category: "platform",
      officialUrl: "https://www.youtubekids.com",
      contentUrl: null,
      nameVerified: true,
      published: true,
    },
    {
      id: "batterypop",
      name: "batteryPOP",
      category: "platform",
      officialUrl: null,
      contentUrl: null,
      nameVerified: true,
      published: true,
    },
    {
      id: "overdrive",
      name: "Overdrive",
      category: "platform",
      officialUrl: null,
      contentUrl: null,
      nameVerified: false,
      published: true,
    },
    {
      id: "plex",
      name: "Plex",
      category: "platform",
      officialUrl: null,
      contentUrl: null,
      nameVerified: true,
      published: true,
    },
    {
      id: "24flix",
      name: "24Flix",
      category: "platform",
      officialUrl: null,
      contentUrl: null,
      nameVerified: false,
      published: true,
    },
    {
      id: "amebatv",
      name: "AmebaTV",
      category: "platform",
      officialUrl: null,
      contentUrl: null,
      nameVerified: true,
      published: true,
    },
    {
      id: "cocorotv",
      name: "CoCoRoTV",
      category: "platform",
      officialUrl: null,
      contentUrl: null,
      nameVerified: false,
      published: true,
    },
    {
      id: "futuretoday",
      name: "FutureToday",
      category: "platform",
      officialUrl: null,
      contentUrl: null,
      nameVerified: false,
      published: true,
    },
    {
      id: "highbrow",
      name: "HighBrow",
      category: "platform",
      officialUrl: null,
      contentUrl: null,
      nameVerified: false,
      published: true,
    },
    {
      id: "amazon",
      name: "Amazon",
      category: "ecosystem",
      officialUrl: null,
      contentUrl: null,
      nameVerified: true,
      published: true,
    },
    {
      id: "kidoodletv",
      name: "Kidoodle.TV",
      category: "platform",
      officialUrl: null,
      contentUrl: null,
      nameVerified: true,
      published: true,
    },
    {
      id: "roku",
      name: "Roku",
      category: "ecosystem",
      officialUrl: null,
      contentUrl: null,
      nameVerified: true,
      published: true,
    },
    {
      id: "tiktok",
      name: "TikTok",
      category: "channel",
      officialUrl: "https://www.tiktok.com",
      contentUrl: "https://www.tiktok.com/@scoopycap",
      nameVerified: true,
      published: true,
    },
    {
      id: "instagram",
      name: "Instagram",
      category: "channel",
      officialUrl: "https://www.instagram.com",
      contentUrl: "https://www.instagram.com/scoopycap/",
      nameVerified: true,
      published: true,
    },
  ] satisfies ScoopyCapPlatform[],
} as const;

function isPreviewContext(): boolean {
  if (import.meta.env.DEV) return true;
  return import.meta.env.VITE_LEGAL_PREVIEW === "true";
}

export function scoopyCapPlatformsForDisplay(): ScoopyCapPlatform[] {
  const { sectionPublished, platforms } = scoopyCapDistribution;
  if (!sectionPublished && !isPreviewContext()) return [];
  return platforms.filter((p) => p.published);
}
