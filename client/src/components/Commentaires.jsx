import { useEffect, useMemo, useState } from "react";
import { useCommentairesStore } from "../stores/commentaires.store";
import CommentaireItem from "./CommentaireItem";

export default function Commentaires({ postId }) {
  const chargerCommentaires = useCommentairesStore((s) => s.chargerCommentaires);
  const creerCommentaire = useCommentairesStore((s) => s.creerCommentaire);
  const commentairesParPost = useCommentairesStore((s) => s.commentairesParPost);

  const bloc = commentairesParPost[postId];
  const chargement = bloc?.chargement || false;

  const commentaires = useMemo(() => bloc?.items || [], [bloc]);

  const [content, setContent] = useState("");
  const [ouvert, setOuvert] = useState(false);

  useEffect(() => {
    if (!postId) return;
    chargerCommentaires(postId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const texte = content.trim();
    if (!texte) return;

    await creerCommentaire(postId, texte);
    setContent("");
    setOuvert(true); // UX : quand tu commentes, on ouvre
  };

  const affiches = ouvert ? commentaires : commentaires.slice(0, 2);

  return (
    <div className="mt-4 border-t pt-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium">
          Commentaires <span className="text-gray-500">({commentaires.length})</span>
        </p>

        {commentaires.length > 2 && (
          <button
            type="button"
            onClick={() => setOuvert((v) => !v)}
            className="text-sm text-[#1c8755] hover:underline"
          >
            {ouvert ? "Réduire" : "Voir tout"}
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2 mt-3">
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Ajouter un commentaire..."
          className="border rounded-lg px-3 py-2 flex-1 text-sm outline-none focus:ring-2 focus:ring-[#1c8755]/30"
          maxLength={280}
        />
        <button
          type="submit"
          className="bg-[#1c8755] text-white px-4 py-2 rounded-lg text-sm hover:opacity-90"
        >
          Envoyer
        </button>
      </form>

      {chargement && <p className="text-sm mt-3">Chargement...</p>}

      {!chargement && commentaires.length === 0 && (
        <p className="text-sm text-gray-500 mt-3">Aucun commentaire</p>
      )}

      <div className="mt-3 space-y-1">
        {affiches.map((commentaire) => (
          <CommentaireItem
            key={commentaire._id}
            postId={postId}
            commentaire={commentaire}
          />
        ))}
      </div>
    </div>
  );
}