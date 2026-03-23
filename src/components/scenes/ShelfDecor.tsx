"use client";

import { motion } from 'framer-motion';

interface ShelfDecorProps {
  onOpenStory: () => void;
  onOpenGallery: () => void;
}

export default function ShelfDecor({ onOpenStory, onOpenGallery }: ShelfDecorProps) {
  return (
    <div className="absolute inset-0 z-10 flex flex-col items-end justify-center pr-4 pointer-events-none">
      
      {/* 1. VISUAL RAK BUKU (Background Element) */}
      <div className="relative w-24 h-64 border-l-8 border-y-4 border-[#3e2c1c] bg-[#2a1d13]/40 backdrop-blur-[2px] shadow-2xl rounded-l-md overflow-hidden flex flex-col justify-around py-6 px-2 opacity-80">
        
        {/* Efek Serat Kayu di Samping Rak */}
        <div className="absolute inset-y-0 right-0 w-1 bg-white/5" />

        {/* 2. THE INTERACTIVE BUTTONS (The "Books" on Shelf) */}
        <div className="space-y-4 pointer-events-auto">
          
          {/* Tombol Our Story (Buku Coklat) */}
          <motion.button
            onClick={onOpenStory}
            whileTap={{ scale: 0.9, x: -5 }}
            className="w-full flex items-center gap-2 group"
          >
            <div className="w-4 h-12 bg-amber-900 border-l-2 border-amber-700/50 shadow-md rounded-sm flex items-center justify-center relative overflow-hidden">
               <span className="text-[7px] text-amber-200/50 font-serif uppercase [writing-mode:vertical-lr] rotate-180">Story</span>
               {/* Efek Gold Foil di Punggung Buku */}
               <div className="absolute top-1 inset-x-0 h-[1px] bg-amber-400/30" />
               <div className="absolute bottom-1 inset-x-0 h-[1px] bg-amber-400/30" />
            </div>
            <span className="text-[9px] text-stone-500 uppercase tracking-widest font-bold opacity-0 group-hover:opacity-100 transition-opacity">Our Story</span>
          </motion.button>

          {/* Tombol Gallery (Buku Putih/Album) */}
          <motion.button
            onClick={onOpenGallery}
            whileTap={{ scale: 0.9, x: -5 }}
            className="w-full flex items-center gap-2 group"
          >
            <div className="w-5 h-14 bg-stone-100 border-l-2 border-stone-300 shadow-md rounded-sm flex items-center justify-center relative">
               <span className="text-[7px] text-stone-400 font-serif uppercase [writing-mode:vertical-lr] rotate-180">Album</span>
               <div className="absolute top-2 left-1 right-1 h-[2px] bg-stone-200" />
            </div>
            <span className="text-[9px] text-stone-500 uppercase tracking-widest font-bold opacity-0 group-hover:opacity-100 transition-opacity">Gallery</span>
          </motion.button>

        </div>

        {/* Ornamen: Tanaman menjuntai (seperti di foto nomor 5) */}
        <div className="absolute -top-4 -right-2 w-12 h-12 opacity-40">
           {/* Kamu bisa pakai icon daun atau image png kecil */}
           <div className="w-full h-full bg-green-900/20 blur-xl rounded-full" />
        </div>

      </div>

      {/* Instruksi Kecil (Floating) */}
      <motion.p 
        animate={{ x: [0, -5, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="text-[8px] text-stone-400 uppercase tracking-[0.3em] mt-4 mr-2"
      >
        Tap Books to Read
      </motion.p>
    </div>
  );
}