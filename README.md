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

## 📂 Structure du projet

```bash
reseau-social-v1/
│
├── client/
│   ├── src/
│   │   ├── api/
│   │   │   ├── axios.js
│   │   │   ├── auth.api.js
│   │   │   ├── posts.api.js
│   │   │   └── utilisateurs.api.js
│   │   │
│   │   ├── components/
│   │   │   ├── FormulairePost.jsx
│   │   │   ├── PostCard.jsx
│   │   │   ├── Commentaires.jsx
│   │   │   ├── EnTeteProfil.jsx
│   │   │   └── ListePostsProfil.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Connexion.jsx
│   │   │   ├── Inscription.jsx
│   │   │   ├── Feed.jsx
│   │   │   └── Profil.jsx
│   │   │
│   │   ├── routes/
│   │   │   └── RouteProtegee.jsx
│   │   │
│   │   ├── stores/
│   │   │   ├── auth.store.js
│   │   │   ├── posts.store.js
│   │   │   └── profil.store.js
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   └── package.json
│
├── serveur/
│   ├── src/
│   │   ├── configuration/
│   │   │   ├── baseDeDonnees.js
│   │   │   └── cloudinary.js
│   │   │
│   │   ├── controleurs/
│   │   │   ├── auth.controleur.js
│   │   │   ├── posts.controleur.js
│   │   │   ├── commentaires.controleur.js
│   │   │   └── utilisateurs.controleur.js
│   │   │
│   │   ├── middlewares/
│   │   │   ├── authentification.middleware.js
│   │   │   ├── validation.middleware.js
│   │   │   ├── gestionErreurs.middleware.js
│   │   │   └── televersement.middleware.js
│   │   │
│   │   ├── modeles/
│   │   │   ├── utilisateur.modele.js
│   │   │   ├── post.modele.js
│   │   │   └── commentaire.modele.js
│   │   │
│   │   ├── routes/
│   │   │   ├── routesAuth.js
│   │   │   ├── routesPosts.js
│   │   │   ├── routesCommentaires.js
│   │   │   ├── routesUtilisateurs.js
│   │   │   └── routesSante.js
│   │   │
│   │   ├── services/
│   │   │   └── cloudinary.service.js
│   │   │
│   │   ├── utilitaires/
│   │   │   └── reponse.js
│   │   │
│   │   └── validations/
│   │       ├── auth.validation.js
│   │       ├── post.validation.js
│   │       └── commentaire.validation.js
│   │
│   ├── app.js
│   ├── serveur.js
│   └── package.json
│
└── README.md
```
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
