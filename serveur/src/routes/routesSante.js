import { Router } from "express";
import { ok } from "../utilitaires/reponse.js";

export const routesSante = Router();

routesSante.get("/sante", (req, res) => {
  return ok(res, { ok: true, message: "API opérationnelle" });
});
