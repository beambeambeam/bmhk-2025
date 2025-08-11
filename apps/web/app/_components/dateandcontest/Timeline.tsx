import { Heading } from "@/components/heading"

import type { TimelineProps } from "./types"

function Timeline({
  title,
  lineColor = "#DFDFDF99",
  colorPercentage = 100,
  transparentPercentage = 0,
  data,
}: TimelineProps) {
  return (
    <div className="z-10 mx-auto w-full max-w-[1600px]">
      {/* Title with lines */}
      <Heading text={title} className="mb-15" />

      {/* Timeline items */}
      <div className="relative grid w-full grid-cols-3 gap-10">
        <div
          className="absolute left-1/2 top-10 h-2 w-[70%] -translate-x-1/2"
          style={{
            background: `linear-gradient(to right, ${lineColor} ${colorPercentage}%, transparent ${transparentPercentage}%)`,
          }}
        />

        {data.map((item, index) => (
          <div key={index} className="relative flex flex-col items-center gap-y-10">
            {/* วงกลม background effect */}
            {item.isActive && (
              <div
                className="absolute left-1/2 top-1/2 -z-10 h-[347px] w-[347px] -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  background: `#C63C5166`,
                  boxShadow: `0 0 512px #C63C51`,
                  filter: `blur(150px)`,
                }}
              />
            )}

            {/* การ์ดวันที่ */}
            <div className="liquid-gray relative rounded-[2.5rem] border border-white/10 px-8 py-6 text-center text-[1.75rem] font-medium text-white backdrop-blur-sm">
              {item.date}
            </div>

            {/* ป้ายข้อความ */}
            <div className="text-center text-[2rem] font-medium text-white">
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
