import { create } from "zustand";
import { api } from "../api/axios"; // ✅ chez toi c'est un export nommé

export const useCommentairesStore = create((set, get) => ({
  commentairesParPost: {}, // { [postId]: { items: [], chargement: false } }

  _initPost: (postId) => {
    const state = get();
    if (state.commentairesParPost[postId]) return;

    set((s) => ({
      commentairesParPost: {
        ...s.commentairesParPost,
        [postId]: { items: [], chargement: false },
      },
    }));
  },

  chargerCommentaires: async (postId) => {
    get()._initPost(postId);

    set((s) => ({
      commentairesParPost: {
        ...s.commentairesParPost,
        [postId]: { ...s.commentairesParPost[postId], chargement: true },
      },
    }));

    try {
      const { data } = await api.get(`/posts/${postId}/comments`);

      if (data?.succes) {
        set((s) => ({
          commentairesParPost: {
            ...s.commentairesParPost,
            [postId]: { items: data.commentaires || [], chargement: false },
          },
        }));
      } else {
        set((s) => ({
          commentairesParPost: {
            ...s.commentairesParPost,
            [postId]: { ...s.commentairesParPost[postId], chargement: false },
          },
        }));
      }
    } catch (e) {
      console.error(e);
      set((s) => ({
        commentairesParPost: {
          ...s.commentairesParPost,
          [postId]: { ...s.commentairesParPost[postId], chargement: false },
        },
      }));
    }
  },

  creerCommentaire: async (postId, content) => {
    const texte = content?.trim();
    if (!texte) return;

    get()._initPost(postId);

    try {
      const { data } = await api.post(`/posts/${postId}/comments`, {
        content: texte,
      });

      if (data?.succes && data?.commentaire) {
        set((s) => ({
          commentairesParPost: {
            ...s.commentairesParPost,
            [postId]: {
              ...s.commentairesParPost[postId],
              items: [data.commentaire, ...(s.commentairesParPost[postId]?.items || [])],
            },
          },
        }));
      }
    } catch (e) {
      console.error(e);
    }
  },

  supprimerCommentaire: async (postId, commentaireId) => {
    get()._initPost(postId);

    try {
      const { data } = await api.delete(`/comments/${commentaireId}`);

      if (data?.succes) {
        set((s) => ({
          commentairesParPost: {
            ...s.commentairesParPost,
            [postId]: {
              ...s.commentairesParPost[postId],
              items: (s.commentairesParPost[postId]?.items || []).filter(
                (c) => c._id !== commentaireId
              ),
            },
          },
        }));
      }
    } catch (e) {
      console.error(e);
    }
  },
}));