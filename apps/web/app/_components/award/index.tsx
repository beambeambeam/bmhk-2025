import { Heading } from "@/components/heading"

import { EachAwardForTopRow, EachAwardForBottomRow } from "./each"

export interface AwardData {
  imageSrc: string
  title: string
  description: string
  imageDimension: { width: number; height: number }
  glowColor: string
}

export interface TopRowAwardData extends AwardData {
  topRowIsMain?: boolean
  lqClassName: string
}

const AWARDS_TOPROW: TopRowAwardData[] = [
  {
    imageSrc: "/static/awards/2.webp",
    title: "รางวัลรองชนะเลิศอันดับ 1",
    description: "เงินรางวัล 15,000 บาท",
    lqClassName: "liquid-award-second",
    imageDimension: { width: 250, height: 250 },
    glowColor: "#8c3061",
  },
  {
    imageSrc: "/static/awards/1.webp",
    title: "รางวัลชนะเลิศ",
    description: "เงินรางวัล 30,000 บาท",
    lqClassName: "liquid-award-first",
    topRowIsMain: true,
    imageDimension: { width: 335, height: 335 },
    glowColor: "#9f83dc",
  },
  {
    imageSrc: "/static/awards/3.webp",
    title: "รางวัลรองชนะเลิศอันดับ 2",
    description: "เงินรางวัล 10,000 บาท",
    lqClassName: "liquid-award-third",
    imageDimension: { width: 250, height: 250 },
    glowColor: "#c63c51",
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
    imageSrc: "/static/awards/4.webp",
    title: "รางวัลชมเชย",
    description: "เงินรางวัล 2,500 บาท",
    imageDimension: { width: 140, height: 140 },
    glowColor: "#ffffff",
  },
  {
    imageSrc: "/static/awards/5.webp",
    title: "ประกาศนียบัตร",
    description: "สำหรับผู้เข้าร่วมการแข่งขันทุกคน",
    imageDimension: { width: 140, height: 140 },
    glowColor: "#edcce8",
  },
]

export default function Award() {
  return (
    <section className="2xl:gap-y-15 mx-auto flex min-h-screen w-full flex-col items-center justify-center gap-y-[21px] px-6 lg:gap-y-10 lg:px-20 lg:py-[40px] 2xl:px-40">
      <Heading text="รางวัล" />
      <div className="hidden items-end lg:flex 2xl:px-[50px]">
        {AWARDS_TOPROW.map((ea, i) => (
          <EachAwardForTopRow data={ea} key={i} />
        ))}
      </div>
      <div className="flex flex-col gap-y-6 lg:hidden">
        {AWARDS_TOPROW_MOBILE.map((ea, i) => (
          <EachAwardForTopRow data={ea} key={i} />
        ))}
      </div>

      <div className="flex flex-col gap-y-10 lg:flex-row lg:gap-x-8 2xl:gap-x-10">
        {AWARDS_BOTTOMROW.map((ea, i) => (
          <EachAwardForBottomRow data={ea} key={i} />
        ))}
      </div>
    </section>
  )
}
