'use client'
import { useEffect, useRef, useState } from 'react';
import GlassCard from '@/components/glassCard';
import IconCircle from '@/components/iconCircle';
import { Star, StarLarge } from '@/components/star';
import storyData from '../../../public/static/story/story.json';

function Story() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const stories = storyData.story;

  const currentStory = stories[currentIndex];

  const startInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setFade(false); // trigger fade-out
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % stories.length);
        setFade(true); // fade-in after change
      }, 200); // match fade-out duration
    }, 60000); // auto switch every 1 minute
  };

  useEffect(() => {
    startInterval();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [stories.length]);

  const handleSelect = (index: number) => {
    setFade(false); // start fade-out
    setTimeout(() => {
      setCurrentIndex(index);
      setFade(true); // trigger fade-in
      startInterval(); // restart interval after manual change
    }, 200); // match fade-out duration
  };

  if (!currentStory) {
    return <div>No story found.</div>;
  }

  return (
    <div className="w-full px-6 flex flex-col items-center justify-center content-center gap-8 lg:max-h-[834] sm:px-20 lg:gap-10 2xl:max-h-[1080] 2xl:px-40 2xl:gap-15">
      <div className='w-full flex flex-row justify-center items-center gap-0 lg:gap-8 2xl:gap-[100px] lg:flex-col 2xl:flex-row'>
        <IconCircle className="cursor-pointer relative left-5 2xl:left-[50px] flex lg:hidden w-[40px] h-[40px] 2xl:flex 2xl:w-[90px] 2xl:h-[90px] flex-shrink-0" onClick={() => handleSelect((currentIndex - 1 + stories.length) % stories.length)}>
          <img
            src="/static/icon/Left_arrow.svg"
            alt="Left Arrow Icon"
          />
        </IconCircle>
        <GlassCard
          className='w-full p-4 lg:max-w-[1034px] lg:p-10 2xl:max-w-[1326px] 2xl:p-[80px 80px 40px 80px]'
          style={{
            backgroundImage: `
              radial-gradient(
                66.31% 84.48% at 52.63% 121.84%, 
                rgba(${currentStory['radial-grad-start']},0.5) 0%, 
                rgba(${currentStory['radial-grad-end']},0) 100%
              ),
              linear-gradient(
                106.52deg, 
                rgba(${currentStory['linear-grad-start']},0.09) -2.48%,
                rgba(${currentStory['linear-grad-end']},0.09) 29.08%
              ),
              linear-gradient(rgba(160,160,160,0.6), rgba(0,0,0,0.8)),
              url("/static/story/${currentStory.background}")
            `,
            backgroundSize: 'auto, auto, auto, cover',
            backgroundPosition: 'center, center, center, center',
            backgroundRepeat: 'no-repeat, no-repeat, no-repeat, no-repeat',
            borderRadius: 40,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 10,
            transition: 'opacity 0.5s',
            opacity: fade ? 1 : 0
          }}
        >
          <div className="flex flex-col items-center gap-8 lg:flex-row 2xl:gap-10 self-stretch">
            <div className='flex items-center justify-center w-[280px] h-[200px] lg:h-auto'>
              {currentStory.img && (
                <img
                  src={`/static/story/${currentStory.img}`}
                  alt={`Chapter ${currentStory.chapter}`}
                  className="max-w-[280px] h-full max-h-[450px] object-contain"
                />
              )}
            </div>
            <div className="flex flex-col justify-center items-start gap-4 lg:gap-7 2xl:gap-8 flex-[1_0_0] max-lg:text-center max-lg:items-center 2xl:w-[842px]">
              <div className="text-header-2-regular text-[24px] lg:text-[32px] 2xl:text-[36px]">{currentStory.topic}</div>
              {/* <div className="flex items-center gap-8 self-stretch">
                <div className="gradient-border-right w-[361px] h-[1px]" />
              </div> */}
              <div className="hidden items-center gap-4 max-lg:flex">
                {stories.map((_, index) =>
                  index === currentIndex ? (
                    <StarLarge key={index} className="w-9 h-9 cursor-pointer" onClick={() => handleSelect(index)} />
                  ) : (
                    <Star key={index} className="w-5 h-5 cursor-pointer" onClick={() => handleSelect(index)} />
                  )
                )}
              </div>
              <div className="text-body-1 text-[#ffccf7] text-[16px] lg:text-[20px] 2xl:text-[24px]">{currentStory.subtopic}</div>
              <div className="text-body-1 text-[16px] lg:text-[20px] 2xl:text-[24px] whitespace-pre-line">{currentStory.description}</div>
            </div>
          </div>

          <div className="hidden items-center gap-5 2xl:flex">
            <div className="gradient-border-left w-[200px] h-[1px]" />
            {stories.map((_, index) =>
              index === currentIndex ? (
                <StarLarge key={index} className="w-16 h-16 cursor-pointer" onClick={() => handleSelect(index)} />
              ) : (
                <Star key={index} className="w-8 h-8 cursor-pointer" onClick={() => handleSelect(index)} />
              )
            )}
            <div className="gradient-border-right w-[200px] h-[1px]" />
          </div>
        </GlassCard>
        <IconCircle className="cursor-pointer relative right-5 2xl:right-[50px] flex lg:hidden w-[40px] h-[40px] 2xl:flex 2xl:w-[90px] 2xl:h-[90px] flex-shrink-0" onClick={() => handleSelect((currentIndex + 1) % stories.length)}>
          <img
            src="/static/icon/Right_arrow.svg"
            alt="Right Arrow Icon"
          />
        </IconCircle>
        {/* Buttom Nav Bar */}
        <div className="hidden items-center justify-center gap-5 w-full lg:flex 2xl:hidden">
          <IconCircle className="cursor-pointer w-[60px] h-[60px] flex-shrink-0" onClick={() => handleSelect((currentIndex - 1 + stories.length) % stories.length)}>
            <img
              src="/static/icon/Left_arrow.svg"
              alt="Left Arrow Icon"
            />
          </IconCircle>
          <div className="flex items-center gap-5">
            <div className="gradient-border-left w-[200px] h-[1px]" />
            {stories.map((_, index) =>
              index === currentIndex ? (
                <StarLarge key={index} className="w-16 h-16 cursor-pointer" onClick={() => handleSelect(index)} />
              ) : (
                <Star key={index} className="w-8 h-8 cursor-pointer" onClick={() => handleSelect(index)} />
              )
            )}
            <div className="gradient-border-right w-[200px] h-[1px]" />
          </div>
          <IconCircle className="cursor-pointer w-[60px] h-[60px] flex-shrink-0" onClick={() => handleSelect((currentIndex + 1) % stories.length)}>
            <img
              src="/static/icon/Right_arrow.svg"
              alt="Right Arrow Icon"
            />
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
  );
}

export default Story;
