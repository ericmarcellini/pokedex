let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=151';

  /* Loop creating pokemon buttons*/
  function addListItem(pokemon) {
      let pokemonList = document.querySelector('.list-group');
      let listPokemon = document.createElement('li');
      listPokemon.classList.add('list-group-item', 'list-group-item-action', 'mb-2');
      let button = document.createElement('button');

      button.innerText = pokemon.name;
      button.classList.add('btn', 'btn-block');
      button.setAttribute('data-target', 'data-toggle="modal"', 'modal', '#pokemonModal');

      let image = document.createElement('img');
      image.src = pokemon.imageUrl;
      image.style.width = '50px';
      image.style.height = '50px';
      image.style.marginRight = '10px';

      button.prepend(image);
      listPokemon.appendChild(button);
      pokemonList.appendChild(listPokemon);

      button.addEventListener('click', function () {
          showDetails(pokemon);
      });
  }

  /* Function to push new pokemon into the array*/
  function add(pokemon) {
      if (typeof pokemon === 'object') {
          pokemonList.push(pokemon);
      } else {
          console.log('Invalid data type');
      }
  }

  /* Function listing all the pokemons in the array*/
  function getAll() {
      return pokemonList;
  }

  function loadList() {
      return fetch(apiUrl).then(function (response) {
          return response.json();
      }).then(function (json) {
          json.results.forEach(function (item, index) {
              let pokemon = {
                  name: item.name,
                  detailsUrl: item.url,
                  index: index
              };
              add(pokemon);
          });
          return Promise.all(pokemonList.map(pokemon => loadDetails(pokemon)));
      }).catch(function (e) {
          console.error(e);
      });
  }

  function loadDetails(pokemon) {
      let url = pokemon.detailsUrl;
      return fetch(url).then(function (response) {
          return response.json();
      }).then(function (details) {
          pokemon.imageUrl = details.sprites.front_default;
          pokemon.height = details.height;
          pokemon.weight = details.weight;
          pokemon.types = [...details.types];
          pokemon.abilities = [...details.abilities];
      }).catch(function (e) {
          console.error(e);
      });
  }

  function showDetails(pokemon) {
      pokemonRepository.loadDetails(pokemon).then(function () {
          showModal(pokemon);
      });
  }

  function showModal(pokemon) {
      let modalBody = $('.modal-body');
      let modalTitle = $('.modal-title');

      modalTitle.empty();
      modalBody.empty();

      let pokemonName = $('<h1>' + pokemon.name + '</h1>');
      let pokemonImage = $('<img class="modal-img" style="width:50%">');
      pokemonImage.attr('src', pokemon.imageUrl);

      let pokemonHeight = $('<p>' + 'Height: ' + pokemon.height * 10 + ' cm' + '</p>');
      let pokemonWeight = $('<p>' + 'Weight: ' + pokemon.weight + ' lb' + '</p>');

      let pokemonTypes = document.createElement('div');
      let types = 'Types: ';
      pokemon.types.forEach(function (type) {
          types += type.type.name + ' ';
      });
      pokemonTypes.innerHTML = types;

      let pokemonAbilities = document.createElement('span');
      let abilities = 'Abilities: ';
      pokemon.abilities.forEach(function (ability) {
          abilities += ability.ability.name + ' ';
      });
      pokemonAbilities.innerHTML = abilities;

      modalTitle.append(pokemonName);
      modalBody.append(pokemonImage);
      modalBody.append(pokemonHeight);
      modalBody.append(pokemonWeight);
      modalBody.append(pokemonTypes);
      modalBody.append(pokemonAbilities);

      $('#pokemonModal').modal('toggle');
  }

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

/* Prints all the pokemon from the API to the screen & adds the buttons from
the addListItem function */
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().sort((a, b) => a.index - b.index).forEach(function (pokemon) {
      pokemonRepository.addListItem(pokemon);
  });
});


