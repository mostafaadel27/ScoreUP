"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { RefreshCw } from "lucide-react";
import { useMatches } from "@/hooks/use-matches";
import { useUIStore } from "@/store/use-ui-store";
import { DateNav } from "./date-nav";
import { MatchSlider } from "./match-slider";
import { MatchCardSkeleton } from "@/components/ui/skeleton";
import { ErrorFallback, EmptyState } from "@/components/ui/error-fallback";
import { getMatchCategory } from "@/lib/utils";

export function MatchesSection() {
  const { dateOffset, searchQuery, isLive } = useUIStore();
  const { data: matches, isLoading, isError, refetch, isFetching } = useMatches(dateOffset);

  const filtered = useMemo(() => {
    if (!matches) return [];

    let result = matches;
    if (isLive) {
      result = result.filter((m) => getMatchCategory(m.fixture.status.short) === "live");
    }

    if (!searchQuery) return result;

    return result.filter(
      (m) =>
        m.teams.home.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.teams.away.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.league.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [matches, searchQuery, isLive]);

  const dateLabel = isLive ? "Live" : dateOffset === -1 ? "Yesterday" : dateOffset === 0 ? "Today" : dateOffset === 1 ? "Tomorrow" : "";

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6"
        >
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold">
              <span className="gradient-text">⚽ Top Matches</span>{" "}
              <span className="text-foreground">{dateLabel}</span>
            </h2>
            <p className="text-sm text-muted mt-1">
              {isLive ? "Currently ongoing fixtures" : dateOffset === 0 ? "Live scores updated every 60 seconds" : `${dateLabel}'s fixtures`}
            </p>
          </div>
          <button
            onClick={() => refetch()}
            disabled={isFetching}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-card-border text-sm text-muted hover:text-foreground hover:border-accent/30 transition-all cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isFetching ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </motion.div>

        {/* Date Navigation */}
        <DateNav />

        {/* Content */}
        {isLoading ? (
          <div className="flex gap-4 overflow-hidden">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex-shrink-0 w-[340px] sm:w-[380px]">
                <MatchCardSkeleton />
              </div>
            ))}
          </div>
        ) : isError ? (
          <ErrorFallback
            message="Failed to load matches. Check your connection and try again."
            onRetry={() => refetch()}
          />
        ) : filtered.length === 0 ? (
          <EmptyState
            message={
              searchQuery
                ? `No matches found for "${searchQuery}"`
                : "No matches scheduled for this day"
            }
          />
        ) : (
          <MatchSlider matches={filtered} />
        )}
      </div>
    </section>
  );
}
