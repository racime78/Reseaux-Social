import { useEffect, useRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { usePostsStore } from "../stores/posts.store";
import { useAuthStore } from "../stores/auth.store";
import FormulairePost from "../components/FormulairePost";
import PostCard from "../components/PostCard";

export default function Feed() {
  const utilisateur = useAuthStore((state) => state.utilisateur);
  const { deconnexion } = useAuthStore();

  const { posts, chargerPosts, page, totalPages, chargement } = usePostsStore();

  console.log(utilisateur);

  // évite le double appel en dev (React.StrictMode)
  const aDejaCharge = useRef(false);

  useEffect(() => {
    if (aDejaCharge.current) return;
    aDejaCharge.current = true;
    chargerPosts();
  }, [chargerPosts]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-2xl mx-auto p-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Feed</h1>
          <button
            onClick={deconnexion}
            className="border rounded-lg px-3 py-2 bg-white"
          >
            Déconnexion
          </button>
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