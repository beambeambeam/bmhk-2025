import React from 'react';

type IconCircleProps = {
  style?: React.CSSProperties;
  children: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};

const IconCircle: React.FC<IconCircleProps> = ({ style, children, className, onClick }) => {
  return (
    <div
      style={{ ...style }}
      className={`liquid relative rounded-[80px] p-2 flex items-center justify-center gap-2.5 aspect-ratio-1/1 group ${className ?? ''}`}
      onClick={onClick}
    >
      {/* glow effect */}
      <div className="absolute inset-0 rounded-full bg-[rgba(159,131,220,0.6)] blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      {/* content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default IconCircle;
