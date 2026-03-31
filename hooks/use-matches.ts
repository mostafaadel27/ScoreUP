"use client";

import { useQuery } from "@tanstack/react-query";
import { footballApi, hasFootballApiKey } from "@/lib/api";
import { Match, FootballAPIResponse } from "@/lib/types";
import { getMatchesByDateOffset } from "@/lib/mock-data";
import { getMatchCategory } from "@/lib/utils";

async function fetchMatches(dateOffset: number): Promise<Match[]> {
  if (!hasFootballApiKey()) {
    return getMatchesByDateOffset(dateOffset);
  }

  try {
    const d = new Date();
    d.setDate(d.getDate() + dateOffset);
    const dateStr = d.toISOString().split("T")[0];
    const { data } = await footballApi.get<FootballAPIResponse<Match>>("/fixtures", {
      params: { date: dateStr },
    });

    if (data.errors && Object.keys(data.errors).length > 0) {
      console.error("API Error: ", data.errors);
      return getMatchesByDateOffset(dateOffset);
    }

    // Sort by popularity (top leagues first)
    return data.response.sort((a, b) => {
      // European Clubs: UCL, UEL, UECL, Top 5 Leagues
      // Internationals: WC, Euro, Nations League, AFCON, Copa America, Friendlies
      const topLeagues = [2, 3, 848, 39, 140, 78, 135, 61, 1, 4, 5, 6, 9, 10];
      const aIdx = topLeagues.indexOf(a.league.id);
      const bIdx = topLeagues.indexOf(b.league.id);
      const aPri = aIdx >= 0 ? aIdx : 99;
      const bPri = bIdx >= 0 ? bIdx : 99;
      return aPri - bPri;
    });
  } catch (error) {
    console.error("Fetch Matches Failed:", error);
    return getMatchesByDateOffset(dateOffset);
  }
}

export function useMatches(dateOffset: number = 0) {
  // Only auto-refresh if viewing today AND there are live matches
  const isToday = dateOffset === 0;

  return useQuery({
    queryKey: ["matches", dateOffset],
    queryFn: () => fetchMatches(dateOffset),
    refetchInterval: (query) => {
      if (!isToday) return false;
      const data = query.state.data;
      const hasLive = data?.some((m) => getMatchCategory(m.fixture.status.short) === "live");
      return hasLive ? 60000 : false; // 60s only if live matches exist
    },
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
}
