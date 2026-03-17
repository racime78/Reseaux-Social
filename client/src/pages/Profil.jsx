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

  const estMonProfil = utilisateur?._id === id;

  if (chargement) {
    return (
      <div className="max-w-3xl mx-auto py-8 px-4">
        <div className="text-center text-gray-600">Chargement du profil...</div>
      </div>
    );
  }

  if (erreur) {
    return (
      <div className="max-w-3xl mx-auto py-8 px-4">
        <div className="bg-red-100 text-red-700 p-4 rounded-xl">{erreur}</div>
      </div>
    );
  }

  if (!profil) {
    return (
      <div className="max-w-3xl mx-auto py-8 px-4">
        <div className="text-center text-gray-600">Profil introuvable.</div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <EnTeteProfil
        profil={profil}
        estMonProfil={estMonProfil}
        auClicSuivre={() => suivre(id)}
        auClicNePlusSuivre={() => nePlusSuivre(id)}
      />

      <ListePostsProfil posts={postsProfil} />
    </div>
  );
}