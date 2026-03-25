"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { Parisienne } from 'next/font/google';
import { WeddingData } from "@/data/invitation";

const parisienne = Parisienne({ subsets: ['latin'], weight: ['400'] });

// ✨ Tipe data untuk memastikan semua properti (nama, no_wa, dll) konsisten
interface InvitationLink {
  id: string;
  created_at: string;
  nama: string;
  no_wa: string;
  is_sent: boolean;
}

export default function BroadcastPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);

  const [linksData, setLinksData] = useState<InvitationLink[]>([]);
  const [newGuest, setNewGuest] = useState({ nama: "", noWa: "" });
  const [isAdding, setIsAdding] = useState(false);

  // ✨ State untuk menyimpan data yang sedang di-edit
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState({ nama: "", no_wa: "" });

  // ✨ Sesuaikan PIN Rahasia ini dengan yang ada di dashboard utama Anda
  const SECRET_PIN = "010426"; 

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === SECRET_PIN) {
      setIsAuthenticated(true);
      setError(false);
    } else {
      setError(true);
      setPin("");
    }
  };

  useEffect(() => {
    const fetchLinks = async () => {
      const { data, error } = await supabase
        .from("invitation_links")
        .select("*")
        .order("created_at", { ascending: false });
      if (data && !error) {
        setLinksData(data);
      }
    };

    if (isAuthenticated) {
      fetchLinks();
    }
  }, [isAuthenticated]);

  const handleAddGuest = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAdding(true);
    const { data, error } = await supabase
      .from("invitation_links")
      .insert([{ nama: newGuest.nama, no_wa: newGuest.noWa, is_sent: false }])
      .select();

    if (!error && data) {
      setLinksData([data[0], ...linksData]);
      setNewGuest({ nama: "", noWa: "" });
    } else {
      console.error("Supabase Error Insert:", error);
      alert(`Gagal menyimpan data tamu: ${error?.message || "Cek console untuk detail"}`);
    }
    setIsAdding(false);
  };

  // ✨ FUNGSI EDIT & HAPUS
  const handleEditClick = (guest: InvitationLink) => {
    setEditingId(guest.id);
    setEditData({ nama: guest.nama, no_wa: guest.no_wa });
  };

  const handleUpdate = async (id: string) => {
    const { error } = await supabase
      .from("invitation_links")
      .update({ nama: editData.nama, no_wa: editData.no_wa })
      .eq("id", id);

    if (!error) {
      // Update state lokal biar UI langsung berubah tanpa refresh
      setLinksData(linksData.map((l) => (l.id === id ? { ...l, nama: editData.nama, no_wa: editData.no_wa } : l)));
      setEditingId(null);
    } else {
      alert(`Gagal update data: ${error.message}`);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Yakin ingin menghapus tamu ini dari daftar?")) return;

    const { error } = await supabase
      .from("invitation_links")
      .delete()
      .eq("id", id);

    if (!error) {
      setLinksData(linksData.filter((l) => l.id !== id));
    } else {
      alert(`Gagal menghapus data: ${error.message}`);
    }
  };

  const handleSendWA = async (guest: InvitationLink) => {
    // Bersihkan nomor WA dan ubah angka 0 di depan menjadi 62
    let phone = guest.no_wa.replace(/\D/g, '');
    if (phone.startsWith('0')) phone = '62' + phone.substring(1);

    // Generate Link Personalisasi dengan Enkripsi (Base64)
    const encryptedName = encodeURIComponent(btoa(encodeURIComponent(guest.nama)));
    const link = `${window.location.origin}/?to=${encryptedName}`;
    
    // Generate Teks Pesan
    const message = `Bismillah...\n\nTanpa mengurangi rasa hormat, perkenankan kami mengundang Bapak/Ibu/Saudara/i *${guest.nama}* untuk hadir dan memberikan doa restu pada acara pernikahan kami.\n\nDetail acara dan lokasi dapat diakses melalui tautan undangan digital berikut:\n${link}\n\nMerupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir.\n\nTerima kasih,\n*${WeddingData.groom.shortName} & ${WeddingData.bride.shortName}*`;

    const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');

    // Update status "Terkirim" di database Supabase
    const { error } = await supabase
      .from("invitation_links")
      .update({ is_sent: true })
      .eq("id", guest.id);

    if (!error) {
      setLinksData(linksData.map((l) => (l.id === guest.id ? { ...l, is_sent: true } : l)));
    }
  };

  // TAMPILAN LOCK SCREEN
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#d6d3d1] flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
          <Image src={WeddingData.coverPhoto} alt="Background" fill className="object-cover blur-sm" />
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 bg-white/90 backdrop-blur-md p-8 md:p-10 rounded-3xl shadow-2xl max-w-sm w-full text-center border border-stone-200">
          <div className="w-16 h-16 bg-stone-900 text-stone-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
            <span className="text-2xl">✉️</span>
          </div>
          <h1 className={`text-4xl text-stone-800 mb-2 drop-shadow-sm ${parisienne.className}`}>Sebar Undangan</h1>
          <p className="text-[9px] text-stone-500 mb-8 uppercase tracking-[0.3em]">Masukkan PIN Rahasia</p>
          <form onSubmit={handleLogin}>
            <input type="password" maxLength={6} value={pin} onChange={(e) => setPin(e.target.value)} placeholder="••••••" className={`w-full text-center tracking-[1em] text-2xl p-4 bg-stone-50/50 border rounded-xl focus:outline-none transition-all ${error ? "border-rose-400 text-rose-600 bg-rose-50" : "border-stone-200 focus:border-stone-400"}`} />
            {error && <p className="text-[10px] text-rose-600 mt-2 uppercase tracking-widest font-bold">PIN Salah! Coba lagi.</p>}
            <button type="submit" className="w-full mt-6 py-4 bg-stone-900 text-white rounded-xl text-xs uppercase tracking-[0.3em] font-bold shadow-xl active:scale-95 transition-all">Buka Halaman</button>
          </form>
        </motion.div>
      </div>
    );
  }

  // TAMPILAN HALAMAN BROADCAST
  return (
    <div className="min-h-screen bg-[#d6d3d1] p-4 md:p-8 font-sans pb-24">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header Area */}
        <div className="relative w-full h-56 md:h-72 rounded-3xl overflow-hidden shadow-2xl flex flex-col items-center justify-center text-center border-4 border-white">
          <div className="absolute inset-0 z-0">
            <Image src={WeddingData.coverPhoto} alt="Cover" fill className="object-cover opacity-80" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/40 to-transparent" />
          </div>
          <a href="/dashboard" className="absolute top-4 left-4 z-20 px-5 py-2.5 bg-white/20 backdrop-blur-md border border-white/30 text-white rounded-full text-[9px] font-bold uppercase tracking-[0.2em] hover:bg-white/30 transition-all">
            ← Kembali ke Buku Tamu
          </a>
          <button onClick={() => setIsAuthenticated(false)} className="absolute top-4 right-4 z-20 px-5 py-2.5 bg-white/20 backdrop-blur-md border border-white/30 text-white rounded-full text-[9px] font-bold uppercase tracking-[0.2em] hover:bg-white/30 active:scale-95 transition-all">
            Kunci Halaman
          </button>
          <div className="relative z-10 mt-12 px-4">
            <h1 className={`text-5xl md:text-6xl text-white drop-shadow-md ${parisienne.className}`}>Sebar Undangan</h1>
            <div className="flex items-center justify-center gap-3 mt-2">
              <span className="text-xs md:text-sm font-serif text-stone-200 tracking-widest uppercase">{WeddingData.groom.shortName}</span>
              <span className={`text-2xl text-rose-500 drop-shadow-sm ${parisienne.className}`}>&</span>
              <span className="text-xs md:text-sm font-serif text-stone-200 tracking-widest uppercase">{WeddingData.bride.shortName}</span>
            </div>
          </div>
        </div>

        {/* Form Tambah Tamu */}
        <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl border border-stone-100">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-stone-700 mb-6 flex items-center gap-2">
            <span className="text-xl">📝</span> Input Data Kontak
          </h2>
          <form onSubmit={handleAddGuest} className="flex flex-col md:flex-row gap-4">
            <input type="text" required placeholder="Nama Tamu (Cth: Bapak Budi Santoso)" value={newGuest.nama} onChange={(e) => setNewGuest({ ...newGuest, nama: e.target.value })} className="flex-1 p-4 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-stone-400" />
            <input type="text" required placeholder="No. WhatsApp (Cth: 0812...)" value={newGuest.noWa} onChange={(e) => setNewGuest({ ...newGuest, noWa: e.target.value })} className="flex-1 p-4 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-stone-400" />
            <button type="submit" disabled={isAdding} className="px-8 py-4 bg-stone-800 text-white rounded-xl text-xs font-bold uppercase tracking-widest disabled:opacity-50 hover:bg-stone-700 active:scale-95 transition-all whitespace-nowrap">
              {isAdding ? "Menyimpan..." : "Simpan"}
            </button>
          </form>
        </div>

        {/* List Tamu & Tombol Kirim */}
        <div className="bg-white rounded-3xl shadow-xl border border-stone-100 overflow-hidden">
          <div className="p-6 border-b border-stone-100 bg-stone-50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm text-lg">🚀</div>
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-stone-700">Daftar Siap Kirim</h2>
            </div>
            <div className="flex gap-2">
              <span className="text-[10px] font-bold px-3 py-1 bg-green-100 text-green-700 rounded-full">{linksData.filter(d => d.is_sent).length} Terkirim</span>
              <span className="text-[10px] font-bold px-3 py-1 bg-stone-200 text-stone-600 rounded-full">{linksData.length} Total</span>
            </div>
          </div>
          
          <div className="divide-y divide-stone-100/80">
            {linksData.length === 0 ? (
              <div className="p-12 text-center text-stone-400"><p className="text-sm italic">Belum ada daftar tamu untuk dikirimi undangan.</p></div>
            ) : (
              linksData.map((guest) => (
                <div key={guest.id} className="p-4 md:p-6 hover:bg-stone-50/50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4 group">
                  {editingId === guest.id ? (
                    <div className="w-full flex flex-col md:flex-row gap-3">
                      <input 
                        type="text" 
                        value={editData.nama} 
                        onChange={(e) => setEditData({ ...editData, nama: e.target.value })} 
                        className="flex-1 p-3 bg-white border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
                        placeholder="Nama Tamu"
                      />
                      <input 
                        type="text" 
                        value={editData.no_wa} 
                        onChange={(e) => setEditData({ ...editData, no_wa: e.target.value })} 
                        className="flex-1 p-3 bg-white border border-stone-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
                        placeholder="No WhatsApp"
                      />
                      <div className="flex gap-2">
                        <button onClick={() => handleUpdate(guest.id)} className="px-6 py-3 bg-blue-600 text-white rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-blue-700 transition-all flex-1 md:flex-none">Simpan</button>
                        <button onClick={() => setEditingId(null)} className="px-6 py-3 bg-stone-200 text-stone-600 rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-stone-300 transition-all flex-1 md:flex-none">Batal</button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-serif text-lg font-bold border ${guest.is_sent ? 'bg-green-50 border-green-200 text-green-600' : 'bg-stone-100 border-stone-200 text-stone-600'}`}>
                          {guest.nama.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <h3 className="font-bold text-stone-800 flex items-center gap-2">
                            {guest.nama} 
                            {guest.is_sent && <span className="text-[8px] px-2 py-0.5 bg-green-100 text-green-700 uppercase tracking-widest rounded-sm">Terkirim</span>}
                          </h3>
                          <p className="text-xs text-stone-500 font-mono mt-1">{guest.no_wa}</p>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap items-center justify-end gap-2 mt-3 md:mt-0 w-full md:w-auto border-t md:border-t-0 border-stone-100 pt-3 md:pt-0">
                        <button onClick={() => handleEditClick(guest)} className="w-10 h-10 flex items-center justify-center rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 transition-all" title="Edit">✏️</button>
                        <button onClick={() => handleDelete(guest.id)} className="w-10 h-10 flex items-center justify-center rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 transition-all" title="Hapus">🗑️</button>
                        <button onClick={() => handleSendWA(guest)} className={`flex-1 md:flex-none px-6 py-3 rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 ${guest.is_sent ? 'bg-stone-100 text-stone-500 hover:bg-stone-200' : 'bg-green-600 text-white hover:bg-green-700 shadow-md shadow-green-900/10'}`}>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg>
                          <span className="whitespace-nowrap">{guest.is_sent ? "Kirim Ulang" : "Kirim WA"}</span>
                        </button>
                      </div>
                    </>
                  )}
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