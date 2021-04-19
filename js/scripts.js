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
  
        return {
                add: function(pokemon){
                        if (typeof pokemon === 'object'){
                            pokemonList.push(pokemon);
                        }else {console.log('Invalid data type')}   
                },
                
                getAll: function() {
                        return pokemonList;
                }
                
                
        };
        
        
})();
pokemonRepository.add({name:'Charizard',
                        height: 1.7,
                        type:['fire','flying'] }) 

pokemonRepository.getAll().forEach(function(pokemon){
        if(pokemon.height > 0.6){
                document.write(pokemon.name + ' (height: ' + pokemon.height +') '+'Wow thats a big one'+ '<br>')
        }else {
                document.write(pokemon.name + ' '+ '(height: '+ pokemon.height +') '+'<br>');
        }
});




