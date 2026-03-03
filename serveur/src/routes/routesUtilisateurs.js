import { Router } from "express";
import { authentifier } from "../middlewares/authentification.middleware.js";
import { suivreUtilisateur, nePlusSuivreUtilisateur, listerFollowers, listerFollowing } from "../controleurs/utilisateurs.controleur.js";
import { rechercherUtilisateurs, profilPublic } from "../controleurs/utilisateurs.controleur.js";

export const routesUtilisateurs = Router();

routesUtilisateurs.post("/users/:id/follow", authentifier, suivreUtilisateur);
routesUtilisateurs.delete("/users/:id/unfollow", authentifier, nePlusSuivreUtilisateur);

routesUtilisateurs.get("/users/:id/followers", authentifier, listerFollowers);
routesUtilisateurs.get("/users/:id/following", authentifier, listerFollowing);

routesUtilisateurs.get("/users", authentifier, rechercherUtilisateurs);
routesUtilisateurs.get("/users/:id", authentifier, profilPublic);

