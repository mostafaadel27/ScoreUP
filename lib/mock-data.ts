import { Match, NewsArticle, MatchEvent, TeamStatistics, TeamFull, Player, LeagueFull, StandingEntry, TopScorer } from "./types";

const now = new Date();
function makeDate(daysOffset: number, hours: number, minutes: number = 0): string {
  const d = new Date(now);
  d.setDate(d.getDate() + daysOffset);
  d.setHours(hours, minutes, 0, 0);
  return d.toISOString();
}
function ts(iso: string) { return Math.floor(new Date(iso).getTime() / 1000); }
function slug(t: string) { return t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""); }

// ===== TOP 5 LEAGUES =====
export const topLeagues: LeagueFull[] = [
  { id: 39, name: "Premier League", country: "England", logo: "https://media.api-sports.io/football/leagues/39.png", flag: "https://media.api-sports.io/flags/gb.svg", season: 2025, type: "League" },
  { id: 140, name: "La Liga", country: "Spain", logo: "https://media.api-sports.io/football/leagues/140.png", flag: "https://media.api-sports.io/flags/es.svg", season: 2025, type: "League" },
  { id: 78, name: "Bundesliga", country: "Germany", logo: "https://media.api-sports.io/football/leagues/78.png", flag: "https://media.api-sports.io/flags/de.svg", season: 2025, type: "League" },
  { id: 135, name: "Serie A", country: "Italy", logo: "https://media.api-sports.io/football/leagues/135.png", flag: "https://media.api-sports.io/flags/it.svg", season: 2025, type: "League" },
  { id: 61, name: "Ligue 1", country: "France", logo: "https://media.api-sports.io/football/leagues/61.png", flag: "https://media.api-sports.io/flags/fr.svg", season: 2025, type: "League" },
];

