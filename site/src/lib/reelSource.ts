export type ReelProvider = "vimeo" | "youtube";

export type ReelSource = {
  provider: ReelProvider;
  id: string;
};

/** Accept a bare 11-char id or a full YouTube URL. */
export function parseYouTubeId(input: string): string | null {
  const trimmed = input.trim();
  if (/^[\w-]{11}$/.test(trimmed)) return trimmed;

  try {
    const url = new URL(trimmed);
    const host = url.hostname.replace(/^www\./, "");

    if (host === "youtu.be") {
      const id = url.pathname.split("/").filter(Boolean)[0];
      return id && /^[\w-]{11}$/.test(id) ? id : null;
    }

    if (host === "youtube.com" || host === "m.youtube.com" || host === "music.youtube.com") {
      const fromQuery = url.searchParams.get("v");
      if (fromQuery && /^[\w-]{11}$/.test(fromQuery)) return fromQuery;

      const match = url.pathname.match(/\/(?:embed|shorts|live)\/([\w-]{11})/);
      if (match) return match[1];
    }
  } catch {
    /* not a URL */
  }

  return null;
}

export function resolveReelSource(
  source?: string | ReelSource | null,
  fallbackVimeoId?: string | null,
): ReelSource | null {
  if (source && typeof source === "object") {
    return source.id ? source : null;
  }
  if (typeof source === "string" && source) {
    return { provider: "vimeo", id: source };
  }
  if (source === undefined && fallbackVimeoId) {
    return { provider: "vimeo", id: fallbackVimeoId };
  }
  return null;
}

export function reelEmbedSrc(source: ReelSource): string {
  if (source.provider === "youtube") {
    return `https://www.youtube-nocookie.com/embed/${source.id}?autoplay=1&rel=0&modestbranding=1`;
  }
  return `https://player.vimeo.com/video/${source.id}?autoplay=1&muted=0&title=0&byline=0&portrait=0`;
}

/**
 * YouTube poster URL.
 * Prefer sddefault/hqdefault — maxresdefault often 404s as a tiny placeholder
 * that still "loads", so onError never fires.
 */
export function youtubePosterSrc(
  videoId: string,
  quality: "sddefault" | "hqdefault" | "maxresdefault" = "sddefault",
) {
  return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
}
