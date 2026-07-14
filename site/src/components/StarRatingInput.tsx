import { Star } from "lucide-react";

interface StarRatingInputProps {
  value: number;
  onChange: (value: number) => void;
  label: string;
  skipLabel: string;
}

export default function StarRatingInput({
  value,
  onChange,
  label,
  skipLabel,
}: StarRatingInputProps) {
  return (
    <div className="testimonial-rating-input">
      <div className="testimonial-rating-input-head">
        <span className="inquiry-label">{label}</span>
        <button
          type="button"
          className="testimonial-rating-skip"
          onClick={() => onChange(0)}
          aria-pressed={value === 0}
        >
          {skipLabel}
        </button>
      </div>
      <div className="testimonial-rating-stars" role="group" aria-label={label}>
        {Array.from({ length: 5 }, (_, index) => {
          const starValue = index + 1;
          const active = starValue <= value;

          return (
            <button
              key={starValue}
              type="button"
              className={`testimonial-rating-star-btn${active ? " is-active" : ""}`}
              onClick={() => onChange(starValue)}
              aria-label={`${starValue} star${starValue === 1 ? "" : "s"}`}
              aria-pressed={active}
            >
              <Star
                className="testimonial-rating-star-icon"
                size={22}
                strokeWidth={1.65}
                fill={active ? "currentColor" : "none"}
                aria-hidden="true"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
