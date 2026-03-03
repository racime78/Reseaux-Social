import { erreur } from "../utilitaires/reponse.js";

export function gestionErreurs(err, req, res, next) {
  console.error("❌ Erreur API:", err);

  return res.status(500).json({
    succes: false,
    message: "Erreur serveur",
    details: err?.message || String(err)
  });
}
