export enum SponsorTiers {
  "diamond" = 3,
  "platinum" = 2,
  "gold" = 1,
}

export interface Sponsor {
  name: string
  tier: SponsorTiers
  image_path: string
  link?: string
}

export const SponsorList: Sponsor[] = [
  {
    name: "IRE Learning",
    tier: SponsorTiers.gold,
    image_path: "/static/sponsors/ire-white.webp",
    link: "https://www.facebook.com/iretutor/",
  },
]
