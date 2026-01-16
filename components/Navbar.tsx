"use client";

import React, { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useCart } from './CartContext';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavbarProps {
  cartCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({ cartCount: propCartCount }) => {
  const { cartCount: contextCartCount } = useCart();
  const count = propCartCount !== undefined ? propCartCount : contextCartCount;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const navLinks = [
    { href: '/about', label: 'About' },
    { href: '/progress', label: 'Progress' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 md:px-8 py-4 md:py-6 pointer-events-none bg-linear-gradient-to-b from-[#d4d4d4] via-[#d4d4d4]/80 to-transparent">
        {/* Mobile Menu Button */}
        <div className="flex-1 flex items-center pointer-events-auto md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-black hover:opacity-70 transition-opacity"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Desktop Left Spacer */}
        <div className="flex-1 hidden md:block"></div>

        {/* Centered Logo */}
        <div className="flex-1 flex justify-center pointer-events-auto">
          <Link href="/" className="text-2xl md:text-3xl font-black italic tracking-tighter text-black">
            BRAXX
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex flex-1 justify-end items-center gap-6 pointer-events-auto">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`hover:opacity-70 transition-colors font-black uppercase tracking-widest text-[10px] ${pathname === link.href ? 'text-black' : 'text-black/70'
                }`}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/cart" className="relative text-black hover:opacity-70 transition-colors p-2">
            <ShoppingCart size={18} strokeWidth={2.5} />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 bg-black text-[#e2ff4a] text-[8px] font-black px-1.5 py-0.5 rounded-full shadow-lg">
                {count}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile Cart Icon */}
        <div className="flex-1 flex justify-end items-center pointer-events-auto md:hidden">
          <Link href="/cart" className="relative text-black hover:opacity-70 transition-colors p-2">
            <ShoppingCart size={20} strokeWidth={2.5} />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 bg-black text-[#e2ff4a] text-[8px] font-black px-1.5 py-0.5 rounded-full shadow-lg">
                {count}
              </span>
            )}
          </Link>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-[#d4d4d4] transition-transform duration-300 ease-out md:hidden ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}></div>

        <div className="relative h-full flex flex-col pt-24 px-8">
          {/* Navigation Links */}
          <div className="flex-1 flex flex-col gap-2">
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`text-4xl font-black italic tracking-tighter uppercase py-4 border-b border-black/10 transition-all hover:pl-4 hover:text-[#e2ff4a] ${pathname === link.href ? 'text-black' : 'text-black/60'
                  }`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Bottom Section */}
          <div className="py-8 border-t border-black/10">
            <div className="flex items-center gap-4 text-black/40">
              <span className="text-[10px] font-black uppercase tracking-widest">Los Angeles, CA</span>
              <span className="w-8 h-px bg-current"></span>
              <span className="text-[10px] font-black uppercase tracking-widest">EST. 2024</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
