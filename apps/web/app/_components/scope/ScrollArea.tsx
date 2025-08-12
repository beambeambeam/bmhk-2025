import React from "react"

import { ScrollAreaProps } from "./types"

const ScrollArea: React.FC<ScrollAreaProps & { colorTheme: string }> = ({
  children,
  className = "",
  colorTheme,
}) => {
  return (
    <>
      <style>{`
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: var(--thumb-color) var(--track-color);
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        @media (min-width: 1024px) {
          .custom-scrollbar::-webkit-scrollbar {
            width: 8px;
            height: 8px;
          }
        }
        .custom-scrollbar::-webkit-scrollbar-button {
          display: none;
          height: 0;
          width: 0;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: var(--track-color);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: var(--thumb-color);
          border-radius: 10px;
          border: 2px solid transparent;
          background-clip: content-box;
          transition: background-color 0.3s ease;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          opacity: 0.8;
        }
      `}</style>

      <div
        className={`custom-scrollbar overflow-auto ${className}`}
        style={
          {
            "--thumb-color": colorTheme,
            "--track-color": "transparent",
          } as React.CSSProperties
        }>
        {children}
      </div>
    </>
  )
}

export default ScrollArea
