import { Heading } from "@/components/heading"

interface RequirementProps {
  title: string
  items: string[]
  imgSrc: string
}

function Requirement({ title, items, imgSrc }: RequirementProps) {
  return (
    <div className="group relative isolate flex w-[313px] flex-col justify-center gap-y-6 before:absolute before:-inset-10 before:-z-10 before:rounded-[48px] before:bg-[radial-gradient(80%_80%_at_50%_40%,rgba(159,131,220,0.55)_0%,rgba(159,131,220,0.25)_40%,transparent_70%)] before:opacity-0 before:blur-3xl before:transition before:duration-500 before:ease-out before:content-[''] hover:before:scale-105 hover:before:opacity-100 md:w-[437px] lg:w-[643px]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imgSrc}
        height={378}
        width={378}
        alt={title}
        className="md:size-65 mx-auto size-40 lg:size-[378px]"
      />

      <div className="relative z-10 min-h-[265px] w-full md:min-h-[269px] lg:min-h-[374px]">
        <div className="liquid absolute inset-x-0 top-[48px] z-10 mx-auto flex !h-fit !min-h-[235px] w-full max-w-[643px] flex-col items-center rounded-[40px] border border-white/10 px-4 pb-6 pt-8 md:h-[233px] md:px-8 md:pt-12 lg:h-[326px] lg:pt-14">
          <ul className="text-body-2 m-0 mx-auto flex h-full flex-1 list-inside list-disc flex-col">
            {items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="liquid absolute left-1/2 top-0 z-20 inline-flex -translate-x-1/2 transform flex-col items-center justify-center gap-10 rounded-[40px] !bg-black px-8 py-6 outline-1 outline-offset-[-1px] outline-white/10">
          <div className="text-subheader-1 whitespace-nowrap text-center">{title}</div>
        </div>
      </div>
    </div>
  )
}

const req: RequirementProps[] = [
  {
    title: "สำหรับนักเรียนผู้เข้าแข่งขัน",
    items: [
      "สำเนาบัตรประชาชน หรือบัตรประจำตัวสำหรับบุคคลที่ไม่ใช่สัญชาติไทย (เฉพาะด้านหน้า)",
      "สำเนา ปพ.7 (ระเบียนแสดงผลการเรียน) ฉบับจริงของผู้เข้าแข่งขัน",
      "รูปถ่าย 1.5 นิ้ว ชุดนักเรียนของนักเรียนผู้เข้าแข่งขัน",
    ],
    imgSrc: "/static/required-docs/1.svg",
  },
  {
    title: "สำหรับอาจารย์ที่ปรึกษา",
    items: [
      "สำเนาบัตรประชาชน หรือบัตรประจำตัวสำหรับบุคคลที่ไม่ใช่สัญชาติไทย (เฉพาะด้านหน้า)",
      "เอกสารแสดงสถานภาพการเป็นอาจารย์ประจำในสถานศึกษา เช่น บัตรประจำตัวอาจารย์, บัตรข้าราชการครู, หรือหนังสือรับรองจากสถานศึกษา",
    ],
    imgSrc: "/static/required-docs/2.svg",
  },
]

export default function Application() {
  return (
    <section className="gap-y-15 my-12 flex w-screen flex-col justify-start px-6 md:px-20 lg:px-40">
      <Heading text="เอกสารในการสมัคร" />
      <div className="flex flex-col items-center justify-center gap-10 md:flex-row">
        {req.map((ea) => (
          <Requirement key={ea.title} title={ea.title} items={ea.items} imgSrc={ea.imgSrc} />
        ))}
      </div>
    </section>
  )
}
