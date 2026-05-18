import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuthStore } from "../stores/auth.store";
import { usePostsStore } from "../stores/posts.store";
import Commentaires from "./Commentaires";

function extraireUserDepuisAuthState(authState) {
  const u = authState?.utilisateur;
  return u?.utilisateur || u || authState?.user || authState?.moi || null;
}

function extraireUserIdDepuisJWT() {
  try {
    const token = localStorage.getItem("token");
    if (!token) return null;

    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const payloadJson = atob(parts[1].replace(/-/g, "+").replace(/_/g, "/"));
    const payload = JSON.parse(payloadJson);

    return payload.id || payload._id || payload.userId || payload.sub || null;
  } catch {
    return null;
  }
}

export default function PostCard({ post }) {
  const {
    likerPost,
    unlikerPost,
    modifierPost,
    supprimerPost
  } = usePostsStore();

  const authState = useAuthStore((s) => s);
  const user = extraireUserDepuisAuthState(authState);

  const userId =
    (user?._id || user?.id || extraireUserIdDepuisJWT())?.toString?.() || null;

  if (!post) return null;

  const likes = post.likes || [];

  const aLike =
    !!userId &&
    likes.some((l) => {
      const id =
        typeof l === "string"
          ? l
          : l?._id?.toString?.() || l?.id?.toString?.();
      return id?.toString?.() === userId;
    });

  const toggleLike = async () => {
    if (!post?._id) return;
    if (aLike) await unlikerPost(post._id);
    else await likerPost(post._id);
  };

  const auteur = post.author;
  const auteurId =
    typeof auteur === "object" ? auteur?._id || auteur?.id : auteur;

  let nomAuteur = "Utilisateur";
  if (typeof auteur === "object" && auteur?.username) {
    nomAuteur = auteur.username;
  } else if (userId && auteurId && auteurId.toString?.() === userId) {
    nomAuteur = user?.username || "Moi";
  }

  const estAuteur =
    userId && auteurId && auteurId.toString?.() === userId;

  const [modeEdition, setModeEdition] = useState(false);
  const [nouveauContenu, setNouveauContenu] = useState(post.content || "");

  const sauvegarder = async () => {
    const texte = nouveauContenu.trim();
    if (!texte) return;

    const ok = await modifierPost(post._id, texte);
    if (ok) setModeEdition(false);
  };

  const handleSuppression = async () => {
    const confirmation = window.confirm(
      "Es-tu sûr de vouloir supprimer ce post ? Cette action est irréversible."
    );

    if (!confirmation) return;

    await supprimerPost(post._id);
  };

  return (
  <div className="bg-white border border-blue-100 rounded-3xl shadow-sm p-5 transition hover:shadow-md">
    
    
    <div className="flex items-start justify-between gap-4">
      <div>
        {auteurId ? (
          <Link
            to={`/profil/${auteurId}`}
            className="text-lg font-semibold text-blue-900 hover:text-blue-700 transition"
          >
            {nomAuteur}
          </Link>
        ) : (
          <p className="text-lg font-semibold text-blue-900">
            {nomAuteur}
          </p>
        )}

        <p className="text-sm text-slate-400 mt-1">
          {post.createdAt
            ? new Date(post.createdAt).toLocaleString()
            : ""}
        </p>
      </div>
    </div>

    
    {estAuteur && !modeEdition && (
      <div className="mt-3 flex gap-4">
        <button
          onClick={() => setModeEdition(true)}
          className="text-sm font-medium text-blue-600 hover:text-blue-800 transition"
        >
          Modifier
        </button>

        <button
          onClick={handleSuppression}
          className="text-sm font-medium text-red-500 hover:text-red-700 transition"
        >
          Supprimer
        </button>
      </div>
    )}

   
    {modeEdition ? (
      <div className="mt-4">
        <textarea
          className="w-full rounded-2xl border-2 border-blue-100 bg-blue-50 px-4 py-3 outline-none focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-200 transition resize-none"
          value={nouveauContenu}
          onChange={(e) => setNouveauContenu(e.target.value)}
          rows={4}
        />

        <div className="flex gap-3 mt-3">
          <button
            onClick={sauvegarder}
            className="bg-blue-700 text-white px-4 py-2 rounded-xl hover:bg-blue-800 transition shadow-sm"
          >
            Enregistrer
          </button>

          <button
            onClick={() => {
              setModeEdition(false);
              setNouveauContenu(post.content || "");
            }}
            className="border border-blue-100 bg-white px-4 py-2 rounded-xl hover:bg-blue-50 transition"
          >
            Annuler
          </button>
        </div>
      </div>
    ) : (
      post.content && (
        <p className="mt-4 text-slate-700 whitespace-pre-wrap leading-relaxed">
          {post.content}
        </p>
      )
    )}

    
    {post.image && (
      <img
        src={post.image}
        alt="post"
        className="mt-4 rounded-2xl w-full border border-blue-100"
      />
    )}

    
    <div className="flex items-center gap-4 mt-5">
      <button
        onClick={toggleLike}
        type="button"
        className={`px-4 py-2 rounded-xl font-medium transition ${
          aLike
            ? "bg-blue-700 text-white hover:bg-blue-800"
            : "bg-blue-50 text-blue-700 hover:bg-blue-100"
        }`}
      >
        {aLike ? "Unlike" : "Like"}
      </button>

      <span className="text-sm text-slate-500">
        {likes.length} like{likes.length > 1 ? "s" : ""}
      </span>
    </div>

    
    {post._id && (
      <div className="mt-5">
        <Commentaires postId={post._id} />
      </div>
    )}
  </div>
);
}