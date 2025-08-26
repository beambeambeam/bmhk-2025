import React from "react"

const ArrowIcon = ({ className = "" }) => {
  return (
    <svg viewBox="0 0 40 41" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M15 8.5L25 20.1667L15 31.8333"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default ArrowIcon
