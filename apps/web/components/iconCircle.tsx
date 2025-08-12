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
      style={{ ...style}}
      className={`liquid rounded-[80px] p-2 flex items-center justify-center gap-2.5 aspect-ratio-1/1 ${className ?? ''}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default IconCircle;