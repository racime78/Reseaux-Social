import mongoose from "mongoose";

const schemaPost = new mongoose.Schema(
  {
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true, trim: true, maxlength: 280 },
    image: { type: String, default: "" }, // on l'utilisera en 3B

    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }]
  },
  { timestamps: true }
);

export const Post = mongoose.model("Post", schemaPost);
