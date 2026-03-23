"use client";

import { motion } from 'framer-motion';
import { WeddingData } from '@/data/invitation';

interface EventBookProps {
  data: typeof WeddingData.events;
}

export default function EventBook({ data }: EventBookProps) {
  return (
    <div className="relative flex-shrink-0 w-screen h-[100dvh] flex items-center justify-center px-6 overflow-hidden">
      
      {/* 1. THE OPEN BOOK (Perspective Reading Angle) */}
      <motion.div 
        initial={{ rotateX: 15, y: 30, opacity: 0 }}
        whileInView={{ rotateX: 5, y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        style={{ perspective: "1200px" }}
        className="relative z-20 w-full max-w-[340px] bg-[#fdfbf7] shadow-[20px_30px_60px_rgba(0,0,0,0.3)] rounded-sm flex flex-col overflow-hidden border-t-[6px] border-[#3e2c1c]"
      >
        {/* Garis Lipatan Tengah Buku (Horizontal karena Mobile Stack) */}
        <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-black/5 shadow-inner z-20" />

        {/* --- HALAMAN ATAS: AKAD --- */}
        <div className="flex-1 p-6 flex flex-col justify-center items-center text-center bg-[#fdfbf7]">
          <div className="w-10 h-[1px] bg-amber-800/30 mb-4" />
          <h3 className="font-serif text-xl text-amber-900 italic mb-4">
            Akad Nikah
          </h3>
          
          <div className="space-y-1 text-stone-700">
            <p className="text-[11px] font-bold tracking-[0.2em] uppercase">{data.akad.date}</p>
            <p className="text-[10px] opacity-70">{data.akad.time}</p>
            <div className="py-2">
              <p className="text-xs italic font-medium text-stone-800">{data.akad.location}</p>
              <p className="text-[9px] leading-relaxed opacity-60 mt-1 px-4 italic">
                {data.akad.address}
              </p>
            </div>
          </div>
        </div>

        {/* --- HALAMAN BAWAH: RESEPSI & MAPS --- */}
        <div className="flex-1 p-6 flex flex-col justify-center items-center text-center bg-[#f9f7f0] border-t border-black/5">
          <h3 className="font-serif text-xl text-amber-900 italic mb-4">
            Resepsi
          </h3>
          
          <div className="space-y-1 text-stone-700 mb-6">
            <p className="text-[11px] font-bold tracking-[0.2em] uppercase">{data.resepsi.date}</p>
            <p className="text-[10px] opacity-70">{data.resepsi.time}</p>
            <p className="text-xs italic font-medium text-stone-800 py-1">{data.resepsi.location}</p>
          </div>

          {/* Button Petunjuk Lokasi (Touch Target) */}
          <a 
            href={data.akad.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 bg-stone-800 text-white text-[9px] tracking-[0.3em] uppercase hover:bg-stone-900 active:scale-95 transition-all rounded-sm shadow-md font-medium"
          >
            Petunjuk Lokasi
          </a>
        </div>

        {/* Ornamen: Bayangan Stand Buku di bawah */}
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[90%] h-4 bg-black/20 blur-xl -z-10" />
      </motion.div>

      {/* 2. STAND KAYU (Visual Hint) */}
      <div className="absolute bottom-[20%] w-[200px] h-[10px] bg-[#3e2c1c] rounded-full blur-2xl opacity-40 -z-0" />

    </div>
  );
}