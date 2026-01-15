import React from 'react';

interface ParallaxProps {
  title: string;
  subtitle: string;
  image: string;
}

export const ParallaxSection: React.FC<ParallaxProps> = ({ title, subtitle, image }) => {
  return (
    <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-grayscale-[0.5]"></div>
      </div>
      
      <div className="relative z-10 text-center px-4">
        <h3 className="text-white text-7xl md:text-9xl font-black italic tracking-tighter opacity-90 mb-4">
          {title}
        </h3>
        <p className="text-[#e2ff4a] text-sm font-bold tracking-[0.4em] uppercase">
          {subtitle}
        </p>
      </div>
    </section>
  );
};