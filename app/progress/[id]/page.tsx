"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, X, Maximize2 } from "lucide-react";

// Gallery data structure
const bikeGalleries: Record<string, {
  title: string;
  version: string;
  releaseDate: string;
  description: string;
  heroImages: string[];
  features: string[];
  sections: {
    name: string;
    folder: string;
    images: string[];
  }[];
}> = {
  supreme: {
    title: "BRAXX O3",
    version: "v2.0",
    releaseDate: "December 2024",
    description: "Enhanced battery life, improved motor efficiency, and advanced digital display. The O3 represents our commitment to sustainable urban transportation.",
    heroImages: ["/bike/SUPREME/sup_gray01.png", "/bike/SUPREME/sup_gray02.png"],
    features: [
      "Range: 120km per charge",
      "Top Speed: 80 km/h",
      "Smart connectivity features",
      "LED lighting system"
    ],
    sections: [
      {
        name: "Dark Camo",
        folder: "/bike/SUPREME/SUPREME DECALS DARK CAMO-20251208T071556Z-1-001/SUPREME DECALS DARK CAMO",
        images: Array.from({ length: 11 }, (_, i) => {
          const num = i < 8 ? (i + 1).toString().padStart(2, '0') : (i + 3).toString().padStart(2, '0');
          return `SUPREME DECALS DARK CAMO-${num}.png`;
        })
      },
      {
        name: "Red",
        folder: "/bike/SUPREME/SUPREME DECALS RED-20251208T071629Z-1-001/SUPREME DECALS RED",
        images: Array.from({ length: 15 }, (_, i) => `SUPREME DECALS RED-${(i + 1).toString().padStart(2, '0')}.png`)
      },
      {
        name: "White Camo",
        folder: "/bike/SUPREME/SUPREME DECALS WHITE CAMO-20251208T071636Z-1-001/SUPREME DECALS WHITE CAMO",
        images: Array.from({ length: 15 }, (_, i) => `SUPREME DECALS WHITE CAMO-${(i + 1).toString().padStart(2, '0')}.png`)
      }
    ]
  },
  redbull: {
    title: "BRAXX O3 Pro",
    version: "v1.5",
    releaseDate: "October 2024",
    description: "Premium performance with advanced suspension and enhanced power delivery. Built for those who demand the absolute best in electric mobility.",
    heroImages: ["/bike/RED_BULL/og01.png", "/bike/RED_BULL/og02_720.png"],
    features: [
      "Range: 150km per charge",
      "Top Speed: 100 km/h",
      "Advanced suspension system",
      "Premium build quality"
    ],
    sections: [
      {
        name: "Light",
        folder: "/bike/RED_BULL/RB DECALS LIGHT-20251208T065947Z-1-001/RB DECALS LIGHT",
        images: Array.from({ length: 10 }, (_, i) => `REDBULL DECALS LIGHT-${(i + 1).toString().padStart(2, '0')}.png`)
      },
      {
        name: "OG",
        folder: "/bike/RED_BULL/RB DECALS OG-20251208T070016Z-1-001/RB DECALS OG",
        images: Array.from({ length: 10 }, (_, i) => `REDBULL DECALS OG-${(i + 1).toString().padStart(2, '0')}.png`)
      },
      {
        name: "Red",
        folder: "/bike/RED_BULL/RB DECALS RED-20251208T070033Z-1-001/RB DECALS RED",
        images: Array.from({ length: 10 }, (_, i) => `REDBULL DECALS RED-${(i + 1).toString().padStart(2, '0')}.png`)
      }
    ]
  }
};

