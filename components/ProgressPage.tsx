"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { StoreLocator } from "./StoreLocator";

// Bike models data
const bikeModels = [
  {
    id: "supreme",
    title: "BRAXX O3",
    version: "v2.0",
    releaseDate: "December 2024",
    images: ["/bike/SUPREME/sup_gray01.png", "/bike/SUPREME/sup_gray02.png"],
    description: "Enhanced battery life, improved motor efficiency, and advanced digital display",
    features: [
      "Range: 120km per charge",
      "Top Speed: 80 km/h",
      "Smart connectivity features",
      "LED lighting system"
    ]
  },
  {
    id: "redbull",
    title: "BRAXX O3 Pro",
    version: "v1.5",
    releaseDate: "October 2024",
    images: ["/bike/RED_BULL/og01.png", "/bike/RED_BULL/og02_720.png"],
    description: "Premium performance with advanced suspension and enhanced power delivery",
    features: [
      "Range: 150km per charge",
      "Top Speed: 100 km/h",
      "Advanced suspension system",
      "Premium build quality"
    ]
  }
];

export const ProgressPage = () => {
  const router = useRouter();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const totalModels = bikeModels.length;

  return (
    <div className="pt-20 min-h-svh">
      {/* Header Section */}
      <div className="container px-4 py-16">
        <h2 className="text-6xl lg:text-8xl font-black italic text-black tracking-tighter leading-none">
          OUR <br /> <span className="text-transparent border-text-black uppercase" style={{ WebkitTextStroke: '1px black' }}>PROGRESS</span>
        </h2>
        <p className="text-black max-w-2xl text-xl mt-2 leading-relaxed">
          Discover the evolution of BRAXX bikes. Each model represents our commitment
          to innovation, performance, and sustainable transportation. Track our journey
          as we continue to push the boundaries of electric mobility.
        </p>
      </div>

      {/* Bike Models Grid */}
      <div className="container mx-auto px-4 pb-16">
        <div className="border border-neutral-700 text-white bg-black">
          <div className="grid grid-cols-1 sm:grid-cols-2 border-neutral-700">
            {bikeModels.map((bike, index) => {
              const isLastRowMobile = index === totalModels - 1;
              const isLastRowTablet = index >= totalModels - (totalModels % 2 === 0 ? 2 : 1);

              const isNotLastInRowTablet = (index + 1) % 2 !== 0;

              return (
                <motion.div
                  key={bike.id}
                  onClick={() => router.push(`/progress/${bike.id}`)}
                  onMouseEnter={() => setHoveredCard(bike.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className={`
                    p-6 border-neutral-700 relative overflow-hidden
                    border-b
                    min-h-[600px]
                    group
                    text-white cursor-pointer
                    ${isNotLastInRowTablet ? "sm:border-r" : ""}
                    ${isLastRowMobile ? "border-b-0" : ""}
                    ${isLastRowTablet ? "sm:border-b-0" : ""}
                  `}
                  transition={{ duration: 0.3 }}
                >
                  {/* Image Container with Swap Effect */}
                  <div className="absolute inset-0">
                    {/* Default Image */}
                    <motion.div
                      className="absolute inset-0"
                      initial={{ opacity: 1 }}
                      animate={{ opacity: hoveredCard === bike.id ? 0 : 1 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                    >
                      <Image
                        src={bike.images[0]}
                        alt={`${bike.title} - View 1`}
                        fill
                        className="object-contain p-8"
                        priority={index === 0}
                      />
                    </motion.div>

                    {/* Hover Image */}
                    <motion.div
                      className="absolute inset-0"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: hoveredCard === bike.id ? 1 : 0 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                    >
                      <Image
                        src={bike.images[1]}
                        alt={`${bike.title} - View 2`}
                        fill
                        className="object-contain p-8"
                      />
                    </motion.div>
                  </div>

                  {/* Gradient Overlay for better text readability */}
                  <div className="absolute inset-0 bg-linear-gradient-to-t from-black via-black/60 to-transparent z-1 opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col justify-between">
                    {/* Top Content */}
                    <div>
                      <div className="mb-3 inline-flex items-center gap-2">
                        <span className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-sm font-semibold border border-white/20">
                          {bike.version}
                        </span>
                        <span className="size-1 rounded-full bg-white mx-1"></span>
                        <span className="font-medium text-sm">{bike.releaseDate}</span>
                      </div>
                      <h3 className="text-4xl md:text-5xl font-bold mb-3 group-hover:text-white/90 transition-colors duration-300">
                        {bike.title}
                      </h3>
                      <p className="text-lg font-medium text-gray-200 mb-4 max-w-md">
                        {bike.description}
                      </p>
                    </div>

                    {/* Bottom Content - Features */}
                    <div className="space-y-3">
                      <h4 className="text-sm font-bold uppercase tracking-wider mb-3 text-gray-300">Key Features</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {bike.features.map((feature, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-2 text-gray-200"
                          >
                            <span className="size-1.5 rounded-full bg-white shrink-0"></span>
                            <span className="text-sm font-medium">{feature}</span>
                          </div>
                        ))}
                      </div>

                      {/* View Details Button */}
                      <motion.div
                        className="mt-6 inline-flex items-center gap-2 text-white font-semibold"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <span>View Progress</span>
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
      <StoreLocator />
    </div>
  );
}