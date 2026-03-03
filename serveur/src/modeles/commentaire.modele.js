import mongoose from "mongoose";

const schemaCommentaire = new mongoose.Schema(
  {
    post: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true, trim: true, maxlength: 280 }
  },
  { timestamps: true }
);

export const Commentaire = mongoose.model("Commentaire", schemaCommentaire);
