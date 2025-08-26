import { Heading } from "@/components/heading"

import Accordion from "./Accordion"
import { DownloadIcon } from "./icons"

export default function Scope() {
  const title = "ขอบเขตเนื้อหา"

  return (
    <div className="flex h-auto w-full flex-col items-center justify-center px-6 lg:h-[834px] lg:px-20 2xl:h-[1080px] 2xl:px-40">
      <div className="mx-auto w-full max-w-[1600px]">
        <Heading text={title} className="2xl:mb-15 mb-8 lg:mb-10" />
      </div>

      <div className="flex flex-col gap-y-6 lg:gap-y-8 2xl:gap-y-10">
        <Accordion />

        {/* Download PDF Section */}
        <div className="flex flex-col items-center justify-center gap-y-3 lg:flex-row lg:gap-x-8">
          <p className="whitespace-nowrap text-[1rem] font-medium text-white lg:text-[1.5rem] 2xl:text-[1.75rem]">
            ขอบเขตเนื้อหาการแข่งขันฉบับเต็ม (PDF)
          </p>
          <a
            href="https://dekcpe.link/bmhk2025scope"
            target="_blank"
            rel="noopener,noreferrer"
            className="flex items-center gap-x-4">
            <DownloadIcon className="text-hover-100 h-5 w-5 lg:h-8 lg:w-8 2xl:h-9 2xl:w-9" />
            <p className="text-hover-100 text-[1rem] font-medium underline lg:text-[1.5rem] 2xl:text-[1.75rem]">
              ดาวน์โหลด
            </p>
          </a>
        </div>
      </div>
    </div>
  )
}
