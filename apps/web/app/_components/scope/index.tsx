import { Heading } from "@/components/heading"

import Accordion from "./Accordion"
import { DownloadIcon } from "./icons"

export default function Scope() {
  const title = "ขอบเขตเนื้อหา"

  return (
    <div className="flex h-[1080px] w-full flex-col items-center justify-center px-40">
      <div className="mx-auto w-full max-w-[1600px]">
        <Heading text={title} className="mb-15" />
      </div>

      <div className="gap-y-15 flex flex-col">
        <Accordion />

        {/* Download PDF Section */}
        <div className="flex items-center justify-center gap-x-8">
          <p className="text-[2rem] font-medium text-white">ขอบเขตเนื้อหาการแข่งขันฉบับเต็ม (PDF)</p>
          <a href="path to file" download="file name" className="flex items-center gap-x-4">
            <DownloadIcon className="text-hover-100 h-9 w-9" />
            <p className="text-hover-100 text-[1.75rem] font-medium underline">ดาวน์โหลด</p>
          </a>
        </div>
      </div>
    </div>
  )
}
