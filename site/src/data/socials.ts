import { site } from "@/data/site";

export type SocialNetworkId = "linkedin" | "whatsapp" | "facebook" | "youtube";

export interface SocialChannel {
  href: string;
  active: boolean;
}

export type SocialChannels = Record<SocialNetworkId, SocialChannel>;

export const socialChannels: SocialChannels = site.social;

export interface SocialNetwork {
  id: SocialNetworkId;
  label: string;
  href: string;
  active: boolean;
}

export const socialNetworks: SocialNetwork[] = [
  { id: "whatsapp", label: "WhatsApp", ...socialChannels.whatsapp },
  { id: "linkedin", label: "LinkedIn", ...socialChannels.linkedin },
  { id: "facebook", label: "Facebook", ...socialChannels.facebook },
  { id: "youtube", label: "YouTube", ...socialChannels.youtube },
];

export function isSocialChannelActive(id: SocialNetworkId): boolean {
  const channel = socialChannels[id];
  return channel.active && channel.href.trim().length > 0;
}
