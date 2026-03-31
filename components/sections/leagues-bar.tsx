"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { topLeagues } from "@/lib/mock-data";

export function LeaguesBar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7, duration: 0.5 }}
      className="mt-10 pt-8 border-t border-card-border/30"
    >
      <p className="text-xs text-muted text-center mb-4 uppercase tracking-widest">Top Leagues</p>
      <div className="flex justify-center gap-4 sm:gap-8 flex-wrap">
        {topLeagues.map((league, i) => (
          <motion.div
            key={league.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 + i * 0.08 }}
          >
            <Link
              href={`/league/${league.id}`}
              className="flex flex-col items-center gap-2 group"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-card/60 border border-card-border flex items-center justify-center group-hover:border-accent/40 group-hover:bg-card-hover transition-all duration-300">
                <Image
                  src={league.logo}
                  alt={league.name}
                  width={32}
                  height={32}
                  className="rounded"
                  unoptimized
                />
              </div>
              <span className="text-[10px] sm:text-xs text-muted group-hover:text-accent transition-colors text-center leading-tight max-w-[70px]">
                {league.name}
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
