# TP2 — Express.js Complet

Application web avec inscription/connexion, protection de routes et gestion de livres.

## Stack technique
- **Express.js** — framework web
- **Pug** — moteur de templates
- **Passport.js** (Local Strategy) — authentification
- **bcrypt** — hashage des mots de passe
- **Mongoose / MongoDB** — base de données
- **express-session + connect-mongo** — sessions persistantes
- **Tailwind CSS** (CDN) — styling

## Structure du projet
```
tp2/
├── src/
│   ├── index.js              # Point d'entrée, config Express
│   ├── config/
│   │   └── passport.js       # Stratégie Passport Local
│   ├── models/
│   │   └── User.js           # Schéma Mongoose + hash bcrypt
│   ├── middleware/
│   │   └── auth.js           # isAuthenticated middleware
│   ├── routes/
│   │   ├── auth.js           # /auth/login, /register, /logout
│   │   └── books.js          # /books (protégé)
│   └── views/
│       ├── layout.pug        # Layout de base avec navbar
│       ├── auth/
│       │   ├── login.pug
│       │   └── register.pug
│       └── books/
│           ├── index.pug     # Liste des livres
│           ├── new.pug       # Formulaire ajout
│           └── detail.pug    # Détail d'un livre
└── package.json
```

## Installation et lancement

### Prérequis
- Node.js installé
- MongoDB en cours d'exécution (`mongod`)

### Étapes
```bash
# 1. Installer les dépendances
npm install

# 2. Lancer MongoDB (si pas déjà démarré)
mongod

# 3. Démarrer le serveur
npm start
# ou en mode développement (rechargement auto)
npm run dev
```

Ouvrir http://localhost:3000

## Fonctionnalités

### Authentification
- **Inscription** : `/auth/register` — création d'un compte (username, email, password hashé avec bcrypt)
- **Connexion** : `/auth/login` — authentification Passport.js Local Strategy
- **Déconnexion** : `/auth/logout`
- Redirection automatique après login

### Livres (route protégée)
- **Liste** : `/books` — affiche tous les livres
- **Ajout** : `/books/new` + POST `/books`
- **Détail** : `/books/:id`
- **Suppression** : POST `/books/:id/delete`
- 5 livres de démonstration pré-chargés en mémoire

### Sécurité
- Mots de passe hashés avec bcrypt (salt rounds: 10)
- Sessions stockées en MongoDB via connect-mongo
- Toutes les routes `/books` sont protégées par le middleware `isAuthenticated`
- Redirection vers la page demandée après connexion (`returnTo`)
