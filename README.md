# The History of the Internet 🌐

Une expérience web interactive retraçant l'évolution d'Internet, de 1969 à aujourd'hui, dans l'esprit de neal.fun.

## 🎯 Concept

Ce site propose un voyage interactif à travers les moments clés qui ont façonné notre monde numérique, avec :

- **Timeline scrollable** avec animations GSAP
- **Mini-jeux interactifs** pour chaque époque majeure
- **Sons rétro authentiques** (modem 56k, MSN nudge, etc.)
- **Style visuel évolutif** selon les décennies
- **Interface nostalgique** fidèle à chaque époque

## 🎮 Timeline interactive complète

### 1969 - Naissance d'ARPANET 🔌
- **Mini-jeu** : Connectez UCLA à Stanford par drag & drop
- **Interaction** : Glissez le câble pour établir la première connexion réseau
- **Effet** : Animation de connexion avec message de succès

### 1983 - TCP/IP devient standard 📡
- **Mini-jeu** : Simulateur de commande ping
- **Interaction** : Testez la connectivité entre machines
- **Effet** : Visualisation du signal réseau en temps réel

### 1991 - Naissance du Web (HTML) 🌐
- **Mini-jeu** : Affichage de la toute première page web
- **Interaction** : Simulation de connexion au serveur CERN
- **Effet** : Chargement progressif de la page historique

### 1995 - Internet Explorer et les pop-ups 🪟
- **Mini-jeu** : Pop-up Killer Game
- **Interaction** : Fermez les fenêtres intrusives avant qu'elles envahissent l'écran
- **Effet** : Spawn aléatoire de pop-ups avec différents types de menaces

### 1998 - Google Search 🔍
- **Mini-jeu** : Simulateur de recherche vintage
- **Interaction** : Recherchez des termes rétro avec résultats d'époque
- **Effet** : Interface fidèle au Google original

### 1999 - L'ère du téléchargement MP3 💿
- **Mini-jeu** : Simulation de téléchargement Napster
- **Interaction** : Vivez les aléas des téléchargements (déconnexions, vitesse variable)
- **Effet** : Barre de progression réaliste avec interruptions

### 2000 - GeoCities et sites personnels 🏗️
- **Mini-jeu** : Constructeur de site rétro
- **Interaction** : Drag & drop d'éléments kitsch (GIFs, Comic Sans, compteurs)
- **Effet** : Aperçu du site avec fonds étoilés et animations clignotantes

### 2003 - MSN Messenger et les Nudges 💬
- **Mini-jeu** : Interface MSN authentique avec chat
- **Interaction** : Envoyez des nudges avec cooldown réaliste
- **Effet** : Animation de secousse + son + réponses automatiques

### 2004 - Invasion des virus et malware 🛡️
- **Mini-jeu** : Jeu de défense anti-virus
- **Interaction** : Fermez virus, spyware et pop-ups malveillantes
- **Effet** : Système de score, vies et niveau d'infection

### 2005 - YouTube 📺
- **Mini-jeu** : Lecteur YouTube vintage
- **Interaction** : Regardez une vidéo pixelisée avec Rick Roll
- **Effet** : Interface 2005 avec chargement et contrôles d'époque

### 2010 - Web 2.0 et réseaux sociaux 📱
- **Mini-jeu** : Dashboard des réseaux sociaux
- **Interaction** : Explorez Facebook, Twitter, LinkedIn de l'époque
- **Effet** : Notifications en temps réel et simulation d'applications

### 2020+ - Cloud et IA 🤖
- **Mini-jeu** : Chat avec différentes IA
- **Interaction** : Posez des questions sur l'avenir d'Internet
- **Effet** : 3 personnalités d'IA avec réponses contextuelles

## 🛠 Technologies utilisées

- **React 18** - Framework principal
- **GSAP** - Animations avancées et ScrollTrigger
- **Howler.js** - Gestion audio (fallback vers sons synthétiques)
- **CSS3** - Styles rétro adaptatifs par époque
- **Vite** - Build tool moderne

## 🚀 Installation et lancement

```bash
# Installation des dépendances
npm install

# Lancement en mode développement
npm start

# Build de production
npm run build
```


Le site sera accessible sur `http://localhost:3000`

# The History of the Internet

Expérience web interactive retraçant l’évolution d’Internet à travers les décennies, inspirée du style neal.fun.


## Structure du projet

```
/
├── public/
│   ├── images/
│   └── sounds/
├── src/
│   ├── App.jsx
│   ├── index.jsx
│   ├── components/
│   │   ├── mini-games/
│   │   └── ...
│   ├── assets/
│   ├── styles/
│   ├── utils/
│   └── events.config.json
├── index.html
├── vite.config.js
├── package-lock.json
├── package.json
└── README.md
```


## Principes d’architecture

- **SPA React** avec Vite
- **Composants modulaires** dans `src/components/` (sections, mini-jeux, UI…)
- **Mini-jeux** dans `src/components/mini-games/`
- **Assets** (sons, images, vidéos) dans `public/` (images, sounds) et `src/assets/`
- **Styles** globaux et spécifiques dans `src/styles/`
- **Configuration extensible** des événements/mini-jeux dans `src/events.config.json`


## Librairies principales

- [React](https://react.dev/) : SPA réactive
- [GSAP](https://greensock.com/gsap/) : Animations scrollables et mini-jeux
- [Howler.js](https://howlerjs.com/) : Gestion des sons
- [Vite](https://vitejs.dev/) : Build tool moderne


## Lancer le projet

```bash
npm install
npm start
```


## Ajouter un événement ou mini-jeu

1. Ajouter une entrée dans `src/events.config.json`
2. Créer le composant correspondant dans `src/components/mini-games/`
3. Ajouter les assets nécessaires dans `public/images/` ou `public/sounds/`


## Responsive

Le projet est conçu pour fonctionner sur desktop et mobile.