// ===== TEAM DATABASE =====
export const teamsDB: Record<number, TeamFull> = {
  40: { id: 40, name: "Liverpool", logo: "https://media.api-sports.io/football/teams/40.png", country: "England", founded: 1892, venue: "Anfield", coach: "Arne Slot", trophies: [{name: "Premier League", count: 19}, {name: "Champions League", count: 6}, {name: "FA Cup", count: 8}] },
  33: { id: 33, name: "Manchester United", logo: "https://media.api-sports.io/football/teams/33.png", country: "England", founded: 1878, venue: "Old Trafford", coach: "Ruben Amorim", trophies: [{name: "Premier League", count: 20}, {name: "Champions League", count: 3}, {name: "FA Cup", count: 13}] },
  50: { id: 50, name: "Manchester City", logo: "https://media.api-sports.io/football/teams/50.png", country: "England", founded: 1880, venue: "Etihad Stadium", coach: "Pep Guardiola", trophies: [{name: "Premier League", count: 10}, {name: "Champions League", count: 1}, {name: "FA Cup", count: 7}] },
  42: { id: 42, name: "Arsenal", logo: "https://media.api-sports.io/football/teams/42.png", country: "England", founded: 1886, venue: "Emirates Stadium", coach: "Mikel Arteta" },
  49: { id: 49, name: "Chelsea", logo: "https://media.api-sports.io/football/teams/49.png", country: "England", founded: 1905, venue: "Stamford Bridge", coach: "Enzo Maresca" },
  47: { id: 47, name: "Tottenham", logo: "https://media.api-sports.io/football/teams/47.png", country: "England", founded: 1882, venue: "Tottenham Hotspur Stadium", coach: "Ange Postecoglou" },
  541: { id: 541, name: "Real Madrid", logo: "https://media.api-sports.io/football/teams/541.png", country: "Spain", founded: 1902, venue: "Santiago Bernabéu", coach: "Carlo Ancelotti", trophies: [{name: "La Liga", count: 36}, {name: "Champions League", count: 15}, {name: "Copa del Rey", count: 20}] },
  529: { id: 529, name: "Barcelona", logo: "https://media.api-sports.io/football/teams/529.png", country: "Spain", founded: 1899, venue: "Spotify Camp Nou", coach: "Hansi Flick", trophies: [{name: "La Liga", count: 27}, {name: "Champions League", count: 5}, {name: "Copa del Rey", count: 31}] },
  530: { id: 530, name: "Atletico Madrid", logo: "https://media.api-sports.io/football/teams/530.png", country: "Spain", founded: 1903, venue: "Metropolitano", coach: "Diego Simeone", trophies: [{name: "La Liga", count: 11}, {name: "Europa League", count: 3}, {name: "Copa del Rey", count: 10}] },
  157: { id: 157, name: "Bayern Munich", logo: "https://media.api-sports.io/football/teams/157.png", country: "Germany", founded: 1900, venue: "Allianz Arena", coach: "Vincent Kompany", trophies: [{name: "Bundesliga", count: 33}, {name: "Champions League", count: 6}, {name: "DFB Pokal", count: 20}] },
  165: { id: 165, name: "Borussia Dortmund", logo: "https://media.api-sports.io/football/teams/165.png", country: "Germany", founded: 1909, venue: "Signal Iduna Park", coach: "Nuri Şahin" },
  489: { id: 489, name: "AC Milan", logo: "https://media.api-sports.io/football/teams/489.png", country: "Italy", founded: 1899, venue: "San Siro", coach: "Paulo Fonseca", trophies: [{name: "Serie A", count: 19}, {name: "Champions League", count: 7}] },
  505: { id: 505, name: "Inter", logo: "https://media.api-sports.io/football/teams/505.png", country: "Italy", founded: 1908, venue: "San Siro", coach: "Simone Inzaghi", trophies: [{name: "Serie A", count: 20}, {name: "Champions League", count: 3}] },
  496: { id: 496, name: "Juventus", logo: "https://media.api-sports.io/football/teams/496.png", country: "Italy", founded: 1897, venue: "Allianz Stadium", coach: "Thiago Motta", trophies: [{name: "Serie A", count: 36}, {name: "Champions League", count: 2}] },
  85: { id: 85, name: "Paris Saint Germain", logo: "https://media.api-sports.io/football/teams/85.png", country: "France", founded: 1970, venue: "Parc des Princes", coach: "Luis Enrique" },
  80: { id: 80, name: "Lyon", logo: "https://media.api-sports.io/football/teams/80.png", country: "France", founded: 1950, venue: "Groupama Stadium", coach: "Pierre Sage" },
  211: { id: 211, name: "Benfica", logo: "https://media.api-sports.io/football/teams/211.png", country: "Portugal", founded: 1904, venue: "Estádio da Luz", coach: "Bruno Lage" },
  46: { id: 46, name: "Leicester", logo: "https://media.api-sports.io/football/teams/46.png", country: "England", founded: 1884, venue: "King Power Stadium", coach: "Steve Cooper" },
  48: { id: 48, name: "West Ham", logo: "https://media.api-sports.io/football/teams/48.png", country: "England", founded: 1895, venue: "London Stadium", coach: "Julen Lopetegui" },
  34: { id: 34, name: "Newcastle", logo: "https://media.api-sports.io/football/teams/34.png", country: "England", founded: 1892, venue: "St. James' Park", coach: "Eddie Howe" },
  35: { id: 35, name: "Bournemouth", logo: "https://media.api-sports.io/football/teams/35.png", country: "England", founded: 1899, venue: "Vitality Stadium", coach: "Andoni Iraola" },
  66: { id: 66, name: "Aston Villa", logo: "https://media.api-sports.io/football/teams/66.png", country: "England", founded: 1874, venue: "Villa Park", coach: "Unai Emery" },
  51: { id: 51, name: "Brighton", logo: "https://media.api-sports.io/football/teams/51.png", country: "England", founded: 1901, venue: "Amex Stadium", coach: "Roberto De Zerbi" },
  39: { id: 39, name: "Wolves", logo: "https://media.api-sports.io/football/teams/39.png", country: "England", founded: 1877, venue: "Molineux", coach: "Gary O'Neil" },
  36: { id: 36, name: "Fulham", logo: "https://media.api-sports.io/football/teams/36.png", country: "England", founded: 1879, venue: "Craven Cottage", coach: "Marco Silva" },
  52: { id: 52, name: "Crystal Palace", logo: "https://media.api-sports.io/football/teams/52.png", country: "England", founded: 1905, venue: "Selhurst Park", coach: "Oliver Glasner" },
  45: { id: 45, name: "Everton", logo: "https://media.api-sports.io/football/teams/45.png", country: "England", founded: 1878, venue: "Goodison Park", coach: "Sean Dyche" },
  55: { id: 55, name: "Brentford", logo: "https://media.api-sports.io/football/teams/55.png", country: "England", founded: 1889, venue: "Gtech Community Stadium", coach: "Thomas Frank" },
  65: { id: 65, name: "Nott Forest", logo: "https://media.api-sports.io/football/teams/65.png", country: "England", founded: 1865, venue: "City Ground", coach: "Nuno Espirito Santo" },
  1351: { id: 1351, name: "Luton", logo: "https://media.api-sports.io/football/teams/1351.png", country: "England", founded: 1885, venue: "Kenilworth Road", coach: "Rob Edwards" },
  44: { id: 44, name: "Burnley", logo: "https://media.api-sports.io/football/teams/44.png", country: "England", founded: 1882, venue: "Turf Moor", coach: "Vincent Kompany" },
  62: { id: 62, name: "Sheffield Utd", logo: "https://media.api-sports.io/football/teams/62.png", country: "England", founded: 1889, venue: "Bramall Lane", coach: "Chris Wilder" },
};

