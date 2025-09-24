import { Heading } from "@/components/heading"
import { SponsorList, SponsorTiers } from "@/config/sponsors"

import SponsorSubgrid from "./subgrid"

export default function Sponsors() {
  return (
    <section className="mx-auto flex min-h-screen w-full flex-col items-center justify-center gap-y-[21px] px-6 lg:px-20 lg:py-[40px] 2xl:px-40">
      <Heading text="Organized By" />
      <div className="mx-auto mb-[7rem] mt-8 flex h-[10rem]">
        <img
          height={160}
          src="/static/logo/kmutt65-cpe-white-160px.webp"
          alt="kmutt cpe logo"
          loading="lazy"
        />
      </div>
      <Heading text="Sponsored By" />
      <div className="grid w-full place-content-center content-center gap-y-4">
        <SponsorSubgrid data={SponsorList} tier={SponsorTiers.diamond} />
        <SponsorSubgrid data={SponsorList} tier={SponsorTiers.platinum} />
        <SponsorSubgrid data={SponsorList} tier={SponsorTiers.gold} />
      </div>
    </section>
  )
}
