"use client";

import { create } from "zustand";
import { NewsArticle } from "@/lib/types";

interface UIStore {
  // Date navigation
  dateOffset: number; // -1=yesterday, 0=today, 1=tomorrow
  setDateOffset: (offset: number) => void;
  isLive: boolean;
  setLive: (live: boolean) => void;
  goYesterday: () => void;
  goToday: () => void;
  goTomorrow: () => void;
  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  // Mobile
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  toggleMobileMenu: () => void;
  // News Data Sharing
  selectedArticle: NewsArticle | null;
  setSelectedArticle: (article: NewsArticle | null) => void;
}

export const useUIStore = create<UIStore>()((set) => ({
  dateOffset: 0,
  isLive: false,
  setDateOffset: (offset) => set({ dateOffset: offset, isLive: false }),
  setLive: (live) => set({ isLive: live, dateOffset: 0 }),
  goYesterday: () => set({ dateOffset: -1, isLive: false }),
  goToday: () => set({ dateOffset: 0, isLive: false }),
  goTomorrow: () => set({ dateOffset: 1, isLive: false }),
  searchQuery: "",
  setSearchQuery: (query) => set({ searchQuery: query }),
  mobileMenuOpen: false,
  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
  toggleMobileMenu: () => set((s) => ({ mobileMenuOpen: !s.mobileMenuOpen })),
  selectedArticle: null,
  setSelectedArticle: (article) => set({ selectedArticle: article }),
}));