// ===== PLAYERS DATABASE =====
export const playersDB: Record<number, Player[]> = {
  40: [
    { id: 101, name: "Alisson Becker", age: 32, number: 1, position: "Goalkeeper", photo: "https://media.api-sports.io/football/players/101.png", goals: 0, assists: 0 },
    { id: 102, name: "Virgil van Dijk", age: 33, number: 4, position: "Defender", photo: "https://media.api-sports.io/football/players/102.png", goals: 3, assists: 1 },
    { id: 103, name: "Trent Alexander-Arnold", age: 26, number: 66, position: "Defender", photo: "https://media.api-sports.io/football/players/103.png", goals: 2, assists: 10 },
    { id: 104, name: "Mohamed Salah", age: 32, number: 11, position: "Forward", photo: "https://media.api-sports.io/football/players/104.png", goals: 22, assists: 13 },
    { id: 105, name: "Darwin Núñez", age: 25, number: 9, position: "Forward", photo: "https://media.api-sports.io/football/players/105.png", goals: 11, assists: 4 },
    { id: 106, name: "Luis Díaz", age: 28, number: 7, position: "Forward", photo: "https://media.api-sports.io/football/players/106.png", goals: 9, assists: 5 },
    { id: 107, name: "Alexis Mac Allister", age: 26, number: 10, position: "Midfielder", photo: "https://media.api-sports.io/football/players/107.png", goals: 4, assists: 6 },
    { id: 108, name: "Dominik Szoboszlai", age: 24, number: 8, position: "Midfielder", photo: "https://media.api-sports.io/football/players/108.png", goals: 5, assists: 3 },
  ],
  541: [
    { id: 201, name: "Thibaut Courtois", age: 32, number: 1, position: "Goalkeeper", photo: "https://media.api-sports.io/football/players/201.png", goals: 0, assists: 0 },
    { id: 202, name: "Vinícius Júnior", age: 24, number: 7, position: "Forward", photo: "https://media.api-sports.io/football/players/202.png", goals: 18, assists: 9 },
    { id: 203, name: "Jude Bellingham", age: 21, number: 5, position: "Midfielder", photo: "https://media.api-sports.io/football/players/203.png", goals: 14, assists: 8 },
    { id: 204, name: "Kylian Mbappé", age: 26, number: 9, position: "Forward", photo: "https://media.api-sports.io/football/players/204.png", goals: 20, assists: 5 },
    { id: 205, name: "Rodrygo", age: 24, number: 11, position: "Forward", photo: "https://media.api-sports.io/football/players/205.png", goals: 8, assists: 7 },
  ],
};

