import { Instagram, Youtube } from "lucide-react";
import type { WorkCaseStudy } from "@/data/work";
import { publicAsset } from "@/lib/publicAsset";

type PlatformKey = "youtube" | "tiktok" | "instagram";

const PLATFORM_LABEL: Record<PlatformKey, string> = {
  youtube: "YouTube",
  tiktok: "TikTok",
  instagram: "Instagram",
};

const PLATFORM_CTA: Record<PlatformKey, string> = {
  youtube: "Subscribe",
  tiktok: "Follow",
  instagram: "Follow",
};

function TikTokGlyph({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15.3a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.73a8.18 8.18 0 0 0 4.76 1.52V6.84a4.84 4.84 0 0 1-1-.15Z" />
    </svg>
  );
}

function PlatformMark({ platform }: { platform: PlatformKey }) {
  if (platform === "youtube") {
    return <Youtube size={16} strokeWidth={2.25} aria-hidden="true" />;
  }
  if (platform === "tiktok") {
    return <TikTokGlyph size={15} />;
  }
  return <Instagram size={15} strokeWidth={2.25} aria-hidden="true" />;
}

/** Three phone frames — YouTube / TikTok / Instagram (production Originals layout). */
export default function OriginalIpPhones({ item }: { item: WorkCaseStudy }) {
  const previews = item.platformPreviews;
  const phones: Array<{ key: PlatformKey; href: string; image: string }> = [];

  if (item.youtubeUrl) {
    phones.push({
      key: "youtube",
      href: item.youtubeUrl,
      image: publicAsset(previews?.youtube ?? item.mediaImage ?? ""),
    });
  }
  if (item.tiktokUrl) {
    phones.push({
      key: "tiktok",
      href: item.tiktokUrl,
      image: publicAsset(previews?.tiktok ?? item.mediaImage ?? ""),
    });
  }
  if (item.instagramUrl) {
    phones.push({
      key: "instagram",
      href: item.instagramUrl,
      image: publicAsset(previews?.instagram ?? item.mediaImage ?? ""),
    });
  }

  if (phones.length === 0) return null;

  return (
    <div className="originals-case__media originals-ip-phones">
      {phones.map((phone) => (
        <a
          key={phone.key}
          href={phone.href}
          className={`originals-ip-phone originals-ip-phone--${phone.key}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${PLATFORM_CTA[phone.key]} ${item.title} on ${PLATFORM_LABEL[phone.key]}`}
        >
          <span className="originals-ip-phone__bezel">
            <span className="originals-ip-phone__screen">
              <img
                src={phone.image}
                alt=""
                width={780}
                height={1688}
                loading="lazy"
                decoding="async"
              />
              <span className="originals-ip-phone__cta" aria-hidden="true">
                {PLATFORM_CTA[phone.key]}
              </span>
            </span>
            <span className="originals-ip-phone__brand" aria-hidden="true">
              <PlatformMark platform={phone.key} />
            </span>
          </span>
        </a>
      ))}
    </div>
  );
}
