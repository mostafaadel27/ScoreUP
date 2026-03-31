"use client";

import { cn } from "@/lib/utils";
import { MatchStatusShort, MatchCategory } from "@/lib/types";
import { getStatusLabel, getMatchCategory } from "@/lib/utils";

interface BadgeProps {
  status: MatchStatusShort;
  elapsed?: number | null;
  className?: string;
}

export function StatusBadge({ status, elapsed, className }: BadgeProps) {
  const category = getMatchCategory(status);
  const label = getStatusLabel(status);

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase",
        category === "live" &&
          "bg-red-500/15 text-red-400 border border-red-500/30",
        category === "today" &&
          "bg-amber-500/15 text-amber-400 border border-amber-500/30",
        category === "finished" &&
          "bg-gray-500/15 text-gray-400 border border-gray-500/30",
        className
      )}
    >
      {category === "live" && <span className="pulse-dot" />}
      {category === "live" && elapsed ? `${elapsed}'` : label}
    </span>
  );
}

interface TabBadgeProps {
  category: MatchCategory;
  count: number;
  active: boolean;
  onClick: () => void;
}

export function TabBadge({ category, count, active, onClick }: TabBadgeProps) {
  const labels: Record<MatchCategory, string> = {
    live: "🔴 Live",
    today: "⏱ Upcoming",
    finished: "✅ Finished",
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border cursor-pointer",
        active
          ? "tab-active"
          : "border-card-border text-muted hover:text-foreground hover:border-glass-border"
      )}
    >
      {labels[category]}
      <span
        className={cn(
          "inline-flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold",
          active ? "bg-accent/20 text-accent" : "bg-card-border text-muted"
        )}
      >
        {count}
      </span>
    </button>
  );
}