// ===== STANDINGS (PL) =====
export const mockStandings: Record<number, StandingEntry[]> = {
  39: [
    { rank: 1, team: { id: 42, name: "Arsenal", logo: "https://media.api-sports.io/football/teams/42.png" }, points: 70, played: 28, win: 22, draw: 4, lose: 2, goalsFor: 68, goalsAgainst: 22, goalDiff: 46, form: "WWWWW" },
    { rank: 2, team: { id: 50, name: "Manchester City", logo: "https://media.api-sports.io/football/teams/50.png" }, points: 61, played: 28, win: 18, draw: 7, lose: 3, goalsFor: 60, goalsAgainst: 25, goalDiff: 35, form: "WWDWW" },
    { rank: 3, team: { id: 33, name: "Manchester United", logo: "https://media.api-sports.io/football/teams/33.png" }, points: 55, played: 28, win: 17, draw: 4, lose: 7, goalsFor: 44, goalsAgainst: 30, goalDiff: 14, form: "LWWWD" },
    { rank: 4, team: { id: 66, name: "Aston Villa", logo: "https://media.api-sports.io/football/teams/66.png" }, points: 54, played: 29, win: 16, draw: 6, lose: 7, goalsFor: 50, goalsAgainst: 33, goalDiff: 17, form: "DWWLW" },
    { rank: 5, team: { id: 40, name: "Liverpool", logo: "https://media.api-sports.io/football/teams/40.png" }, points: 49, played: 28, win: 14, draw: 7, lose: 7, goalsFor: 48, goalsAgainst: 33, goalDiff: 15, form: "DDWLD" },
    { rank: 6, team: { id: 49, name: "Chelsea", logo: "https://media.api-sports.io/football/teams/49.png" }, points: 48, played: 28, win: 14, draw: 6, lose: 8, goalsFor: 46, goalsAgainst: 36, goalDiff: 10, form: "WWLDW" },
    { rank: 7, team: { id: 55, name: "Brentford", logo: "https://media.api-sports.io/football/teams/55.png" }, points: 46, played: 28, win: 13, draw: 7, lose: 8, goalsFor: 40, goalsAgainst: 40, goalDiff: 0, form: "WLDWD" },
    { rank: 8, team: { id: 45, name: "Everton", logo: "https://media.api-sports.io/football/teams/45.png" }, points: 46, played: 28, win: 13, draw: 7, lose: 8, goalsFor: 35, goalsAgainst: 32, goalDiff: 3, form: "WDDWW" },
    { rank: 9, team: { id: 36, name: "Fulham", logo: "https://media.api-sports.io/football/teams/36.png" }, points: 44, played: 28, win: 12, draw: 8, lose: 8, goalsFor: 42, goalsAgainst: 38, goalDiff: 4, form: "WLLDW" },
    { rank: 10, team: { id: 51, name: "Brighton", logo: "https://media.api-sports.io/football/teams/51.png" }, points: 43, played: 28, win: 11, draw: 10, lose: 7, goalsFor: 38, goalsAgainst: 36, goalDiff: 2, form: "DDDWD" },
    { rank: 11, team: { id: 35, name: "Bournemouth", logo: "https://media.api-sports.io/football/teams/35.png" }, points: 42, played: 28, win: 11, draw: 9, lose: 8, goalsFor: 38, goalsAgainst: 39, goalDiff: -1, form: "WLDDW" },
    { rank: 12, team: { id: 34, name: "Newcastle", logo: "https://media.api-sports.io/football/teams/34.png" }, points: 42, played: 28, win: 11, draw: 9, lose: 8, goalsFor: 48, goalsAgainst: 45, goalDiff: 3, form: "WDWDW" },
    { rank: 13, team: { id: 52, name: "Crystal Palace", logo: "https://media.api-sports.io/football/teams/52.png" }, points: 39, played: 28, win: 10, draw: 9, lose: 9, goalsFor: 33, goalsAgainst: 35, goalDiff: -2, form: "DDWLD" },
    { rank: 14, team: { id: 39, name: "Wolves", logo: "https://media.api-sports.io/football/teams/39.png" }, points: 35, played: 28, win: 9, draw: 8, lose: 11, goalsFor: 35, goalsAgainst: 40, goalDiff: -5, form: "LLWDD" },
    { rank: 15, team: { id: 65, name: "Nott Forest", logo: "https://media.api-sports.io/football/teams/65.png" }, points: 28, played: 28, win: 7, draw: 7, lose: 14, goalsFor: 35, goalsAgainst: 55, goalDiff: -20, form: "LLDLD" },
    { rank: 16, team: { id: 1351, name: "Luton", logo: "https://media.api-sports.io/football/teams/1351.png" }, points: 25, played: 28, win: 6, draw: 7, lose: 15, goalsFor: 30, goalsAgainst: 60, goalDiff: -30, form: "WLLLD" },
    { rank: 17, team: { id: 48, name: "West Ham", logo: "https://media.api-sports.io/football/teams/48.png" }, points: 24, played: 28, win: 6, draw: 6, lose: 16, goalsFor: 30, goalsAgainst: 55, goalDiff: -25, form: "LDLDL" },
    { rank: 18, team: { id: 44, name: "Burnley", logo: "https://media.api-sports.io/football/teams/44.png" }, points: 20, played: 28, win: 4, draw: 8, lose: 16, goalsFor: 28, goalsAgainst: 65, goalDiff: -37, form: "DLDLL" },
    { rank: 19, team: { id: 62, name: "Sheffield Utd", logo: "https://media.api-sports.io/football/teams/62.png" }, points: 15, played: 28, win: 3, draw: 6, lose: 19, goalsFor: 25, goalsAgainst: 75, goalDiff: -50, form: "LLLLD" },
  ],
  140: [
    { rank: 1, team: { id: 541, name: "Real Madrid", logo: "https://media.api-sports.io/football/teams/541.png" }, points: 72, played: 30, win: 22, draw: 6, lose: 2, goalsFor: 65, goalsAgainst: 20, goalDiff: 45, form: "WWDWW" },
    { rank: 2, team: { id: 529, name: "Barcelona", logo: "https://media.api-sports.io/football/teams/529.png" }, points: 70, played: 30, win: 22, draw: 4, lose: 4, goalsFor: 72, goalsAgainst: 30, goalDiff: 42, form: "WWWLW" },
    { rank: 3, team: { id: 530, name: "Atletico Madrid", logo: "https://media.api-sports.io/football/teams/530.png" }, points: 60, played: 30, win: 18, draw: 6, lose: 6, goalsFor: 50, goalsAgainst: 28, goalDiff: 22, form: "DWWWL" },
  ],
  78: [
    { rank: 1, team: { id: 157, name: "Bayern Munich", logo: "https://media.api-sports.io/football/teams/157.png" }, points: 60, played: 27, win: 19, draw: 3, lose: 5, goalsFor: 70, goalsAgainst: 25, goalDiff: 45, form: "WWWDW" },
    { rank: 2, team: { id: 165, name: "Borussia Dortmund", logo: "https://media.api-sports.io/football/teams/165.png" }, points: 55, played: 27, win: 16, draw: 7, lose: 4, goalsFor: 52, goalsAgainst: 30, goalDiff: 22, form: "WDLWW" },
  ],
  135: [
    { rank: 1, team: { id: 505, name: "Inter", logo: "https://media.api-sports.io/football/teams/505.png" }, points: 75, played: 30, win: 24, draw: 3, lose: 3, goalsFor: 68, goalsAgainst: 15, goalDiff: 53, form: "WWWWW" },
    { rank: 2, team: { id: 489, name: "AC Milan", logo: "https://media.api-sports.io/football/teams/489.png" }, points: 65, played: 30, win: 20, draw: 5, lose: 5, goalsFor: 50, goalsAgainst: 28, goalDiff: 22, form: "WWDWL" },
    { rank: 3, team: { id: 496, name: "Juventus", logo: "https://media.api-sports.io/football/teams/496.png" }, points: 59, played: 30, win: 17, draw: 8, lose: 5, goalsFor: 44, goalsAgainst: 22, goalDiff: 22, form: "DDWLD" },
  ],
  61: [
    { rank: 1, team: { id: 85, name: "Paris Saint Germain", logo: "https://media.api-sports.io/football/teams/85.png" }, points: 66, played: 28, win: 20, draw: 6, lose: 2, goalsFor: 62, goalsAgainst: 20, goalDiff: 42, form: "WDDWW" },
    { rank: 2, team: { id: 80, name: "Lyon", logo: "https://media.api-sports.io/football/teams/80.png" }, points: 50, played: 28, win: 15, draw: 5, lose: 8, goalsFor: 45, goalsAgainst: 32, goalDiff: 13, form: "WLWWW" },
  ],
};

