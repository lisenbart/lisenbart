import type { RefObject } from "react";
import { useFilmReveal } from "@/hooks/useFilmReveal";

export default function FilmCapabilityItem({
  title,
  text,
  delayMs = 0,
}: {
  title: string;
  text: string;
  delayMs?: number;
}) {
  const { ref, className, style } = useFilmReveal<HTMLLIElement>(delayMs);

  return (
    <li ref={ref as RefObject<HTMLLIElement>} className={className} style={style}>
      <h2 className="film-capabilities__title">{title}</h2>
      <p className="film-capabilities__text">{text}</p>
    </li>
  );
}
