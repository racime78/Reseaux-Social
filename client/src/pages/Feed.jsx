import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { usePostsStore } from "../stores/posts.store";
import { useAuthStore } from "../stores/auth.store";
import FormulairePost from "../components/FormulairePost";
import PostCard from "../components/PostCard";

export default function Feed() {
  const utilisateur = useAuthStore((state) => state.utilisateur);
  const { deconnexion } = useAuthStore();

  const { posts, chargerPosts, page, totalPages, chargement } = usePostsStore();

  const aDejaCharge = useRef(false);

  useEffect(() => {
    if (aDejaCharge.current) return;
    aDejaCharge.current = true;
    chargerPosts();
  }, [chargerPosts]);

  const idUtilisateurConnecte = utilisateur?._id || utilisateur?.id;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-2xl mx-auto p-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Feed</h1>

          <div className="flex items-center gap-3">
            {idUtilisateurConnecte && (
              <Link
                to={`/profil/${idUtilisateurConnecte}`}
                className="border rounded-lg px-3 py-2 bg-white"
              >
                Mon profil
              </Link>
            )}

            <button
              onClick={deconnexion}
              className="border rounded-lg px-3 py-2 bg-white"
            >
              Déconnexion
            </button>
          </div>
        </div>

        <FormulairePost />

        <InfiniteScroll
          dataLength={posts.length}
          next={chargerPosts}
          hasMore={page <= totalPages}
          loader={<p className="text-center py-4">Chargement...</p>}
        >
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </InfiniteScroll>

        {!chargement && posts.length === 0 && (
          <p className="text-center text-gray-500 mt-10">
            Aucun post à afficher
          </p>
        )}
      </div>
    </div>
  );
}