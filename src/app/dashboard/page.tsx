"use client";

import { useState, useEffect, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import Image from 'next/image';
import { Parisienne } from 'next/font/google';
import { WeddingData } from '@/data/invitation';

const parisienne = Parisienne({ subsets: ['latin'], weight: ['400'] });

// ✨ BIKIN TIPE DATA (Agar Typescript gak merah & lebih rapi)
interface GuestData {
  id: number;
  nama: string;
  kehadiran: string;
  jumlah_tamu: number;
  ucapan: string;
  created_at: string;
}

export default function DashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);

  // ✨ AMBIL DATA DARI SUPABASE (Pindah ke atas agar sesuai Rules of Hooks React!)
  const [guestData, setGuestData] = useState<GuestData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('guestbook')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (data && !error) {
        setGuestData(data as GuestData[]);
      }
    };

    if (isAuthenticated) {
      fetchData();

      // ✨ FITUR REALTIME STREAMING: Dengerin perubahan di tabel guestbook
      const channel = supabase
        .channel('realtime-guestbook')
        .on(
          'postgres_changes', 
          { event: 'INSERT', schema: 'public', table: 'guestbook' }, 
          (payload) => {
            // Tiap ada yang ngisi form, otomatis masukin ke deretan teratas data di layar
            setGuestData((currentData) => [payload.new as GuestData, ...currentData]);
          }
        )
        .subscribe();

      // Bersihin channel pas keluar brankas biar gak bocor memory
      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [isAuthenticated]);

  // PIN rahasia (Bisa lo ganti nanti)
  const SECRET_PIN = "010426";

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    if (pin === SECRET_PIN) {
      setIsAuthenticated(true);
      setError(false);
    } else {
      setError(true);
      setPin("");
    }
  };

  // ✨ TAMPILAN LOCK SCREEN (Minta PIN)
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#d6d3d1] flex items-center justify-center p-4 relative overflow-hidden">
        {/* Background Cover Tipis */}
        <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
          <Image src={WeddingData.coverPhoto} alt="Background" fill className="object-cover blur-sm" />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 bg-white/90 backdrop-blur-md p-8 md:p-10 rounded-3xl shadow-2xl max-w-sm w-full text-center border border-stone-200"
        >
          <div className="w-16 h-16 bg-stone-900 text-stone-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className={`text-4xl text-stone-800 mb-2 drop-shadow-sm ${parisienne.className}`}>Ruang Brankas</h1>
          <p className="text-[9px] text-stone-500 mb-8 uppercase tracking-[0.3em]">Masukkan PIN Rahasia</p>
          
          <form onSubmit={handleLogin}>
            <input 
              type="password" 
              maxLength={6}
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="••••••"
              className={`w-full text-center tracking-[1em] text-2xl p-4 bg-stone-50/50 border rounded-xl focus:outline-none transition-all ${error ? 'border-rose-400 text-rose-600 bg-rose-50' : 'border-stone-200 focus:border-stone-400'}`}
            />
            {error && <p className="text-[10px] text-rose-600 mt-2 uppercase tracking-widest font-bold">PIN Salah! Coba lagi.</p>}
            
            <button 
              type="submit"
              className="w-full mt-6 py-4 bg-stone-900 text-white rounded-xl text-xs uppercase tracking-[0.3em] font-bold shadow-xl active:scale-95 transition-all"
            >
              Buka Brankas
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  // ✨ TAMPILAN DASHBOARD (Isi Data)
  return (
    <div className="min-h-screen bg-[#d6d3d1] p-4 md:p-8 font-sans pb-24">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* ✨ HEADER DASHBOARD (Estetik Pake Foto) */}
        <div className="relative w-full h-56 md:h-72 rounded-3xl overflow-hidden shadow-2xl flex flex-col items-center justify-center text-center border-4 border-white">
          {/* Background Photo */}
          <div className="absolute inset-0 z-0">
            <Image src={WeddingData.coverPhoto} alt="Cover" fill className="object-cover opacity-80" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/40 to-transparent" />
          </div>
          
          {/* Tombol Keluar */}
          <button 
            onClick={() => setIsAuthenticated(false)} 
            className="absolute top-4 right-4 z-20 px-5 py-2.5 bg-white/20 backdrop-blur-md border border-white/30 text-white rounded-full text-[9px] font-bold uppercase tracking-[0.2em] hover:bg-white/30 active:scale-95 transition-all"
          >
            Tutup Brankas
          </button>

          {/* Konten Judul */}
          <div className="relative z-10 mt-12 px-4">
            <h1 className={`text-5xl md:text-6xl text-white drop-shadow-md ${parisienne.className}`}>Buku Tamu</h1>
            <div className="flex items-center justify-center gap-3 mt-2">
              <span className="text-xs md:text-sm font-serif text-stone-200 tracking-widest uppercase">{WeddingData.groom.shortName}</span>
              <span className={`text-2xl text-rose-500 drop-shadow-sm ${parisienne.className}`}>&</span>
              <span className="text-xs md:text-sm font-serif text-stone-200 tracking-widest uppercase">{WeddingData.bride.shortName}</span>
            </div>
          </div>
        </div>

        {/* ✨ Statistik / Counter (Estetik Mode) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-stone-100 flex flex-col items-center justify-center text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-stone-50 rounded-bl-full -z-10" />
            <span className="text-4xl font-serif text-stone-800">{guestData.length}</span>
            <span className="text-[9px] text-stone-400 font-bold uppercase tracking-[0.2em] mt-2">Total Ucapan</span>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-stone-100 flex flex-col items-center justify-center text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-[#20636e]/5 rounded-bl-full -z-10" />
            <span className="text-4xl font-serif text-[#20636e]">{guestData.filter(d => d.kehadiran === 'hadir').length}</span>
            <span className="text-[9px] text-stone-400 font-bold uppercase tracking-[0.2em] mt-2">Konfirmasi Hadir</span>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-stone-100 flex flex-col items-center justify-center text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-amber-50 rounded-bl-full -z-10" />
            <span className="text-4xl font-serif text-amber-700">{guestData.reduce((acc, curr) => acc + (curr.jumlah_tamu || 0), 0)}</span>
            <span className="text-[9px] text-stone-400 font-bold uppercase tracking-[0.2em] mt-2">Porsi Makan</span>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-stone-100 flex flex-col items-center justify-center text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-rose-50 rounded-bl-full -z-10" />
            <span className="text-4xl font-serif text-rose-700">{guestData.filter(d => d.kehadiran === 'tidak_hadir').length}</span>
            <span className="text-[9px] text-stone-400 font-bold uppercase tracking-[0.2em] mt-2">Tidak Hadir</span>
          </div>
        </div>

        {/* ✨ Daftar Ucapan (Desain Kartu Surat) */}
        <div className="bg-white rounded-3xl shadow-xl border border-stone-100 overflow-hidden">
          <div className="p-6 border-b border-stone-100 bg-stone-50 flex items-center gap-3">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm text-lg">
              💌
            </div>
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-stone-700">Pesan Masuk</h2>
          </div>
          
          <div className="divide-y divide-stone-100/80 bg-white">
            {guestData.length === 0 ? (
              <div className="p-12 text-center text-stone-400">
                <p className="text-sm italic">Belum ada pesan yang masuk.</p>
              </div>
            ) : (
              guestData.map((tamu) => (
                <div key={tamu.id} className="p-6 hover:bg-stone-50/50 transition-colors group">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      {/* Inisial Nama */}
                      <div className="w-10 h-10 rounded-full bg-stone-100 border border-stone-200 flex items-center justify-center text-stone-600 font-serif text-lg group-hover:bg-stone-800 group-hover:text-white transition-colors">
                        {tamu.nama.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="font-bold text-stone-800 text-sm md:text-base">{tamu.nama}</h3>
                        <p className="text-[9px] text-stone-400 tracking-wider mt-0.5">{new Date(tamu.created_at).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}</p>
                      </div>
                    </div>
                    
                    {/* Badge Kehadiran */}
                    {tamu.kehadiran === 'hadir' ? (
                      <span className="px-3 py-1.5 bg-[#20636e]/10 text-[#20636e] border border-[#20636e]/20 text-[8px] font-bold uppercase tracking-[0.2em] rounded-full">
                        Hadir ({tamu.jumlah_tamu} Org)
                      </span>
                    ) : (
                      <span className="px-3 py-1.5 bg-rose-50 text-rose-600 border border-rose-100 text-[8px] font-bold uppercase tracking-[0.2em] rounded-full">
                        Absen
                      </span>
                    )}
                  </div>
                  
                  {/* Isi Pesan (Kutipan estetik) */}
                  <div className="relative mt-4 pl-4 border-l-2 border-stone-200">
                    <svg className="absolute -top-1 -left-1 w-4 h-4 text-stone-200 bg-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                    <p className="text-sm text-stone-600 leading-relaxed italic pl-3 pr-2">
                      {tamu.ucapan}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* ✨ TRADEMARK / DEVELOPER SPACE */}
        <div className="pt-8 pb-4 text-center">
          <p className="text-[8px] md:text-[9px] uppercase tracking-[0.2em] font-medium text-stone-500">
            Bagian Karya <span className="font-bold tracking-[0.3em] text-[#20636e]">Helvetecha</span>
          </p>
        </div>

      </div>
    </div>
  );
}