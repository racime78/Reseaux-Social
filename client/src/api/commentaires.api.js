import { api } from "./axios";

export const recupererCommentairesAPI = (postId, page = 1, limit = 10) =>
  api.get(`/posts/${postId}/comments?page=${page}&limit=${limit}`);

export const creerCommentaireAPI = (postId, data) =>
  api.post(`/posts/${postId}/comments`, data);

export const supprimerCommentaireAPI = (commentaireId) =>
  api.delete(`/comments/${commentaireId}`);

export const modifierCommentaireAPI = (commentaireId, data) =>
  api.put(`/comments/${commentaireId}`, data);