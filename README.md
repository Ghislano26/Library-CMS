# Cabinet Littéraire Interactif — Ghislain Ateba

Bienvenue dans le dépôt officiel de votre **Cabinet Littéraire Interactif**, une plateforme web sur mesure, moderne et épurée, conçue spécialement pour l'écriture, l'organisation et la lecture numérique d'œuvres littéraires. 

Développé en **React 19**, **TypeScript** et **Tailwind CSS (Vite)**, ce projet combine une interface de lecture (e-reader) haut de gamme et un studio d'administration intuitif (CMS) qui vous permet de créer vos récits directement en ligne sous forme chapitrée, de personnaliser leurs couvertures, et d'offrir des options d'export et d'impression instantanées à vos lecteurs.

---

## Fonctionnalités Clés

### 📖 1. Le Cabinet de Lecture (IHM Clients)
* **Design Éditorial Raffiné :** Un style épuré s'inspirant des plus beaux cabinets de lecture imprimés, mettant en valeur la pensée littéraire de **Ghislain Ateba**.
* **Liseur d'E-books Immersif :** Un confort de lecture incomparable avec la gestion de thèmes visuels (sépia réconfortant, mode jour clair ou mode nuit complet), l'ajustement dynamique de la taille de police, et des indicateurs de progression en temps réel.
* **Système de Marque-Pages :** Mémorisation automatique et persistante du chapitre en cours grâce au stockage local sécurisé.

### 2. Le Studio Auteur & CMS Intuitif
* **Éditeur de Récits Dynamique :** Plus besoin de fichiers PDF complexes ! Écrivez et modifiez vos chapitres directement depuis un formulaire ergonomique avec estimation automatique de la durée de lecture et compteur de caractères.
* **Créateur de Couvertures Graphique :** Personnalisez l'esthétique visuelle de vos ouvrages : alternez entre plusieurs gradients de couleurs haut de gamme et des gabarits artistiques (Classique délimité, Moderne géométrique, Brut épuré, ou Artistique spatial).
* **Réorganisation Fluide :** Glissez-déposez ou réorganisez la chronologie de vos chapitres à l'aide de boutons d'ajustement verticaux directs.

###  3. Persistance Offline & Sauvegardes
* **Zéro Base de Données Requise :** L'application utilise la mémoire `localStorage` du navigateur pour sauvegarder de façon permanente vos écrits en toute sécurité et sans frais d'infrastructure.
* **Export-Import JSON :** Sauvegardez l'intégralité de votre bibliothèque littéraire d'un seul clic dans un fichier `.json` local pour créer des sauvegardes physiques ou transférer votre contenu vers d'autres navigateurs.

### 4. Impression & Exports Universels
* **Générateur PDF / Impression :** Vos clients peuvent compiler et imprimer instantanément le livre entier au format papier ou l'enregistrer en fichier **PDF** propre et stylisé (incluant une table des matières automatique et des sauts de page élégants).
* **Export Fichier Texte (.txt) :** Possibilité de télécharger le récit brut pour une lecture hors-ligne sur n'importe quel appareil.

---

## Stack Technique employée

* **Framework :** [React 19](https://react.dev/) (Composants fonctionnels, Hooks d'état, Contextes locaux)
* **Langage de programmation :** [TypeScript](https://www.typescriptlang.org/) (Type-safety strict des modèles de données et chapitres)
* **Moteur d'exécution local :** [Vite](https://vite.dev/) (Compilation ultra-rapide et rechargements optimisés)
* **Système de Design CSS :** [Tailwind CSS v4](https://tailwindcss.com/) (Styles utilitaires légers et réactifs sur tous les écrans)
* **Pack d'Icônes :** [Lucide React](https://lucide.dev/) (Icônes vectorielles légères et épurées)

---

## Comment lancer le projet en local chez vous ?

Pour faire tourner le site web sur votre ordinateur, suivez très simplement ces étapes :

### Prérequis
Assurez-vous d'avoir installé [Node.js](https://nodejs.org/) (version 18 ou supérieure recommandée) sur votre machine.

### 1. Cloner ou Extraire le Projet
Si vous l'avez téléchargé sous format `.zip`, extrayez le dossier dans l'emplacement de votre choix.

### 2. Installer les Dépendances npm
Ouvrez votre terminal dans le dossier du projet et exécutez la commande suivante pour télécharger les librairies requises :
```bash
npm install
```

### 3. Lancer le Serveur de Développement local
Pour démarrer l'application à l'adresse locale `http://localhost:3000` (ou sur un autre port libre), lancez la commande suivante :
```bash
npm run dev
```
Ouvrez ensuite le lien affiché dans votre navigateur web habituel pour tester la plateforme en direct !

### 4. Compiler le site pour la Production (Déploiement)
Pour préparer le site à être hébergé gratuitement en ligne (par exemple sur Vercel, Netlify, GitHub Pages ou Firebase Hosting), lancez la build optimisée :
```bash
npm run build
```
Cette commande génère un dossier static optimisé nommé `dist/` à la racine de votre projet. C'est ce dossier `dist` qu'il suffit de téléverser chez votre hébergeur.

---

## Structure des Fichiers Intéressants

```text
├── src/
│   ├── types.ts          # Définition stricte des types littéraires (Book, Chapter, etc.)
│   ├── data.ts           # Liste et contenu des livres préinstallés (Le Petit Prince, etc.)
│   ├── App.tsx           # Chef d'orchestre de l'application et gestion des vues (Library, Reader, CMS)
│   ├── components/
│   │   ├── BookCover.tsx # Rendu graphique interactif de la couverture du livre
│   │   ├── Library.tsx   # Le catalogue du Cabinet Littéraire de Ghislain Ateba
│   │   ├── Reader.tsx    # Liseur interactif (e-reader, marque-pages, ajustements et PDF)
│   │   └── CMSDashboard.tsx # Panneau administratif et de sauvegardes JSON
│   ├── index.css         # Styles globaux Tailwind CSS
│   └── main.tsx          # Point d'entrée de l'application React
├── package.json          # Configuration et scripts du projet (dev, build, lint)
└── README.md             # Guide d'utilisation et d'installation de la plateforme
```

---

## Personnalisations Futures

* **Changer le code d'accès Auteur :** Dans le composant `./src/components/Library.tsx`, recherchez la fonction `handleAdminGateCheck`. Vous pouvez modifier la chaîne de comparaison `"admin"` par le mot de passe secret de votre choix. Laissez-le vide par défaut pour un accès rapide.
* **Ajouter d'autres œuvres par défaut :** Ouvrez le fichier `./src/data.ts` pour enrichir la bibliothèque avec vos créations pérennes pré-remplies. Elles se chargeront à la première ouverture du site.

Créé avec passion par **Ghislain Ateba** d'après des designs d'édition minimalistes.
