const search = document.getElementById("search");
const matchList = document.getElementById("match-list");
let pokeNameArray = [];

const fetchAllPokemons = async (searchText) => {
  for (let i = 1; i <= 10; i++) {
    await searchPokemon(i);
  }
  let matches = pokeNameArray.filter((poke) => {
    const regex = new RegExp(`^${searchText}`, "gi");
    return poke.match(regex);
  });
  let pokeSearchArray = removeDuplicates(matches);
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
