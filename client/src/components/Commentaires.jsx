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
  <div className="mt-5 border-t border-blue-100 pt-4">
    <div className="flex items-center justify-between">
      <p className="text-sm font-semibold text-blue-900">
        Commentaires{" "}
        <span className="text-slate-400">
          ({commentaires.length})
        </span>
      </p>

      {commentaires.length > 2 && (
        <button
          type="button"
          onClick={() => setOuvert((v) => !v)}
          className="text-sm text-blue-600 hover:text-blue-800 transition"
        >
          {ouvert ? "Réduire" : "Voir tout"}
        </button>
      )}
    </div>

    <form onSubmit={handleSubmit} className="flex gap-3 mt-4">
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Ajouter un commentaire..."
        className="flex-1 rounded-xl border-2 border-blue-100 bg-blue-50 px-4 py-2.5 text-sm outline-none focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-200 transition"
        maxLength={280}
      />

      <button
        type="submit"
        className="bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-blue-800 transition"
      >
        Envoyer
      </button>
    </form>

    {chargement && (
      <p className="text-sm mt-4 text-slate-500">
        Chargement...
      </p>
    )}

    {!chargement && commentaires.length === 0 && (
      <p className="text-sm text-slate-400 mt-4">
        Aucun commentaire
      </p>
    )}

    <div className="mt-4 space-y-2">
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