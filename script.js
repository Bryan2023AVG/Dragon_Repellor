let xp = 20;
let health = 1000;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const xpText = document.querySelector("#xpText");
const text = document.querySelector("#text");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterNameText = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");

const weapons = [
  {
    name: "Stick",
    power: 5
  },
  {
    name: "Dagger",
    power: 30
  },
  {
    name: "Clawhammer",
    power: 50
  },
  {
    name: "Sword",
    power: 100
  }
];

const locations = [
  {
    name: "Town square",
    "button text": ["Go to Store", "Go to cave", "Fight Dragon"],
    "button functions": [goStore, goCave, fightDragon],
    "text": "You are in town square. You see a sign that says \"store\"."
  },
  {
    name: "Store",
    "button text": ["Buy 10 health (10 gold)", "Buy weapon(30 gold)", "Go to town square"],
    "button functions": [buyHealth, buyWeapon, goTown],
    "text": "You enter the store."
  },
  {
    name: "Cave",
    "button text": ["Fight Slime", "Fight fanged Beast", "Go to town square"],
    "button functions": [fightSlime, fightBeast, goTown],
    "text": "You enter the cave, you see some monster."
  },
  {
    name: "fight",
    "button text": ["Attack", "Dodge", "Run"],
    "button functions": [attack, dodge, goTown],
    "text": "You are fighting a monster"
  },
  {
    name: "killMonster",
    "button text": ["Go to town Square", "Go to town Square", "Go to town Square"],
    "button functions": [goTown, goTown, easterEgg],
    "text": 'The monster screams "ARG!" as it dies. You gained exeperience points and find gold.'
  }
  ,
  {
    name: "lose",
    "button text": ["Replay?", "Replay?", "Replay?"],
    "button functions": [restart, restart, restart],
    "text": "You Died."
  },
  {
    name: "Win",
    "button text": ["Replay?", "Replay?", "Replay?"],
    "button functions": [restart, restart, restart],
    "text": "You defeated the Dragon you win the game!"
  },
  {
    name: "Easteregg",
    "button text": ["2?", "8?", "Go to town Square?"],
    "button functions": [pickTwo, pickEight, goTown],
    "text": "You find a secret game. Pick a number above. Ten numbers will be randomly choosed between  and 10. If the numbers you choose matches one of the random numbers, you win!"
  }
];


monsters = [

  {
    name: "slime",
    level: 2,
    health: 15
  },
  {
    name: "fanged beast",
    level: 8,
    health: 60
  },
  {
    name: "dragon",
    level: 20,
    health: 300
  }
];

//initalise buttons
//button1.addEventListener("click",goStore);
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;



function update(location) {
  monsterStats.style.display = "none";
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerText = location.text;
}


function goTown() {
  update(locations[0]);
}

function goStore() {
  update(locations[1]);
}

function goCave() {
  update(locations[2]);
}

function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
  }
  else {
    text.innerText = "You do not have enough gold to buy health.";
  }
}

function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeapon++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name;
      text.innerText = "Now you have a " + newWeapon + ".";
      inventory.push(newWeapon);
      text.innerText = text.innerText + "In your inventory you have" + inventory;
    }
    else {
      text.innerText = "You do not have enough gold to buy weapon.";
    }
  }
  else {
    text.innerText = "You already have the most powerful waepon";
    button2.innerText = "Sell weapon for 15 gold";
    button2.onclick = sellWeapon;
  }

}



function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText = "You sold a " + currentWeapon + ".";
    text.innerText += "In your inventory you  have " + inventory;
  }
  else {
    text.innerText = "Don't sell your only weapon!";
  }
}


function fightSlime() {
  fighting = 0;
  goFight();
}

function fightBeast() {
  fighting = 1;
  goFight();
}

function fightDragon() {
  fighting = 2;
  goFight();
}


function goFight() {
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterNameText.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
}

function attack() {
  text.innerText = "The " + monsters[fighting].name + " attacks";
  text.innerText += " You attack it with your" + weapons[currentWeapon].name + ".";

  if (isMonsterHit()) {
    health -= getMonsterAttackValue(monsters[fighting].level);
  }
  else {
    text.innerText = "You missed";
  }

  monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;

  if (health <= 0) {
    lose();
  }
  else if (monsterHealth <= 0) {
    fighting === 2 ? winGame() : defeatMonster();
  }


  if (Math.random() <= 0.1 && inventory.length > 1) {
    text.innerText += "Your " + inventory.pop() + "breaks.";
    currentWeapon--;
  }

}

function getMonsterAttackValue(level) {
  let hit = (level * 5) - Math.floor(Math.random() * xp);
  console.log(hit);
  return hit;
}

function isMonsterHit() {
  return Math.random() > 0.2 || health <= 20;
}

function dodge() {
  text.innerText = "You dodge the attacke from " + monsters[fighting].name + ".";
}

function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);
}

function lose() {
  update(locations[5]);
}

function restart() {
  xp = 20;
  health = 1000;
  gold = 50;
  currentWeapon = 0;
  inventory = ["stick"];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  goTown();

}

function winGame() {
  update(locations[6]);
}

function easterEgg() {
  update(locations[7]);
}

function pickTwo() {
  pick(2);
}

function pickEight() {
  pick(8);
}

function pick(guess) {
  let numbers = [];

  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11));
  }

  text.innerText = "You picked" + guess + " Here are the random numbers:\n";
  for (let i = 0; i < 10; i++) {
    text.innerText += numbers[i] + "\n";
  }

  if (numbers.indexOf(guess) !== -1) {
    text.innerText += "Right you won 20 gold";
    gold += 20;
    goldText.innerText = gold;
  }
  else {
    text.innerText += "Wrong you lose 10 health";
    health -= 20;
    healthText.innerText = health;

    if (health <= 0) {
      lose();
    }
  }
}