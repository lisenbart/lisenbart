import type { WorkCaseStudy } from "@/data/work";

interface WorkCaseBlockProps {
  item: WorkCaseStudy;
  mediaSide: "left" | "right";
  bordered?: boolean;
}

function WorkBlockMedia({ color }: { color: string }) {
  return (
    <div
      className="work-block-media"
      style={{ backgroundColor: color }}
      role="img"
      aria-label="Case media coming soon"
    >
      <span className="work-block-media-label" aria-hidden="true">
        COMING SOON
      </span>
    </div>
  );
}

export default function WorkCaseBlock({ item, mediaSide, bordered = false }: WorkCaseBlockProps) {
  return (
    <article
      id={item.id}
      className={`work-block work-block--media-${mediaSide}${bordered ? " work-block--bordered" : ""}`}
      aria-labelledby={`work-block-title-${item.id}`}
    >
      <div className="work-block-inner">
        <WorkBlockMedia color={item.mediaColor} />
        <div className="work-block-copy">
          <p className="work-block-meta">
            <span>{item.client}</span>
            <span className="work-block-meta-sep" aria-hidden="true">
              ·
            </span>
            <span>{item.category}</span>
            <span className="work-block-meta-sep" aria-hidden="true">
              ·
            </span>
            <span>{item.year}</span>
          </p>
          <h2 id={`work-block-title-${item.id}`} className="work-block-title">
            {item.title}
          </h2>
          <p className="work-block-description">{item.description}</p>
          <p className="work-block-result">
            <span className="work-block-result-label">Result</span>
            {item.result}
          </p>
        </div>
      </div>
    </article>
  );
}
