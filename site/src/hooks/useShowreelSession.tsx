import { useEffect, type Dispatch, type SetStateAction } from "react";
import ShowreelCloseButton from "@/components/film/ShowreelCloseButton";

/** Escape-to-close + portaled Close while an inline/modal showreel session is active. */
export function useShowreelSession(
  active: boolean,
  setActive: Dispatch<SetStateAction<boolean>> | ((next: boolean) => void),
) {
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [active, setActive]);

  return active ? <ShowreelCloseButton onClose={() => setActive(false)} /> : null;
}
