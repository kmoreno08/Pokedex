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
  poke_counter = 0;
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
  updatePokeCounter();
};
const getFirePokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  const pokemon = await res.json();
  const poke_types = pokemon.types.map((type) => type.type.name);
  if (poke_types[0] == "fire" || poke_types[1] == "fire") {
    createPokemonCard(pokemon);
  }
};

// Get grass pokemon only
const fetchGrassPokemon = async () => {
  for (let i = 1; i <= pokemons_number; i++) {
    await getGrassPokemon(i);
  }
  updatePokeCounter();
};
const getGrassPokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  const pokemon = await res.json();
  const poke_types = pokemon.types.map((type) => type.type.name);
  if (poke_types[0] == "grass" || poke_types[1] == "grass") {
    createPokemonCard(pokemon);
  }
};

// get electric pokemon only
const fetchElectricPokemon = async () => {
  for (let i = 1; i <= pokemons_number; i++) {
    await getElectricPokemon(i);
  }
  updatePokeCounter();
};
const getElectricPokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  const pokemon = await res.json();
  const poke_types = pokemon.types.map((type) => type.type.name);
  if (poke_types[0] == "electric" || poke_types[1] == "electric") {
    createPokemonCard(pokemon);
  }
};

// get water pokemon only
const fetchWaterPokemon = async () => {
  for (let i = 1; i <= pokemons_number; i++) {
    await getWaterPokemon(i);
  }
  updatePokeCounter();
};
const getWaterPokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  const pokemon = await res.json();
  const poke_types = pokemon.types.map((type) => type.type.name);
  if (poke_types[0] == "water" || poke_types[1] == "water") {
    createPokemonCard(pokemon);
  }
};

// get ground pokemon only
const fetchGroundPokemon = async () => {
  for (let i = 1; i <= pokemons_number; i++) {
    await getGroundPokemon(i);
  }
  updatePokeCounter();
};
const getGroundPokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  const pokemon = await res.json();
  const poke_types = pokemon.types.map((type) => type.type.name);
  if (poke_types[0] == "ground" || poke_types[1] == "ground") {
    createPokemonCard(pokemon);
  }
};

// get rock pokemon only
const fetchRockPokemon = async () => {
  for (let i = 1; i <= pokemons_number; i++) {
    await getRockPokemon(i);
  }
  updatePokeCounter();
};
const getRockPokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  const pokemon = await res.json();
  const poke_types = pokemon.types.map((type) => type.type.name);
  if (poke_types[0] == "rock" || poke_types[1] == "rock") {
    createPokemonCard(pokemon);
  }
};

// get fairy pokemon only
const fetchFairyPokemon = async () => {
  for (let i = 1; i <= pokemons_number; i++) {
    await getFairyPokemon(i);
  }
  updatePokeCounter();
};
const getFairyPokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  const pokemon = await res.json();
  const poke_types = pokemon.types.map((type) => type.type.name);
  if (poke_types[0] == "fairy" || poke_types[1] == "fairy") {
    createPokemonCard(pokemon);
  }
};

// get poison pokemon only
const fetchPoisonPokemon = async () => {
  for (let i = 1; i <= pokemons_number; i++) {
    await getPoisonPokemon(i);
  }
  updatePokeCounter();
};
const getPoisonPokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  const pokemon = await res.json();
  const poke_types = pokemon.types.map((type) => type.type.name);
  if (poke_types[0] == "poison" || poke_types[1] == "poison") {
    createPokemonCard(pokemon);
  }
};

// get bug pokemon only
const fetchBugPokemon = async () => {
  for (let i = 1; i <= pokemons_number; i++) {
    await getBugPokemon(i);
  }
  updatePokeCounter();
};
const getBugPokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  const pokemon = await res.json();
  const poke_types = pokemon.types.map((type) => type.type.name);
  if (poke_types[0] == "bug" || poke_types[1] == "bug") {
    createPokemonCard(pokemon);
  }
};

