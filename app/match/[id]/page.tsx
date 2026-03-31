"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Star, MapPin, User, Clock } from "lucide-react";
import { useMatchDetails } from "@/hooks/use-match-details";
import { useFavoritesStore } from "@/store/use-favorites-store";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { StatusBadge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { cn, formatMatchTime, formatDate } from "@/lib/utils";

export default function MatchDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const matchId = parseInt(resolvedParams.id, 10);
  const { data, isLoading } = useMatchDetails(matchId);
  const { isFavorite, toggleFavorite } = useFavoritesStore();

  const match = data?.match;
  const events = data?.events || [];
  const statistics = data?.statistics || [];

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-accent transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to matches
          </Link>

          {isLoading || !match ? (
            <div className="space-y-6">
              <Skeleton className="w-full h-64 rounded-2xl" />
              <Skeleton className="w-full h-48 rounded-2xl" />
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              {/* Match Header Card */}
              <div className="glass-card p-6 sm:p-8">
                {/* League info */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <Image
                      src={match.league.logo}
                      alt={match.league.name}
                      width={24}
                      height={24}
                      className="rounded"
                      unoptimized
                    />
                    <span className="text-sm text-muted">
                      {match.league.name} · {match.league.round}
                    </span>
                  </div>
                  <StatusBadge
                    status={match.fixture.status.short}
                    elapsed={match.fixture.status.elapsed}
                  />
                </div>

                {/* Teams & Score */}
                <div className="flex items-center justify-between gap-4">
                  {/* Home */}
                  <div className="flex-1 flex flex-col items-center text-center gap-3">
                    <div className="relative">
                      <Image
                        src={match.teams.home.logo}
                        alt={match.teams.home.name}
                        width={72}
                        height={72}
                        className="rounded-xl"
                        unoptimized
                      />
                      <button
                        onClick={() => toggleFavorite(match.teams.home.id)}
                        className={cn(
                          "absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center transition-all cursor-pointer",
                          isFavorite(match.teams.home.id)
                            ? "bg-amber-500 text-white"
                            : "bg-card-border text-muted hover:text-foreground"
                        )}
                      >
                        <Star
                          className="w-3.5 h-3.5"
                          fill={isFavorite(match.teams.home.id) ? "currentColor" : "none"}
                        />
                      </button>
                    </div>
                    <span className="font-semibold text-sm sm:text-base">
                      {match.teams.home.name}
                    </span>
                  </div>

                  {/* Score */}
                  <div className="flex-shrink-0 text-center">
                    {match.goals.home !== null && match.goals.away !== null ? (
                      <div className="text-4xl sm:text-5xl font-bold tabular-nums">
                        <span className={cn(match.teams.home.winner && "text-accent")}>
                          {match.goals.home}
                        </span>
                        <span className="text-muted mx-2">:</span>
                        <span className={cn(match.teams.away.winner && "text-accent")}>
                          {match.goals.away}
                        </span>
                      </div>
                    ) : (
                      <div className="text-2xl font-bold text-muted">
                        {formatMatchTime(match.fixture.date)}
                      </div>
                    )}
                    {match.score.halftime.home !== null && (
                      <p className="text-xs text-muted mt-2">
                        HT: {match.score.halftime.home} - {match.score.halftime.away}
                      </p>
                    )}
                  </div>

                  {/* Away */}
                  <div className="flex-1 flex flex-col items-center text-center gap-3">
                    <div className="relative">
                      <Image
                        src={match.teams.away.logo}
                        alt={match.teams.away.name}
                        width={72}
                        height={72}
                        className="rounded-xl"
                        unoptimized
                      />
                      <button
                        onClick={() => toggleFavorite(match.teams.away.id)}
                        className={cn(
                          "absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center transition-all cursor-pointer",
                          isFavorite(match.teams.away.id)
                            ? "bg-amber-500 text-white"
                            : "bg-card-border text-muted hover:text-foreground"
                        )}
                      >
                        <Star
                          className="w-3.5 h-3.5"
                          fill={isFavorite(match.teams.away.id) ? "currentColor" : "none"}
                        />
                      </button>
                    </div>
                    <span className="font-semibold text-sm sm:text-base">
                      {match.teams.away.name}
                    </span>
                  </div>
                </div>

                {/* Match info */}
                <div className="mt-6 pt-4 border-t border-card-border flex flex-wrap items-center justify-center gap-6 text-xs text-muted">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {formatDate(match.fixture.date)} · {formatMatchTime(match.fixture.date)}
                  </div>
                  {match.fixture.venue.name && (
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" />
                      {match.fixture.venue.name}, {match.fixture.venue.city}
                    </div>
                  )}
                  {match.fixture.referee && (
                    <div className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5" />
                      {match.fixture.referee}
                    </div>
                  )}
                </div>
              </div>

              {/* Events Timeline */}
              {events.length > 0 && (
                <div className="glass-card p-6">
                  <h3 className="text-lg font-semibold mb-4">Match Events</h3>
                  <div className="space-y-3">
                    {events.map((event, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-center gap-3 p-3 rounded-xl bg-background/30 hover:bg-background/50 transition-colors"
                      >
                        <span className="w-10 text-center text-sm font-bold text-accent tabular-nums">
                          {event.time.elapsed}&apos;
                          {event.time.extra ? `+${event.time.extra}` : ""}
                        </span>
                        <div
                          className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold",
                            event.type === "Goal" && "bg-emerald-500/20 text-emerald-400",
                            event.type === "Card" && event.detail.includes("Yellow") && "bg-amber-500/20 text-amber-400",
                            event.type === "Card" && event.detail.includes("Red") && "bg-red-500/20 text-red-400",
                            event.type === "subst" && "bg-blue-500/20 text-blue-400"
                          )}
                        >
                          {event.type === "Goal" && "⚽"}
                          {event.type === "Card" && event.detail.includes("Yellow") && "🟨"}
                          {event.type === "Card" && event.detail.includes("Red") && "🟥"}
                          {event.type === "subst" && "🔄"}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">
                            {event.player.name}
                          </p>
                          {event.assist.name && (
                            <p className="text-xs text-muted">
                              Assist: {event.assist.name}
                            </p>
                          )}
                        </div>
                        <Image
                          src={event.team.logo}
                          alt={event.team.name}
                          width={20}
                          height={20}
                          className="rounded"
                          unoptimized
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Statistics */}
              {statistics.length >= 2 && (
                <div className="glass-card p-6">
                  <h3 className="text-lg font-semibold mb-4">Match Statistics</h3>
                  <div className="space-y-4">
                    {statistics[0].statistics.map((stat, i) => {
                      const homeVal = stat.value;
                      const awayVal = statistics[1].statistics[i]?.value;

                      const homeNum = parseFloat(String(homeVal).replace("%", "")) || 0;
                      const awayNum = parseFloat(String(awayVal).replace("%", "")) || 0;
                      const total = homeNum + awayNum || 1;
                      const homePercent = (homeNum / total) * 100;
                      const awayPercent = (awayNum / total) * 100;

                      return (
                        <div key={stat.type} className="space-y-1.5">
                          <div className="flex justify-between text-xs">
                            <span className="font-medium">{homeVal ?? 0}</span>
                            <span className="text-muted">{stat.type}</span>
                            <span className="font-medium">{awayVal ?? 0}</span>
                          </div>
                          <div className="flex h-2 gap-1 rounded-full overflow-hidden bg-background/30">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${homePercent}%` }}
                              transition={{ duration: 0.8, delay: i * 0.05 }}
                              className="bg-accent rounded-full"
                            />
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${awayPercent}%` }}
                              transition={{ duration: 0.8, delay: i * 0.05 }}
                              className="bg-blue-500 rounded-full"
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
