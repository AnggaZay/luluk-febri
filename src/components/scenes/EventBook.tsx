"use client";

import Image from 'next/image';
import { Parisienne } from 'next/font/google';
import { WeddingData } from '@/data/invitation';

const parisienne = Parisienne({
  subsets: ['latin'],
  weight: ['400'],
});

interface EventBookProps {
  data: typeof WeddingData.events;
}

export default function EventBook({ data }: EventBookProps) {
  return (
    <div className="event-scene absolute inset-0 z-[35] flex items-center justify-center pointer-events-none opacity-0">
      
      {/* Lantai */}
      <div className="event-lantai absolute bottom-[-5vh] md:bottom-[-10vh] left-0 w-full h-[35vh] md:h-[45vh] z-0">
        {/* ✨ ANTI-LAG: Menghapus drop-shadow-2xl pada gambar lantai transparan yang menutupi layar */}
        <Image src="/images/lantai.webp" alt="Lantai" fill className="object-cover object-bottom" />
      </div>

      {/* WRAPPER BUNGA BERDIRI (Hanya untuk Animasi GSAP) */}
      <div className="event-bunga-berdiri absolute bottom-0 left-[-5%] md:left-[2%] w-[270px] md:w-[550px] aspect-[1/2] z-30 pointer-events-none">
        {/* ✨ CUSTOM POSISI & UKURAN: Tambahkan/ubah angka translate-y-[...] di sini untuk menurunkan bunga */}
        <div className="relative w-full h-full translate-y-[10vh] md:translate-y-[15vh]">
          <Image src="/images/bunga-berdiri.webp" alt="Bunga Berdiri" fill className="object-contain object-bottom" sizes="(max-width: 768px) 270px, 550px" />
        </div>
      </div>

      {/* WRAPPER BUNGA LANTAI (Hanya untuk Animasi GSAP) */}
      <div className="event-bunga-lantai absolute bottom-0 left-1/2 -translate-x-1/2 w-[360px] md:w-[700px] aspect-[4/3] z-10 pointer-events-none">
        {/* ✨ CUSTOM POSISI & UKURAN: Tambahkan/ubah angka translate-y-[...] di sini untuk menurunkan bunga */}
        <div className="relative w-full h-full translate-y-[5vh] md:translate-y-[10vh]">
          <Image src="/images/bunga-lantai.webp" alt="Bunga Lantai" fill className="object-contain object-bottom" sizes="(max-width: 768px) 360px, 700px" />
        </div>
      </div>

      {/* WRAPPER PAPAN (Hanya untuk Animasi GSAP agar tidak bentrok) */}
      <div className="event-papan absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none">
        
        {/* ✨ CUSTOM UKURAN: Naikkan max-w-[...] untuk memperbesar ukuran asli. (Tailwind mentok di scale-150. Gunakan scale-[1.8] kalau mau custom arbitrary) */}
        <div className="relative w-full max-w-[300px] md:max-w-3xl aspect-[1/1.5] md:aspect-[1.5/1] flex flex-col items-center justify-center pointer-events-auto translate-y-[0vh] md:translate-y-[10vh] scale-150 md:scale-125">
          <Image src="/images/papan.webp" alt="Papan" fill className="object-contain" sizes="100vw" priority />
          
          {/* KERTAS KONTEN (Menumpang tepat di atas gambar papan) */}
          {/* ✨ KUNCI POSISI: justify-start memastikan blok mulai nempel dari atas. 
              Ganti pt-10 (HP) atau md:pt-16 (Laptop) untuk dorong ke bawah atau tarik ke atas! */}
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-start w-full h-full pt-16 md:pt-16 px-4">
            
            {/* ✨ STANDARISASI KONTEN: Jarak gap di HP dihapus agar margin antar garis bisa 100% presisi identik */}
            <div className="w-[90%] md:w-[85%] flex flex-col md:flex-row items-center md:items-stretch justify-center md:gap-4">
              
              {/* BAGIAN KIRI: AKAD & RAMAH TAMAH */}
              <div className="w-full md:flex-1 flex flex-col items-center justify-start text-center px-2">
                {/* ✨ CUSTOM JARAK JUDUL: mb-0.5 (margin-bottom) atur jarak judul ke info bawahnya */}
                <h3 className={`text-sm md:text-xl text-amber-950 drop-shadow-sm mb-0.5 md:mb-1 ${parisienne.className}`}>Akad Nikah</h3>
                
                {/* ✨ CUSTOM SPASI TEKS: space-y-0 (rapat maksimal) atau space-y-0.5 (sedikit renggang) */}
                <div className="flex flex-col items-center space-y-0 md:space-y-0.5 text-stone-900">
                  <p className="text-[5px] md:text-[8px] font-bold tracking-widest uppercase">{data.akad.date}</p>
                  <p className="text-[4px] md:text-[6px] opacity-80">{data.akad.time}</p>
                  <p className="text-[5px] md:text-[8px] italic font-medium">{data.akad.location}</p>
                  <p className="text-[4px] md:text-[6px] leading-relaxed opacity-80 max-w-[80px] md:max-w-[120px]">
                    {data.akad.address}
                  </p>
                </div>
                
                {/* Ramah Tamah */}
                {/* ✨ CUSTOM JARAK BLOK: mt-1.5 & pt-1.5 atur seberapa jauh blok ini dari teks Akad di atasnya */}
                <div className="mt-1.5 md:mt-2 pt-1.5 md:pt-2 border-t border-stone-500/40 w-full max-w-[70px] md:max-w-[100px] flex flex-col items-center space-y-0 md:space-y-0.5">
                  <h4 className="font-serif text-[6px] md:text-[9px] text-stone-900 font-bold tracking-wide">Ramah Tamah</h4>
                  <p className="text-[4px] md:text-[6px] text-stone-800">{data.ramahTamah.date}</p>
                  <p className="text-[3px] md:text-[5px] italic text-stone-600 uppercase tracking-widest">{data.ramahTamah.time}</p>
                </div>
              </div>

              {/* GARIS PEMISAH TENGAH */}
              <div className="hidden md:block w-[1px] bg-stone-500/40 mx-2 my-2"></div>
              {/* ✨ CUSTOM GARIS HP: my-1.5 atur jarak atas-bawah garis tengah ini saat di layar HP */}
              <div className="md:hidden w-full max-w-[70px] h-[1px] bg-stone-500/40 my-1.5"></div>

              {/* BAGIAN KANAN: RESEPSI & TOMBOL MAPS */}
              <div className="w-full md:flex-1 flex flex-col items-center justify-start text-center px-2">
                <h3 className={`text-sm md:text-xl text-amber-950 drop-shadow-sm mb-0.5 md:mb-1 ${parisienne.className}`}>Resepsi</h3>
                
                <div className="flex flex-col items-center space-y-0 md:space-y-0.5 text-stone-900">
                  <p className="text-[5px] md:text-[8px] font-bold tracking-widest uppercase">{data.resepsi.date}</p>
                  <p className="text-[4px] md:text-[6px] opacity-80">{data.resepsi.time}</p>
                  <p className="text-[5px] md:text-[8px] italic font-medium">{data.resepsi.location}</p>
                </div>
              </div>
            </div>

            {/* TOMBOL GOOGLE MAPS */}
            {/* ✨ CUSTOM JARAK TOMBOL: mt-8 (HP) atau mt-16 (Laptop) atur seberapa jauh tombol ini dari informasi di atasnya */}
            <a 
              href={data.akad.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 md:mt-16 px-4 py-1.5 md:px-6 md:py-2.5 bg-stone-800 text-stone-100 text-[5px] md:text-[9px] font-medium tracking-[0.2em] uppercase rounded shadow-lg shadow-stone-800/30 hover:bg-stone-700 active:scale-95 transition-all"
            >
              Google Maps
            </a>
          </div>
        </div>

      </div>
      
    </div>
  );
}