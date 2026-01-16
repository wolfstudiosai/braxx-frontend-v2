"use client";

import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from './CartContext';
import Link from 'next/link';
import { ViewState } from '../types';

interface NavbarProps {
  cartCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({ cartCount: propCartCount }) => {
  const { cartCount: contextCartCount } = useCart();
  const count = propCartCount !== undefined ? propCartCount : contextCartCount;

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 py-6 pointer-events-none">
      <div className="flex-1"></div>

      {/* Centered Logo */}
      <div className="flex-1 flex justify-center pointer-events-auto">
        <Link href="/" className="text-3xl font-black italic tracking-tighter text-black">
          BRAXX
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 flex justify-end items-center gap-6 pointer-events-auto">
        <Link href="/shop" className="text-sm text-black hover:opacity-70 transition-colors font-black uppercase tracking-widest text-[10px]">
          GT
        </Link>
        <Link href="/shop" className="text-sm text-black hover:opacity-70 transition-colors font-black uppercase tracking-widest text-[10px]">
          GT PRO
        </Link>
        <Link href="/studio" className="text-sm text-black hover:opacity-70 transition-colors font-black uppercase tracking-widest text-[10px]">
          Studio
        </Link>
        <Link href="/contact" className="text-sm text-black hover:opacity-70 transition-colors font-black uppercase tracking-widest text-[10px]">
          Contact
        </Link>
        <Link href="/cart" className="relative text-black hover:opacity-70 transition-colors p-2">
          <ShoppingCart size={18} strokeWidth={2.5} />
          {count > 0 && (
            <span className="absolute -top-1 -right-1 bg-black text-[#e2ff4a] text-[8px] font-black px-1.5 py-0.5 rounded-full shadow-lg">
              {count}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
};
