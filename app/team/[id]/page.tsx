"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Calendar, Trophy, Users } from "lucide-react";
import { useTeam } from "@/hooks/use-team";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { MatchCard } from "@/components/sections/match-card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export default function TeamPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const teamId = parseInt(id, 10);
  const { data, isLoading } = useTeam(teamId);

  const team = data?.team;
  const squad = data?.squad || [];
  const topScorers = data?.topScorers || [];
  const upcoming = data?.upcomingMatches || [];
  const past = data?.pastMatches || [];

  const positions = ["Goalkeeper", "Defender", "Midfielder", "Forward"];

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-20 pb-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-accent transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>

          {isLoading || !team ? (
            <div className="space-y-6">
              <Skeleton className="w-full h-48 rounded-2xl" />
              <Skeleton className="w-full h-64 rounded-2xl" />
            </div>
          ) : (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              {/* Team Header */}
              <div className="glass-card p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6">
                <Image src={team.logo} alt={team.name} width={96} height={96} className="rounded-2xl" unoptimized />
                <div className="text-center sm:text-left">
                  <h1 className="text-3xl font-bold mb-2">{team.name}</h1>
                  <div className="flex flex-wrap justify-center sm:justify-start gap-4 text-sm text-muted">
                    <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> {team.country}</span>
                    <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> Founded {team.founded}</span>
                    <span className="flex items-center gap-1.5"><Trophy className="w-3.5 h-3.5" /> {team.venue}</span>
                    <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5" /> Coach: {team.coach}</span>
                  </div>
                  {team.trophies && team.trophies.length > 0 && (
                    <div className="flex flex-wrap justify-center sm:justify-start gap-3 mt-4">
                      {team.trophies.map((tr, i) => (
                        <div key={i} title={tr.name} className="flex items-center gap-1.5 bg-accent/10 text-accent px-3 py-1 rounded-full text-xs font-semibold cursor-help hover:bg-accent/20 transition-colors">
                          <Trophy className="w-3.5 h-3.5" /> {tr.count}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Top Scorers */}
              {topScorers.length > 0 && (
                <div className="glass-card p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">⭐ Top Scorers</h3>
                  <div className="space-y-3">
                    {topScorers.map((scorer, i) => (
                      <div key={scorer.id} className="flex items-center gap-4 bg-background/30 p-3 rounded-xl hover:bg-background/50 transition-colors">
                        <div className={cn("w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0", i === 0 ? "bg-amber-500/20 text-amber-500" : i === 1 ? "bg-gray-400/20 text-gray-300" : i === 2 ? "bg-orange-500/20 text-orange-400" : "bg-card-border text-muted")}>
                          {i + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold truncate">{scorer.name}</p>
                          <p className="text-xs text-muted">#{scorer.number} · {scorer.position}</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="text-lg font-bold text-accent">{scorer.goals}</p>
                          <p className="text-xs text-muted">{scorer.assists || 0} ast</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Squad */}
              {squad.length > 0 && (
                <div className="glass-card p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">👥 Squad</h3>
                  {positions.map((pos) => {
                    const players = squad.filter((p) => p.position === pos);
                    if (players.length === 0) return null;
                    return (
                      <div key={pos} className="mb-4 last:mb-0">
                        <p className="text-xs text-muted uppercase tracking-widest mb-2">{pos}s</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {players.map((p) => (
                            <div key={p.id} className="flex items-center gap-3 p-3 rounded-xl bg-background/30 hover:bg-background/50 transition-colors">
                              <div className="w-8 h-8 rounded-full bg-card-border flex items-center justify-center text-xs font-bold text-muted">
                                {p.number}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate">{p.name}</p>
                                <p className="text-xs text-muted">{p.goals || 0} goals · {p.assists || 0} assists</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Upcoming Matches */}
              {upcoming.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">📅 Upcoming Matches</h3>
                  <div className="space-y-3">
                    {upcoming.map((m, i) => (<MatchCard key={m.fixture.id} match={m} index={i} />))}
                  </div>
                </div>
              )}

              {/* Past Matches */}
              {past.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">📊 Recent Results</h3>
                  <div className="space-y-3">
                    {past.map((m, i) => (<MatchCard key={m.fixture.id} match={m} index={i} />))}
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
