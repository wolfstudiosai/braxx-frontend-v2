"use client";

import React from 'react';
import { Send, MapPin, Phone, Mail } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useForm } from 'react-hook-form';
import { CreateContact } from '@/lib/api';
import { toast } from 'react-toastify';

interface StoreLocation {
  id: number;
  name: string;
  address: string;
  city: string;
  lat: number;
  lng: number;
}

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const STORE_LOCATIONS: StoreLocation[] = [
  {
    id: 1,
    name: 'TruMotion',
    address: '17401 Beach Blvd',
    city: 'Huntington Beach, CA 92647',
    lat: 33.7127,
    lng: -117.9988
  },
  {
    id: 2,
    name: 'Cardin Razza',
    address: '22515 Aspan St Unit F',
    city: 'Lake Forest, CA 92630',
    lat: 33.6469,
    lng: -117.6822
  }
];

// Dynamically import the map component to avoid SSR issues with Leaflet
const StoreMap = dynamic(() => import('../components/StoreMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-black flex items-center justify-center">
      <div className="text-white/40 text-sm font-bold">Loading map...</div>
    </div>
  )
});

export const ContactPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    try {
      const res = await CreateContact(data)
      if (res?.success) {
        reset();
        toast.success(res?.message);
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      console.error("Failed to send:", error);
    }
  };

  return (
    <div className="bg-[#d4d4d4] min-h-screen flex flex-col lg:flex-row pt-20">
      {/* LEFT PANEL: STORE LOCATIONS MAP */}
      <div className="w-full lg:w-1/2 h-[50vh] lg:h-auto min-h-[500px] relative overflow-hidden bg-black group flex flex-col">
        {/* Store Location Cards */}
        <div className="p-6 space-y-4 z-10 relative">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-[#e2ff4a] animate-pulse"></div>
            <span className="text-[10px] font-black text-white/60 uppercase tracking-widest">Authorized Dealers</span>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {STORE_LOCATIONS.map((store) => (
              <div
                key={store.id}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <h3 className="text-sm font-black italic text-white tracking-tight uppercase">
                      {store.name}
                    </h3>
                    <div className="space-y-0.5">
                      <p className="text-[11px] font-bold text-white/60">{store.address}</p>
                      <p className="text-[11px] font-bold text-white/60">{store.city}</p>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#e2ff4a]/20 border border-[#e2ff4a]/30 flex items-center justify-center">
                    <MapPin size={14} className="text-[#e2ff4a]" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Map */}
        <div className="flex-1 relative min-h-[300px]">
          <StoreMap locations={STORE_LOCATIONS} />

          {/* Map legend */}
          <div className="absolute bottom-4 left-4 z-1000 bg-black/80 backdrop-blur-sm rounded-xl px-4 py-2 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#e2ff4a]"></div>
            <span className="text-[9px] font-black text-white/60 uppercase tracking-widest">BRAXX Service Centers</span>
          </div>
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

          {/* Form */}
          <form className="space-y-8 pt-8" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2 group">
                <label className="text-[9px] font-black text-black/40 tracking-widest uppercase transition-colors group-focus-within:text-black">Operative Name</label>
                <input
                  type="text"
                  {...register('name', { required: 'Operative Name is required' })}
                  className="w-full bg-transparent border-b-2 border-black/10 py-3 text-xs font-black focus:outline-none focus:border-black transition-all placeholder:text-black/10"
                  placeholder="COMMANDER"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
              </div>
              <div className="space-y-2 group">
                <label className="text-[9px] font-black text-black/40 tracking-widest uppercase transition-colors group-focus-within:text-black">Secure Email</label>
                <input
                  type="email"
                  {...register('email', { required: 'Email is required', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email format' } })}
                  className="w-full bg-transparent border-b-2 border-black/10 py-3 text-xs font-black focus:outline-none focus:border-black transition-all placeholder:text-black/10"
                  placeholder="OPERATIVE@NETWORK.COM"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
              </div>
            </div>

            <div className="space-y-2 group">
              <label className="text-[9px] font-black text-black/40 tracking-widest uppercase transition-colors group-focus-within:text-black">Subject</label>
              <input
                type="text"
                {...register('subject', { required: 'Subject is required' })}
                className="w-full bg-transparent border-b-2 border-black/10 py-3 text-xs font-black focus:outline-none focus:border-black transition-all placeholder:text-black/10"
                placeholder="FLEET INQUIRY"
              />
              {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>}
            </div>

            <div className="space-y-2 group">
              <label className="text-[9px] font-black text-black/40 tracking-widest uppercase transition-colors group-focus-within:text-black">Mission Brief</label>
              <textarea
                rows={3}
                {...register('message', { required: 'Mission Brief is required' })}
                className="w-full bg-transparent border-b-2 border-black/10 py-3 text-xs font-black focus:outline-none focus:border-black transition-all resize-none placeholder:text-black/10"
                placeholder="DESCRIBE THE OPERATION..."
              ></textarea>
              {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
            </div>

            <button
              disabled={isSubmitting}
              type="submit"
              className="w-full py-6 bg-black text-white rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] flex items-center justify-center gap-2 hover:bg-[#e2ff4a] hover:text-black transition-all group shadow-2xl">
              {isSubmitting ? 'Transmitting...' : 'TRANSMIT INTEL'}
              <Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
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
