import { MatchStatusShort, MatchCategory } from "./types";

/**
 * Map API status codes to human-readable labels
 */
export function getStatusLabel(short: MatchStatusShort): string {
  const map: Record<MatchStatusShort, string> = {
    TBD: "TBD",
    NS: "Not Started",
    "1H": "1st Half",
    HT: "Half Time",
    "2H": "2nd Half",
    ET: "Extra Time",
    BT: "Break Time",
    P: "Penalties",
    SUSP: "Suspended",
    INT: "Interrupted",
    FT: "Full Time",
    AET: "After ET",
    PEN: "After Pen.",
    PST: "Postponed",
    CANC: "Cancelled",
    ABD: "Abandoned",
    AWD: "Awarded",
    WO: "Walk Over",
    LIVE: "Live",
  };
  return map[short] || short;
}

/**
 * Determine match category from status code
 */
export function getMatchCategory(short: MatchStatusShort): MatchCategory {
  const liveStatuses: MatchStatusShort[] = ["1H", "HT", "2H", "ET", "BT", "P", "LIVE", "INT"];
  const finishedStatuses: MatchStatusShort[] = ["FT", "AET", "PEN", "ABD", "AWD", "WO"];
  if (liveStatuses.includes(short)) return "live";
  if (finishedStatuses.includes(short)) return "finished";
  return "today";
}

/**
 * Format ISO date to readable time HH:MM
 */
export function formatMatchTime(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

/**
 * Format date to readable format
 */
export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/**
 * Get relative time (e.g. "2 hours ago")
 */
export function timeAgo(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
}

/**
 * clsx-like utility for conditional class names
 */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}
