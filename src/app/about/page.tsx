"use client";
import { motion } from "framer-motion";
import { 
  Building2, 
  Target, 
  Heart, 
  Stethoscope, 
  Baby, 
  GraduationCap, 
  ShieldCheck, 
  Scale, 
  Leaf
} from "lucide-react";

export default function About() {
  const aims = [
    { text: "দেশব্যাপী স্বাস্থ্যসেবা উন্নয়ন করা", icon: <Stethoscope size={24} className="text-emerald-600"/> },
    { text: "দরিদ্র ও অসহায় মানুষের চিকিৎসা সহায়তা", icon: <Heart size={24} className="text-emerald-600"/> },
    { text: "চিকিৎসা ক্ষেত্রে দক্ষ জনশক্তি তৈরি", icon: <GraduationCap size={24} className="text-emerald-600"/> },
    { text: "মাতৃ ও শিশু স্বাস্থ্য উন্নয়ন", icon: <Baby size={24} className="text-emerald-600"/> },
  ];

  const values = [
    { title: "মানবসেবা", desc: "মানুষের কল্যাণে নিঃস্বার্থভাবে কাজ করা", icon: <Heart size={28} className="text-white"/> },
    { title: "খ্রিস্টীয় নৈতিকতা", desc: "খ্রিস্টের আদর্শে অনুপ্রাণিত হয়ে ভালোবাসা ছড়িয়ে দেওয়া", icon: <Building2 size={28} className="text-white"/> },
    { title: "সততা ও দায়িত্বশীলতা", desc: "কাজের প্রতিটি ক্ষেত্রে স্বচ্ছতা ও জবাবদিহিতা", icon: <ShieldCheck size={28} className="text-white"/> },
    { title: "সমতা ও সহানুভূতি", desc: "ধর্ম, বর্ণ নির্বিশেষে সবার জন্য সমান অধিকার", icon: <Scale size={28} className="text-white"/> },
  ];

  return (
    <main className="bg-gray-50 min-h-screen pb-20">
      {/* Page Header */}
      <section className=" bg-emerald-700 text-white pt-36 pb-24 px-6 relative overflow-hidden shadow-2xl w-full mb-20">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-teal-600 rounded-full blur-[100px] opacity-30"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mb-6"
          >
            <div className="bg-white/20 p-4 rounded-3xl backdrop-blur-md border border-white/20">
              <Leaf size={40} className="text-emerald-100" />
            </div>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-6xl font-extrabold mb-6"
          >
            আমাদের সম্পর্কে
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl text-emerald-100/90 leading-relaxed max-w-3xl mx-auto font-medium"
          >
            এটি একটি অরাজনৈতিক, অলাভজনক এবং সেবামূলক সংগঠন, যা খ্রিস্টীয় মূল্যবোধের ভিত্তিতে মানবতার কল্যাণে কাজ করে।
          </motion.p>
        </div>
      </section>

      {/* History & Story */}
      <section className="max-w-7xl mx-auto px-6 mb-24 grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-emerald-600 font-bold uppercase tracking-widest text-sm mb-2">ইতিহাস</h2>
          <h3 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            যেভাবে আমাদের পথচলা শুরু হয়
          </h3>
          <div className="w-16 h-1.5 bg-emerald-600 rounded-full mb-8"></div>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            খ্রিস্টিয়ান মেডিকেল অ্যাসোসিয়েশন বাংলাদেশ (সিএমএবি) <span className="font-bold text-gray-900">১১ জানুয়ারি ১৯৫৬</span> সালে একটি মহৎ লক্ষ্য নিয়ে যাত্রা শুরু করে। রাজশাহী খ্রিস্টান মিশন হাসপাতালে এর প্রতিষ্ঠার বীজ বপন করা হয়েছিল।
          </p>
          <p className="text-gray-600 text-lg leading-relaxed">
            প্রতিষ্ঠার পর থেকে দেশের প্রত্যন্ত ও সুবিধা বঞ্চিত মানুষের দোড়গোড়ায় স্বাস্থ্যসেবা পৌঁছে দিতে সিএমএবি নিরলসভাবে কাজ করে যাচ্ছে।
          </p>
        </motion.div>
        
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
           className="relative"
        >
          <div className="absolute inset-0 bg-linear-to-tr from-emerald-600/30 to-teal-500/20 rounded-3xl blur-2xl transform rotate-6"></div>
          <div className="relative bg-white rounded-3xl border border-gray-100 shadow-xl p-10 flex flex-col items-center justify-center text-center aspect-square">
            <Building2 size={80} className="text-emerald-600/20 mb-6 absolute z-0 scale-150 top-10 right-10" />
            <div className="relative z-10">
              <h4 className="text-6xl font-black text-gray-900 mb-2">১৯৫৬</h4>
              <p className="text-xl font-bold text-emerald-600 uppercase tracking-widest">প্রতিষ্ঠাকাল</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Objectives */}
      <section className="bg-white py-24 mb-24 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Target size={48} className="text-emerald-600 mx-auto mb-6" />
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-12">আমাদের লক্ষ্য ও উদ্দেশ্য</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {aims.map((aim, i) => (
              <motion.div
                key={aim.text}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-gray-50 border border-gray-100 rounded-3xl p-8 hover:shadow-xl transition-all duration-300 hover:border-emerald-100 hover:bg-emerald-50 text-left group"
              >
                <div className="bg-white p-4 rounded-2xl inline-block shadow-sm mb-6 group-hover:scale-110 transition-transform">
                  {aim.icon}
                </div>
                <h4 className="text-xl font-bold text-gray-900 leading-snug">{aim.text}</h4>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-teal-600 uppercase tracking-widest mb-2">মূল নীতি</h2>
          <h3 className="text-3xl md:text-5xl font-extrabold text-gray-900">আমাদের মূল্যবোধ</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {values.map((val, i) => (
            <motion.div
              key={val.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex items-center gap-6 bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:border-emerald-600 transition-colors"
            >
              <div className="shrink-0 bg-emerald-600 p-4 rounded-2xl shadow-md flex items-center justify-center h-16 w-16">
                {val.icon}
              </div>
              <div>
                <h4 className="text-2xl font-bold text-gray-900 mb-2">{val.title}</h4>
                <p className="text-gray-600 text-lg">{val.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}