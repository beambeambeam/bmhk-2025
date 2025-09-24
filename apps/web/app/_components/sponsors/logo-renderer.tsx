import GlassCard from "@/components/glassCard"
import { Sponsor } from "@/config/sponsors"
import { SponsorTiers } from "@/config/sponsors"

interface SponsorLogoRendererProps {
  data: Sponsor
}

const SponsorLogoRenderer = ({ data: s }: SponsorLogoRendererProps) => {
  let h = 60

  if (s.tier === SponsorTiers.diamond) {
    h = 160
  } else if (s.tier === SponsorTiers.platinum) {
    h = 100
  }

  return (
    <div className={`flex w-full min-w-[${h * 2}] justify-center rounded-3xl px-10 py-4 align-middle`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        style={{ width: "auto", height: `${h}px` }}
        src={s.image_path}
        alt={`${s.name} logo`}
        loading="lazy"
      />
    </div>
  )
}

export default SponsorLogoRenderer
