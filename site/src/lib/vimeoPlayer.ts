/** Minimal Vimeo Player API surface used for click→embed unmute. */
export type VimeoPlayer = {
  play: () => Promise<void>;
  setMuted: (muted: boolean) => Promise<void>;
};

type VimeoNamespace = {
  Player: new (el: HTMLIFrameElement) => VimeoPlayer;
};

declare global {
  interface Window {
    Vimeo?: VimeoNamespace;
  }
}

/** Load `player.js` once; safe to call from multiple embeds. */
export function loadVimeoPlayerApi(): Promise<void> {
  if (window.Vimeo?.Player) return Promise.resolve();

  return new Promise((resolve, reject) => {
    const existing = document.querySelector("script[data-vimeo-player]");
    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error("Vimeo API failed")), {
        once: true,
      });
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

/**
 * After a muted autoplay embed mounts (post–React setState), try unmute + play.
 * Muted autoplay already started from the iframe URL — unmute is best-effort.
 */
export async function unmuteVimeoIframe(iframe: HTMLIFrameElement): Promise<void> {
  await loadVimeoPlayerApi();
  if (!window.Vimeo?.Player) return;
  const player = new window.Vimeo.Player(iframe);
  try {
    await player.setMuted(false);
    await player.play();
  } catch {
    /* Browser may still block unmute; muted playback continues. */
  }
}
