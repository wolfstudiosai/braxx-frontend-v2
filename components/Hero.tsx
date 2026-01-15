import React from 'react';
import { ViewState } from '../types';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  setView: (view: ViewState) => void;
}

export const Hero: React.FC<HeroProps> = ({ setView }) => {
  return (
    <div className="relative h-screen min-h-[600px] w-full overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src="https://picsum.photos/seed/tactical_dark/1920/1080" 
          alt="Tactical Gear" 
          className="w-full h-full object-cover filter brightness-50 contrast-125 saturate-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-braxx-black via-transparent to-transparent opacity-90"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-braxx-black/80 via-transparent to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
        <div className="max-w-2xl space-y-6">
          <div className="inline-block px-3 py-1 bg-braxx-red text-white text-xs font-bold tracking-widest uppercase mb-2">
            New Collection 2024
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-bold text-white leading-tight">
            Built for the <span className="text-braxx-red">Extreme.</span><br />
            Ready for <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Anything.</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-lg leading-relaxed">
            Engineered for durability and performance. Braxx USA delivers premium tactical apparel and gear for those who demand the absolute best from their equipment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <button 
              onClick={() => setView(ViewState.SHOP)}
              className="px-8 py-4 bg-braxx-red hover:bg-red-700 text-white font-bold uppercase tracking-widest text-sm transition-all transform hover:translate-y-[-2px] flex items-center justify-center gap-2"
            >
              Shop Collection <ArrowRight className="h-4 w-4" />
            </button>
            <button 
              className="px-8 py-4 border border-white/30 hover:border-white text-white font-bold uppercase tracking-widest text-sm transition-all hover:bg-white/5"
            >
              Explore Tech
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
