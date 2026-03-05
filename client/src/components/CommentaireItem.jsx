import { useAuthStore } from "../stores/auth.store";
import { useCommentairesStore } from "../stores/commentaires.store";

export default function CommentaireItem({ postId, commentaire }) {
  const supprimerCommentaire = useCommentairesStore((s) => s.supprimerCommentaire);

  const auth = useAuthStore((s) => s.utilisateur);
  const user = auth?.utilisateur || auth;
  const userId = user?._id || user?.id;

  const auteurId = commentaire?.author?._id || commentaire?.author;
  const peutSupprimer = userId && String(auteurId) === String(userId);

  const username = commentaire?.author?.username || "Utilisateur";

  return (
    <div className="flex justify-between items-start border-b py-2">
      <div>
        <p className="text-sm font-semibold">{username}</p>
        <p className="text-sm text-gray-700 whitespace-pre-wrap">{commentaire?.content}</p>
      </div>

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
  );
}