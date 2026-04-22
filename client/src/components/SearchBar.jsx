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
    <div ref={wrapperRef} className="relative w-full max-w-md">
      <input
        type="text"
        placeholder="Rechercher..."
        value={query}
        onFocus={() => setOuvert(true)}
        onChange={(e) => setQuery(e.target.value)}
        className="border w-full px-3 py-2 rounded focus:ring-2 focus:ring-black/20 outline-none"
      />

      {ouvert && resultats && (
        <div className="absolute bg-white shadow-xl rounded w-full mt-1 p-3 z-50 border">

          {/* USERS */}
          {resultats.users?.length > 0 && (
            <>
              <p className="text-xs font-semibold text-gray-500 mb-2">
                Utilisateurs
              </p>
              {resultats.users.map((u) => (
                <Link
                  key={u._id}
                  to={`/profil/${u._id}`}
                  onClick={fermer}
                >
                  <div className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded cursor-pointer">
                    <div className="w-8 h-8 bg-gray-300 rounded-full" />
                    <span className="text-sm">{u.username}</span>
                  </div>
                </Link>
              ))}
            </>
          )}

          {/* POSTS */}
          {resultats.posts?.length > 0 && (
            <>
              <p className="text-xs font-semibold text-gray-500 mt-3 mb-2">
                Posts
              </p>
              {resultats.posts.map((p) => (
                <Link
                  key={p._id}
                  to={`/post/${p._id}`}
                  onClick={fermer}
                >
                  <div className="p-2 hover:bg-gray-100 rounded cursor-pointer">
                    <p className="text-sm truncate">
                      {p.content}
                    </p>
                    <p className="text-xs text-gray-500">
                      {p.author?.username}
                    </p>
                  </div>
                </Link>
              ))}
            </>
          )}

          {/* Rien trouvé */}
          {resultats.users?.length === 0 &&
            resultats.posts?.length === 0 && (
              <p className="text-sm text-gray-500">
                Aucun résultat
              </p>
            )}
        </div>
      )}
    </div>
  );
}