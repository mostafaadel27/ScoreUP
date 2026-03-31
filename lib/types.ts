// ---- Match / Fixture Types ---- //

export type MatchStatusShort =
  | "TBD" | "NS" | "1H" | "HT" | "2H" | "ET" | "BT" | "P"
  | "SUSP" | "INT" | "FT" | "AET" | "PEN" | "PST" | "CANC"
  | "ABD" | "AWD" | "WO" | "LIVE";

export type MatchCategory = "live" | "today" | "finished";

export interface Team {
  id: number;
  name: string;
  logo: string;
}

export interface TeamFull extends Team {
  country: string;
  founded: number;
  venue: string;
  coach: string;
  trophies?: { name: string; count: number }[];
}

export interface Player {
  id: number;
  name: string;
  age: number;
  number: number;
  position: string;
  photo: string;
  goals?: number;
  assists?: number;
  yellowCards?: number;
  redCards?: number;
}

export interface League {
  id: number;
  name: string;
  country: string;
  logo: string;
  flag: string | null;
  round: string;
}

export interface LeagueFull extends Omit<League, "round"> {
  season: number;
  type: string;
}

export interface StandingEntry {
  rank: number;
  team: Team;
  points: number;
  played: number;
  win: number;
  draw: number;
  lose: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDiff: number;
  form: string;
}

export interface TopScorer {
  player: {
    id: number;
    name: string;
    photo: string;
    nationality: string;
  };
  team: Team;
  goals: number;
  assists: number;
  matches: number;
}

export interface MatchGoals {
  home: number | null;
  away: number | null;
}

export interface MatchScore {
  halftime: MatchGoals;
  fulltime: MatchGoals;
  extratime: MatchGoals;
  penalty: MatchGoals;
}

export interface MatchStatus {
  long: string;
  short: MatchStatusShort;
  elapsed: number | null;
}

export interface FixtureInfo {
  id: number;
  referee: string | null;
  timezone: string;
  date: string;
  timestamp: number;
  venue: {
    id: number | null;
    name: string;
    city: string;
  };
  status: MatchStatus;
}

export interface Match {
  fixture: FixtureInfo;
  league: League;
  teams: {
    home: Team & { winner: boolean | null };
    away: Team & { winner: boolean | null };
  };
  goals: MatchGoals;
  score: MatchScore;
  popularity?: number; // higher = more important
}

// ---- Match Events ---- //

export interface MatchEvent {
  time: { elapsed: number; extra: number | null };
  team: Team;
  player: { id: number; name: string };
  assist: { id: number | null; name: string | null };
  type: string;
  detail: string;
  comments: string | null;
}

// ---- Match Statistics ---- //

export interface StatisticItem {
  type: string;
  value: number | string | null;
}

export interface TeamStatistics {
  team: Team;
  statistics: StatisticItem[];
}

// ---- News ---- //

export interface NewsArticle {
  title: string;
  description: string;
  content: string;
  url: string;
  image: string;
  publishedAt: string;
  source: {
    name: string;
    url: string;
  };
  slug: string;
}

// ---- API Responses ---- //

export interface FootballAPIResponse<T> {
  get: string;
  parameters: Record<string, string>;
  errors: Record<string, string> | string[];
  results: number;
  paging: { current: number; total: number };
  response: T[];
}

export interface GNewsResponse {
  totalArticles: number;
  articles: NewsArticle[];
}
