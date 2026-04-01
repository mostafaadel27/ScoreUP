"use client";

import { useQuery } from "@tanstack/react-query";
import { newsApi, hasNewsApiKey } from "@/lib/api";
import { GNewsResponse, NewsArticle } from "@/lib/types";
import { mockNews } from "@/lib/mock-data";

async function fetchNews(page: number, limit: number): Promise<NewsArticle[]> {
  if (!hasNewsApiKey()) {
    return mockNews.slice(0, page * limit);
  }

  try {
    const { data } = await newsApi.get<GNewsResponse>("/top-headlines", {
      params: {
        category: "sports",
        lang: "en",
        max: Math.min(limit, 10),
        page,
        apikey: process.env.NEXT_PUBLIC_GNEWS_API_KEY || "29b31a69a948363467a0f6ead2d36112",
      },
    });

    if (!data || !data.articles) {
      console.warn("GNews API returned no articles or hit a rate limit. Falling back to mock data.");
      return mockNews.slice(0, Math.min(limit, mockNews.length));
    }

    return data.articles.map((a, i) => ({
      ...a,
      slug: a.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || `article-${i}`,
    }));
  } catch (error) {
    console.error("News API Error:", error);
    // Fallback to mock data on error (e.g., 429 Too Many Requests or CORS issues)
    return mockNews.slice(0, Math.min(limit, mockNews.length));
  }
}

export function useNews(page: number = 1, limit: number = 6) {
  return useQuery({
    queryKey: ["news", "sports", page, limit],
    queryFn: () => fetchNews(page, limit),
    staleTime: 5 * 60 * 1000,
    retry: 2,
    placeholderData: (prev) => prev,
  });
}
