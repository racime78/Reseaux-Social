import { create } from "zustand";
import {
  recupererPostsAPI,
  creerPostAPI,
  likerPostAPI,
  unlikerPostAPI,
} from "../api/posts.api";
import { useAuthStore } from "./auth.store";

export const usePostsStore = create((set, get) => ({
  posts: [],
  page: 1,
  totalPages: 1,
  chargement: false,
  erreur: null,
  creationEnCours: false,

  chargerPosts: async () => {
    try {
      set({ chargement: true, erreur: null });

      const { page } = get();
      const res = await recupererPostsAPI({ page, limit: 5 });

      set((state) => ({
        posts: [...state.posts, ...(res.data?.posts || [])],
        page: state.page + 1,
        totalPages: res.data?.totalPages || 1,
        chargement: false,
      }));
    } catch (e) {
      set({
        chargement: false,
        erreur: e?.response?.data?.message || "Erreur chargement feed",
      });
    }
  },

  creerPost: async (content) => {
    try {
      set({ creationEnCours: true, erreur: null });

      const res = await creerPostAPI({ content });

      let postCree =
        res.data?.post || res.data?.nouveauPost || res.data?.data?.post || res.data;

      if (postCree?.post) postCree = postCree.post;

      const authState = useAuthStore.getState();
      const wrap = authState.utilisateur;
      const user = wrap?.utilisateur || wrap;

      const userOk = user && user.username;

      if (postCree && userOk) {
        const auteur = postCree.author;
        const auteurADejaUsername =
          typeof auteur === "object" && !!auteur?.username;

        if (!auteurADejaUsername) {
          postCree = {
            ...postCree,
            author: {
              _id: user._id || user.id,
              username: user.username,
              avatar: user.avatar || "",
            },
          };
        }
      }

      if (!postCree || !postCree.content) {
        throw new Error("Réponse post invalide");
      }

      set((state) => ({
        posts: [postCree, ...state.posts],
        creationEnCours: false,
      }));

      return true;
    } catch (e) {
      set({
        creationEnCours: false,
        erreur: e?.response?.data?.message || e.message || "Erreur création post",
      });
      return false;
    }
  },

  // 👍 LIKE
  likerPost: async (postId) => {
    try {
      const res = await likerPostAPI(postId);

      const postMisAJour =
        res.data?.post || res.data?.data?.post || res.data;

      if (!postMisAJour) return false;

      set((state) => ({
        posts: state.posts.map((p) =>
          p._id === postId ? postMisAJour : p
        ),
      }));

      return true;

    } catch (e) {
      set({
        erreur: e?.response?.data?.message || "Erreur like",
      });
      return false;
    }
  },

  // 👎 UNLIKE
  unlikerPost: async (postId) => {
    try {
      const res = await unlikerPostAPI(postId);

      const postMisAJour =
        res.data?.post || res.data?.data?.post || res.data;

      if (!postMisAJour) return false;

      set((state) => ({
        posts: state.posts.map((p) =>
          p._id === postId ? postMisAJour : p
        ),
      }));

      return true;

    } catch (e) {
      set({
        erreur: e?.response?.data?.message || "Erreur unlike",
      });
      return false;
    }
  },

  resetFeed: () => set({ posts: [], page: 1, totalPages: 1 }),
}));