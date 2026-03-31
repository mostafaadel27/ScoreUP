"use client";

import { useQuery } from "@tanstack/react-query";
import { footballApi, hasFootballApiKey } from "@/lib/api";
import { Match, MatchEvent, TeamStatistics, FootballAPIResponse } from "@/lib/types";
import { mockMatches, mockEvents, mockStatistics } from "@/lib/mock-data";

interface MatchDetails {
  match: Match | null;
  events: MatchEvent[];
  statistics: TeamStatistics[];
}

async function fetchMatchDetails(id: number): Promise<MatchDetails> {
  if (!hasFootballApiKey()) {
    const match = mockMatches.find((m) => m.fixture.id === id) || null;
    return { match, events: mockEvents, statistics: mockStatistics };
  }

  const [fixtureRes, eventsRes, statsRes] = await Promise.all([
    footballApi.get<FootballAPIResponse<Match>>("/fixtures", { params: { id } }),
    footballApi.get<FootballAPIResponse<{ response: MatchEvent[] }>>("/fixtures/events", { params: { fixture: id } }),
    footballApi.get<FootballAPIResponse<TeamStatistics>>("/fixtures/statistics", { params: { fixture: id } }),
  ]);

  return {
    match: fixtureRes.data.response[0] || null,
    events: (eventsRes.data.response as unknown as MatchEvent[]) || [],
    statistics: statsRes.data.response || [],
  };
}

export function useMatchDetails(id: number) {
  return useQuery({
    queryKey: ["match", id],
    queryFn: () => fetchMatchDetails(id),
    refetchInterval: 30000,
    staleTime: 15000,
    enabled: !!id,
  });
}
