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
    <div className="flex justify-between items-start border-b py-2">
      <div className="flex-1">
        <p className="text-sm font-semibold">{username}</p>

        {modeEdition ? (
          <div className="mt-1">
            <textarea
              value={nouveauContenu}
              onChange={(e) => setNouveauContenu(e.target.value)}
              className="w-full border rounded p-2 text-sm"
              maxLength={280}
            />

            <div className="flex gap-2 mt-2">
              <button
                onClick={sauvegarder}
                className="bg-black text-white px-3 py-1 rounded text-xs"
              >
                Enregistrer
              </button>

              <button
                onClick={() => {
                  setModeEdition(false);
                  setNouveauContenu(commentaire?.content || "");
                }}
                className="border px-3 py-1 rounded text-xs"
              >
                Annuler
              </button>
            </div>
          </div>
        ) : (
          <p className="text-sm text-gray-700 whitespace-pre-wrap">
            {commentaire?.content}
          </p>
        )}
      </div>

      {peutModifier && !modeEdition && (
        <div className="flex flex-col items-end gap-1 ml-3">
          <button
            onClick={() => setModeEdition(true)}
            className="text-xs text-blue-500 hover:underline"
            type="button"
          >
            Modifier
          </button>

          {peutSupprimer && (
            <button
              onClick={() => supprimerCommentaire(postId, commentaire._id)}
              className="text-xs text-red-500 hover:underline"
              type="button"
            >
              Supprimer
            </button>
          )}
        </div>
      )}
    </div>
  );
}