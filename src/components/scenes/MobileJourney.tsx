"use client";

import Image from 'next/image';
import { WeddingData } from '@/data/invitation';
import { Parisienne } from 'next/font/google';

const parisienne = Parisienne({ subsets: ['latin'], weight: ['400'] });

export default function MobileJourney({ data }: { data: typeof WeddingData }) {
  return (
    <div className="mobile-journey-container relative h-[100dvh] w-full bg-[#fdfbf7] flex flex-col overflow-hidden">
      
      {/* AREA ATAS: GALLERY GRID (2 Foto Sampingan 1:1) */}
      <div className="relative h-[50dvh] w-full pt-10 pb-2 px-6">
        {data.stories.map((_, i) => (
          <div key={`gallery-${i}`} className={`mobile-gallery-${i} absolute inset-0 flex items-center justify-center gap-3 p-6 ${i === 0 ? 'opacity-100' : 'opacity-0'}`} style={{ zIndex: 10 + i }}>
            {/* Foto Kiri */}
            <div className="relative w-1/2 aspect-square rounded-xl overflow-hidden shadow-md border-[6px] border-white bg-stone-200 rotate-[-4deg]">
              <Image src={data.gallery[(i * 2) % data.gallery.length]} alt="Gallery" fill className="object-cover" sizes="50vw" />
            </div>
            {/* Foto Kanan (Sengaja diturunin dikit biar estetik majalah) */}
            <div className="relative w-1/2 aspect-square rounded-xl overflow-hidden shadow-md border-[6px] border-white bg-stone-200 rotate-[3deg] translate-y-6">
              <Image src={data.gallery[(i * 2 + 1) % data.gallery.length]} alt="Gallery" fill className="object-cover" sizes="50vw" />
            </div>
          </div>
        ))}
      </div>

      {/* AREA BAWAH: STORY CARD */}
      <div className="relative h-[50dvh] w-full p-6 pb-12">
        {data.stories.map((story, i) => (
          <div key={`story-${i}`} className={`mobile-story-${i} absolute inset-6 bg-white rounded-3xl shadow-lg border border-stone-100 p-6 flex flex-col items-center justify-center text-center ${i === 0 ? 'opacity-100' : 'opacity-0'}`} style={{ zIndex: 10 + i }}>
            <span className="text-[9px] font-bold text-stone-400 tracking-[0.3em] uppercase mb-2 bg-stone-50 px-3 py-1 rounded-full">Bagian {i + 1} / 4</span>
            <h3 className={`text-3xl text-amber-900 mb-3 drop-shadow-sm ${parisienne.className}`}>{story.title}</h3>
            <p className="text-[11px] leading-relaxed text-stone-600 font-medium px-2">{story.content}</p>
          </div>
        ))}
      </div>

    </div>
  );
}