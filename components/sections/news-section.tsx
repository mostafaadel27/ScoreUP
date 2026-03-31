"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useNews } from "@/hooks/use-news";
import { NewsCard } from "./news-card";
import { NewsCardSkeleton } from "@/components/ui/skeleton";
import { ErrorFallback } from "@/components/ui/error-fallback";

interface NewsSectionProps {
  limit?: number;
  showViewAll?: boolean;
  showSeeMore?: boolean;
}

export function NewsSection({ limit = 6, showViewAll = true, showSeeMore = true }: NewsSectionProps) {
  const [page, setPage] = useState(1);
  const maxPage = 4; // 4 * 6 = 24 articles max
  const { data: articles, isLoading, isError, refetch } = useNews(page, limit);

  const displayArticles = articles?.slice(0, page * limit) || [];
  const canLoadMore = page < maxPage && (articles?.length || 0) >= page * limit;

  return (
    <section className="py-12 bg-card/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold">
              <span className="gradient-text">📰 Latest Sports</span>{" "}
              <span className="text-foreground">News</span>
            </h2>
            <p className="text-sm text-muted mt-1">Stay updated with the latest headlines</p>
          </div>
          {showViewAll && (
            <Link href="/news" className="hidden sm:flex items-center gap-1.5 text-sm text-accent hover:text-accent-hover transition-colors">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </motion.div>

        {/* Content */}
        {isLoading && displayArticles.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: limit }).map((_, i) => (<NewsCardSkeleton key={i} />))}
          </div>
        ) : isError ? (
          <ErrorFallback message="Failed to load news articles." onRetry={() => refetch()} />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayArticles.map((article, i) => (
                <NewsCard key={article.slug + i} article={article} index={i} />
              ))}
            </div>

            {/* See More Button */}
            {showSeeMore && canLoadMore && (
              <div className="mt-8 text-center">
                <button
                  onClick={() => setPage((p) => p + 1)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-card border border-card-border text-sm font-medium text-muted hover:text-foreground hover:border-accent/30 transition-all cursor-pointer"
                >
                  <ChevronDown className="w-4 h-4" />
                  See More News
                </button>
              </div>
            )}
          </>
        )}

        {/* Mobile View All */}
        {showViewAll && (
          <div className="sm:hidden mt-6 text-center">
            <Link href="/news" className="inline-flex items-center gap-1.5 text-sm text-accent hover:text-accent-hover transition-colors">
              View All News <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
