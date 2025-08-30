"use client"

import GlassCard from "@/components/glassCard"
import IconCircle from "@/components/iconCircle"
import { Star, StarLarge } from "@/components/star"
import { useEffect, useRef, useState } from "react"

import storyData from "../../../public/static/story/story.json"

function Story() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [fade, setFade] = useState(true)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const stories = storyData.story

  const currentStory = stories[currentIndex]

  const startInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)

    intervalRef.current = setInterval(() => {
      setFade(false) // trigger fade-out
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % stories.length)
        setFade(true) // fade-in after change
      }, 200) // match fade-out duration
    }, 60000) // auto switch every 1 minute
  }

  useEffect(() => {
    startInterval()
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [stories.length])

  useEffect(() => {
    stories.forEach((story) => {
      const img = new Image()
      img.src = `/static/story/${story.background}`
    })
  }, [stories])

  const handleSelect = (index: number) => {
    setFade(false) // start fade-out
    setTimeout(() => {
      setCurrentIndex(index)
      setFade(true) // trigger fade-in
      startInterval() // restart interval after manual change
    }, 200) // match fade-out duration
  }

  if (!currentStory) {
    return <div>No story found.</div>
  }

  return (
    <div className="2xl:gap-15 font-bai-jamjuree flex w-full flex-col content-center items-center justify-center gap-8 px-6 sm:px-20 lg:max-h-[834] lg:gap-10 2xl:max-h-[1080] 2xl:px-40">
      <div className="flex w-full flex-row items-center justify-center gap-0 lg:flex-col lg:gap-8 2xl:flex-row 2xl:gap-[100px]">
        <IconCircle
          className="relative left-5 flex h-[40px] w-[40px] flex-shrink-0 cursor-pointer lg:hidden 2xl:left-[50px] 2xl:flex 2xl:h-[90px] 2xl:w-[90px]"
          onClick={() => handleSelect((currentIndex - 1 + stories.length) % stories.length)}>
          <img src="/static/icon/Left_arrow.svg" alt="Left Arrow Icon" />
        </IconCircle>
        <GlassCard
          className="relative z-10 flex w-full flex-col items-center justify-center gap-10 p-4 lg:max-w-[1034px] lg:p-10 2xl:max-w-[1326px]"
          style={{
            borderRadius: 40,
            transition: "opacity 0.5s",
            opacity: fade ? 1 : 0,
          }}>
          {/* Background images inside the card */}
          <div className="absolute left-0 top-0 h-full w-full overflow-hidden rounded-[40px]">
            {stories.map((story, index) => (
              <img
                key={index}
                src={`/static/story/${story.background}`}
                alt={`Background ${index}`}
                className={`absolute left-0 top-0 h-full w-full object-cover transition-opacity duration-500 ${
                  index === currentIndex ? (fade ? "opacity-100" : "opacity-0") : "opacity-0"
                }`}
              />
            ))}

            {/* Gradients overlay */}
            <div
              className="absolute left-0 top-0 h-full w-full"
              style={{
                backgroundImage: `
                  radial-gradient(
                    66.31% 84.48% at 52.63% 121.84%,
                    rgba(${currentStory["radial-grad-start"]},0.25) 0%,
                    rgba(${currentStory["radial-grad-end"]},0) 100%
                  ),
                  linear-gradient(
                    106.52deg,
                    rgba(${currentStory["linear-grad-start"]},0.09) -2.48%,
                    rgba(${currentStory["linear-grad-end"]},0.09) 29.08%
                  )
                `,
              }}
            />
          </div>
          <div className="z-10 flex flex-col items-center gap-8 self-stretch lg:flex-row 2xl:gap-10">
            <div className="flex h-[200px] w-[280px] items-center justify-center lg:h-auto">
              {currentStory.img && (
                <img
                  src={`/static/story/${currentStory.img}`}
                  alt={`Chapter ${currentStory.chapter}`}
                  className="h-full max-h-[450px] max-w-[280px] object-contain"
                />
              )}
            </div>
            <div className="flex flex-[1_0_0] flex-col items-start justify-center gap-4 max-lg:items-center max-lg:text-center lg:gap-7 2xl:w-[842px] 2xl:gap-8">
              <div className="text-header-2-regular text-[24px] lg:text-[32px] 2xl:text-[36px]">
                {currentStory.topic}
              </div>
              {/* <div className="flex items-center gap-8 self-stretch">
                <div className="gradient-border-right w-[361px] h-[1px]" />
              </div> */}
              <div className="hidden items-center gap-4 max-lg:flex">
                {stories.map((_, index) =>
                  index === currentIndex ? (
                    <StarLarge
                      key={index}
                      className="h-9 w-9 cursor-pointer"
                      onClick={() => handleSelect(index)}
                    />
                  ) : (
                    <Star
                      key={index}
                      className="h-5 w-5 cursor-pointer"
                      onClick={() => handleSelect(index)}
                    />
                  )
                )}
              </div>
              <div className="text-body-1 text-[16px] text-[#ffccf7] lg:text-[20px] 2xl:text-[24px]">
                {currentStory.subtopic}
              </div>
              <div className="text-body-1 whitespace-pre-line text-[16px] lg:text-[20px] 2xl:text-[24px]">
                {currentStory.description}
              </div>
            </div>
          </div>

          <div className="z-10 hidden items-center gap-5 2xl:flex">
            <div className="gradient-border-left h-[1px] w-[200px]" />
            {stories.map((_, index) =>
              index === currentIndex ? (
                <StarLarge
                  key={index}
                  className="h-16 w-16 cursor-pointer"
                  onClick={() => handleSelect(index)}
                />
              ) : (
                <Star key={index} className="h-8 w-8 cursor-pointer" onClick={() => handleSelect(index)} />
              )
            )}
            <div className="gradient-border-right h-[1px] w-[200px]" />
          </div>
        </GlassCard>
        <IconCircle
          className="relative right-5 flex h-[40px] w-[40px] flex-shrink-0 cursor-pointer lg:hidden 2xl:right-[50px] 2xl:flex 2xl:h-[90px] 2xl:w-[90px]"
          onClick={() => handleSelect((currentIndex + 1) % stories.length)}>
          <img src="/static/icon/Right_arrow.svg" alt="Right Arrow Icon" />
        </IconCircle>
        {/* Buttom Nav Bar */}
        <div className="hidden w-full items-center justify-center gap-5 lg:flex 2xl:hidden">
          <IconCircle
            className="h-[60px] w-[60px] flex-shrink-0 cursor-pointer"
            onClick={() => handleSelect((currentIndex - 1 + stories.length) % stories.length)}>
            <img src="/static/icon/Left_arrow.svg" alt="Left Arrow Icon" />
          </IconCircle>
          <div className="flex items-center gap-5">
            <div className="gradient-border-left h-[1px] w-[200px]" />
            {stories.map((_, index) =>
              index === currentIndex ? (
                <StarLarge
                  key={index}
                  className="h-16 w-16 cursor-pointer"
                  onClick={() => handleSelect(index)}
                />
              ) : (
                <Star key={index} className="h-8 w-8 cursor-pointer" onClick={() => handleSelect(index)} />
              )
            )}
            <div className="gradient-border-right h-[1px] w-[200px]" />
          </div>
          <IconCircle
            className="h-[60px] w-[60px] flex-shrink-0 cursor-pointer"
            onClick={() => handleSelect((currentIndex + 1) % stories.length)}>
            <img src="/static/icon/Right_arrow.svg" alt="Right Arrow Icon" />
          </IconCircle>
        </div>
      </div>

      <style>{`
        .gradient-border-left {
          border-width: 1px;
          border-style: solid;
          opacity: 1;
          border-image-source: linear-gradient(270deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0));
          border-image-slice: 1;
        }

        .gradient-border-right {
          border-width: 1px;
          border-style: solid;
          opacity: 1;
          border-image-source: linear-gradient(90deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0));
          border-image-slice: 1;
        }
      `}</style>
    </div>
  )
}

export default Story
