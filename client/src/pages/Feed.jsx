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
    <div className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-4 py-6">
        
        {/* HEADER */}
        <div className="bg-white border border-blue-100 rounded-3xl shadow-sm p-5 mb-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-blue-900">
                Mon Réseau Social
              </h1>

              <p className="text-slate-500 mt-1">
                Partagez vos idées avec votre communauté
              </p>
            </div>

            <div className="flex items-center gap-3">
              {idUtilisateurConnecte && (
                <Link
                  to={`/profil/${idUtilisateurConnecte}`}
                  className="px-4 py-2 rounded-xl bg-blue-100 text-blue-700 font-medium hover:bg-blue-200 transition"
                >
                  Mon profil
                </Link>
              )}

              <button
                onClick={deconnexion}
                className="px-4 py-2 rounded-xl bg-blue-700 text-white font-medium hover:bg-blue-800 transition shadow-md"
              >
                Déconnexion
              </button>
            </div>
          </div>
        </div>

        {/* SEARCH */}
        <div className="mb-5">
          <SearchBar />
        </div>

        {/* SWITCH */}
        <div className="flex gap-3 mb-5">
          <button
            onClick={() => setMode("all")}
            className={`px-5 py-2.5 rounded-xl font-medium transition ${
              mode === "all"
                ? "bg-blue-700 text-white shadow-md"
                : "bg-white border border-blue-100 text-slate-700 hover:bg-blue-50"
            }`}
          >
            Tous les posts
          </button>

          <button
            onClick={() => setMode("following")}
            className={`px-5 py-2.5 rounded-xl font-medium transition ${
              mode === "following"
                ? "bg-blue-700 text-white shadow-md"
                : "bg-white border border-blue-100 text-slate-700 hover:bg-blue-50"
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
          loader={
            <p className="text-center py-6 text-slate-500">
              Chargement...
            </p>
          }
        >
          <div className="space-y-5">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        </InfiniteScroll>

        {!chargement && posts.length === 0 && (
          <div className="bg-white border border-blue-100 rounded-2xl p-8 text-center text-slate-500 mt-10">
            Aucun post à afficher
          </div>
        )}
      </div>
    </div>
  );
}