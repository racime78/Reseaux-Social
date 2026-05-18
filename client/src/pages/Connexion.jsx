import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/auth.store";
import "./Connexion.css";

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
  <div className="connexion-page">
    <form onSubmit={soumettre} className="connexion-card">
      <div className="connexion-header">
        <h1>Connexion</h1>
        <p>Connectez-vous à votre compte</p>
      </div>

      <div className="connexion-input-group">
        <input
          placeholder="Identifiant (email ou username)"
          value={identifiant}
          onChange={(e) => setIdentifiant(e.target.value)}
          type="text"
          required
        />
      </div>

      <div className="connexion-input-group">
        <input
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          required
        />
      </div>

      {erreur && <p className="connexion-erreur">{erreur}</p>}

      <button disabled={chargement} className="connexion-btn">
        {chargement ? "Connexion..." : "Se connecter"}
      </button>

      <p className="connexion-footer">
        Pas de compte ?{" "}
        <Link to="/inscription">Inscription</Link>
      </p>
    </form>
  </div>
);
}