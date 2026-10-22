/** Evening/night hero: 18:00–05:59 local. Day: 06:00–17:59. */
export type HeroPeriod = "day" | "evening";

/** Art-directed crops (dark bear set). Day/evening schedule locked to evening chrome for now. */
export const HERO_IMAGES = {
  desktop: "/images/HERO_bear_desktop.webp",
  mobile: "/images/HERO_bear_mobile.webp",
} as const;

/** @deprecated period map — both resolve to art-directed dark hero */
export const HERO_PERIOD_IMAGES = {
  evening: HERO_IMAGES.desktop,
  day: HERO_IMAGES.desktop,
} as const;

export function heroPeriodFromDate(date = new Date()): HeroPeriod {
  // TEMP: lock evening chrome (white type) to match dark hero crops
  void date;
  return "evening";
  // const hour = date.getHours();
  // return hour >= 6 && hour < 18 ? "day" : "evening";
}

export function heroImageForPeriod(_period: HeroPeriod) {
  return HERO_IMAGES.desktop;
}

/** ms until next day/evening boundary in local time. */
export function msUntilNextHeroBoundary(date = new Date()) {
  const next = new Date(date);
  next.setSeconds(0, 0);
  next.setMinutes(0);
  const hour = date.getHours();
  if (hour >= 6 && hour < 18) {
    next.setHours(18, 0, 0, 0);
  } else if (hour < 6) {
    next.setHours(6, 0, 0, 0);
  } else {
    next.setDate(next.getDate() + 1);
    next.setHours(6, 0, 0, 0);
  }
  return Math.max(1000, next.getTime() - date.getTime());
}
