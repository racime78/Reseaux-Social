import dotenv from "dotenv";
dotenv.config();
console.log("CLOUDINARY_URL chargé ?", process.env.CLOUDINARY_URL ? "OUI" : "NON");

import { app } from "./app.js";
import { connecterBaseDeDonnees } from "./src/configuration/baseDeDonnees.js";

const PORT = process.env.PORT || 4000;

await connecterBaseDeDonnees(process.env.MONGODB_URI);

app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
});
