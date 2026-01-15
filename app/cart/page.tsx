"use client";

import React, { useState } from 'react';
import { useCart } from '@/components/CartContext';
import { Trash2, Plus, Minus, ArrowRight, CreditCard, Shield, Truck, CheckCircle2, ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, total } = useCart();
  const [step, setStep] = useState<'REVIEW' | 'DETAILS' | 'PAYMENT' | 'SUCCESS'>('REVIEW');
  const router = useRouter();
  const shipping = 150;

  if (step === 'SUCCESS') {
    return (
      <div className="min-h-screen pt-32 flex flex-col items-center justify-center text-center px-8 bg-black text-white">
        <div className="bg-white/5 p-16 rounded-[4rem] border border-white/10 shadow-2xl max-w-2xl space-y-8 animate-in zoom-in-95 duration-700">
          <div className="flex justify-center text-[#e2ff4a]"><CheckCircle2 size={80} /></div>
          <h1 className="text-6xl font-black italic uppercase tracking-tighter">Mission Confirmed</h1>
          <button onClick={() => router.push('/')} className="inline-block px-12 py-5 bg-[#e2ff4a] text-black rounded-full font-black uppercase tracking-widest text-[10px] hover:bg-white transition-all">
            Return to Base
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 flex flex-col lg:flex-row">
      <div className="w-full lg:w-1/2 h-[40vh] lg:h-auto relative overflow-hidden bg-black p-12 lg:p-20 flex flex-col justify-start">
        <div className="absolute inset-0 bg-cover bg-center opacity-40 grayscale mix-blend-overlay" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1558980331-0672ff794669?q=80&w=2400&auto=format&fit=crop')` }}></div>
        <div className="relative z-10 space-y-8 pt-12 text-white">
          <button onClick={() => router.push('/shop')} className="flex items-center gap-2 text-white/40 hover:text-[#e2ff4a] text-[10px] font-black uppercase tracking-widest transition-colors">
            <ChevronLeft size={14} /> Return to Gear Selection
          </button>
          <h2 className="text-5xl lg:text-6xl font-light italic uppercase tracking-tighter leading-tight">AQUISITION PHASE 02</h2>
          <div className="pt-8 border-t border-white/10 flex items-center justify-between">
            <span className="text-white font-bold text-sm">Logistics: 7-14 Business Days</span>
            <span className="text-[#e2ff4a] font-black italic text-3xl">${total.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex flex-col p-8 lg:p-24 overflow-y-auto hide-scrollbar bg-[#d4d4d4]">
        <div className="max-w-xl mx-auto w-full space-y-12">
          {step === 'REVIEW' && (
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
              <h3 className="text-4xl font-light italic uppercase tracking-tighter text-black">Review Assets</h3>
              {cart.length === 0 ? (
                <div className="py-24 text-center space-y-6">
                  <p className="text-black/30 font-black uppercase tracking-[0.3em]">Operational cache empty</p>
                  <button onClick={() => router.push('/shop')} className="inline-block px-8 py-4 bg-black text-white rounded-full text-[10px] font-black uppercase tracking-widest">Acquire Gear</button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map(item => (
                    <div key={item.id} className="bg-white/40 p-6 rounded-3xl border border-white/60 flex items-center gap-6 group">
                      <div className="w-24 h-24 bg-black/5 rounded-2xl overflow-hidden shrink-0">
                        <img src={item.image || 'https://raw.githubusercontent.com/StackBlitz/stackblitz-images/main/braxx-supreme.png'} className="w-full h-auto object-contain" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-black italic uppercase truncate">{item.name}</h4>
                        <div className="flex items-center gap-4 mt-2">
                          <div className="flex items-center gap-3 bg-black/5 px-3 py-1.5 rounded-full">
                            <button onClick={() => updateQuantity(item.id, -1)}><Minus size={12} /></button>
                            <span className="text-[10px] font-black">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, 1)}><Plus size={12} /></button>
                          </div>
                          <button onClick={() => removeFromCart(item.id)} className="text-black/20 hover:text-red-600"><Trash2 size={16} /></button>
                        </div>
                      </div>
                    </div>
                  ))}
                  <button onClick={() => setStep('DETAILS')} className="w-full py-6 bg-black text-white rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-[#e2ff4a] hover:text-black transition-all">Proceed to Deployment <ArrowRight size={16} className="inline ml-2" /></button>
                </div>
              )}
            </div>
          )}

          {step === 'DETAILS' && (
            <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
              <h3 className="text-4xl font-light italic uppercase tracking-tighter text-black">Deploy Location</h3>
              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setStep('PAYMENT'); }}>
                <input type="text" required className="w-full bg-transparent border-b border-black/10 py-3 text-xs font-black uppercase focus:border-black outline-none" placeholder="FULL NAME" />
                <input type="email" required className="w-full bg-transparent border-b border-black/10 py-3 text-xs font-black uppercase focus:border-black outline-none" placeholder="SECURE COMMS" />
                <input type="text" required className="w-full bg-transparent border-b border-black/10 py-3 text-xs font-black uppercase focus:border-black outline-none" placeholder="DEPLOYMENT POINT" />
                <button type="submit" className="w-full py-6 bg-black text-white rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-[#e2ff4a] hover:text-black transition-all">Confirm Details <ArrowRight size={16} className="inline ml-2" /></button>
              </form>
            </div>
          )}

          {step === 'PAYMENT' && (
            <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
              <h3 className="text-4xl font-light italic uppercase tracking-tighter text-black">Secure Payment</h3>
              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setStep('SUCCESS'); }}>
                <input type="text" required className="w-full bg-transparent border-b border-black/10 py-3 text-xs font-black uppercase focus:border-black outline-none" placeholder="CARD NUMBER" />
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" required className="w-full bg-transparent border-b border-black/10 py-3 text-xs font-black uppercase focus:border-black outline-none" placeholder="MM/YY" />
                  <input type="text" required className="w-full bg-transparent border-b border-black/10 py-3 text-xs font-black uppercase focus:border-black outline-none" placeholder="CVV" />
                </div>
                <button type="submit" className="w-full py-6 bg-[#e2ff4a] text-black rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-black hover:text-white transition-all">Finalize Transmission <CreditCard size={16} className="inline ml-2" /></button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}