
"use client";

import React, { useState, useTransition } from 'react';
import Link from 'next/link';
import { Send, Twitter, Instagram, Facebook, Linkedin, Loader2 } from 'lucide-react';
import { ViewState } from '../types';
import { CreateNewsLetter } from '@/lib/api';
import { toast } from 'react-toastify';

interface FooterProps {
  setView?: (view: ViewState) => void;
}

export const Footer: React.FC<FooterProps> = ({ setView }) => {
  const [email, setEmail] = useState('');
  const [isPending, startTransition] = useTransition();

  const onSubmit = (e: React.FormEvent) => {
    try {
      e.preventDefault();
      startTransition(async () => {
        const res = await CreateNewsLetter(email);
        if (res?.success) {
          setEmail('');
          toast.success("Thank you for your subscription!");
        } else {
          toast.error(res?.message);
        }
      });
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleNav = (v: ViewState) => {
    if (setView) {
      setView(v);
    }
  };

  return (
    <footer className="relative h-[85vh] min-h-[700px] overflow-hidden text-white">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url('/images/footer.jpeg')` }}
      >
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/70 to-transparent"></div>
      </div>

      <div className="relative z-10 h-full flex flex-col px-12 lg:px-24 py-16">
        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-12 max-w-4xl mx-auto w-full">
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <h3 className="text-7xl md:text-9xl font-black italic tracking-tighter leading-none">
              JOIN THE <br /> <span className="text-transparent" style={{ WebkitTextStroke: '1px white' }}>NETWORK</span>
            </h3>
            <p className="text-[#e2ff4a] text-[10px] font-black tracking-[0.5em] uppercase">STRATEGIC UPDATES & TACTICAL RELEASES</p>
          </div>

          <form className="relative w-full max-w-md" onSubmit={onSubmit}>
            <input
              type="email"
              placeholder="OPERATIVE EMAIL"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/15 backdrop-blur-xl border-b-2 border-white/20 py-5 px-4 text-white text-sm tracking-widest focus:outline-none focus:border-[#e2ff4a] transition-all placeholder:text-white/20"
            />
            <button
              disabled={isPending}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-3 text-white hover:text-[#e2ff4a] transition-all">
              {isPending ? <Loader2 size={24} /> : <Send size={24} />}
            </button>
          </form>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-end gap-12 w-full animate-in fade-in duration-1000 delay-500">
          <div className="flex flex-col gap-4">
            <h4 className="text-5xl font-black italic tracking-tighter opacity-90">BRAXX</h4>
            <div className="flex items-center gap-6 text-white/40">
              <a href="#" className="hover:text-[#e2ff4a] transition-colors"><Twitter size={18} /></a>
              <a href="#" className="hover:text-[#e2ff4a] transition-colors"><Instagram size={18} /></a>
              <a href="#" className="hover:text-[#e2ff4a] transition-colors"><Facebook size={18} /></a>
              <a href="#" className="hover:text-[#e2ff4a] transition-colors"><Linkedin size={18} /></a>
            </div>
            <p className="text-[9px] font-black tracking-[0.2em] uppercase">Los Angeles Strategic Outpost</p>
          </div>

          <div className="flex flex-col items-end gap-8">
            <div className="flex gap-12 text-[10px] font-black tracking-[0.3em] uppercase text-white/60">
              <Link
                href="/"
                onClick={(e) => { if (setView) { e.preventDefault(); handleNav(ViewState.HOME); } }}
                className="hover:text-[#e2ff4a] transition-colors"
              >
                About
              </Link>
              <Link
                href="/blog"
                onClick={(e) => { if (setView) { e.preventDefault(); handleNav(ViewState.BLOG); } }}
                className="hover:text-[#e2ff4a] transition-colors"
              >
                Blog
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};