// ===== TOP SCORERS =====
export const mockTopScorers: Record<number, TopScorer[]> = {
  39: [
    { player: { id: 104, name: "Mohamed Salah", photo: "https://media.api-sports.io/football/players/104.png", nationality: "Egypt" }, team: { id: 40, name: "Liverpool", logo: "https://media.api-sports.io/football/teams/40.png" }, goals: 22, assists: 13, matches: 30 },
    { player: { id: 301, name: "Erling Haaland", photo: "https://media.api-sports.io/football/players/301.png", nationality: "Norway" }, team: { id: 50, name: "Manchester City", logo: "https://media.api-sports.io/football/teams/50.png" }, goals: 20, assists: 4, matches: 28 },
    { player: { id: 302, name: "Alexander Isak", photo: "https://media.api-sports.io/football/players/302.png", nationality: "Sweden" }, team: { id: 34, name: "Newcastle", logo: "https://media.api-sports.io/football/teams/34.png" }, goals: 17, assists: 5, matches: 29 },
    { player: { id: 303, name: "Cole Palmer", photo: "https://media.api-sports.io/football/players/303.png", nationality: "England" }, team: { id: 49, name: "Chelsea", logo: "https://media.api-sports.io/football/teams/49.png" }, goals: 16, assists: 11, matches: 30 },
    { player: { id: 304, name: "Bukayo Saka", photo: "https://media.api-sports.io/football/players/304.png", nationality: "England" }, team: { id: 42, name: "Arsenal", logo: "https://media.api-sports.io/football/teams/42.png" }, goals: 14, assists: 10, matches: 27 },
  ],
  140: [
    { player: { id: 204, name: "Kylian Mbappé", photo: "https://media.api-sports.io/football/players/204.png", nationality: "France" }, team: { id: 541, name: "Real Madrid", logo: "https://media.api-sports.io/football/teams/541.png" }, goals: 20, assists: 5, matches: 29 },
    { player: { id: 202, name: "Vinícius Júnior", photo: "https://media.api-sports.io/football/players/202.png", nationality: "Brazil" }, team: { id: 541, name: "Real Madrid", logo: "https://media.api-sports.io/football/teams/541.png" }, goals: 18, assists: 9, matches: 30 },
    { player: { id: 401, name: "Robert Lewandowski", photo: "https://media.api-sports.io/football/players/401.png", nationality: "Poland" }, team: { id: 529, name: "Barcelona", logo: "https://media.api-sports.io/football/teams/529.png" }, goals: 17, assists: 6, matches: 28 },
  ],
  78: [
    { player: { id: 501, name: "Harry Kane", photo: "https://media.api-sports.io/football/players/501.png", nationality: "England" }, team: { id: 157, name: "Bayern Munich", logo: "https://media.api-sports.io/football/teams/157.png" }, goals: 30, assists: 8, matches: 26 },
  ],
  135: [
    { player: { id: 601, name: "Lautaro Martínez", photo: "https://media.api-sports.io/football/players/601.png", nationality: "Argentina" }, team: { id: 505, name: "Inter", logo: "https://media.api-sports.io/football/teams/505.png" }, goals: 23, assists: 2, matches: 28 },
    { player: { id: 602, name: "Rafael Leão", photo: "https://media.api-sports.io/football/players/602.png", nationality: "Portugal" }, team: { id: 489, name: "AC Milan", logo: "https://media.api-sports.io/football/teams/489.png" }, goals: 12, assists: 10, matches: 27 },
  ],
  61: [
    { player: { id: 701, name: "Ousmane Dembélé", photo: "https://media.api-sports.io/football/players/701.png", nationality: "France" }, team: { id: 85, name: "Paris Saint Germain", logo: "https://media.api-sports.io/football/teams/85.png" }, goals: 10, assists: 12, matches: 25 },
  ],
};

