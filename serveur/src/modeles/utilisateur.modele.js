import mongoose from "mongoose";

const schemaUtilisateur = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, lowercase: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true }, // hash bcrypt

    avatar: { type: String, default: "" }, // URL Cloudinary
    coverPhoto: { type: String, default: "" },

    bio: { type: String, default: "" },
    location: { type: String, default: "" },
    website: { type: String, default: "" },

    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
  },
  { timestamps: true }
);

export const User = mongoose.model("User", schemaUtilisateur);
