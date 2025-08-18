"use client"

import { EyeOpenedIcon } from "@/components/EyeOpenedIcon"
import { Heading } from "@/components/heading"

export type cardItem = { textFull: string; textShort: string; textColor: string }
export type labelItem = { text: string; textColor: string }
export type ContentItem = {
  card: cardItem
  label: labelItem
  isActive: boolean
  themeColor: string
  lineColor: string
  otherElement?: boolean
}
export type SectionItem = {
  header: string
  content: ContentItem[]
}

type TimelineProps = {
  data: SectionItem[]
}

export default function Timeline({ data }: TimelineProps) {
  return (
    <div className="gap-y-25 2xl:gap-y-50 flex flex-col items-center justify-center">
      {data.map((section, sectionIndex) => (
        <div
          key={sectionIndex}
          className="z-10 flex w-full max-w-[393px] flex-col lg:max-w-[1034px] 2xl:max-w-[1600px]">
          {/* Header */}
          <Heading text={section.header} className="2xl:mb-15 mb-8 lg:mb-10" />

          {/* Timeline items */}
          <div className="gap-15 mx-auto flex flex-col lg:w-full lg:flex-row lg:gap-8 2xl:gap-10">
            {section.content.map((content, contentIndex) => (
              <div
                key={contentIndex}
                className="relative flex flex-1 flex-col gap-y-4 lg:gap-y-8 2xl:gap-y-10">
                <div
                  className={`flex items-center ${
                    section.content.length > 1 ? "gap-6 lg:gap-0" : "gap-0"
                  } lg:justify-center ${sectionIndex % 2 ? "flex-row-reverse" : ""} ${
                    section.content.length > 1 ? "justify-start" : "justify-center"
                  }`}>
                  {/* Dot + line container */}
                  <div className="relative flex justify-center lg:hidden">
                    {/* vertical line behind dot */}
                    {contentIndex !== section.content.length - 1 && (
                      <div
                        className="absolute left-1/2 top-2 w-[6px] -translate-x-1/2 bg-[currentColor]"
                        style={{
                          height: "190px",
                          backgroundColor: content.lineColor,
                        }}
                      />
                    )}
                    {/* outer circle */}
                    {section.content.length > 1 && (
                      <div
                        className="relative z-10 h-10 w-10 rounded-[60px] backdrop-blur-sm"
                        style={{
                          background: `
                          radial-gradient(
                            66.31% 84.48% at 52.63% 121.84%, 
                            ${content.themeColor} 0%, 
                            rgba(2, 6, 3, 0) 50%
                          ),
                          linear-gradient(
                            106.52deg, 
                            rgba(255, 204, 247, 0.09) 0.48%, 
                            rgba(159, 131, 220, 0.09) 0.08%
                          )
                        `,
                        }}>
                        {/* inner circle */}
                        <div
                          className="liquid absolute left-1/2 top-1/2 h-[26.67px] w-[26.67px] -translate-x-1/2 -translate-y-1/2 rounded-[20px]"
                          style={{
                            background: `
                            radial-gradient(
                              66.31% 84.48% at 52.63% 121.84%, 
                              ${content.themeColor} 0%, 
                              rgba(2, 6, 3, 0) 90%
                            ),
                            linear-gradient(
                              106.52deg, 
                              rgba(255, 204, 247, 0.09) -2.48%, 
                              rgba(159, 131, 220, 0.09) 29.08%
                            )
                          `,
                          }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Drop light */}
                  {content.isActive && (
                    <div
                      className="absolute -z-10 h-[235px] w-[235px] rounded-full lg:h-[310px] lg:w-[310px] 2xl:h-[400px] 2xl:w-[400px]"
                      style={{
                        background: content.themeColor,
                        filter: "blur(150px)",
                        opacity: 0.4,
                      }}
                    />
                  )}

                  {/* line horizontal */}
                  {section.content.length > 1 && contentIndex !== section.content.length - 1 && (
                    <div
                      className="-z-1 absolute left-1/2 hidden h-2 -translate-y-1/2 lg:block"
                      style={{
                        width: "100%",
                        background: content.lineColor,
                      }}
                    />
                  )}

                  {/* Date card */}
                  <div
                    className="liquid relative rounded-[1.25rem] border border-white/10 px-6 py-4 text-center text-[1.125rem] font-medium backdrop-blur-sm lg:rounded-[1.875rem] lg:text-[1.5rem] 2xl:rounded-[2.5rem] 2xl:px-8 2xl:py-6 2xl:text-[1.75rem]"
                    style={{
                      color: content.card.textColor,
                      background: `
                        radial-gradient(
                          66.31% 84.48% at 52.63% 121.84%, 
                          ${content.themeColor} 0%, 
                          rgba(2, 6, 3, 0) 70%
                        ),
                        linear-gradient(
                          106.52deg, 
                          rgba(255, 204, 247, 0.09) -2.48%, 
                          rgba(159, 131, 220, 0.09) 29.08%
                        )
                      `,
                    }}>
                    {/* small text for mobile */}
                    <span className="block lg:hidden">{content.card.textShort}</span>

                    {/* full text for lg+ */}
                    <span className="hidden lg:block">{content.card.textFull}</span>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-4 lg:gap-0">
                  {/* Label */}
                  <div className="flex flex-col items-center justify-center gap-y-3 lg:gap-y-4">
                    <div
                      className={`text-center text-[1.125rem] font-medium text-white lg:px-0 lg:text-[1.5rem] 2xl:text-[2rem] ${
                        section.content.length > 1 ? (sectionIndex % 2 ? "pr-14" : "pl-14") : "px-0"
                      }`}
                      style={{ color: content.label.textColor }}
                      dangerouslySetInnerHTML={{ __html: content.label.text }}
                    />

                    {content.otherElement && (
                      <a
                        href="path to file"
                        download="file name"
                        className={`flex items-center gap-x-3 lg:gap-x-4 lg:px-0 ${section.content.length > 1 ? (sectionIndex % 2 ? "pr-14" : "pl-14") : "px-0"}`}>
                        <EyeOpenedIcon className="text-hover-100 h-5 w-5 lg:h-8 lg:w-8 2xl:h-9 2xl:w-9" />
                        <p className="text-hover-100 text-[1rem] font-medium underline lg:text-[1.5rem] 2xl:text-[1.75rem]">
                          ดูรายชื่อ
                        </p>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
