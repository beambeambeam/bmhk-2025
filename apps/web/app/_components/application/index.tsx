import { Heading } from "@/components/heading"

interface RequirementProps {
  title: string
  items: string[]
  imgSrc: string
}

function Requirement({ title, items, imgSrc }: RequirementProps) {
  return (
    <div className="mx-auto flex w-[313px] flex-col gap-y-6 md:w-[437px] lg:w-[643px]">
      <img
        src={imgSrc}
        height={378}
        width={378}
        alt={title}
        className="md:size-65 mx-auto size-40 lg:size-[378px]"
      />
      <div className="relative h-[236px] w-full md:h-[269px] lg:h-[327px]">
        <div className="absolute inset-x-0 top-[48px] mx-auto flex h-80 w-full max-w-[643px] flex-col items-center rounded-[40px] px-4 pb-6 pt-12 outline-1 outline-offset-[-1px] md:px-8">
          <ul className="text-body-2 m-0 mx-auto flex flex-1 list-inside list-disc flex-col self-stretch">
            {items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="absolute left-1/2 top-0 inline-flex -translate-x-1/2 transform flex-col items-center justify-center gap-10 rounded-[40px] bg-black px-8 py-6 outline-1 outline-offset-[-1px]">
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
      "รูปถ่ายของนักเรียนผู้เข้าแข่งขัน",
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
    <section className="py-15 gap-15 relative inline-flex min-h-screen flex-col items-center justify-center self-stretch px-40 text-white">
      <Heading text="เอกสารในการสมัคร" />
      <div className="flex flex-col items-start justify-start gap-10 md:flex-row">
        {req.map((ea) => (
          <Requirement key={ea.title} title={ea.title} items={ea.items} imgSrc={ea.imgSrc} />
        ))}
      </div>
    </section>
  )
}
