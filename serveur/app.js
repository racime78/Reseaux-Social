import express from "express";
import cors from "cors";

import { routesPosts } from "./src/routes/routesPosts.js";
import { routesSante } from "./src/routes/routesSante.js";
import { routesAuth } from "./src/routes/routesAuth.js";
import { routesCommentaires } from "./src/routes/routesCommentaires.js";
import { routesUtilisateurs } from "./src/routes/routesUtilisateurs.js";

import { gestionErreurs } from "./src/middlewares/gestionErreurs.middleware.js";

export const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", routesPosts);
app.use("/api", routesSante);
app.use("/api", routesAuth);
app.use("/api", routesCommentaires);
app.use("/api", routesUtilisateurs);

app.use(gestionErreurs);
