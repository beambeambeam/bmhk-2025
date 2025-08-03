"use client"

import { cn } from "@workspace/ui/lib/utils"
import { EmblaCarouselType, EmblaEventType, EmblaOptionsType } from "embla-carousel"
import useEmblaCarousel from "embla-carousel-react"
import React, { useCallback, useEffect, useRef } from "react"

import AwardSlide, { AwardSlideProps } from "../award-slide"
import { NextButton, PrevButton, usePrevNextButtons } from "./arrow-btn"
import { DotButton, useDotButton } from "./dot-btn"

const TWEEN_FACTOR_BASE = 0.52

// css variable from embla css
export const SLIDE_HEIGHT = 32.5 // rem
export const SLIDE_SPACING = 1 // rem
export const SLIDE_SIZE = 55 // percent

const numberWithinRange = (number: number, min: number, max: number): number =>
  Math.min(Math.max(number, min), max)

type PropType = {
  slides: AwardSlideProps[]
  options?: EmblaOptionsType
}

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options)
  const tweenFactor = useRef(0)
  const tweenNodes = useRef<HTMLElement[]>([])

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi)

  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } =
    usePrevNextButtons(emblaApi)

  const setTweenNodes = useCallback((emblaApi: EmblaCarouselType): void => {
    tweenNodes.current = emblaApi.slideNodes().map((slideNode) => {
      return slideNode.querySelector(".embla__slide__number") as HTMLElement
    })
  }, [])

  const setTweenFactor = useCallback((emblaApi: EmblaCarouselType) => {
    tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length
  }, [])

  const tweenScale = useCallback((emblaApi: EmblaCarouselType, eventName?: EmblaEventType) => {
    const engine = emblaApi.internalEngine()
    const scrollProgress = emblaApi.scrollProgress()
    const slidesInView = emblaApi.slidesInView()
    const isScrollEvent = eventName === "scroll"

    emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
      let diffToTarget = scrollSnap - scrollProgress
      const slidesInSnap = engine.slideRegistry[snapIndex]

      slidesInSnap?.forEach((slideIndex) => {
        if (isScrollEvent && !slidesInView.includes(slideIndex)) return

        if (engine.options.loop) {
          engine.slideLooper.loopPoints.forEach((loopItem) => {
            const target = loopItem.target()

            if (slideIndex === loopItem.index && target !== 0) {
              const sign = Math.sign(target)

              if (sign === -1) {
                diffToTarget = scrollSnap - (1 + scrollProgress)
              }
              if (sign === 1) {
                diffToTarget = scrollSnap + (1 - scrollProgress)
              }
            }
          })
        }

        const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor.current)
        const scale = numberWithinRange(tweenValue, 0, 1).toString()
        const tweenNode = tweenNodes.current[slideIndex]
        if (tweenNode) tweenNode.style.transform = `scale(${scale})`
      })
    })
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    setTweenNodes(emblaApi)
    setTweenFactor(emblaApi)
    tweenScale(emblaApi)

    emblaApi
      .on("reInit", setTweenNodes)
      .on("reInit", setTweenFactor)
      .on("reInit", tweenScale)
      .on("scroll", tweenScale)
      .on("slideFocus", tweenScale)
  }, [emblaApi, tweenScale])

  return (
    <div className="max-w-screen m-auto">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className={`flex touch-pan-y touch-pinch-zoom ml-[calc(${SLIDE_SPACING}rem * -1)]`}>
          {slides.map((s) => (
            <AwardSlide imageSrc={s.imageSrc} title={s.title} description={s.description} />
          ))}
        </div>
      </div>

      <div className="grid-cols-[auto 1fr] mt-[1.8rem] grid justify-between gap-[1.2rem]">
        <div className="grid grid-cols-2 items-center gap-[0.6rem]">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>

        <div className="mr-[calc((2.6rem - 1.4rem) / 2 * -1)] flex flex-wrap items-center justify-end">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={cn(
                "m-0 flex h-[2.6rem] w-[2.6rem] cursor-pointer touch-manipulation appearance-none items-center justify-center rounded-[50%] border-0 bg-transparent p-0 text-white disabled:text-gray-300",
                index === selectedIndex ? "after:shadow-[inset 0 0 0 0.2rem #ffffff]" : ""
              )}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default EmblaCarousel
