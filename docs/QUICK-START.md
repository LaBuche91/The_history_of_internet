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
