"use client";

import { motion } from "framer-motion";
import { Star, Trash2 } from "lucide-react";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { useFavoritesStore } from "@/store/use-favorites-store";
import { mockMatches } from "@/lib/mock-data";
import Image from "next/image";

// Build a map of team id → team info from available match data
function getTeamInfo(teamId: number) {
  for (const match of mockMatches) {
    if (match.teams.home.id === teamId) return match.teams.home;
    if (match.teams.away.id === teamId) return match.teams.away;
  }
  return null;
}

export default function FavoritesPage() {
  const { favoriteTeams, removeFavorite } = useFavoritesStore();

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            <span className="gradient-text">⭐ Favorites</span>
          </h1>
          <p className="text-sm text-muted mb-8">
            Your saved teams. Click the star on any team logo to add them here.
          </p>

          {favoriteTeams.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="w-20 h-20 rounded-full bg-amber-500/10 flex items-center justify-center mx-auto mb-4">
                <Star className="w-10 h-10 text-amber-400" />
              </div>
              <p className="text-muted text-lg font-medium mb-2">
                No favorites yet
              </p>
              <p className="text-sm text-muted max-w-xs mx-auto">
                Tap the star icon on any team to save them as a favorite for quick access.
              </p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {favoriteTeams.map((teamId, i) => {
                const team = getTeamInfo(teamId);
                if (!team) return null;

                return (
                  <motion.div
                    key={teamId}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="glass-card p-5 flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-4">
                      <Image
                        src={team.logo}
                        alt={team.name}
                        width={48}
                        height={48}
                        className="rounded-xl"
                        unoptimized
                      />
                      <div>
                        <p className="font-semibold">{team.name}</p>
                        <p className="text-xs text-muted">Team ID: {team.id}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFavorite(teamId)}
                      className="w-9 h-9 rounded-full flex items-center justify-center text-muted hover:text-red-400 hover:bg-red-500/10 transition-all cursor-pointer"
                      aria-label={`Remove ${team.name} from favorites`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
