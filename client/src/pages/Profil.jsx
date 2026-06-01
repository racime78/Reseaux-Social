import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import EnTeteProfil from "../components/EnTeteProfil";
import ListePostsProfil from "../components/ListePostsProfil";
import { useProfilStore } from "../stores/profil.store";
import { useAuthStore } from "../stores/auth.store";
import { modifierProfil } from "../api/utilisateurs.api";

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

  const utilisateurState = useAuthStore((state) => state.utilisateur);
  const utilisateur = utilisateurState?.utilisateur || utilisateurState;

  const [editMode, setEditMode] = useState(false);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (id) {
      chargerProfil(id);
    }
    return () => {
      viderProfil();
    };
  }, [id, chargerProfil, viderProfil]);

  const idUtilisateurConnecte = utilisateur?._id || utilisateur?.id;

  const estMonProfil =
    String(idUtilisateurConnecte) === String(id);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {};
    if (form.username) data.username = form.username;
    if (form.email) data.email = form.email;
    if (form.password) data.password = form.password;

    try {
      await modifierProfil(data);
      setMessage("Profil mis à jour ✅");
      setEditMode(false);
      chargerProfil(id);
    } catch (e) {
      setMessage("Erreur lors de la modification");
    }
  };

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

        <Link
          to="/"
          className="inline-block px-4 py-2 rounded-xl border bg-white hover:bg-blue-700 hover:text-white transition shadow-sm"
        >
          ← Retour
        </Link>

        <EnTeteProfil
          profil={profil}
          estMonProfil={estMonProfil}
          auClicSuivre={() => suivre(id)}
          auClicNePlusSuivre={() => nePlusSuivre(id)}
        />

        {estMonProfil && (
          <button
            onClick={() => setEditMode((v) => !v)}
            className="px-4 py-2 rounded-xl bg-blue-700 text-white font-medium hover:bg-blue-800 transition shadow-md"
          >
            Modifier mon profil
          </button>
        )}

        {editMode && (
          <form
            onSubmit={handleSubmit}
            className="bg-gray-50 p-4 rounded-xl space-y-3"
          >
            <input
              placeholder="Nouveau username"
              onChange={(e) =>
                setForm({ ...form, username: e.target.value })
              }
              className="border p-2 w-full rounded"
            />

            <input
              placeholder="Nouvel email"
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              className="border p-2 w-full rounded"
            />

            <input
              type="password"
              placeholder="Nouveau mot de passe"
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
              className="border p-2 w-full rounded"
            />

            <button className="px-4 py-2 rounded-xl bg-blue-700 text-white font-medium hover:bg-blue-800 transition shadow-md">
              Enregistrer
            </button>
          </form>
        )}

        {message && (
          <p className="text-green-600 text-sm">{message}</p>
        )}

        <ListePostsProfil posts={postsProfil} />
      </div>
    </div>
  );
}