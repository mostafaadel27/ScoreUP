import axios from "axios";

// ---- API-Football Client ---- //
export const footballApi = axios.create({
  baseURL: "https://v3.football.api-sports.io",
  headers: {
    "x-apisports-key": process.env.NEXT_PUBLIC_FOOTBALL_API_KEY || "",
  },
});

// ---- GNews Client ---- //
export const newsApi = axios.create({
  baseURL: "https://gnews.io/api/v4",
});

/**
 * Check if API keys are configured
 */
export function hasFootballApiKey(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_FOOTBALL_API_KEY);
}

export function hasNewsApiKey(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_GNEWS_API_KEY);
}
