import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import ReelModal from "@/components/film/ReelModal";
import { site } from "@/data/site";
import { resolveReelSource, type ReelSource } from "@/lib/reelSource";

type ReelContextValue = {
  /** Pass a Vimeo id string (legacy) or `{ provider, id }` for Vimeo/YouTube. */
  openReel: (source?: string | ReelSource | null, title?: string) => void;
};

const ReelContext = createContext<ReelContextValue | null>(null);

const DEFAULT_ID = site.selectedWork.vimeoId;

export function ReelProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [source, setSource] = useState<ReelSource | null>(() =>
    resolveReelSource(undefined, DEFAULT_ID),
  );
  const [title, setTitle] = useState("Showreel");

  const openReel = useCallback((next?: string | ReelSource | null, reelTitle?: string) => {
    setSource(resolveReelSource(next, DEFAULT_ID));
    setTitle(reelTitle ?? "Showreel");
    setOpen(true);
  }, []);

  const value = useMemo(() => ({ openReel }), [openReel]);

  return (
    <ReelContext.Provider value={value}>
      {children}
      <ReelModal open={open} close={() => setOpen(false)} source={source} title={title} />
    </ReelContext.Provider>
  );
}

export function useReel() {
  const ctx = useContext(ReelContext);
  if (!ctx) throw new Error("useReel must be used within ReelProvider");
  return ctx;
}
