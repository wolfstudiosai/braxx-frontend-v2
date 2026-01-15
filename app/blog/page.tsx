"use client";

import React from 'react';
import { BlogSection } from '@/components/BlogSection';
import { ArrowRight, Clock } from 'lucide-react';

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#d4d4d4] pt-32">
      <header className="px-8 lg:px-24 mb-16">
        <h1 className="text-7xl lg:text-[10rem] font-light italic tracking-tighter uppercase leading-none text-black whitespace-nowrap">
          LATEST NEWS
        </h1>
        <div className="mt-12 flex flex-col md:flex-row gap-12 border-t border-black/10 pt-12">
          <div className="max-w-md">
            <p className="text-xl font-bold text-black leading-tight mb-4">
              Tactical intelligence gathered from the field. Our engineers and riders share the raw data behind the silence.
            </p>
          </div>
        </div>
      </header>

      <section className="px-8 lg:px-24 mb-10">
        <div className="group relative w-full h-[60vh] rounded-[4rem] overflow-hidden shadow-2xl bg-black">
          <img
            src="/images/UNRIVALED-PERFORMANCE.jpg"
            alt="Featured Post"
            className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent"></div>
          <div className="absolute bottom-12 left-12 right-12 flex flex-col md:flex-row items-end justify-between gap-8">
            <div className="space-y-4 max-w-2xl text-white">
              <div className="flex items-center gap-4">
                <span className="px-3 py-1 bg-[#e2ff4a] text-black text-[9px] font-black uppercase tracking-widest rounded-full">Featured Intel</span>
                <span className="text-white/40 text-[9px] font-bold uppercase tracking-widest flex items-center gap-1"><Clock size={10} /> 8 MIN READ</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter leading-none text-white">THE HARMONICS OF STEALTH: ENGINEERING SILENCE</h2>
            </div>
            <button className="bg-white text-black px-8 py-4 rounded-full font-black uppercase text-xs tracking-widest hover:bg-[#e2ff4a] transition-all flex items-center gap-2 group/btn">
              Read Report <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      <BlogSection layout="scroll" />
    </div>
  );
}