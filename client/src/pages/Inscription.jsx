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
    const ok = await inscription({ username, email, password, confirmationPassword });
    if (ok) navigate("/connexion");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100">
      <form onSubmit={soumettre} className="w-full max-w-md bg-white rounded-xl shadow p-6 space-y-4">
        <h1 className="text-2xl font-bold">Inscription</h1>

        <input
          className="w-full border rounded-lg p-2"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          className="w-full border rounded-lg p-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
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

        <input
          className="w-full border rounded-lg p-2"
          placeholder="Confirmer mot de passe"
          value={confirmationPassword}
          onChange={(e) => setConfirmationPassword(e.target.value)}
          type="password"
          required
        />

        {erreur && <p className="text-sm text-red-600">{erreur}</p>}

        <button className="w-full bg-black text-white rounded-lg p-2 disabled:opacity-50" disabled={chargement}>
          {chargement ? "Création..." : "Créer mon compte"}
        </button>

        <p className="text-sm">
          Déjà un compte ? <Link className="underline" to="/connexion">Connexion</Link>
        </p>
      </form>
    </div>
  );
}
