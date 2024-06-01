// Creating an IIFE (Immediately Invoked Function Expression) to encapsulate the pokemonRepository
let pokemonRepository = (function () {
  // Array to store the list of Pokémon
  let pokemonList = [];
  // API URL to fetch the first 151 Pokémon
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=151';

  /* Function to create and add a list item for each Pokémon */
  function addListItem(pokemon) {
      // Select the list group element from the DOM
      let pokemonList = document.querySelector('.list-group');
      // Create a new list item element
      let listPokemon = document.createElement('li');
      // Add classes to the list item for styling
      listPokemon.classList.add('list-group-item', 'list-group-item-action', 'mb-2');
      // Create a new button element
      let button = document.createElement('button');

      // Set the button text to the Pokémon's name
      button.innerText = pokemon.name;
      // Add classes to the button for styling
      button.classList.add('btn', 'btn-block');
      // Set the data attributes for the modal
      button.setAttribute('data-target', 'data-toggle="modal"', 'modal', '#pokemonModal');

      // Create an image element for the Pokémon
      let image = document.createElement('img');
      // Set the image source to the Pokémon's image URL
      image.src = pokemon.imageUrl;
      // Set the image size and margin
      image.style.width = '50px';
      image.style.height = '50px';
      image.style.marginRight = '10px';

      // Prepend the image to the button
      button.prepend(image);
      // Append the button to the list item
      listPokemon.appendChild(button);
      // Append the list item to the list group
      pokemonList.appendChild(listPokemon);

      // Add an event listener to the button to show details when clicked
      button.addEventListener('click', function () {
          showDetails(pokemon);
      });
  }

  /* Function to add a new Pokémon to the array */
  function add(pokemon) {
      // Check if the input is an object
      if (typeof pokemon === 'object') {
          // Add the Pokémon to the array
          pokemonList.push(pokemon);
      } else {
          // Log an error if the input is not an object
          console.log('Invalid data type');
      }
  }

  /* Function to return the list of all Pokémon */
  function getAll() {
      return pokemonList;
  }

  /* Function to fetch the list of Pokémon from the API */
  function loadList() {
      return fetch(apiUrl).then(function (response) {
          // Parse the JSON response
          return response.json();
      }).then(function (json) {
          // Iterate over the results
          json.results.forEach(function (item, index) {
              // Create a Pokémon object with name, URL, and index
              let pokemon = {
                  name: item.name,
                  detailsUrl: item.url,
                  index: index
              };
              // Add the Pokémon to the array
              add(pokemon);
          });
          // Load the details for all Pokémon
          return Promise.all(pokemonList.map(pokemon => loadDetails(pokemon)));
      }).catch(function (e) {
          // Log any errors
          console.error(e);
      });
  }

  /* Function to fetch the details of a Pokémon */
  function loadDetails(pokemon) {
      let url = pokemon.detailsUrl;
      return fetch(url).then(function (response) {
          // Parse the JSON response
          return response.json();
      }).then(function (details) {
          // Add the details to the Pokémon object
          pokemon.imageUrl = details.sprites.front_default;
          pokemon.height = details.height;
          pokemon.weight = details.weight;
          pokemon.types = [...details.types];
          pokemon.abilities = [...details.abilities];
      }).catch(function (e) {
          // Log any errors
          console.error(e);
      });
  }

  /* Function to show the details of a Pokémon */
  function showDetails(pokemon) {
      // Load the details and then show the modal
      pokemonRepository.loadDetails(pokemon).then(function () {
          showModal(pokemon);
      });
  }

  /* Function to display the modal with Pokémon details */
  function showModal(pokemon) {
      // Select the modal body and title elements
      let modalBody = $('.modal-body');
      let modalTitle = $('.modal-title');

      // Clear any existing content
      modalTitle.empty();
      modalBody.empty();

      // Create and append the Pokémon name
      let pokemonName = $('<h1>' + pokemon.name + '</h1>');
      // Create and append the Pokémon image
      let pokemonImage = $('<img class="modal-img" style="width:50%">');
      pokemonImage.attr('src', pokemon.imageUrl);

      // Create and append the Pokémon height and weight
      let pokemonHeight = $('<p>' + 'Height: ' + pokemon.height * 10 + ' cm' + '</p>');
      let pokemonWeight = $('<p>' + 'Weight: ' + pokemon.weight + ' lb' + '</p>');

      // Create and append the Pokémon types
      let pokemonTypes = document.createElement('div');
      let types = 'Types: ';
      pokemon.types.forEach(function (type) {
          types += type.type.name + ' ';
      });
      pokemonTypes.innerHTML = types;

      // Create and append the Pokémon abilities
      let pokemonAbilities = document.createElement('span');
      let abilities = 'Abilities: ';
      pokemon.abilities.forEach(function (ability) {
          abilities += ability.ability.name + ' ';
      });
      pokemonAbilities.innerHTML = abilities;

      // Append all the created elements to the modal
      modalTitle.append(pokemonName);
      modalBody.append(pokemonImage);
      modalBody.append(pokemonHeight);
      modalBody.append(pokemonWeight);
      modalBody.append(pokemonTypes);
      modalBody.append(pokemonAbilities);

      // Toggle the modal
      $('#pokemonModal').modal('toggle');
  }

  // Return the public functions of the pokemonRepository
  return {
      add: add,
      getAll: getAll,
      addListItem: addListItem,
      showModal: showModal,
      showDetails: showDetails,
      loadList: loadList,
      loadDetails: loadDetails,
  };
})();

/* Load the Pokémon list and add list items to the DOM */
pokemonRepository.loadList().then(function () {
  // Sort the Pokémon list by index to maintain order
  pokemonRepository.getAll().sort((a, b) => a.index - b.index).forEach(function (pokemon) {
      // Add each Pokémon as a list item
      pokemonRepository.addListItem(pokemon);
  });
});


