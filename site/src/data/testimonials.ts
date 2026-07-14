export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  company: string;
  rating?: number;
  /** Visible without moderation blur — expand as reviews are approved */
  confirmed?: boolean;
};

/** Temporary client quotes for layout preview — replace with real testimonials (max 10). */
export const testimonials: Testimonial[] = [
  {
    id: "playtika-lena-feldman",
    quote:
      "A reliable production partner for over 6 years. We keep coming back — and we're never disappointed.",
    name: "Lena Feldman",
    company: "Playtika",
    rating: 5,
    confirmed: true,
  },
  {
    id: "plarium-maya-cohen",
    quote: "Fast, reliable, and always on brief — even when timelines shift.",
    name: "Maya Cohen",
    company: "Plarium",
    rating: 5,
    confirmed: false,
  },
  {
    id: "moon-active-david-weiss",
    quote: "Clear communication from kickoff to final delivery.",
    name: "David Weiss",
    company: "Moon Active",
    rating: 5,
    confirmed: false,
  },
  {
    id: "product-madness-rachel-ortiz",
    quote: "Consistent quality across every campaign we run together.",
    name: "Rachel Ortiz",
    company: "Product Madness",
    rating: 5,
    confirmed: false,
  },
  {
    id: "voodoo-antoine-dubois",
    quote: "They handle complexity so we can focus on launch.",
    name: "Antoine Dubois",
    company: "Voodoo",
    rating: 5,
    confirmed: false,
  },
  {
    id: "hellofresh-tom-becker",
    quote: "Smooth production, strong creative, zero drama.",
    name: "Tom Becker",
    company: "HelloFresh",
    rating: 5,
    confirmed: false,
  },
  {
    id: "samsung-jin-park",
    quote: "Flexible team, sharp execution — a real partner.",
    name: "Jin Park",
    company: "Samsung",
    rating: 5,
    confirmed: false,
  },
  {
    id: "mcdonalds-sarah-mitchell",
    quote: "Our go-to studio for animation under tight deadlines.",
    name: "Sarah Mitchell",
    company: "McDonald's",
    rating: 5,
    confirmed: false,
  },
  {
    id: "nestle-elena-rossi",
    quote: "Trusted for years — they always deliver on time.",
    name: "Elena Rossi",
    company: "Nestlé",
    rating: 5,
    confirmed: false,
  },
  {
    id: "mastercard-james-carter",
    quote: "One point of contact, end-to-end — exactly what we need.",
    name: "James Carter",
    company: "MasterCard",
    rating: 5,
    confirmed: false,
  },
];
