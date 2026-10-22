import { useEffect, useState } from "react";

/** Subscribe to a CSS media query. Defaults to `false` before mount. */
export function useMatchMedia(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(query);
    const sync = () => setMatches(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [query]);

  return matches;
}

/** Site narrow breakpoint — matches film-identity mobile styles. */
export function useIsNarrowViewport() {
  return useMatchMedia("(max-width: 800px)");
}
