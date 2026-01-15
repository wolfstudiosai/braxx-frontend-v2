import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Marquee } from './Marquee';
import { Product } from '@/types';

export const ProductRow = ({ products }: { products: Product[] }) => {
  const allProducts =
    products?.flatMap((product) =>
      product.variants.map((variant) => ({
        ...variant,
        productId: product.uuid,
        title: product.title,
      }))
    ) || [];

  return (
    <section className="bg-[#d4d4d4] w-full border-t border-black/10">
      <Marquee />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {allProducts.map((product, index) => (
          <div
            key={product.id}
            className={`group cursor-pointer py-12 flex flex-col min-h-[500px] transition-all duration-500 relative overflow-hidden bg-transparent
              ${index !== 3 ? 'lg:border-r' : ''} 
              md:border-b lg:border-b-0 border-black/10
              hover:bg-black/5
            `}
          >
            <div className="absolute top-8 right-8 p-3 bg-black text-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
              <ShoppingCart size={16} />
            </div>

            <div className="flex-1 flex items-center justify-center">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 drop-shadow-[0_20px_20px_rgba(0,0,0,0.1)]"
              />
            </div>

            <div className="mt-8 space-y-1 relative z-10 text-center">
              <h3 className="text-xl font-black italic tracking-tighter text-black uppercase">{`BRAXX ${product.title}: ${product.name.split(" ")[1].slice(0, 1)}`}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};