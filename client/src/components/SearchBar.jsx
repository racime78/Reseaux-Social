import { useEffect, useRef, useState } from "react";
import { api } from "../api/axios";
import { Link } from "react-router-dom";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [resultats, setResultats] = useState(null);
  const [ouvert, setOuvert] = useState(false);
  const wrapperRef = useRef(null);

  // 🔹 debounce + recherche
  useEffect(() => {
    const delay = setTimeout(async () => {
      try {
        const res = await api.get(`/search?q=${query}`);
        setResultats(res.data);
      } catch {
        setResultats(null);
      }
    }, 300);

    return () => clearTimeout(delay);
  }, [query]);

  // 🔹 fermer si clique extérieur
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOuvert(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fermer = () => {
    setOuvert(false);
    setQuery("");
  };

  return (
  <div ref={wrapperRef} className="relative w-full">
    <input
      type="text"
      placeholder="Rechercher un utilisateur ou un post..."
      value={query}
      onFocus={() => setOuvert(true)}
      onChange={(e) => setQuery(e.target.value)}
      className="w-full rounded-2xl border-2 border-blue-100 bg-white px-5 py-3 outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-200 transition shadow-sm"
    />

    {ouvert && resultats && (
      <div className="absolute bg-white border border-blue-100 shadow-xl rounded-2xl w-full mt-2 p-3 z-50">

        {resultats.users?.length > 0 && (
          <>
            <p className="text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wide">
              Utilisateurs
            </p>

            {resultats.users.map((u) => (
              <Link
                key={u._id}
                to={`/profil/${u._id}`}
                onClick={fermer}
              >
                <div className="flex items-center gap-3 p-3 hover:bg-blue-50 rounded-xl transition cursor-pointer">
                  <div className="w-10 h-10 bg-blue-100 rounded-full" />

                  <span className="text-sm font-medium text-slate-700">
                    {u.username}
                  </span>
                </div>
              </Link>
            ))}
          </>
        )}

        {resultats.posts?.length > 0 && (
          <>
            <p className="text-xs font-semibold text-slate-400 mt-4 mb-2 uppercase tracking-wide">
              Posts
            </p>

            {resultats.posts.map((p) => (
              <Link
                key={p._id}
                to={`/post/${p._id}`}
                onClick={fermer}
              >
                <div className="p-3 hover:bg-blue-50 rounded-xl transition cursor-pointer">
                  <p className="text-sm text-slate-700 truncate">
                    {p.content}
                  </p>

                  <p className="text-xs text-slate-400 mt-1">
                    {p.author?.username}
                  </p>
                </div>
              </Link>
            ))}
          </>
        )}

        {resultats.users?.length === 0 &&
          resultats.posts?.length === 0 && (
            <p className="text-sm text-slate-400 p-2">
              Aucun résultat
            </p>
          )}
      </div>
    )}
  </div>
);
}