import React from 'react';
import { Send } from 'lucide-react';

export const NewsletterSection: React.FC = () => {
  return (
    <section className="bg-[#d4d4d4] py-32 px-8">
      <div className="max-w-4xl mx-auto text-center space-y-12">
        <div className="space-y-4">
          <h2 className="text-5xl font-black italic tracking-tighter uppercase">Join the Network</h2>
          <p className="text-gray-500 font-bold uppercase tracking-[0.3em] text-[10px]">Strategic Updates & Tactical Releases</p>
        </div>

        <form className="relative max-w-md mx-auto group">
          <input 
            type="email" 
            placeholder="OPERATIVE EMAIL"
            className="w-full bg-white/50 border-b-2 border-black/10 py-4 px-2 text-sm font-black tracking-widest focus:outline-none focus:border-black transition-all placeholder:text-gray-400 uppercase"
          />
          <button className="absolute right-0 top-1/2 -translate-y-1/2 p-2 hover:translate-x-1 transition-transform">
            <Send size={18} />
          </button>
        </form>

        <div className="flex justify-center gap-12 pt-8">
          <div className="text-left">
            <span className="block text-[8px] font-black text-gray-400 uppercase mb-1">Fleet</span>
            <span className="text-xs font-black uppercase">Dealer Network</span>
          </div>
          <div className="text-left">
            <span className="block text-[8px] font-black text-gray-400 uppercase mb-1">Corporate</span>
            <span className="text-xs font-black uppercase">Partnerships</span>
          </div>
          <div className="text-left">
            <span className="block text-[8px] font-black text-gray-400 uppercase mb-1">Support</span>
            <span className="text-xs font-black uppercase">Tech Division</span>
          </div>
        </div>
      </div>
    </section>
  );
};