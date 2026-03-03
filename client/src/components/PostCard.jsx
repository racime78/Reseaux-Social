import { useAuthStore } from "../stores/auth.store";
import { usePostsStore } from "../stores/posts.store";

export default function PostCard({ post }) {
  const { likerPost, unlikerPost } = usePostsStore();

  const auth = useAuthStore((s) => s.utilisateur);
  const user = auth?.utilisateur || auth;
  const userId = user?._id || user?.id;

  // 🔥 Normalisation des likes (string ou objet)
  const likes = post.likes || [];

  const likesIds = likes
    .map((l) => (typeof l === "string" ? l : l?._id || l?.id))
    .filter(Boolean);

  const aLike = userId ? likesIds.includes(userId) : false;

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
  } else if (auteurId === userId) {
    nomAuteur = user?.username;
  }

  return (
    <div className="bg-white rounded-xl shadow p-4 mb-4">
      <div className="flex items-center justify-between">
        <p className="font-semibold">{nomAuteur}</p>
        <p className="text-sm text-gray-500">
          {new Date(post.createdAt).toLocaleString()}
        </p>
      </div>

      <p className="mt-2">{post.content}</p>

      <div className="flex items-center gap-3 mt-3">
        <button
          onClick={toggleLike}
          className={`border rounded-lg px-3 py-1 transition ${
            aLike
              ? "bg-black text-white"
              : "bg-white text-black"
          }`}
        >
          {aLike ? "Unlike" : "Like"}
        </button>

        <span className="text-sm text-gray-600">
          {likesIds.length} like{likesIds.length > 1 ? "s" : ""}
        </span>
      </div>
    </div>
  );
}
