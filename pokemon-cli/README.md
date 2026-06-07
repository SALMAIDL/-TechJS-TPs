# Pokémon Battle CLI

Mini-jeu de combat Pokémon en ligne de commande — solution du TP Node.js.

## Installation

```bash
npm install
```

## Lancement

```bash
node index.js
# ou
npm start
```

## Règles du jeu

- Chaque joueur a **300 HP**
- Le joueur choisit son Pokémon parmi la liste disponible
- Le bot choisit un Pokémon aléatoire
- Chaque Pokémon a **5 moves** avec : Power, Accuracy, PP
- À chaque round, le joueur choisit son attaque ; le bot choisit aléatoirement
- **Accuracy** : chaque attaque peut rater selon son pourcentage de précision
- **Règle PP** : une attaque est **bloquée** si vos PP sont inférieurs aux PP du move ennemi au même index
- Le premier à tomber à 0 HP perd

## Pokémon disponibles

pikachu, charmander, bulbasaur, squirtle, eevee, snorlax, charizard,
gengar, mewtwo, dragonite, alakazam, machamp, arcanine, gyarados

## Structure du projet

```
pokemon-cli/
├── index.js         ← Point d'entrée, boucle de jeu
├── pokemon-data.js  ← Données locales des Pokémon et moves
├── battle.js        ← Logique de combat (dégâts, accuracy, PP)
├── display.js       ← Affichage CLI (barres HP, couleurs)
├── pokeapi.js       ← (optionnel) Fetch depuis PokeAPI
└── package.json
```

## Extension avec PokeAPI

Le fichier `pokeapi.js` permet de récupérer n'importe quel Pokémon depuis
`https://pokeapi.co` si vous avez accès à internet. Remplacez `buildFighterLocal`
par `buildFighter` de `pokeapi.js` dans `index.js`.
