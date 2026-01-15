import React from 'react';

export const BikeOutline: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`relative w-full h-full flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 800 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto drop-shadow-[0_0_15px_rgba(0,0,0,0.1)]"
      >
        {/* Chassis & Main Frame */}
        <path d="M250 350 L550 350 L600 250 L400 220 L200 250 Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M400 220 L450 150 L580 160 L620 220" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />

        {/* Front Fork & Steering */}
        <path d="M220 250 L180 100 L160 110" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M190 120 L150 120" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />

        {/* Wheels (Outlines) */}
        <circle cx="150" cy="350" r="80" stroke="currentColor" strokeWidth="2" strokeDasharray="8 4" />
        <circle cx="150" cy="350" r="60" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        <circle cx="650" cy="350" r="80" stroke="currentColor" strokeWidth="2" strokeDasharray="8 4" />
        <circle cx="650" cy="350" r="60" stroke="currentColor" strokeWidth="1" opacity="0.5" />

        {/* Hubs & Spokes Detail */}
        <circle cx="150" cy="350" r="10" stroke="currentColor" strokeWidth="1" />
        <circle cx="650" cy="350" r="10" stroke="currentColor" strokeWidth="1" />

        {/* Swingarm & Rear Suspension */}
        <path d="M550 350 L650 350" stroke="currentColor" strokeWidth="2" />
        <path d="M480 350 L500 280" stroke="currentColor" strokeWidth="1.5" />

        {/* Seat & Tail */}
        <path d="M450 150 L380 180 L350 190" stroke="currentColor" strokeWidth="1.5" />
        <path d="M580 160 L680 140" stroke="currentColor" strokeWidth="1.5" />

        {/* Engine/Battery Block Area */}
        <rect x="350" y="260" width="150" height="80" rx="10" stroke="currentColor" strokeWidth="1.5" />
        <path d="M370 280 L480 280 M370 300 L480 300 M370 320 L480 320" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />

        {/* Handlebars */}
        <path d="M180 100 L240 80 M180 100 L120 90" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />

        {/* Decorative Technical Callouts */}
        <g opacity="0.4" className="text-[8px] font-mono fill-current">
          <text x="150" y="450" textAnchor="middle">FRONT AXLE / 19 IN</text>
          <text x="650" y="450" textAnchor="middle">REAR DRIVE / 18 IN</text>
          <text x="425" y="400" textAnchor="middle">HIGH-DENSITY ENERGY CORE</text>
          <line x1="150" y1="435" x2="150" y2="445" stroke="currentColor" strokeWidth="0.5" />
          <line x1="650" y1="435" x2="650" y2="445" stroke="currentColor" strokeWidth="0.5" />
        </g>
      </svg>

      {/* Background Scanning Animation Effect */}
      <div className="absolute inset-0 bg-linear-to-r from-transparent via-black/5 to-transparent w-full h-full -skew-x-12 animate-scan pointer-events-none"></div>

      <style>{`
        @keyframes scan {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(100%) skewX(-12deg); }
        }
        .animate-scan {
          animation: scan 4s linear infinite;
        }
      `}</style>
    </div>
  );
};