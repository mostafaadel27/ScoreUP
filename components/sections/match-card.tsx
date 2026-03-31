"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Match } from "@/lib/types";
import { StatusBadge } from "@/components/ui/badge";
import { getMatchCategory, formatMatchTime, cn } from "@/lib/utils";
import { Star } from "lucide-react";
import { useFavoritesStore } from "@/store/use-favorites-store";

interface MatchCardProps {
  match: Match;
  index?: number;
}

export function MatchCard({ match, index = 0 }: MatchCardProps) {
  const { fixture, league, teams, goals } = match;
  const category = getMatchCategory(fixture.status.short);
  const isLive = category === "live";
  const { isFavorite, toggleFavorite } = useFavoritesStore();

  const homeIsFav = isFavorite(teams.home.id);
  const awayIsFav = isFavorite(teams.away.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="h-full"
    >
      <Link href={`/match/${fixture.id}`} className="block h-full">
        <div
          className={cn(
            "glass-card p-5 cursor-pointer group h-full flex flex-col",
            isLive && "live-glow"
          )}
        >
          {/* League Header */}
          <div className="flex items-center justify-between mb-4">
            <Link
              href={`/league/${league.id}`}
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2 hover:text-accent transition-colors"
            >
              <Image src={league.logo} alt={league.name} width={18} height={18} className="rounded-sm" unoptimized />
              <span className="text-xs text-muted hover:text-accent truncate max-w-[140px]">{league.name}</span>
            </Link>
            <StatusBadge status={fixture.status.short} elapsed={fixture.status.elapsed} />
          </div>

          {/* Teams & Score */}
          <div className="flex items-center justify-between gap-3">
            {/* Home Team */}
            <div className="flex-1 flex items-center gap-3 min-w-0">
              <div className="relative flex-shrink-0">
                <Link href={`/team/${teams.home.id}`} onClick={(e) => e.stopPropagation()}>
                  <Image src={teams.home.logo} alt={teams.home.name} width={40} height={40} className="rounded-lg" unoptimized />
                </Link>
                <button
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleFavorite(teams.home.id); }}
                  className={cn(
                    "absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center transition-all cursor-pointer",
                    homeIsFav ? "bg-amber-500 text-white" : "bg-card-border text-muted opacity-0 group-hover:opacity-100"
                  )}
                >
                  <Star className="w-3 h-3" fill={homeIsFav ? "currentColor" : "none"} />
                </button>
              </div>
              <Link href={`/team/${teams.home.id}`} onClick={(e) => e.stopPropagation()} className="text-sm font-medium truncate hover:text-accent transition-colors">
                {teams.home.name}
              </Link>
            </div>

            {/* Score */}
            <div className="flex-shrink-0 px-4 py-2 rounded-xl bg-background/50 border border-card-border min-w-[72px] text-center">
              {goals.home !== null && goals.away !== null ? (
                <span className={cn("text-xl font-bold tabular-nums", isLive && "text-red-400")}>
                  {goals.home} - {goals.away}
                </span>
              ) : (
                <span className="text-sm font-medium text-muted">{formatMatchTime(fixture.date)}</span>
              )}
            </div>

            {/* Away Team */}
            <div className="flex-1 flex items-center justify-end gap-3 min-w-0">
              <Link href={`/team/${teams.away.id}`} onClick={(e) => e.stopPropagation()} className="text-sm font-medium truncate text-right hover:text-accent transition-colors">
                {teams.away.name}
              </Link>
              <div className="relative flex-shrink-0">
                <Link href={`/team/${teams.away.id}`} onClick={(e) => e.stopPropagation()}>
                  <Image src={teams.away.logo} alt={teams.away.name} width={40} height={40} className="rounded-lg" unoptimized />
                </Link>
                <button
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleFavorite(teams.away.id); }}
                  className={cn(
                    "absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center transition-all cursor-pointer",
                    awayIsFav ? "bg-amber-500 text-white" : "bg-card-border text-muted opacity-0 group-hover:opacity-100"
                  )}
                >
                  <Star className="w-3 h-3" fill={awayIsFav ? "currentColor" : "none"} />
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-auto pt-3 border-t border-card-border/50 flex items-center justify-between">
            <span className="text-[11px] text-muted">{league.round}</span>
            {fixture.venue.name && (
              <span className="text-[11px] text-muted truncate max-w-[120px]">📍 {fixture.venue.name}</span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
