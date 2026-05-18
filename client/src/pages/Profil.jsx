import { useEffect } from "react";
import { useParams } from "react-router-dom";
import EnTeteProfil from "../components/EnTeteProfil";
import ListePostsProfil from "../components/ListePostsProfil";
import { useProfilStore } from "../stores/profil.store";
import { useAuthStore } from "../stores/auth.store";

export default function Profil() {
  const { id } = useParams();

  const {
    profil,
    postsProfil,
    chargement,
    erreur,
    chargerProfil,
    suivre,
    nePlusSuivre,
    viderProfil,
  } = useProfilStore();

  const utilisateur = useAuthStore((state) => state.utilisateur);

  useEffect(() => {
    if (id) {
      chargerProfil(id);
    }

    return () => {
      viderProfil();
    };
  }, [id, chargerProfil, viderProfil]);

  const idUtilisateurConnecte = utilisateur?._id || utilisateur?.id;
  const estMonProfil = String(idUtilisateurConnecte) === String(id);

  if (chargement) {
    return (
      <div className="max-w-3xl mx-auto py-10 px-4">
        <div className="bg-white border border-blue-100 rounded-3xl p-8 text-center text-slate-500 shadow-sm">
          Chargement du profil...
        </div>
      </div>
    );
  }

  if (erreur) {
    return (
      <div className="max-w-3xl mx-auto py-10 px-4">
        <div className="bg-red-50 border border-red-200 text-red-700 p-5 rounded-2xl">
          {erreur}
        </div>
      </div>
    );
  }

  if (!profil) {
    return (
      <div className="max-w-3xl mx-auto py-10 px-4">
        <div className="bg-white border border-blue-100 rounded-3xl p-8 text-center text-slate-500 shadow-sm">
          Profil introuvable.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto py-8 px-4 space-y-5">
        <EnTeteProfil
          profil={profil}
          estMonProfil={estMonProfil}
          auClicSuivre={() => suivre(id)}
          auClicNePlusSuivre={() => nePlusSuivre(id)}
        />

        <ListePostsProfil posts={postsProfil} />
      </div>
    </div>
  );
}