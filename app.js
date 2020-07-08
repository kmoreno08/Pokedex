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
    createPokemonCard(pokemonArrayObject);
  }, 5000);
}

function createPokemonCard(pokemonArrayObject) {
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
  // poke_counter += 1;

  for (let i = 0; i < pokemons_number; i++) {
    // Add each pokemon to div with class
    const pokemonEl = document.createElement("div");
    pokemonEl.classList.add("pokemon");

    // Grab data from pokemon Object
    /////////////////////////////////////
    const pokemonName = pokemonArrayObject[i].name;
    const pokemonID = pokemonArrayObject[i].ID;
    // const pokemonHealth = pokemonArrayObject[i].health;

    // const pokemonAttack = pokemonArrayObject[i].attack;
    // const pokemonDefense = pokemonArrayObject[i].defense;
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
  }
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

main();
