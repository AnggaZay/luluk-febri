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
import GallerySection from '@/components/scenes/GallerySection';
import Story from '@/components/Story';
import MobileJourney from '@/components/scenes/MobileJourney';
import GiftingArea from '@/components/scenes/GiftingArea';
import GuestbookSection from '@/components/scenes/GuestbookSection';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function WeddingPage() {
  const [isStarted, setIsStarted] = useState(false);
  const visualRoomsRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // 1. KUNCI SCROLL RESTORATION: Cegah browser lompat ke posisi scroll bawah saat di-refresh
    if (typeof window !== "undefined") {
      window.history.scrollRestoration = "manual";
    }

    // 2. KUNCI LAYAR COVER: Mencegah tamu curi-curi scroll sebelum tombol dibuka
    if (!isStarted) {
      document.body.style.overflow = "hidden";
      return;
    }

    // Buka kunci saat animasi masuk
    document.body.style.overflow = "auto";
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      
      // MASTER TIMELINE
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: visualRoomsRef.current,
          start: "top top",
          end: "+=7500", // ✨ DIPERPANJANG DRASTIS: Untuk ngakomodasi manuver kamera "Zoom Ekstrem" sebelum awan putih
          pin: true,     // Tahan layar
          scrub: 1.5,    // ✨ SMOOTHING: Diperbesar jadi 1.5 agar pergerakan semua aset lebih buttery/lembut
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

      // ALUR 2d: TEKS INFO MEMPELAI PUTRA
      // Teks dari pojok kiri atas masuk dengan efek blur menyusul bingkai
      tl.fromTo(".groom-info-item",
        { opacity: 0, x: "-10vw", filter: "blur(10px)" },
        { opacity: 1, x: 0, filter: "blur(0px)", ease: "power3.out", duration: 1.5 },
        "-=1.0" // Teks muncul tak lama setelah bingkai fotonya mulai terlihat
      );

      // ALUR 3: GESER MEJA HORIZONTAL
      tl.to(".table-items-wrapper", {
        xPercent: -50, // Diubah jadi -50 karena sekarang mejanya dipotong cuma jadi 2 layar
        ease: "none",
        duration: 3    // ✨ DIPERCEPAT LAGI
      });

      // Geser background meja bebarengan dengan barang di atas meja (simbol "<")
      tl.to(".single-table-bg", {
        xPercent: -105, // ✨ NILAI TENGAH: Biar parallax-nya pas, gak kelebihan & gak kepotong!
        ease: "none",
        duration: 3    // Harus sama dengan yang di atas
      }, "<");

      // ALUR 4: EXIT SCENE (Semua di atas meja mengecil, slide ke kanan bawah, blur & fade)
      tl.addLabel("tableExit");
      
      // 1. Animasi bungkus barang (Keluar ke Kiri Atas)
      tl.to(".table-items-wrapper", {
        scale: 0.5,
        x: "-30vw",
        y: "-30vh",
        opacity: 0,
        filter: "blur(20px)",
        transformOrigin: "75% center", // Fokus sinkron
        ease: "power2.inOut",
        duration: 1
      }, "tableExit");

      // 2. Animasi background meja (Keluar ke Kiri Atas)
      tl.to(".single-table-bg", {
        scale: 0.5,
        x: "-30vw",
        y: "-30vh",
        opacity: 0,
        filter: "blur(20px)",
        transformOrigin: "95% center", // Koordinat absolut diimbangi dengan geseran -45%
        ease: "power2.inOut",
        duration: 1
      }, "tableExit");

      // ALUR 5: EVENT BOOK MASUK
      // ✨ DIPERCEPAT: Hanya telat 0.2 detik dari dimulainya animasi meja keluar
      tl.addLabel("eventEnter", "tableExit+=0.2"); 

      // Munculkan container event-scene
      tl.to(".event-scene", { opacity: 1, duration: 0.1 }, "eventEnter");

      // ✨ ZOOM OUT BACKGROUND: Efek kamera menjauh (dari 1.5x ke 1x)
      tl.to(".wall-bg-texture", {
        scale: 1,
        ease: "power2.inOut",
        duration: 1.5
      }, "eventEnter");

      // ✨ TANPA OPACITY: Hanya main Blur, Zoom (Scale), dan Sliding!
      
      // 1. Lantai (Khusus Lantai kembali slide dari Bawah ke Atas)
      tl.fromTo(".event-lantai",
        { y: "50vh", scale: 1.5, filter: "blur(20px)" },
        { y: 0, scale: 1, filter: "blur(0px)", ease: "power2.out", duration: 1.5 },
        "eventEnter"
      );

      // 2. Papan (Slide dari Pojok Kanan Bawah)
      tl.fromTo(".event-papan",
        // ✨ transformOrigin: "center 25%" memastikan papan mengunci titik atasnya, lalu mengembang/ngezoom ke arah bawah
        { x: "60vw", y: "40vh", scale: 1.8, filter: "blur(20px)", transformOrigin: "center 25%" },
        { x: 0, y: 0, scale: 1, filter: "blur(0px)", transformOrigin: "center 25%", ease: "power3.out", duration: 1.5 },
        "eventEnter+=0.2" // Masuk 0.2 detik setelah lantai
      );

      // 3. Bunga Berdiri (Slide dari Pojok Kanan Bawah)
      tl.fromTo(".event-bunga-berdiri",
        { x: "70vw", y: "50vh", scale: 1.6, filter: "blur(20px)" },
        { x: 0, y: 0, scale: 1, filter: "blur(0px)", ease: "power3.out", duration: 1.5 },
        "eventEnter+=0.3" // Menyusul papan
      );

      // 4. Bunga Lantai (Slide dari Pojok Kanan Bawah)
      tl.fromTo(".event-bunga-lantai",
        { x: "80vw", y: "60vh", scale: 1.7, filter: "blur(20px)" },
        { x: 0, y: 0, scale: 1, filter: "blur(0px)", ease: "power3.out", duration: 1.5 },
        "eventEnter+=0.4" // Masuk paling akhir
      );

      // Beri jeda sejenak untuk memandangi komposisi utuh
      tl.to({}, { duration: 0.3 }); 

      // ✨ ALUR 5b: ZOOM IN EKSTREM (READING MODE)
      tl.addLabel("eventZoom");

      // 1. Tembok (Zoom lambat untuk efek parallax kedalaman)
      tl.to(".wall-bg-texture", { scale: 1.2, ease: "power2.inOut", duration: 2.5 }, "eventZoom");

      // 2. Bunga Berdiri (Zoom, Geser menjauh ke kiri, Ngeblur tipis-tipis)
      tl.to(".event-bunga-berdiri", {
        scale: 2, x: "-25vw", y: "10vh", filter: "blur(5px)",
        ease: "power2.inOut", duration: 2.5
      }, "eventZoom");

      // 3. Bunga Lantai & Lantai (Zoom, Turun merosot ke bawah, Perlahan Menghilang)
      tl.to([".event-bunga-lantai", ".event-lantai"], {
        scale: 1.5, y: "30vh", opacity: 0,
        ease: "power2.inOut", duration: 2.5
      }, "eventZoom");

      // 4. Papan (Zoom ekstrem 2.8x! Karena origin di "center 25%", ia akan mekar ke bawah layarnya)
      tl.to(".event-papan", {
        scale: 1.8, // ✨ DIKURANGI: Agar final zoom tidak terlalu dekat/nempel ke layar
        // y: "-10vh", // (Opsional) Uncomment ini jika teks dirasa kurang naik
        ease: "power2.inOut", 
        duration: 2.5
      }, "eventZoom");

      // Jeda scroll panjang biar tamu bisa dengan santai membaca teks yang udah super jumbo
      // dan menekan tombol Google Maps sebelum tertutup awan putih
      tl.to({}, { duration: 0.3 }); // ✨ DIPERSINGKAT: Jeda sebelum masuk ke awan putih tidak lagi terlalu lama

      // ALUR 6: FADE BERAWAN (WHITEOUT & BLUR) Menuju Layout Normal
      tl.addLabel("cloudyFade");

      // Overlay putih akan menebal menutupi layar
      tl.to(".white-cloud-overlay", {
        opacity: 1,
        ease: "power2.inOut",
        duration: 0.8 // ✨ DIPERCEPAT: Awan menutupi layar dengan lebih gesit
      }, "cloudyFade");

      // ✨ HILANGKAN REDUP HITAM: Fade out efek vignette di tembok
      tl.to(".wall-bg-vignette", {
        opacity: 0,
        duration: 0.8 // ✨ DIPERCEPAT
      }, "cloudyFade");

      // Background dkk meneruskan zoom-nya (+=0.2) sambil menghilang dibalik awan
      tl.to([".event-scene", ".wall-bg-texture"], {
        filter: "blur(30px)", 
        scale: "+=0.2", // ✨ Diubah jadi +=0.2 agar meneruskan zoom terakhir secara dinamis
        opacity: 0,
        duration: 0.8 // ✨ DIPERCEPAT
      }, "cloudyFade");

      // ✨ FADE OUT TOTAL: Menyembunyikan seluruh scene setelah awan putih, agar layer di bawahnya (Gallery dkk) terekspos buat di-klik!
      tl.to(".visual-rooms-content", { autoAlpha: 0, duration: 0.1 });

      // ✨ ALUR 7 DIHAPUS SEPENUHNYA!
      // Transisi diserahkan ke natural scroll yang warnanya sama-sama putih.
      // Tidak akan ada lagi white space nyangkut atau glitch scrollbar!

      // ✨ SINKRONISASI GSAP CHILDS: Ini WAJIB!
      // Karena MobileJourney (Child) merender lebih dulu, kita paksa GSAP menyortir ulang
      // posisinya setelah Parent membuat pin (padding 7500px).
      ScrollTrigger.sort();
      ScrollTrigger.refresh();

      // Jaga-jaga: Refresh sekali lagi setelah animasi Cover hilang total dan gambar termuat
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 1500);

      // ✨ ALUR 8: MOBILE JOURNEY (Card Stacking)
      // Dipindahkan ke sini agar 100% tersinkronisasi dengan master timeline tanpa bentrok siklus React!
      let mm = gsap.matchMedia();
      mm.add("(max-width: 767px)", () => {
        const mjTl = gsap.timeline({
          scrollTrigger: {
            trigger: ".mobile-journey-container",
            start: "top top",
            end: "+=3000",
            pin: true,
            scrub: 1,
            snap: 1 / 3, // 4 Cerita = 3 Transisi
          }
        });

        for (let i = 1; i < 4; i++) {
          mjTl.to(`.mobile-gallery-${i - 1}`, { scale: 0.9, opacity: 0.5, duration: 1 }, `step${i}`);
          mjTl.to(`.mobile-story-${i - 1}`, { scale: 0.9, opacity: 0, duration: 1 }, `step${i}`);

          mjTl.fromTo(`.mobile-gallery-${i}`,
            { y: "60vh", opacity: 0, rotate: i % 2 === 0 ? 8 : -8, scale: 1.1 },
            { y: "0vh", opacity: 1, rotate: i % 2 === 0 ? -2 : 2, scale: 1, ease: "back.out(1.2)", duration: 1 },
            `step${i}`
          );

          mjTl.fromTo(`.mobile-story-${i}`,
            { y: "40vh", opacity: 0, scale: 0.8 },
            { y: "0vh", opacity: 1, scale: 1, ease: "back.out(1.2)", duration: 1 },
            `step${i}`
          );
        }
      });

    // ✨ BUG FIXED: Scope diubah ke mainRef agar GSAP bisa nyeleksi elemen di seluruh halaman
    }, mainRef); 

    return () => ctx.revert();
  }, [isStarted]);

  return (
    <>
      {/* ✨ POINT 2: DESKTOP FALLBACK (Hanya muncul di layar PC/Tablet besar) */}
      <div className="hidden md:flex fixed inset-0 z-[9999] bg-stone-900 flex-col items-center justify-center text-center px-8">
        <h2 className="text-3xl font-serif text-stone-100 mb-4">Akses Terbatas</h2>
        <p className="text-stone-400 mb-8 max-w-md leading-relaxed">
          Undangan ini hanya bisa diakses melalui perangkat <strong className="text-stone-200">Mobile / Smartphone / Handphone</strong>.<br/> Silakan scan QR Code di bawah ini untuk membuka melalui HP Anda.
        </p>
        <div className="w-56 h-56 bg-white rounded-2xl flex items-center justify-center p-4 shadow-2xl relative">
          {/* Pastikan lo nyiapin file qr-code.webp di folder public/images */}
          <Image src="/images/qr-code.webp" alt="QR Code" fill className="object-contain p-2" />
        </div>
      </div>

      {/* ✨ KUNCI ANTI CRASH: main biarkan normal, jangan dikasih display:none agar GSAP tidak error ketika dibuka di Desktop! */}
      <main ref={mainRef} className="relative bg-[#d6d3d1] w-full min-h-screen">
      
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
          {/* ✨ TEKNIK PIN 0-HEIGHT: Bikin kontainer utama h-0 & z-50. 
              Ini bikin layar di bawahnya menyusup naik DI BELAKANG layar ini secara rahasia, jadi nggak ada tabrakan CSS! */}
          <div ref={visualRoomsRef} className="relative w-full h-0 z-50">
            <div className="visual-rooms-content absolute top-0 left-0 w-full h-[100dvh] overflow-hidden bg-[#d6d3d1]">
  
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
                  <div className="single-table-bg absolute inset-0 z-[25] pointer-events-none opacity-0">
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

                  {/* SCREEN 4: EVENT BOOK SCENE (Di Animasi yang sama!) */}
                  <EventBook data={WeddingData.events} />

                  {/* OVERLAY AWAN PUTIH (Buat transisi nyambung ke layout normal di bawah) */}
                  <div className="white-cloud-overlay absolute inset-0 z-[60] bg-white opacity-0 pointer-events-none" />
            </div>
          </div>

          {/* ✨ LAYAR BAWAH (GALLERY DKK): Posisinya natural, z-10 agar sembunyi di balik awan putih, nggak perlu -mt-[100dvh] lagi! */}
          <div className="relative z-10 w-full bg-white">
            
            {/* ✨ DESKTOP ONLY: Tampilan Gallery & Story Normal */}
            <div className="hidden md:flex w-full flex-col items-center pt-20 pb-10 bg-white">
              <GallerySection data={WeddingData} />
              <Story />
            </div>

            {/* ✨ MOBILE ONLY: Animasi Stacking Card & Gallery (1 Scroll = 1 Step) */}
            <div className="block md:hidden w-full">
              <MobileJourney data={WeddingData} />
            </div>
              
            {/* ✨ SHARED Gifting & Guestbook (Gue kasih pb-32 ekstra agar tombol submit nggak ketutup indikator scroll di bawah!) */}
            <div className="w-full flex flex-col items-center pt-10 pb-32 bg-white">
              <div className="w-full flex justify-center mb-8">
                <GiftingArea data={WeddingData} />
              </div>

              {/* 4. Guestbook Section */}
              <GuestbookSection />
              
              {/* FOOTER LOGO / OUTRO */}
              <div className="mt-8 mb-10 text-center opacity-40">
                <p className="font-serif italic text-lg text-stone-800">{WeddingData.groom.shortName} & {WeddingData.bride.shortName}</p>
                <p className="text-[8px] uppercase tracking-[0.4em] mt-2">Terima Kasih</p>
              </div>

              {/* ✨ TRADEMARK / DEVELOPER SPACE */}
              <div className="mb-24 text-center">
                <p className="text-[8px] md:text-[9px] uppercase tracking-[0.2em] font-medium text-[#20636e]">
                  Dibuat oleh <span className="font-bold tracking-[0.3em]">Helvetecha</span>
                </p>
              </div>

            </div>
          </div>

          {/* ✨ POINT 3: PERSISTENT SCROLL INDICATOR */}
          {/* Mengendap di bawah layar, aman dari tap user berkat pointer-events-none, bergradasi, dan hilang di cover (karena ada dalam isStarted) */}
          <div className="fixed bottom-0 left-0 w-full h-32 bg-gradient-to-t from-stone-900/90 via-stone-900/40 to-transparent z-[100] flex flex-col items-center justify-end pb-6 pointer-events-none">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="flex flex-col items-center gap-2"
            >
              <span className="text-[9px] uppercase tracking-[0.2em] text-white/90 font-medium text-center px-4 drop-shadow-md">
                Scroll untuk terus menerima informasi
              </span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white/90 drop-shadow-md" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </motion.div>
          </div>

        </>
      )}
      </main>
    </>
  );
}