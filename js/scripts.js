let pokemonRepository =  (function (){
        let pokemonList = []
        let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
        let modalContainer = document.querySelector('#modal-container');


        /* Loop creating pokemon buttons*/
        function addListItem(pokemon){
                let pokemonList = document.querySelector(".list-group");
                let listpokemon = document.createElement("li");
                listpokemon.classList.add('list-group-item', 'list-group-item-action')
                let button = document.createElement("button");

                button.innerText = pokemon.name;
                button.classList.add("btn","btn-block");
                button.setAttribute('data-target', 'data-toggle', 'modal')

                listpokemon.appendChild(button);
                pokemonList.appendChild(listpokemon);
                button.addEventListener('click', function () {
                        showDetails(pokemon)
                      });
        };
        /* Function to push new pokemon into the array*/
        function add(pokemon){
                if (typeof pokemon === 'object'){
                pokemonList.push(pokemon);
                }else {console.log('Invalid data type')}   
                }
        /* Function listing all the pokemons in the array*/        
        function getAll() {
                return pokemonList;
                }

        function loadList() {
                return fetch(apiUrl).then(function (response) {
                  return response.json();
                }).then(function (json) {
                  json.results.forEach(function (pokemon) {
                    let pokemon = {
                      name: pokemon.name,
                      detailsUrl: pokemon.url
                    };
                    add(pokemon);
                   });
                }).catch(function (e) {
                  console.error(e);
                })
                }

        function loadDetails(pokemon) {
                let url = pokemon.detailsUrl;
                return fetch(url).then(function (response) {
                  return response.json();
                }).then(function (details) {
                  pokemon.imageUrl = details.sprites.front_default;
                  pokemon.height = details.height;
                  pokemon.types = [...details.types];
                }).catch(function (e) {
                  console.error(e);
                });
                }
                function showDetails(pokemon) {
                  pokemonRepository.loadDetails(pokemon).then(function () {
                    console.log(pokemon);
                    showModal(pokemon);
                  })};



        function showModal(pokemon) {
                  let modalBody = $('.modal-body');
                  let modalTitle = $('.modal-title');
                  let modalHeader = $('.modal-header');

                  modalTitle.empty();
                  modalBody.empty();

                  let pokemonName = $("<h1>") + pokemon.name + $("</h1>");
                  let pokemonImage = $('<img class="modal-img" style="width:50%">');
                  pokemonImage.attr("src", pokemon.imageUrlFront);

                  pokemonImageBack.attr("src", pokemon.imageUrlBack);

                  let pokemonHeight = $("<p>" + "Height: " + pokemon.height + "</p>")
                  let pokemonWeight = $("<p>" + "Weight: " + pokemon.weight + "</p>")

                  let pokemonTypes = $("<p>" + "Type: " + pokemon.types + "</p>")

                  let abilitiesElement = $("<p>" + "Abilities: " + pokemon.abilities + "</p>")

                  modalTitle.append(pokemonName);
                  modalBody.append(pokemonImage);
                  modalBody.append(pokemonImageBack);
                  modalBody.append(pokemonHeight);
                  modalBody.append(pokemonWeight);
                  modalBody.append(pokemonTypes);
                  modalBody.append(abilitiesElement);
        }




        return {
                add: add,
                getAll: getAll,
                addListItem: addListItem,
                showDetails: showDetails,
                loadList: loadList,
                loadDetails: loadDetails,
                showModal: showModal
              };   

        
        
        
})();

/* Prints all the pokemon from the API to the screen & adds the buttons from
the addListItem function */
pokemonRepository.loadList().then(function (){
        pokemonRepository.getAll().forEach(function (pokemon) {
                        pokemonRepository.addListItem(pokemon);
                                
                })});

        




