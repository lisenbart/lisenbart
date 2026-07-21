import { useEffect } from "react";
import { applyTheme } from "@/lib/theme";

/** Light-only site — keeps document theme locked to light. */
export function useTheme() {
  useEffect(() => {
    applyTheme("light");
  }, []);

  return { theme: "light" as const, toggleTheme: () => undefined };
}
