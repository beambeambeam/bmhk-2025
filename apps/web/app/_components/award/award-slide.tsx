"use client"

import { SLIDE_SIZE, SLIDE_SPACING } from "./embla/carousel"

export interface AwardSlideProps {
  imageSrc: string
  title: string
  description: string
}

export default function AwardSlide({ imageSrc, title, description }: AwardSlideProps) {
  return (
    <div className={`transform-[translate3d(0, 0, 0)] flex-[0 0 var(${SLIDE_SIZE}%)] min-w-0 pl-[1rem]`}>
      <div className="flex flex-col gap-y-10">
        <img src={imageSrc} alt={title} width={300} height={300} />
        <div className="flex flex-col gap-y-6">
          <div className="inline-flex flex-col items-center justify-center gap-10 rounded-[40px] px-8 py-6 outline-1 outline-offset-[-1px]">
            <div className="justify-center self-stretch text-center text-3xl font-normal leading-10">
              {title}
            </div>
          </div>
          <div className="justify-center self-stretch text-center text-2xl font-normal leading-10">
            {description}
          </div>
        </div>
      </div>
    </div>
  )
}
