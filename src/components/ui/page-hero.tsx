"use client";

import { motion } from "framer-motion";
import { CalendarDays,  Mail, UserPlus, Users } from "lucide-react";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  icon?:  | "mail" | "users" | "calendar" | "userplus";
};

export function PageHero({
  eyebrow,
  title,
  description,
  icon,
}: PageHeroProps) {
  const renderIcon = () => {
    switch (icon) {
      case "mail":
        return <Mail size={40} className="text-emerald-200" />;
      case "users":
        return <Users size={40} className="text-emerald-200" />;
      case "calendar":
        return <CalendarDays size={40} className="text-emerald-200" />;
        case "userplus":
        return <UserPlus size={40} className="text-emerald-200" />;
      default:
        return null;
    }
  };

  return (
    <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-emerald-700 px-6">
      <div className="absolute inset-0 h-full w-full">
        <div className="absolute top-0 -left-1/4 h-full w-full rounded-full bg-linear-to-br from-emerald-600/40 to-transparent blur-[120px] mix-blend-overlay" />
        <div className="absolute right-0 bottom-0 h-full w-full rounded-full bg-linear-to-tl from-teal-600/30 to-transparent blur-[150px] mix-blend-overlay" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl text-center text-white">
        {icon ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-6 flex justify-center"
          >
            <div className="rounded-3xl border border-white/20 bg-white/20 p-4 shadow-2xl backdrop-blur-md">
              {renderIcon()}
            </div>
          </motion.div>
        ) : null}

        {eyebrow ? (
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex rounded-full bg-white/10 px-4 py-1 text-xs font-semibold tracking-[0.16em] text-white/90"
          >
            {eyebrow}
          </motion.span>
        ) : null}

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-5 text-4xl font-extrabold tracking-tight text-white md:text-6xl"
        >
          {title}
        </motion.h1>

        {description ? (
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mx-auto mt-5 max-w-3xl text-base leading-8 text-white/85 md:text-xl"
          >
            {description}
          </motion.p>
        ) : null}
      </div>
    </section>
  );
}