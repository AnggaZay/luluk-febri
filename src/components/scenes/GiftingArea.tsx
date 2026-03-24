"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WeddingData } from '@/data/invitation';
import Image from 'next/image';

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
    // ✨ ANIMASI DIKEMBALIKAN: Membal otomatis dengan Framer Motion saat area ini di-scroll
    <motion.div 
      initial={{ scale: 0.5, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }} // Efek membal bouncy
      className="w-[320px] max-w-[90vw] bg-white border border-stone-100 p-6 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.06)]"
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
              <div className="flex items-center gap-2 mb-1">
                <Image src="/dana-logo.svg" alt="DANA" width={40} height={14} className="object-contain" />
                <p className="text-[9px] font-bold text-amber-800 uppercase tracking-tighter">- {data.groom.shortName}</p>
              </div>
              <p className="text-sm font-mono font-bold text-stone-800">{data.groom.dana}</p>
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
              <div className="flex items-center gap-2 mb-1">
                <Image src="/dana-logo.svg" alt="DANA" width={40} height={14} className="object-contain" />
                <p className="text-[9px] font-bold text-amber-800 uppercase tracking-tighter">- {data.bride.shortName}</p>
              </div>
              <p className="text-sm font-mono font-bold text-stone-800">{data.bride.dana}</p>
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
  );
}