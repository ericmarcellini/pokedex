let pokemonRepository =  (function (){
        let pokemonList = []
        let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
        let modalContainer = document.querySelector('#modal-container');


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
                  showModal(item);
                });
                }

                /* modal */
                function showModal(pokemon, text) {
                  modalContainer.innerHTML = '';
                  let modal = document.createElement('div');
                  modal.classList.add('modal');
              
                  let closeButtonElement = document.createElement('button');
                  closeButtonElement.classList.add('modal-close');
                  closeButtonElement.innerText = 'Close';
                  closeButtonElement.addEventListener('click', hideModal);
              
                  let titleElement = document.createElement('h1');
                  titleElement.innerText = pokemon.name;
              
                  let contentElement = document.createElement('p');
                  contentElement.innerText = 'Height: ' +pokemon.height;

                  let imageElement = document.createElement('img');
                  imageElement.src = pokemon.imageUrl;
              
                  modal.appendChild(closeButtonElement);
                  modal.appendChild(titleElement);
                  modal.appendChild(contentElement);
                  modal.appendChild(imageElement);
                  modalContainer.appendChild(modal);
              
              
                  modalContainer.classList.add('is-visible');
                }
              
                function hideModal() {
                  modalContainer.classList.remove('is-visible');
                }
              
                window.addEventListener('keydown', (e) => {
                  if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
                    hideModal();  
                  }
                });
                modalContainer.addEventListener('click', (e) => {
                  let target = e.target;
                  if (target === modalContainer) {
                    hideModal();
                  }
                });
              
                document.querySelector('#show-modal').addEventListener('click', () => {
                  showModal('Modal title', 'This is the modal content!');
                });



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

        




