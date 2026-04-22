import { User } from "../modeles/utilisateur.modele.js";
import { Post } from "../modeles/post.modele.js";

export async function rechercher(req, res, next) {
  try {
    const q = (req.query.q || "").trim();
    const regex = new RegExp(q, "i");

    // 🔹 Si vide → afficher 5 récents
    if (!q) {
      const [users, posts] = await Promise.all([
        User.find()
          .select("username avatar")
          .sort({ createdAt: -1 })
          .limit(5),

        Post.find()
          .populate("author", "username avatar")
          .sort({ createdAt: -1 })
          .limit(5),
      ]);

      return res.status(200).json({
        succes: true,
        users,
        posts,
      });
    }

    // 🔹 Recherche réelle
    const [users, posts] = await Promise.all([
      User.find({ username: regex })
        .select("username avatar")
        .sort({ username: 1 })
        .limit(5),

      Post.find({ content: regex })
        .populate("author", "username avatar")
        .sort({ createdAt: -1 })
        .limit(5),
    ]);

    return res.status(200).json({
      succes: true,
      users,
      posts,
    });
  } catch (e) {
    next(e);
  }
}