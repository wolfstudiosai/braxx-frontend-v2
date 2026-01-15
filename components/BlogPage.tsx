
import React from 'react';
import { BlogSection } from './BlogSection';
import { ArrowRight, Clock, Tag } from 'lucide-react';
// Added ViewState import to define the prop type correctly
import { ViewState } from '../types';

// Defined props interface to accept setView for routing/navigation
interface BlogPageProps {
  setView?: (view: ViewState) => void;
}

// Updated component to handle the setView prop
export const BlogPage: React.FC<BlogPageProps> = ({ setView }) => {
  return (
    <div className="bg-[#d4d4d4] min-h-screen pt-32">
      {/* Blog Hero / Header */}
      <header className="px-8 lg:px-24 mb-16">
        <h1 className="text-7xl lg:text-[10rem] font-light italic tracking-tighter uppercase leading-none text-black whitespace-nowrap">
          LATEST NEWS
        </h1>
        <div className="mt-12 flex flex-col md:flex-row gap-12 border-t border-black/10 pt-12">
          <div className="max-w-md">
            <p className="text-xl font-bold text-black leading-tight mb-4">
              Tactical intelligence gathered from the field. Our engineers and riders share the raw data behind the silence.
            </p>
            <p className="text-xs text-black/40 font-bold uppercase tracking-[0.2em]">
              Operational Updates // Technical Deep Dives // Field Reports
            </p>
          </div>
        </div>
      </header>

      {/* Featured Operative Intelligence */}
      <section className="px-8 lg:px-24 mb-10">
        <div className="group relative w-full h-[60vh] rounded-[4rem] overflow-hidden shadow-2xl bg-black">
          <img
            src="https://images.unsplash.com/photo-1558981285-6f0c94958bb6?q=80&w=2000&auto=format&fit=crop"
            alt="Featured Post"
            className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent"></div>

          <div className="absolute bottom-12 left-12 right-12 flex flex-col md:flex-row items-end justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <div className="flex items-center gap-4">
                <span className="px-3 py-1 bg-[#e2ff4a] text-black text-[9px] font-black uppercase tracking-widest rounded-full">Featured Intel</span>
                <span className="text-white/40 text-[9px] font-bold uppercase tracking-widest flex items-center gap-1">
                  <Clock size={10} /> 8 MIN READ
                </span>
              </div>
              <h2 className="text-white text-4xl md:text-6xl font-black italic uppercase tracking-tighter leading-none">
                THE HARMONICS OF STEALTH: ENGINEERING SILENCE
              </h2>
              <p className="text-white/60 text-sm font-medium leading-relaxed max-w-lg">
                How our latest drive-train optimization reduces acoustic signature by 40% without compromising peak torque. Field tested in dense urban environments.
              </p>
            </div>

            <button className="bg-white text-black px-8 py-4 rounded-full font-black uppercase text-xs tracking-widest hover:bg-[#e2ff4a] transition-all flex items-center gap-2 group/btn">
              Read Report <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Categories Grid (Thin row style) - Tighter Padding */}
      <div className="px-8 lg:px-24 mb-6">
        <div className="flex flex-wrap gap-4 border-b border-black/10 pb-6">
          {['All Intelligence', 'Technical Specs', 'Field Operations', 'Rider Profiles', 'Urban Tactical'].map((cat, i) => (
            <button key={i} className="px-6 py-2 border border-black/10 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all">
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Now passing setView down to allow navigation from the latest news sections */}
      <BlogSection />

      <div className="h-32"></div>
    </div>
  );
};
