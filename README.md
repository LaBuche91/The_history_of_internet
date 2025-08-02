# The History of the Internet 🌐

## ⚡️ Quick Start

### 1. Installation

```bash
npm install
```

### 2. Lancement en développement

```bash
npm start
```

- Accédez à [http://localhost:3000](http://localhost:3000) pour voir le site interactif.

### 3. Build de production

```bash
npm run build
npm run preview
```

- Accédez à [http://localhost:4173](http://localhost:4173) pour tester la version optimisée.

### 4. Structure du projet

- `src/` : Code source React (composants, styles, mini-jeux, config événements)
- `public/` : Images, sons, favicon, etc.
- `index.html` : Point d'entrée Vite (doit être à la racine)

### 5. Ajouter un événement ou mini-jeu

1. Ajoutez une entrée dans `src/events.config.json` (année, titre, type, etc.)
2. Créez le composant React correspondant dans `src/components/mini-games/`
3. Ajoutez les assets nécessaires dans `public/images/` ou `public/sounds/`
4. Le nouvel événement apparaîtra automatiquement dans la timeline !

### 6. Fonctionnement général

- **Page unique scrollable** : chaque section de la timeline correspond à un événement historique.
- **Animations GSAP** : les animations sont déclenchées au scroll.
- **Sons** : joués lors d'interactions ou d'animations (placeholders ou fichiers réels).
- **Mini-jeux** : chaque événement clé peut embarquer une interaction ludique.
- **Styles évolutifs** : le style visuel change selon la décennie.

---

Une expérience web interactive retraçant l'évolution d'Internet, de 1969 à aujourd'hui, dans l'esprit de neal.fun.

## 🎯 Concept

Ce site propose un voyage interactif à travers les moments clés qui ont façonné notre monde numérique, avec :

- **Animations fluides** synchronisées avec le scroll
- **Sons rétro** intégrés (modem 56k, MSN nudge, etc.)
- **Mini-jeux** intégrés à certaines étapes historiques
- **Style visuel évolutif** selon les époques (pixel art → flat design)

## 🎮 Événements interactifs implémentés

### 1969 - Naissance d'ARPANET
- **Mini-jeu** : Connectez deux ordinateurs par drag & drop
- **Son** : Bip rétro de connexion
- **Interaction** : Glissez le câble pour établir la première connexion réseau

### 1999 - L'ère du téléchargement MP3
- **Mini-jeu** : Simulation de téléchargement Napster
- **Son** : Modem 56k authentique
- **Interaction** : Vivez les aléas des téléchargements (déconnexions, vitesse variable)

### 2003 - MSN Messenger et les Nudges
- **Mini-jeu** : Interface MSN avec chat fonctionnel
- **Son** : Notification MSN + effet de vibration
- **Interaction** : Envoyez des nudges et observez les réactions

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

Le site sera accessible sur `http://localhost:3000`he History of the Internet

Expérience web interactive retraçant l’évolution d’Internet à travers les décennies, inspirée du style neal.fun.

## Structure du projet

```
/
├── public/
│   └── index.html
├── src/
│   ├── App.jsx
│   ├── index.jsx
│   ├── components/
│   ├── assets/
│   ├── styles/
│   └── events.config.json
├── package.json
└── README.md
```

## Principes d’architecture

- **SPA React** avec Vite.
- **Composants modulaires** dans `src/components/` (sections, mini-jeux, UI…).
- **Assets** (sons, images, vidéos) dans `src/assets/`.
- **Styles** globaux et spécifiques dans `src/styles/`.
- **Configuration extensible** des événements/mini-jeux dans `src/events.config.json`.

## Librairies principales

- [React](https://react.dev/) : SPA réactive.
- [GSAP](https://greensock.com/gsap/) : Animations scrollables.
- [Scrollama](https://github.com/russellgoldenberg/scrollama) : Interactions scroll.
- [D3.js](https://d3js.org/) : Graphiques dynamiques.
- [Howler.js](https://howlerjs.com/) : Gestion des sons.

## Lancer le projet

```bash
npm install
npm run start
```

## Ajouter un événement ou mini-jeu

1. Ajouter une entrée dans `src/events.config.json`.
2. Créer le composant correspondant dans `src/components/`.
3. Ajouter les assets nécessaires dans `src/assets/`.

## Responsive

Le projet est conçu pour fonctionner sur desktop et mobile.
