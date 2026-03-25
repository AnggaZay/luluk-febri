"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Cormorant_Garamond, Parisienne } from "next/font/google";

// ✨ Ambil tipe data dari file pusat biar konsisten
import { CoverProps } from "@/data/invitation";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});
const parisienne = Parisienne({ subsets: ["latin"], weight: ["400"] });

export default function Cover({ data, onOpen, guestName }: CoverProps) {
  return (
    <div className="relative w-full h-full bg-stone-800 text-white overflow-hidden">
      {/* Background Image */}
      <motion.div
        initial={{ scale: 1.1, opacity: 0.8 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <Image
          src={data.coverPhoto}
          alt="Wedding Cover"
          fill
          className="object-cover"
          priority
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/20 to-transparent" />
      </motion.div>

      {/* Content */}
      {/* ✨ Ubah pb-16 menjadi pb-32 (Mobile) dan md:pb-24 menjadi md:pb-40 (Laptop) agar posisinya naik */}
      <div className="relative z-10 flex flex-col items-center justify-end h-full text-center pb-32 md:pb-40 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
        >
          <p
            className={`text-sm md:text-base uppercase tracking-[0.3em] text-stone-200 mb-4 ${cormorant.className}`}
          >
            The Wedding Of
          </p>
          <h1
            className={`text-6xl md:text-8xl text-white drop-shadow-lg ${parisienne.className}`}
          >
            {data.groom.shortName} & {data.bride.shortName}
          </h1>
        </motion.div>

        {/* ✨ BLOK NAMA TAMU (HANYA MUNCUL JIKA ADA `guestName`) */}
        {guestName && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
            className="mt-12 w-full max-w-sm"
          >
            <p
              className={`text-xs md:text-sm uppercase tracking-widest text-stone-300 mb-2 ${cormorant.className}`}
            >
              Kepada Yth. Bapak/Ibu/Saudara/i
            </p>
            <p
              className={`text-2xl md:text-3xl font-semibold text-white drop-shadow-md ${cormorant.className}`}
            >
              {guestName}
            </p>
          </motion.div>
        )}

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          onClick={onOpen}
          className="mt-12 group flex items-center gap-3 bg-white/90 text-stone-800 px-8 py-4 rounded-full shadow-2xl backdrop-blur-sm border border-white/20 hover:bg-white active:scale-95 transition-all"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 group-hover:text-rose-500 transition-colors"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM2 10a8 8 0 1116 0 8 8 0 01-16 0z" />
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          <span
            className={`text-xs font-bold uppercase tracking-[0.2em] ${cormorant.className}`}
          >
            Buka Undangan
          </span>
        </motion.button>
      </div>
    </div>
  );
}