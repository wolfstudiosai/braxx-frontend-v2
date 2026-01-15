
import React, { useState } from 'react';
import { ViewState, CartItem } from '../types';
import { Trash2, Plus, Minus, ArrowRight, CreditCard, Shield, Truck, CheckCircle2, ChevronLeft } from 'lucide-react';

interface CartPageProps {
  cart: CartItem[];
  setView: (view: ViewState) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, delta: number) => void;
}

export const CartPage: React.FC<CartPageProps> = ({ cart, setView, removeFromCart, updateQuantity }) => {
  const [step, setStep] = useState<'REVIEW' | 'DETAILS' | 'PAYMENT' | 'SUCCESS'>('REVIEW');
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 150;
  const total = subtotal + shipping;

  if (step === 'SUCCESS') {
    return (
      <div className="min-h-screen pt-32 flex flex-col items-center justify-center text-center px-8 bg-black">
        <div className="bg-white/5 p-16 rounded-[4rem] border border-white/10 shadow-2xl max-w-2xl space-y-8 animate-in zoom-in-95 duration-700">
          <div className="flex justify-center">
            <CheckCircle2 size={80} className="text-[#e2ff4a]" />
          </div>
          <h1 className="text-white text-6xl font-black italic uppercase tracking-tighter">Mission Confirmed</h1>
          <p className="text-white/40 font-bold uppercase tracking-widest text-xs">
            Your strategic order has been received. <br /> Check your secure email for transmission logs and delivery timeline.
          </p>
          <button 
            onClick={() => setView(ViewState.HOME)}
            className="px-12 py-5 bg-[#e2ff4a] text-black rounded-full font-black uppercase tracking-widest text-[10px] hover:bg-white transition-all"
          >
            Return to Base
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 flex flex-col lg:flex-row bg-[#d4d4d4]">
      {/* LEFT SIDE: Image / Info Branding */}
      <div className="w-full lg:w-1/2 h-[40vh] lg:h-auto relative overflow-hidden bg-black flex flex-col justify-start p-12 lg:p-20">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40 grayscale mix-blend-overlay"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1558980331-0672ff794669?q=80&w=2400&auto=format&fit=crop')` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent"></div>
        
        <div className="relative z-10 space-y-8 pt-12">
          <button 
            onClick={() => setView(ViewState.SHOP)}
            className="flex items-center gap-2 text-white/40 hover:text-[#e2ff4a] text-[10px] font-black uppercase tracking-widest transition-colors"
          >
            <ChevronLeft size={14} /> Return to Gear Selection
          </button>
          
          <div className="space-y-2">
            <h2 className="text-white text-5xl lg:text-6xl font-light italic uppercase tracking-tighter leading-tight whitespace-nowrap">
              AQUISITION PHASE 02
            </h2>
            <p className="text-[#e2ff4a] text-xs font-black uppercase tracking-[0.4em]">Finalizing Operational Deployment</p>
          </div>

          <div className="pt-8 border-t border-white/10 flex items-center justify-between">
            <div className="space-y-1">
              <span className="block text-[8px] font-black text-white/20 uppercase tracking-widest">Estimated Logistics</span>
              <span className="text-white font-bold text-sm">7-14 Business Days</span>
            </div>
            <div className="space-y-1 text-right">
              <span className="block text-[8px] font-black text-white/20 uppercase tracking-widest">Total Value</span>
              <span className="text-[#e2ff4a] font-black italic text-3xl">${total.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: Interactive Checkout Process */}
      <div className="w-full lg:w-1/2 bg-[#d4d4d4] flex flex-col p-8 lg:p-24 overflow-y-auto hide-scrollbar">
        <div className="max-w-xl mx-auto w-full space-y-12">
          
          {/* Progress Header */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <span className={`h-1 flex-1 ${step === 'REVIEW' || step === 'DETAILS' || step === 'PAYMENT' ? 'bg-black' : 'bg-black/10'}`}></span>
              <span className={`h-1 flex-1 ${step === 'DETAILS' || step === 'PAYMENT' ? 'bg-black' : 'bg-black/10'}`}></span>
              <span className={`h-1 flex-1 ${step === 'PAYMENT' ? 'bg-black' : 'bg-black/10'}`}></span>
            </div>
            <div className="flex justify-between items-baseline">
              <h3 className="text-4xl font-light italic uppercase tracking-tighter text-black">
                {step === 'REVIEW' && 'Review Assets'}
                {step === 'DETAILS' && 'Deploy Location'}
                {step === 'PAYMENT' && 'Secure Payment'}
              </h3>
              <span className="text-[10px] font-black text-black/30 uppercase tracking-widest">Step {step === 'REVIEW' ? '01' : step === 'DETAILS' ? '02' : '03'} / 03</span>
            </div>
          </div>

          {/* Step Content */}
          <div className="min-h-[400px]">
            {step === 'REVIEW' && (
              <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
                {cart.length === 0 ? (
                  <div className="py-24 text-center space-y-6">
                    <p className="text-black/30 font-black uppercase tracking-[0.3em]">Operational cache empty</p>
                    <button onClick={() => setView(ViewState.SHOP)} className="px-8 py-4 bg-black text-white rounded-full text-[10px] font-black uppercase tracking-widest">Acquire Gear</button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map(item => (
                      <div key={item.id} className="bg-white/40 p-6 rounded-3xl border border-white/60 flex items-center gap-6 group">
                        <div className="w-24 h-24 bg-black/5 rounded-2xl flex items-center justify-center overflow-hidden shrink-0">
                          <img src={item.image || 'https://raw.githubusercontent.com/StackBlitz/stackblitz-images/main/braxx-supreme.png'} className="w-full h-auto object-contain transform group-hover:scale-110 transition-transform" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-lg font-black italic uppercase truncate">{item.name}</h4>
                          <div className="flex items-center gap-4 mt-2">
                             <div className="flex items-center gap-3 bg-black/5 px-3 py-1.5 rounded-full">
                                <button onClick={() => updateQuantity(item.id, -1)} className="text-black/30 hover:text-black transition-colors"><Minus size={12}/></button>
                                <span className="text-[10px] font-black w-4 text-center">{item.quantity}</span>
                                <button onClick={() => updateQuantity(item.id, 1)} className="text-black/30 hover:text-black transition-colors"><Plus size={12}/></button>
                             </div>
                             <button onClick={() => removeFromCart(item.id)} className="text-black/20 hover:text-red-600 transition-colors"><Trash2 size={16} /></button>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-lg font-black italic">${(item.price * item.quantity).toLocaleString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {step === 'DETAILS' && (
              <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="text-[8px] font-black text-black/40 tracking-widest uppercase">Name</label>
                    <input type="text" className="w-full bg-transparent border-b border-black/10 py-3 text-xs font-black uppercase focus:border-black focus:outline-none transition-all" placeholder="FULL NAME" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[8px] font-black text-black/40 tracking-widest uppercase">Email</label>
                    <input type="email" className="w-full bg-transparent border-b border-black/10 py-3 text-xs font-black uppercase focus:border-black focus:outline-none transition-all" placeholder="SECURE COMMS" />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[8px] font-black text-black/40 tracking-widest uppercase">Address</label>
                  <input type="text" className="w-full bg-transparent border-b border-black/10 py-3 text-xs font-black uppercase focus:border-black focus:outline-none transition-all" placeholder="DEPLOYMENT POINT" />
                </div>
                <div className="grid grid-cols-3 gap-6">
                  <input type="text" className="w-full bg-transparent border-b border-black/10 py-3 text-xs font-black uppercase focus:border-black focus:outline-none transition-all" placeholder="CITY" />
                  <input type="text" className="w-full bg-transparent border-b border-black/10 py-3 text-xs font-black uppercase focus:border-black focus:outline-none transition-all" placeholder="STATE" />
                  <input type="text" className="w-full bg-transparent border-b border-black/10 py-3 text-xs font-black uppercase focus:border-black focus:outline-none transition-all" placeholder="ZIP" />
                </div>
              </div>
            )}

            {step === 'PAYMENT' && (
              <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
                <div className="space-y-1">
                  <label className="text-[8px] font-black text-black/40 tracking-widest uppercase">Card Intel</label>
                  <div className="relative">
                    <input type="text" className="w-full bg-transparent border-b border-black/10 py-4 text-xs font-black uppercase focus:border-black focus:outline-none transition-all" placeholder="0000 0000 0000 0000" />
                    <CreditCard className="absolute right-0 top-1/2 -translate-y-1/2 text-black/20" size={18} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <input type="text" className="w-full bg-transparent border-b border-black/10 py-3 text-xs font-black uppercase focus:border-black focus:outline-none transition-all" placeholder="EXP MM/YY" />
                  <input type="text" className="w-full bg-transparent border-b border-black/10 py-3 text-xs font-black uppercase focus:border-black focus:outline-none transition-all" placeholder="CVV" />
                </div>
                <div className="flex items-center gap-4 p-6 bg-black text-white rounded-3xl">
                  <Shield size={20} className="text-[#e2ff4a]" />
                  <span className="text-[9px] font-black uppercase tracking-widest leading-relaxed opacity-60">
                    Transmissions secured via 256-bit AES military-grade encryption protocols.
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Action Footer */}
          <div className="pt-8 border-t border-black/10 space-y-6">
            <div className="flex justify-between items-center text-black/40 font-bold uppercase tracking-widest text-[10px]">
              <span>Logistics (Shipping)</span>
              <span>${shipping.toLocaleString()}</span>
            </div>
            
            {step === 'REVIEW' && (
              <button 
                disabled={cart.length === 0}
                onClick={() => setStep('DETAILS')}
                className="w-full py-6 bg-black text-white rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-[#e2ff4a] hover:text-black transition-all shadow-xl disabled:opacity-20 flex items-center justify-center gap-3 group"
              >
                Proceed to Deployment <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            )}
            
            {step === 'DETAILS' && (
              <div className="flex gap-4">
                <button onClick={() => setStep('REVIEW')} className="px-6 py-6 border border-black/10 rounded-2xl text-black hover:bg-black hover:text-white transition-all"><ChevronLeft size={18} /></button>
                <button 
                  onClick={() => setStep('PAYMENT')}
                  className="flex-1 py-6 bg-black text-white rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-[#e2ff4a] hover:text-black transition-all shadow-xl group flex items-center justify-center gap-3"
                >
                  Confirm Details <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}

            {step === 'PAYMENT' && (
              <div className="flex gap-4">
                <button onClick={() => setStep('DETAILS')} className="px-6 py-6 border border-black/10 rounded-2xl text-black hover:bg-black hover:text-white transition-all"><ChevronLeft size={18} /></button>
                <button 
                  onClick={() => setStep('SUCCESS')}
                  className="flex-1 py-6 bg-[#e2ff4a] text-black rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-black hover:text-white transition-all shadow-xl flex items-center justify-center gap-3 group"
                >
                  Finalize Transmission <CreditCard size={16} />
                </button>
              </div>
            )}

            <div className="flex items-center gap-2 justify-center text-[8px] font-black text-black/20 uppercase tracking-[0.2em]">
               <Truck size={12} /> Priority Fleet Dispatch enabled for your sector
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
