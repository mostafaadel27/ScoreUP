"use client";

import { motion } from "framer-motion";
import { Activity, TrendingUp, Globe } from "lucide-react";
import { LeaguesBar } from "./leagues-bar";

export function HeroBanner() {
  return (
    <section className="relative pt-24 pb-8 overflow-hidden hero-gradient">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div className="absolute top-20 left-[10%] w-64 h-64 rounded-full bg-emerald-500/5 blur-3xl" animate={{ y: [0, -20, 0], scale: [1, 1.05, 1] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} />
        <motion.div className="absolute top-32 right-[15%] w-48 h-48 rounded-full bg-blue-500/5 blur-3xl" animate={{ y: [0, 15, 0], scale: [1, 0.95, 1] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }} />
        <motion.div className="absolute bottom-0 left-[40%] w-56 h-56 rounded-full bg-violet-500/5 blur-3xl" animate={{ x: [0, 10, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5, delay: 0.2, type: "spring" }} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-medium mb-6">
            <Activity className="w-3.5 h-3.5" />
            Live Scores & Real-Time Updates
          </motion.div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
            <span className="gradient-text">Your Sports.</span>
            <br />
            <span className="text-foreground">Your Pulse.</span>
          </h1>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.5 }} className="text-muted text-base sm:text-lg max-w-xl mx-auto mb-8">
            Track live football scores, follow top fixtures, and stay updated with the latest sports news — all in one place.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.5 }} className="flex justify-center gap-8 sm:gap-12">
            {[
              { icon: Activity, label: "Live Matches", value: "24/7" },
              { icon: Globe, label: "Leagues Covered", value: "800+" },
              { icon: TrendingUp, label: "Real-Time", value: "60s" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="flex justify-center mb-1"><stat.icon className="w-4 h-4 text-accent" /></div>
                <div className="text-lg font-bold text-foreground">{stat.value}</div>
                <div className="text-xs text-muted">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Leagues Bar */}
          <LeaguesBar />
        </motion.div>
      </div>
    </section>
  );
}
