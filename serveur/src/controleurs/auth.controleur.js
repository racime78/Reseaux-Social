import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../modeles/utilisateur.modele.js";

function creerTokenAcces(userId) {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
}

export async function inscription(req, res, next) {
  try {
    const { username, email, password } = req.body;

    const existeDeja = await User.findOne({
      $or: [{ email: email.toLowerCase() }, { username: username.toLowerCase() }]
    });

    if (existeDeja) {
      return res.status(409).json({ succes: false, message: "Email ou username déjà utilisé" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({
      username: username.toLowerCase(),
      email: email.toLowerCase(),
      password: passwordHash,
      avatar: "",
      coverPhoto: "",
      bio: "",
      location: "",
      website: "",
      followers: [],
      following: []
    });

    return res.status(201).json({
      succes: true,
      message: "Inscription réussie",
      utilisateur: {
        id: user._id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        createdAt: user.createdAt
      }
    });
  } catch (e) {
    next(e);
  }
}

export async function connexion(req, res, next) {
  try {
    const { identifiant, password } = req.body;
    const ident = identifiant.toLowerCase();

    const user = await User.findOne({
      $or: [{ email: ident }, { username: ident }]
    });

    if (!user) return res.status(401).json({ succes: false, message: "Identifiants invalides" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ succes: false, message: "Identifiants invalides" });

    const tokenAcces = creerTokenAcces(user._id.toString());

    return res.status(200).json({
      succes: true,
      message: "Connexion réussie",
      tokenAcces,
      utilisateur: {
        id: user._id,
        username: user.username,
        email: user.email,
        avatar: user.avatar
      }
    });
  } catch (e) {
    next(e);
  }
}

export async function moi(req, res, next) {
  try {
    const user = await User.findById(req.utilisateur.id).select("-password");
    if (!user) return res.status(404).json({ succes: false, message: "Utilisateur introuvable" });

    return res.status(200).json({ succes: true, utilisateur: user });
  } catch (e) {
    next(e);
  }
}
