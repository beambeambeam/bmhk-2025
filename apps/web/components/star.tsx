import React from "react"

const baseStyle: React.CSSProperties & Record<string, unknown> = {
  userSelect: "none",
  pointerEvents: "auto",
  WebkitUserDrag: "none",
}

export const StarLarge: React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = (props) => {
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
