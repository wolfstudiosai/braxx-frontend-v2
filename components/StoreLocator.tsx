"use client";

import React from 'react';
import { MapPin, Phone, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

interface StoreLocation {
  id: number;
  name: string;
  address: string;
  city: string;
  lat: number;
  lng: number;
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
    <div className="w-full h-full bg-white/5 flex items-center justify-center">
      <div className="text-white/40 text-sm font-bold">Loading map...</div>
    </div>
  )
});

export const StoreLocator: React.FC = () => {
  return (
    <section className="bg-black py-12 sm:py-16 md:py-24 relative overflow-hidden">
      {/* Background grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="relative z-10 px-4 sm:px-8 lg:px-24">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 sm:gap-8 mb-8 sm:mb-12 lg:mb-16">
          <div className="space-y-3 sm:space-y-4">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-[#e2ff4a] text-black rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-widest">
              <MapPin size={10} className="sm:w-3 sm:h-3" />
              Service Centers
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black italic text-white tracking-tighter leading-none">
              FIND A <br /> <span className="text-transparent" style={{ WebkitTextStroke: '1px white' }}>DEALER</span>
            </h2>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-2 sm:gap-3 text-white/60">
              <Phone size={14} className="sm:w-4 sm:h-4" />
              <span className="text-xs sm:text-sm font-bold tracking-wider">(888) 968-ZERO</span>
            </div>
          </div>
        </div>

        {/* Store Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {STORE_LOCATIONS.map((store) => (
            <div
              key={store.id}
              className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 hover:bg-white/10 transition-all duration-500"
            >
              <div className="flex items-start justify-between">
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#e2ff4a] animate-pulse"></div>
                    <span className="text-[9px] sm:text-[10px] font-black text-white/40 uppercase tracking-widest">Authorized Dealer</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black italic text-white tracking-tight uppercase">
                    {store.name}
                  </h3>

                  <div className="space-y-0.5 sm:space-y-1">
                    <p className="text-xs sm:text-sm font-bold text-white/60">{store.address}</p>
                    <p className="text-xs sm:text-sm font-bold text-white/60">{store.city}</p>
                  </div>
                </div>

                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#e2ff4a] group-hover:border-[#e2ff4a] transition-all duration-300 shrink-0">
                  <MapPin size={16} className="sm:w-[18px] sm:h-[18px] text-white/40 group-hover:text-black transition-colors" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Map */}
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 mb-8 sm:mb-12 h-[300px] sm:h-[400px] lg:h-[600px]">
          <StoreMap locations={STORE_LOCATIONS} />

          {/* Map legend */}
          <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-1000 bg-black/80 backdrop-blur-sm rounded-lg sm:rounded-xl px-3 py-1.5 sm:px-4 sm:py-2 flex items-center gap-2">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#e2ff4a]"></div>
            <span className="text-[8px] sm:text-[10px] font-black text-white/60 uppercase tracking-widest">BRAXX Service Centers</span>
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <Link
            href="/contact"
            className="w-full sm:w-auto text-center inline-flex items-center justify-center gap-2 sm:gap-3 bg-[#e2ff4a] hover:bg-white text-black px-6 sm:px-8 py-3 sm:py-4 rounded-full font-black uppercase text-[10px] sm:text-xs tracking-[0.15em] sm:tracking-[0.2em] transition-all group"
          >
            Request a Demo Ride
            <ArrowUpRight size={14} className="sm:w-4 sm:h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};
