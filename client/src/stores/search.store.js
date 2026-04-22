import { create } from "zustand";
import { rechercherGlobalAPI } from "../api/search.api";

export const useSearchStore = create((set) => ({
  users: [],
  posts: [],
  chargement: false,

  rechercher: async (q) => {
    try {
      set({ chargement: true });

      const res = await rechercherGlobalAPI(q);

      set({
        users: res.data.users || [],
        posts: res.data.posts || [],
        chargement: false
      });
    } catch {
      set({ users: [], posts: [], chargement: false });
    }
  },

  reset: () => set({ users: [], posts: [] })
}));