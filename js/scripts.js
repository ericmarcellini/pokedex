let pokemonRepository =  (function (){
        let pokemonList = []
        let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
        


        /* Loop creating pokemon buttons*/
        function addListItem(pokemon){
                let pokemonList = document.querySelector(".pokemon-list");
                let listpokemon = document.createElement("li");
                let button = document.createElement("button");
                button.innerText = pokemon.name;
                button.classList.add("button-style");
                listpokemon.appendChild(button);
                pokemonList.appendChild(listpokemon);
                button.addEventListener('click', function (event) {
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
                  json.results.forEach(function (item) {
                    let pokemon = {
                      name: item.name,
                      detailsUrl: item.url
                    };
                    add(pokemon);
                   });
                }).catch(function (e) {
                  console.error(e);
                })
                }

        function loadDetails(item) {
                let url = item.detailsUrl;
                return fetch(url).then(function (response) {
                  return response.json();
                }).then(function (details) {
                  item.imageUrl = details.sprites.front_default;
                  item.height = details.height;
                  item.types = details.types;
                }).catch(function (e) {
                  console.error(e);
                });
                }
                
        function showDetails(item) {
                pokemonRepository.loadDetails(item).then(function () {
                  console.log(item);
                });
                }

        return {
                add: add,
                getAll: getAll,
                addListItem: addListItem,
                showDetails: showDetails,
                loadList: loadList,
                loadDetails: loadDetails
              };   

        
        
        
})();

/* Prints all the pokemon from the API to the screen & adds the buttons from
the addListItem function */
pokemonRepository.loadList().then(function (){
        pokemonRepository.getAll().forEach(function (pokemon) {
                        pokemonRepository.addListItem(pokemon);
                                
                })});

        




