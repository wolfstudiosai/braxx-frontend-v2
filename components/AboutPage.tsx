"use client";

import React from 'react';
import { ArrowRight, Hexagon, Maximize2, Zap, Shield, Target, Clock } from 'lucide-react';
import { BLOG_POSTS } from './BlogSection';

export const AboutPage: React.FC = () => {
  // Filter some technical or recent posts for the studio vibe
  const technicalPosts = BLOG_POSTS.filter(p => p.category === 'Technology' || p.category === 'Maintenance').slice(0, 3);

  return (
    <div className="bg-[#d4d4d4] min-h-screen selection:bg-black selection:text-[#e2ff4a]">
      {/* FULL WIDTH HERO VIDEO */}
      <section className="relative w-full h-[60vh] lg:h-[75vh] overflow-hidden bg-black">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-50 contrast-125"
        >
          <source src="/video/brax-video.mp4" />
        </video>
        <div className="absolute inset-0 bg-linear-gradient-to-b from-black/40 via-transparent to-[#d4d4d4]"></div>

        <div className="relative z-10 h-full flex flex-col justify-start px-8 lg:px-24 pt-32 lg:pt-40">
          <div className="flex items-center gap-4 mb-6">
            <span className="w-12 h-[2px] bg-[#e2ff4a]"></span>
            <span className="text-[#e2ff4a] text-[10px] font-black tracking-[0.6em] uppercase">R&D Facility // L.A.</span>
          </div>
          <h1 className="text-white text-5xl lg:text-[8rem] font-light italic tracking-tighter uppercase leading-none whitespace-nowrap">
            ENGINEERING STUDIO
          </h1>
        </div>
      </section>

      <div className="max-w-[1600px] mx-auto px-8 lg:px-24">

        {/* REFINED HEADER: Minimal and Informative */}
        <header className="mb-20 pt-20 flex flex-col md:flex-row items-baseline justify-between gap-6 border-b border-black/10 pb-10">
          <div className="space-y-2">
            <span className="text-black/30 text-[9px] font-black uppercase tracking-[0.5em] block">Operational R&D</span>
            <h2 className="text-3xl font-black italic tracking-tighter uppercase text-black">Technical Workspace</h2>
          </div>
          <div className="max-w-md">
            <p className="text-sm font-bold text-black/60 leading-tight italic">
              A collaborative workspace for iterative performance engineering. Explore the raw architecture and configure our current high-output prototype.
            </p>
          </div>
        </header>

        {/* WORKSPACE: Redesigned without the Spec Widget */}
        <section className="mb-32">
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 bg-black text-white space-y-4 rounded-3xl">
              <div className="flex items-center gap-3">
                <Hexagon size={16} className="text-[#e2ff4a]" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Material Advisory</span>
              </div>
              <p className="text-[11px] font-medium leading-relaxed opacity-60">
                Carbon-reinforced titanium weave utilized in high-stress hinge points. Estimated lead time for studio builds: 14-21 operational days.
              </p>
            </div>
            <div
              className="w-full h-full min-h-[120px] flex items-center justify-center bg-white text-black border border-black/10 rounded-3xl font-black uppercase tracking-[0.3em] text-xs hover:bg-[#e2ff4a] transition-all"
            >
              Explore Our Products
            </div>
          </div>
        </section>

        {/* INTELLIGENCE: Data-driven informative blocks */}
        <section className="mb-32 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-20 gap-x-12 border-t border-black/10 pt-20">
          <div className="space-y-6">
            <div className="flex items-center gap-4 text-black">
              <Zap size={24} strokeWidth={2.5} />
              <h3 className="text-xl font-black italic uppercase tracking-tighter">Instant Flux</h3>
            </div>
            <p className="text-sm font-bold text-black/50 leading-relaxed uppercase tracking-tight">
              Our proprietary vector controller operates at 20kHz, calculating motor flux thousands of times per second for lag-free power delivery.
            </p>
            <div className="pt-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest cursor-pointer hover:gap-4 transition-all">
              Technical Whitepaper <ArrowRight size={14} />
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4 text-black">
              <Shield size={24} strokeWidth={2.5} />
              <h3 className="text-xl font-black italic uppercase tracking-tighter">Monocoque</h3>
            </div>
            <p className="text-sm font-bold text-black/50 leading-relaxed uppercase tracking-tight">
              A seamless load-bearing structure minimizes hardware points and acoustic rattle, creating the signature silent Braxx profile.
            </p>
            <div className="pt-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest cursor-pointer hover:gap-4 transition-all">
              Structural Analysis <ArrowRight size={14} />
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4 text-black">
              <Target size={24} strokeWidth={2.5} />
              <h3 className="text-xl font-black italic uppercase tracking-tighter">Precision Balance</h3>
            </div>
            <p className="text-sm font-bold text-black/50 leading-relaxed uppercase tracking-tight">
              A 50/50 weight distribution is achieved by centering the battery mass lower than traditional ICE motor mounts.
            </p>
            <div className="pt-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest cursor-pointer hover:gap-4 transition-all">
              Center of Gravity Data <ArrowRight size={14} />
            </div>
          </div>
        </section>

        {/* VISUAL ARCHIVE: High-end minimal gallery */}
        <section className="mb-32">
          <div className="flex items-end justify-between mb-16">
            <div className="space-y-2">
              <span className="text-black/30 text-[9px] font-black uppercase tracking-[0.5em] block">Visual Documentation</span>
              <h3 className="text-4xl font-black italic tracking-tighter uppercase text-black">Design Variants</h3>
            </div>
            <div className="h-px flex-1 bg-black/5 mx-12 hidden lg:block"></div>
            <button className="text-[10px] font-black uppercase tracking-[0.2em] hover:text-white transition-colors">View All Archive</button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {[
              {
                title: "Dark Matter Evolution",
                code: "STR-09-A",
                img: "/images/bike-1.jpg"
              },
              {
                title: "Obsidian Core",
                code: "STR-12-B",
                img: "/images/bike-2.jpg"
              }
            ].map((item, i) => (
              <div key={i} className="group relative aspect-16/10 bg-black overflow-hidden flex items-center justify-center">
                <img src={item.img} className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale group-hover:scale-105 transition-all duration-1000" />
                <div className="absolute inset-0 bg-linear-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>

                <div className="absolute bottom-10 left-10 flex flex-col gap-2">
                  <span className="text-[8px] font-black text-[#e2ff4a] uppercase tracking-widest bg-black/50 px-2 py-1 inline-block w-fit">{item.code}</span>
                  <h4 className="text-white text-3xl font-black italic uppercase tracking-tighter">{item.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FINAL BRIEFING */}
        <section className="bg-black text-white p-16 lg:p-32 mb-32 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-[#e2ff4a] opacity-5 -skew-x-12 translate-x-1/2"></div>
          <div className="max-w-2xl relative z-10 space-y-10">
            <span className="text-[#e2ff4a] text-[10px] font-black uppercase tracking-[0.5em]">Final Operational Brief</span>
            <h2 className="text-6xl md:text-8xl font-light italic tracking-tighter uppercase leading-[0.9]">
              Innovation <br /> is not <br /> <span className="text-transparent" style={{ WebkitTextStroke: '1px white' }}>Optional.</span>
            </h2>
            <p className="text-lg font-medium opacity-40 leading-snug">
              Every component within the Studio is field-tested for resilience. We don&apos;t just build bikes; we build systems of urban dominance.
            </p>
            <div className="flex items-center gap-12 pt-6">
              <div>
                <span className="block text-[8px] font-black opacity-30 uppercase mb-2">Build Rate</span>
                <span className="text-xl font-black italic">4.2 Units/Mo</span>
              </div>
              <div>
                <span className="block text-[8px] font-black opacity-30 uppercase mb-2">Engineering Hub</span>
                <span className="text-xl font-black italic">Los Angeles</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
