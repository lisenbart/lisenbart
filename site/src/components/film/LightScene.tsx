export default function LightScene({
  variant = "hero",
}: {
  variant?: "hero" | "studio" | "contact";
}) {
  return (
    <div className={`light-scene ${variant}`} aria-hidden="true">
      <span className="scene-orb scene-orb-a" />
      <span className="scene-orb scene-orb-b" />
      <span className="scene-glow" />
    </div>
  );
}
