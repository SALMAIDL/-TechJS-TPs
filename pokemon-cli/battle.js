function calcDamage(move) {
  const base = Math.floor((move.power / 10) * (Math.random() * 0.4 + 0.8));
  return Math.max(1, base);
}

function tryHit(move) {
  return Math.random() * 100 < move.accuracy;
}

function botChooseMove(botMoves, playerMoves) {
  const available = botMoves.filter((m, i) => {
    const playerMove = playerMoves[i];
    return m.pp > 0 && (!playerMove || m.pp >= playerMove.pp);
  });

  if (available.length === 0) {
    return botMoves.find((m) => m.pp > 0) || botMoves[0];
  }

  return available[Math.floor(Math.random() * available.length)];
}

function applyAttack(attacker, move, defender, attackerName) {
  if (move.pp <= 0) {
    return { missed: false, blocked: true, damage: 0 };
  }
  move.pp--;

  const hit = tryHit(move);
  if (!hit) return { missed: true, blocked: false, damage: 0 };

  const dmg = calcDamage(move);
  defender.hp = Math.max(0, defender.hp - dmg);
  return { missed: false, blocked: false, damage: dmg };
}

function playerChooseMove(playerMoves, botMoves, choiceIndex) {
  const move = playerMoves[choiceIndex];
  const botMove = botMoves[choiceIndex];

  if (move.pp <= 0) {
    return { blocked: true, reason: "Plus de PP !" };
  }

  if (botMove && move.pp < botMove.pp) {
    return { blocked: true, reason: `PP insuffisants (${move.pp} < ${botMove.pp} de l'ennemi)` };
  }

  return { blocked: false, move };
}

module.exports = { applyAttack, botChooseMove, playerChooseMove };