export default function SingleProgressPage() {
  const params = useParams();
  const bikeId = params?.id as string;
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState(0);

  const gallery = bikeGalleries[bikeId];

  if (!gallery) {
    return (
      <div className="bg-[#d4d4d4] min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center space-y-6">
          <h1 className="text-6xl font-black italic text-black tracking-tighter">NOT FOUND</h1>
          <p className="text-black/60 font-bold uppercase tracking-widest text-sm">The requested model doesn&apos;t exist in our database.</p>
          <Link
            href="/progress"
            className="inline-flex items-center gap-3 bg-black text-white px-8 py-4 rounded-full font-black uppercase text-xs tracking-[0.2em] hover:bg-[#e2ff4a] hover:text-black transition-all"
          >
            <ArrowLeft size={16} />
            Back to Progress
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#d4d4d4] min-h-screen selection:bg-black selection:text-[#e2ff4a]">
      {/* Hero Section */}
      <section className="relative w-full min-h-[70vh] overflow-hidden bg-black">
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>

        {/* Hero Images */}
        <div className="absolute inset-0 flex">
          {gallery.heroImages.map((image, index) => (
            <div
              key={index}
              className="flex-1 relative cursor-pointer group"
              onClick={() => setSelectedImage(image)}
            >
              <Image
                src={image}
                alt={`${gallery.title} - View ${index + 1}`}
                fill
                className="object-contain p-8 lg:p-16 group-hover:scale-105 transition-transform duration-700"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <Maximize2 size={32} className="text-white" />
              </div>
            </div>
          ))}
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-gradient-to-t from-[#d4d4d4] to-transparent"></div>

        {/* Back Button */}
        <Link
          href="/progress"
          className="absolute top-28 left-8 lg:left-24 z-20 inline-flex items-center gap-3 text-white/60 hover:text-[#e2ff4a] transition-colors group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] font-black uppercase tracking-widest">Back to Progress</span>
        </Link>

        {/* Version Badge */}
        <div className="absolute top-28 right-8 lg:right-24 z-20">
          <span className="px-4 py-2 bg-[#e2ff4a] text-black rounded-full text-[10px] font-black uppercase tracking-widest">
            {gallery.version}
          </span>
        </div>
      </section>

      {/* Content Section */}
      <div className="max-w-[1600px] mx-auto px-8 lg:px-24">
        {/* Header */}
        <header className="py-16 border-b border-black/10">
          <div className="flex items-center gap-4 mb-6">
            <span className="w-12 h-[2px] bg-[#e2ff4a]"></span>
            <span className="text-black/40 text-[10px] font-black tracking-[0.6em] uppercase">{gallery.releaseDate}</span>
          </div>
          <h1 className="text-6xl lg:text-[8rem] font-black italic text-black tracking-tighter leading-none uppercase mb-8">
            {gallery.title}
          </h1>
          <p className="text-lg font-bold text-black/60 max-w-2xl leading-relaxed">
            {gallery.description}
          </p>

          {/* Features Grid */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
            {gallery.features.map((feature, idx) => (
              <div key={idx} className="p-6 bg-white/50 border border-black/5 rounded-2xl">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#e2ff4a]"></div>
                  <span className="text-xs font-black text-black uppercase tracking-tight">{feature}</span>
                </div>
              </div>
            ))}
          </div>
        </header>

        {/* Section Tabs */}
        <div className="pt-16 pb-8">
          <div className="flex items-end justify-between mb-8">
            <div className="space-y-2">
              <span className="text-black/30 text-[9px] font-black uppercase tracking-[0.5em] block">Design Archive</span>
              <h2 className="text-4xl font-black italic tracking-tighter uppercase text-black">Color Variants</h2>
            </div>
            <div className="h-px flex-1 bg-black/5 mx-12 hidden lg:block"></div>
          </div>

          {/* Section Navigation */}
          <div className="flex flex-wrap gap-3 mb-12">
            {gallery.sections.map((section, index) => (
              <button
                key={index}
                onClick={() => setActiveSection(index)}
                className={`px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${activeSection === index
                  ? 'bg-black text-white'
                  : 'bg-white/50 text-black/60 hover:bg-black/10'
                  }`}
              >
                {section.name}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <section className="pb-32">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {gallery.sections[activeSection].images.map((image, imageIndex) => {
              const imagePath = `${gallery.sections[activeSection].folder}/${image}`;

              return (
                <motion.div
                  key={imageIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: imageIndex * 0.05 }}
                  className="group relative aspect-square bg-white/30 border border-black/5 rounded-2xl overflow-hidden cursor-pointer"
                  onClick={() => setSelectedImage(imagePath)}
                >
                  <Image
                    src={imagePath}
                    alt={`${gallery.title} - ${gallery.sections[activeSection].name} - ${imageIndex + 1}`}
                    fill
                    className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center">
                      <Maximize2 size={16} className="text-black" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-black text-white p-16 lg:p-24 mb-32 relative overflow-hidden rounded-3xl">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-[#e2ff4a] opacity-5 -skew-x-12 translate-x-1/2"></div>
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}></div>

          <div className="max-w-2xl relative z-10 space-y-8">
            <span className="text-[#e2ff4a] text-[10px] font-black uppercase tracking-[0.5em]">Interested in {gallery.title}?</span>
            <h2 className="text-5xl md:text-7xl font-light italic tracking-tighter uppercase leading-[0.9]">
              Request a <br /> <span className="text-transparent" style={{ WebkitTextStroke: '1px white' }}>Demo Ride</span>
            </h2>
            <p className="text-lg font-medium opacity-40 leading-snug">
              Experience the future of urban mobility. Schedule a test ride at one of our authorized dealers.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 bg-[#e2ff4a] text-black px-8 py-4 rounded-full font-black uppercase text-[10px] tracking-[0.2em] hover:bg-white transition-all"
              >
                Contact Us
              </Link>
              <Link
                href="/progress"
                className="inline-flex items-center gap-3 bg-white/10 text-white px-8 py-4 rounded-full font-black uppercase text-[10px] tracking-[0.2em] hover:bg-white/20 transition-all border border-white/20"
              >
                View All Models
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            {/* Close Button */}
            <button
              className="absolute top-6 right-6 z-10 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-[#e2ff4a] hover:text-black transition-all flex items-center justify-center"
              onClick={() => setSelectedImage(null)}
            >
              <X size={20} />
            </button>

            {/* Image */}
            <motion.div
              className="relative max-w-7xl max-h-[90vh] w-full h-full"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage}
                alt="Full size view"
                fill
                className="object-contain"
                quality={100}
              />
            </motion.div>

            {/* Image Info */}
            <div className="absolute bottom-6 left-6 text-white/60">
              <span className="text-[10px] font-black uppercase tracking-widest">Click anywhere to close</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
