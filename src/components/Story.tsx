"use client";

import { motion } from 'framer-motion';
import { WeddingData } from '@/data/invitation';

export default function Story() {
  const stories = WeddingData.stories;

  return (
    <section className="py-20 px-6 bg-white overflow-hidden w-full">
      <div className="max-w-4xl mx-auto">
        
        {/* HEADER STORY */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="font-sans uppercase tracking-[0.3em] text-xs text-stone-400 mb-2 block">
            The Journey of Us
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-stone-800">
            Cerita Cinta Kami
          </h2>
          <div className="h-[1px] w-20 bg-stone-200 mx-auto mt-6" />
        </motion.div>

        {/* TIMELINE ZIG-ZAG */}
        <div className="space-y-12">
          {stories.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className={`flex flex-col ${
                index % 2 === 0 ? 'md:items-start text-left' : 'md:items-end md:text-right'
              } items-center text-center`}
            >
              <h3 className="font-serif text-2xl text-stone-700 mb-3 italic">
                # {item.title}
              </h3>
              <div className="p-6 rounded-2xl bg-[#FAF9F6] border border-stone-100 shadow-sm max-w-2xl leading-relaxed text-stone-600 font-sans text-sm md:text-base">
                {item.content}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}