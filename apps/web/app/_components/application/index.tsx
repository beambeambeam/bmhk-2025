interface RequirementProps {
  title: string
  items: string[]
  imgSrc: string
}

function Requirement({ title, items, imgSrc }: RequirementProps) {
  return (
    <div className="mx-auto flex w-[643px] flex-col gap-y-6">
      <img src={imgSrc} height={378} width={376} alt={title} className="mx-auto" />
      <div className="relative h-[327px] w-full">
        <div className="absolute inset-x-0 top-[48px] mx-auto flex h-80 w-full max-w-[643px] flex-col items-center rounded-[40px] px-8 pb-6 pt-12 outline-1 outline-offset-[-1px]">
          <ul className="m-0 mx-auto flex flex-1 list-inside list-disc flex-col self-stretch text-2xl font-light leading-10">
            {items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="absolute left-1/2 top-0 inline-flex -translate-x-1/2 transform flex-col items-center justify-center gap-10 rounded-[40px] bg-white px-8 py-6 outline-1 outline-offset-[-1px]">
          <div className="whitespace-nowrap text-center text-3xl font-medium leading-10">{title}</div>
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
    imgSrc: "https://placehold.co/376x378",
  },
  {
    title: "สำหรับอาจารย์ที่ปรึกษา",
    items: [
      "สำเนาบัตรประชาชน หรือบัตรประจำตัวสำหรับบุคคลที่ไม่ใช่สัญชาติไทย (เฉพาะด้านหน้า)",
      "เอกสารแสดงสถานภาพการเป็นอาจารย์ประจำในสถานศึกษา เช่น บัตรประจำตัวอาจารย์, บัตรข้าราชการครู, หรือหนังสือรับรองจากสถานศึกษา",
    ],
    imgSrc: "https://placehold.co/376x378",
  },
]

function Application() {
  return (
    <section className="py-15 gap-15 relative inline-flex max-h-screen flex-col items-center justify-center self-stretch px-40">
      <div className="flex w-full items-center justify-center gap-x-8">
        <div className="h-px w-96 origin-top-left outline-1 outline-offset-[-0.50px]" />
        <h2 className="leading-16 text-center text-5xl font-semibold">เอกสารในการสมัคร</h2>
        <div className="h-px w-96 origin-top-left outline-1 outline-offset-[-0.50px]" />
      </div>
      <div className="inline-flex items-start justify-start gap-10">
        {req.map((ea) => (
          <Requirement key={ea.title} title={ea.title} items={ea.items} imgSrc={ea.imgSrc} />
        ))}
      </div>
    </section>
  )
}

export default Application
