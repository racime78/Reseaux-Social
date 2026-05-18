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
  <form
    onSubmit={soumettre}
    className="bg-white border border-blue-100 rounded-3xl shadow-sm p-5 mb-5"
  >
    <textarea
      className="w-full rounded-2xl border-2 border-blue-100 bg-blue-50 px-4 py-3 resize-none outline-none focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-200 transition"
      rows={4}
      placeholder="Quoi de neuf ?"
      value={content}
      onChange={(e) => setContent(e.target.value)}
    />

    {erreur && (
      <p className="text-sm text-red-600 mt-3">{erreur}</p>
    )}

    <div className="flex justify-end mt-4">
      <button
        type="submit"
        className="bg-blue-700 text-white rounded-xl px-5 py-2.5 font-medium hover:bg-blue-800 transition shadow-sm disabled:opacity-50"
        disabled={creationEnCours}
      >
        {creationEnCours ? "Publication..." : "Publier"}
      </button>
    </div>
  </form>
);
}