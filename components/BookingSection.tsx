import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, ChevronRight } from 'lucide-react';

export const BookingSection: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return {
      day: d.toLocaleDateString('en-US', { weekday: 'short' }),
      date: d.getDate(),
      full: d
    };
  });

  return (
    <section className="py-24 px-8 bg-[#d4d4d4]">
      <div className="max-w-6xl mx-auto bg-white/40 backdrop-blur-xl rounded-[3rem] p-12 border border-white/50 shadow-2xl flex flex-col md:flex-row gap-12 items-center">
        <div className="flex-1 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white rounded-full text-[10px] font-bold tracking-widest uppercase">
            <Clock size={12} /> Live Inventory
          </div>
          <h2 className="text-5xl font-black tracking-tighter leading-none italic">
            BOOK A <span className="text-transparent border-text-black" style={{ WebkitTextStroke: '1px black' }}>TEST RIDE</span>
          </h2>
          <p className="text-gray-600 font-medium max-w-sm">
            Experience the raw torque of the S2 series. Select a date to visit our Los Angeles customization hub.
          </p>
        </div>

        <div className="flex-1 w-full bg-white rounded-[2.5rem] p-8 shadow-inner border border-black/5">
          <div className="flex justify-between items-center mb-8">
            <span className="font-bold text-sm">Select Departure Date</span>
            <CalendarIcon size={18} className="text-gray-400" />
          </div>
          
          <div className="flex justify-between gap-2 mb-8">
            {days.map((d, i) => (
              <button
                key={i}
                onClick={() => setSelectedDate(i)}
                className={`flex-1 py-4 rounded-2xl flex flex-col items-center transition-all ${
                  selectedDate === i 
                  ? 'bg-black text-white shadow-lg scale-105' 
                  : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
                }`}
              >
                <span className="text-[10px] font-bold uppercase mb-1">{d.day}</span>
                <span className="text-lg font-black">{d.date}</span>
              </button>
            ))}
          </div>

          <button className="w-full bg-[#e2ff4a] hover:bg-black hover:text-white text-black py-5 rounded-full font-black uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2 shadow-xl group">
            Confirm Booking <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};