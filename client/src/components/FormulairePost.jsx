import { useState } from "react";
import { usePostsStore } from "../stores/posts.store";

export default function FormulairePost() {
  const [content, setContent] = useState("");
  const { creerPost, creationEnCours, erreur } = usePostsStore();

  const soumettre = async (e) => {
    e.preventDefault();

    const texte = content.trim();
    if (!texte) return;

    const ok = await creerPost(texte);
    if (ok) setContent("");
  };

  return (
    <form onSubmit={soumettre} className="bg-white rounded-xl shadow p-4 mb-4">
      <textarea
        className="w-full border rounded-lg p-2 resize-none"
        rows={3}
        placeholder="Quoi de neuf ?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      {erreur && <p className="text-sm text-red-600 mt-2">{erreur}</p>}

      <div className="flex justify-end mt-2">
        <button
          type="submit"
          className="bg-black text-white rounded-lg px-4 py-2 disabled:opacity-50"
          disabled={creationEnCours}
        >
          {creationEnCours ? "Publication..." : "Publier"}
        </button>
      </div>
    </form>
  );
}
