var playerLife     = document.querySelector("#playerLife");
var monsterLife    = document.querySelector("#monsterLife");
var monsterType    = document.querySelector("#monsterType");
var weaponSelect   = document.querySelector("#weaponSelect");
var resetButton    = document.querySelector("#reset");
var playerHit      = document.querySelector("#playerHit");
var monsterHit     = document.querySelector("#monsterHit");
var monsterWin     = document.querySelector("#monsterWin");
var playerHit      = document.querySelector("#playerHit");
var monsterSalt    = document.querySelector("#monsterSalt");

var monsters = [
  {
    monster: "Dragon",
    attackChance: 0.3,
    damage: 7,
    health: 150,
  },
  {
    monster: "Ogre",
    attackChance: 0.4,
    damage: 4,
    health: 100,
  },
  {
    monster: "Magic Monkey",
    attackChance: 0.9,
    damage: 1,
    health: 40,
  }
];

const weapons = [ 
  {
    weaponName: "sword",
    attackChance: 0.4,
    damage: 6,
  },
  {
    weaponName: "arrow",
    attackChance: 0.6,
    damage: 3,
  },
  {
    weaponName: "magicWand",
    attackChance: 0.9,
    damage: 2,
  },
  {
    weaponName: "fruitSalad",
    attackChance: 1,
    damage: 0.5,
  }
];

const startGame = () => {
  // setting variables
  pickMonster = Math.floor(Math.random() * monsters.length);
  playerHealth = 100;
  monsterName = monsters[pickMonster].monster;
  monsterHealth = monsters[pickMonster].health;
  // writing to DOM
  playerLife.innerHTML = playerHealth;
  monsterType.innerHTML = monsterName;
  monsterLife.innerHTML = monsterHealth;
};

startGame();

const clearGame = () => {
  monsterType.innerHTML = "";
  monsterLife.innerHTML = "";
  monsterHit.innerHTML = "";
  playerHit.innerHTML = "";
  playerWin.innerHTML = "";
  monsterWin.innerHTML = "";
  monsterSalt.innerHTML = "";
};

// user selects weapon and attacks
function weaponSelected() {
  // clear any previous attack messages
  monsterHit.innerHTML = "";
  playerHit.innerHTML = "";
  // grab user weapon choice
  var selectElement = weaponSelect;
  var output = selectElement.value;
  weapon = output;
  // battle if both players alive
  if (playerHealth > 0  && monsterHealth > 0) {
    // player chance to hit monster randomized
    playerAttackChance = weapons[weapon].attackChance + Math.random();
    // player damage inflicted randomized
    playerDamage = Math.floor(6 * (weapons[weapon].damage *(Math.random())));
      if (playerAttackChance >=1) { 
        // if hit successfully, remduce monster health total and display hit message
        monsterHealth = monsterHealth - playerDamage;
        monsterLife.innerHTML = monsterHealth;
        setTimeout(function(){playerHit.innerHTML = (`We hit the ${monsterName} for ${playerDamage} damage!! It's health is now ${monsterHealth}`)}, 100);
      } else {
        setTimeout(function(){playerHit.innerHTML = ("You missed!!!")}, 100);
      };
    // monster chance to hit monster randomized
    monsterAttackChance = monsters[pickMonster].attackChance + Math.random();
    // monster damage inflicted randomized
    monsterDamage = Math.floor(5 * (monsters[pickMonster].damage *(Math.random())));
      if (monsterAttackChance >= 1 ) {
        // if hit successfully, remduce player health total and display hit message
        playerHealth = playerHealth - monsterDamage;
        playerLife.innerHTML = playerHealth;
        setTimeout(function(){monsterHit.innerHTML =(`The ${monsterName} hit you for ${monsterDamage} damage!!! Your health is now ${playerHealth}`)}, 100);
      } else {
        setTimeout(function(){monsterHit.innerHTML =(`The ${monsterName} missed!`)}, 100);
      };   
  };
  // game victory?
  if (playerHealth <= 0 ){
    playerLife.innerHTML = "deth";
    monsterWin.innerHTML = (`The ${monsterName} sleweth you, slewedly!`)
    monsterSalt.innerHTML = "srsly dude?  sux"
  }else if
    (monsterHealth <= 0 ){
    monsterLife.innerHTML = "splat";
    playerWin.innerHTML = (`You killt the ${monsterName} dude. Epic.`)
  };
  return;
};

resetButton.addEventListener("click", function(){
    clearGame();
    startGame();
});
