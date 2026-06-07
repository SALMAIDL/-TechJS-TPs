const POKEMON_DATA = {
  pikachu: {
    name: "pikachu",
    moves: [
      { name: "thunderbolt", power: 90, accuracy: 100, pp: 15, type: "electric" },
      { name: "quick attack", power: 40, accuracy: 100, pp: 30, type: "normal" },
      { name: "thunder", power: 110, accuracy: 70, pp: 10, type: "electric" },
      { name: "iron tail", power: 100, accuracy: 75, pp: 15, type: "steel" },
      { name: "volt tackle", power: 120, accuracy: 100, pp: 15, type: "electric" },
    ],
  },
  charmander: {
    name: "charmander",
    moves: [
      { name: "flamethrower", power: 90, accuracy: 100, pp: 15, type: "fire" },
      { name: "scratch", power: 40, accuracy: 100, pp: 35, type: "normal" },
      { name: "fire blast", power: 110, accuracy: 85, pp: 5, type: "fire" },
      { name: "dragon rage", power: 60, accuracy: 100, pp: 10, type: "dragon" },
      { name: "slash", power: 70, accuracy: 100, pp: 20, type: "normal" },
    ],
  },
  bulbasaur: {
    name: "bulbasaur",
    moves: [
      { name: "razor leaf", power: 55, accuracy: 95, pp: 25, type: "grass" },
      { name: "vine whip", power: 45, accuracy: 100, pp: 25, type: "grass" },
      { name: "solar beam", power: 120, accuracy: 100, pp: 10, type: "grass" },
      { name: "tackle", power: 40, accuracy: 100, pp: 35, type: "normal" },
      { name: "poison powder", power: 50, accuracy: 75, pp: 35, type: "poison" },
    ],
  },
  squirtle: {
    name: "squirtle",
    moves: [
      { name: "water gun", power: 40, accuracy: 100, pp: 25, type: "water" },
      { name: "surf", power: 90, accuracy: 100, pp: 15, type: "water" },
      { name: "hydro pump", power: 110, accuracy: 80, pp: 5, type: "water" },
      { name: "tackle", power: 40, accuracy: 100, pp: 35, type: "normal" },
      { name: "bite", power: 60, accuracy: 100, pp: 25, type: "dark" },
    ],
  },
  gengar: {
    name: "gengar",
    moves: [
      { name: "shadow ball", power: 80, accuracy: 100, pp: 15, type: "ghost" },
      { name: "sludge bomb", power: 90, accuracy: 100, pp: 10, type: "poison" },
      { name: "dark pulse", power: 80, accuracy: 100, pp: 15, type: "dark" },
      { name: "psychic", power: 90, accuracy: 100, pp: 10, type: "psychic" },
      { name: "hypnosis", power: 60, accuracy: 60, pp: 20, type: "psychic" },
    ],
  },
  mewtwo: {
    name: "mewtwo",
    moves: [
      { name: "psychic", power: 90, accuracy: 100, pp: 10, type: "psychic" },
      { name: "aura sphere", power: 80, accuracy: 100, pp: 20, type: "fighting" },
      { name: "shadow ball", power: 80, accuracy: 100, pp: 15, type: "ghost" },
      { name: "ice beam", power: 90, accuracy: 100, pp: 10, type: "ice" },
      { name: "psystrike", power: 100, accuracy: 100, pp: 10, type: "psychic" },
    ],
  },
  dragonite: {
    name: "dragonite",
    moves: [
      { name: "dragon claw", power: 80, accuracy: 100, pp: 15, type: "dragon" },
      { name: "fire punch", power: 75, accuracy: 100, pp: 15, type: "fire" },
      { name: "thunder", power: 110, accuracy: 70, pp: 10, type: "electric" },
      { name: "outrage", power: 120, accuracy: 100, pp: 10, type: "dragon" },
      { name: "hyper beam", power: 150, accuracy: 90, pp: 5, type: "normal" },
    ],
  },
  alakazam: {
    name: "alakazam",
    moves: [
      { name: "psychic", power: 90, accuracy: 100, pp: 10, type: "psychic" },
      { name: "shadow ball", power: 80, accuracy: 100, pp: 15, type: "ghost" },
      { name: "focus blast", power: 120, accuracy: 70, pp: 5, type: "fighting" },
      { name: "energy ball", power: 90, accuracy: 100, pp: 10, type: "grass" },
      { name: "dazzling gleam", power: 80, accuracy: 100, pp: 10, type: "fairy" },
    ],
  },
  machamp: {
    name: "machamp",
    moves: [
      { name: "dynamic punch", power: 100, accuracy: 50, pp: 5, type: "fighting" },
      { name: "close combat", power: 120, accuracy: 100, pp: 5, type: "fighting" },
      { name: "earthquake", power: 100, accuracy: 100, pp: 10, type: "ground" },
      { name: "stone edge", power: 100, accuracy: 80, pp: 5, type: "rock" },
      { name: "cross chop", power: 100, accuracy: 80, pp: 5, type: "fighting" },
    ],
  },
  arcanine: {
    name: "arcanine",
    moves: [
      { name: "flamethrower", power: 90, accuracy: 100, pp: 15, type: "fire" },
      { name: "extreme speed", power: 80, accuracy: 100, pp: 5, type: "normal" },
      { name: "close combat", power: 120, accuracy: 100, pp: 5, type: "fighting" },
      { name: "wild charge", power: 90, accuracy: 100, pp: 15, type: "electric" },
      { name: "crunch", power: 80, accuracy: 100, pp: 15, type: "dark" },
    ],
  },
  gyarados: {
    name: "gyarados",
    moves: [
      { name: "hydro pump", power: 110, accuracy: 80, pp: 5, type: "water" },
      { name: "dragon dance", power: 60, accuracy: 100, pp: 20, type: "dragon" },
      { name: "crunch", power: 80, accuracy: 100, pp: 15, type: "dark" },
      { name: "earthquake", power: 100, accuracy: 100, pp: 10, type: "ground" },
      { name: "ice fang", power: 65, accuracy: 95, pp: 15, type: "ice" },
    ],
  },
  eevee: {
    name: "eevee",
    moves: [
      { name: "quick attack", power: 40, accuracy: 100, pp: 30, type: "normal" },
      { name: "bite", power: 60, accuracy: 100, pp: 25, type: "dark" },
      { name: "tackle", power: 40, accuracy: 100, pp: 35, type: "normal" },
      { name: "swift", power: 60, accuracy: 100, pp: 20, type: "normal" },
      { name: "last resort", power: 140, accuracy: 100, pp: 5, type: "normal" },
    ],
  },
  snorlax: {
    name: "snorlax",
    moves: [
      { name: "body slam", power: 85, accuracy: 100, pp: 15, type: "normal" },
      { name: "earthquake", power: 100, accuracy: 100, pp: 10, type: "ground" },
      { name: "crunch", power: 80, accuracy: 100, pp: 15, type: "dark" },
      { name: "heavy slam", power: 100, accuracy: 100, pp: 10, type: "steel" },
      { name: "hyper beam", power: 150, accuracy: 90, pp: 5, type: "normal" },
    ],
  },
  charizard: {
    name: "charizard",
    moves: [
      { name: "flamethrower", power: 90, accuracy: 100, pp: 15, type: "fire" },
      { name: "air slash", power: 75, accuracy: 95, pp: 15, type: "flying" },
      { name: "dragon claw", power: 80, accuracy: 100, pp: 15, type: "dragon" },
      { name: "fire blast", power: 110, accuracy: 85, pp: 5, type: "fire" },
      { name: "blast burn", power: 150, accuracy: 90, pp: 5, type: "fire" },
    ],
  },
};

function getAvailablePokemon() {
  return Object.keys(POKEMON_DATA);
}

function buildFighterLocal(name) {
  const key = name.toLowerCase();
  const data = POKEMON_DATA[key];
  if (!data) return null;

  return {
    name: data.name,
    hp: 300,
    maxHp: 300,
    moves: data.moves.map((m) => ({ ...m })),
  };
}

module.exports = { buildFighterLocal, getAvailablePokemon, POKEMON_DATA };
