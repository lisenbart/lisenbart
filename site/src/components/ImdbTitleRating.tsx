import { useEffect, useState } from "react";
import { fetchImdbRating, formatImdbRating } from "@/lib/imdbRating";

interface ImdbTitleRatingProps {
  imdbId: string;
}

function formatVoteCount(votes: number): string {
  return votes.toLocaleString("en-US");
}

export default function ImdbTitleRating({ imdbId }: ImdbTitleRatingProps) {
  const [rating, setRating] = useState<number | null>(null);
  const [votes, setVotes] = useState<number | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;

    fetchImdbRating(imdbId).then((data) => {
      if (cancelled) return;
      if (data?.rating != null) setRating(data.rating);
      if (data?.votes != null) setVotes(data.votes);
      setLoaded(true);
    });

    return () => {
      cancelled = true;
    };
  }, [imdbId]);

  const href = `https://www.imdb.com/title/${imdbId}/`;
  const ratingLabel =
    rating != null ? formatImdbRating(rating) : loaded ? "—" : "…";
  const votesLabel = votes != null ? formatVoteCount(votes) : loaded ? "—" : "…";

  return (
    <a
      href={href}
      className="imdb-title-badge"
      target="_blank"
      rel="noopener noreferrer"
      aria-label={
        rating != null && votes != null
          ? `IMDb rating ${formatImdbRating(rating)} from ${formatVoteCount(votes)} votes — open film page`
          : "IMDb — open film page"
      }
      title="View on IMDb"
    >
      <img
        src="/images/imdb-logo.svg"
        alt=""
        className="imdb-title-badge__logo"
        width={46}
        height={23}
        decoding="async"
      />
      <span
        className={`imdb-title-badge__rating${loaded && rating == null ? " imdb-title-badge__rating--empty" : ""}`}
      >
        <svg
          className="imdb-title-badge__star"
          viewBox="0 0 24 24"
          aria-hidden="true"
          focusable="false"
        >
          <path
            fill="currentColor"
            d="M12 2l2.89 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14l-5-4.87 7.11-1.01L12 2z"
          />
        </svg>
        <span className="imdb-title-badge__value">{ratingLabel}</span>
        <span className="imdb-title-badge__scale">/10</span>
        <span className="imdb-title-badge__votes">({votesLabel})</span>
      </span>
    </a>
  );
}
