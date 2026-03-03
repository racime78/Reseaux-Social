import { api } from "./axios";

export const inscriptionAPI = (data) => api.post("/auth/inscription", data);
export const connexionAPI = (data) => api.post("/auth/connexion", data);
export const moiAPI = () => api.get("/auth/moi");
