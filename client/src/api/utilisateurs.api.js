import { api } from "./axios";

export async function recupererProfilUtilisateur(id) {
  const { data } = await api.get(`/users/${id}`);
  return data;
}

export async function recupererFollowersUtilisateur(id) {
  const { data } = await api.get(`/users/${id}/followers`);
  return data;
}

export async function recupererFollowingUtilisateur(id) {
  const { data } = await api.get(`/users/${id}/following`);
  return data;
}

export async function suivreUtilisateur(id) {
  const { data } = await api.post(`/users/${id}/follow`);
  return data;
}

export async function nePlusSuivreUtilisateur(id) {
  const { data } = await api.delete(`/users/${id}/unfollow`);
  return data;
}