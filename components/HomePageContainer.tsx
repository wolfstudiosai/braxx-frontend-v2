"use client";

import React, { useState } from 'react';
import { Configurator } from '@/components/Configurator';
import { Product360Viewer } from '@/components/Product360Viewer';
import { Marquee } from '@/components/Marquee';
import { ProductRow } from '@/components/ProductRow';
import { VideoSlideshow } from '@/components/VideoSlideshow';
import { ParallaxSection } from '@/components/ParallaxSection';
import { BlogSection } from '@/components/BlogSection';
import { StoreLocator } from '@/components/StoreLocator';
import { useCart } from '@/components/CartContext';
import { Product } from '@/types';

interface HomePageContainerProps {
  products: Product[];
}

export const HomePageContainer = ({ products }: HomePageContainerProps) => {
  const { addToCart } = useCart();
  const [selectedProductIndex, setSelectedProductIndex] = useState(0);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);

  // Get the currently selected product and variant
  const selectedProduct = products[selectedProductIndex];
  const selectedVariant = selectedProduct?.variants[selectedVariantIndex];

  // Handle add to cart with the selected product and variant
  const handleAddToCart = (variantId: string) => {
    if (!selectedProduct) return;

    const variant = selectedProduct.variants.find(v => v.id === variantId);
    if (!variant) return;

    addToCart({
      id: parseInt(variant.id.replace(/\D/g, '').slice(0, 8)) || Date.now(),
      name: `${selectedProduct.title} - ${variant.name}`,
      price: variant.sellingPrice,
      category: selectedProduct.categories[0] || 'Bikes',
      image: variant.images[0] || '',
      description: selectedProduct.title,
    });
  };

  // Handle product change - reset variant index
  const handleProductChange = (index: number) => {
    setSelectedProductIndex(index);
    setSelectedVariantIndex(0); // Reset variant when product changes
  };

  // Get images for 360 viewer from currently selected variant
  const viewerImages = selectedVariant?.images || [];

  return (
    <>
      <section className="relative w-full min-h-screen flex flex-col lg:block overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-white/20 via-transparent to-black/5 pointer-events-none"></div>

        {/* 360 Viewer - Full screen centered */}
        <div className="relative w-full h-[65vh] md:h-[80vh] lg:h-full flex items-center justify-center animate-in zoom-in-95 duration-1000">
          <Product360Viewer
            images={viewerImages}
            className="w-full h-full"
          />
        </div>

        {/* Configurator - Bottom on mobile, Left on desktop */}
        <div className="relative lg:absolute px-4 lg:px-0 lg:left-6 lg:top-1/2 lg:-translate-y-1/2 z-20 w-full lg:w-96 animate-in slide-in-from-bottom lg:slide-in-from-left duration-700 pb-8 lg:pb-0">
          {selectedProduct ? (
            <Configurator
              product={selectedProduct}
              products={products}
              onProductChange={handleProductChange}
              selectedProductIndex={selectedProductIndex}
              selectedVariantIndex={selectedVariantIndex}
              onVariantChange={setSelectedVariantIndex}
              onAddToCart={handleAddToCart}
            />
          ) : (
            <div className="text-center text-gray-500">Loading products...</div>
          )}
        </div>

        {/* Speed/Precision/Silence - Hidden on mobile */}
        <div className="hidden lg:flex absolute bottom-12 left-1/2 -translate-x-1/2 items-center gap-4 text-[10px] font-black tracking-[0.5em] uppercase opacity-20 pointer-events-none">
          <span>Speed</span>
          <div className="w-12 h-px bg-black"></div>
          <span>Precision</span>
          <div className="w-12 h-px bg-black"></div>
          <span>Silence</span>
        </div>
      </section>

      <Marquee className="border-t-0" />

      <ParallaxSection
        title="UNRIVALED PERFORMANCE"
        subtitle="(learn more)"
        image="/images/UNRIVALED-PERFORMANCE.jpg"
      />

      <ProductRow products={products} />
      <VideoSlideshow />
      <StoreLocator />
      <BlogSection />
    </>
  );
}