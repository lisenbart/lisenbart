import type { RefObject } from "react";
import { useFilmReveal } from "@/hooks/useFilmReveal";
import { publicAsset } from "@/lib/publicAsset";

export default function StudioModelItem({
  title,
  team,
  text,
  href,
  image,
  imageAlt = "",
  delayMs = 0,
}: {
  title: string;
  /** Secondary team signature under the direction title */
  team?: string;
  text: string;
  href?: string;
  image?: string;
  imageAlt?: string;
  delayMs?: number;
}) {
  const { ref, className, style } = useFilmReveal<HTMLLIElement>(delayMs);

  const body = (
    <>
      {image ? (
        <span className="studio-team-card__media">
          <img
            src={publicAsset(image)}
            alt={imageAlt}
            width={640}
            height={360}
            loading="lazy"
            decoding="async"
          />
        </span>
      ) : null}
      <h3 className="studio-models__title">{title}</h3>
      {team ? <p className="studio-models__team">{team}</p> : null}
      <p className="studio-models__text">{text}</p>
    </>
  );

  return (
    <li
      ref={ref as RefObject<HTMLLIElement>}
      className={[className, href ? "studio-team-card" : null].filter(Boolean).join(" ")}
      style={style}
    >
      {href ? (
        <a className="studio-team-card__link" href={href}>
          {body}
        </a>
      ) : (
        body
      )}
    </li>
  );
}
