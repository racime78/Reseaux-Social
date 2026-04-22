# 🧠 Réseau Social V1

📅 Début du projet : 03/02/2026
📅 Dernière mise à jours : 22/04/2026  
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
│   │   │   ├── utilisateurs.api.js
│   │   │   └── search.api.js
│   │   │
│   │   ├── components/
│   │   │   ├── FormulairePost.jsx
│   │   │   ├── PostCard.jsx
│   │   │   ├── Commentaires.jsx
│   │   │   ├── CommentaireItem.jsx
│   │   │   ├── EnTeteProfil.jsx
│   │   │   ├── ListePostsProfil.jsx
│   │   │   └── SearchBar.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Connexion.jsx
│   │   │   ├── Inscription.jsx
│   │   │   ├── Feed.jsx
│   │   │   ├── Profil.jsx
│   │   │   └── DetailPost.jsx
│   │   │
│   │   ├── routes/
│   │   │   └── RouteProtegee.jsx
│   │   │
│   │   ├── stores/
│   │   │   ├── auth.store.js
│   │   │   ├── posts.store.js
│   │   │   ├── commentaires.store.js
│   │   │   ├── profil.store.js
│   │   │   └── search.store.js
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
│   │   │   ├── utilisateurs.controleur.js
│   │   │   └── search.controleur.js
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
│   │   │   ├── routesSearch.js
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

# 🚀 Fonctionnalités utilisateur

## 🔐 Authentification
- Inscription avec validation des données
- Connexion via email ou username
- Gestion de session avec JWT
- Déconnexion utilisateur

## 👤 Profil
- Consultation d’un profil utilisateur
- Accès rapide à son propre profil

## 📝 Posts
- Gestion complète des posts (création, affichage, modification, suppression)
- Feed dynamique :
  - Tous les posts
  - Posts des utilisateurs suivis
- Infinite scroll (chargement progressif)
- Page détail d’un post

## 💬 Commentaires
- Gestion complète des commentaires (ajout, affichage, modification, suppression)

## ❤️ Likes
- Like / Unlike des posts
- Compteur de likes en temps réel

## 🔎 Recherche
- Barre de recherche dynamique
- Recherche en temps réel (utilisateurs + posts)
- Résultats limités (5 utilisateurs / 5 posts)
- Navigation directe vers profils et posts

## 🔁 Suivi (Follow)
- Follow / Unfollow d’utilisateurs
- Personnalisation du feed en fonction des utilisateurs suivis

## 📊 Résumé
Application de type réseau social permettant de publier du contenu, interagir (likes, commentaires), suivre d’autres utilisateurs et rechercher du contenu en temps réel.

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

## 🤖 Utilisation de l’IA dans le projet

L’intelligence artificielle a été utilisée comme **outil d’assistance technique** tout au long du développement, notamment pour :

- Clarification de concepts (React, gestion d’état avec Zustand, architecture fullstack)
- Aide au debugging (logique Like / Unlike, synchronisation UI, gestion du JWT)
- Résolution de problèmes liés aux requêtes API et à l’interceptor Axios
- Mise en place et amélioration de certaines fonctionnalités (feed dynamique, recherche globale, navigation)
- Optimisation de l’architecture frontend (séparation API / Store / composants)
- Aide à la structuration et à la rédaction du README

L’IA a été utilisée comme :
- Assistant de réflexion
- Outil de debugging
- Support pédagogique

👉 L’ensemble de la logique métier, de l’architecture, des choix techniques et de l’intégration des fonctionnalités a été **compris, adapté et implémenté manuellement**.

---
