import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/auth.store";

export default function Connexion() {
  const navigate = useNavigate();
  const { connexion, chargement, erreur } = useAuthStore();

  const [identifiant, setIdentifiant] = useState("");
  const [password, setPassword] = useState("");

  const soumettre = async (e) => {
    e.preventDefault();
    const ok = await connexion({ identifiant, password });
    if (ok) navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100">
      <form
        onSubmit={soumettre}
        className="w-full max-w-md bg-white rounded-xl shadow p-6 space-y-4"
      >
        <h1 className="text-2xl font-bold">Connexion</h1>

        <input
          className="w-full border rounded-lg p-2"
          placeholder="Identifiant (email ou username)"
          value={identifiant}
          onChange={(e) => setIdentifiant(e.target.value)}
          type="text"
          required
        />

        <input
          className="w-full border rounded-lg p-2"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          required
        />

        {erreur && <p className="text-sm text-red-600">{erreur}</p>}

        <button
          className="w-full bg-black text-white rounded-lg p-2 disabled:opacity-50"
          disabled={chargement}
        >
          {chargement ? "Connexion..." : "Se connecter"}
        </button>

        <p className="text-sm">
          Pas de compte ?{" "}
          <Link className="underline" to="/inscription">
            Inscription
          </Link>
        </p>
      </form>
    </div>
  );
}