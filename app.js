const poke_container = document.getElementById("poke_container");
const poke_counter_div = document.querySelector(".poke-counter");
// Includes Mew 151 - Max 964
const pokemons_number = 151;
const pokemons_max_number = 964;
//Array for pokemon names
const pokeNameArray = [];
// Object for all pokemon
let pokemonArrayObject = [];
let poke_counter = 0;
// Grab pokemon from API
const fetchPokemons = async () => {
  for (let i = 1; i <= pokemons_number; i++) {
    await getPokemon(i);
  }
};
const getPokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  const pokemon = await res.json();
  addPokemonObject(pokemon);
};

function main() {
  fetchPokemons();
  setTimeout(function () {
    for (let i = 0; i < pokemons_number; i++) {
      createPokemonCard(i);
    }
  }, 5000);
}
// Run Main
main();
// Created pokemon card
function createPokemonCard(i) {
  // Colors for type
  const colors = {
    fire: "#FDDFDF",
    grass: "#DEFDE0",
    electric: "#FCF7DE",
    water: "#DEF3FD",
    ground: "#f4e7da",
    rock: "#d5d5d4",
    fairy: "#fceaff",
    poison: "#98d7a5",
    bug: "#f8d5a3",
    dragon: "#97b3e6",
    psychic: "#eaeda1",
    flying: "#313131",
    fighting: "#E6E0D4",
    normal: "#F5F5F5",
    ice: "#456EA7",
  };

  // Count each pokemon for poke counter
  poke_counter += 1;

  // Add each pokemon to div with class
  const pokemonEl = document.createElement("div");
  pokemonEl.classList.add("pokemon");

  // Grab data from pokemon Object
  /////////////////////////////////////
  const pokemonName = pokemonArrayObject[i].name;
  const pokemonID = pokemonArrayObject[i].ID;
  const type1 = pokemonArrayObject[i].type1;
  const type2 = pokemonArrayObject[i].type2;
  const colorBackground1 = colors[type1];
  const colorBackground2 = colors[type2];
  // Gradient background color by type
  pokemonEl.style.background =
    "linear-gradient(61deg, " +
    colorBackground1 +
    "  54.3%," +
    colorBackground2 +
    " 50%)";
  // // Add Html to pokemon card
  const pokeInnerHTML = `
        <div class="img-container">
            <img src="https://pokeres.bastionbot.org/images/pokemon/${pokemonID}.png" alt="${pokemonName}" />
        </div>
        <div class="info">
            <span class="number">#${pokemonID
              .toString()
              //Add digits in front
              .padStart(3, "0")}</span>
            <h3 class="name">${pokemonName}</h3>
            <small class="type">Type: ${type1}<span></span></small></br>
             <small class="type2">Type: ${type2} <span></span></small></br>

        </div>
    `;
  pokemonEl.innerHTML = pokeInnerHTML;
  // Append pokemon card to container
  poke_container.appendChild(pokemonEl);
  // Push name to array for search bar
  pokeNameArray.push(pokemonName);
  // Update pokemon Counter
  updatePokeCounter();
}

// Count each pokemon for poke counter
// poke_counter += 1;

//Update and display poke counter
function updatePokeCounter() {
  poke_counter_div.innerHTML = `<h4>Cards</h4>
        ${poke_counter} of ${pokemons_number}`;
}

function addPokemonObject(pokemon) {
  // Grabs the types
  const poke_types = pokemon.types.map((type) => type.type.name);
  // Type with correct color
  let type2;
  let type1 = poke_types[0];
  if (!poke_types[1]) {
    type2 = type1;
  } else {
    type2 = poke_types[1];
  }
  //Get pokemon name
  const pokemonName = pokemon.name;
  // Get Id Number
  const idNumber = pokemon.id;
  // Front default sprite link
  const frontDefaultSprite = pokemon.sprites.front_default;
  /* 
    all 6 base-stats in poke_base_stats array:
      0 = hp
      1 = attack
      2 = defense
  */
  const poke_base_stats = pokemon.stats.map((stat) => stat.base_stat);
  // Health points
  const pokemonHealthPoints = poke_base_stats[0];
  // Attack points
  const pokemonAttackPoints = poke_base_stats[1];
  // Defense points
  const pokemonDefensePoints = poke_base_stats[2];
  // Add data to pokemon object
  pokemonArrayObject.push({
    ID: idNumber,
    name: pokemonName,
    sprite: frontDefaultSprite,
    health: pokemonHealthPoints,
    attack: pokemonAttackPoints,
    defense: pokemonDefensePoints,
    type1: type1,
    type2: type2,
  });
}
//////// Button types ////////////
// button for types
const btnAll = document.getElementById("btn-all");
const btnFire = document.getElementById("btn-fire");
const btnGrass = document.getElementById("btn-grass");
const btnElectric = document.getElementById("btn-electric");
const btnWater = document.getElementById("btn-water");
const btnGround = document.getElementById("btn-ground");
const btnRock = document.getElementById("btn-rock");
const btnFairy = document.getElementById("btn-fairy");
const btnPoison = document.getElementById("btn-poison");
const btnBug = document.getElementById("btn-bug");
const btnDragon = document.getElementById("btn-dragon");
const btnPsychic = document.getElementById("btn-psychic");
const btnFlying = document.getElementById("btn-flying");
const btnFighting = document.getElementById("btn-fighting");
const btnNormal = document.getElementById("btn-normal");

