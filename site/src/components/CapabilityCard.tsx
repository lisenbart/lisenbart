import { useRef, useState, type MouseEvent } from "react";
import { AnimatePresence } from "framer-motion";
import { Play } from "lucide-react";
import type { CapabilityItem } from "@/data/capabilities";
import { workSectionHref } from "@/lib/routes";
import { publicAsset } from "@/lib/publicAsset";
import CapabilityShowreelPopover from "./CapabilityShowreelPopover";

interface CapabilityCardProps {
  item: CapabilityItem;
}

interface ClickPoint {
  x: number;
  y: number;
}

export default function CapabilityCard({ item }: CapabilityCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [clickPoint, setClickPoint] = useState<ClickPoint | null>(null);
  const anchorRef = useRef<HTMLDivElement>(null);
  const hasShowreel = Boolean(item.showreelSrc);

  const handlePreviewClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (hasShowreel) return;
    setClickPoint({ x: event.clientX, y: event.clientY });
    setMenuOpen(true);
  };

  const closeMenu = () => {
    setMenuOpen(false);
    setClickPoint(null);
  };

  return (
    <li className={`capability-card${menuOpen ? " capability-card--showreel-open" : ""}`}>
      <div
        ref={anchorRef}
        className={`capability-showreel-anchor${menuOpen ? " capability-showreel-anchor--open" : ""}`}
      >
        <button
          type="button"
          className={`capability-media${hasShowreel ? "" : " capability-media--interactive"}`}
          onClick={handlePreviewClick}
          disabled={hasShowreel}
          aria-expanded={menuOpen ? true : undefined}
          aria-haspopup={hasShowreel ? undefined : "dialog"}
          aria-label={hasShowreel ? `${item.title} showreel` : `Preview ${item.title} showreel`}
        >
          <img
            src={publicAsset(item.image)}
            alt=""
            className="capability-image"
            loading="lazy"
          />
          <div className="capability-scrim" aria-hidden="true" />
          <span className="showreel-stage-play capability-play" aria-hidden="true">
            <Play className="showreel-stage-play-icon" strokeWidth={1.75} fill="currentColor" />
          </span>
          <h3 className="capability-title">{item.title}</h3>
        </button>
      </div>

      <div className="capability-body">
        <div className="capability-intro">
          <p className="capability-description">{item.description}</p>
          <a
            href={workSectionHref(item.workAnchor)}
            className={`capability-work-link capability-work-link--${item.id} btn-on-accent`}
          >
            {item.workLinkLabel}
          </a>
        </div>
        <ul className="capability-formats" aria-label={`${item.title} formats`}>
          {item.formats.map((format) => (
            <li key={format} className="capability-format-tag">
              {format}
            </li>
          ))}
        </ul>
      </div>

      <AnimatePresence>
        {menuOpen && clickPoint && (
          <CapabilityShowreelPopover
            categoryTitle={item.title}
            clickPoint={clickPoint}
            rootRef={anchorRef}
            onClose={closeMenu}
          />
        )}
      </AnimatePresence>
    </li>
  );
}
