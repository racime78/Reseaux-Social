import { Router } from "express";
import { authentifier } from "../middlewares/authentification.middleware.js";
import { valider } from "../middlewares/validation.middleware.js";
import { schemaCreerPost, schemaModifierPost } from "../validations/post.validation.js";
import { creerPost, listerPosts, detailPost, modifierPost, supprimerPost } from "../controleurs/posts.controleur.js";
import { likerPost, retirerLike } from "../controleurs/posts.controleur.js";

export const routesPosts = Router();

routesPosts.get("/posts", authentifier, listerPosts);
routesPosts.get("/posts/:id", authentifier, detailPost);

routesPosts.post("/posts", authentifier, valider(schemaCreerPost), creerPost);

routesPosts.put("/posts/:id", authentifier, valider(schemaModifierPost), modifierPost);
routesPosts.delete("/posts/:id", authentifier, supprimerPost);

routesPosts.post("/posts/:id/like", authentifier, likerPost);
routesPosts.delete("/posts/:id/unlike", authentifier, retirerLike);
