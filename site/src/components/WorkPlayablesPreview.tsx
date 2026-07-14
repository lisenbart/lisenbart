import { useEffect, useId, useState } from "react";
import type { WorkPlayableTier } from "@/data/work";

interface WorkPlayablesPreviewProps {
  tiers: WorkPlayableTier[];
  title: string;
}

function playableBtnClass(kind: "tier" | "example", active: boolean): string {
  return `work-playables__btn work-playables__btn--${kind}${active ? " is-active" : ""}`;
}

export default function WorkPlayablesPreview({ tiers, title }: WorkPlayablesPreviewProps) {
  const baseId = useId();
  const complexityLabelId = `${baseId}-complexity`;
  const gameLabelId = `${baseId}-game`;
  const [tierId, setTierId] = useState(tiers[0]?.id ?? "");
  const [exampleIndex, setExampleIndex] = useState(0);

  const activeTier = tiers.find((tier) => tier.id === tierId) ?? tiers[0];
  const activeExample = activeTier?.examples[exampleIndex] ?? activeTier?.examples[0];

  useEffect(() => {
    setExampleIndex(0);
  }, [tierId]);

  if (!activeTier || !activeExample) {
    return null;
  }

  return (
    <div className="work-playables">
      <div className="work-playables__body">
        <div className="work-playables__player">
          <p className="work-playables__hint">
            <span className="work-playables__hint-action">Tap inside to play</span>
            <span className="work-playables__hint-meta">
              {activeTier.label} · {activeExample.label}
            </span>
          </p>

          <div className="work-playables__stage">
            <div className="work-playables__device" aria-hidden="true">
              <div className="work-playables__device-notch" />
            </div>
            <iframe
              key={activeExample.url}
              src={activeExample.url}
              title={`${title} — ${activeTier.label} — ${activeExample.label}`}
              className="work-playables__iframe"
              loading="lazy"
              allow="autoplay; fullscreen"
            />
          </div>
        </div>

        <aside className="work-playables__sidebar">
          <section className="work-playables__section work-playables__section--tiers">
            <p className="work-playables__section-label" id={complexityLabelId}>
              Complexity
            </p>
            <div
              className="work-playables__tiers"
              role="tablist"
              aria-labelledby={complexityLabelId}
            >
              {tiers.map((tier) => (
                <button
                  key={tier.id}
                  type="button"
                  role="tab"
                  aria-selected={tier.id === activeTier.id}
                  className={playableBtnClass("tier", tier.id === activeTier.id)}
                  onPointerUp={(event) => {
                    setTierId(tier.id);
                    event.currentTarget.blur();
                  }}
                >
                  {tier.label}
                </button>
              ))}
            </div>
          </section>

          <div className="work-playables__divider" aria-hidden="true">
            <span className="work-playables__divider-line" />
            <span className="work-playables__divider-label">Game</span>
            <span className="work-playables__divider-line" />
          </div>

          <section className="work-playables__section work-playables__section--examples">
            <p className="work-playables__section-label" id={gameLabelId}>
              Example title
            </p>
            <div
              className="work-playables__examples"
              role="tablist"
              aria-labelledby={gameLabelId}
            >
              {activeTier.examples.map((example, index) => (
                <button
                  key={`${activeTier.id}-${example.id}`}
                  type="button"
                  role="tab"
                  aria-selected={index === exampleIndex}
                  className={playableBtnClass("example", index === exampleIndex)}
                  onPointerUp={(event) => {
                    setExampleIndex(index);
                    event.currentTarget.blur();
                  }}
                >
                  {example.label}
                </button>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
