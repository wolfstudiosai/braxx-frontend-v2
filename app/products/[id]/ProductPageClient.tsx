"use client";

import React, { useState } from 'react';
import { Product360Viewer } from '@/components/Product360Viewer';
import { Marquee } from '@/components/Marquee';
import {
  ShieldCheck, Zap, Activity, ChevronRight, Twitter, Facebook, Share2,
  Cpu, Layers, Disc, Wind, ArrowRight, Calendar as CalendarIcon, ArrowLeft, Plus
} from 'lucide-react';
import { useCart } from '@/components/CartContext';
import { Product, ProductVariant } from '@/types';
import { useRouter } from 'next/navigation';

interface ProductPageClientProps {
  product: Product;
  initialVariantIndex: number;
}

export function ProductPageClient({ product, initialVariantIndex }: ProductPageClientProps) {
  const router = useRouter();
  const { addToCart } = useCart();

  const [selectedVariantIndex, setSelectedVariantIndex] = useState(initialVariantIndex);
  const [isBookingMode, setIsBookingMode] = useState(false);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [activeUpperTab, setActiveUpperTab] = useState(0);
  const [activeLowerTab, setActiveLowerTab] = useState(0);

  // Get the currently selected variant
  const selectedVariant = product.variants[selectedVariantIndex];

  // Split specifications into upper and lower groups
  const specs = product.specifications || [];
  const midPoint = Math.ceil(specs.length / 2);
  const specGroups = {
    upper: specs.slice(0, midPoint),
    lower: specs.slice(midPoint)
  };

  // Calendar days for booking
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return {
      day: d.toLocaleDateString('en-US', { weekday: 'short' }),
      date: d.getDate(),
    };
  });

  // Handle variant change
  const handleVariantChange = (index: number) => {
    setSelectedVariantIndex(index);
    const newVariant = product.variants[index];
    if (newVariant) {
      const newVariantName = newVariant.name.replace(/\s+/g, '-');
      router.push(`/products/${product.uuid}?variantName=${newVariantName}`, { scroll: false });
    }
  };

  // Handle add to cart
  const handleAddToCart = () => {
    if (selectedVariant) {
      addToCart({
        id: parseInt(selectedVariant.id) || Date.now(),
        name: `${product.title} - ${selectedVariant.name}`,
        price: selectedVariant.sellingPrice,
        category: product.categories[0] || 'E-Moto',
        image: selectedVariant.images[0] || '',
        description: product.description,
      });
    }
  };

  // Format price with currency
  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Determine button color based on variant name
  const getVariantColorClass = (variant: ProductVariant) => {
    const name = variant.name.toLowerCase();
    if (name.includes('black')) return 'bg-black';
    if (name.includes('white') || name.includes('silver')) return 'bg-white border border-gray-300';
    if (name.includes('red')) return 'bg-red-600';
    if (name.includes('blue')) return 'bg-blue-600';
    if (name.includes('green')) return 'bg-green-600';
    return 'bg-gray-400';
  };

  return (
    <div className="bg-[#d4d4d4] min-h-screen">
      {/* FULL WIDTH HERO VIDEO */}
      <section className="relative w-full h-[70vh] lg:h-[85vh] overflow-hidden bg-black">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale scale-105"
        >
          <source src="https://player.vimeo.com/external/494252666.sd.mp4?s=727e3354bb0ce9c4f82873104690465241f89360&profile_id=165&oauth2_token_id=57447761" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-linear-to-b from-black/40 via-transparent to-[#d4d4d4]"></div>

        <div className="relative z-10 h-full flex flex-col justify-start px-8 lg:px-24 pt-32 lg:pt-40">
          <span className="text-[#e2ff4a] text-[10px] font-black tracking-[0.6em] uppercase mb-4 animate-in fade-in slide-in-from-top-4 duration-700">
            {product.categories[0] || 'Operational Prototype'}
          </span>
          <h1 className="text-white text-5xl lg:text-[10rem] font-light italic tracking-tighter uppercase leading-none animate-in fade-in slide-in-from-left-8 duration-1000 whitespace-nowrap">
            {product.title}
          </h1>
        </div>
      </section>

      {/* DEAL TICKER */}
      <Marquee
        text={`LIMITED AVAILABILITY: ${selectedVariant?.inventory || 0} UNITS IN STOCK // FREE STRATEGIC GEAR BUNDLE WITH FLEET ENLISTMENT // LIMITED SLOTS REMAINING`}
        className="border-none opacity-80"
      />

      {/* TOP SECTION: MAIN CONFIGURATOR */}
      <div className="max-w-[1600px] mx-auto px-8 lg:px-24 py-32">
        <div className="flex flex-col lg:flex-row gap-16 items-start">

          {/* Main Visuals Area */}
          <div className="flex-1 space-y-12">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-black text-white text-[9px] font-black uppercase tracking-widest rounded-full">
                  <ShieldCheck size={12} /> Military Grade Components
                </div>
                {/* Sharing Buttons */}
                <div className="flex items-center gap-4 text-black/30">
                  <button className="hover:text-black transition-colors"><Twitter size={14} /></button>
                  <button className="hover:text-black transition-colors"><Facebook size={14} /></button>
                  <button className="hover:text-black transition-colors"><Share2 size={14} /></button>
                </div>
              </div>
            </div>

            {/* 360 Product Viewer */}
            <div className="relative w-full aspect-square md:aspect-video flex items-center justify-center bg-white/40 rounded-[4rem] border border-white/60 shadow-xl overflow-hidden group">
              {selectedVariant?.images && selectedVariant.images.length > 0 ? (
                <Product360Viewer
                  images={selectedVariant.images}
                  className="w-full h-full"
                />
              ) : (
                <div className="flex items-center justify-center text-gray-400">
                  <span>No images available</span>
                </div>
              )}
              <div className="absolute inset-0 bg-linear-to-t from-black/5 to-transparent pointer-events-none"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: <Zap size={20} />, label: 'POWER', val: product.specifications?.[0]?.specs?.[0]?.value || '12KW PEAK', sub: 'High-Torque Performance' },
                { icon: <Activity size={20} />, label: 'RANGE', val: product.specifications?.[0]?.specs?.[1]?.value || '50 MILES', sub: 'Optimized Battery Life' },
                { icon: <ChevronRight size={20} />, label: 'TOP SPEED', val: product.specifications?.[0]?.specs?.[2]?.value || '60 MPH', sub: 'Urban Dominance' }
              ].map((item, i) => (
                <div key={i} className="bg-white/40 p-8 rounded-4xl border border-white/60 space-y-4">
                  <div className="text-black/40">{item.icon}</div>
                  <div>
                    <span className="block text-[8px] font-black text-black/30 uppercase tracking-[0.2em] mb-1">{item.label}</span>
                    <span className="block text-xl font-black italic text-black">{item.val}</span>
                    <span className="block text-[9px] font-bold text-black/50 uppercase tracking-widest">{item.sub}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Configurator Sidebar - Single Product Only (No Model Switch) */}
          <div className="w-full lg:w-[400px] sticky top-32">
            <div className="flex flex-col gap-5 bg-white/30 backdrop-blur-md p-7 rounded-[2.5rem] border border-white/40 shadow-2xl transition-all duration-500 overflow-hidden min-h-[680px] text-black">
              {/* Product Title */}
              <div className="flex items-center justify-between border-b border-black/5 pb-2">
                <h2 className="text-xl font-black italic tracking-tighter uppercase">{product.title}</h2>
                <span className="text-[8px] font-black text-black/30 tracking-widest uppercase">Base Configuration</span>
              </div>

              {/* Price Display */}
              {selectedVariant && (
                <div className="flex items-center justify-between px-2">
                  <span className="text-2xl font-black">{formatPrice(selectedVariant.sellingPrice, selectedVariant.priceCurrency)}</span>
                  <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                    {selectedVariant.inventory > 0 ? `${selectedVariant.inventory} in stock` : 'Out of Stock'}
                  </span>
                </div>
              )}

              <div className="flex-1">
                {!isBookingMode ? (
                  /* Configuration Mode View */
                  <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-500">
                    {/* Variant Color Selector */}
                    {product.variants.length > 0 && (
                      <div className="flex items-center justify-between p-4 bg-white/40 rounded-2xl border border-white/50">
                        <span className="text-[10px] font-black tracking-widest text-gray-400 uppercase">
                          {selectedVariant?.name || 'SELECT COLOR'}
                        </span>
                        <div className="flex items-center gap-3">
                          {product.variants.map((variant, idx) => (
                            <button
                              key={variant.id}
                              onClick={() => handleVariantChange(idx)}
                              title={variant.name}
                              className={`w-5 h-5 rounded-full border-2 transition-all ${selectedVariantIndex === idx
                                ? 'border-black scale-110 ring-2 ring-black/20'
                                : 'border-transparent'
                                } ${getVariantColorClass(variant)}`}
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Upper Specs Tabs */}
                    {specGroups.upper.length > 0 && (
                      <div className="space-y-4">
                        <div className="flex gap-2 p-1 bg-black/5 rounded-full">
                          {specGroups.upper.map((group, idx) => (
                            <button
                              key={group.group}
                              onClick={() => setActiveUpperTab(idx)}
                              className={`flex-1 py-2 text-[8px] font-black tracking-widest rounded-full transition-all ${activeUpperTab === idx ? 'bg-white text-black shadow-sm' : 'text-gray-400'}`}
                            >
                              {group.group.toUpperCase()}
                            </button>
                          ))}
                        </div>
                        <div className="space-y-2.5 px-1">
                          {specGroups.upper[activeUpperTab]?.specs.map((spec) => (
                            <div key={spec.key} className="flex justify-between items-center">
                              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{spec.key}</span>
                              <span className="text-[10px] font-black">{spec.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Lower Specs Tabs */}
                    {specGroups.lower.length > 0 && (
                      <div className="space-y-4">
                        <div className="flex gap-2 p-1 bg-black/5 rounded-full">
                          {specGroups.lower.map((group, idx) => (
                            <button
                              key={group.group}
                              onClick={() => setActiveLowerTab(idx)}
                              className={`flex-1 py-2 text-[8px] font-black tracking-widest rounded-full transition-all ${activeLowerTab === idx ? 'bg-white text-black shadow-sm' : 'text-gray-400'}`}
                            >
                              {group.group.toUpperCase()}
                            </button>
                          ))}
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          {specGroups.lower[activeLowerTab]?.specs.map((spec) => (
                            <div key={spec.key} className="bg-white/40 p-3 rounded-xl border border-white/50">
                              <span className="block text-[7px] font-black text-gray-400 uppercase mb-1">{spec.key}</span>
                              <span className="block text-[9px] font-black leading-none">{spec.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  /* Booking Mode View */
                  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <button
                      onClick={() => setIsBookingMode(false)}
                      className="w-full py-3 bg-black/5 text-black rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-black/10 transition-all flex items-center justify-center gap-2"
                    >
                      <ArrowLeft size={14} /> BACK TO SPECS
                    </button>

                    <div className="bg-white/40 p-6 rounded-4xl border border-white/50 space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-black text-black tracking-widest uppercase">SELECT DATE</span>
                        <CalendarIcon size={14} className="text-black/40" />
                      </div>

                      <div className="grid grid-cols-4 gap-2">
                        {days.map((d, i) => (
                          <button
                            key={i}
                            onClick={() => setSelectedDate(i)}
                            className={`py-3 rounded-xl flex flex-col items-center transition-all ${selectedDate === i
                              ? 'bg-black text-white shadow-lg'
                              : 'bg-white/60 text-gray-400 hover:bg-white/80'
                              }`}
                          >
                            <span className="text-[8px] font-bold uppercase mb-0.5">{d.day}</span>
                            <span className="text-xs font-black">{d.date}</span>
                          </button>
                        ))}
                        <div className="py-3 rounded-xl border border-dashed border-black/10 flex items-center justify-center text-[8px] text-gray-400 font-bold uppercase leading-tight text-center">
                          MORE<br />DATES
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/40 p-5 rounded-4xl border border-white/50">
                      <h4 className="text-[9px] font-black text-black tracking-widest uppercase mb-1">LOCATION</h4>
                      <p className="text-[10px] font-bold text-gray-500 uppercase leading-relaxed">
                        BRAXX STRATEGIC OUTPOST<br />LOS ANGELES, CA
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons Section */}
              <div className="pt-2 space-y-3">
                {!isBookingMode && (
                  <button
                    onClick={handleAddToCart}
                    disabled={!selectedVariant || selectedVariant.inventory === 0}
                    className="w-full py-4 bg-white/80 text-black border border-black/10 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    ADD TO CART <Plus size={14} />
                  </button>
                )}

                {!isBookingMode ? (
                  <button
                    onClick={() => setIsBookingMode(true)}
                    className="relative w-full py-5 bg-black text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] overflow-hidden group transition-all hover:scale-[1.02] active:scale-95 shadow-xl"
                  >
                    <div className="relative z-10 flex items-center justify-center gap-2">
                      BOOK TEST RIDE <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                    <div className="absolute top-0 right-0 w-1/4 h-full bg-white/5 skew-x-25 translate-x-4 pointer-events-none border-l border-white/10" />
                    <div className="absolute top-0 right-2 w-1/4 h-full bg-white/5 skew-x-25 translate-x-8 pointer-events-none" />
                  </button>
                ) : (
                  <button
                    disabled={selectedDate === null}
                    className={`w-full py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs transition-all flex items-center justify-center gap-2 shadow-xl ${selectedDate !== null
                      ? 'bg-[#e2ff4a] text-black hover:bg-black hover:text-white'
                      : 'bg-black/5 text-gray-400 cursor-not-allowed'
                      }`}
                  >
                    CONFIRM RESERVATION <ChevronRight size={16} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: DETAILED SPECS MATRIX */}
      <section className="bg-white py-32 px-8 lg:px-24">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-12">
              <div className="space-y-4">
                <span className="text-black/30 text-[10px] font-black uppercase tracking-[0.5em]">The Blueprint</span>
                <h2 className="text-black text-6xl font-black italic tracking-tighter uppercase leading-none">
                  TACTICAL <br /> MATRIX
                </h2>
              </div>

              <div className="space-y-6">
                {[
                  { label: "Nominal Output", val: "6,000 Watts" },
                  { label: "Max Torque", val: "250 N.m" },
                  { label: "Wheelbase", val: "50.4 Inches" },
                  { label: "Ground Clearance", val: "10.6 Inches" },
                  { label: "Curb Weight", val: "128 Lbs" },
                  { label: "Charge Type", val: "Standard 110V Outlet" }
                ].map((spec, i) => (
                  <div key={i} className="flex items-end justify-between border-b border-black/10 pb-4 group">
                    <span className="text-[10px] font-black text-black/30 uppercase tracking-widest transition-colors group-hover:text-black">{spec.label}</span>
                    <span className="text-sm font-black italic uppercase text-black">{spec.val}</span>
                  </div>
                ))}
              </div>

              <div className="pt-8">
                <p className="text-[11px] font-bold text-black/40 uppercase leading-relaxed max-w-sm">
                  *All specifications are verified in standard operational conditions. Performance may vary based on terrain and pilot load.
                </p>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-4 bg-black rounded-[4rem] blur-2xl opacity-5 group-hover:opacity-10 transition-opacity"></div>
              <div className="relative aspect-[4/5] bg-gray-50 rounded-[4rem] border border-black/5 overflow-hidden flex items-center justify-center p-12">
                <img
                  src={selectedVariant?.images?.[0] || "https://raw.githubusercontent.com/StackBlitz/stackblitz-images/main/braxx-supreme.png"}
                  alt="Top View"
                  className="w-full h-auto object-contain transform rotate-[-25deg] group-hover:rotate-0 transition-transform duration-1000 scale-125 group-hover:scale-100"
                />
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-[9px] font-black tracking-[0.5em] text-black/20 uppercase whitespace-nowrap">
                  Strategic Build // Type-01
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: PROPRIETARY TECH GRID */}
      <section className="bg-black py-32 px-8 lg:px-24 relative z-20">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-20 space-y-4">
            <span className="text-[#e2ff4a] text-[10px] font-black uppercase tracking-[0.5em]">The Architecture</span>
            <h2 className="text-white text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none">
              ENGINEERED <br /> FOR <span className="text-transparent" style={{ WebkitTextStroke: '1px white' }}>SURVIVAL</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                icon: <Cpu className="text-[#e2ff4a]" />,
                title: "V-CORE CONTROLLER",
                desc: "Proprietary vector-field processing for instant torque response and thermal efficiency.",
                img: "/images/bike-1.jpg"
              },
              {
                icon: <Layers className="text-[#e2ff4a]" />,
                title: "RIPSTOP CHASSIS",
                desc: "T6 aerospace-grade aluminum alloy frame with reinforced stress points for high-impact landings.",
                img: "/images/bike-2.jpg"
              },
              {
                icon: <Disc className="text-[#e2ff4a]" />,
                title: "RECON BRAKING",
                desc: "Oversized 240mm discs with sintered pads for zero-fade performance in extreme heat.",
                img: "/images/bike-3.jpg"
              },
              {
                icon: <Wind className="text-[#e2ff4a]" />,
                title: "SILENT DRIVE",
                desc: "Acoustically tuned drive chain with self-lubricating tech to maintain operational stealth.",
                img: "/images/bike-4.png"
              }
            ].map((tech, i) => (
              <div key={i} className="group relative bg-white/5 border border-white/10 rounded-[3rem] p-8 flex flex-col h-[450px] overflow-hidden transition-all hover:bg-white/10 hover:border-white/20">
                <div className="relative z-10 mb-8">{tech.icon}</div>
                <div className="relative z-10 flex-1">
                  <h3 className="text-white text-xl font-black italic tracking-tight mb-4">{tech.title}</h3>
                  <p className="text-white/40 text-[11px] font-bold leading-relaxed uppercase tracking-wider">{tech.desc}</p>
                </div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700 bg-cover bg-center grayscale" style={{ backgroundImage: `url(${tech.img})` }}></div>
                <div className="relative z-10 mt-auto pt-8 border-t border-white/5 flex items-center justify-between text-[#e2ff4a] text-[9px] font-black tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-all">
                  Deep Specs <ArrowRight size={14} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: CINEMATIC FULL WIDTH ACTION */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1558980331-0672ff794669?q=80&w=2400&auto=format&fit=crop"
            alt="Action"
            className="w-full h-full object-cover filter brightness-50"
          />
          <div className="absolute inset-0 bg-linear-to-b from-black via-transparent to-black/80"></div>
        </div>

        <div className="relative z-10 text-center space-y-8 px-8">
          <span className="text-[#e2ff4a] text-[12px] font-black tracking-[0.8em] uppercase block">Urban Operations</span>
          <h2 className="text-white text-7xl md:text-[10rem] font-black italic tracking-tighter uppercase leading-[0.8] mb-12">
            MASTER <br /> THE <br /> <span className="text-transparent" style={{ WebkitTextStroke: '2px white' }}>SILENCE</span>
          </h2>
          <button className="mx-auto bg-white text-black px-12 py-5 rounded-full font-black uppercase text-xs tracking-widest hover:bg-[#e2ff4a] transition-all transform hover:scale-110 shadow-2xl">
            Watch Operational Brief
          </button>
        </div>
      </section>
    </div>
  );
}
