"use client";

import Image from 'next/image';

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