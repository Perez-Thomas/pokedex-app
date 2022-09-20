document.querySelector("#search").addEventListener("click", getPokemon);

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function lowerCaseName(string) {
  return string.toLowerCase();
}

function getPokemon(e) {
  const name = document.querySelector("#pokemonName").value;
  const pokemonName = lowerCaseName(name);

  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    .then((response) => response.json())
    .then((data) => {
      document.querySelector(".pokemonBox").innerHTML = `
        <div class="pokemonSpriteContainer">
          <img class="pokemonSprite"
            src="${data.sprites.other["official-artwork"].front_default}"
            alt="${capitalizeFirstLetter(data.name)}"
          />
        </div>

        <div class="pokemonInfo">
          <br>
            <h1>${capitalizeFirstLetter(data.name)}</h1>
            <p>Pokemon: #${data.id}</p>
            <p>Weight: ${Math.round(data.weight * 0.2204622622)} lbs</p>
            <p>Height: ${(data.height * 0.328084).toFixed(1)} ft</p>
            <p>Type: ${capitalizeFirstLetter(data.types[0].type.name)}</p>
          <br>
        </div>
   `;
    })
    .catch((err) => {
      console.log("Pokemon Not Found", err);
    });
  e.preventDefault();
}
