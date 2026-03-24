"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import { WeddingData } from '@/data/invitation';

export default function GallerySection({ data }: { data: typeof WeddingData }) {
  return (
    <div className="w-full max-w-4xl mx-auto pt-4 md:pt-8 pb-12 px-6 flex flex-col items-center">
      {/* HEADER GALLERY */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
        className="text-center mb-10"
      >
        <span className="font-sans uppercase tracking-[0.3em] text-xs text-stone-400 mb-2 block">Our Memories</span>
        <h2 className="text-3xl md:text-4xl font-serif text-stone-800 mb-4 tracking-tight">Galeri Foto</h2>
        <div className="h-[1px] w-12 bg-stone-300 mx-auto" />
      </motion.div>

      {/* GRID FOTO */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 w-full">
        {data.gallery.map((src, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: (index % 3) * 0.15, duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
            className={`relative w-full ${index % 3 === 0 ? 'aspect-square' : 'aspect-[4/5]'} rounded-xl overflow-hidden shadow-sm bg-stone-100`}
          >
            <Image src={src} alt={`Gallery ${index + 1}`} fill className="object-cover hover:scale-110 transition-transform duration-500" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}