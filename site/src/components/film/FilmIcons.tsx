/** Explicit chevron used in CTAs (right by default; rotate for down). */
export function Arrow({ direction = "right" }: { direction?: "right" | "down" }) {
  return (
    <svg
      className={`arrow-icon arrow-icon--chevron ${direction === "down" ? "arrow-down" : ""}`}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="m9 6 6 6-6 6" />
    </svg>
  );
}

export function PlayIcon() {
  return (
    <svg className="play-icon" viewBox="0 0 32 32" aria-hidden="true">
      <path d="m12 9 11 7-11 7Z" />
    </svg>
  );
}
