"use client";

import { useQuery } from "@tanstack/react-query";
import { footballApi, hasFootballApiKey } from "@/lib/api";
import { teamsDB, playersDB, todayMatches, yesterdayMatches, tomorrowMatches } from "@/lib/mock-data";
import { TeamFull, Player, Match } from "@/lib/types";

interface TeamData {
  team: TeamFull | null;
  squad: Player[];
  topScorers: Player[];
  upcomingMatches: Match[];
  pastMatches: Match[];
}

async function fetchTeamData(id: number): Promise<TeamData> {
  const useApi = hasFootballApiKey();
  if (!useApi) {
    const team = teamsDB[id] || null;
    const squad = playersDB[id] || [];
    const topScorers = squad.length > 0
      ? [...squad].sort((a, b) => (b.goals || 0) - (a.goals || 0)).slice(0, 3)
      : [];

    const allMatches = [...yesterdayMatches, ...todayMatches, ...tomorrowMatches];
    const teamMatches = allMatches.filter(
      (m) => m.teams.home.id === id || m.teams.away.id === id
    );

    const nowTimestamp = Date.now();
    const upcoming = teamMatches.filter((m) => m.fixture.timestamp * 1000 > nowTimestamp);
    const past = teamMatches.filter((m) => m.fixture.timestamp * 1000 <= nowTimestamp);

    return { team, squad, topScorers, upcomingMatches: upcoming, pastMatches: past };
  }

  const currentSeason = 2024; // Free plan limit is 2024
  try {
    const [teamRes, playersRes, fixturesRes] = await Promise.all([
      footballApi.get("/teams", { params: { id } }),
      footballApi.get("/players", { params: { team: id, season: currentSeason, page: 1 } }),
      footballApi.get("/fixtures", { params: { team: id, season: currentSeason } })
    ]);

    if (teamRes.data.errors && Object.keys(teamRes.data.errors).length > 0) {
      console.error("API Error (Team):", teamRes.data.errors);
      throw new Error("API Subscription Error");
    }

    const teamRaw = teamRes.data.response[0] || null;
    let team: TeamFull | null = null;
    if (teamRaw) {
      team = {
        id: teamRaw.team.id,
        name: teamRaw.team.name,
        logo: teamRaw.team.logo,
        country: teamRaw.team.country,
        founded: teamRaw.team.founded,
        venue: teamRaw.venue.name,
        coach: "First Team", // requires extra endpoint /coachs
        trophies: teamsDB[id]?.trophies || [] // fallback to mock trophies Since there is no /teams/trophies endpoint
      };
    }

    const playersRaw = playersRes.data.response || [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const squad = playersRaw.map((p: any) => ({
      id: p.player.id,
      name: p.player.name,
      age: p.player.age,
      number: p.statistics[0]?.games?.number || 0,
      position: p.statistics[0]?.games?.position || "Unknown",
      photo: p.player.photo,
      goals: p.statistics[0]?.goals?.total || 0,
      assists: p.statistics[0]?.goals?.assists || 0
    }));

    const topScorers = [...squad].sort((a, b) => (b.goals || 0) - (a.goals || 0)).slice(0, 3);

    const teamMatches = fixturesRes.data.response || [];
    const nowTime = Date.now();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const upcomingMatches = teamMatches.filter((m: any) => m.fixture.timestamp * 1000 > nowTime);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pastMatches = teamMatches.filter((m: any) => m.fixture.timestamp * 1000 <= nowTime).reverse().slice(0, 10);

    return { team, squad, topScorers, upcomingMatches, pastMatches };
  } catch (error) {
    console.error("Failed to fetch real team data", error);
    // fallback
    return fetchTeamDataFallBack(id);
  }
}

function fetchTeamDataFallBack(id: number): TeamData {
  const team = teamsDB[id] || null;
  const squad = playersDB[id] || [];
  const topScorers = squad.length > 0 ? [...squad].sort((a, b) => (b.goals || 0) - (a.goals || 0)).slice(0, 3) : [];
  const allMatches = [...yesterdayMatches, ...todayMatches, ...tomorrowMatches];
  const teamMatches = allMatches.filter((m) => m.teams.home.id === id || m.teams.away.id === id);
  const now = Date.now();
  const upcoming = teamMatches.filter((m) => m.fixture.timestamp * 1000 > now);
  const past = teamMatches.filter((m) => m.fixture.timestamp * 1000 <= now);
  return { team, squad, topScorers, upcomingMatches: upcoming, pastMatches: past };
}

export function useTeam(id: number) {
  return useQuery({
    queryKey: ["team", id],
    queryFn: () => fetchTeamData(id),
    staleTime: 5 * 60 * 1000,
    enabled: !!id,
  });
}
