import { create } from "zustand";
import {
  recupererProfilUtilisateur,
  suivreUtilisateur,
  nePlusSuivreUtilisateur,
} from "../api/utilisateurs.api";

export const useProfilStore = create((set, get) => ({
  profil: null,
  postsProfil: [],
  chargement: false,
  erreur: null,

  async chargerProfil(id) {
    set({ chargement: true, erreur: null });

    try {
      const reponse = await recupererProfilUtilisateur(id);

      set({
        profil: reponse.utilisateur || null,
        postsProfil: reponse.posts || [],
        chargement: false,
      });
    } catch (error) {
      set({
        erreur:
          error.response?.data?.message ||
          "Impossible de charger le profil.",
        chargement: false,
      });
    }
  },

  async suivre(id) {
    try {
      await suivreUtilisateur(id);

      const profilActuel = get().profil;
      if (!profilActuel) return;

      set({
        profil: {
          ...profilActuel,
          estSuiviParMoi: true,
          followersCount: (profilActuel.followersCount || 0) + 1,
        },
      });
    } catch (error) {
      set({
        erreur:
          error.response?.data?.message ||
          "Impossible de suivre cet utilisateur.",
      });
    }
  },

  async nePlusSuivre(id) {
    try {
      await nePlusSuivreUtilisateur(id);

      const profilActuel = get().profil;
      if (!profilActuel) return;

      set({
        profil: {
          ...profilActuel,
          estSuiviParMoi: false,
          followersCount: Math.max((profilActuel.followersCount || 1) - 1, 0),
        },
      });
    } catch (error) {
      set({
        erreur:
          error.response?.data?.message ||
          "Impossible de ne plus suivre cet utilisateur.",
      });
    }
  },

  viderProfil() {
    set({
      profil: null,
      postsProfil: [],
      chargement: false,
      erreur: null,
    });
  },
}));