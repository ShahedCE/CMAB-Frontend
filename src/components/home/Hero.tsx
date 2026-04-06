"use client";
import { motion } from "framer-motion";
import { ArrowRight, HeartHandshake } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-emerald-700">
      {/* Abstract Background Gradients */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute top-0 -left-1/4 w-full h-full bg-linear-to-br from-emerald-600/40 to-transparent rounded-full blur-[120px] mix-blend-overlay"></div>
        <div className="absolute bottom-0 -right-1/4 w-full h-full bg-linear-to-tl from-teal-600/30 to-transparent rounded-full blur-[150px] mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex justify-center mb-8"
        >
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-3xl border border-white/20 shadow-2xl">
            <HeartHandshake size={48} className="text-white drop-shadow-lg" />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-4xl md:text-6xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight mb-6"
        >
            CHRISTIAN MEDICAL <br className="hidden md:block"/>
          <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-100 to-white">
            ASSOCIATION BANGLADESH
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="mt-6 text-xl md:text-2xl text-white/90 font-medium italic mb-10 max-w-2xl mx-auto"
        >
          “পরিচর্যা পাইতে নয়, পরিচর্যা করিতে আসিয়াছি”
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
         <Link
            href="/activities"
            className="w-full sm:w-auto bg-white text-emerald-700 px-8 py-4 rounded-full font-bold text-lg
            hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2 group"
            >
            আমাদের কার্যক্রম
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
            href="/contact"
            className="w-full sm:w-auto bg-transparent border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-full font-bold text-lg backdrop-blur hover:border-white transition-all duration-300 text-center"
            >
            যোগাযোগ করুন
            </Link>
        </motion.div>
      </div>

    </section>
  );
}