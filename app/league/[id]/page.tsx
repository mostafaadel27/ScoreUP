"use client";

import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ChevronDown, ChevronUp } from "lucide-react";
import { useLeague } from "@/hooks/use-league";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { MatchCard } from "@/components/sections/match-card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export default function LeaguePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const leagueId = parseInt(id, 10);
  const { data, isLoading } = useLeague(leagueId);
  const [isStandingsExpanded, setIsStandingsExpanded] = useState(false);
  const [statsMode, setStatsMode] = useState<'scorers' | 'assists'>('scorers');

  const league = data?.league;
  const standings = data?.standings || [];
  const displayedStandings = isStandingsExpanded ? standings : standings.slice(0, 4);
  const topStatsData = data?.topScorers || [];
  const orderedStats = [...topStatsData].sort((a, b) => 
    statsMode === 'scorers' ? b.goals - a.goals : b.assists - a.assists
  ).slice(0, 5);
  const weekMatches = data?.weekMatches || [];

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-20 pb-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-accent transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>

          {isLoading || !league ? (
            <div className="space-y-6">
              <Skeleton className="w-full h-32 rounded-2xl" />
              <Skeleton className="w-full h-96 rounded-2xl" />
            </div>
          ) : (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              {/* League Header */}
              <div className="glass-card p-6 sm:p-8 flex items-center gap-6">
                <Image src={league.logo} alt={league.name} width={72} height={72} className="rounded-xl" unoptimized />
                <div>
                  <h1 className="text-3xl font-bold">{league.name}</h1>
                  <p className="text-sm text-muted mt-1">{league.country} · {league.season}/{league.season + 1} Season</p>
                </div>
              </div>

              {/* Standings Table */}
              {standings.length > 0 && (
                <div className="glass-card p-6 overflow-x-auto">
                  <h3 className="text-lg font-semibold mb-4">🏆 Standings</h3>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-xs text-muted uppercase border-b border-card-border">
                        <th className="text-left py-3 px-2 w-8">#</th>
                        <th className="text-left py-3 px-2">Team</th>
                        <th className="text-center py-3 px-2">P</th>
                        <th className="text-center py-3 px-2">W</th>
                        <th className="text-center py-3 px-2">D</th>
                        <th className="text-center py-3 px-2">L</th>
                        <th className="text-center py-3 px-2">GD</th>
                        <th className="text-center py-3 px-2 font-bold">Pts</th>
                        <th className="text-center py-3 px-2 hidden sm:table-cell">Form</th>
                      </tr>
                    </thead>
                    <tbody>
                      {displayedStandings.map((s, i) => (
                        <motion.tr
                          key={s.team.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.04 }}
                          className={cn(
                            "border-b border-card-border/30 hover:bg-card-hover/50 transition-colors",
                            i < 4 && "border-l-2 border-l-emerald-500",
                            i >= 4 && i < 6 && "border-l-2 border-l-blue-500"
                          )}
                        >
                          <td className="py-3 px-2 font-bold text-muted">{s.rank}</td>
                          <td className="py-3 px-2">
                            <Link href={`/team/${s.team.id}`} className="flex items-center gap-2.5 hover:text-accent transition-colors">
                              <Image src={s.team.logo} alt={s.team.name} width={24} height={24} className="rounded" unoptimized />
                              <span className="font-medium truncate">{s.team.name}</span>
                            </Link>
                          </td>
                          <td className="text-center py-3 px-2 text-muted">{s.played}</td>
                          <td className="text-center py-3 px-2">{s.win}</td>
                          <td className="text-center py-3 px-2 text-muted">{s.draw}</td>
                          <td className="text-center py-3 px-2 text-muted">{s.lose}</td>
                          <td className={cn("text-center py-3 px-2 font-medium", s.goalDiff > 0 ? "text-emerald-400" : s.goalDiff < 0 ? "text-red-400" : "text-muted")}>
                            {s.goalDiff > 0 ? "+" : ""}{s.goalDiff}
                          </td>
                          <td className="text-center py-3 px-2 font-bold text-accent">{s.points}</td>
                          <td className="text-center py-3 px-2 hidden sm:table-cell">
                            <div className="flex justify-center gap-0.5">
                              {s.form.split("").map((f, fi) => (
                                <span key={fi} className={cn("w-5 h-5 rounded text-[10px] font-bold flex items-center justify-center", f === "W" && "bg-emerald-500/20 text-emerald-400", f === "D" && "bg-amber-500/20 text-amber-400", f === "L" && "bg-red-500/20 text-red-400")}>
                                  {f}
                                </span>
                              ))}
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                  {standings.length > 4 && (
                    <div className="flex justify-center mt-2 pt-4 border-t border-card-border/30">
                      <button 
                        onClick={() => setIsStandingsExpanded(!isStandingsExpanded)}
                        className="flex items-center justify-center w-8 h-8 rounded-full bg-card hover:bg-card-hover border border-card-border hover:border-accent text-muted hover:text-accent transition-all cursor-pointer"
                      >
                        {isStandingsExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Top Scorers & Assists */}
              {orderedStats.length > 0 && (
                <div className="glass-card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">
                      {statsMode === 'scorers' ? '⚽ Top Scorers' : '🎯 Top Assists'}
                    </h3>
                    <div className="flex bg-background/50 rounded-lg p-1 border border-card-border">
                      <button 
                        onClick={() => setStatsMode('scorers')} 
                        className={cn("px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer", statsMode === 'scorers' ? "bg-accent/20 text-accent" : "text-muted hover:text-foreground")}
                      >
                        Goals
                      </button>
                      <button 
                        onClick={() => setStatsMode('assists')} 
                        className={cn("px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer", statsMode === 'assists' ? "bg-accent/20 text-accent" : "text-muted hover:text-foreground")}
                      >
                        Assists
                      </button>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {orderedStats.map((ts, i) => (
                      <motion.div
                        key={ts.player.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.06 }}
                        className="flex items-center gap-4 p-3 rounded-xl bg-background/30 hover:bg-background/50 transition-colors"
                      >
                        <span className={cn("w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0", i === 0 && "bg-amber-500/20 text-amber-400", i === 1 && "bg-gray-400/20 text-gray-300", i === 2 && "bg-orange-500/20 text-orange-400", i > 2 && "bg-card-border text-muted")}>
                          {i + 1}
                        </span>
                        <Link href={`/team/${ts.team.id}`} className="flex items-center gap-2 flex-shrink-0">
                          <Image src={ts.team.logo} alt={ts.team.name} width={24} height={24} className="rounded" unoptimized />
                        </Link>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{ts.player.name}</p>
                          <p className="text-xs text-muted">{ts.player.nationality} · {ts.matches} matches</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          {statsMode === 'scorers' ? (
                            <>
                              <p className="text-lg font-bold text-accent">{ts.goals}</p>
                              <p className="text-xs text-muted">{ts.assists} ast</p>
                            </>
                          ) : (
                            <>
                              <p className="text-lg font-bold text-blue-400">{ts.assists}</p>
                              <p className="text-xs text-muted">{ts.goals} gls</p>
                            </>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* This Week's Matches */}
              {weekMatches.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">📅 This Week's Matches</h3>
                  <div className="space-y-3">
                    {weekMatches.map((m, i) => (<MatchCard key={m.fixture.id} match={m} index={i} />))}
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
