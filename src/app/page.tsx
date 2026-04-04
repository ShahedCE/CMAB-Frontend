"use client";
import Hero from "@/components/home/Hero";
import { motion } from "framer-motion";
import { Activity, Users, Heart, BookOpen, ChevronRight, Stethoscope } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const activities = [
    { title: "বিনামূল্যে চিকিৎসা সেবা", icon: <Stethoscope size={32} className="text-emerald-600"/>, desc: "প্রান্তিক জনগোষ্ঠীর জন্য ফ্রি মেডিকেল ক্যাম্প ও জরুরি চিকিৎসা সেবা প্রদান।" },
    { title: "স্বাস্থ্য সচেতনতা কর্মসূচি", icon: <Activity size={32} className="text-emerald-600"/>, desc: "রোগ প্রতিরোধ ও স্বাস্থ্যসম্মত জীবনযাপনের জন্য নিয়মিত সেমিনার ও প্রচারণা।" },
    { title: "মেডিকেল ক্যাম্প", icon: <Users size={32} className="text-emerald-600"/>, desc: "দেশব্যাপী বিভিন্ন স্থানে দরিদ্র ও অসহায় মানুষের জন্য ফ্রি স্বাস্থ্য পরীক্ষা।" },
    { title: "শিক্ষামূলক কার্যক্রম", icon: <BookOpen size={32} className="text-emerald-600"/>, desc: "চিকিৎসা বিজ্ঞান ও স্বাস্থ্যসেবায় কর্মরতদের দক্ষতা বৃদ্ধির জন্য প্রশিক্ষণ।" },
  ];

  return (
    <main className="bg-gray-50 min-h-screen">
      <Hero />

      {/* About Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-sm font-bold text-teal-600 uppercase tracking-widest mb-2">আমাদের পরিচিতি</h2>
            <h3 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
              মানবতার কল্যাণে <br/> <span className="text-emerald-600">নিবেদিত প্রাণ</span>
            </h3>
            <div className="w-20 h-1.5 bg-emerald-600 rounded-full mb-8"></div>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              খ্রিস্টিয়ান মেডিকেল অ্যাসোসিয়েশন বাংলাদেশ (সিএমএবি) একটি সেবামূলক, 
              অরাজনৈতিক ও অলাভজনক সংগঠন। ১৯৫৬ সালে প্রতিষ্ঠার পর থেকে আমরা 
              খ্রিস্টীয় মূল্যবোধে অনুপ্রাণিত হয়ে দেশের প্রত্যন্ত অঞ্চলে স্বাস্থ্যসেবা পৌঁছে দিচ্ছি।
            </p>
            <Link href="/about" className="inline-flex items-center gap-2 text-emerald-600 font-semibold hover:underline">
              আরও জানুন <ChevronRight className="group-hover:translate-x-1 transition-transform"/>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-linear-to-r from-emerald-600 to-secondary rounded-3xl transform rotate-3 scale-105 opacity-20 blur-xl"></div>
            <div className="relative bg-white p-8 rounded-3xl shadow-2xl border border-gray-100 flex flex-col items-center justify-center min-h-100">
              <Heart size={80} className="text-red-500 mb-6 animate-pulse" />
              <h4 className="text-2xl font-bold text-gray-900 mb-4 text-center">আমাদের লক্ষ্য</h4>
              <ul className="space-y-4 text-gray-700 w-full text-lg">
                <li className="flex items-center gap-3 bg-gray-50 border border-gray-100 p-4 rounded-xl shadow-sm"><span className="bg-emerald-100 text-emerald-600 p-1 rounded-full"><Users size={16}/></span> মানবসেবার মাধ্যমে সমাজের উন্নয়ন</li>
                <li className="flex items-center gap-3 bg-gray-50 border border-gray-100 p-4 rounded-xl shadow-sm"><span className="bg-emerald-100 text-emerald-600 p-1 rounded-full"><Activity size={16}/></span> দরিদ্রদের জন্য স্বাস্থ্যসেবা নিশ্চিত করা</li>
                <li className="flex items-center gap-3 bg-gray-50 border border-gray-100 p-4 rounded-xl shadow-sm"><span className="bg-emerald-100 text-emerald-600 p-1 rounded-full"><Heart size={16}/></span> খ্রিস্টীয় মূল্যবোধে অনুপ্রাণিত সেবা প্রদান</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Activities Section */}
      <section className="py-24 bg-white relative">
         <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-sm font-bold text-teal-600 uppercase tracking-widest mb-2">কর্মসূচি</h2>
              <h3 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">আমাদের কার্যক্রম</h3>
              <p className="text-gray-500 max-w-2xl mx-auto text-lg">বহুমাত্রিক সেবামূলক পদক্ষেপের মাধ্যমে আমরা দেশের স্বাস্থ্যখাতে অবদান রাখতে প্রতিশ্রুতিবদ্ধ।</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {activities.map((item, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  key={i}
                  className="bg-gray-50 p-8 rounded-3xl hover:bg-white hover:shadow-2xl transition-all duration-300 border border-transparent hover:border-gray-100 group"
                >
                  <div className="bg-white w-16 h-16 rounded-2xl shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h4>
                  <p className="text-gray-600 font-medium leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
         </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative bg-emerald-700 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay"></div>
        <div className="absolute -left-40 -top-40 w-96 h-96 bg-emerald-600 rounded-full blur-[100px] opacity-30"></div>
        <div className="absolute -right-40 -bottom-40 w-96 h-96 bg-teal-600 rounded-full blur-[100px] opacity-20"></div>

        <div className="relative max-w-4xl mx-auto px-6 text-center z-10">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            আমাদের সেবায় অংশগ্রহণ করুন
          </h2>
          <p className="text-xl text-white/80 mb-10">
            আপনিও পারেন একজন স্বেচ্ছাসেবী কিংবা দাতা হিসেবে আমাদের সাথে যুক্ত হতে।
          </p>
          <Link href="/contact" className="bg-white text-emerald-700 px-10 py-5 rounded-full font-bold text-xl hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-all duration-300 transform hover:-translate-y-1">
            আজই যোগাযোগ করুন
          </Link>
        </div>
      </section>
    </main>
  );
}