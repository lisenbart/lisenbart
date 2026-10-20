import type { RefObject } from "react";
import { useFilmReveal } from "@/hooks/useFilmReveal";

export default function StudioModelItem({
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
      <h3 className="studio-models__title">{title}</h3>
      <p className="studio-models__text">{text}</p>
    </li>
  );
}
