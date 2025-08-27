import React from "react"

type IconCircleProps = {
  style?: React.CSSProperties
  children: React.ReactNode
  className?: string
  onClick?: React.MouseEventHandler<HTMLDivElement>
}

const IconCircle: React.FC<IconCircleProps> = ({ style, children, className, onClick }) => {
  const baseStyle: React.CSSProperties & { [key: string]: any } = {
    userSelect: "none",
    WebkitUserDrag: "none",
    ...style,
  }

  const renderChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      const element = child as React.ReactElement<any>
      return React.cloneElement(element, {
        draggable: false,
        style: { ...element.props.style, userSelect: "none", WebkitUserDrag: "none" },
      })
    }
    return child
  })

  return (
    <div
      style={baseStyle}
      className={`liquid aspect-ratio-1/1 group relative flex select-none items-center justify-center gap-2.5 rounded-[80px] p-2 ${className ?? ""}`}
      onClick={onClick}
      draggable={false} // ป้องกัน drag ตัว container
    >
      {/* glow effect */}
      <div className="absolute inset-0 rounded-full bg-[rgba(159,131,220,0.6)] opacity-0 blur-[40px] transition-opacity duration-500 group-hover:opacity-100"></div>

      {/* content */}
      <div className="relative z-10">{renderChildren}</div>
    </div>
  )
}

export default IconCircle
