import { api } from "./axios";

export const rechercherGlobalAPI = (q) =>
  api.get(`/search?q=${q}`);