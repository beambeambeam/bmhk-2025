import React from "react"

export const DownloadIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="36" height="37" viewBox="0 0 36 37" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M4.5 23.4541C4.5 27.6967 4.5 29.818 5.81802 31.1361C7.13604 32.4541 9.25736 32.4541 13.5 32.4541H22.5C26.7426 32.4541 28.8639 32.4541 30.1819 31.1361C31.5 29.818 31.5 27.6967 31.5 23.4541"
      stroke="#9F83DC"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M18.0005 5.4541V24.9541M18.0005 24.9541L24.0005 18.3916M18.0005 24.9541L12.0005 18.3916"
      stroke="#9F83DC"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

type TriggerIconProps = {
  isOpen: boolean
  className?: string
}

export function TriggerIcon({ isOpen, className = "" }: TriggerIconProps) {
  return (
    <svg
      width="32"
      height="33"
      viewBox="0 0 32 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""} ${className}`}>
      <path
        d="M25.3332 12.4541L15.9998 20.4541L6.6665 12.4541"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
