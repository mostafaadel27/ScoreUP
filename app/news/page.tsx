"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { NewsCard } from "@/components/sections/news-card";
import { NewsCardSkeleton } from "@/components/ui/skeleton";
import { useNews } from "@/hooks/use-news";
import { NewsArticle } from "@/lib/types";

export default function NewsPage() {
  const [page, setPage] = useState(1);
  const [allArticles, setAllArticles] = useState<NewsArticle[]>([]);
  const { data: newArticles, isFetching } = useNews(page, 9);
  const loaderRef = useRef<HTMLDivElement>(null);

  // Append new articles when they arrive from API
  useEffect(() => {
    if (newArticles && newArticles.length > 0) {
      setAllArticles((prev) => {
        const combined = [...prev, ...newArticles];
        const unique = combined.filter((a, idx) => combined.findIndex(x => x.slug === a.slug) === idx);
        return unique;
      });
    }
  }, [newArticles]);

  const hasMore = page < 5; // Max 5 pages (45 articles) to respect free API limits

  const loadMore = useCallback(() => {
    if (isFetching || !hasMore) return;
    setPage((p) => p + 1);
  }, [isFetching, hasMore]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMore();
      },
      { threshold: 0.1 }
    );
    const el = loaderRef.current;
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, [loadMore]);

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold">
              <span className="gradient-text">📰 Sports News</span>
            </h1>
            <p className="text-sm text-muted mt-2">
              Latest headlines and breaking stories from the world of sports
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allArticles.map((article, i) => (
              <NewsCard key={article.slug + i} article={article} index={i % 9} />
            ))}
            {isFetching && Array.from({ length: 3 }).map((_, i) => <NewsCardSkeleton key={`skel-${i}`} />)}
          </div>

          {/* Infinite scroll trigger */}
          {hasMore && <div ref={loaderRef} className="h-20" />}

          {!hasMore && allArticles.length > 0 && (
            <p className="text-center text-muted text-sm mt-8">You&apos;ve reached the end of the news feed. Daily limit reached or no more articles available.</p>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
