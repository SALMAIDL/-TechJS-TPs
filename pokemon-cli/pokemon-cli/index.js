#!/usr/bin/env node

const inquirer = require("inquirer");
const chalk = require("chalk");
const { buildFighter } = require("./pokeapi");
const { buildFighterLocal, getAvailablePokemon } = require("./pokemon-data");
const { showStatus, showMoves, logAttack, sleep } = require("./display");
const { applyAttack, botChooseMove, playerChooseMove } = require("./battle");

const BOT_POOL = ["gengar", "mewtwo", "dragonite", "alakazam", "machamp", "arcanine", "gyarados"];

// Construit un fighter via l'API, avec fallback local si l'API échoue
async function buildFighterSafe(name) {
  try {
    console.log(chalk.gray(`  Chargement de ${name} depuis PokéAPI...`));
    const fighter = await buildFighter(name);
    console.log(chalk.green(`  ✓ ${fighter.name.toUpperCase()} chargé depuis l'API !`));
    return fighter;
  } catch (err) {
    console.log(chalk.yellow(`  ⚠ API indisponible, chargement local de ${name}...`));
    return buildFighterLocal(name);
  }
}

async function choosePokemon() {
  console.log(chalk.bold.yellow("\n  ╔══════════════════════════════════╗"));
  console.log(chalk.bold.yellow("  ║     POKÉMON BATTLE CLI v2.0      ║"));
  console.log(chalk.bold.yellow("  ╚══════════════════════════════════╝\n"));
  console.log(chalk.gray("  Vous pouvez entrer n'importe quel Pokémon de la PokéAPI !"));
  console.log(chalk.gray("  (ex: pikachu, charizard, lucario, garchomp, umbreon...)\n"));
  console.log(chalk.cyan("  Pokémon locaux disponibles hors-ligne : " + getAvailablePokemon().join(", ") + "\n"));

  const { name } = await inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: chalk.bold("Choisissez votre Pokémon :"),
      validate: (input) => {
        if (!input.trim()) return "Veuillez entrer un nom.";
        return true;
      },
    },
  ]);
  return name.trim().toLowerCase();
}

async function battleRound(player, bot, round) {
  console.log(chalk.bold.gray(`\n  ═══ Round ${round} ═══`));
  showStatus(player, bot);
  showMoves(player.moves);

  const { choice } = await inquirer.prompt([
    {
      type: "list",
      name: "choice",
      message: chalk.bold("Choisissez votre attaque :"),
      choices: player.moves.map((m, i) => ({
        name: `${m.name.padEnd(20)} | PWR: ${String(m.power).padStart(3)} | ACC: ${m.accuracy}% | PP: ${m.pp}`,
        value: i,
        disabled: m.pp <= 0 ? "(plus de PP)" : false,
      })),
    },
  ]);

  console.log("");

  const playerResult = playerChooseMove(player.moves, bot.moves, choice);

  if (playerResult.blocked) {
    console.log(chalk.red(`  ✗ Attaque bloquée : ${playerResult.reason}`));
  } else {
    const result = applyAttack(player, playerResult.move, bot);
    logAttack(player.name, playerResult.move, result.damage, result.missed);
  }

  await sleep(700);

  if (bot.hp > 0) {
    const botMove = botChooseMove(bot.moves, player.moves);
    const botResult = applyAttack(bot, botMove, player);
    logAttack(bot.name, botMove, botResult.damage, botResult.missed);
  }

  await sleep(700);
}

async function main() {
  try {
    const playerName = await choosePokemon();

    // Chargement depuis l'API (avec fallback local)
    const player = await buildFighterSafe(playerName);
    if (!player) {
      console.log(chalk.red(`  ✗ Pokémon "${playerName}" introuvable. Vérifiez le nom.\n`));
      return main();
    }

    const botName = BOT_POOL[Math.floor(Math.random() * BOT_POOL.length)];
    const bot = await buildFighterSafe(botName);

    console.log(chalk.green(`\n  Votre Pokémon   : ${chalk.bold(player.name.toUpperCase())}`));
    console.log(chalk.red(`  Adversaire (bot): ${chalk.bold(bot.name.toUpperCase())}`));
    console.log(chalk.gray("\n  Règles : 300 HP chacun. Premier à 0 a perdu."));
    console.log(chalk.gray("  PP : une attaque est bloquée si vos PP < PP du move adverse.\n"));

    await sleep(1200);

    let round = 1;
    while (player.hp > 0 && bot.hp > 0) {
      await battleRound(player, bot, round);
      round++;
    }

    showStatus(player, bot);

    console.log("\n  " + "═".repeat(48));
    if (player.hp <= 0 && bot.hp <= 0) {
      console.log(chalk.yellow("  ⚡  MATCH NUL ! Les deux Pokémon sont K.O. !"));
    } else if (player.hp <= 0) {
      console.log(chalk.red(`  ☠   ${player.name.toUpperCase()} est K.O. — Vous avez PERDU !`));
    } else {
      console.log(chalk.green(`  🏆  ${bot.name.toUpperCase()} est K.O. — Vous avez GAGNÉ !`));
    }
    console.log("  " + "═".repeat(48) + "\n");

    const { again } = await inquirer.prompt([
      { type: "confirm", name: "again", message: "Rejouer ?", default: false },
    ]);

    if (again) { console.clear(); main(); }
    else console.log(chalk.cyan("\n  À bientôt, dresseur !\n"));

  } catch (err) {
    if (err.isTtyError || (err.message && err.message.includes("force closed"))) {
      console.log(chalk.gray("\n  Au revoir !\n"));
    } else {
      console.error(chalk.red("\n  Erreur :"), err.message);
    }
  }
}

main();