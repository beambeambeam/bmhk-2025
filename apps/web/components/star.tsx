import React from "react"

const useUniqueId = () => React.useId().replace(/[^a-zA-Z0-9]/g, "")

const baseStyle: React.CSSProperties & { [key: string]: any } = {
  userSelect: "none",
  pointerEvents: "auto",
  WebkitUserDrag: "none",
}

export const StarLarge: React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = (props) => {
  const id = useUniqueId()
  return (
    <img
      src="/static/icon/Star_bright.svg"
      alt="Bright Star Icon"
      draggable={false}
      style={{ ...baseStyle, ...props.style }}
      {...props}
    />
  )
}

export const Star: React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = (props) => {
  const id = useUniqueId()
  return (
    <img
      src="/static/icon/Star.svg"
      alt="Star Icon"
      draggable={false}
      style={{ ...baseStyle, ...props.style }}
      {...props}
    />
  )
}
