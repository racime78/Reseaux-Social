import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { usePostsStore } from "../stores/posts.store";
import { useAuthStore } from "../stores/auth.store";
import FormulairePost from "../components/FormulairePost";
import PostCard from "../components/PostCard";
import SearchBar from "../components/SearchBar";

function extraireUser(authState) {
  const u = authState?.utilisateur;
  return u?.utilisateur || u || null;
}

export default function Feed() {
  const authState = useAuthStore((state) => state);
  const utilisateur = extraireUser(authState);
  const { deconnexion } = useAuthStore();

  const {
    posts,
    chargerPosts,
    resetFeed,
    page,
    totalPages,
    chargement,
  } = usePostsStore();

  const [mode, setMode] = useState("all");
  const aDejaCharge = useRef(false);

  useEffect(() => {
    resetFeed();
    aDejaCharge.current = false;
  }, [mode]);

  useEffect(() => {
    if (aDejaCharge.current) return;
    aDejaCharge.current = true;
    chargerPosts(mode);
  }, [mode]);

  const idUtilisateurConnecte =
    utilisateur?._id || utilisateur?.id || null;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-2xl mx-auto p-4">
        
        {/* HEADER */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Mon Réseaux Social</h1>

          <div className="flex items-center gap-3">
            {idUtilisateurConnecte && (
              <Link
                to={`/profil/${idUtilisateurConnecte}`}
                className="border rounded-lg px-3 py-2 bg-white hover:bg-black hover:text-white transition"
              >
                Mon profil
              </Link>
            )}

            <button
              onClick={deconnexion}
              className="border rounded-lg px-3 py-2 bg-white hover:bg-black hover:text-white transition"
            >
              Déconnexion
            </button>
          </div>
        </div>

        {/* 🔍 SEARCH BAR */}
        <div className="mb-4">
          <SearchBar />
        </div>

        {/* 🔥 MODE SWITCH */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setMode("all")}
            className={`px-4 py-2 rounded-lg border transition ${
              mode === "all"
                ? "bg-black text-white"
                : "bg-white text-black hover:bg-black hover:text-white"
            }`}
          >
            Tous les posts
          </button>

          <button
            onClick={() => setMode("following")}
            className={`px-4 py-2 rounded-lg border transition ${
              mode === "following"
                ? "bg-black text-white"
                : "bg-white text-black hover:bg-black hover:text-white"
            }`}
          >
            Suivis
          </button>
        </div>

        <FormulairePost />

        <InfiniteScroll
          dataLength={posts.length}
          next={() => chargerPosts(mode)}
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