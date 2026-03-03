export function ok(res, donnees = {}) {
  return res.status(200).json({ succes: true, ...donnees });
}

export function erreur(res, statut = 400, message = "Erreur", details = null) {
  return res.status(statut).json({ succes: false, message, details });
}
