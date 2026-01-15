"use client";

import React, { useState, useRef, useCallback, useEffect, useMemo } from 'react';

interface Product360ViewerProps {
  images: string[];
  className?: string;
}

export const Product360Viewer: React.FC<Product360ViewerProps> = ({ images, className = '' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef(0);
  const currentIndexRef = useRef(0);

  const totalImages = images.length;
  const sensitivity = 8;

  // Reset state when images change (variant change)
  useEffect(() => {
    setCurrentIndex(0);
    currentIndexRef.current = 0;
    setLoadedImages(new Set());
  }, [images]);

  // Preload images progressively in background
  useEffect(() => {
    if (images.length === 0) return;

    // Preload current image first, then nearby ones, then the rest
    const preloadOrder = [
      currentIndex,
      ...Array.from({ length: 5 }, (_, i) => (currentIndex + i + 1) % totalImages),
      ...Array.from({ length: 5 }, (_, i) => (currentIndex - i - 1 + totalImages) % totalImages),
    ];

    // Add remaining images
    for (let i = 0; i < totalImages; i++) {
      if (!preloadOrder.includes(i)) {
        preloadOrder.push(i);
      }
    }

    // Preload with delays to prevent blocking
    preloadOrder.forEach((imgIndex, i) => {
      setTimeout(() => {
        const img = new window.Image();
        img.onload = () => {
          setLoadedImages(prev => new Set([...prev, imgIndex]));
        };
        img.src = images[imgIndex];
      }, i * 50); // Stagger loads by 50ms
    });
  }, [images, totalImages]); // Only re-run when images array changes

  // Calculate new index based on drag delta
  const updateIndex = useCallback((clientX: number) => {
    const deltaX = clientX - startXRef.current;
    const indexDelta = Math.round(deltaX / sensitivity);

    let newIndex = (currentIndexRef.current + indexDelta) % totalImages;
    if (newIndex < 0) newIndex += totalImages;

    setCurrentIndex(newIndex);
  }, [totalImages]);

  // Mouse event handlers
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    startXRef.current = e.clientX;
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;
    updateIndex(e.clientX);
  }, [isDragging, updateIndex]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  const handleMouseLeave = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
      currentIndexRef.current = currentIndex;
    }
  }, [isDragging, currentIndex]);

  // Touch event handlers
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setIsDragging(true);
    startXRef.current = e.touches[0].clientX;
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging) return;
    updateIndex(e.touches[0].clientX);
  }, [isDragging, updateIndex]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  // Check if current image is loaded
  const isCurrentLoaded = loadedImages.has(currentIndex);
  const loadedCount = loadedImages.size;
  const loadingProgress = Math.round((loadedCount / totalImages) * 100);

  if (images.length === 0) {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <span className="text-gray-400">No images available</span>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative select-none ${className}`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ cursor: 'url("/icons/icons-360.png") 8 8, grab' }}
    >
      {/* Current visible image - show immediately */}
      <div className="relative flex justify-center items-center overflow-hidden h-full w-full">
        <img
          src={images[currentIndex]}
          alt={`Product view ${currentIndex + 1} of ${totalImages}`}
          draggable={false}
          className="w-full h-full object-contain pointer-events-none"
          style={{
            // transform: 'scale(1.25)',
            transformOrigin: 'center center',
            transition: 'transform 0.1s ease-out',
            WebkitMaskImage: 'radial-gradient(circle, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)',
            WebkitMaskRepeat: 'no-repeat',
            WebkitMaskPosition: 'center',
            WebkitMaskSize: 'cover',
            maskImage: 'radial-gradient(circle, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)',
            maskRepeat: 'no-repeat',
            maskPosition: 'center',
            maskSize: 'cover',
          }}
        />

        {/* Loading shimmer for unloaded images */}
        {!isCurrentLoaded && (
          <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent animate-pulse" />
        )}
      </div>

      {/* Drag hint indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 text-[10px] font-bold text-black/30 uppercase tracking-widest pointer-events-none">
        <svg className="w-4 h-4 rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
        </svg>
        <span>Drag to rotate</span>
        <svg className="w-4 h-4 rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
        </svg>
      </div>

      {/* Loading progress - small indicator */}
      {loadingProgress < 100 && (
        <div className="absolute top-20 right-10 px-3 py-1.5 bg-black/10 backdrop-blur-sm rounded-full text-[10px] font-bold text-black flex items-center gap-2">
          <div className="w-2 h-2 bg-black/30 rounded-full animate-pulse" />
          {loadingProgress}%
        </div>
      )}

      {/* Image counter */}
      {/* <div className="absolute top-4 right-4 px-3 py-1.5 bg-black/10 backdrop-blur-sm rounded-full text-[10px] font-bold text-black/50">
        {currentIndex + 1} / {totalImages}
      </div> */}
    </div>
  );
};
