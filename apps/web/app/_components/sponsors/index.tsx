import { Heading } from "@/components/heading"
import { SponsorList, SponsorTiers } from "@/config/sponsors"

import SponsorSubgrid from "./subgrid"

export default function Sponsors() {
  return (
    <section className="mx-auto flex w-full flex-col items-center justify-center gap-y-16 px-6 lg:px-20 lg:py-[40px] 2xl:px-40">
      <div className="mx-auto flex flex-col gap-y-4">
        <span className="text-body-1 text-center !font-medium text-gray-100">Organized By</span>
        <img
          className="h-[160px] object-contain"
          src="/static/logo/kmutt65-cpe-white-160px.webp"
          alt="kmutt cpe logo"
          loading="lazy"
        />
      </div>
      <div className="grid w-full place-content-center content-center gap-y-4">
        <SponsorSubgrid data={SponsorList} tier={SponsorTiers.diamond} />
        <SponsorSubgrid data={SponsorList} tier={SponsorTiers.platinum} />
        <SponsorSubgrid data={SponsorList} tier={SponsorTiers.gold} />
      </div>
    </section>
  )
}