// get dragon pokemon only
const fetchDragonPokemon = async () => {
  for (let i = 1; i <= pokemons_number; i++) {
    await getDragonPokemon(i);
  }
  updatePokeCounter();
};
const getDragonPokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  const pokemon = await res.json();
  const poke_types = pokemon.types.map((type) => type.type.name);
  if (poke_types[0] == "dragon" || poke_types[1] == "dragon") {
    createPokemonCard(pokemon);
  }
};

// get psychic pokemon only
const fetchPsychicPokemon = async () => {
  for (let i = 1; i <= pokemons_number; i++) {
    await getPsychicPokemon(i);
  }
  updatePokeCounter();
};
const getPsychicPokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  const pokemon = await res.json();
  const poke_types = pokemon.types.map((type) => type.type.name);
  if (poke_types[0] == "psychic" || poke_types[1] == "psychic") {
    createPokemonCard(pokemon);
  }
};

// get flying pokemon only
const fetchFlyingPokemon = async () => {
  for (let i = 1; i <= pokemons_number; i++) {
    await getFlyingPokemon(i);
  }
  updatePokeCounter();
};
const getFlyingPokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  const pokemon = await res.json();
  const poke_types = pokemon.types.map((type) => type.type.name);
  if (poke_types[0] == "flying" || poke_types[1] == "flying") {
    createPokemonCard(pokemon);
  }
};

// get fighting pokemon only
const fetchFightingPokemon = async () => {
  for (let i = 1; i <= pokemons_number; i++) {
    await getFightingPokemon(i);
  }
  updatePokeCounter();
};
const getFightingPokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  const pokemon = await res.json();
  const poke_types = pokemon.types.map((type) => type.type.name);
  if (poke_types[0] == "fighting" || poke_types[1] == "fighting") {
    createPokemonCard(pokemon);
  }
};

// get normal pokemon only
const fetchNormalPokemon = async () => {
  for (let i = 1; i <= pokemons_number; i++) {
    await getNormalPokemon(i);
  }
  updatePokeCounter();
};
const getNormalPokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  const pokemon = await res.json();
  const poke_types = pokemon.types.map((type) => type.type.name);
  if (poke_types[0] == "normal" || poke_types[1] == "normal") {
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

// show all electric type pokemon
btnElectric.addEventListener("click", function () {
  clearPokemon();
  fetchElectricPokemon();
});

// show all water type pokemon
btnWater.addEventListener("click", function () {
  clearPokemon();
  fetchWaterPokemon();
});

// show all ground type pokemon
btnGround.addEventListener("click", function () {
  clearPokemon();
  fetchGroundPokemon();
});

// show all rock type pokemon
btnRock.addEventListener("click", function () {
  clearPokemon();
  fetchRockPokemon();
});

// show all fairy type pokemon
btnFairy.addEventListener("click", function () {
  clearPokemon();
  fetchFairyPokemon();
});

// show all poison type pokemon
btnPoison.addEventListener("click", function () {
  clearPokemon();
  fetchPoisonPokemon();
});

// show all bug type pokemon
btnBug.addEventListener("click", function () {
  clearPokemon();
  fetchBugPokemon();
});

// show all dragon type pokemon
btnDragon.addEventListener("click", function () {
  clearPokemon();
  fetchDragonPokemon();
});

// show all psychic type pokemon
btnPsychic.addEventListener("click", function () {
  clearPokemon();
  fetchPsychicPokemon();
});

// show all flying type pokemon
btnFlying.addEventListener("click", function () {
  clearPokemon();
  fetchFlyingPokemon();
});

// show all flying type pokemon
btnFighting.addEventListener("click", function () {
  clearPokemon();
  fetchFightingPokemon();
});

// show all flying type pokemon
btnNormal.addEventListener("click", function () {
  clearPokemon();
  fetchNormalPokemon();
});
