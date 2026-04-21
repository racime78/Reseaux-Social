import { Router } from "express";
import { authentifier } from "../middlewares/authentification.middleware.js";
import { valider } from "../middlewares/validation.middleware.js";
import { schemaCreerCommentaire, schemaModifierCommentaire } from "../validations/commentaire.validation.js";
import {
  listerCommentaires,
  creerCommentaire,
  supprimerCommentaire,
  modifierCommentaire
} from "../controleurs/commentaires.controleur.js";

export const routesCommentaires = Router();

routesCommentaires.get("/posts/:postId/comments", authentifier, listerCommentaires);
routesCommentaires.post("/posts/:postId/comments", authentifier, valider(schemaCreerCommentaire), creerCommentaire);

routesCommentaires.put("/comments/:id", authentifier, valider(schemaModifierCommentaire), modifierCommentaire);

routesCommentaires.delete("/comments/:id", authentifier, supprimerCommentaire);