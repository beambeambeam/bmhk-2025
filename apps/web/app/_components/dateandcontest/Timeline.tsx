import { Heading } from "@/components/heading"

import type { TimelineProps } from "./types"

function Timeline({ title, colorPercentage = 100, data }: TimelineProps) {
  return (
    <div className="z-10 w-full max-w-[393px] lg:max-w-[1034px] 2xl:max-w-[1600px]">
      {/* Title with lines */}
      <Heading text={title} className="2xl:mb-15 mb-8 lg:mb-10" />

      {/* Timeline items */}
      <div className="gap-15 relative grid w-full grid-rows-3 lg:grid-cols-3 lg:grid-rows-none lg:gap-8 2xl:gap-10">
        {/* เส้น timeline > lg */}
        <div
          className="absolute left-1/2 hidden h-2 w-[70%] -translate-x-1/2 lg:top-8 lg:block 2xl:top-10"
          style={{
            background: `linear-gradient(
                          to right, 
                          #C63C51 ${colorPercentage}%, 
                          #DFDFDF40 ${colorPercentage}%, 
                          #DFDFDF40 100%
                        )`,
          }}
        />

        {/* เส้น timeline > lg (vertical) */}
        <div
          className="absolute left-1/2 top-10 h-[70%] w-2 -translate-x-1/2 lg:top-8 lg:hidden 2xl:top-10"
          style={{
            background: `linear-gradient(
                  to bottom, 
                  #C63C51 ${colorPercentage}%, 
                  #DFDFDF40 ${colorPercentage}%, 
                  #DFDFDF40 100%
                )`,
          }}
        />

        {data.map((item, index) => (
          <div key={index} className="relative flex flex-col items-center gap-y-4 lg:gap-y-8 2xl:gap-y-10">
            {/* การ์ดวันที่ */}
            <div className="liquid-gray relative whitespace-nowrap rounded-[1.25rem] border border-white/10 px-6 py-4 text-center text-[1.125rem] font-medium text-white backdrop-blur-sm lg:rounded-[1.875rem] lg:text-[1.5rem] 2xl:rounded-[2.5rem] 2xl:px-8 2xl:py-6 2xl:text-[1.75rem]">
              {item.date}
            </div>

            {/* ป้ายข้อความ */}
            <div className="whitespace-nowrap text-center text-[1.125rem] font-medium text-white lg:text-[1.5rem] 2xl:text-[2rem]">
              {item.label.split("\n").map((line, i) => (
                <span key={i}>
                  {line}
                  <br />
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Timeline
