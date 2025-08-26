import React from "react"

const CheckIcon = ({ className = "" }) => {
  return (
    <svg viewBox="0 0 36 37" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect y="0.546143" width="36" height="36" rx="18" fill="currentColor" />
      <path
        d="M9 19.7461L14.1429 24.5461L27 12.5461"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default CheckIcon
