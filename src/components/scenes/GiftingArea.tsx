"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WeddingData } from '@/data/invitation';

interface GiftingAreaProps {
  data: typeof WeddingData;
}

export default function GiftingArea({ data }: GiftingAreaProps) {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="relative flex-shrink-0 w-screen h-[100dvh] flex flex-col items-center justify-center px-8 overflow-hidden">
      
      {/* 1. VISUAL DEKORASI KADO (Background Hint) */}
      <div className="absolute inset-x-0 bottom-10 flex justify-around opacity-30 grayscale pointer-events-none">
        {/* Simulasi siluet kado/box dari foto storyboard */}
        <div className="w-20 h-24 bg-stone-400 rotate-12 rounded-sm" />
        <div className="w-16 h-16 bg-stone-500 -rotate-6 rounded-sm mt-10" />
      </div>

      {/* 2. CARD GIFTING (The Main Content) */}
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative z-20 w-full max-w-[320px] bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-[20px_20px_60px_rgba(0,0,0,0.1)] border border-white"
      >
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
            </svg>
          </div>
          <h3 className="font-serif text-xl text-stone-800">Tanda Kasih</h3>
          <p className="text-[10px] text-stone-500 uppercase tracking-widest mt-2 px-4 leading-relaxed">
            Doa restu Anda adalah karunia terindah. Namun jika ingin memberi lebih, silakan melalui:
          </p>
        </div>

        {/* List Rekening/E-Wallet */}
        <div className="space-y-4">
          {/* Rekening Mempelai Pria */}
          <div className="p-4 bg-stone-50 rounded-xl border border-stone-100 flex justify-between items-center relative">
            <div>
              <p className="text-[9px] font-bold text-amber-800 uppercase tracking-tighter">Bank Transfer - {data.groom.shortName}</p>
              <p className="text-sm font-mono font-bold text-stone-800 mt-1">{data.groom.dana}</p>
            </div>
            <button 
              onClick={() => copyToClipboard(data.groom.dana, 'groom')}
              className="p-2 bg-white shadow-sm rounded-lg active:scale-90 transition-transform"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
              </svg>
            </button>
            <AnimatePresence>
              {copied === 'groom' && (
                <motion.span initial={{opacity:0, y:5}} animate={{opacity:1, y:0}} exit={{opacity:0}} className="absolute -top-3 right-4 bg-green-500 text-white text-[8px] px-2 py-1 rounded-full">Copied!</motion.span>
              )}
            </AnimatePresence>
          </div>

          {/* Rekening Mempelai Wanita */}
          <div className="p-4 bg-stone-50 rounded-xl border border-stone-100 flex justify-between items-center relative">
            <div>
              <p className="text-[9px] font-bold text-amber-800 uppercase tracking-tighter">Bank Transfer - {data.bride.shortName}</p>
              <p className="text-sm font-mono font-bold text-stone-800 mt-1">{data.bride.dana}</p>
            </div>
            <button 
              onClick={() => copyToClipboard(data.bride.dana, 'bride')}
              className="p-2 bg-white shadow-sm rounded-lg active:scale-90 transition-transform"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
              </svg>
            </button>
            <AnimatePresence>
              {copied === 'bride' && (
                <motion.span initial={{opacity:0, y:5}} animate={{opacity:1, y:0}} exit={{opacity:0}} className="absolute -top-3 right-4 bg-green-500 text-white text-[8px] px-2 py-1 rounded-full">Copied!</motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Informasi Kirim Kado (Opsional) */}
        <div className="mt-8 pt-6 border-t border-dashed border-stone-200 text-center">
          <p className="text-[8px] text-stone-400 uppercase tracking-widest">Alamat Pengiriman Kado Fisik:</p>
          <p className="text-[10px] text-stone-600 mt-2 font-medium px-4">
            Ds. Werdi, Dk. Werdi Tengah RT 13/ RW 06, Kec. Wonokerto
          </p>
        </div>
      </motion.div>

    </div>
  );
}