import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

const VIMEO_SRC =
  "https://player.vimeo.com/video/849899875?autoplay=1&loop=1&muted=1&playsinline=1&title=0&byline=0&portrait=0&controls=0&autopause=0&background=1";

function loadVimeoPlayerApi(): Promise<void> {
  if ((window as Window & { Vimeo?: { Player: unknown } }).Vimeo?.Player) {
    return Promise.resolve();
  }
  return new Promise((resolve, reject) => {
    const existing = document.querySelector('script[data-vimeo-player]');
    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error("Vimeo API failed")), { once: true });
      return;
    }
    const script = document.createElement("script");
    script.src = "https://player.vimeo.com/api/player.js";
    script.defer = true;
    script.dataset.vimeoPlayer = "1";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Vimeo API failed"));
    document.body.appendChild(script);
  });
}

export default function HeroShowreel() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [muted, setMuted] = useState(true);
  const playerRef = useRef<{
    setVolume: (v: number) => Promise<void>;
    setMuted: (m: boolean) => Promise<void>;
    play: () => Promise<void>;
  } | null>(null);

  useEffect(() => {
    let cancelled = false;
    void loadVimeoPlayerApi()
      .then(() => {
        if (cancelled || !iframeRef.current) return;
        const Vimeo = (
          window as Window & {
            Vimeo: {
              Player: new (el: HTMLIFrameElement) => typeof playerRef.current;
            };
          }
        ).Vimeo;
        playerRef.current = new Vimeo.Player(iframeRef.current);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  async function toggleSound() {
    const player = playerRef.current;
    if (!player) return;
    const nextMuted = !muted;
    try {
      await player.setMuted(nextMuted);
      if (!nextMuted) {
        await player.setVolume(0.7);
        await player.play();
      }
      setMuted(nextMuted);
    } catch {
      /* ignore */
    }
  }

  return (
    <div className="hero-showreel absolute inset-0 overflow-hidden">
      <iframe
        ref={iframeRef}
        src={VIMEO_SRC}
        title="LISENBART showreel"
        allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
        allowFullScreen
        className="hero-showreel__iframe absolute pointer-events-none"
        style={{ border: 0 }}
        loading="eager"
        tabIndex={-1}
      />
      <button
        type="button"
        onClick={() => void toggleSound()}
        aria-label={muted ? "Unmute showreel" : "Mute showreel"}
        className="hero-showreel__mute absolute z-20 flex items-center justify-center transition-all duration-200"
        style={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.25)",
          background: "rgba(0,0,0,0.45)",
          backdropFilter: "blur(8px)",
          color: "white",
        }}
      >
        {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
      </button>
    </div>
  );
}