// toggle highlight for current button
const allBtn = document.querySelectorAll(".toggle-button");
function removeCurrentBtnClass() {
  for (let i = 0; i < allBtn.length; i++) {
    allBtn[i].classList.remove("current-button");
  }
}
// highlight current button
function addCurrentBtnClass(element) {
  element.classList.add("current-button");
}
// Show all pokemon
btnAll.addEventListener("click", function () {
  clearPokemon();
  addCurrentBtnClass(btnAll);
  allPokemonCards();
});

function allPokemonCards() {
  for (let i = 0; i < pokemons_number; i++) {
    createPokemonCard(i);
  }
}
// Show all fire type pokemon
btnFire.addEventListener("click", function () {
  clearPokemon();
  addCurrentBtnClass(btnFire);
  firePokemonCards();
});
// Check both types then create pokemon card
function firePokemonCards() {
  for (let i = 0; i < pokemons_number; i++) {
    const type1 = pokemonArrayObject[i].type1;
    const type2 = pokemonArrayObject[i].type2;
    if (type1 === "fire" || type2 === "fire") {
      createPokemonCard(i);
    }
  }
}
// show all grass type pokemon
btnGrass.addEventListener("click", function () {
  clearPokemon();
  addCurrentBtnClass(btnGrass);
  grassPokemonCards();
});
// Check both types then create pokemon card
function grassPokemonCards() {
  for (let i = 0; i < pokemons_number; i++) {
    const type1 = pokemonArrayObject[i].type1;
    const type2 = pokemonArrayObject[i].type2;
    if (type1 === "grass" || type2 === "grass") {
      createPokemonCard(i);
    }
  }
}
// show all electric type pokemon
btnElectric.addEventListener("click", function () {
  clearPokemon();
  addCurrentBtnClass(btnElectric);
  electricPokemonCards();
});
// Check both types then create pokemon card
function electricPokemonCards() {
  for (let i = 0; i < pokemons_number; i++) {
    const type1 = pokemonArrayObject[i].type1;
    const type2 = pokemonArrayObject[i].type2;
    if (type1 === "electric" || type2 === "electric") {
      createPokemonCard(i);
    }
  }
}
// show all water type pokemon
btnWater.addEventListener("click", function () {
  clearPokemon();
  addCurrentBtnClass(btnWater);
  waterPokemonCards();
});
// Check both types then create pokemon card
function waterPokemonCards() {
  for (let i = 0; i < pokemons_number; i++) {
    const type1 = pokemonArrayObject[i].type1;
    const type2 = pokemonArrayObject[i].type2;
    if (type1 === "water" || type2 === "water") {
      createPokemonCard(i);
    }
  }
}
// show all ground type pokemon
btnGround.addEventListener("click", function () {
  clearPokemon();
  addCurrentBtnClass(btnGround);
  groundPokemonCards();
});
// Check both types then create pokemon card
function groundPokemonCards() {
  for (let i = 0; i < pokemons_number; i++) {
    const type1 = pokemonArrayObject[i].type1;
    const type2 = pokemonArrayObject[i].type2;
    if (type1 === "ground" || type2 === "ground") {
      createPokemonCard(i);
    }
  }
}
// show all rock type pokemon
btnRock.addEventListener("click", function () {
  clearPokemon();
  addCurrentBtnClass(btnRock);
  rockPokemonCards();
});
// Check both types then create pokemon card
function rockPokemonCards() {
  for (let i = 0; i < pokemons_number; i++) {
    const type1 = pokemonArrayObject[i].type1;
    const type2 = pokemonArrayObject[i].type2;
    if (type1 === "rock" || type2 === "rock") {
      createPokemonCard(i);
    }
  }
}
// show all fairy type pokemon
btnFairy.addEventListener("click", function () {
  clearPokemon();
  addCurrentBtnClass(btnFairy);
  fairyPokemonCards();
});
// Check both types then create pokemon card
function fairyPokemonCards() {
  for (let i = 0; i < pokemons_number; i++) {
    const type1 = pokemonArrayObject[i].type1;
    const type2 = pokemonArrayObject[i].type2;
    if (type1 === "fairy" || type2 === "fairy") {
      createPokemonCard(i);
    }
  }
}
// show all poison type pokemon
btnPoison.addEventListener("click", function () {
  clearPokemon();
  addCurrentBtnClass(btnPoison);
  poisonPokemonCards();
});
// Check both types then create pokemon card
function poisonPokemonCards() {
  for (let i = 0; i < pokemons_number; i++) {
    const type1 = pokemonArrayObject[i].type1;
    const type2 = pokemonArrayObject[i].type2;
    if (type1 === "poison" || type2 === "poison") {
      createPokemonCard(i);
    }
  }
}
// show all bug type pokemon
btnBug.addEventListener("click", function () {
  clearPokemon();
  addCurrentBtnClass(btnBug);
  bugPokemonCards();
});
// Check both types then create pokemon card
function bugPokemonCards() {
  for (let i = 0; i < pokemons_number; i++) {
    const type1 = pokemonArrayObject[i].type1;
    const type2 = pokemonArrayObject[i].type2;
    if (type1 === "bug" || type2 === "bug") {
      createPokemonCard(i);
    }
  }
}
// show all dragon type pokemon
btnDragon.addEventListener("click", function () {
  clearPokemon();
  addCurrentBtnClass(btnDragon);
  dragonPokemonCards();
});
// Check both types then create pokemon card
function dragonPokemonCards() {
  for (let i = 0; i < pokemons_number; i++) {
    const type1 = pokemonArrayObject[i].type1;
    const type2 = pokemonArrayObject[i].type2;
    if (type1 === "dragon" || type2 === "dragon") {
      createPokemonCard(i);
    }
  }
}
// show all psychic type pokemon
btnPsychic.addEventListener("click", function () {
  clearPokemon();
  addCurrentBtnClass(btnPsychic);
  psychicPokemonCards();
});
// Check both types then create pokemon card
function psychicPokemonCards() {
  for (let i = 0; i < pokemons_number; i++) {
    const type1 = pokemonArrayObject[i].type1;
    const type2 = pokemonArrayObject[i].type2;
    if (type1 === "psychic" || type2 === "psychic") {
      createPokemonCard(i);
    }
  }
}
// show all flying type pokemon
btnFlying.addEventListener("click", function () {
  clearPokemon();
  addCurrentBtnClass(btnFlying);
  flyingPokemonCards();
});
// Check both types then create pokemon card
function flyingPokemonCards() {
  for (let i = 0; i < pokemons_number; i++) {
    const type1 = pokemonArrayObject[i].type1;
    const type2 = pokemonArrayObject[i].type2;
    if (type1 === "flying" || type2 === "flying") {
      createPokemonCard(i);
    }
  }
}
// show all flying type pokemon
btnFighting.addEventListener("click", function () {
  clearPokemon();
  addCurrentBtnClass(btnFighting);
  fightingPokemonCards();
});
// Check both types then create pokemon card
function fightingPokemonCards() {
  for (let i = 0; i < pokemons_number; i++) {
    const type1 = pokemonArrayObject[i].type1;
    const type2 = pokemonArrayObject[i].type2;
    if (type1 === "fighting" || type2 === "fighting") {
      createPokemonCard(i);
    }
  }
}
// show all flying type pokemon
btnNormal.addEventListener("click", function () {
  clearPokemon();
  addCurrentBtnClass(btnNormal);
  normalPokemonCards();
});
// Check both types then create pokemon card
function normalPokemonCards() {
  for (let i = 0; i < pokemons_number; i++) {
    const type1 = pokemonArrayObject[i].type1;
    const type2 = pokemonArrayObject[i].type2;
    if (type1 === "normal" || type2 === "normal") {
      createPokemonCard(i);
    }
  }
}
