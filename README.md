# Mini Bug-Tracker

TP Vue.js 3 : petite application pour suivre les tickets (bugs) d'un projet, branchée sur l'API REST `/api/tickets`.

## Fonctionnalités

- Tableau de bord avec la liste des tickets, la pagination et des filtres (titre, statut, priorité)
- Code couleur selon la priorité (rouge = high, orange = medium, vert = low)
- Création d'un ticket (formulaire avec validation)
- Page de détail avec modification du statut et de la priorité (PATCH)
- Suppression d'un ticket (DELETE)

## Prérequis

- Node.js 20 ou plus
- L'API qui tourne sur `http://localhost:80` (URL modifiable dans le fichier `.env` : `VITE_API_URL`)

## Installation

```bash
npm install
```

## Lancer le projet

```bash
npm run dev
```

Puis ouvrir http://localhost:5173

## Docker (bonus)

```bash
docker build -t mini-bug-tracker .
docker run -p 8080:80 mini-bug-tracker
```

Puis ouvrir http://localhost:8080 (l'API doit toujours tourner sur le port 80 de la machine).

## Structure

```
src/
├── components/   # AppHeader, FilterBar, TicketCard, PriorityBadge, StatusBadge
├── DTO/          # TicketDTO, CollectionDTO
├── services/     # appels à l'API (fetch)
├── views/        # Dashboard, Création, Détail
├── constants.js  # statuts et priorités
├── routes.js     # routes Vue Router
└── main.js
```
