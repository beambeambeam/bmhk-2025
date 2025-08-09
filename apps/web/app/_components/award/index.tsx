import { Heading } from "@/components/heading"

import { EachAwardForTopRow, EachAwardForBottomRow } from "./each"

export interface AwardData {
  imageSrc: string
  title: string
  description: string
  topRowIsMain?: boolean
  imageDimension: { width: number; height: number }
}

const AWARDS_TOPROW: AwardData[] = [
  {
    imageSrc: "https://placehold.co/250x250",
    title: "รางวัลรองชนะเลิศอันดับ 1",
    description: "เงินรางวัล 15,000 บาท พร้อมโล่เกียรติคุณ",
    imageDimension: { width: 250, height: 250 },
  },
  {
    imageSrc: "https://placehold.co/335x335",
    title: "รางวัลชนะเลิศ",
    description: "เงินรางวัล 30,000 บาท พร้อมโล่เกียรติคุณ",
    topRowIsMain: true,
    imageDimension: { width: 335, height: 335 },
  },
  {
    imageSrc: "https://placehold.co/250x250",
    title: "รางวัลรองชนะเลิศอันดับ 2",
    description: "เงินรางวัล 5,000 บาท พร้อมโล่เกียรติคุณ",
    imageDimension: { width: 250, height: 250 },
  },
]

const AWARDS_TOPROW_MOBILE: AwardData[] = [
  {
    imageDimension: { width: 250, height: 250 },
    topRowIsMain: false,
    imageSrc: "https://placehold.co/250x250", // wont be here in prod kub
    ...AWARDS_TOPROW[1],
  } as AwardData,
  AWARDS_TOPROW[0] as AwardData,
  AWARDS_TOPROW[2] as AwardData,
]

const AWARDS_BOTTOMROW: AwardData[] = [
  {
    imageSrc: "https://placehold.co/150x150",
    title: "รางวัลชมเชย",
    description: "เงินรางวัล 2,000 บาท",
    imageDimension: { width: 150, height: 150 },
  },
  {
    imageSrc: "https://placehold.co/150x150",
    title: "ประกาศนียบัตร",
    description: "สำหรับผู้เข้าร่วมการแข่งขันทุกคน",
    imageDimension: { width: 150, height: 150 },
  },
]

export default function Award() {
  return (
    <section className="gap-15 inline-flex min-h-screen w-full flex-col items-center justify-center self-stretch text-white lg:px-40">
      {/* <div className="flex w-full items-center justify-center gap-x-8">
        <div className="h-px w-96 origin-top-left outline-1 outline-offset-[-0.50px]" />
        <h2 className="text-header-1 text-center">รางวัล</h2>
        <div className="h-px w-96 origin-top-left outline-1 outline-offset-[-0.50px]" />
      </div> */}
      <Heading text="รางวัล" />

      <div className="hidden items-end px-[50px] lg:flex">
        {AWARDS_TOPROW.map((ea, i) => (
          <EachAwardForTopRow data={ea} key={i} />
        ))}
      </div>
      <div className="flex flex-col px-[50px] lg:hidden">
        {AWARDS_TOPROW_MOBILE.map((ea, i) => (
          <EachAwardForTopRow data={ea} key={i} />
        ))}
      </div>

      <div className="flex flex-col gap-x-12 gap-y-10 lg:flex-row">
        {AWARDS_BOTTOMROW.map((ea, i) => (
          <EachAwardForBottomRow data={ea} key={i} />
        ))}
      </div>
    </section>
  )
}
