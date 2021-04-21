let pokemonRepository =  (function (){
        let pokemonList = [
    {name: 'Bulbasaur', 
            height: 0.7, 
            type:['grass','poison']},

    {name: 'Charmander', 
            height: 0.6, 
            type:['fire']},

    {name: 'Squirtle', 
            height: 0.5, 
            type:['water']}
        ]

        function showDetails(pokemon){
                console.log(pokemon)
        }

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
                
        return {
                add: add,
                getAll: getAll,
                addListItem: addListItem,
                showDetails: showDetails
              };   
        
        
        
})();
/* Example of a pokemon being pushed into the Array*/
pokemonRepository.add({name:'Charizard',
                        height: 1.7,
                        type:['fire','flying'] }) 

/* Prints all the pokemon from the array to the screen & adds the buttons from
the addListItem function */
pokemonRepository.getAll().forEach(function (pokemon) {
                pokemonRepository.addListItem(pokemon);
                              });





