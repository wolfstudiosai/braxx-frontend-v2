import React from 'react';

interface MarqueeProps {
  text?: string;
  className?: string;
}

export const Marquee: React.FC<MarqueeProps> = ({ 
  text = "Built for Performance",
  className = ""
}) => {
  return (
    <div className={`bg-[#d4d4d4] py-5 overflow-hidden border-y border-black/20 relative z-10 ${className}`}>
      <div className="flex whitespace-nowrap animate-marquee">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="flex items-center gap-8 px-4">
            <span className="text-black font-black italic text-xs tracking-[0.3em] uppercase">{text}</span>
            <span className="text-black/20 text-lg font-light tracking-tighter select-none">/ / /</span>
          </div>
        ))}
      </div>
    </div>
  );
};