import { Heading } from "@/components/heading"

import { EachAwardForTopRow, EachAwardForBottomRow } from "./each"

export interface AwardData {
  imageSrc: string
  title: string
  description: string
  imageDimension: { width: number; height: number }
}

export interface TopRowAwardData extends AwardData {
  topRowIsMain?: boolean
  lqClassName: string
}

const AWARDS_TOPROW: TopRowAwardData[] = [
  {
    imageSrc: "/static/awards/2.svg",
    title: "รางวัลรองชนะเลิศอันดับ 1",
    description: "เงินรางวัล 15,000 บาท",
    lqClassName: "liquid-award-second",
    imageDimension: { width: 250, height: 250 },
  },
  {
    imageSrc: "/static/awards/1.svg",
    title: "รางวัลชนะเลิศ",
    description: "เงินรางวัล 30,000 บาท",
    lqClassName: "liquid-award-first",
    topRowIsMain: true,
    imageDimension: { width: 335, height: 335 },
  },
  {
    imageSrc: "/static/awards/3.svg",
    title: "รางวัลรองชนะเลิศอันดับ 2",
    description: "เงินรางวัล 5,000 บาท",
    lqClassName: "liquid-award-third",
    imageDimension: { width: 250, height: 250 },
  },
]

const AWARDS_TOPROW_MOBILE: TopRowAwardData[] = [
  {
    imageDimension: { width: 250, height: 250 },
    topRowIsMain: false,
    ...AWARDS_TOPROW[1],
  } as TopRowAwardData,
  AWARDS_TOPROW[0] as TopRowAwardData,
  AWARDS_TOPROW[2] as TopRowAwardData,
]

const AWARDS_BOTTOMROW: AwardData[] = [
  {
    imageSrc: "/static/awards/4.svg",
    title: "รางวัลชมเชย",
    description: "เงินรางวัล 2,000 บาท",
    imageDimension: { width: 140, height: 140 },
  },
  {
    imageSrc: "/static/awards/5.svg",
    title: "ประกาศนียบัตร",
    description: "สำหรับผู้เข้าร่วมการแข่งขันทุกคน",
    imageDimension: { width: 140, height: 140 },
  },
]

export default function Award() {
  return (
    <section className="xl:gap-y-15 mx-auto flex min-h-screen w-screen flex-col items-center justify-center gap-y-[21px] px-6 md:gap-y-10 md:px-20 md:py-[40px] xl:px-40">
      <Heading text="รางวัล" />
      <div className="hidden items-end px-[50px] md:flex">
        {AWARDS_TOPROW.map((ea, i) => (
          <EachAwardForTopRow data={ea} key={i} />
        ))}
      </div>
      <div className="flex flex-col gap-y-6 md:hidden">
        {AWARDS_TOPROW_MOBILE.map((ea, i) => (
          <EachAwardForTopRow data={ea} key={i} />
        ))}
      </div>

      <div className="flex flex-col gap-y-10 md:flex-row md:gap-x-8 xl:gap-x-10">
        {AWARDS_BOTTOMROW.map((ea, i) => (
          <EachAwardForBottomRow data={ea} key={i} />
        ))}
      </div>
    </section>
  )
}
