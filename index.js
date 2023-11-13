class Pokemon {
  constructor(name, health) {
    this.name = name;
    this.health = health;
    this.skills = [];
    this.counter = 0;
    this.magic = 100;
    this.form = "";
    this.critChance = 2;
  }
  calculateCriticalStrike() {
    if (this.form !== "") {
      return (this.magic *= 20);
    }
    return this.magic;
  }
  changeForm(newForm) {
    this.form = newForm;
    // console.log(`${this.name} has transformed into its ${newForm} form.`);
  }
  learnAttackSkill(newSkill) {
    this.skills.push(newSkill);
    // console.log(`${this.name} has learn the skill ${newSkill.attack}`);
  }

  showStatus() {
    console.log(`Name: ${this.name}`);
    if (this.counter > 3) {
      console.log(`${this.name} has win the fight`);
    } else {
      console.log(`${this.name} is still fighting`);
    }
  }

  isAlive() {
    if (this.health > 0) {
      return true;
    } else {
      return false;
    }
  }

  attack(skillName, opponent) {
    const skill = this.skills.find((i) => i.name === skillName);
    if (!skill) {
      console.log(`${this.name} doesn't know the "${skillName}" `);
    }
    console.log(
      `${this.name} is attacking with ${skill.name} on ${opponent.name}`
    );

    const damage = skill.damage; // to check how much is dmg
    opponent.health -= damage; // to reduce the dmg from the enemy's hp

    // see if the opponent pokemon is alive (if else statement) -> is alive method
    if (opponent.isAlive()) {
      console.log(`${opponent.name} took the hit and is still conscious.`);
      console.log(`The battle: continuing`);
    }
    // else dead : opponent is no longer conscious and this wins the game
    else {
      console.log(`${opponent.name} is no longer conscious.`);
      console.log(`${this.name} wins the game!`);
      this.counter++; // Increase the win counter
    }
  }

  // if alive : log out that the opponent took the hit and then he cant continue the fight
}

const Pikatcu = new Pokemon("Pikachu", 35, [], 0);
const Tododile = new Pokemon("Totodile", 50, [], 0);
const Golem = new Pokemon("Golem", 80, [], 0);
const Gengar = new Pokemon("Gengar", 115, [], 0);

class AttackSkill {
  constructor(name, damage, attack) {
    this.name = name;
    this.damage = damage;
    this.attack = attack;
  }
}
function evolvePokemon(pokemon, targetForm) {
  pokemon.form = targetForm;
  if (pokemon.form === targetForm) {
    console.log(`${pokemon.name} is already in its ${targetForm} form.`);
    pokemon.calculateCriticalStrike();
  } else {
    pokemon.changeForm(targetForm);
    console.log(`${pokemon.name} has evolved into ${pokemon.form}!`);
  }
}

const earthquake = new AttackSkill("Earthquake", 40, "Rock Smash");
const fireball = new AttackSkill("Fireball", 25, "Ember");
const thunderbolt = new AttackSkill("Thunderbolt", 30, "Electric Shock");
const hypnosis = new AttackSkill("Hypnosis", 60, "Nightmare");
const recover = new AttackSkill("Recover", 30, "Heal");

// evolvePokemon(Pikatcu, "Raichu");
Pikatcu.learnAttackSkill(thunderbolt);

Pikatcu.learnAttackSkill(recover);

evolvePokemon(Tododile, "Croconaw");
Tododile.learnAttackSkill(fireball);

evolvePokemon(Golem, "Alohan-Golem");
Golem.learnAttackSkill(earthquake);

evolvePokemon(Gengar, "Haunter");
Gengar.learnAttackSkill(hypnosis);

console.log();
function battle(pokemon1, pokemon2) {
  console.log(`Battle between ${pokemon1.name} and ${pokemon2.name} begins!`);
  //  a while loop, so while both pokemon are still alive they fight, when one is dead then stop

  while (pokemon1.isAlive() && pokemon2.isAlive()) {
    // Pokemon 1 attacks Pokemon 2
    const skill1 =
      pokemon1.skills[Math.floor(Math.random() * pokemon1.skills.length)];
    pokemon1.attack(skill1.name, pokemon2);

    // Check if Pokemon 2 is still alive
    if (!pokemon2.isAlive()) {
      console.log(`${pokemon2.name} has fainted.`);
      break; // Pokemon 2 is no longer conscious, so the battle ends.
    }

    // Pokemon2 is attacking  Pokemon1
    const skill2 =
      pokemon2.skills[Math.floor(Math.random() * pokemon2.skills.length)];
    pokemon2.attack(skill2.name, pokemon1);

    // Check if Pokemon 1 is still alive
    if (!pokemon1.isAlive()) {
      console.log(`${pokemon1.name} rip.`);
      break; // Pokemon 1 is no longer conscious, so the battle ends.
      // break you can use it when you want to finish a loop
    }
  }

  console.log(
    `The battle between ${pokemon1.name} and ${pokemon2.name} has ended!`
  );
}
// let the battle begins
battle(Pikatcu, Tododile);
console.log(Tododile);
console.log("-----");
console.log(Pikatcu);

// console.log("         ");
// battle(Golem, Gengar);
// console.log(Golem);
// console.log(Gengar);
