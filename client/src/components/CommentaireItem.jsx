import { useState } from "react";
import { useAuthStore } from "../stores/auth.store";
import { useCommentairesStore } from "../stores/commentaires.store";
import { modifierCommentaireAPI } from "../api/commentaires.api";

export default function CommentaireItem({ postId, commentaire }) {
  const supprimerCommentaire = useCommentairesStore((s) => s.supprimerCommentaire);
  const chargerCommentaires = useCommentairesStore((s) => s.chargerCommentaires);

  const auth = useAuthStore((s) => s.utilisateur);
  const user = auth?.utilisateur || auth;
  const userId = user?._id || user?.id;

  const auteurId = commentaire?.author?._id || commentaire?.author;
  const peutModifier = userId && String(auteurId) === String(userId);
  const peutSupprimer = peutModifier;

  const username = commentaire?.author?.username || "Utilisateur";

  const [modeEdition, setModeEdition] = useState(false);
  const [nouveauContenu, setNouveauContenu] = useState(commentaire?.content || "");

  const sauvegarder = async () => {
    const texte = nouveauContenu.trim();
    if (!texte) return;

    const res = await modifierCommentaireAPI(commentaire._id, { content: texte });

    if (res.data?.succes) {
      setModeEdition(false);
      chargerCommentaires(postId); // recharge pour synchro
    }
  };

  return (
  <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4">
    <div className="flex justify-between items-start gap-4">
      <div className="flex-1">
        <p className="text-sm font-semibold text-blue-900">
          {username}
        </p>

        {modeEdition ? (
          <div className="mt-2">
            <textarea
              value={nouveauContenu}
              onChange={(e) =>
                setNouveauContenu(e.target.value)
              }
              className="w-full rounded-xl border-2 border-blue-100 bg-white px-3 py-2 text-sm outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-200 transition resize-none"
              maxLength={280}
              rows={3}
            />

            <div className="flex gap-2 mt-3">
              <button
                onClick={sauvegarder}
                className="bg-blue-700 text-white px-3 py-1.5 rounded-lg text-xs hover:bg-blue-800 transition"
              >
                Enregistrer
              </button>

              <button
                onClick={() => {
                  setModeEdition(false);
                  setNouveauContenu(
                    commentaire?.content || ""
                  );
                }}
                className="border border-blue-100 bg-white px-3 py-1.5 rounded-lg text-xs hover:bg-blue-50 transition"
              >
                Annuler
              </button>
            </div>
          </div>
        ) : (
          <p className="text-sm text-slate-700 whitespace-pre-wrap mt-1">
            {commentaire?.content}
          </p>
        )}
      </div>

      {peutModifier && !modeEdition && (
        <div className="flex flex-col items-end gap-1">
          <button
            onClick={() => setModeEdition(true)}
            className="text-xs text-blue-600 hover:text-blue-800 transition"
            type="button"
          >
            Modifier
          </button>

          {peutSupprimer && (
            <button
              onClick={() =>
                supprimerCommentaire(
                  postId,
                  commentaire._id
                )
              }
              className="text-xs text-red-500 hover:text-red-700 transition"
              type="button"
            >
              Supprimer
            </button>
          )}
        </div>
      )}
    </div>
  </div>
);
  }