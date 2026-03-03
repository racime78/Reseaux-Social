import mongoose from "mongoose";

export async function connecterBaseDeDonnees(uri) {
  try {
    await mongoose.connect(uri);
    console.log("✅ MongoDB connecté");
  } catch (erreur) {
    console.error("❌ Erreur connexion MongoDB:", erreur.message);
    process.exit(1);
  }
}
