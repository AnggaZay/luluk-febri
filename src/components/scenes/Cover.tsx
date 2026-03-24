"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import { WeddingData } from '@/data/invitation';

interface CoverProps {
  data: typeof WeddingData;
  onOpen: () => void;
}

export default function Cover({ data, onOpen }: CoverProps) {
  return (
    <div className="relative h-[100dvh] w-full flex flex-col items-center justify-center overflow-hidden bg-stone-900">
      
      {/* 1. BACKGROUND: Portrait Optimized */}
      <div className="absolute inset-0 z-0">
        <Image
          src={data.coverPhoto} 
          alt="Wedding Cover"
          fill
          className="object-cover opacity-50 scale-110"
          priority
          sizes="100vw"
        />
        {/* Overlay Vignette: Biar fokus ke tengah */}
        <div className="absolute inset-0 bg-gradient-to-b from-stone-900/60 via-transparent to-stone-900" />
      </div>

      {/* 2. CONTENT: Elegant Typography */}
      <div className="relative z-10 text-center px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="space-y-4"
        >
          <span className="uppercase tracking-[0.4em] text-[10px] text-stone-400 font-medium block">
            The Wedding of
          </span>
          
          <div className="flex flex-col items-center">
            <h1 className="text-5xl font-serif text-stone-100 leading-tight">
              {data.groom.shortName}
            </h1>
            
            {/* ✨ CUSTOM AMPERSAND: Warna merah elegan, ukuran lebih besar, font meliuk (cursive) */}
            <span className="text-5xl font-[cursive] italic text-rose-600 my-1 drop-shadow-md">&</span>
            
            <h1 className="text-5xl font-serif text-stone-100 leading-tight">
              {data.bride.shortName}
            </h1>
          </div>

          <div className="h-[1px] w-12 bg-stone-700 mx-auto my-6" />
          
          <p className="text-sm font-light tracking-[0.3em] text-stone-300">
            01 . 04 . 2026
          </p>
        </motion.div>

        {/* 3. INTERACTIVE BUTTON: The "Zoom Trigger" */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="mt-16"
        >
          <button
            onClick={onOpen}
            className="relative px-10 py-4 overflow-hidden rounded-full border border-stone-100/20 bg-white/5 backdrop-blur-md active:scale-90 transition-transform duration-200"
          >
            <span className="relative z-10 text-xs text-stone-100 font-medium tracking-[0.2em] uppercase">
              Buka Undangan
            </span>
            {/* Animasi kilatan cahaya di tombol */}
            <motion.div 
              animate={{ x: ['-100%', '200%'] }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear", repeatDelay: 1 }}
              className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
            />
          </button>
        </motion.div>
      </div>

      {/* 4. HINT: Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.4, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute bottom-10 text-stone-500 flex flex-col items-center gap-3"
      >
        <span className="text-[9px] uppercase tracking-[0.3em]">Scroll to Enter</span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-stone-500 to-transparent" />
      </motion.div>

    </div>
  );
}