import { site } from "@/data/site";

type ClientNameListProps = {
  names: readonly string[];
  className?: string;
  "aria-label"?: string;
};

/** Curated client names + trailing “and others” so the list never reads as exhaustive. */
export default function ClientNameList({
  names,
  className = "client-names",
  "aria-label": ariaLabel,
}: ClientNameListProps) {
  return (
    <div className={className} aria-label={ariaLabel}>
      {names.map((name) => (
        <span key={name}>{name}</span>
      ))}
      <span className="client-names__etc">{site.trustedBy.andOthers}</span>
    </div>
  );
}
