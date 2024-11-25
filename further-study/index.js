// ===========================================
// 1 & 2
// ===========================================
let baseURL = "https://pokeapi.co/api/v2/pokemon";

document.addEventListener("DOMContentLoaded", () => {
  axios
    .get(`${baseURL}/?limit=1302`)
    .then((res) => {
      const allPokemon = res.data.results;

      // Pick three pokemon at random
      const randomPokemons = [];
      for (let i = 0; i < 3; i++) {
        const randomIdx = Math.floor(Math.random() * allPokemon.length);
        randomPokemons.push(allPokemon[randomIdx]);
      }

      // Make requests to the three pokemon
      const pokemonPromises = randomPokemons.map((pokemon) =>
        axios.get(pokemon.url)
      );

      return Promise.all(pokemonPromises);
    })
    .then((res) => {
      res.forEach((pokemon) => {
        console.log(pokemon.data);
      });
    })
    .catch((err) => {
      console.log(err);
    });

  //===========================================
  // 3
  // ===========================================
  axios
    .get(`${baseURL}/?limit=1302`)
    .then((res) => {
      const allPokemon = res.data.results;

      // Pick three pokemon at random
      const randomPokemons = [];
      for (let i = 0; i < 3; i++) {
        const randomIdx = Math.floor(Math.random() * allPokemon.length);
        randomPokemons.push(allPokemon[randomIdx]);
      }

      // Make requests to the three pokemon
      const pokemonPromises = randomPokemons.map((pokemon) =>
        axios.get(pokemon.url)
      );

      return Promise.all(pokemonPromises);
    })
    .then((pokemonResponses) => {
      const speciesPromises = [];

      // Collect the name and species url
      pokemonResponses.forEach((res) => {
        const name = res.data.name;
        const speciesUrl = res.data.species.url;

        speciesPromises.push({ promise: axios.get(speciesUrl), name: name });
      });

      const promiseArray = speciesPromises.map((species) => species.promise);

      return Promise.all(promiseArray).then((speciesResponses) => {
        speciesResponses.forEach((res, index) => {
          const name = speciesPromises[index].name;
          const flavorText = res.data.flavor_text_entries;
          console.log(flavorText);

          // Look for English description
          const englishDescription = flavorText.find(
            (entry) => entry.language.name === "en"
          );

          if (englishDescription) {
            console.log(`${name}: ${englishDescription.flavor_text}`);
          }
        });
      });
    })

    .catch((err) => {
      console.log(err);
    });

  //===========================================
  // 4
  // ===========================================
  document.querySelector(".btn").addEventListener("click", async () => {
    const container = document.querySelector(".container");

    // clear previous pokemon
    container.innerHTML = "";

    // get all pokemon
    const allPokemonResonse = await axios.get(`${baseURL}/?limit=1302`);
    const allPokemon = allPokemonResonse.data.results;

    // select three random pokemon
    const randomPokemons = [];
    for (let i = 0; i < 3; i++) {
      const randomIdx = Math.floor(Math.random() * allPokemon.length);
      randomPokemons.push(allPokemon[randomIdx]);
    }

    // get details for each random Pokémon
    const pokemonPromises = randomPokemons.map((pokemon) =>
      axios.get(pokemon.url)
    );
    const pokemonDetails = await Promise.all(pokemonPromises);

    // get species data for each Pokémon
    const speciesPromises = pokemonDetails.map((pokemon) => {
      const speciesURL = pokemon.data.species.url;
      return axios.get(speciesURL);
    });
    const speciesDetails = await Promise.all(speciesPromises);

    // generate UI for each Pokémon
    speciesDetails.forEach((species, index) => {
      const name = pokemonDetails[index].data.name;
      const image = pokemonDetails[index].data.sprites.front_default;
      const flavorTextEntry = species.data.flavor_text_entries.find(
        (entry) => entry.language.name === "en"
      );

      const description = flavorTextEntry
        ? flavorTextEntry.flavor_text
        : "Description not available";

      container.innerHTML = `
        <div class="card" style="width: 18rem;">
          <img src="${image}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${name}</h5>
            <p class="card-text">${description}</p>
          </div>
        </div>
      `;
    });
  });
});
