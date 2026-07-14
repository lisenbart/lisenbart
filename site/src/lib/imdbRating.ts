export interface ImdbRating {
  imdbId: string;
  rating: number | null;
  votes: number | null;
}

const cache = new Map<string, ImdbRating>();

export async function fetchImdbRating(imdbId: string): Promise<ImdbRating | null> {
  const cached = cache.get(imdbId);
  if (cached) return cached;

  try {
    const response = await fetch(
      `https://api.agregarr.org/api/ratings?id=${encodeURIComponent(imdbId)}`,
    );
    if (!response.ok) return null;

    const data: unknown = await response.json();
    if (!Array.isArray(data) || data.length === 0) return null;

    const entry = data[0] as { imdbId?: string; rating?: number | null; votes?: number | null };
    const result: ImdbRating = {
      imdbId: entry.imdbId ?? imdbId,
      rating: entry.rating ?? null,
      votes: entry.votes ?? null,
    };

    cache.set(imdbId, result);
    return result;
  } catch {
    return null;
  }
}

export function formatImdbRating(rating: number): string {
  return Number.isInteger(rating) ? `${rating}.0` : String(rating);
}
