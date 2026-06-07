const chalk = require("chalk");

function bar(current, max, len = 20) {
  const filled = Math.round((current / max) * len);
  const empty = len - filled;
  const color = current / max > 0.5 ? chalk.green : current / max > 0.25 ? chalk.yellow : chalk.red;
  return color("█".repeat(Math.max(0, filled))) + chalk.gray("░".repeat(Math.max(0, empty)));
}

function showStatus(player, bot) {
  console.log("\n" + "─".repeat(50));
  console.log(
    chalk.cyan(`  ${player.name.toUpperCase().padEnd(15)}`),
    `HP: ${String(player.hp).padStart(3)}/${player.maxHp}`,
    bar(player.hp, player.maxHp)
  );
  console.log(
    chalk.red(`  ${bot.name.toUpperCase().padEnd(15)}`),
    `HP: ${String(bot.hp).padStart(3)}/${bot.maxHp}`,
    bar(bot.hp, bot.maxHp)
  );
  console.log("─".repeat(50) + "\n");
}

function showMoves(moves) {
  console.log(chalk.bold("\nVos moves :"));
  moves.forEach((m, i) => {
    const ppColor = m.pp <= 2 ? chalk.red : m.pp <= 5 ? chalk.yellow : chalk.white;
    console.log(
      `  ${chalk.bold(i + 1)}. ${m.name.padEnd(20)}`,
      chalk.magenta(`PWR: ${String(m.power).padStart(3)}`),
      chalk.blue(`ACC: ${m.accuracy}%`),
      ppColor(`PP: ${m.pp}`)
    );
  });
}

function logAttack(attacker, move, damage, missed) {
  const name = chalk.bold(attacker.toUpperCase());
  if (missed) {
    console.log(chalk.yellow(`  ${name} utilise "${move.name}"... mais rate !`));
  } else {
    console.log(
      chalk.white(`  ${name} utilise "${move.name}" →`),
      chalk.red(`-${damage} HP`)
    );
  }
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

module.exports = { showStatus, showMoves, logAttack, sleep };
