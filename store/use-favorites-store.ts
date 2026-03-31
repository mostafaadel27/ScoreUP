"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FavoritesStore {
  favoriteTeams: number[];
  addFavorite: (teamId: number) => void;
  removeFavorite: (teamId: number) => void;
  isFavorite: (teamId: number) => boolean;
  toggleFavorite: (teamId: number) => void;
}

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      favoriteTeams: [],
      addFavorite: (teamId) =>
        set((state) => ({
          favoriteTeams: state.favoriteTeams.includes(teamId)
            ? state.favoriteTeams
            : [...state.favoriteTeams, teamId],
        })),
      removeFavorite: (teamId) =>
        set((state) => ({
          favoriteTeams: state.favoriteTeams.filter((id) => id !== teamId),
        })),
      isFavorite: (teamId) => get().favoriteTeams.includes(teamId),
      toggleFavorite: (teamId) => {
        const { favoriteTeams } = get();
        if (favoriteTeams.includes(teamId)) {
          set({ favoriteTeams: favoriteTeams.filter((id) => id !== teamId) });
        } else {
          set({ favoriteTeams: [...favoriteTeams, teamId] });
        }
      },
    }),
    {
      name: "scoreup-favorites",
    }
  )
);
