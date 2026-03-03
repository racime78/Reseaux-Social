import jwt from "jsonwebtoken";

export function authentifier(req, res, next) {
  const entete = req.headers.authorization;

  if (!entete || !entete.startsWith("Bearer ")) {
    return res.status(401).json({ succes: false, message: "Token manquant" });
  }

  const token = entete.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.utilisateur = { id: payload.id };
    next();
  } catch (e) {
    return res.status(401).json({ succes: false, message: "Token invalide" });
  }
}
