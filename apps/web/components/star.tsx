import React from "react"

// Utility to generate a random unique ID suffix
const useUniqueId = () => React.useId().replace(/[^a-zA-Z0-9]/g, "")

export const StarLarge: React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = (props) => {
  const id = useUniqueId()

  return <img src="/static/icon/Star_bright.svg" alt="Bright Star Icon" {...props} />
}

export const Star: React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = (props) => {
  const id = useUniqueId()

  return <img src="/static/icon/Star.svg" alt="Star Icon" {...props} />
}
