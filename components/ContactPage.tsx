"use client";

import React from 'react';
import { Send, MapPin, Phone, Mail } from 'lucide-react';

export const ContactPage: React.FC = () => {
  return (
    <div className="bg-[#d4d4d4] min-h-screen flex flex-col lg:flex-row pt-20">
      {/* LEFT PANEL: STYLIZED INTERACTIVE MAP */}
      <div className="w-full lg:w-1/2 h-[50vh] lg:h-auto relative overflow-hidden bg-black group">
        <iframe
          title="Tactical Outpost Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d105759.131105437!2d-118.34442655!3d34.0522342!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c75dd41d0163%3A0x67341828f731210c!2sLos%20Angeles%2C%20CA!5e0!3m2!1sen!2susa!4v1700000000000!5m2!1sen!2susa"
          width="100%"
          height="100%"
          style={{ border: 0, filter: 'grayscale(1) invert(0.9) contrast(1.2)' }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 opacity-80"
        />
        {/* Decorative Grid Overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, backgroundSize: '40px 40px' }}></div>

        {/* Floating Coordinates Badge */}
        <div className="absolute bottom-12 left-12 z-20 bg-black text-[#e2ff4a] px-6 py-3 rounded-full text-[9px] font-black tracking-[0.4em] uppercase shadow-2xl border border-white/10 hidden md:block">
          Grid: 34.0522° N, 118.2437° W // Sector 7
        </div>
      </div>

      {/* RIGHT PANEL: TEXT INFO & CONTACT FORM */}
      <div className="w-full lg:w-1/2 h-auto flex flex-col p-8 lg:p-24 justify-center bg-[#d4d4d4]">
        <div className="max-w-xl mx-auto w-full space-y-16">

          {/* Header */}
          <div className="space-y-6">
            <span className="text-black/30 text-[10px] font-black uppercase tracking-[0.5em] block">Direct Communications</span>
            <h1 className="text-6xl lg:text-[8rem] font-light italic tracking-tighter uppercase leading-none text-black whitespace-nowrap">
              SECURE CHANNEL
            </h1>
            <div className="pt-6">
              <p className="text-lg font-bold text-black/60 max-w-sm leading-snug">
                Establish a direct line for operational inquiries, fleet partnerships, or specialized custom builds.
              </p>
            </div>
          </div>

          {/* Quick Contacts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-12 border-t border-black/10">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-black text-white rounded-xl"><MapPin size={18} /></div>
              <div>
                <span className="block text-[8px] font-black text-black/30 uppercase tracking-[0.2em] mb-1">Hub</span>
                <span className="block text-xs font-black uppercase">Los Angeles, CA</span>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 bg-black text-white rounded-xl"><Mail size={18} /></div>
              <div>
                <span className="block text-[8px] font-black text-black/30 uppercase tracking-[0.2em] mb-1">Intel</span>
                <span className="block text-xs font-black uppercase">command@braxxusa.com</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <form className="space-y-8 pt-8" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2 group">
                <label className="text-[9px] font-black text-black/40 tracking-widest uppercase transition-colors group-focus-within:text-black">Operative Name</label>
                <input
                  type="text"
                  className="w-full bg-transparent border-b-2 border-black/10 py-3 text-xs font-black focus:outline-none focus:border-black transition-all uppercase placeholder:text-black/10"
                  placeholder="COMMANDER"
                />
              </div>
              <div className="space-y-2 group">
                <label className="text-[9px] font-black text-black/40 tracking-widest uppercase transition-colors group-focus-within:text-black">Subject</label>
                <input
                  type="text"
                  className="w-full bg-transparent border-b-2 border-black/10 py-3 text-xs font-black focus:outline-none focus:border-black transition-all uppercase placeholder:text-black/10"
                  placeholder="FLEET INQUIRY"
                />
              </div>
            </div>

            <div className="space-y-2 group">
              <label className="text-[9px] font-black text-black/40 tracking-widest uppercase transition-colors group-focus-within:text-black">Secure Email</label>
              <input
                type="email"
                className="w-full bg-transparent border-b-2 border-black/10 py-3 text-xs font-black focus:outline-none focus:border-black transition-all uppercase placeholder:text-black/10"
                placeholder="OPERATIVE@NETWORK.COM"
              />
            </div>

            <div className="space-y-2 group">
              <label className="text-[9px] font-black text-black/40 tracking-widest uppercase transition-colors group-focus-within:text-black">Mission Brief</label>
              <textarea
                rows={3}
                className="w-full bg-transparent border-b-2 border-black/10 py-3 text-xs font-black focus:outline-none focus:border-black transition-all uppercase resize-none placeholder:text-black/10"
                placeholder="DESCRIBE THE OPERATION..."
              ></textarea>
            </div>

            <button className="w-full py-6 bg-black text-white rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] flex items-center justify-center gap-2 hover:bg-[#e2ff4a] hover:text-black transition-all group shadow-2xl">
              TRANSMIT INTEL <Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>

            <div className="flex items-center justify-center gap-3 opacity-20">
              <div className="h-px flex-1 bg-black"></div>
              <span className="text-[7px] font-black uppercase tracking-widest whitespace-nowrap">End Transmission</span>
              <div className="h-px flex-1 bg-black"></div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
