import { useLayoutEffect, useRef, useState, type KeyboardEvent, type MouseEvent } from "react";
import { Star } from "lucide-react";
import type { Testimonial } from "@/data/testimonials";

interface TestimonialCardProps {
  item: Testimonial;
  onRead?: (item: Testimonial, event: MouseEvent<HTMLElement>) => void;
}

function TestimonialStars({ rating }: { rating?: number }) {
  if (!rating || rating <= 0) return null;

  return (
    <div className="testimonial-stars" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: rating }, (_, index) => (
        <Star
          key={index}
          className="testimonial-star"
          size={13}
          strokeWidth={1.75}
          fill="currentColor"
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

export default function TestimonialCard({ item, onRead }: TestimonialCardProps) {
  const quoteRef = useRef<HTMLParagraphElement>(null);
  const [isClamped, setIsClamped] = useState(false);
  const isConfirmed = item.confirmed === true;

  useLayoutEffect(() => {
    const quote = quoteRef.current;
    if (!quote) return;

    const check = () => {
      setIsClamped(quote.scrollHeight > quote.clientHeight + 1);
    };

    check();
    const observer = new ResizeObserver(check);
    observer.observe(quote);
    return () => observer.disconnect();
  }, [item.quote]);

  const handleOpen = (event: MouseEvent<HTMLElement>) => {
    if (!isConfirmed || !isClamped || !onRead) return;
    onRead(item, event);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (!isConfirmed || !isClamped || !onRead) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onRead(item, event as unknown as MouseEvent<HTMLElement>);
    }
  };

  return (
    <figure
      className={`testimonial-card${isConfirmed && isClamped ? " testimonial-card--expandable" : ""}${!isConfirmed ? " testimonial-card--pending" : ""}`}
      onClick={isConfirmed && isClamped ? handleOpen : undefined}
      onKeyDown={isConfirmed && isClamped ? handleKeyDown : undefined}
      role={isConfirmed && isClamped ? "button" : undefined}
      tabIndex={isConfirmed && isClamped ? 0 : undefined}
      aria-label={
        isConfirmed && isClamped
          ? `Read full review from ${item.name}, ${item.company}`
          : !isConfirmed
            ? "Review pending approval"
            : undefined
      }
      aria-disabled={!isConfirmed ? true : undefined}
    >
      <TestimonialStars rating={item.rating} />
      <p className="testimonial-client">{item.company}</p>
      <blockquote className="testimonial-quote">
        <p ref={quoteRef} className="testimonial-quote-text">
          &ldquo;{item.quote}&rdquo;
        </p>
      </blockquote>
      <figcaption className="testimonial-attribution">
        <span className="testimonial-name">{item.name}</span>
      </figcaption>
      {isClamped && <span className="testimonial-read-hint">Tap to read full review</span>}
    </figure>
  );
}
