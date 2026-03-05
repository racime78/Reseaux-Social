import { Post } from "../modeles/post.modele.js";
import mongoose from "mongoose";
import { User } from "../modeles/utilisateur.modele.js";

export async function creerPost(req, res, next) {
  try {
    const { content } = req.body;

    const post = await Post.create({
      author: req.utilisateur.id,
      content,
      image: "",
      likes: [],
      comments: []
    });

    const postPopule = await Post.findById(post._id)
      .populate("author", "username avatar");

    return res.status(201).json({ succes: true, post: postPopule });

  } catch (e) {
    next(e);
  }
}

export async function listerPosts(req, res, next) {
  try {
    const page = Math.max(parseInt(req.query.page || "1", 10), 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit || "20", 10), 1), 50);
    const skip = (page - 1) * limit;

    const moi = await User.findById(req.utilisateur.id).select("following");
    if (!moi) return res.status(404).json({ succes: false, message: "Utilisateur introuvable" });

    const auteurs = [req.utilisateur.id, ...moi.following];

    const filtre = { author: { $in: auteurs } };

    const [posts, total] = await Promise.all([
      Post.find(filtre)
        .populate("author", "username avatar")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Post.countDocuments(filtre)
    ]);

    const totalPages = Math.ceil(total / limit);

    return res.status(200).json({
      succes: true,
      page,
      limit,
      total,
      totalPages,
      posts
    });

  } catch (e) {
    next(e);
  }
}

export async function detailPost(req, res, next) {
  try {
    const post = await Post.findById(req.params.id)
      .populate("author", "username avatar");

    if (!post)
      return res.status(404).json({ succes: false, message: "Post introuvable" });

    return res.status(200).json({ succes: true, post });

  } catch (e) {
    next(e);
  }
}

export async function modifierPost(req, res, next) {
  try {
    const { content } = req.body;

    const post = await Post.findById(req.params.id);
    if (!post)
      return res.status(404).json({ succes: false, message: "Post introuvable" });

    if (post.author.toString() !== req.utilisateur.id) {
      return res.status(403).json({ succes: false, message: "Action interdite" });
    }

    post.content = content;
    await post.save();

    const postPopule = await Post.findById(post._id)
      .populate("author", "username avatar");

    return res.status(200).json({ succes: true, post: postPopule });

  } catch (e) {
    next(e);
  }
}

export async function supprimerPost(req, res, next) {
  try {
    const post = await Post.findById(req.params.id);

    if (!post)
      return res.status(404).json({ succes: false, message: "Post introuvable" });

    if (post.author.toString() !== req.utilisateur.id) {
      return res.status(403).json({ succes: false, message: "Action interdite" });
    }

    await post.deleteOne();

    return res.status(200).json({
      succes: true,
      message: "Post supprimé"
    });

  } catch (e) {
    next(e);
  }
}

export async function likerPost(req, res, next) {
  try {
    const postId = req.params.id;
    const userId = req.utilisateur.id;

    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ succes: false, message: "ID post invalide" });
    }

    const post = await Post.findById(postId);
    if (!post)
      return res.status(404).json({ succes: false, message: "Post introuvable" });

    const dejaLike = post.likes.some((id) => id.toString() === userId);

    if (!dejaLike) {
      post.likes.push(userId);
      await post.save();
    }

    const postMisAJour = await Post.findById(postId)
      .populate("author", "username avatar");

    return res.status(200).json({
      succes: true,
      post: postMisAJour
    });

  } catch (e) {
    next(e);
  }
}

export async function retirerLike(req, res, next) {
  try {
    const postId = req.params.id;
    const userId = req.utilisateur.id;

    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ succes: false, message: "ID post invalide" });
    }

    const post = await Post.findById(postId);
    if (!post)
      return res.status(404).json({ succes: false, message: "Post introuvable" });

    post.likes = post.likes.filter((id) => id.toString() !== userId);
    await post.save();

    const postMisAJour = await Post.findById(postId)
      .populate("author", "username avatar");

    return res.status(200).json({
      succes: true,
      post: postMisAJour
    });

  } catch (e) {
    next(e);
  }
}