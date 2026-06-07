const axios = require("axios");

const BASE = "https://pokeapi.co/api/v2";

async function getPokemon(nameOrId) {
  const res = await axios.get(`${BASE}/pokemon/${nameOrId.toLowerCase()}`);
  return res.data;
}

async function getMoveDetails(moveUrl) {
  const res = await axios.get(moveUrl);
  return res.data;
}

async function buildFighter(nameOrId) {
  const data = await getPokemon(nameOrId);

  // On garde seulement les moves appris par level-up
  const movesPool = data.moves
    .filter((m) =>
      m.version_group_details.some((v) => v.move_learn_method.name === "level-up")
    )
    .slice(0, 20);

  const moveDetails = [];

  for (let i = 0; i < movesPool.length && moveDetails.length < 5; i++) {
    try {
      const detail = await getMoveDetails(movesPool[i].move.url);

      // On ignore les moves sans puissance (status moves)
      if (!detail.power || detail.power === null) continue;

      moveDetails.push({
        name: detail.name.replace(/-/g, " "),
        power: detail.power,
        accuracy: detail.accuracy || 100,
        pp: detail.pp || 10,
        type: detail.type.name,
      });
    } catch {
      // Move inaccessible, on passe au suivant
    }
  }

  // Fallback si pas assez de moves offensifs trouvés
  while (moveDetails.length < 5) {
    moveDetails.push({ name: "tackle", power: 40, accuracy: 100, pp: 35, type: "normal" });
  }

  return {
    name: data.name,
    sprite: data.sprites.front_default,
    hp: 300,
    maxHp: 300,
    moves: moveDetails,
  };
}

module.exports = { buildFighter, getPokemon };