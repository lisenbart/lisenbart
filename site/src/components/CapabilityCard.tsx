import type { CapabilityItem } from "@/data/capabilities";
import { workSectionHref } from "@/lib/routes";
import { publicAsset } from "@/lib/publicAsset";

interface CapabilityCardProps {
  item: CapabilityItem;
}

export default function CapabilityCard({ item }: CapabilityCardProps) {
  return (
    <li className="capability-card">
      <div className="capability-media">
        <img
          src={publicAsset(item.image)}
          alt=""
          className="capability-image"
          loading="lazy"
        />
        <div className="capability-scrim" aria-hidden="true" />
        <h3 className="capability-title">{item.title}</h3>
        <a
          href={workSectionHref(item.workAnchor)}
          className={`capability-work-link capability-work-link--${item.id} btn-on-accent`}
        >
          {item.workLinkLabel}
        </a>
      </div>

      <div className="capability-body">
        <p className="capability-description">{item.description}</p>
        <ul className="capability-formats" aria-label={`${item.title} formats`}>
          {item.formats.map((format) => (
            <li key={format} className="capability-format-tag">
              {format}
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}
