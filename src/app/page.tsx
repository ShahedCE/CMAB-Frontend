"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Play,
  Sparkles,
  ShieldCheck,
  BarChart3,
  Layers3,
} from "lucide-react";

const fadeUp: any = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: i * 0.12,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const floating: any = {
  animate: {
    y: [0, -8, 0],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export default function CmabLandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.18),transparent_28%),radial-gradient(circle_at_top_right,rgba(168,85,247,0.18),transparent_28%),radial-gradient(circle_at_bottom,rgba(16,185,129,0.12),transparent_30%)]" />
        <div className="absolute inset-0 bg-slate-950/90" />
        <div className="absolute left-1/2 top-0 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[24rem] w-[24rem] rounded-full bg-fuchsia-500/10 blur-3xl" />
      </div>

      {/* Hero Section */}
      <section className="relative">
        <div className="mx-auto grid min-h-[92vh] max-w-7xl items-center gap-14 px-6 py-20 lg:grid-cols-2 lg:px-8 lg:py-28">
          {/* Left Content */}
          <div className="max-w-2xl">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200 backdrop-blur-md"
            >
              <Sparkles className="h-4 w-4" />
              Premium experience for modern products
            </motion.div>

            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={1}
              className="text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl lg:text-7xl"
            >
              Build a{" "}
              <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text text-transparent">
                premium digital experience
              </span>{" "}
              with CMAB
            </motion.h1>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={2}
              className="mt-6 max-w-xl text-base leading-8 text-slate-300 sm:text-lg"
            >
              CMAB helps brands create elegant, high-performing interfaces with
              modern visuals, smooth interactions, and clear content hierarchy
              that feels premium from the first impression.
            </motion.p>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={3}
              className="mt-10 flex flex-col gap-4 sm:flex-row"
            >
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 px-6 py-3.5 text-sm font-semibold text-white shadow-xl shadow-blue-900/30 transition"
              >
                Launch Project
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/10"
              >
                <Play className="h-4 w-4" />
                Watch Demo
              </motion.button>
            </motion.div>

            {/* Small stats */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={4}
              className="mt-14 grid grid-cols-3 gap-4 border-t border-white/10 pt-8"
            >
              {[
                { value: "99.9%", label: "Uptime Ready" },
                { value: "Fast", label: "Performance Focus" },
                { value: "Modern", label: "UI System" },
              ].map((item) => (
                <div key={item.label}>
                  <p className="text-2xl font-semibold text-white">{item.value}</p>
                  <p className="mt-1 text-sm text-slate-400">{item.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Visual */}
          <motion.div
            variants={floating}
            animate="animate"
            className="relative mx-auto w-full max-w-2xl"
          >
            <div className="absolute -left-10 top-10 h-32 w-32 rounded-full bg-cyan-500/20 blur-3xl" />
            <div className="absolute -right-6 bottom-0 h-32 w-32 rounded-full bg-violet-500/20 blur-3xl" />

            <div className="relative rounded-[2rem] border border-white/10 bg-white/5 p-4 shadow-2xl shadow-black/30 backdrop-blur-2xl">
              <div className="rounded-[1.6rem] border border-white/10 bg-slate-900/80 p-5">
                {/* Fake dashboard header */}
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">CMAB Dashboard</p>
                    <h3 className="mt-1 text-xl font-semibold text-white">
                      Product Overview
                    </h3>
                  </div>
                  <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">
                    Live Analytics
                  </div>
                </div>

                {/* Main card */}
                <div className="grid gap-4 lg:grid-cols-[1.4fr_0.9fr]">
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-5 transition duration-300"
                  >
                    <div className="mb-6 flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-400">Growth Metrics</p>
                        <h4 className="text-lg font-semibold text-white">
                          Performance Snapshot
                        </h4>
                      </div>
                      <BarChart3 className="h-5 w-5 text-cyan-300" />
                    </div>

                    <div className="space-y-4">
                      <div>
                        <div className="mb-2 flex items-center justify-between text-sm">
                          <span className="text-slate-300">Engagement</span>
                          <span className="text-white">82%</span>
                        </div>
                        <div className="h-2 rounded-full bg-white/10">
                          <div className="h-2 w-[82%] rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" />
                        </div>
                      </div>

                      <div>
                        <div className="mb-2 flex items-center justify-between text-sm">
                          <span className="text-slate-300">Conversion</span>
                          <span className="text-white">68%</span>
                        </div>
                        <div className="h-2 rounded-full bg-white/10">
                          <div className="h-2 w-[68%] rounded-full bg-gradient-to-r from-violet-400 to-fuchsia-500" />
                        </div>
                      </div>

                      <div>
                        <div className="mb-2 flex items-center justify-between text-sm">
                          <span className="text-slate-300">Retention</span>
                          <span className="text-white">91%</span>
                        </div>
                        <div className="h-2 rounded-full bg-white/10">
                          <div className="h-2 w-[91%] rounded-full bg-gradient-to-r from-emerald-400 to-cyan-500" />
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  <div className="space-y-4">
                    {[
                      {
                        icon: <ShieldCheck className="h-5 w-5 text-cyan-300" />,
                        title: "Secure by Design",
                        text: "Elegant UI with trust-focused visual patterns.",
                      },
                      {
                        icon: <Sparkles className="h-5 w-5 text-violet-300" />,
                        title: "Refined Experience",
                        text: "Subtle motion and thoughtful spacing throughout.",
                      },
                    ].map((card) => (
                      <motion.div
                        key={card.title}
                        whileHover={{ y: -4, scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl transition duration-300 hover:bg-white/10"
                      >
                        <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10">
                          {card.icon}
                        </div>
                        <h4 className="text-base font-semibold text-white">
                          {card.title}
                        </h4>
                        <p className="mt-2 text-sm leading-6 text-slate-400">
                          {card.text}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="relative mx-auto max-w-7xl px-6 pb-24 lg:px-8">
        <div className="mb-12 text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-300/80">
            Why CMAB
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Designed for clarity, motion, and modern elegance
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            Every section is built to feel premium, balanced, and visually
            consistent across desktop and mobile.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {[
            {
              title: "Better Visual Hierarchy",
              desc: "Stronger headline contrast, cleaner text grouping, and easier content scanning.",
            },
            {
              title: "Smooth Micro-interactions",
              desc: "Buttons, cards, and controls feel more alive with subtle hover and tap feedback.",
            },
            {
              title: "Premium Layout Rhythm",
              desc: "Improved spacing and alignment create a polished, trustworthy first impression.",
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              whileHover={{ y: -6 }}
              className="group rounded-[1.75rem] border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-6 backdrop-blur-xl transition duration-300 hover:border-cyan-400/20 hover:bg-white/10"
            >
              <div className="mb-5 h-12 w-12 rounded-2xl bg-gradient-to-br from-cyan-400/20 to-violet-400/20 ring-1 ring-white/10" />
              <h3 className="text-xl font-semibold text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-400">{item.desc}</p>
              <div className="mt-5 flex items-center text-sm font-medium text-cyan-300 opacity-80 transition group-hover:translate-x-1">
                Learn more <ArrowRight className="ml-2 h-4 w-4" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}