// ===== MATCH FACTORY =====
function mkMatch(id: number, leagueId: number, leagueName: string, leagueLogo: string, country: string, flag: string | null, round: string, homeId: number, awayId: number, date: string, status: { long: string; short: "NS" | "1H" | "HT" | "2H" | "FT" | "AET"; elapsed: number | null }, goalsH: number | null, goalsA: number | null, htH: number | null, htA: number | null, pop: number): Match {
  const h = teamsDB[homeId]; const a = teamsDB[awayId];
  const winH = goalsH !== null && goalsA !== null ? (goalsH > goalsA ? true : goalsH < goalsA ? false : null) : null;
  const winA = goalsH !== null && goalsA !== null ? (goalsA > goalsH ? true : goalsA < goalsH ? false : null) : null;
  return {
    fixture: { id, referee: "Referee", timezone: "UTC", date, timestamp: ts(date), venue: { id: null, name: h?.venue || "Stadium", city: h?.country || "" }, status: { long: status.long, short: status.short, elapsed: status.elapsed } },
    league: { id: leagueId, name: leagueName, country, logo: leagueLogo, flag, round },
    teams: { home: { id: homeId, name: h?.name || `Team ${homeId}`, logo: h?.logo || "", winner: winH }, away: { id: awayId, name: a?.name || `Team ${awayId}`, logo: a?.logo || "", winner: winA } },
    goals: { home: goalsH, away: goalsA },
    score: { halftime: { home: htH, away: htA }, fulltime: { home: status.short === "FT" || status.short === "AET" ? goalsH : null, away: status.short === "FT" || status.short === "AET" ? goalsA : null }, extratime: { home: null, away: null }, penalty: { home: null, away: null } },
    popularity: pop,
  };
}

// ===== YESTERDAY'S MATCHES =====
export const yesterdayMatches: Match[] = [
  mkMatch(2001, 39, "Premier League", "https://media.api-sports.io/football/leagues/39.png", "England", "https://media.api-sports.io/flags/gb.svg", "Regular Season - 29", 49, 47, makeDate(-1, 15, 0), { long: "Match Finished", short: "FT", elapsed: 90 }, 3, 1, 2, 0, 90),
  mkMatch(2002, 140, "La Liga", "https://media.api-sports.io/football/leagues/140.png", "Spain", "https://media.api-sports.io/flags/es.svg", "Regular Season - 28", 529, 530, makeDate(-1, 18, 0), { long: "Match Finished", short: "FT", elapsed: 90 }, 2, 2, 1, 1, 95),
  mkMatch(2003, 135, "Serie A", "https://media.api-sports.io/football/leagues/135.png", "Italy", "https://media.api-sports.io/flags/it.svg", "Regular Season - 29", 489, 505, makeDate(-1, 20, 0), { long: "Match Finished", short: "FT", elapsed: 90 }, 1, 2, 0, 1, 85),
  mkMatch(2004, 78, "Bundesliga", "https://media.api-sports.io/football/leagues/78.png", "Germany", "https://media.api-sports.io/flags/de.svg", "Regular Season - 27", 165, 157, makeDate(-1, 17, 30), { long: "Match Finished", short: "FT", elapsed: 90 }, 0, 3, 0, 1, 88),
  mkMatch(2005, 39, "Premier League", "https://media.api-sports.io/football/leagues/39.png", "England", "https://media.api-sports.io/flags/gb.svg", "Regular Season - 29", 34, 48, makeDate(-1, 15, 0), { long: "Match Finished", short: "FT", elapsed: 90 }, 2, 0, 1, 0, 70),
];

// ===== TODAY'S MATCHES =====
export const todayMatches: Match[] = [
  mkMatch(1001, 39, "Premier League", "https://media.api-sports.io/football/leagues/39.png", "England", "https://media.api-sports.io/flags/gb.svg", "Regular Season - 30", 40, 33, makeDate(0, 14, 0), { long: "Second Half", short: "2H", elapsed: 67 }, 2, 1, 1, 1, 98),
  mkMatch(1002, 140, "La Liga", "https://media.api-sports.io/football/leagues/140.png", "Spain", "https://media.api-sports.io/flags/es.svg", "Regular Season - 29", 541, 529, makeDate(0, 14, 30), { long: "First Half", short: "1H", elapsed: 34 }, 1, 1, null, null, 100),
  mkMatch(1003, 78, "Bundesliga", "https://media.api-sports.io/football/leagues/78.png", "Germany", "https://media.api-sports.io/flags/de.svg", "Regular Season - 27", 157, 165, makeDate(0, 13, 0), { long: "Half Time", short: "HT", elapsed: 45 }, 3, 0, 3, 0, 92),
  mkMatch(1004, 39, "Premier League", "https://media.api-sports.io/football/leagues/39.png", "England", "https://media.api-sports.io/flags/gb.svg", "Regular Season - 30", 50, 42, makeDate(0, 17, 30), { long: "Not Started", short: "NS", elapsed: null }, null, null, null, null, 96),
  mkMatch(1005, 61, "Ligue 1", "https://media.api-sports.io/football/leagues/61.png", "France", "https://media.api-sports.io/flags/fr.svg", "Regular Season - 28", 85, 80, makeDate(0, 20, 0), { long: "Not Started", short: "NS", elapsed: null }, null, null, null, null, 82),
  mkMatch(1006, 135, "Serie A", "https://media.api-sports.io/football/leagues/135.png", "Italy", "https://media.api-sports.io/flags/it.svg", "Regular Season - 30", 505, 496, makeDate(0, 19, 0), { long: "Not Started", short: "NS", elapsed: null }, null, null, null, null, 86),
];

