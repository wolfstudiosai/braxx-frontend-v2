"use client";

import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Loader2, Zap } from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';

export const ChatAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', role: 'model', text: "Operative active. Tactical support online. How can I assist your mission today?", timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const responseText = await sendMessageToGemini(messages, input);

    const modelMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: responseText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, modelMsg]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-8 right-8 flex flex-col items-end gap-4 z-100">
      {/* Mini Notification */}
      {isVisible && !isOpen && (
        <div className="bg-white rounded-2xl shadow-2xl p-4 flex items-center gap-4 relative animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-[280px]">
          <button
            onClick={(e) => { e.stopPropagation(); setIsVisible(false); }}
            className="absolute top-2 right-2 text-gray-300 hover:text-gray-600 transition-colors"
          >
            <X size={14} />
          </button>
          <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-[#e2ff4a] font-black text-lg relative shrink-0">
            B
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
          </div>
          <div className="cursor-pointer" onClick={() => setIsOpen(true)}>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Tactical Support</p>
            <p className="text-xs font-bold text-gray-800 line-clamp-1">Hi, how can we help with your GT configuration?</p>
          </div>
        </div>
      )}

      {/* Main Chat Window */}
      {isOpen && (
        <div className="w-[350px] md:w-[400px] h-[550px] bg-white rounded-[2.5rem] shadow-2xl border border-black/5 flex flex-col overflow-hidden animate-in zoom-in-95 duration-300">
          <div className="bg-black p-6 flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#e2ff4a] flex items-center justify-center text-black font-black text-sm">B</div>
              <div>
                <h3 className="text-xs font-black uppercase tracking-[0.2em]">BRAXX AI SUPPORT</h3>
                <span className="text-[8px] font-bold text-[#e2ff4a] uppercase tracking-widest flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-[#e2ff4a] rounded-full animate-pulse"></span> Tactical Link Active
                </span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/40 hover:text-white transition-colors">
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#f8f8f8] hide-scrollbar">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-4 rounded-3xl text-xs font-medium leading-relaxed ${msg.role === 'user'
                  ? 'bg-black text-white rounded-tr-none'
                  : 'bg-white border border-black/5 text-gray-800 rounded-tl-none shadow-sm'
                  }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-black/5 p-4 rounded-3xl rounded-tl-none shadow-sm">
                  <Loader2 size={16} className="animate-spin text-black/20" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-6 bg-white border-t border-black/5">
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="TYPE TRANSMISSION..."
                className="w-full bg-[#f8f8f8] border-none rounded-2xl py-4 pl-5 pr-12 text-xs font-black uppercase tracking-widest focus:ring-2 focus:ring-black/5 transition-all outline-none placeholder:text-black/10"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-black hover:text-[#e2ff4a] disabled:opacity-10 transition-colors"
              >
                <Send size={18} />
              </button>
            </div>
            <p className="text-[8px] font-black text-center mt-4 text-black/10 tracking-[0.3em] uppercase">End to End Encrypted Tactical Comms</p>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-black hover:bg-black/90 text-white p-5 rounded-4xl shadow-2xl transition-all hover:scale-110 active:scale-95 group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[#e2ff4a]/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <MessageSquare size={24} className="relative z-10" fill="currentColor" />
        </button>
      )}
    </div>
  );
};