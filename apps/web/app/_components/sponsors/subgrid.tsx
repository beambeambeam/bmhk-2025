import { Sponsor } from "@/config/sponsors"
import { SponsorTiers } from "@/config/sponsors"

import SponsorLogoRenderer from "./logo-renderer"

interface SponsorSubgridProps {
  data: Sponsor[]
  tier: SponsorTiers
}

function getTierName(t: SponsorTiers): string {
  return t === SponsorTiers.diamond ? "Diamond" : t === SponsorTiers.platinum ? "Platinum" : "Gold"
}

export default function SponsorSubgrid({ data, tier }: SponsorSubgridProps) {
  const amt = data.filter((sp) => sp.tier === tier).length
  const gridClass = amt === 1 ? "md:grid-cols-1" : amt === 2 ? "md:grid-cols-2" : "md:grid-cols-3"

  if (amt === 0) return <></>

  return (
    <div className="flex w-full flex-col gap-y-4">
      <span className="text-body-1 text-center !font-medium text-gray-100">
        {getTierName(tier)} Sponsor{amt > 1 ? "s" : ""}
      </span>
      <div className={`grid grid-cols-1 ${gridClass} gap-x-4 gap-y-4`}>
        {data
          .filter((sp) => sp.tier === tier)
          .map((sp) => (
            <SponsorLogoRenderer data={sp} key={sp.name} />
          ))}
      </div>
    </div>
  )
}
