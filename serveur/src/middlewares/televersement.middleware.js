import multer from "multer";

const stockage = multer.memoryStorage();

function filtreImage(req, fichier, cb) {
  if (!fichier.mimetype.startsWith("image/")) {
    cb(new Error("Seules les images sont autorisées"), false);
  }
  cb(null, true);
}

export const televerserImage = multer({
  storage: stockage,
  fileFilter: filtreImage,
  limits: { fileSize: 5 * 1024 * 1024 }
});
