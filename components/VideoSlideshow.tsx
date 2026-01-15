"use client";

import React, { useState } from 'react';
import { ArrowUpRight, X, ChevronDown, Send } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { FormInput } from './ui/FormInput';

interface PartnerFormData {
  name: string;
  email: string;
  phone: string;
}

export const VideoSlideshow: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PartnerFormData>();

  const onSubmit = (data: PartnerFormData) => {
    console.log('Form submitted:', data);
    // Handle form submission here
    reset();
    setIsFormOpen(false);
  };

  const videoFeeds = [
    "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1558981285-6f0c94958bb6?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1558980331-0672ff794669?q=80&w=400&auto=format&fit=crop"
  ];

  const FeedColumn = ({ opacity = "1", speed = "40s" }: { opacity?: string, speed?: string }) => (
    <div
      className="w-full md:w-[300px] lg:w-[350px] bg-white/5 backdrop-blur-3xl border-l border-white/10 relative overflow-hidden h-[400px] md:h-full shrink-0"
      style={{ opacity }}
    >
      <div className="flex flex-col gap-4 p-4 animate-vertical-scroll" style={{ animationDuration: speed }}>
        {[...videoFeeds, ...videoFeeds, ...videoFeeds].map((img, i) => (
          <div key={i} className="relative aspect-9/16 rounded-3xl overflow-hidden border border-white/10 group cursor-none">
            <img src={img} alt="Tactical Feed" className="w-full h-full object-cover transition-all" />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent flex items-end p-6">
              <span className="text-white font-black italic text-[10px] tracking-widest uppercase">Live Operational Feed // 0{(i % 4) + 1}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section className="relative h-[85vh] w-full bg-black overflow-hidden flex flex-col md:flex-row pb-12 md:pb-0">
      <div className="flex-1 p-12 lg:p-24 flex flex-col justify-center gap-8 relative z-20 bg-black">
        {!isFormOpen ? (
          <div className="animate-in fade-in slide-in-from-left duration-700 space-y-8 w-full">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#e2ff4a] text-black rounded-full text-[10px] font-black uppercase tracking-widest">
              Proprietary Intelligence
            </div>
            <h2 className="text-6xl lg:text-8xl font-black italic text-white tracking-tighter leading-none">
              GLOBAL <br /> <span className="text-transparent border-text-white" style={{ WebkitTextStroke: '1px white' }}>COMMAND</span>
            </h2>
            <p className="text-gray-400 max-w-md text-sm leading-relaxed">
              Monitor real-time field performance and tactical feedback through our encrypted social nexus. Built for those who lead from the front.
            </p>
            <button
              onClick={() => setIsFormOpen(true)}
              className="w-fit bg-white hover:bg-[#e2ff4a] text-black px-8 py-4 rounded-full font-black uppercase text-xs tracking-[0.2em] transition-all flex items-center gap-3 group"
            >
              Partner With BRAXX <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>

            {/* Attached Info Row */}
            <div className="flex flex-wrap gap-8 lg:gap-12 pt-12 border-t border-white/10 mt-8 animate-in fade-in duration-1000 delay-300">
              <div className="text-left">
                <span className="block text-[8px] font-black text-white/30 uppercase mb-1">Fleet</span>
                <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Dealer Network</span>
              </div>
              <div className="text-left">
                <span className="block text-[8px] font-black text-white/30 uppercase mb-1">Corporate</span>
                <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Partnerships</span>
              </div>
              <div className="text-left">
                <span className="block text-[8px] font-black text-white/30 uppercase mb-1">Support</span>
                <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Tech Division</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="animate-in fade-in zoom-in-95 duration-500 space-y-8 max-w-md w-full">
            <div className="flex items-center justify-between">
              <h3 className="text-3xl font-black italic text-white tracking-tighter uppercase">Operational Intake</h3>
              <button
                onClick={() => setIsFormOpen(false)}
                className="text-white/40 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <FormInput
                label="Full Name"
                name="name"
                placeholder="YOUR NAME"
                register={register}
                error={errors.name}
                required
              />

              <FormInput
                label="Email"
                name="email"
                type="email"
                placeholder="YOUR EMAIL"
                register={register}
                error={errors.email}
                required
                pattern={/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i}
              />
              <FormInput
                label="Phone"
                name="phone"
                type="tel"
                placeholder="YOUR PHONE"
                register={register}
                error={errors.phone}
                required
                pattern={/^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/}
              />

              <button
                type="submit"
                className="w-full mt-4 bg-[#e2ff4a] text-black py-4 rounded-xl font-black uppercase tracking-[0.2em] text-[10px] hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                Deploy Intel <Send size={14} />
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Multiple Feed Columns with specified opacities */}
      <div className="flex h-full overflow-hidden">
        {/* Left duplicate: 30% opacity */}
        <div className="hidden lg:block">
          <FeedColumn opacity="0.3" speed="55s" />
        </div>
        {/* Middle duplicate: 65% opacity */}
        <div className="hidden md:block">
          <FeedColumn opacity="0.65" speed="45s" />
        </div>
        {/* Right original: 100% opacity */}
        <FeedColumn opacity="1" speed="35s" />
      </div>

      <style>{`
        @keyframes vertical-scroll {
          0% { transform: translateY(0); }
          100% { transform: translateY(-33.33%); }
        }
        .animate-vertical-scroll {
          animation: vertical-scroll linear infinite;
        }
      `}</style>
    </section>
  );
};
