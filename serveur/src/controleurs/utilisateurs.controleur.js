import mongoose from "mongoose";
import { User } from "../modeles/utilisateur.modele.js";

export async function suivreUtilisateur(req, res, next) {
  try {
    const cibleId = req.params.id;
    const moiId = req.utilisateur.id;

    if (!mongoose.Types.ObjectId.isValid(cibleId)) {
      return res.status(400).json({ succes: false, message: "ID utilisateur invalide" });
    }

    if (cibleId === moiId) {
      return res.status(400).json({ succes: false, message: "Tu peux pas te suivre toi-même" });
    }

    const cible = await User.findById(cibleId);
    if (!cible) return res.status(404).json({ succes: false, message: "Utilisateur introuvable" });

    // ✅ ajoute sans doublon
    await User.updateOne({ _id: moiId }, { $addToSet: { following: cibleId } });
    await User.updateOne({ _id: cibleId }, { $addToSet: { followers: moiId } });

    return res.status(200).json({ succes: true, message: "Suivi effectué" });
  } catch (e) {
    next(e);
  }
}

export async function nePlusSuivreUtilisateur(req, res, next) {
  try {
    const cibleId = req.params.id;
    const moiId = req.utilisateur.id;

    if (!mongoose.Types.ObjectId.isValid(cibleId)) {
      return res.status(400).json({ succes: false, message: "ID utilisateur invalide" });
    }

    if (cibleId === moiId) {
      return res.status(400).json({ succes: false, message: "Action invalide" });
    }

    const cible = await User.findById(cibleId);
    if (!cible) return res.status(404).json({ succes: false, message: "Utilisateur introuvable" });

    await User.updateOne({ _id: moiId }, { $pull: { following: cibleId } });
    await User.updateOne({ _id: cibleId }, { $pull: { followers: moiId } });

    return res.status(200).json({ succes: true, message: "Désabonnement effectué" });
  } catch (e) {
    next(e);
  }
}

export async function listerFollowers(req, res, next) {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId).populate("followers", "username avatar bio");
    if (!user) return res.status(404).json({ succes: false, message: "Utilisateur introuvable" });

    return res.status(200).json({ succes: true, followers: user.followers });
  } catch (e) {
    next(e);
  }
}

export async function listerFollowing(req, res, next) {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId).populate("following", "username avatar bio");
    if (!user) return res.status(404).json({ succes: false, message: "Utilisateur introuvable" });

    return res.status(200).json({ succes: true, following: user.following });
  } catch (e) {
    next(e);
  }
}

export async function rechercherUtilisateurs(req, res, next) {
  try {
    const search = (req.query.search || "").trim();
    if (!search) {
      return res.status(200).json({ succes: true, utilisateurs: [] });
    }

    const regex = new RegExp(search, "i");

    const utilisateurs = await User.find({
      _id: { $ne: req.utilisateur.id },
      $or: [{ username: regex }, { email: regex }]
    })
      .select("username avatar bio location website followers following createdAt")
      .limit(20);

    return res.status(200).json({ succes: true, utilisateurs });
  } catch (e) {
    next(e);
  }
}

export async function profilPublic(req, res, next) {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId)
      .select("username avatar coverPhoto bio location website followers following createdAt")
      .populate("followers", "username avatar")
      .populate("following", "username avatar");

    if (!user) return res.status(404).json({ succes: false, message: "Utilisateur introuvable" });

    return res.status(200).json({ succes: true, utilisateur: user });
  } catch (e) {
    next(e);
  }
}
