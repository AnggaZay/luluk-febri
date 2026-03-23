"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

import { WeddingData } from '@/data/invitation';
import Cover from '@/components/scenes/Cover';
import CountdownWall from '@/components/scenes/CountdownWall';
import ProfileTable from '@/components/scenes/ProfileTable';
import EventBook from '@/components/scenes/EventBook';
import ShelfDecor from '@/components/scenes/ShelfDecor';
import GiftingArea from '@/components/scenes/GiftingArea';
import GuestbookSection from '@/components/scenes/GuestbookSection';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function WeddingPage() {
  const [isStarted, setIsStarted] = useState(false);
  const visualRoomsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isStarted) return;

    const ctx = gsap.context(() => {
      
      // MASTER TIMELINE
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: visualRoomsRef.current,
          start: "top top",
          end: "+=4000", // ✨ DIPENDEKKAN: Karena sekarang cuma geser 1 kali (ke Wanita)
          pin: true,     // Tahan layar
          scrub: 1,      // Animasi ikutin jempol
          anticipatePin: 1,
        }
      });

      // Menambahkan label agar animasi transisi scene terjadi bebarengan
      tl.addLabel("sceneTransition");

      // ALUR 1: BUANG WALL KE ATAS (MINGGAT!)
      tl.to(".wall-scene", {
        y: "-120%", 
        opacity: 0,
        scale: 0.6,          // Efek mengecil (zoom out)
        filter: "blur(15px)", // Efek blur
        ease: "power2.in",
        duration: 1
      }, "sceneTransition");

      // PARALLAX BACKGROUND BERHENTI (Hanya gerak pas pindah scene)
      tl.fromTo(".wall-bg-texture", 
        { scale: 2, y: "0%" }, // Titik awal: Background di-zoom 2x saat Countdown
        {
          scale: 1.5, // Titik akhir: Zoom berkurang perlahan jadi 1.5x
          y: "-30%",  // Tembok geser ke atas sedikit lalu statis
          ease: "power2.inOut",
          duration: 1
        }, "sceneTransition"
      );

      // VIGNETTE FADE JUGA IKUT BERHENTI
      tl.to(".wall-bg-vignette", {
        opacity: 0.5, // Tembok agak gelap pas meja muncul
        ease: "power2.inOut",
        duration: 1
      }, "sceneTransition");

      // ALUR 2a: MEJA MASUK (Super Zoom, Blur & Slide dari pojok kiri bawah)
      tl.fromTo(".single-table-bg", 
        { scale: 3, filter: "blur(20px)", opacity: 0, x: "-30vw", y: "20vh", transformOrigin: "left bottom" },
        { scale: 1, filter: "blur(0px)", opacity: 1, x: 0, y: 0, ease: "power3.out", duration: 1.8 },
        "-=0.5" // Mulai barengan saat tembok ke atas
      );

      // Pastikan wrapper item meja mulai terlihat (isinya akan dianimasikan satu-satu)
      tl.fromTo(".table-items-wrapper",
        { opacity: 0 },
        { opacity: 1, duration: 0.1 },
        "<" // Tepat saat meja mulai
      );

      // ALUR 2b: BUNGA MEJA MENYUSUL
      // Diubah x menjadi positif (40vw) agar datang dari kanan, searah dengan tarikan meja
      tl.fromTo(".bunga-meja-item",
        { scale: 2, filter: "blur(15px)", opacity: 0, x: "40vw", y: "15vh" },
        { scale: 1, filter: "blur(0px)", opacity: 1, x: 0, y: 0, ease: "power3.out", duration: 1.5 },
        "-=1.4" // Makin cepat overlap-nya biar ngikutin momentum meja
      );

      // ALUR 2c: FOTO MEMPELAI PUTRA TERAKHIR MASUK
      // Diubah x menjadi positif (25vw) agar searah dengan tarikan meja
      tl.fromTo(".groom-photo-item",
        { scale: 1.5, filter: "blur(15px)", opacity: 0, x: "25vw", y: "10vh", rotateY: 15 },
        { scale: 1, filter: "blur(0px)", opacity: 1, x: 0, y: 0, rotateY: 0, ease: "power3.out", duration: 1.5 },
        "-=1.2" // Disusul bingkai dengan efek lensa fokus
      );

      // ALUR 3: GESER MEJA HORIZONTAL
      tl.to(".table-items-wrapper", {
        xPercent: -50, // Diubah jadi -50 karena sekarang mejanya dipotong cuma jadi 2 layar
        ease: "none",
        duration: 4    // ✨ DIPERCEPAT: Biar gak kerasa kelamaan scrollnya
      });

      // Geser background meja bebarengan dengan barang di atas meja (simbol "<")
      tl.to(".single-table-bg", {
        xPercent: -105, // ✨ NILAI TENGAH: Biar parallax-nya pas, gak kelebihan & gak kepotong!
        ease: "none",
        duration: 4    // ✨ Harus sama dengan durasi wrapper di atas
      }, "<");

      // ALUR 4: EXIT SCENE (Semua di atas meja mengecil, slide ke kanan bawah, blur & fade)
      tl.addLabel("tableExit");
      
      // 1. Animasi bungkus barang (Dikunci ke titik tengah Mempelai Putri)
      tl.to(".table-items-wrapper", {
        scale: 0.5,
        x: "30vw",
        y: "20vh",
        opacity: 0,
        filter: "blur(20px)",
        transformOrigin: "75% center", // Fokus sinkron
        ease: "power2.inOut",
        duration: 1
      }, "tableExit");

      // 2. Animasi background meja (Dikunci ke koordinat yang sama persis biar gak tarik-tarikan pisah)
      tl.to(".single-table-bg", {
        scale: 0.5,
        x: "30vw",
        y: "20vh",
        opacity: 0,
        filter: "blur(20px)",
        transformOrigin: "95% center", // Koordinat absolut diimbangi dengan geseran -45%
        ease: "power2.inOut",
        duration: 1
      }, "tableExit");

      // Refresh ScrollTrigger setelah exit animation Framer Motion selesai (1.5s)
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 1500);

    }, visualRoomsRef);

    return () => ctx.revert();
  }, [isStarted]);

  return (
    <main className="relative bg-[#d6d3d1] w-full min-h-screen overflow-x-hidden">
      
      <AnimatePresence>
        {!isStarted && (
          <motion.div 
            key="cover-layer"
            exit={{ scale: 20, opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="fixed inset-0 z-[100] h-[100dvh] w-full"
          >
            <Cover data={WeddingData} onOpen={() => setIsStarted(true)} />
          </motion.div>
        )}
      </AnimatePresence>

      {isStarted && (
        <>
          {/* CONTAINER UTAMA YANG DI-PIN */}
          <div ref={visualRoomsRef} className="relative h-[100dvh] w-full overflow-hidden z-10">
  
  {/* --- BACKGROUND TEMBOK WITH PARALLAX --- */}
  <div className="absolute inset-0 z-0 overflow-hidden">
    {/* Inner container for parallax movement */}
    <div className="wall-bg-texture absolute inset-0 w-full h-full">
      <Image 
        src="/images/wall-texture.webp"
        alt="Wall Background"
        fill
        className="object-cover opacity-90"
        priority
      />
    </div>
    
    {/* Vignette overlay that darkens during scroll */}
    <div className="wall-bg-vignette absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/20 pointer-events-none" />
  </div>

  {/* --- SCREEN 1: WALL SCENE (Kalender & Jam) --- */}
  {/* z-index harus lebih tinggi dari background tapi bisa dipukul ke atas oleh GSAP */}
  <section className="wall-scene absolute inset-0 z-[40] flex flex-col items-center justify-center px-6 pointer-events-none">
    <div className="pointer-events-auto">
      <CountdownWall data={WeddingData} />
    </div>
  </section>

            {/* SCREEN 2-6 BACKGROUND: MEJA PANJANG (SINGLE ASSET UTUH) */}
            <div 
              className="single-table-bg absolute inset-0 z-[25] pointer-events-none opacity-0"
            >
              <Image
                src="/images/meja.webp"
                alt="Meja"
                fill
                // ✨ CUSTOM UKURAN MEJA DI SINI: Ubah scale-185 (misal jadi scale-150, scale-200, dll)
                className="object-contain object-bottom origin-bottom-left scale-205"
                sizes="100vw"
              />
            </div>

            {/* SCREEN 2-3: MEJA PANJANG (HANYA PRIA & WANITA) */}
            <div className="table-items-wrapper absolute inset-0 w-[200vw] flex z-[30] opacity-0">
              
              {/* ORNAMEN BUNGA MEJA (Satu aset pas di tengah antara Pria & Wanita) */}
              {/* left-[100vw] memastikan letaknya tepat di perbatasan layar 1 dan 2 */}
              {/* ✨ CUSTOM POSISI BUNGA DI SINI: Ubah top-[40%] ke angka yang lebih kecil (misal 30% atau 20%) untuk makin ke atas */}
              <div className="absolute top-[60%] left-[95vw] -translate-x-1/2 -translate-y-1/2 z-10 w-[450px] aspect-square pointer-events-none">
                <div className="bunga-meja-item relative w-full h-full opacity-0">
                  <Image 
                    src="/images/bunga-meja.webp" 
                    alt="Bunga Meja" 
                    fill 
                    className="object-contain drop-shadow-2xl" 
                    sizes="450px" 
                  />
                </div>
              </div>

              <div className="w-[100vw] h-full flex-shrink-0 flex items-center justify-center">
                <ProfileTable type="groom" data={WeddingData.groom} />
              </div>
              <div className="w-[100vw] h-full flex-shrink-0 flex items-center justify-center">
                <ProfileTable type="bride" data={WeddingData.bride} />
              </div>
            </div>

          </div>

          {/* SCREEN 4: EVENT BOOK & SHELF (Muncul vertikal setelah meja mengecil) */}
          <section className="relative z-[45] w-full min-h-screen bg-stone-200 flex items-center justify-center overflow-hidden">
            <EventBook data={WeddingData.events} />
            <ShelfDecor onOpenStory={() => {}} onOpenGallery={() => {}} />
          </section>

          {/* SCREEN 5: GIFTING AREA */}
          <section className="relative z-[46] w-full min-h-screen bg-stone-300 flex items-center justify-center">
            <GiftingArea data={WeddingData} />
          </section>

          {/* SCREEN 6: GUESTBOOK */}
          <section className="relative z-[50] w-full min-h-screen bg-white">
            <GuestbookSection />
          </section>
        </>
      )}
    </main>
  );
}