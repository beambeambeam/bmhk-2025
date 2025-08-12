import React from 'react';

type GlassCardProps = {
  style?: React.CSSProperties;
  children?: React.ReactNode;
  className?: string;
};

const GlassCard: React.FC<GlassCardProps> = ({ style, children, className }) => {
  return (
    <div className={`liquid ${className ?? ''}`} style={style}>
      {children}
    </div>
  );
};

export default GlassCard;
