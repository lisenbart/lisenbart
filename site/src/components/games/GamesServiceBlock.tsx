import type { ReactNode } from "react";
import FilmReveal from "@/components/film/FilmReveal";

export type GamesServiceTone = "production" | "playables" | "development";

export default function GamesServiceBlock({
  titleId,
  title,
  text,
  note,
  railLabel,
  density = "video",
  tone,
  children,
}: {
  titleId: string;
  title: string;
  text: string;
  /** Delivery / timing line under the description. */
  note?: string;
  railLabel: string;
  /** `icons` = playable phone thumbs. */
  density?: "video" | "icons";
  tone: GamesServiceTone;
  children: ReactNode;
}) {
  return (
    <section
      className={[
        "studio-section",
        "games-service",
        `games-service--${tone}`,
        density === "icons" ? "games-service--icons" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      aria-labelledby={titleId}
    >
      <FilmReveal>
        <div className="games-service__copy">
          <h3 id={titleId} className="studio-models__title">
            {title}
          </h3>
          <p className="studio-models__text">{text}</p>
          {note ? <p className="games-service__note">{note}</p> : null}
        </div>
      </FilmReveal>

      <div className="games-service__media">
        <div className="games-service__rail" role="list" aria-label={railLabel}>
          {children}
        </div>
      </div>
    </section>
  );
}
