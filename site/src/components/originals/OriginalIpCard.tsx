import OriginalIpPhones from "@/components/originals/OriginalIpPhones";
import type { WorkCaseStudy } from "@/data/work";
import { publicAsset } from "@/lib/publicAsset";

interface OriginalIpCardProps {
  item: WorkCaseStudy;
}

function splitDescription(description: string) {
  if (!description.includes("\n")) {
    return { stats: "", blurb: description.trim() };
  }
  const [first = "", ...rest] = description.split("\n");
  return {
    stats: first.trim(),
    blurb: rest.join("\n").trim(),
  };
}

/** Preschool IP — three phone previews + copy. */
export default function OriginalIpCard({ item }: OriginalIpCardProps) {
  const meta = item.filmCategory ?? item.category;
  const { stats, blurb } = splitDescription(item.description);

  return (
    <section id={item.id} className="originals-case originals-case--ip">
      <OriginalIpPhones item={item} />

      <div className="originals-case__copy">
        <div className="originals-case__intro originals-ip-intro">
          {item.mediaImage && (
            <img
              className="originals-ip-avatar"
              src={publicAsset(item.mediaImage)}
              alt=""
              width={72}
              height={72}
              loading="lazy"
              decoding="async"
            />
          )}
          <div className="originals-ip-intro__text">
            <h3 className="originals-case__title">{item.title}</h3>
            {meta && <p className="originals-case__meta">{meta}</p>}
          </div>
        </div>

        <div className="originals-case__body">
          {stats && <div className="originals-case__status">{stats}</div>}
          {blurb && <div className="originals-case__synopsis">{blurb}</div>}
          {item.result?.trim() && <div className="originals-case__synopsis">{item.result}</div>}
        </div>
      </div>
    </section>
  );
}
