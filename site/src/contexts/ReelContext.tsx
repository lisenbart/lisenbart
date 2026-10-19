import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import ReelModal from "@/components/film/ReelModal";
import { site } from "@/data/site";

type ReelContextValue = {
  openReel: (vimeoId?: string | null, title?: string) => void;
};

const ReelContext = createContext<ReelContextValue | null>(null);

const DEFAULT_ID = site.selectedWork.vimeoId;

export function ReelProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [vimeoId, setVimeoId] = useState<string | null>(DEFAULT_ID);
  const [title, setTitle] = useState("Showreel");

  const openReel = useCallback((id?: string | null, reelTitle?: string) => {
    setVimeoId(id === undefined ? DEFAULT_ID : id);
    setTitle(reelTitle ?? "Showreel");
    setOpen(true);
  }, []);

  const value = useMemo(() => ({ openReel }), [openReel]);

  return (
    <ReelContext.Provider value={value}>
      {children}
      <ReelModal open={open} close={() => setOpen(false)} vimeoId={vimeoId} title={title} />
    </ReelContext.Provider>
  );
}

export function useReel() {
  const ctx = useContext(ReelContext);
  if (!ctx) throw new Error("useReel must be used within ReelProvider");
  return ctx;
}
