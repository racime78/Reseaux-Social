import { Router } from "express";
import { inscription, connexion, moi } from "../controleurs/auth.controleur.js";
import { valider } from "../middlewares/validation.middleware.js";
import { authentifier } from "../middlewares/authentification.middleware.js";
import { schemaInscription, schemaConnexion } from "../validations/auth.validation.js";

export const routesAuth = Router();

routesAuth.post("/auth/inscription", valider(schemaInscription), inscription);
routesAuth.post("/auth/connexion", valider(schemaConnexion), connexion);
routesAuth.get("/auth/moi", authentifier, moi);