// ===== TOMORROW'S MATCHES =====
export const tomorrowMatches: Match[] = [
  mkMatch(3001, 39, "Premier League", "https://media.api-sports.io/football/leagues/39.png", "England", "https://media.api-sports.io/flags/gb.svg", "Regular Season - 30", 42, 49, makeDate(1, 16, 0), { long: "Not Started", short: "NS", elapsed: null }, null, null, null, null, 93),
  mkMatch(3002, 140, "La Liga", "https://media.api-sports.io/football/leagues/140.png", "Spain", "https://media.api-sports.io/flags/es.svg", "Regular Season - 29", 530, 541, makeDate(1, 20, 0), { long: "Not Started", short: "NS", elapsed: null }, null, null, null, null, 94),
  mkMatch(3003, 78, "Bundesliga", "https://media.api-sports.io/football/leagues/78.png", "Germany", "https://media.api-sports.io/flags/de.svg", "Regular Season - 27", 157, 165, makeDate(1, 17, 30), { long: "Not Started", short: "NS", elapsed: null }, null, null, null, null, 88),
  mkMatch(3004, 61, "Ligue 1", "https://media.api-sports.io/football/leagues/61.png", "France", "https://media.api-sports.io/flags/fr.svg", "Regular Season - 28", 80, 85, makeDate(1, 20, 0), { long: "Not Started", short: "NS", elapsed: null }, null, null, null, null, 78),
];

/** Get matches for a given date offset: -1=yesterday, 0=today, 1=tomorrow */
export function getMatchesByDateOffset(offset: number): Match[] {
  if (offset === -1) return [...yesterdayMatches].sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
  if (offset === 1) return [...tomorrowMatches].sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
  return [...todayMatches].sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
}

// For backwards compatibility
export const mockMatches = todayMatches;

// ===== MOCK EVENTS =====
export const mockEvents: MatchEvent[] = [
  { time: { elapsed: 12, extra: null }, team: { id: 40, name: "Liverpool", logo: "https://media.api-sports.io/football/teams/40.png" }, player: { id: 104, name: "M. Salah" }, assist: { id: 103, name: "T. Alexander-Arnold" }, type: "Goal", detail: "Normal Goal", comments: null },
  { time: { elapsed: 28, extra: null }, team: { id: 33, name: "Manchester United", logo: "https://media.api-sports.io/football/teams/33.png" }, player: { id: 3, name: "B. Fernandes" }, assist: { id: null, name: null }, type: "Goal", detail: "Normal Goal", comments: null },
  { time: { elapsed: 43, extra: null }, team: { id: 33, name: "Manchester United", logo: "https://media.api-sports.io/football/teams/33.png" }, player: { id: 4, name: "Casemiro" }, assist: { id: null, name: null }, type: "Card", detail: "Yellow Card", comments: null },
  { time: { elapsed: 55, extra: null }, team: { id: 40, name: "Liverpool", logo: "https://media.api-sports.io/football/teams/40.png" }, player: { id: 105, name: "D. Núñez" }, assist: { id: 104, name: "M. Salah" }, type: "Goal", detail: "Normal Goal", comments: null },
  { time: { elapsed: 72, extra: null }, team: { id: 40, name: "Liverpool", logo: "https://media.api-sports.io/football/teams/40.png" }, player: { id: 106, name: "L. Díaz" }, assist: { id: null, name: null }, type: "subst", detail: "Substitution 1", comments: null },
];

export const mockStatistics: TeamStatistics[] = [
  { team: { id: 40, name: "Liverpool", logo: "https://media.api-sports.io/football/teams/40.png" }, statistics: [{ type: "Ball Possession", value: "58%" }, { type: "Total Shots", value: 14 }, { type: "Shots on Goal", value: 6 }, { type: "Corner Kicks", value: 7 }, { type: "Fouls", value: 10 }, { type: "Yellow Cards", value: 1 }, { type: "Passes %", value: "87%" }] },
  { team: { id: 33, name: "Manchester United", logo: "https://media.api-sports.io/football/teams/33.png" }, statistics: [{ type: "Ball Possession", value: "42%" }, { type: "Total Shots", value: 8 }, { type: "Shots on Goal", value: 3 }, { type: "Corner Kicks", value: 4 }, { type: "Fouls", value: 14 }, { type: "Yellow Cards", value: 3 }, { type: "Passes %", value: "79%" }] },
];

