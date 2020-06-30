const poke_container = document.getElementById("poke_container");
const poke_counter_div = document.querySelector(".poke-counter");
// Includes Mew 151 - Max 964
const pokemons_number = 151;
const pokemons_max_number = 964;
let poke_counter = 0;
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
const main_types = Object.keys(colors);

const fetchPokemons = async () => {
  for (let i = 1; i <= pokemons_number; i++) {
    await getPokemon(i);
  }
  updatePokeCounter();
};

// Grab pokemon and return in json
const getPokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  const pokemon = await res.json();
  createPokemonCard(pokemon);
};

function createPokemonCard(pokemon) {
  // Count each pokemon for poke counter
  poke_counter += 1;
  // Add each pokemon to div with class
  const pokemonEl = document.createElement("div");
  pokemonEl.classList.add("pokemon");
  // Grabs the type
  const poke_types = pokemon.types.map((type) => type.type.name);

  /* all 6 base-stats in array:
      0 = hp
      1 = attack
      2 = defense
      3 = special attack
      4 = special-defense
      5 = speed */
  const poke_base_stats = pokemon.stats.map((stat) => stat.base_stat);
  // weight
  const poke_weight = pokemon.weight;

  // base experience
  const poke_base_exp = pokemon.base_experience;
  // front image for back of card
  const front_sprite = pokemon.sprites.front_default;
  // all pokemon moves on to array
  const poke_moves = pokemon.moves.map((move) => move.move.name);

  // Goes over types and finds the first match
  const type = main_types.find((type) => poke_types.indexOf(type) > -1);

  // Capitalize first letter
  const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);

  // Type with correct color
  let type2;
  let type1 = poke_types[0];
  if (!poke_types[1]) {
    type2 = type1;
  } else {
    type2 = poke_types[1];
  }
  const colorBackground1 = colors[type1];
  const colorBackground2 = colors[type2];

  // Gradient background color by type
  pokemonEl.style.background =
    "linear-gradient(61deg, " +
    colorBackground1 +
    "  54.3%," +
    colorBackground2 +
    " 50%)";

  // Add Html to pokemon card
  const pokeInnerHTML = `
        <div class="img-container">
            <img src="https://pokeres.bastionbot.org/images/pokemon/${
              pokemon.id
            }.png" alt="${name}" />
        </div>
        <div class="info">
            <span class="number">#${pokemon.id
              .toString()
              //Add digits in front
              .padStart(3, "0")}</span>
            <h3 class="name">${name}</h3>
            <small class="type">Type: ${type1}<span></span></small></br>
             <small class="type2">Type: ${type2} <span></span></small></br>
           
        </div>
    `;

  pokemonEl.innerHTML = pokeInnerHTML;

  // Append pokemon card to container
  poke_container.appendChild(pokemonEl);
}
fetchPokemons();

//Update and display poke counter
function updatePokeCounter() {
  poke_counter_div.innerHTML = `<h4>Cards</h4>
        ${poke_counter} of ${pokemons_number}`;
}
