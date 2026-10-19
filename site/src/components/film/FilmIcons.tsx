export function Arrow({ direction = "right" }: { direction?: "right" | "down" }) {
  return (
    <svg
      className={`arrow-icon ${direction === "down" ? "arrow-down" : ""}`}
      viewBox="0 0 30 30"
      aria-hidden="true"
    >
      <path d="M5 15h19M17 8l7 7-7 7" />
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
