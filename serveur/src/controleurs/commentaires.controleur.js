import mongoose from "mongoose";
import { Post } from "../modeles/post.modele.js";
import { Commentaire } from "../modeles/commentaire.modele.js";

export async function listerCommentaires(req, res, next) {
  try {
    const postId = req.params.postId;

    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ succes: false, message: "ID post invalide" });
    }

    const commentaires = await Commentaire.find({ post: postId })
      .populate("author", "username avatar")
      .sort({ createdAt: -1 });

    return res.status(200).json({ succes: true, commentaires });
  } catch (e) {
    next(e);
  }
}

export async function creerCommentaire(req, res, next) {
  try {
    const postId = req.params.postId;
    const { content } = req.body;

    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ succes: false, message: "ID post invalide" });
    }

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ succes: false, message: "Post introuvable" });

    const commentaire = await Commentaire.create({
      post: postId,
      author: req.utilisateur.id,
      content
    });

    // cohérence : on push l'id du commentaire dans le post
    post.comments.push(commentaire._id);
    await post.save();

    return res.status(201).json({ succes: true, commentaire });
  } catch (e) {
    next(e);
  }
}

export async function supprimerCommentaire(req, res, next) {
  try {
    const commentaireId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(commentaireId)) {
      return res.status(400).json({ succes: false, message: "ID commentaire invalide" });
    }

    const commentaire = await Commentaire.findById(commentaireId);
    if (!commentaire) return res.status(404).json({ succes: false, message: "Commentaire introuvable" });

    // sécurité : seul l'auteur peut supprimer
    if (commentaire.author.toString() !== req.utilisateur.id) {
      return res.status(403).json({ succes: false, message: "Action interdite" });
    }

    // retirer l'id du commentaire du post
    await Post.updateOne(
      { _id: commentaire.post },
      { $pull: { comments: commentaire._id } }
    );

    await commentaire.deleteOne();

    return res.status(200).json({ succes: true, message: "Commentaire supprimé" });
  } catch (e) {
    next(e);
  }
}
