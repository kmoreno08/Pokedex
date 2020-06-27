const search = document.getElementById("search");
const matchList = document.getElementById("match-list");
// const searchCard = document.querySelector(".searchcard");
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
      <div class="searchCard" onclick="pickPokemon(this)">
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

// Grab specific pokemon
const getSpecificPokemon = async (name) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
  const res = await fetch(url);
  const pokemon = await res.json();
  console.log(pokemon.name);
  createPokemonCard(pokemon);
};
