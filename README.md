# 🧠 Réseau Social V1

📅 Version actuelle : 03/03/2026  
🚀 Projet Fullstack – Node.js / Express / MongoDB / React (Vite)

---

## 🎯 Objectif du projet

Développer un réseau social fonctionnel avec :

- Authentification JWT
- Création de posts texte
- Feed personnalisé
- Likes / Unlike
- Pagination + Infinite Scroll
- Architecture scalable pour futures évolutions

Ce projet sert de base solide pour une V2 (commentaires avancés, profils enrichis, images, etc.).

---

# 🏗️ Stack Technique

## 🔐 Backend
- Node.js
- Express
- MongoDB
- Mongoose
- JWT
- Joi (validation)

## 🎨 Frontend
- React (Vite)
- React Router DOM
- Zustand (state management)
- Axios (API calls)
- Tailwind CSS
- react-infinite-scroll-component

---

# 📂 Architecture

## Backend
serveur/
├── serveur.js
├── app.js
└── src/
├── modeles/
├── controleurs/
├── routes/
├── middlewares/
└── validations/

## Frontend
client/src/
├── api/
├── stores/
├── pages/
├── components/
└── routes/
---

# 🔐 Fonctionnalités Implémentées (V1)

## Authentification
- Inscription
- Connexion
- Route protégée `/auth/moi`
- Interceptor Axios pour JWT
- Persistance token via localStorage

## Posts
- Création de post
- Feed personnalisé (posts perso + following)
- Pagination backend
- Infinite scroll frontend
- Affichage auteur dynamique (populate/non populate)

## Likes
- Like / Unlike
- Prévention des doublons
- Mise à jour dynamique UI

---

# ⚙️ Installation

## Backend

```bash
cd serveur
npm install
npm run dev

Le backend tourne sur :
http://localhost:4000

Le front-end tourne sur :
http://localhost:5173
```
---

# 🔄 État du projet au 03/03/2026

✅ Auth complète (Inscription,Authentification,Connexion)
✅ Feed paginé
✅ Création de post
✅ Like / Unlike
✅ Follow / Unfollow

---

# 🚧 Améliorations futures (V2)

Commentaires dynamiques
Profils utilisateurs complets
Follow / Unfollow UI
Recherche utilisateurs
Upload d’images (Cloudinary ou S3)
Optimisation UX
Tests unitaires
Déploiement production

---

# 🤖 Utilisation de l’IA dans le projet

L’intelligence artificielle a été utilisée comme **outil d’assistance technique**, notamment pour :

- Clarification de concepts React et gestion d’état (Zustand)
- Debug Problème de la logique Like / Unlike (update UI dynamique)
- Debug des problèmes liés au JWT et à l’interceptor Axios
- Amélioration de l’architecture frontend (séparation API / Store / UI)
- Aide à la structuration du README

L’IA a été utilisée comme :
- Assistant de réflexion
- Outil de debugging
- Support pédagogique

Toute la logique métier, la compréhension des flux et l’intégration complète ont été réalisées et adaptées manuellement.

---
