import { Heading } from "@/components/heading"
import { ReactNode } from "react"

interface RequirementProps {
  title: string
  items: ReactNode[]
  imgSrc: string
}

function Requirement({ title, items, imgSrc }: RequirementProps) {
  return (
    <div className="group relative isolate flex w-[313px] flex-col justify-center gap-y-6 before:absolute before:-inset-10 before:-z-10 before:rounded-[48px] before:bg-[radial-gradient(80%_80%_at_50%_40%,rgba(159,131,220,0.55)_0%,rgba(159,131,220,0.25)_40%,transparent_70%)] before:opacity-0 before:blur-3xl before:transition before:duration-500 before:ease-out before:content-[''] hover:before:scale-105 hover:before:opacity-100 lg:w-[437px] 2xl:w-[643px]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imgSrc}
        height={378}
        width={378}
        alt={title}
        className="lg:size-65 mx-auto size-40 2xl:size-[378px]"
      />

      <div className="relative z-10 min-h-[265px] w-full lg:min-h-[320px] 2xl:min-h-[420px]">
        <div className="liquid absolute inset-x-0 top-[30px] z-10 mx-auto flex !h-fit !min-h-[235px] w-full max-w-[643px] flex-col items-center rounded-[24px] border border-white/10 px-4 pb-6 pt-8 lg:h-[354px] lg:rounded-[40px] lg:px-8 lg:pt-7 2xl:top-[50px] 2xl:h-[372px] 2xl:pt-14">
          <ul className="text-body-2 m-0 mx-auto flex h-full flex-1 list-outside list-disc flex-col pl-6">
            {items.map((item, i) => (
              <li key={i} className="break-words">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="liquid absolute left-1/2 top-0 z-20 mx-auto inline-flex w-fit -translate-x-1/2 transform flex-col items-center justify-center gap-10 rounded-[24px] px-6 py-3 outline-1 outline-offset-[-1px] outline-white/10 backdrop-blur-3xl lg:rounded-[40px] 2xl:px-8 2xl:py-6">
          <div
            className="text-subheader-1 whitespace-nowrap text-center"
            dangerouslySetInnerHTML={{ __html: title }}
          />
        </div>
      </div>
    </div>
  )
}

const req: RequirementProps[] = [
  {
    title: "สำหรับนักเรียนผู้เข้าแข่งขัน",
    items: [
      <span>
        สำเนาบัตรประชาชน หรือบัตรประจำตัวสำหรับบุคคลที่ไม่ใช่สัญชาติไทย <br />
        (เฉพาะด้านหน้า)
      </span>,
      "สำเนา ปพ.7 (ระเบียนแสดงผลการเรียน) ฉบับจริงของผู้เข้าแข่งขัน",
      "รูปถ่าย 1.5 นิ้ว ชุดนักเรียนของนักเรียนผู้เข้าแข่งขัน",
    ],
    imgSrc: "/static/required-docs/1.webp",
  },
  {
    title: "สำหรับอาจารย์ที่ปรึกษา",
    items: [
      <span>
        สำเนาบัตรประชาชน หรือบัตรประจำตัวสำหรับบุคคลที่ไม่ใช่สัญชาติไทย <br />
        (เฉพาะด้านหน้า)
      </span>,
      "เอกสารแสดงสถานภาพการเป็นอาจารย์ประจำในสถานศึกษา เช่น บัตรประจำตัวอาจารย์, บัตรข้าราชการครู, หรือหนังสือรับรองจากสถานศึกษา",
    ],
    imgSrc: "/static/required-docs/2.webp",
  },
]

export default function Application() {
  return (
    <section className="gap-y-15 my-12 flex w-full flex-col justify-start px-6 lg:px-20 2xl:px-40">
      <Heading text="เอกสารในการสมัคร" />
      <div className="flex flex-col items-center justify-center gap-10 lg:flex-row">
        {req.map((ea) => (
          <Requirement key={ea.title} title={ea.title} items={ea.items} imgSrc={ea.imgSrc} />
        ))}
      </div>
    </section>
  )
}
