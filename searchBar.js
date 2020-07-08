// Modal - search bar
const clearBtn = document.querySelector(".modal-search-clear");
const searchBox = document.querySelector(".search-box");
const modalSearchBox = document.querySelector(".modal-search-box-text");
const modal = document.querySelector("#modal");
//close button on modal
const closeBtn = document.querySelector(".modal-close-btn");
// Listen for open click
searchBox.addEventListener("click", openModal);
// Listen for close click
closeBtn.addEventListener("click", closeModal);
// Listen for clear button
clearBtn.addEventListener("click", clearTextBox);
// Function to clear text box
function clearTextBox() {
  modalSearchBox.value = " ";
}
// Function to open modal
function openModal() {
  modal.style.display = "block";
}
// Function to close modal
function closeModal() {
  modal.style.display = "none";
}
// User input match with pokemon search bar
const matchList = document.getElementById("match-list");

modalSearchBox.addEventListener("input", () =>
  pokemonInfo(modalSearchBox.value, pokemonArrayObject)
);

function pokemonInfo(searchText) {
  for (let i = 0; i < pokemons_number; i++) {
    console.log(pokemonArrayObject[i]);
  }
  // Filter names and return match
  let matches = pokeNameArray.filter((poke) => {
    const regex = new RegExp(`^${searchText}`, "gi");
    return poke.match(regex);
  });

  // Show results in search bar modal
  let searchCardInnerHTML = "";
  matches.forEach((pokemonName) => {
    // Capitalize first letter
    const name = pokemonName[0].toUpperCase() + pokemonName.slice(1);

    // Data
    const pokemonID = pokemonObject[pokemonName].ID;

    const pokemonHealth = pokemonObject[pokemonName].health;
    const pokemonAttack = pokemonObject[pokemonName].attack;
    const pokemonDefense = pokemonObject[pokemonName].defense;
    searchCardInnerHTML += `
    <div class="searchCard" onmousedown="pickPokemon(this)">
      <div class="search-card-left">
        <h5>#${pokemonID}</h5>
        <div class="search-card-img-container">
              <img src="https://pokeres.bastionbot.org/images/pokemon/${pokemonID}.png" alt="${name}" />
        </div>
        <h4>${name}</h4>
      </div>
      <div class="search-card-right">
          <h5>Health: ${pokemonHealth}</h5>
          <h5>Attack: ${pokemonAttack}</h5>
          <h5>Defense: ${pokemonDefense}</h5>
      </div>
    </div>`;
  });
  matchList.innerHTML = searchCardInnerHTML;
}

// Remove duplicate from arrays
function removeDuplicates(array) {
  return Array.from(new Set(array));
}
// Click on searchcard to display specific pokemon
function pickPokemon(e) {
  let pokemonChoice = e.firstElementChild.childNodes[5].textContent;
  getSpecificPokemon(pokemonChoice);
}
// Grab specific pokemon - by name
const getSpecificPokemon = async (name) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`;
  const res = await fetch(url);
  const pokemon = await res.json();
  clearPokemon();
  clearSearchBar();
  closeModal();
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
  removeCurrentBtnClass();
}
// clear search bar value and drop down
function clearSearchBar() {
  const searchCard = document.querySelectorAll(".searchCard");
  for (let i = 0; i < searchCard.length; i++) {
    searchCard[i].remove();
  }
  modalSearchBox.value = "";
}
