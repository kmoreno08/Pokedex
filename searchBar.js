const search = document.getElementById("search");
const matchList = document.getElementById("match-list");
let pokeNameArray = [];

const fetchAllPokemons = async (searchText) => {
  for (let i = 1; i <= pokemons_number; i++) {
    await searchPokemon(i);
  }
  let matches = pokeNameArray.filter((poke) => {
    const regex = new RegExp(`^${searchText}`, "gi");
    return poke.match(regex);
  });

  // Show results in HTML
  let pokeSearchArray = removeDuplicates(matches);
  // console.log(pokeSearchArray);
  let html = "";
  pokeSearchArray.forEach((pokemon) => {
    html += `
      <div class="searchCard" onmousedown="pickPokemon(this)">
       <h4>${pokemon}</h4>
       </div>`;
  });

  matchList.innerHTML = html;
};

const searchPokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  const pokemon = await res.json();
  // add to array
  pokeNameArray.push(pokemon.name);
};
// Remove duplicate from arrays
function removeDuplicates(array) {
  return Array.from(new Set(array));
}
search.addEventListener("input", () => fetchAllPokemons(search.value));

// Click on searchcard to display specific pokemon
function pickPokemon(e) {
  let pokemonChoice = e.firstElementChild.firstChild.data;
  getSpecificPokemon(pokemonChoice);
}

// Grab specific pokemon - by name
const getSpecificPokemon = async (name) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
  const res = await fetch(url);
  const pokemon = await res.json();
  clearPokemon();
  clearSearchBar();
  createPokemonCard(pokemon);
};

// Clear pokemon cards
function clearPokemon() {
  const pokeContainer = document.querySelector("#poke_container");
  const pokeCard = pokeContainer.querySelectorAll(".pokemon");
  for (let i = 0; i < pokeCard.length; i++) {
    pokeCard[i].remove();
  }
}

// clear search bar value and drop down
function clearSearchBar() {
  const searchCard = document.querySelectorAll(".searchCard");
  const searchBar = document.querySelector("#search");
  for (let i = 0; i < searchCard.length; i++) {
    searchCard[i].remove();
  }
  search.value = "";
}

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

// Get fire pokemon only
const fetchFirePokemon = async () => {
  for (let i = 1; i <= pokemons_number; i++) {
    await getFirePokemon(i);
  }
};
const getFirePokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  const pokemon = await res.json();
  const poke_types = pokemon.types.map((type) => type.type.name);
  console.log(poke_types);
  if (poke_types[0] == "fire" || poke_types[1] == "fire") {
    createPokemonCard(pokemon);
  }
};

// Get grass pokemon only
const fetchGrassPokemon = async () => {
  for (let i = 1; i <= pokemons_number; i++) {
    await getGrassPokemon(i);
  }
};
const getGrassPokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  const pokemon = await res.json();
  const poke_types = pokemon.types.map((type) => type.type.name);
  console.log(poke_types);
  if (poke_types[0] == "grass" || poke_types[1] == "grass") {
    createPokemonCard(pokemon);
  }
};

// Show all pokemon
btnAll.addEventListener("click", function () {
  clearPokemon();
  fetchPokemons();
});

// Show all fire type pokemon
btnFire.addEventListener("click", function () {
  clearPokemon();
  fetchFirePokemon();
});

// show all grass type pokemon
btnGrass.addEventListener("click", function () {
  clearPokemon();
  fetchGrassPokemon();
});
