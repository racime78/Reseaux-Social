import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NOM,
  api_key: process.env.CLOUDINARY_CLE,
  api_secret: process.env.CLOUDINARY_SECRET
});

export function envoyerImageCloudinary(buffer) {
  return new Promise((resolve, reject) => {
    const flux = cloudinary.uploader.upload_stream(
      { folder: "reseau-social/posts" },
      (erreur, resultat) => {
        if (erreur) return reject(erreur);
        resolve(resultat.secure_url);
      }
    );

    streamifier.createReadStream(buffer).pipe(flux);
  });
}