// ===== MOCK NEWS (50+) =====
const newsSources = [
  { name: "ESPN", url: "https://espn.com" }, { name: "Sky Sports", url: "https://skysports.com" },
  { name: "BBC Sport", url: "https://bbc.com/sport" }, { name: "The Guardian", url: "https://theguardian.com" },
  { name: "Goal.com", url: "https://goal.com" }, { name: "FIFA News", url: "https://fifa.com" },
  { name: "Marca", url: "https://marca.com" }, { name: "L'Équipe", url: "https://lequipe.fr" },
];
const newsImages = [
  "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&h=500&fit=crop",
  "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=500&fit=crop",
  "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&h=500&fit=crop",
  "https://images.unsplash.com/photo-1553778263-73a83bab9b0c?w=800&h=500&fit=crop",
  "https://images.unsplash.com/photo-1486286701208-1d58e9338013?w=800&h=500&fit=crop",
  "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=800&h=500&fit=crop",
  "https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=800&h=500&fit=crop",
  "https://images.unsplash.com/photo-1459865264687-595d652de67e?w=800&h=500&fit=crop",
];
const newsRawArticles = [
  { t: "Champions League Quarter-Finals: Who Will Advance?", d: "As the Champions League knockout rounds heat up, we preview the most anticipated matchups and predict who will make it to the semi-finals." },
  { t: "Transfer Window: Top 10 Deals That Could Happen This Summer", d: "From blockbuster signings to surprise moves, here are the most likely transfers we could see when the window opens." },
  { t: "Rising Stars: 5 Young Players to Watch This Season", d: "These talented youngsters are making waves in Europe's top leagues and could become the next generation of football superstars." },
  { t: "Premier League Title Race: Breaking Down the Contenders", d: "With just weeks remaining, the Premier League title race is tighter than ever. We analyze each contender." },
  { t: "VAR Controversy: Should Football Embrace Technology More?", d: "The ongoing debate around VAR continues to divide opinions. We look at the pros and cons of video technology." },
  { t: "World Cup 2026 Preparations: Venue Updates and Qualifiers", d: "With the 2026 World Cup approaching, stadiums are being upgraded and nations are battling for spots." },
  { t: "Mbappé's First Season at Real Madrid: A Verdict", d: "After his blockbuster move, we evaluate Kylian Mbappé's impact at the Santiago Bernabéu so far." },
  { t: "The Evolution of the False 9: How Tactics Changed Football", d: "From Messi to modern interpreters, we trace the tactical revolution of the false nine role." },
  { t: "Women's Football: Record-Breaking Attendance Numbers", d: "Women's football continues to shatter records with packed stadiums across Europe and beyond." },
  { t: "Injury Crisis: How Clubs Are Coping With Packed Schedules", d: "With more games than ever, clubs are struggling to keep players fit. We look at the fitness revolution." },
  { t: "The Best Free Kicks of the Season So Far", d: "From stunning curlers to powerful drives, here are the free kick goals that have lit up the season." },
  { t: "Manager Masterclass: Tactical Innovations This Season", d: "From inverted full-backs to false nines, managers have pushed the tactical envelope this season." },
  { t: "Derby Day: The Biggest Rivalries in World Football", d: "We explore the history and passion behind the most intense derbies around the globe." },
  { t: "Goalkeeping Revolution: The Rise of the Sweeper-Keeper", d: "Modern goalkeepers are expected to do much more than stop shots. We look at this evolution." },
  { t: "Youth Academy Report: Which Clubs Produce the Best Talent?", d: "An in-depth analysis of Europe's top youth academies and their production lines." },
  { t: "The Business of Football: Record Revenue for Top Clubs", d: "Revenues continue to soar for Europe's elite clubs. We break down the numbers." },
  { t: "African Football: Stars Making an Impact in Europe", d: "From Salah to Osimhen, African players continue to dominate Europe's top leagues." },
  { t: "Climate and Football: How Weather Affects Match Results", d: "Research shows weather conditions can significantly influence match outcomes." },
  { t: "The Perfect XI: AI Picks the Best Starting Lineup", d: "Using advanced analytics, we let AI pick the ultimate starting eleven from this season." },
  { t: "Comeback Kings: The Greatest Remontadas in Football History", d: "From Istanbul 2005 to Barcelona 6-1, we revisit football's most dramatic comebacks." },
  { t: "Stadium of the Future: What Will Arenas Look Like in 2030?", d: "Smart tech, sustainable design, and immersive experiences will redefine stadiums." },
  { t: "Financial Fair Play: Is It Working or Failing?", d: "Clubs continue to push financial boundaries. We assess FFP's effectiveness." },
  { t: "The Ballon d'Or Race: Who's Leading the Pack?", d: "With the season nearing its end, we assess the front-runners for the prestigious award." },
  { t: "Legends Who Became Managers: How Are They Doing?", d: "Former superstars turned managers face different challenges. We rate their performances." },
  { t: "Football Analytics: How Data Is Changing the Beautiful Game", d: "Expected goals, pressing intensity, and PPDA — analytics are reshaping modern football." },
];

export const mockNews: NewsArticle[] = newsRawArticles.map((a, i) => ({
  title: a.t,
  description: a.d,
  content: `${a.d}\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\nSed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.\n\nNemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.`,
  url: "#",
  image: newsImages[i % newsImages.length],
  publishedAt: makeDate(0, -(i * 2)),
  source: newsSources[i % newsSources.length],
  slug: slug(a.t),
}));
