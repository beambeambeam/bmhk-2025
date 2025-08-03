import { EmblaOptionsType } from "embla-carousel"

import { AwardSlideProps } from "./award-slide"
import EmblaCarousel from "./embla/carousel"

const OPTIONS: EmblaOptionsType = { loop: true, align: "center" }

const AWARD_SLIDE: AwardSlideProps[] = [
  {
    imageSrc: "https://placehold.co/300x300",
    title: "รางวัลชนะเลิศ",
    description: "เงินรางวัล 30,000 บาท พร้อมโล่เกียรติคุณ",
  },
  {
    imageSrc: "https://placehold.co/300x300",
    title: "รางวัลรองชะเลิศอันดับ 2",
    description: "เงินรางวัล 5,000 บาท พร้อมโล่เกียรติคุณ",
  },
  {
    imageSrc: "https://placehold.co/300x300",
    title: "ประกาศนียบัตร",
    description: "สำหรับผู้เข้าร่วมการแข่งขันทุกคน",
  },
  {
    imageSrc: "https://placehold.co/300x300",
    title: "รางวัลชมเชย",
    description: "เงินรางวัล 2,000 บาท",
  },
  {
    imageSrc: "https://placehold.co/300x300",
    title: "รางวัลรองชนะเลิศอันดับ 1",
    description: "เงินรางวัล 15,000 บาท พร้อมโล่เกียรติคุณ",
  },
]

function Award() {
  return (
    <section className="inline-flex max-h-screen w-full flex-col items-center justify-center gap-14 self-stretch px-40">
      <h2 className="leading-16 text-center text-5xl font-semibold">รางวัล</h2>
      <EmblaCarousel slides={AWARD_SLIDE} options={OPTIONS} />
    </section>
  )
}

export default Award
