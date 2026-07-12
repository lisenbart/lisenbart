import type { LucideIcon } from "lucide-react";
import { Brain, Clapperboard, Film, Sparkles } from "lucide-react";

export interface ServiceCard {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  accent: string;
}

export const serviceCards: ServiceCard[] = [
  {
    id: "campaign-brand",
    title: "Campaign & Brand Films",
    description: "Commercial films, brand stories and launch content — from concept through final delivery.",
    icon: Film,
    accent: "var(--cyan)",
  },
  {
    id: "game-trailers",
    title: "Game Trailers & Cinematics",
    description: "Trailers, in-game cinematics and reveal films for studios and publishers.",
    icon: Clapperboard,
    accent: "var(--violet)",
  },
  {
    id: "animation-motion",
    title: "Animation & Motion",
    description: "2D and 3D animation, motion design and visual storytelling for any screen.",
    icon: Sparkles,
    accent: "var(--magenta)",
  },
  {
    id: "ai-production",
    title: "AI-Assisted Production",
    description: "Smart use of AI tools to accelerate prep, iteration and delivery without losing craft.",
    icon: Brain,
    accent: "var(--orange)",
  },
];

export const projectTypes = [
  "Campaign & Brand Film",
  "Game Trailer or Cinematic",
  "Animation & Motion",
  "AI-Assisted Production",
  "Other",
] as const;
