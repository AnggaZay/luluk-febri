"use client";

import Image from 'next/image';
import { Parisienne } from 'next/font/google';

const parisienne = Parisienne({
  subsets: ['latin'],
  weight: ['400'],
});

interface ProfileTableProps {
  type: "groom" | "bride";
  data: {
    fullName: string;
    shortName: string;
    parents: string;
    photo: string;
    address: string;
  };
}

export default function ProfileTable({ type, data }: ProfileTableProps) {
  const isGroom = type === "groom";

  const frameContent = (
    <Image
      src={isGroom ? "/images/putra.webp" : "/images/putri.webp"}
      alt={data.fullName}
      fill
      className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
      sizes="300px"
    />
  );

  return (
    <div className={`relative flex-shrink-0 w-screen h-[100dvh] flex items-center overflow-hidden ${
      // ✨ CUSTOM DI SINI: pr-2 (padding kanan untuk Pria), pl-2 (padding kiri untuk Wanita)
      isGroom ? "justify-end pr-2" : "justify-start pl-2"
    }`}>

      {/* ✨ INFORMASI MEMPELAI */}
      <div 
        className={`absolute top-[8vh] md:top-[12vh] z-30 flex flex-col ${
          isGroom 
            ? "left-6 md:left-24 items-start text-left groom-info-item opacity-0" 
            : "right-6 md:right-24 items-end text-right bride-info-item" // Bride langsung auto-scroll
        }`}
      >
        {/* Label Badge dengan Frame Decorative */}
        <div className="relative bg-stone-900/90 backdrop-blur-sm text-stone-100 text-[9px] md:text-xs uppercase tracking-[0.3em] px-4 py-1.5 mb-3 shadow-xl">
          <span className="relative z-10">{isGroom ? "Mempelai Laki-laki" : "Mempelai Perempuan"}</span>
          {/* Garis outline offset (Efek shape menumpuk) */}
          <div className="absolute top-1 left-1 w-full h-full border border-stone-500/50 pointer-events-none" />
        </div>
        
        {/* Nama (Parisienne) dengan Highlight Nama Panggilan */}
        <h2 className={`text-5xl md:text-7xl text-stone-100 mb-2 max-w-[260px] md:max-w-md leading-tight drop-shadow-lg ${parisienne.className}`}>
          {data.fullName.split(new RegExp(`(${data.shortName})`, 'gi')).map((part, i) => 
            part.toLowerCase() === data.shortName.toLowerCase() ? (
              <span key={i} className="text-red-500">{part}</span>
            ) : (
              part
            )
          )}
        </h2>
        
        {/* Detail Orang Tua & Alamat */}
        <div className={`flex flex-col gap-2 mt-1 ${
          isGroom ? "pl-3 border-l-[2px] border-stone-500/60 items-start" : "pr-3 border-r-[2px] border-stone-500/60 items-end"
        }`}>
          <p className="text-[10px] md:text-xs font-bold text-stone-200 tracking-widest uppercase drop-shadow-md">
            {data.parents}
          </p>
          
          {/* Shape Gelap Sorot Alamat */}
          <div className="bg-stone-900/80 backdrop-blur-md px-3 py-2 rounded-sm border border-stone-700/50 shadow-lg max-w-[220px] md:max-w-xs">
            <p className="text-[9px] md:text-[11px] text-stone-300 italic font-medium leading-relaxed">
              {data.address}
            </p>
          </div>
        </div>
      </div>

      {/* WRAPPER LUAR: Mengatur posisi dasar (translate-y) agar aman dari tertimpa GSAP/Framer */}
      <div className="relative z-20 w-full max-w-[280px] aspect-[3/4] translate-y-32">
        
        {isGroom ? (
          /* GSAP ANIMATION (Dijalankan dari page.tsx agar urutannya sempurna) */
          <div className="groom-photo-item relative w-full h-full opacity-0">
            {frameContent}
          </div>
        ) : (
          /* NATURAL SCROLL (Masuk manual mengikuti geseran meja tanpa animasi tambahan) */
          <div className="relative w-full h-full">
            {frameContent}
          </div>
        )}
      </div>
    </div>
  );
}