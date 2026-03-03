import { api } from "./axios";

export const recupererPostsAPI = ({ page = 1, limit = 5 }) =>
  api.get(`/posts?page=${page}&limit=${limit}`);

export const creerPostAPI = (data) =>
  api.post("/posts", data);

export const likerPostAPI = (postId) => api.post(`/posts/${postId}/like`);

export const unlikerPostAPI = (postId) => api.delete(`/posts/${postId}/unlike`);

