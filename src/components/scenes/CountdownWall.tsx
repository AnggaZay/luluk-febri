"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { WeddingData } from '@/data/invitation';
import { Orbitron } from 'next/font/google';
const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-orbitron',
});

export default function CountdownWall({ data }: { data: typeof WeddingData }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  


  useEffect(() => {
    const target = new Date(data.events.akad.date).getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = target - now;
      if (diff < 0) return clearInterval(interval);
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [data.events.akad.date]);

  return (
    <div className="relative flex flex-col items-center gap-4 w-full">
      
      {/* 1. KALENDER */}
      <motion.div 
        className="relative w-[240px] aspect-[3/4]"
        initial={{ rotateY: -10 }}
        animate={{ rotateY: 0 }}
        transition={{ duration: 1.5 }}
      >
        <Image 
          src="/images/kalender.webp" // Sesuaikan extensionnya (.png/.webp)
          alt="Kalender April"
          fill
          className="object-contain drop-shadow-[0_15px_35px_rgba(0,0,0,0.2)]"
          priority
        />
      </motion.div>

      {/* 2. JAM DIGITAL */}
{/* 2. JAM DIGITAL */}
{/* Beri font variable Orbitron di container jam */}
<div className={`relative w-[340px] h-[110px] mt-6 ${orbitron.variable}`}>
  
  {/* Frame Jam (PNG lo) */}
  <Image 
    src="/images/jam-digital.webp" 
    alt="Frame Jam"
    fill
    className="object-contain z-10 drop-shadow-[0_15px_35px_rgba(0,0,0,0.2)]"
  />

  {/* Layar Angka (Teks Merah) */}
  {/* Kita pakai Flexbox dengan Gap agar gampang geser-geser posisinya */}
  {/* px-12 = Jarak kiri-kanan, pb-3 = Jarak atas-bawah biar pas di tengah frame */}
  <div className="absolute inset-0 z-20 flex items-center justify-between px-12 pb-3 pt-2 font-mono drop-shadow-[0_0_10px_rgba(220,38,38,0.7)]">
    
    <DigitUnit value={timeLeft.days} label="DAYS" />
    <span className="text-red-600/80 text-xl font-bold -mt-3 animate-pulse">:</span>
    
    <DigitUnit value={timeLeft.hours} label="HRS" />
    <span className="text-red-600/80 text-xl font-bold -mt-3 animate-pulse">:</span>
    
    <DigitUnit value={timeLeft.minutes} label="MIN" />
    <span className="text-red-600/80 text-xl font-bold -mt-3 animate-pulse">:</span>
    
    <DigitUnit value={timeLeft.seconds} label="SEC" />

  </div>

  {/* Efek Glow Merah di belakang Jam (Mantul ke Tembok) */}
  <div className="absolute inset-x-12 top-1/2 -translate-y-1/2 h-8 bg-red-600/20 blur-[40px] z-0 rounded-full" />
</div>

    </div>
  );
}

function DigitUnit({ value, label }: { value: number, label: string }) {
  return (
    <div className="flex flex-col items-center justify-center w-12 pt-1">
      {/* Gunakan font Orbitron untuk angkanya */}
      <span className="text-2xl font-orbitron font-bold text-red-600 tabular-nums tracking-tighter drop-shadow-[0_0_8px_rgba(220,38,38,0.7)] leading-none">
        {value.toString().padStart(2, '0')}
      </span>
      {/* Label Kecil di bawah Angka (Days, Hrs, Min, Sec) */}
      <span className="text-[7px] font-medium text-stone-600 uppercase tracking-widest mt-1">
        {label}
      </span>
    </div>
  );
}