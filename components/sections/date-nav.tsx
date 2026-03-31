"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, CalendarDays } from "lucide-react";
import { useUIStore } from "@/store/use-ui-store";
import { cn } from "@/lib/utils";

const dateLabels: Record<number, string> = { [-1]: "Yesterday", [0]: "Today", [1]: "Tomorrow" };

function formatDateLabel(offset: number): string {
  if (dateLabels[offset]) return dateLabels[offset];
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}

export function DateNav() {
  const { dateOffset, setDateOffset, goYesterday, goToday, goTomorrow, isLive, setLive } = useUIStore();

  const tabs = [
    { id: "yesterday", label: formatDateLabel(-1), isActive: !isLive && dateOffset === -1, action: goYesterday },
    { id: "today", label: formatDateLabel(0), isActive: !isLive && dateOffset === 0, action: goToday, icon: <CalendarDays className="w-3.5 h-3.5" /> },
    { id: "live", label: "Live", isActive: isLive, action: () => setLive(true), icon: <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" /> },
    { id: "tomorrow", label: formatDateLabel(1), isActive: !isLive && dateOffset === 1, action: goTomorrow },
  ];

  return (
    <div className="flex items-center justify-between gap-2 mb-6">
      {/* Prev button */}
      <button
        onClick={() => setDateOffset(dateOffset - 1)}
        className="w-9 h-9 rounded-full border border-card-border flex items-center justify-center text-muted hover:text-foreground hover:border-accent/50 transition-all cursor-pointer"
        aria-label="Previous day"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {/* Date tabs */}
      <div className="flex gap-2 flex-1 justify-center">
        {tabs.map((tab) => {
          return (
            <button
              key={tab.id}
              onClick={tab.action}
              className={cn(
                "relative px-4 sm:px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer",
                tab.isActive
                  ? "text-white"
                  : "text-muted hover:text-foreground"
              )}
            >
              {tab.isActive && (
                <motion.div
                  layoutId="date-tab-bg"
                  className={cn("absolute inset-0 rounded-full", tab.id === "live" ? "bg-gradient-to-r from-red-600 to-rose-600" : "bg-gradient-to-r from-emerald-600 to-blue-600")}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                {tab.icon}
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Next button */}
      <button
        onClick={() => setDateOffset(dateOffset + 1)}
        className="w-9 h-9 rounded-full border border-card-border flex items-center justify-center text-muted hover:text-foreground hover:border-accent/50 transition-all cursor-pointer"
        aria-label="Next day"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
