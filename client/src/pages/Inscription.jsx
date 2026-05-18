import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/auth.store";

export default function Inscription() {
  const navigate = useNavigate();
  const { inscription, chargement, erreur } = useAuthStore();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmationPassword, setConfirmationPassword] = useState("");

  const soumettre = async (e) => {
    e.preventDefault();

    const ok = await inscription({
      username,
      email,
      password,
      confirmationPassword,
    });

    if (ok) navigate("/connexion");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <form
        onSubmit={soumettre}
        className="w-full max-w-md bg-white border border-blue-100 rounded-3xl shadow-lg p-8 space-y-5"
      >
        <div className="text-center">
          <h1 className="text-3xl font-bold text-blue-900">
            Inscription
          </h1>

          <p className="text-slate-500 mt-2">
            Créez votre compte gratuitement
          </p>
        </div>

        <input
          className="w-full rounded-xl border-2 border-blue-100 bg-blue-50 px-4 py-3 outline-none focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-200 transition"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          className="w-full rounded-xl border-2 border-blue-100 bg-blue-50 px-4 py-3 outline-none focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-200 transition"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          required
        />

        <input
          className="w-full rounded-xl border-2 border-blue-100 bg-blue-50 px-4 py-3 outline-none focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-200 transition"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          required
        />

        <input
          className="w-full rounded-xl border-2 border-blue-100 bg-blue-50 px-4 py-3 outline-none focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-200 transition"
          placeholder="Confirmer mot de passe"
          value={confirmationPassword}
          onChange={(e) =>
            setConfirmationPassword(e.target.value)
          }
          type="password"
          minLength={8}
          required
        />

        {erreur && (
          <p className="text-sm text-red-600">{erreur}</p>
        )}

        <button
          className="w-full rounded-xl bg-blue-700 py-3 font-semibold text-white transition hover:bg-blue-800 shadow-md disabled:opacity-50"
          disabled={chargement}
        >
          {chargement ? "Création..." : "Créer mon compte"}
        </button>

        <p className="text-sm text-center text-slate-500">
          Déjà un compte ?{" "}
          <Link
            className="text-blue-700 font-medium hover:underline"
            to="/connexion"
          >
            Connexion
          </Link>
        </p>
      </form>
    </div>
  );
}