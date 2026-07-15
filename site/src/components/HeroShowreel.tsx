import { useEffect, useRef, useState } from "react";
import { Maximize2, Minimize2, Pause, Play, Send, Volume2, VolumeX } from "lucide-react";
import { site } from "@/data/site";

const VIMEO_ID = "849899875";
const VIMEO_BASE =
  "title=0&byline=0&portrait=0&controls=0&autopause=0&vimeo_logo=0&badge=0&pip=0&dnt=1&playsinline=1";
const VIMEO_SRC = `https://player.vimeo.com/video/${VIMEO_ID}?autoplay=0&loop=1&muted=0&${VIMEO_BASE}`;
const VIMEO_POSTER_SRC = `https://player.vimeo.com/video/${VIMEO_ID}?autoplay=1&loop=1&muted=1&background=1&${VIMEO_BASE}`;
const SHOWREEL_SHARE_URL = site.vimeo;

interface HeroShowreelProps {
  variant?: "interactive" | "poster";
}

type VimeoPlayer = {
  play: () => Promise<void>;
  pause: () => Promise<void>;
  setVolume: (v: number) => Promise<void>;
  setMuted: (m: boolean) => Promise<void>;
  getMuted: () => Promise<boolean>;
  getFullscreen: () => Promise<boolean>;
  requestFullscreen: () => Promise<void>;
  exitFullscreen: () => Promise<void>;
  on: (event: string, callback: (data?: { fullscreen?: boolean }) => void) => void;
};

