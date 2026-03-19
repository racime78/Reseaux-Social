import { Link } from "react-router-dom";
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
  const { likerPost, unlikerPost } = usePostsStore();

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

    if (aLike) {
      await unlikerPost(post._id);
    } else {
      await likerPost(post._id);
    }
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

  return (
    <div className="bg-white rounded-xl shadow p-4 mb-4">
      <div className="flex items-center justify-between">
        {auteurId ? (
          <Link
            to={`/profil/${auteurId}`}
            className="font-semibold hover:underline"
          >
            {nomAuteur}
          </Link>
        ) : (
          <p className="font-semibold">{nomAuteur}</p>
        )}

        <p className="text-sm text-gray-500">
          {post.createdAt ? new Date(post.createdAt).toLocaleString() : ""}
        </p>
      </div>

      {post.content && <p className="mt-2 whitespace-pre-wrap">{post.content}</p>}

      {post.image && (
        <img src={post.image} alt="post" className="mt-3 rounded-lg w-full" />
      )}

      <div className="flex items-center gap-3 mt-3">
        <button
          onClick={toggleLike}
          type="button"
          className={`border rounded-lg px-3 py-1 transition cursor-pointer ${
            aLike
              ? "bg-black text-white hover:bg-white hover:text-black"
              : "bg-white text-black hover:bg-black hover:text-white"
          }`}
        >
          {aLike ? "Unlike" : "Like"}
        </button>

        <span className="text-sm text-gray-600">
          {likes.length} like{likes.length > 1 ? "s" : ""}
        </span>
      </div>

      {post._id && (
        <div className="mt-4">
          <Commentaires postId={post._id} />
        </div>
      )}
    </div>
  );
}