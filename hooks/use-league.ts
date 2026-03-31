"use client";

import { useQuery } from "@tanstack/react-query";
import { footballApi, hasFootballApiKey } from "@/lib/api";
import { topLeagues, mockStandings, mockTopScorers, yesterdayMatches, todayMatches, tomorrowMatches } from "@/lib/mock-data";
import { LeagueFull, StandingEntry, TopScorer, Match } from "@/lib/types";

interface LeagueData {
  league: LeagueFull | null;
  standings: StandingEntry[];
  topScorers: TopScorer[];
  weekMatches: Match[];
}

async function fetchLeagueData(id: number): Promise<LeagueData> {
  const league = topLeagues.find((l) => l.id === id) || { id, name: "League", country: "World", logo: "", flag: null, season: 2024, type: "League" };
  const useApi = hasFootballApiKey();
  if (!useApi) {
    const standings = mockStandings[id] || [];
    const topScorers = mockTopScorers[id] || [];
    const allMatches = [...yesterdayMatches, ...todayMatches, ...tomorrowMatches];
    const weekMatches = allMatches.filter((m) => m.league.id === id);
    return { league, standings, topScorers, weekMatches };
  }

  const currentSeason = 2024; // Free plan limit is 2024
  const d = new Date();
  const fromDate = new Date(d);
  fromDate.setDate(d.getDate() - 3);
  const toDate = new Date(d);
  toDate.setDate(d.getDate() + 4);

  const fromDateStr = fromDate.toISOString().split("T")[0];
  const toDateStr = toDate.toISOString().split("T")[0];

  try {
    const [standingsRes, scorersRes, matchesRes] = await Promise.all([
      footballApi.get("/standings", { params: { league: id, season: currentSeason } }),
      footballApi.get("/players/topscorers", { params: { league: id, season: currentSeason } }),
      footballApi.get("/fixtures", { params: { league: id, season: currentSeason, from: fromDateStr, to: toDateStr } })
    ]);

    if (standingsRes.data.errors && Object.keys(standingsRes.data.errors).length > 0) {
      console.error("API Error (Standings):", standingsRes.data.errors);
      throw new Error("API Subscription Error");
    }

    const standingsRaw = standingsRes.data.response[0]?.league?.standings[0] || [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const standings = standingsRaw.map((s: any) => ({
      rank: s.rank,
      team: { id: s.team.id, name: s.team.name, logo: s.team.logo },
      points: s.points,
      played: s.all.played,
      win: s.all.win,
      draw: s.all.draw,
      lose: s.all.lose,
      goalsFor: s.all.goals.for,
      goalsAgainst: s.all.goals.against,
      goalDiff: s.goalsDiff,
      form: s.form || ""
    }));

    const scorersRaw = scorersRes.data.response || [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const topScorers = scorersRaw.map((s: any) => ({
      player: {
        id: s.player.id,
        name: s.player.name,
        photo: s.player.photo,
        nationality: s.player.nationality
      },
      team: {
        id: s.statistics[0].team.id,
        name: s.statistics[0].team.name,
        logo: s.statistics[0].team.logo
      },
      goals: s.statistics[0].goals.total || 0,
      assists: s.statistics[0].goals.assists || 0,
      matches: s.statistics[0].games.appearences || 0
    }));

    const weekMatches = matchesRes.data.response || [];

    return { league, standings, topScorers, weekMatches };
  } catch (error) {
    console.error("Failed to fetch real league data", error);
    // fallback
    return { league, standings: mockStandings[id] || [], topScorers: mockTopScorers[id] || [], weekMatches: [] };
  }
}

export function useLeague(id: number) {
  return useQuery({
    queryKey: ["league", id],
    queryFn: () => fetchLeagueData(id),
    staleTime: 5 * 60 * 1000,
    enabled: !!id,
  });
}
