import { create } from "zustand";
import { connexionAPI, inscriptionAPI, moiAPI } from "../api/auth.api";

export const useAuthStore = create((set, get) => ({
  token: localStorage.getItem("token") || null,
  utilisateur: null,
  chargement: false,
  erreur: null,

  // --- utils ---
  setToken: (token) => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
    set({ token });
  },

  // --- récupérer l'utilisateur connecté ---
  me: async () => {
    try {
      set({ chargement: true, erreur: null });
      const res = await moiAPI();
      set({ utilisateur: res.data, chargement: false });
      return res.data;
    } catch (e) {
      get().deconnexion();
      set({ chargement: false, erreur: "Token invalide" });
      return null;
    }
  },

  // --- connexion ---
  connexion: async ({ identifiant, password }) => {
    try {
      set({ chargement: true, erreur: null });

      const res = await connexionAPI({ identifiant, password });

      // 🔑 TON BACKEND RENVOIE tokenAcces
      const token =
        res.data?.tokenAcces;

      if (!token) {
        throw new Error("Token introuvable dans la réponse");
      }

      get().setToken(token);
      await get().me();

      set({ chargement: false });
      return true;
    } catch (e) {
      set({
        chargement: false,
        erreur: e?.response?.data?.message || e.message || "Erreur connexion",
      });
      return false;
    }
  },

  // --- inscription (PAS de token renvoyé) ---
  inscription: async (payload) => {
    try {
      set({ chargement: true, erreur: null });

      await inscriptionAPI(payload);

      // pas de token ici → redirection vers /connexion
      set({ chargement: false });
      return true;
    } catch (e) {
      set({
        chargement: false,
        erreur: e?.response?.data?.message || "Erreur inscription",
      });
      return false;
    }
  },

  // --- logout ---
  deconnexion: () => {
    localStorage.removeItem("token");
    set({ token: null, utilisateur: null, erreur: null });
  },
}));