function loadVimeoPlayerApi(): Promise<void> {
  if ((window as Window & { Vimeo?: { Player: unknown } }).Vimeo?.Player) {
    return Promise.resolve();
  }
  return new Promise((resolve, reject) => {
    const existing = document.querySelector("script[data-vimeo-player]");
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

function canUseWebShare(data: ShareData) {
  if (typeof navigator.share !== "function") return false;
  if (typeof navigator.canShare === "function") {
    return navigator.canShare(data);
  }
  return true;
}

export default function HeroShowreel({ variant = "interactive" }: HeroShowreelProps) {
  const isPoster = variant === "poster";
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const playerRef = useRef<VimeoPlayer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [playerReady, setPlayerReady] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const iframe = iframeRef.current;
    if (!iframe) return;

    const initPlayer = () => {
      setPlayerReady(false);
      playerRef.current = null;

      void loadVimeoPlayerApi()
        .then(() => {
          if (cancelled || !iframeRef.current) return;
          const Vimeo = (
            window as Window & {
              Vimeo: { Player: new (el: HTMLIFrameElement) => VimeoPlayer };
            }
          ).Vimeo;
          const player = new Vimeo.Player(iframeRef.current);
          playerRef.current = player;

          player.on("volumechange", () => {
            void player.getMuted().then((isMuted) => {
              if (!cancelled) setMuted(isMuted);
            });
          });

          player.on("pause", () => {
            if (!cancelled) setIsPlaying(false);
          });

          player.on("play", () => {
            if (!cancelled) setIsPlaying(true);
          });

          player.on("fullscreenchange", (data) => {
            if (!cancelled) setIsFullscreen(Boolean(data?.fullscreen));
          });

          setPlayerReady(true);

          if (isPoster) {
            void player.setMuted(true).then(() => player.play()).then(() => {
              if (!cancelled) setIsPlaying(true);
            }).catch(() => {});
          }
        })
        .catch(() => {});
    };

    iframe.addEventListener("load", initPlayer);
    initPlayer();

    return () => {
      cancelled = true;
      iframe.removeEventListener("load", initPlayer);
    };
  }, [isPoster]);

  useEffect(() => {
    const onFullscreenChange = () => {
      if (document.fullscreenElement === containerRef.current) {
        setIsFullscreen(true);
      } else if (!playerRef.current) {
        setIsFullscreen(false);
      }
    };
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  async function syncMutedState() {
    const player = playerRef.current;
    if (!player) return;
    try {
      setMuted(await player.getMuted());
    } catch {
      /* ignore */
    }
  }

  async function handlePlay() {
    const player = playerRef.current;
    if (!player) return;
    try {
      await player.setMuted(true);
      await player.play();
      setIsPlaying(true);
      setMuted(true);
    } catch {
      /* ignore */
    }
  }

  async function handlePause() {
    const player = playerRef.current;
    if (!player) return;
    try {
      await player.pause();
      setIsPlaying(false);
    } catch {
      /* ignore */
    }
  }

  async function toggleSound() {
    const player = playerRef.current;
    if (!player) return;
    try {
      const currentlyMuted = await player.getMuted();
      const nextMuted = !currentlyMuted;
      await player.setMuted(nextMuted);
      if (!nextMuted) {
        await player.setVolume(0.7);
      }
      await syncMutedState();
    } catch {
      /* ignore */
    }
  }

  async function toggleFullscreen() {
    const player = playerRef.current;
    if (!player) return;

    try {
      const inFullscreen = await player.getFullscreen();
      if (inFullscreen) {
        await player.exitFullscreen();
      } else {
        await player.requestFullscreen();
      }
      setIsFullscreen(!inFullscreen);
      return;
    } catch {
      /* fall through */
    }

    const container = containerRef.current;
    if (!container) return;
    try {
      if (document.fullscreenElement === container) {
        await document.exitFullscreen();
        setIsFullscreen(false);
      } else {
        await container.requestFullscreen();
        setIsFullscreen(true);
      }
    } catch {
      /* ignore */
    }
  }

  async function handleShare() {
    const sharePayloads: ShareData[] = [
      {
        title: "LISENBART Showreel",
        text: "LISENBART showreel",
        url: SHOWREEL_SHARE_URL,
      },
      { url: SHOWREEL_SHARE_URL },
      { title: "LISENBART Showreel", url: SHOWREEL_SHARE_URL },
    ];

    for (const payload of sharePayloads) {
      if (!canUseWebShare(payload)) continue;
      try {
        await navigator.share(payload);
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }
      }
    }
  }

  return (
    <div ref={containerRef} className="hero-showreel group absolute inset-0 overflow-hidden">
      <iframe
        ref={iframeRef}
        src={isPoster ? VIMEO_POSTER_SRC : VIMEO_SRC}
        title="LISENBART showreel"
        allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
        allowFullScreen
        className="hero-showreel__iframe absolute pointer-events-none"
        style={{ border: 0 }}
        loading="eager"
        tabIndex={-1}
      />

      {!isPoster && !isPlaying && (
        <button
          type="button"
          onClick={() => void handlePlay()}
          disabled={!playerReady}
          aria-label="Play showreel"
          className="showreel-stage-play hero-showreel__play"
        >
          <Play className="showreel-stage-play-icon" strokeWidth={1.75} fill="currentColor" />
        </button>
      )}

      {!isPoster && playerReady && (
        <div
          className={`hero-showreel__controls absolute z-20 flex items-center gap-2${isPlaying ? " hero-showreel__controls--active" : ""}`}
        >
          {isPlaying && (
            <>
              <button
                type="button"
                onClick={() => void handlePause()}
                aria-label="Pause showreel"
                className="hero-showreel__control"
              >
                <Pause size={16} />
              </button>
              <button
                type="button"
                onClick={() => void toggleSound()}
                aria-label={muted ? "Unmute showreel" : "Mute showreel"}
                className="hero-showreel__control"
              >
                {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </button>
              <button
                type="button"
                onClick={() => void toggleFullscreen()}
                aria-label={isFullscreen ? "Exit fullscreen" : "Fullscreen showreel"}
                className="hero-showreel__control"
              >
                {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
              </button>
            </>
          )}
          <button
            type="button"
            onClick={() => void handleShare()}
            aria-label="Share showreel"
            className="hero-showreel__control"
          >
            <Send size={16} strokeWidth={1.75} />
          </button>
        </div>
      )}
    </div>
  );
}
