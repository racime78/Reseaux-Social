import { Router } from "express";
import { authentifier } from "../middlewares/authentification.middleware.js";
import { rechercher } from "../controleurs/search.controleur.js";

export const routesSearch = Router();

routesSearch.get("/search", authentifier, rechercher);