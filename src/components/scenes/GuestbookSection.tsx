"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function GuestbookSection() {
  const [formData, setFormData] = useState({
    nama: '',
    ucapan: '',
    kehadiran: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic kirim ke Firebase/Database lo di sini
    console.log("Data dikirim:", formData);
    alert("Terima kasih atas ucapan & doanya!");
  };

  return (
    <div className="w-full max-w-md mx-auto py-20 px-4 flex flex-col items-center">
      
      {/* 1. HEADER MINIMALIS */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl font-serif text-stone-900 mb-4 tracking-tight">Buku Tamu</h2>
        <div className="h-[1px] w-12 bg-stone-200 mx-auto mb-4" />
        <p className="text-xs text-stone-500 uppercase tracking-[0.2em] leading-relaxed">
          Sampaikan doa restu & konfirmasi kehadiran Anda
        </p>
      </motion.div>

      {/* 2. FORM PENGISIAN */}
      <motion.form 
        onSubmit={handleSubmit}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="w-full space-y-6"
      >
        {/* Input Nama */}
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-widest text-stone-400 ml-1">Nama Tamu</label>
          <input 
            type="text"
            required
            placeholder="Tuliskan nama Anda"
            className="w-full p-4 bg-stone-50 border border-stone-100 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-stone-300 transition-all placeholder:text-stone-300"
            onChange={(e) => setFormData({...formData, nama: e.target.value})}
          />
        </div>

        {/* Dropdown Kehadiran */}
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-widest text-stone-400 ml-1">Konfirmasi Kehadiran</label>
          <div className="relative">
            <select 
              required
              className="w-full p-4 bg-stone-50 border border-stone-100 rounded-xl text-sm appearance-none focus:outline-none focus:ring-1 focus:ring-stone-300 transition-all text-stone-700"
              onChange={(e) => setFormData({...formData, kehadiran: e.target.value})}
            >
              <option value="">Pilih Kehadiran</option>
              <option value="hadir">Hadir</option>
              <option value="ragu">Masih Ragu</option>
              <option value="tidak_hadir">Tidak Hadir</option>
            </select>
            {/* Custom Arrow Icon */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-stone-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Textarea Ucapan */}
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-widest text-stone-400 ml-1">Doa & Ucapan</label>
          <textarea 
            rows={4}
            required
            placeholder="Tuliskan pesan manis untuk kedua mempelai..."
            className="w-full p-4 bg-stone-50 border border-stone-100 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-stone-300 transition-all placeholder:text-stone-300 resize-none"
            onChange={(e) => setFormData({...formData, ucapan: e.target.value})}
          />
        </div>

        {/* Submit Button */}
        <button 
          type="submit"
          className="w-full py-4 bg-stone-900 text-white rounded-xl text-xs uppercase tracking-[0.3em] font-bold shadow-lg shadow-stone-200 active:scale-95 transition-all mt-4"
        >
          Kirim Ucapan
        </button>
      </motion.form>

      {/* 3. FOOTER LOGO / OUTRO */}
      <div className="mt-24 text-center opacity-30">
        <p className="font-serif italic text-lg text-stone-800">Luluk & Dwi</p>
        <p className="text-[8px] uppercase tracking-[0.4em] mt-2">01 April 2026</p>
      </div>
      
    </div>
  );
}